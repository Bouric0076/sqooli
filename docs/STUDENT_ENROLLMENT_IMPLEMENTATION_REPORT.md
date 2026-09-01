# Sqooli Student Enrollment Implementation Report

**Date:** 29 August 2026  
**Workspace:** `sqooli-landing`  
**Scope:** Student onboarding, authentication, registration completion, Student dashboard entry, and Add Student Information integration

## 1. Executive summary

The frontend has received and reviewed the updated `Sqooliv1API_DOC.0.1.json` contract. The implementation has now moved from visual onboarding work into backend-compatible Student enrollment and authenticated dashboard functionality.

The main onboarding inconsistency was resolved by separating three distinct stages:

1. Account creation and email verification
2. Authenticated registration completion and role assignment
3. Student dashboard setup and enrollment enrichment

The frontend now preserves the authenticated session while completing registration, refreshes the authoritative user through `/api/Auth/me`, and routes using the backend dashboard value. The Student dashboard then provides a separate branded **Add Student Information** modal for additional Student setup.

## 2. Updated API documentation received

The updated API document is stored at:

`Sqooliv1API_DOC.0.1.json`

The generated frontend API types are available at:

`sqooli-landing/src/api/generated/api.ts`

The updated contract confirms these relevant endpoints:

- `POST /api/Auth/register/init`
- `POST /api/Auth/verify-email`
- `POST /api/Auth/resend-verification-email`
- `POST /api/Auth/register/complete`
- `POST /api/Auth/login`
- `POST /api/Auth/google-login`
- `GET /api/Auth/me`
- `PUT /api/Auth/update-profile`
- `GET /api/Curricula`
- `GET /api/Educationlevels`
- `GET /api/GradeLevels`
- `GET /api/Subject`
- `GET /api/schools/my-schools`
- `GET /api/Student/my-enrollments`
- `POST /api/Enrollment`

## 3. Completed authentication and onboarding work

### Account creation

The frontend sends the initial registration fields through `register/init`:

- First name
- Last name
- Email
- Password
- Optional phone
- Optional referral code

Password validation is now visible before submission. The user is told that the password must contain:

- At least eight characters
- An uppercase letter
- A lowercase letter
- A number
- A symbol

Duplicate, invalid, network, and authentication failures are handled through the shared error notification behavior rather than a generic silent failure.

### Email verification

After account creation, the user sees a branded verification-sent page with:

- Email address confirmation
- Inbox and spam-folder guidance
- Resend verification email action
- Sign-in link

After the verification link is used, the frontend confirms the email and redirects to Sign In. It does not open registration completion before authentication exists.

### Login and temporary passwords

The backend issues a temporary password after verification. The frontend does not store the user’s password or attempt silent password-based reauthentication.

After login:

- A valid access token is stored in the Redux/session layer.
- The login response is validated.
- `/api/Auth/me` is called to refresh current-user state where available.
- Unverified users are sent to the verification-sent page.
- Pending users are sent to Complete Registration.
- Assigned users are routed using the backend `dashboard` value.

### Session handling

The frontend now includes:

- Redux session state
- Session restoration from storage
- Bearer-token request handling
- Client-side logout
- 401 session-expiry handling
- Return-to-login behavior for expired sessions
- Current-user refresh through `/api/Auth/me`

## 4. Registration completion implementation

The Complete Registration page is now treated as the authenticated role-assignment step, not as the Student dashboard profile editor.

The page collects and submits:

- Email
- Selected role
- First name
- Last name
- Phone, sent as an empty string when not provided because the backend contract defines it as a string
- Gender
- Date of birth
- Address

The request is sent to:

`POST /api/Auth/register/complete`

After the request succeeds:

1. The frontend calls authenticated `GET /api/Auth/me`.
2. Redux is updated with the refreshed user.
3. The pending-registration record is removed.
4. The backend dashboard is used for routing.
5. The user is sent to the correct dashboard without being logged out.

The completion route is protected. A user who opens it without a valid session is returned to Sign In rather than receiving an avoidable unauthorized error.

## 5. Backend contract analysis for Student enrollment

The documented Student enrollment object is:

```json
{
  "curriculumId": 1,
  "gradeLevelId": 2,
  "schoolId": null,
  "subjectIds": [3, 4, 5]
}
```

The updated contract does not expose a dedicated Student self-enrollment write endpoint. The available documented write path for this relation is `studentEnrollments` inside `register/complete`.

The frontend therefore uses:

1. `PUT /api/Auth/update-profile` for authenticated personal profile fields.
2. `POST /api/Auth/register/complete` with `studentEnrollments` for curriculum, grade, school, and subject IDs.
3. `GET /api/Auth/me` for authoritative state refresh.

The separate `GET /api/Student/my-enrollments` endpoint is available for reading enrollments, but no corresponding Student-owned enrollment mutation endpoint is documented.

## 6. Add Student Information modal

The Student dashboard modal was expanded to align with the supplied Figma design.

It now includes:

- Profile image preview
- Read-only username/email
- Current school search
- Curriculum selection
- Education level selection
- Grade level selection
- Day Scholar or Boarder selection
- Subject selection
- Subject search
- Selected subject count
- Interests selection
- Loading and empty states
- Backend/catalog error messaging
- Save and refresh behavior

### Current API wiring

Curriculum:

`GET /api/Curricula?page=1&pageSize=100&api-version=1.0`

Education levels:

`GET /api/Educationlevels?page=1&pageSize=100&api-version=1.0`

Grade levels:

`GET /api/GradeLevels?page=1&pageSize=100&educationLevelId={id}&api-version=1.0`

Subjects:

`GET /api/Subject?page=1&pageSize=100&api-version=1.0`

Schools:

`GET /api/schools/my-schools?page=1&pageSize=20&search={term}&api-version=1.0`

The school control is now a real typeahead. Selecting a result stores its backend school ID and sends it in `studentEnrollments.schoolId`.

### Response-envelope handling

The backend catalog responses may use different collection envelopes. The modal now supports nested forms such as:

- `data: []`
- `data.items: []`
- `data.results: []`
- `data.content: []`
- Resource-specific nested arrays

This resolved the issue where the browser showed HTTP 200 responses but the modal displayed empty controls.

## 7. UX and visual refinements completed

- Registration completion now says **Complete your registration**.
- Dashboard setup says **Add Student Information**.
- The two stages no longer appear to be the same process.
- Student subjects are displayed in a bounded scroll area rather than making the modal excessively tall.
- Subject search was added for large catalogues.
- Responsive desktop and mobile layouts were preserved.
- Existing Sqooli blue, navy, white, rounded-control, and soft-border visual language was retained.
- Loading, empty, validation, and error states remain visible to the user.

## 8. Verification completed

The following checks are passing:

- ESLint
- 10 unit tests
- 6 Student onboarding/modal Playwright tests
- Production TypeScript/Vite build
- `git diff --check`

The browser tests currently cover:

- Student login to dashboard
- Registration initial request
- Password-policy feedback
- Unverified login and resend action
- Pending login to authenticated registration completion
- `/api/Auth/me` refresh before Student routing
- Add Student Information profile and enrollment payload submission
- Modal close behavior after successful save

## 9. Current implementation state

The frontend is now at the following state:

```text
Account creation
  → Email verification
  → Login with temporary password
  → Authenticated Complete Registration
  → GET /api/Auth/me
  → Backend dashboard routing
  → Student dashboard
  → Add Student Information
  → Profile and enrollment synchronization
```

The core frontend flow is functional and test-covered. The Student catalog data is loading successfully in the browser, and the school field is now connected to the documented school search endpoint.

## 10. Remaining backend limitations

The following items remain contract limitations rather than frontend omissions:

1. No documented Student-specific enrollment mutation endpoint outside `register/complete`.
2. No documented endpoint for saving profile image uploads from the Student modal.
3. No documented endpoint for saving interests.
4. No documented field for Day Scholar/Boarder in the Student profile or enrollment request.
5. `isProfileComplete` requirements remain undocumented.
6. The response schema for `register/complete` is not defined.
7. `/api/Auth/me` exists and is used, but its response contract is incomplete in the API document.
8. Dashboard, role, and profile fields are not consistently represented across login and `/me` schemas.
9. Refresh-token behavior is not documented.
10. School endpoint access and result scope for independent Students should be confirmed in production.

The frontend does not manufacture unsupported payload fields. Unsupported controls remain visible where useful for the intended UX, but their persistence is not falsely reported as complete.

## 11. Recommended next steps

### Immediate live UAT

Run a fresh Student account through the real demo environment and capture sanitized evidence for:

1. Initial registration request and response.
2. Verification link behavior.
3. Temporary-password login.
4. Login response role and dashboard values.
5. Registration completion request.
6. `/api/Auth/me` response after completion.
7. Catalog responses and school search response.
8. Add Student Information profile update request.
9. Student enrollment request.
10. Final dashboard and enrollment state.

Do not record passwords, access tokens, verification tokens, or refresh tokens.

### Student setup refinement

- Hydrate the modal from existing `studentEnrollment`/`my-enrollments` data when the backend response shape is confirmed.
- Persist and display the selected school, curriculum, grade, and subjects after refresh.
- Add clear partial-save handling if profile update succeeds but enrollment persistence fails.
- Add retry controls for catalog and school-search failures.
- Add debouncing to school search if production response volume requires it.

### Backend follow-up

Request clarification or an updated contract for:

- Student enrollment creation/update
- `isProfileComplete` rules
- Student profile image upload
- Interests persistence
- Student type persistence
- `/api/Auth/me` response schema
- Refresh token endpoint and rotation policy
- Dashboard assignment guarantees

### Broader dashboard implementation

Once Student setup is stable, proceed feature by feature:

1. Lessons and lesson details
2. Assignments and quizzes
3. Timetable
4. Tutors
5. Forums and question board
6. Activity feed
7. Wallet and payments

Each feature should be implemented with its API contract, query/mutation layer, loading state, empty state, error state, retry behavior, and route-level E2E coverage.

## 12. Key implementation files

- `sqooli-landing/src/api/account.ts`
- `sqooli-landing/src/api/catalogs.ts`
- `sqooli-landing/src/api/generated/api.ts`
- `sqooli-landing/src/auth/auth.service.ts`
- `sqooli-landing/src/auth/auth.types.ts`
- `sqooli-landing/src/auth/guards.tsx`
- `sqooli-landing/src/app/router.tsx`
- `sqooli-landing/src/pages/auth/LoginPage.tsx`
- `sqooli-landing/src/pages/auth/VerifyEmailPage.tsx`
- `sqooli-landing/src/pages/auth/RegistrationCompletionPage.tsx`
- `sqooli-landing/src/pages/student/dashboard/StudentProfileModal.tsx`
- `sqooli-landing/src/pages/student/dashboard/StudentDashboardPage.tsx`
- `sqooli-landing/src/styles/pages/student-dashboard.css`
- `sqooli-landing/e2e/student-onboarding.spec.ts`

## 13. Handover conclusion

The Student onboarding foundation is now aligned with the updated API as far as the documented contract allows. The frontend no longer confuses email verification, role assignment, and Student profile enrichment. Authentication is preserved during completion, backend state is refreshed before routing, and the Student modal now consumes live catalog and school-search data.

The next highest-value activity is live UAT against the demo backend, followed by persistence verification for Student enrollment and clarification of the remaining unsupported profile fields.
