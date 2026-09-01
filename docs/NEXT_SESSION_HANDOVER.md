# Sqooli Frontend — Next Session Handover

Date: 20 August 2026  
Workspace: `sqooli-landing`  
Primary next focus: authenticated student functionality and end-to-end testing

## 1. Current position

The UDBC school profile visual restructuring is complete enough to move back to product functionality. The page has been rebuilt around the supplied section references and now includes:

- Responsive UDBC header/navigation
- Hero and About sections
- Leadership section with responsive horizontal scrolling
- Services section
- Photo gallery
- UDBC on Sqooli course/programme cards
- FAQ accordion
- Testimonials cards and controls
- Contact section
- Timetable/calendar section
- Shared Sqooli footer

The latest mobile header issue was caused by the expanded navigation using a 100% flex width together with negative margins. The menu now uses `calc(100% + 32px)` so it spans the mobile viewport correctly. The CTA and menu button are grouped on the right side of the header.

## 2. Validation already completed

From `sqooli-landing`:

```bash
npm run lint
npm run build
npm run test
git diff --check
```

The latest completed checks passed:

- ESLint passed
- Production TypeScript/Vite build passed
- Existing Vitest suite passed previously: 2 files, 6 tests
- Git whitespace validation passed

The page has been structurally verified through the supplied desktop and mobile screenshots. A final browser pass should still be done after the next development server restart because the current worktree contains several active changes.

## 3. Important implementation files

### UDBC school profile

- `sqooli-landing/src/pages/schools/SchoolProfilePage.tsx`
- `sqooli-landing/src/pages/schools/SchoolHeader.tsx`
- `sqooli-landing/src/styles/pages/udbc-profile.css`
- `sqooli-landing/src/assets/images/udbc/`

### Frontend integration foundation

- `sqooli-landing/src/api/`
- `sqooli-landing/src/auth/`
- `sqooli-landing/src/config/`
- `sqooli-landing/src/features/`
- `sqooli-landing/src/lib/`
- `sqooli-landing/src/store/`
- `sqooli-landing/src/pages/auth/`
- `sqooli-landing/src/styles/pages/auth.css`
- `sqooli-landing/src/styles/components/toasts.css`

### API reference

- `docs/backend-api/sqooli-v1-api/`
- `sqooli-v1-api.zip`

Use the repository API documentation and the generated client conventions already present in `src/api` before adding endpoint calls manually.

## 4. Recommended next implementation order

### Slice A — Confirm the integration baseline

Before adding more features:

1. Confirm the configured API base URL for local, demo, and production environments.
2. Confirm the Vite reverse-proxy behavior for local development.
3. Confirm request headers, bearer-token handling, response parsing, and error normalization in the shared API client.
4. Confirm whether access tokens are stored in memory, session storage, or another approved mechanism.
5. Confirm the dashboard redirect mapping from the backend `dashboard` key.

Do not add endpoint-specific fetch logic inside page components. Keep it in API modules or feature query/mutation modules.

### Slice B — Student registration acceptance test

Run the complete unauthenticated student flow:

1. Open role selection.
2. Select Student; treat this as a local onboarding intent until completion.
3. Complete registration fields and submit `POST /api/Auth/register/init`.
4. Confirm loading state and duplicate-submit prevention.
5. Confirm the verification-email state is understandable.
6. Follow the verification link from the email.
7. Verify the account using the backend-required user ID/token values.
8. Complete the account with `POST /api/Auth/register/complete` and the confirmed role selected on the role-agnostic completion page.
9. Sign in with the final backend-issued credential.
10. Confirm the backend `dashboard` key is `student` and redirects to the student dashboard only after `isProfileComplete` is true.
11. Confirm refresh behavior and protected-route behavior.

Record each request URL, status code, sanitized response shape, redirect result, and user-visible outcome. Never record passwords, access tokens, refresh tokens, or verification tokens in the report.

### Slice C — Authentication and authorization hardening

Implement and test:

- Login success and failure states
- Session restoration after refresh
- Unauthorized request handling
- Expired-token handling
- Logout and session clearing
- Protected route guards
- Forbidden route behavior
- Dashboard routing from the single-user/single-role model
- Safe error messages that do not expose backend internals

The UI should show a generic service message for network/CORS/5xx failures. Detailed technical diagnostics belong in development logs only.

## 6A. Registration-flow contract correction

Role selection is a user-experience step, not the backend role assignment. The API assigns the role during
`POST /api/Auth/register/complete`, after email verification. The frontend now sends the user to a role-agnostic completion page
after verification, preselecting the non-authoritative onboarding intent when available. It carries only first name, last name, email,
and role intent through local storage; it never stores the password. After the user confirms the role and profile details, it calls
`register/complete` and only then directs the user to sign in. Dashboard routing remains driven by the backend `dashboard` value.

The completion form now reflects the backend profile contract instead of treating role and phone as sufficient. It requires gender,
date of birth, and address, preserves the first and last names already entered during registration, sends gender/address to
`register/complete`, and sends the date of birth through the documented authenticated `PUT /api/Auth/update-profile` endpoint. The
completion endpoint can return a successful status while the subsequent login still reports `isProfileComplete: false` when the
profile data required by the backend is missing; the frontend must not interpret that response as permission to enter a dashboard.
When the user is returned to completion after another login, the form hydrates any persisted values from the Redux-authenticated user
record and highlights the remaining required field rather than presenting a misleading blank restart.

Current production evidence shows the API persists phone, DOB, and address but still returns `isProfileComplete: false`. The generated
contract does not define which role-specific fields flip this flag, and `studentEnrollments` is structurally optional even though it may
be required by backend business logic. The frontend must not bypass this flag. Backend follow-up is required to either set the flag after
a valid Student completion, return explicit missing fields, or document the required curriculum/grade/enrollment payload.

Login applies the same guard: an unconfirmed account is sent to verification, a confirmed account with
`isProfileComplete: false` is sent to completion, and only a complete account receives a persisted session and dashboard redirect.

The completion endpoint requires authentication. After verification, the frontend therefore returns the user to Sign In first;
a confirmed but incomplete login stores the temporary authenticated session only long enough to call `register/complete`. After
successful completion, the frontend clears the session and returns the user to Sign In with one completion notice. The user must
authenticate again before dashboard routing; this deliberately avoids retaining an email/password for silent reauthentication.
The backend should eventually provide a refresh-token or current-user endpoint if a future product decision requires seamless
post-completion session refresh without another login.

This is the approved security decision: passwords are never stored in Redux, session storage, local storage, URLs, or in-memory
reauthentication state. The access token may remain active while `register/complete` runs, but it is cleared after completion and the
next login obtains the authoritative backend `dashboard` and profile state.
401 responses centrally clear the in-memory token, Redux session, and session storage, then redirect to Sign In with a safe return path.

Opening the verification link in a new tab on the same device is supported through local storage. If verification is completed on a
different device, local storage cannot contain the pending registration details; the completion page therefore allows the user to
re-enter the email and profile details. A backend completion-safe continuation identifier would improve this cross-device flow.

### Slice D — Student account management

After auth is stable:

- Fetch authenticated student profile
- Display real profile data
- Edit supported profile fields
- Handle loading, empty, validation, and mutation errors
- Add logout from the account menu
- Confirm account state after refresh and re-login

### Slice E — Student dashboard data wiring

Replace remaining demo/session-storage data endpoint by endpoint:

- Lessons
- Assignments and quizzes
- Timetable
- Tutors
- Forums/questions
- Activity feed
- Wallet/payment

Each feature should be implemented in this order:

1. API contract and response mapping
2. Query/mutation module
3. Loading and error states
4. Empty state
5. Real UI rendering
6. Mutation success/failure feedback
7. Route-level acceptance test

## 5. Active backend clarifications/blockers

These remain important before production acceptance testing:

- Exact login response shape and the location/name of the `dashboard` key
- Whether authentication is bearer-token, cookie-based, or hybrid
- Refresh-token and logout behavior
- Permission representation and authorization rules
- Exact student/parent/admin role boundaries
- Parent endpoints and account relationships
- Standard success/error response format
- List pagination format and sorting parameters
- Demo/staging/production API URLs
- Allowed production and demo CORS origins
- Async operation behavior for M-Pesa, Paystac, and other payment flows
- Wallet/payment endpoint contracts
- Assignment, timetable, forum, tutor, and activity endpoint contracts
- Email verification response and redirect expectations
- Whether verification links are intended to open the frontend directly or require manual user ID/token entry

The CORS issue seen from `demo.sqooli.africa` was addressed as a local-development concern through the Vite reverse-proxy approach. Production still requires the deployed frontend/API routing and allowed origins to be tested separately.

## 6. UX/testing requirements for the next session

Every API-backed page should provide:

- Initial loading state
- Disabled submit state while a mutation is in progress
- Inline field validation where the user can correct the value
- A consistent success notification
- A consistent non-sensitive error notification
- A useful empty state when the API returns no records
- Retry action for recoverable fetch failures
- Responsive behavior at mobile, tablet, and desktop widths

Suggested notification rules:

- Success: concise, positive, placed in the shared toast region
- Validation: attached to the relevant field or form section
- Network/service failure: generic wording such as “We could not complete that request. Please try again.”
- Authentication failure: do not reveal whether an email exists
- Backend diagnostic details: development-only console logging, never user-facing

## 7. Recommended acceptance-test matrix

### Registration

- Valid student registration
- Invalid email
- Weak password
- Password mismatch
- Existing email
- Empty required fields
- Double-click submit
- API unavailable
- Verification link success
- Invalid/expired verification token

### Login

- Valid credentials
- Invalid credentials
- Unverified account
- Locked/disabled account if supported
- API unavailable
- Refresh after login
- Logout then protected-route access

### Responsive UI

- 320px mobile viewport
- 375px mobile viewport
- 768px tablet viewport
- 1024px desktop viewport
- 1440px desktop viewport

Check the header, hero image cropping, horizontal rails, cards, forms, toast placement, and footer at every width.

## 8. Commands for the next session

```bash
cd /home/bouric/Documents/projects/SQOOLI-Client-2/sqooli-landing
npm install
npm run dev
npm run lint
npm run test
npm run build
git diff --check
```

Before making changes, inspect the worktree:

```bash
git status --short
git diff -- src/pages/schools/SchoolProfilePage.tsx src/pages/schools/SchoolHeader.tsx
```

Preserve the existing dirty changes unless their ownership and purpose are confirmed. Do not reset or delete the worktree broadly.

## 9. Handover decision

The next session should not continue polishing isolated profile sections unless a clear visual regression is found. The recommended priority is:

1. Student registration end-to-end acceptance test
2. Login/session/dashboard redirect verification
3. Authenticated API query infrastructure review
4. Student profile/account management
5. Student dashboard endpoint wiring
6. Wallet/payment and remaining feature blockers

The UDBC profile should now serve as the visual reference for consistent typography, spacing, responsive navigation, card treatment, toasts, empty states, and section behavior across the rest of the frontend.
