# Sqooli Backend Blockers and Anomalies Register

Last reviewed: 22 August 2026  
Scope: `sqooli-landing` frontend integration with the Sqooli v1 API  
Status vocabulary: **Resolved** = addressed in the frontend; **Proceeding** = safe to continue wiring; **Blocked** = requires backend clarification or change; **Open** = known gap not currently stopping the active slice.

This is the canonical register for backend integration blockers, observed API anomalies, frontend mitigations, and the work that has been completed while wiring the student flow to real functionality.

## 1. Source reports consolidated

The following documents were reviewed and consolidated here:

1. [`docs/backend-integration-discovery.md`](backend-integration-discovery.md) — initial API and integration discovery, environment questions, role implications, and implementation boundaries.
2. [`docs/frontend-architecture-and-implementation-roadmap.md`](frontend-architecture-and-implementation-roadmap.md) — target architecture, state ownership, dependency order, and acceptance criteria.
3. [`docs/landing-page-api-audit.md`](landing-page-api-audit.md) — public landing-page API fit, hardcoded features, and public endpoint gaps.
4. [`docs/NEXT_SESSION_HANDOVER.md`](NEXT_SESSION_HANDOVER.md) — implementation handover, authentication decisions, registration-flow correction, and current completion blocker.
5. [`docs/backend-api/sqooli-v1-api/`](backend-api/sqooli-v1-api/) — imported OpenAPI-derived endpoint and schema documentation.
6. [`PRODUCTION_UPLOAD.md`](../PRODUCTION_UPLOAD.md) — static production-testing deployment procedure. This is operational documentation, not an API contract report.

## 2. Current implementation position

The frontend has moved beyond the original visual prototype and now has a real integration foundation:

- A shared `openapi-fetch` client with environment configuration and `api-version` query handling.
- Generated TypeScript request types from the supplied API document.
- Centralized API error normalization.
- Bearer-token injection for authenticated requests.
- Redux session state and session restoration from `sessionStorage`.
- Centralized 401 handling that clears token, Redux state, and persisted session, then redirects to Sign In.
- Login routing driven by the backend `user.dashboard` value, not a user-selected dashboard or legacy role array.
- Authentication guards for authenticated routes and dashboard access.
- Student registration initiation, email verification, resend verification, role/profile completion, login, logout, and profile update adapters.
- Student API adapters/hooks for lessons, lesson details, bookings, students, teachers, quizzes, exams, assignments, wallet balance, transactions, M-Pesa top-up, and PIN verification.
- Runtime schemas for the unstable login/user response shape.
- Branded responsive onboarding, verification, login, and profile-completion screens.

The frontend is intentionally not bypassing `user.isProfileComplete`. A user must not reach a dashboard while the backend says the account is incomplete.

### Current frontend completion alignment — 29 August 2026

The Student dashboard setup modal now follows the supplied Figma information architecture and sends documented enrollment data when
curriculum and grade-level IDs are selected. The registration completion request also includes the documented `dob` field. After a
successful completion response, the frontend refreshes `GET /api/Auth/me` and routes directly to the returned allowlisted dashboard
when `userType`/`userRole` are no longer pending; `isProfileComplete:false` remains a visible setup state instead of forcing a
logout/login loop.

The Figma modal includes profile image upload, current-school search, student type, and interests. The current OpenAPI document does
not provide a Student profile-image upload endpoint, a student-readable school catalogue endpoint, or fields for student type and
interests in `UpdateProfileRequest`/`StudentEnrollmentRequest`. Those controls are therefore presented without being falsely sent
to undocumented APIs. Backend contracts are required before those values can be persisted authoritatively.

## 3. Resolved frontend anomalies

### 3.1 Registration role timing

**Observed:** The original UX selected a role before account creation, while the backend assigns the role during `POST /api/Auth/register/complete` after email verification.

**Resolution:** Role selection is retained as onboarding intent only. The authoritative role comes from the backend completion/login response. The completion screen is role-agnostic and supports Student, Teacher, Parent, and School.

**Files:** `src/pages/auth/RegisterPage.tsx`, `VerifyEmailPage.tsx`, `RegistrationCompletionPage.tsx`, `api/account.ts`.

### 3.2 Verification redirect and resend flow

**Observed:** Registration sent users directly toward verification instead of clearly explaining that an email had been sent. Verification links also open in a new tab.

**Resolution:** Added a dedicated verification-sent page with inbox guidance, resend support through `POST /api/Auth/resend-verification-email`, and a safe sign-in path. Pending registration context is carried without storing the password.

**Backend dependency:** Cross-device continuation still needs a backend-safe continuation identifier; same-device continuation uses pending registration metadata in local storage.

### 3.3 Login error mismatch

**Observed:** The API returned `status: true` and an access token, while the UI displayed invalid credentials. In other attempts the initial registration password failed after the backend emailed a temporary password.

**Resolution:** The frontend now parses the actual login response, validates the user/session shape, handles 401 separately from generic failures, and routes only from the backend dashboard key.

**Remaining backend question:** Registration must document whether the user-created password remains valid, whether it is replaced by a temporary password, and which credential is intended after email verification. The frontend must not guess this behavior.

### 3.4 Wrong dashboard for a Student

**Observed:** A Student account received `dashboard: "admin"` in one earlier response, despite the user selecting/expecting Student. Later backend responses correctly returned `dashboard: "student"` after the role was corrected.

**Resolution:** Dashboard routing is now an allowlisted mapping from the backend `dashboard` value. The frontend does not route from the role selector, `role[]`, `userType`, or `userRole` when those conflict.

**Remaining backend question:** The backend must guarantee that `dashboard`, `userType`, `userRole`, `role`, and role-object data are consistent for a current account.

### 3.5 Duplicate name entry during profile completion

**Observed:** Users had already entered first and last names during registration, but completion requested them again.

**Resolution:** Names and email are displayed as registration details and reused in the completion payload. The user only supplies missing profile information.

### 3.6 Profile completion loop UX

**Observed:** The completion endpoint returned success, but the next login still returned `isProfileComplete: false`, causing the guard to return the user to completion.

**Resolution:** The frontend continues to respect the backend flag, does not send an incomplete user to a dashboard, and hydrates saved values from the authenticated Redux session when the user returns to completion.

**Current status:** The loop is now correctly exposed as a backend completion-state blocker instead of being hidden by a false frontend redirect.

### 3.7 Session-expiry handling

**Observed:** An authenticated completion request returned `Authentication is required` / `UNAUTHORIZED`, while the user remained on a stale screen.

**Resolution:** The API client now reacts centrally to 401 responses, clears the access token and persisted session, clears Redux auth state, and redirects to Sign In with a safe expiry message.

### 3.8 Password retention and silent reauthentication

**Observed:** Reauthentication after profile completion was considered, but storing email/password for automatic login would create unnecessary security and privacy risk.

**Resolution:** The approved flow clears the temporary session after completion and asks the user to sign in again. Passwords are never stored in Redux, `sessionStorage`, `localStorage`, URLs, or in-memory reauthentication state.

## 4. Active blockers requiring backend action

### B-001 — No refresh-token endpoint or documented token renewal

**Impact:** Access tokens cannot be refreshed safely when they expire. The frontend can only clear state and send the user to Sign In after a 401.

**Evidence:** The documented Auth paths contain login, registration, verification, completion, profile update, Google login, subjects, and terms acceptance, but no refresh endpoint.

**Required backend decision:** Provide a refresh-token endpoint and lifecycle, or explicitly confirm short-lived access tokens with re-login as the intended policy. Document rotation, revocation, expiry, logout, and reuse detection.

### B-002 — No canonical current-user/session bootstrap endpoint

**Impact:** On reload, the frontend can restore the last stored login response but cannot validate or refresh it authoritatively without another login.

**Required endpoint:** `GET /api/Auth/me`, `GET /api/Auth/profile`, or an equivalent session-validation endpoint returning the authoritative user, dashboard, permissions, email-confirmation state, and profile-completion state.

### B-003 — No documented logout/revocation endpoint

**Impact:** Frontend logout removes local credentials, but the backend token may remain valid until expiry.

**Required backend decision:** Document whether logout is client-only or provide token revocation/session invalidation. Define behavior for password changes, account disablement, and security events.

### B-004 — `isProfileComplete` remains false after successful profile updates

**Observed production behavior:** The API returned successful registration/profile-update messages and persisted phone, DOB, and address, but subsequent login still returned `isProfileComplete: false`.

**Impact:** The frontend correctly blocks dashboard access, but users can loop through completion indefinitely.

**Required backend fix:** Set the completion flag after all required role-specific data is valid, or return an explicit `missingProfileFields`/`completionRequirements` structure. The backend must define whether Student completion additionally requires a student profile, curriculum, grade level, school, or `studentEnrollments` record.

### B-005 — Registration completion schema does not express logical requirements

**Observed:** The generated schema marks fields such as `gender`, `address`, `studentEnrollments`, `curriculumIds`, and role-specific fields as optional, while backend models contain required fields such as Student `gender` and `dob`.

**Impact:** The frontend can submit a structurally valid request that the backend accepts but does not consider complete.

**Required backend fix:** Correct OpenAPI `required` arrays, role-specific schemas, enums, validation messages, and response schemas. Document the exact minimum payload for Student, Teacher, Parent, and School.

### B-006 — Student enrollment completion contract is undefined

**Impact:** The frontend cannot know whether to collect curriculum, grade level, school, or subject IDs before dashboard routing.

**Relevant documented fields:** `studentEnrollments[].curriculumId`, `gradeLevelId`, optional `schoolId`, and `subjectIds`.

**Required backend clarification:** Confirm whether a new Student needs an enrollment during account completion, which IDs are mandatory, and which reference-data endpoints provide the selectable options.

### B-007 — Login and update-profile response contracts are incomplete

**Impact:** The frontend cannot reliably verify whether profile updates persisted or whether the session is current. Generated clients mark many responses as empty/unknown even though live responses contain envelopes.

**Required backend fix:** Publish response schemas for login, update-profile, register/complete, verify-email, resend, errors, and current-user. Include `isProfileComplete`, `gender`, role data, dashboard, permissions, and any missing-field details where relevant.

### B-008 — Authentication/security is absent from the OpenAPI security definition

**Observed:** The imported OpenAPI document has no declared security schemes or operation-level security requirements, although the practical backend convention is Bearer authentication.

**Impact:** Generated clients cannot enforce or communicate authentication requirements reliably.

**Required backend fix:** Define the bearer/cookie scheme, mark protected operations, document 401/403 responses, and state token expiry behavior.

### B-009 — Standard response/error envelopes are inconsistent

**Observed:** Responses use variations such as `status`/`Status`, `message`/`Message`, `data`, `error`, and paginated nested objects.

**Impact:** Every feature risks implementing different parsing and user-facing error behavior.

**Required backend fix:** Standardize success, validation, unauthorized, forbidden, conflict, rate-limit, and server-error envelopes. Preserve a correlation/request ID for support diagnostics.

### B-010 — Environment and CORS contract is not formalized

**Observed:** The frontend required a same-origin `/api` proxy because direct browser calls to the API did not pass CORS preflight reliably.

**Impact:** Local, demo, and production behavior can diverge.

**Required backend/platform action:** Provide separate API URLs, allowed frontend origins, required API version, proxy expectations, and deployment routing for local, demo, and production.

## 5. Open endpoint and product gaps

These do not all block the current Student login slice, but they block complete product wiring:

| ID | Area | Gap | Frontend consequence |
| --- | --- | --- | --- |
| O-001 | Parent | Parent model exists, but parent operations are not clearly documented. | Cannot safely wire linked-student oversight, progress, or parent payments. |
| O-002 | Permissions | Exact permission representation and admin/school-admin boundaries are unclear. | UI guards can be normalized, but server ownership remains authoritative. |
| O-003 | Current user | No canonical `me`/session endpoint. | Reload/bootstrap cannot validate state without relying on stored login data. |
| O-004 | Timetable/attendance | Endpoint ownership and response contracts need confirmation. | Student timetable/attendance remains partly presentational or incomplete. |
| O-005 | Assignments/submissions | List, detail, and submission response shapes need confirmation. | Query/mutation wiring requires adapters and acceptance tests. |
| O-006 | Forums/questions | No general public question list/search endpoint; topic endpoint requires `topicId`. | Question search and public question cards cannot be fully data-backed. |
| O-007 | Public schools | No clear public all-schools discovery endpoint. | School listing remains hardcoded/local until visibility is confirmed. |
| O-008 | Public tutors | Teacher endpoint exists but public visibility is unconfirmed. | Tutor listing requires authorization/visibility decision. |
| O-009 | Contact/newsletter | No dedicated approved contact-message or subscription endpoint. | Existing local success states must not imply a message/subscription was saved. |
| O-010 | Bookmarks | No save/bookmark endpoint. | Save UI must be local-only or removed until a backend contract exists. |
| O-011 | Payments | M-Pesa/Paystack sync vs async behavior, callbacks, polling, idempotency, and final status are unclear. | Do not treat payment initiation as payment success. |
| O-012 | Files | Upload limits, accepted types, storage URLs, and progress behavior need confirmation. | File upload UI cannot be finalized safely. |
| O-013 | Reference data | Curriculum, education level, grade level, subject, program, and school relationships need seeded/test IDs and access rules. | Role completion and dashboard filters cannot be made fully data-driven. |
| O-014 | Google login | Endpoint exists but browser configuration and account/linking behavior are not confirmed. | Google button remains informational/disabled. |
| O-015 | Recovery | Password reset, PIN recovery, account lockout, and verification-expiry behavior need exact endpoint contracts. | Recovery flows remain incomplete or limited to existing frontend shells. |

## 6. Student functionality: completed, proceeding, and pending

### Completed frontend wiring

- Real registration initiation through `POST /api/Auth/register/init`.
- Dedicated verification-sent page and resend flow.
- Email verification through `POST /api/Auth/verify-email`.
- Authenticated registration completion through `POST /api/Auth/register/complete`.
- Login through `POST /api/Auth/login` with runtime response validation.
- Dashboard routing from the backend `dashboard` key.
- Redux session state, session persistence, and protected-route guards.
- Centralized 401/session-expiry handling.
- Profile update adapter through `PUT /api/Auth/update-profile`.
- Lesson list/detail and lesson booking adapters.
- Student/teacher list adapters where documented.
- Quiz, exam, assignment detail/submission adapters.
- Wallet balance, transactions, M-Pesa top-up, and PIN verification adapters.

### Proceeding safely

1. Confirm the backend completion contract and unblock `isProfileComplete`.
2. Complete Student profile acceptance testing with a fresh test account.
3. Add API response adapters and loading/error/empty/retry states feature by feature.
4. Wire Student lessons and lesson details first.
5. Wire assignments/quizzes/exams and verify submission idempotency.
6. Wire timetable/attendance after endpoint ownership and response shapes are confirmed.
7. Wire wallet/payment state transitions only after backend payment behavior is documented.
8. Add browser acceptance tests with Playwright for registration, verification, login, expiry, dashboard routing, and one Student read-only feature.

### Pending implementation

- Refresh-token/session renewal.
- Current-user bootstrap and authoritative profile hydration.
- Backend logout/revocation integration.
- Fully data-backed Student dashboard modules.
- Parent, Teacher, School Admin, and Platform Admin end-to-end flows.
- Public landing data replacement where endpoint visibility is not confirmed.
- Complete payment, upload, recovery, Google-login, and notification flows.

## 7. Recommended backend clarification request

Send the backend team this minimum request before expanding dashboard work:

1. Provide the corrected OpenAPI document with security schemes, required fields, enums, response schemas, and error envelopes.
2. Confirm the exact Student completion payload, including whether `gender`, DOB, address, and `studentEnrollments` are required.
3. Fix or explain why successful completion/profile-update responses still produce `isProfileComplete: false`.
4. Provide a current-user endpoint and refresh/logout lifecycle.
5. Provide separate environment/CORS configuration for local, demo, and production.
6. Provide seeded test accounts and IDs for Student, Parent, Teacher, School Admin, and Platform Admin.
7. Document payment callback/status/idempotency behavior before payment acceptance testing.

## 8. Security and reporting rules

- Never add passwords, access tokens, refresh tokens, verification tokens, or private payment credentials to this report.
- Use sanitized response samples only: field names, statuses, messages, and non-sensitive IDs where necessary.
- Do not treat a 200/success message as proof of business completion; verify the returned authoritative state.
- Do not bypass backend profile, dashboard, permission, or ownership checks in the frontend.
- Keep deployment backups until the production-testing release has passed acceptance checks.

## 9. Next-session entry point

Start with B-004, B-005, and B-006. Obtain the exact backend completion requirements, then run a fresh Student registration through:

`register/init → verification-sent → verify-email → login → register/complete → update-profile → login → dashboard routing`

Record sanitized request/response shapes and the value of `isProfileComplete` after each state transition. Only after that state is authoritative should the team proceed with broad Student dashboard endpoint wiring.
