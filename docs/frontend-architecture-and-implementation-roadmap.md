# Sqooli frontend architecture and implementation roadmap

## Engineering assessment

The current `sqooli-landing` project is a React/Vite/TypeScript prototype with approximately 85 source files. It already contains the visual journeys for the public site, student dashboard, and teacher dashboard, but most behaviour is local or hardcoded.

Current structural findings:

- `src/main.tsx` performs manual pathname matching and renders pages directly. There is no router-level protection, route metadata, loader boundary, or authorization guard.
- `src/App.tsx` only renders `LandingPage`; the active application composition is in `main.tsx`.
- `LoginPage.tsx` accepts any credentials, writes `sqooli-demo-authenticated` to `sessionStorage`, and redirects based on the selected onboarding role. It does not call the backend.
- Dashboard layouts contain hardcoded names, roles, notifications, navigation, and action behaviour.
- There is no shared API client, generated OpenAPI type layer, environment configuration, session model, permission model, or API error normalization.
- Forms use local React state in several places; registration and profile data are written to `sessionStorage` rather than submitted to the backend.
- The landing page contains hardcoded lessons, tutors, questions, programs, metrics, school listings, and subscription/contact behaviour.
- Styling is organized by page, but components, features, API modules, and state ownership are not yet separated.

The existing visual work should be preserved. The implementation should introduce application boundaries incrementally rather than rewriting all pages in one change.

## Target source structure

```text
src/
  app/
    App.tsx                 # providers and application composition
    router.tsx              # route tree, lazy pages, route metadata
    providers.tsx           # Redux, TanStack Query, i18n, error boundary
  config/
    env.ts                  # validated VITE_* configuration
    constants.ts            # API version and stable application constants
  api/
    generated/              # generated OpenAPI types; never hand-edit
    client.ts               # typed openapi-fetch client
    errors.ts               # normalized API error model
    auth.ts                 # auth endpoint adapters
    account.ts              # profile, registration, terms
    resources.ts            # lessons, teachers, programs, files, etc.
  auth/
    auth.types.ts
    auth.store.ts           # session and current-user client state
    auth.service.ts         # login, logout, bootstrap, token lifecycle
    auth.selectors.ts
    guards.tsx              # authenticated and permission-aware route guards
    dashboard-routing.ts    # allowlisted user.dashboard -> route mapping
  features/
    landing/
    onboarding/
    student/
    teacher/
    school/
    parent/
    admin/
  components/
    ui/                     # reusable accessible primitives
    feedback/               # loading, empty, error, confirmation states
    forms/                  # shared form fields and validation messages
    data-display/           # tables, pagination, filters, charts
  layouts/
    PublicLayout.tsx
    AuthLayout.tsx
    StudentLayout.tsx
    TeacherLayout.tsx
    SchoolLayout.tsx
    AdminLayout.tsx
  store/
    index.ts                # Redux store for client/application state
    slices/                 # UI state, preferences, draft workflows
  hooks/
  lib/
    dates.ts
    security.ts
    storage.ts
    url.ts
  i18n/
    index.ts
    locales/
  styles/
```

Feature folders own feature-specific components, hooks, schemas, API adapters, and tests. Shared folders must contain only genuinely reusable code. Pages should compose features and layouts; they should not call `fetch`, read tokens, or decide permissions directly.

## State ownership rules

| State | Owner | Examples |
| --- | --- | --- |
| Server state | TanStack Query | lessons, teachers, students, bookings, files, notifications |
| Auth/session state | Redux Toolkit + auth service | current user, dashboard, authentication status, session expiry |
| Client workflow state | Redux Toolkit or local component state | sidebar state, modal state, multi-step drafts, filters |
| Form state | React Hook Form + Zod | login, registration, profile, upload metadata |
| URL state | React Router search/path params | search term, page, filters, selected entity |
| Locale/preferences | Redux Toolkit + i18next | language, accessibility/display preferences |

Redux will remain important, but it should not become a manual cache for API responses. TanStack Query should own server data and invalidation while Redux owns cross-page client state and the authenticated session model.

## Dependency-ordered implementation sequence

### 0. Baseline and safety gate

Before changing page behaviour:

1. Preserve the current prototype and record the existing working routes.
2. Add a route smoke-test matrix for public, student, teacher, school, and unknown paths.
3. Confirm the API base URL, API version, deployment environments, and token policy through environment variables.
4. Keep credentials out of source, fixtures, screenshots, logs, URLs, and committed files.

### 1. Application shell and code boundaries

Create the `app`, `config`, `api`, `auth`, `layouts`, `features`, and `store` boundaries. Move composition out of the pathname chain and into React Router. Keep the current page components as route targets initially; migration can happen feature by feature.

Acceptance criteria:

- One router owns all navigation.
- All routes have a named access policy: public, authenticated, or permission-gated.
- Lazy loading and the existing loading screen continue to work.
- Unknown routes render the not-found page.
- Existing URLs remain compatible during migration.

### 2. API contract and typed client

Generate TypeScript definitions from `docs/backend-api/sqooli-v1-api/sqooli_v1_api_documentation.json`. Add a typed `openapi-fetch` client with:

- `VITE_API_BASE_URL` and `VITE_API_VERSION` validation;
- automatic `api-version=1.0` query handling;
- bearer-token injection through a token provider;
- normalized success/error envelopes;
- safe handling of 401, 403, 404, 409, 422, 429, and 5xx responses;
- request correlation/debug logging that never logs credentials or full sensitive payloads.

No page should import `fetch` directly after this phase.

### 3. Authentication and session bootstrap — highest priority

Implement the backend login flow first, then build the session lifecycle around the observed response:

1. Submit credentials to `POST /api/Auth/login`.
2. Validate the response with a runtime schema before putting it in state.
3. Store the access token behind a single storage abstraction; do not spread token handling across components.
4. Hydrate the current user on application startup.
5. Treat `user.dashboard` as the authoritative dashboard routing value and map it through an allowlist. Never route from the legacy `role` array or arbitrary server-provided URL.
6. Handle loading, invalid credentials, disabled accounts, expired sessions, network failure, and logout.
7. On 401, clear the session and redirect to login with a safe, non-sensitive message.

The backend has not documented refresh-token/logout behaviour clearly. The auth service must therefore isolate this assumption so refresh support can be added without rewriting the application. Confirm whether access tokens are short-lived and whether a refresh endpoint exists before production persistence decisions.

Acceptance criteria:

- Real credentials are required to enter protected routes.
- A Parent test account routes using `dashboard: parent`.
- A user cannot select a different dashboard by changing a query parameter.
- Refreshing the browser preserves or safely terminates the session according to the backend token policy.
- Logout removes local session data and makes protected routes inaccessible.

### 4. Authorization and permission enforcement

Build authorization independently from authentication:

- `can(permission)` and `canAny(...)` selectors;
- route-level dashboard guards;
- component-level action guards for buttons, tabs, and destructive operations;
- server responses remain authoritative—hidden UI is not a security boundary;
- explicit forbidden and unauthorized states;
- no permission names embedded throughout page components.

The backend must confirm the permission representation. Until then, model a normalized permission set that can accept claims, user fields, or a future permissions endpoint without changing consumers.

### 5. Account management and onboarding

Wire the account lifecycle in this order:

1. Registration initiation: `POST /api/Auth/register/init`.
2. Email verification and resend.
3. Registration completion for parent, student, teacher, and school flows.
4. Profile update and terms acceptance.
5. Password/PIN recovery once the exact backend endpoints are confirmed.

Every form uses React Hook Form and Zod. Server validation errors must be mapped to field-level messages. Remove demo `sessionStorage` account writes after their backend replacements are working.

### 6. Shared data and feedback infrastructure

Add common query keys, pagination helpers, table state, loading skeletons, empty states, retry behaviour, toast policy, and error boundaries. Establish a single response adapter for the backend's varying envelopes so pages do not each interpret `status`, `Status`, `message`, `Message`, `data`, and `error` differently.

### 7. Public landing and discovery API integration

Replace hardcoded content in controlled slices:

1. lessons/classes from `/api/Lesson`;
2. teachers/tutors from `/api/Teacher`;
3. programs from `/api/CPrograms` and `/api/Programs`;
4. school detail/listing where the backend exposes public access;
5. questions only after a supported list/search contract is confirmed;
6. contact and notification subscription only after backend ownership and abuse controls are confirmed.

Each slice must have loading, empty, error, retry, and stale-data behaviour. Hardcoded content may remain as an explicit fallback only where the product approves it.

### 8. Parent and student workflows

Wire dashboard data for the authenticated user: profile, linked students, lessons, bookings, timetable, assignments, activity, tutors, wallet, and payments. Use query invalidation after mutations such as booking, claiming a lesson, payment initiation, profile changes, or assignment submission.

Do not expose data merely because a route exists. Every query and mutation must respect the backend's ownership and permission response.

### 9. Teacher, school-admin, and platform-admin workflows

Implement in increasing privilege order:

1. teacher profile, lessons, students, attendance, assignments, resources;
2. school-admin school, staff, student, curriculum, and approval workflows;
3. platform-admin oversight, permissions, reports, and cross-school operations.

Use shared data-grid primitives backed by TanStack Table, virtualization for large result sets, and server-side pagination/filtering wherever the API supports it.

### 10. Files, localization, and large-list readiness

- Configure Uppy against `POST /api/files/upload` with the required `EntityType`, `EntityId`, `Category`, `IsPublic`, and `Title` metadata.
- Enforce client-side file size/type checks for usability, while treating backend validation as authoritative.
- Add i18next namespaces by feature rather than one large translation file.
- Make all user-visible strings translatable, including validation, API errors, empty states, and navigation labels.
- Introduce TanStack Virtual only in measured large lists/tables; do not virtualize small forms or ordinary page content.

### 11. Security, accessibility, and quality gates

For each feature slice:

- dependency audit and secret scan;
- XSS review for rich text, file names, URLs, and server-provided content;
- authorization tests for every protected route and mutation;
- keyboard and screen-reader checks;
- MSW API tests for success, empty, 401, 403, validation, conflict, timeout, and server errors;
- Playwright flows for login, dashboard routing, logout, and one critical workflow per user type;
- production build and diff checks.

No feature is complete when only the happy path works.

## First implementation slice

The first coding slice should be deliberately narrow and high risk:

1. Create environment/config and the typed API client.
2. Generate OpenAPI types.
3. Create the auth service, session store, and current-user schema.
4. Replace the demo login submit with the real login endpoint.
5. Add the router, authenticated guard, dashboard allowlist, and logout.
6. Protect the existing student and teacher dashboard routes.
7. Add MSW tests for login success, invalid credentials, missing dashboard, forbidden route, and logout.

Only after this slice passes should we wire public landing content or expand dashboard functionality. This sequence prevents us from building many API-consuming screens on top of an unsafe or unstable session foundation.

## Known backend blockers to track

- refresh-token and logout contract;
- exact permission representation and permission endpoint/claims;
- public school listing/search endpoint;
- question list/search endpoint;
- standard error envelope and validation-error field mapping;
- upload response shape and supported file limits/types;
- payment/M-Pesa asynchronous status and polling/webhook UX;
- staging API URL, CORS origins, and production environment policy.

## Active blockers from student workflow integration

These blockers are now confirmed against the supplied OpenAPI document and are
being tracked separately from implementation defects. The frontend must not
invent records or silently keep demo data where the backend contract cannot
support the workflow.

| Workflow | What is currently documented | Clarification required from backend |
| --- | --- | --- |
| Assignments | Assignment create, detail, submit, and grade operations exist. Quiz/exam lookup and quiz/exam submission operations also exist, but no student assignment-list endpoint is documented. | Provide the authenticated student's upcoming/submitted assignment list endpoint, response shape, ownership rules, due-date/status fields, whether quizzes/exams are included, and stable quiz/exam detail/question response models. |
| Forums | No forum, post, reply, vote, share, or search endpoints are documented. | Provide the forum resource endpoints, request/response models, pagination/search, moderation rules, and allowed student mutations. |
| Activity feed | No student activity/audit-log endpoint is documented. | Provide the activity endpoint, event schema, pagination/filtering, retention rules, and whether the feed is user-scoped or school-scoped. |
| Student timetable | `/api/CPrograms/timetable` is documented with an optional `teacherId` query parameter, but no student-scoped timetable endpoint is documented. | Confirm the student timetable endpoint and whether the source is lessons, bookings, programs, school events, exams, or a combined calendar. |
| Tutors | `/api/Teacher` list is documented and now powers the tutor list. Tutor detail/profile content, reviews, programs, lesson history, and student connection operations are not clearly documented. | Provide tutor detail, reviews, programs, lesson history, connect/message, and current-versus-past ownership contracts. |
| Wallet activation | Balance, transactions, M-Pesa top-up, withdrawal, transfer, and PIN verification operations are documented. The multi-step wallet activation/OTP flow used by the UI has no clear activation, OTP, or saved-payment-method contract. | Confirm wallet activation, OTP delivery/verification, PIN setup/reset, saved payment method, and wallet status endpoints. |
| Payments | Payment records and Paystack/M-Pesa operations are documented, but the student payment initiation/status lifecycle is not fully explicit. | Confirm which endpoint initiates student lesson payments, asynchronous status states, polling/webhook behavior, idempotency keys, and receipt data. |

| API browser access | Direct browser calls to `https://api.antodb.com` do not pass CORS preflight. The frontend now avoids that cross-origin request by using same-origin `/api` calls, with Vite proxying local development and Nginx proxying the demo deployment. | Keep the proxy route available in each environment, or alternatively enable CORS on the API for approved frontend origins if direct browser calls are required later. |

## Registration flow audit before acceptance testing

### Intended student journey

`/onboarding` role selection → `/onboarding/account?role=student` →
`POST /api/Auth/register/init` → `/onboarding/verify` →
`POST /api/Auth/verify-email` → student registration completion/profile data →
`POST /api/Auth/register/complete` → login → dashboard-key redirect → protected
student dashboard.

### Current implementation trace

- Role selection renders School, Teacher, Student, and Parent choices and stores a temporary onboarding profile.
- The account route currently renders the student registration form regardless of the selected role.
- The registration form validates first name, last name, email, password, and confirmation locally, then calls `POST /api/Auth/register/init`.
- Only non-sensitive registration metadata is kept temporarily in session storage; the password is not stored.
- The verification page requires `userId` and `token`, but the registration-init response is not currently parsed and persisted to prefill those values.
- Successful email verification redirects directly to `/login?verified=1`.
- No UI route currently collects student phone, gender, address, curriculum, grade, school, or subject enrollment data for `POST /api/Auth/register/complete`.
- `completeStudentRegistration()` exists as an API adapter but is not called by the registration journey.
- Login validates the backend response, requires a usable access token and `user.dashboard`, persists the session, and routes through the dashboard allowlist.

### Registration blockers that must be resolved before E2E acceptance

| Priority | Blocker | Required clarification or implementation decision |
| --- | --- | --- |
| P0 | Registration completion is not reachable from the UI. | Add the student completion step after verification, or confirm that verification itself completes the account. |
| P0 | The contract between register-init and verify-email is unclear. | Confirm the exact register-init response, where `userId` and verification token are delivered, and whether they may appear in a link query string. |
| P0 | The completion endpoint requires an authenticated bearer token in the OpenAPI security definition. | Confirm whether verification returns a temporary access token, whether the user must log in before completion, or whether the endpoint security definition is incorrect. |
| P0 | Student completion payload requirements are not fully known. | Confirm required `phone`, `gender`, address, and `studentEnrollments` fields, plus curriculum/grade/school/subject ID sources. |
| P1 | Role selection currently supports four roles but the account page is student-specific. | Confirm whether role-specific account forms are required now, or whether the first acceptance scope is student-only with other roles deferred. |
| P1 | Verification failure and resend paths are not fully normalized. | Confirm standard validation/error envelope and resend rate-limit behavior. |
| P1 | Login response/session policy is not fully documented. | Confirm token expiry, refresh behavior, logout endpoint, and whether dashboard is always present for verified students. |

Acceptance testing should begin with UI validation of role selection and client-side form rules, but the full backend E2E flow is blocked until the P0 items are answered or a test-account workflow is provided by the backend team.

### Current implementation status

- Lessons: connected to `/api/Lesson` with loading, empty, error, retry, search, and status filtering.
- Tutors list: connected to `/api/Teacher` with loading, empty, error, retry, and search states.
- Wallet balance and transactions: connected to `/api/wallet/balance` and `/api/wallet/transactions`.
- M-Pesa top-up: connected to `/api/wallet/topup/mpesa` with mutation feedback and query invalidation.
- Quiz/exam assessment flow: connected to the documented lesson-scoped lookup and quiz submission operations; the page requires `lessonId` until a student-wide assignment list endpoint is supplied.
- Forum, activity, and timetable pages: mock records are being removed in favour of explicit empty/unavailable states until the missing contracts are supplied.
- Tutor profile detail and wallet activation substeps: remain pending the detail/activation contracts above.
- Student registration completion: blocked; the UI currently stops after email verification and does not call `/api/Auth/register/complete`.
- API browser access: direct cross-origin calls to `https://api.antodb.com` still fail preflight, but the frontend no longer makes those calls in the browser. Vite proxies `/api` locally and Nginx proxies `/api` on the demo host.
- Demo deployment: release `sqooli-release-20260820-1520` is live on `https://demo.sqooli.africa`; the deployed `index.html` checksum matches the local build and `nginx -t` passed. The student account route returns HTTP 200.
- Production registration proxy smoke test: a deliberately invalid `POST /api/Auth/register/init` through `https://demo.sqooli.africa` reaches the backend and returns its validation response (`HTTP 400`) instead of a browser CORS failure. Full registration E2E still requires a valid test account and the documented verification/completion contract.
- Registration UX: inline validation errors now use compact red field messaging with invalid input styling; server/network feedback uses a branded rounded toast with generic security-safe wording and no internal CORS/API diagnostics.
