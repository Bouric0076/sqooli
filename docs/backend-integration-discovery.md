# Sqooli backend integration discovery

## Current frontend context

- App: Vite + React 19 + TypeScript 6.
- Routing: pathname-based branching in `sqooli-landing/src/main.tsx`; there is no router package.
- State: component-local `useState`, browser `sessionStorage`, and hardcoded demo records. There is no API client, server-state library, auth provider, or global store.
- Existing scope: public landing, search/schools/courses/tutors pages, student onboarding/auth/dashboard flows, and teacher onboarding/dashboard flows.
- Current validation: `npm run lint`, `npm run build`, and `git diff --check`.

## Backend contract summary

Source: `docs/backend-api/sqooli-v1-api/`, imported from `sqooli-v1-api.zip`.

The ZIP's embedded `sqooli_v1_api_documentation.json` is byte-for-byte identical to the original repository JSON, but the accompanying generated Markdown developer guide adds implementation conventions and examples.

## Verified test-account observations

Using a backend-provided test account, the live API returned:

- `POST /api/Auth/login?api-version=1.0`: HTTP 200 with `{ status, message, access_token, user }`.
- The backend team clarified that `dashboard` is the authoritative redirect key and that current accounts have one user type/role. Older multi-role values may remain on legacy records but must not drive frontend routing.
- `GET /api/Student?page=1&pageSize=5&api-version=1.0`: HTTP 403 with `{ Status: false, Message, Error: "FORBIDDEN" }`.
- `GET /api/LessonBooking?page=1&pageSize=5&api-version=1.0`: HTTP 200 with a paginated envelope shaped like `{ status, message, data: { page, pageSize, totalRecords, items }, error }`.

The booking response included nested student, teacher, lesson, payment, and assignment data, confirming that parent-facing functionality can likely begin from LessonBooking.

- OpenAPI: 3.1.1.
- Server: `https://api.antodb.com/api/`.
- Operations: 178.
- Domains: Auth, Wallet, Lessons, Lesson Booking, Students, Teachers, Schools, Programs, Resources, Questions, Quizzes, Exams, Assignments, Attendance, Payments, Files, and education reference data.
- Most endpoints accept an optional `api-version` query parameter.
- The imported developer guide recommends sending `api-version=1.0` unless the backend team says otherwise.
- The documented server ends in `/api/`, while paths also begin with `/api/`; construct requests carefully to avoid `/api/api/`. A safe base host is `https://api.antodb.com` plus the documented path.
- Pagination commonly uses `page`, `pageSize`, and `search`.
- Request schemas are available for many write operations.
- Response schemas are missing for most operations, so response payloads must be confirmed against the running backend before generating broad client types.
- `components.securitySchemes` is empty and operations do not declare security requirements. The frontend must not guess whether the backend expects a bearer token, cookie, or another credential mechanism.
- The imported guide says the practical convention is `Authorization: Bearer <token>`, but the login response token field is still not defined in the JSON contract. Confirm the exact field and lifecycle with the backend team.

## Required environment variables

Create these as Vite variables; never commit real values:

```text
VITE_API_BASE_URL=https://api.antodb.com/api/
VITE_API_VERSION=
VITE_GOOGLE_CLIENT_ID=
```

`VITE_GOOGLE_CLIENT_ID` is only needed when Google login is enabled. Payment provider public keys should be added only when the backend flow confirms that the browser needs them. Private payment credentials must remain server-side.

## Integration boundary

```text
Pages/components
  -> feature hooks (auth, lessons, wallet, assignments, resources)
  -> API services (typed request functions)
  -> one HTTP client (base URL, query version, auth, error normalization)
  -> Sqooli API
```

Pages should consume query/mutation hooks and view models. They should not construct URLs, read tokens, or parse backend envelopes directly.

Recommended initial folders:

```text
sqooli-landing/src/
  api/
    client.ts
    errors.ts
    types.ts
    auth.ts
    wallet.ts
    lessons.ts
    assignments.ts
    resources.ts
  features/
    auth/
    student/
    teacher/
    wallet/
    lessons/
  lib/
    env.ts
    queryClient.ts
  providers/
    AppProviders.tsx
  types/
    domain.ts
```

## Role and workflow implications

The contract is not student/teacher-only. It includes `AdminModel`, `ParentModel`, `SchoolAdminModel`, `TeacherModel`, and `StudentModel`, plus school-admin, invitation, contract, curriculum, program, and payment operations. The frontend should therefore model a shared identity/session with role-specific capabilities rather than creating unrelated login systems for each dashboard.

Expected role areas to confirm with the backend team:

- Student: learning, lessons, assignments, quizzes/exams, wallet, bookings, attendance.
- Parent: student oversight, payments, bookings, and progress; the contract exposes a parent model but does not clearly expose the parent endpoints yet.
- Teacher/tutor: lessons, students, attendance, resources, assignments, exams, wallet, invitations.
- School admin: school setup, teachers, students, programs, curricula, contracts, and reporting.
- Platform admin: reference data and cross-school administration; the exact admin endpoints and permissions need confirmation.

### MVP integration slice

1. Authentication and session lifecycle
   - login
   - registration init, email verification, registration completion
   - logout, current-user hydration, expired-session handling
   - role-aware student/teacher route protection
2. Student dashboard data
   - profile
   - lessons and lesson details
   - assignments and submissions
   - timetable/attendance
3. Wallet and payments
   - balance and transactions
   - PIN verification
   - M-Pesa top-up/withdrawal
   - payment status and failure states
4. Teacher dashboard data
   - students, tutors, lessons, timetable, attendance
   - resource upload/listing
5. Shared reference data
   - schools, programs, subjects, topics, grade levels, lesson types

### Later slices

- forums/questions and AI search behavior
- quizzes and exams
- contracts, qualifications, invitations, and certificates
- full CRUD administration screens
- Google login and advanced payment provider flows

For the multi-role dashboards, keep three concerns separate:

1. Server state: users, lessons, students, wallets, assignments, and schools fetched from the API.
2. Session/access state: current user, active role, permissions, token/session lifecycle.
3. Client workflow state: multi-step onboarding, lesson creation, assignment editing, cart/payment drafts, filters, and modal/navigation state.

## Package decisions

### Add

- `@tanstack/react-query`: server-state caching, loading/error/empty states, refetching, and mutation invalidation. Most state in this product is remote state, so this has higher leverage than putting API data in Redux.
- `zod`: validate the unstable/missing response contracts at the API boundary and provide safe error messages while the backend documentation is incomplete.
- `react-router-dom`: replace pathname branching with nested, protected, parameterized routes as authenticated screens become real. This should happen with the auth slice, not as an unrelated refactor.
- `react-hook-form`: reduce form state/validation boilerplate for registration, profile, wallet, lesson, assignment, and teacher forms.
- `@hookform/resolvers`: connect Zod schemas to forms.

### Important supporting packages to evaluate

| Concern | Package | Decision |
| --- | --- | --- |
| Accessible UI primitives | Radix UI or React Aria | Choose one if custom dialogs, menus, popovers, tabs, and comboboxes become difficult to make accessible. |
| Untrusted rich text | DOMPurify | Add before rendering backend/user HTML. Frontend validation is not a security boundary. |
| Error isolation | `react-error-boundary` | Add around route-level feature areas so one dashboard failure does not blank the entire app. |
| Notifications | Sonner or React-Toastify | Choose one for mutation success/error feedback; keep domain errors inline as well. |
| Dates and schedules | `date-fns` | Useful for lessons, timetable, attendance, and payment dates; use the browser `Intl` APIs for basic formatting. |
| Large tables/lists | TanStack Virtual | Add only when admin/school lists become large enough to require virtualization. |
| Internationalization | `i18next` + `react-i18next` | Add before shipping multiple languages; do not scatter hardcoded UI strings if localization is planned. |
| Observability | `@sentry/react` | Strong candidate for production error reporting, subject to privacy and consent review. |
| Unit/component tests | Vitest + Testing Library | Add for reducers, schemas, API adapters, forms, and accessible component behavior. |
| API mocking | MSW | Add to test API-backed screens without depending on the live backend. |
| Browser regression tests | Playwright | Add for login, role routing, onboarding, payments, bookings, and critical admin workflows. |
| OpenAPI types | `openapi-typescript` + `openapi-fetch` | Add after the backend publishes complete response and security definitions. |
| File uploads | Uppy | Evaluate only if resumable uploads, progress, retries, or multiple providers are required. |

### Defer unless a concrete need appears

- Redux Toolkit: do not use it as the API cache, but reconsider it for the substantial cross-feature client workflows expected in admin, school, parent, teacher, and student dashboards. If adopted, use Redux Toolkit slices for session/access and durable client workflows, while TanStack Query remains responsible for remote API data.
- Zustand: a reasonable lightweight alternative for UI-only cross-page state, but do not introduce both Zustand and Redux.
- Axios: native `fetch` is sufficient for one small HTTP client. Add Axios only if interceptors, upload progress, or cancellation needs become materially cumbersome.
- OpenAPI code generation: defer until response schemas and auth requirements are corrected in the contract; generated types from the current file would encode too many `unknown` values.
- MSW: add when component/integration tests are introduced, so API-backed pages can be tested without the live backend.

## Questions for the backend team

### Contract and environments

1. Is `https://api.antodb.com/api/` the development, staging, or production server? What are the separate URLs for local development, staging, and production?
2. Is `api-version` required, and what value should the frontend send?
3. Can the team provide a corrected OpenAPI document with response schemas, examples, required fields, enums, and security declarations?
4. What are the CORS-allowed frontend origins for local Vite, staging, and production?

### Authentication and authorization

1. What does `POST /api/Auth/login` return? We need the exact token/cookie/session shape and expiry behavior.
2. What credential does an authenticated request use: `Authorization: Bearer`, cookie, or another header?
3. What are the standard success and error envelopes? The document defines `ApiResponse` types but does not attach them consistently to responses.
4. Is there a refresh-token flow, logout/revocation endpoint, idle timeout, or forced logout behavior?
5. Which endpoint is the canonical current-user/profile endpoint? The contract exposes update-profile but no explicit `me` endpoint.
6. Can one account have multiple roles, and how is the active role selected?
7. How are permissions represented: role strings, claims, permission arrays, or server-side checks only?

### Role-specific behavior

8. Which parent endpoints are available? `ParentModel` appears in schemas, but parent operations are not clearly present in the documented paths.
9. Which endpoints belong to platform admins versus school admins?
10. What can a school admin see across schools, and can a user belong to more than one school?
11. What are the approval states and transitions for teacher onboarding, contracts, lessons, assignments, exams, and invitations?
12. Which IDs are stable public identifiers, and which are internal-only?

### Data and workflow behavior

13. What are the canonical response shapes for lists: raw arrays, `{ data, total }`, or an `ApiResponse` envelope?
14. What pagination, sorting, filtering, and search conventions apply to each list endpoint?
15. Which operations are idempotent and safe to retry, especially payments, bookings, submissions, and invitations?
16. What are the validation rules and allowed enum values for registration, onboarding, lesson creation, wallet PINs, assignments, exams, and file uploads?
17. What are the upload limits, accepted file types, storage URLs, and upload progress expectations?
18. For M-Pesa and Paystack, what is synchronous versus asynchronous, and which endpoint should the frontend poll or subscribe to for final status?
19. Are there rate limits, maintenance responses, correlation IDs, or support/debug headers the frontend should preserve?

### Testing and access

20. Can the backend team provide test accounts for every role: student, parent, teacher, school admin, and platform admin?
21. Can they provide seeded IDs/data for lessons, schools, students, assignments, wallet transactions, and payments?
22. What is the supported test-payment/M-Pesa sandbox procedure?

## First implementation checkpoint

Before wiring dashboard pages, implement and verify:

1. environment parsing and a single API client;
2. normalized API errors;
3. auth service and session storage abstraction;
4. login mutation and route redirect;
5. an authenticated request using the confirmed credential mechanism;
6. TanStack Query provider and one read-only feature, preferably wallet balance or lessons.

This checkpoint gives us a real backend connection and exposes contract/CORS/auth issues early, while keeping the rest of the design-first pages stable.
