# Student Onboarding E2E Report

Date: 25 August 2026  
Environment: local Vite frontend against the demo API  
Browser: system Google Chrome controlled through Playwright  
Mailbox: disposable Guerrilla Mail inbox  
Evidence: EVIDENCE-006

## Result

**BLOCKED at login after successful email verification.**

The journey reached the first credential failure without using a personal mailbox or exposing a password/token in evidence.

## Journey executed

1. Opened the Student account-creation page.
2. Entered a disposable email address, first name, last name, and a generated registration password.
3. Submitted registration.
4. Confirmed the branded `Check your inbox` page appeared.
5. Confirmed the Sqooli verification email arrived.
6. Followed the email tracking redirect.
7. Resolved the backend verification target and submitted its `userId`/`token` through the frontend verification screen.
8. Confirmed the backend accepted email verification.
9. Returned to Sign In with the verified continuation message.
10. Attempted login with the password entered during registration.

## Evidence

### Registration

The frontend received HTTP 200:

```json
{
  "status": true,
  "message": "Registration initiated. Please check your email to verify your account."
}
```

The user-visible route was:

```text
/onboarding/verification-sent
```

### Verification-link mismatch

The email tracking redirect resolved to:

```text
/verify-email?userId=<id>&token=<token>
```

The frontend router currently defines:

```text
/onboarding/verify
```

Direct navigation to `/verify-email` produced React Router HTTP 404. The E2E harness mapped the observed backend route to `/onboarding/verify` to continue diagnosis. This should be fixed with a frontend compatibility route or the backend email URL should be changed to the frontend route.

### Backend verification response

Email verification returned HTTP 200 with:

```json
{
  "status": true,
  "message": "Email verified successfully. You can now complete your registration.",
  "user": {
    "isEmailConfirmed": true,
    "isProfileComplete": false,
    "userType": "Pending",
    "userRole": null
  },
  "access_token": "<redacted>"
}
```

The frontend currently discards this verification response token and asks the user to sign in again. That is consistent with the approved no-password-storage policy, but the token could support a secure continuation flow if the product later chooses to retain the verified session.

### Login blocker

The password entered during registration returned:

```json
{
  "status": false,
  "message": "Invalid credentials"
}
```

HTTP status: `401`.

The user remained on the Sign In page and saw the sanitized message:

```text
Invalid email or password. Please check your details and try again.
```

The disposable-mail API exposed the verification message, but did not expose a second temporary-credentials message or a parseable temporary password during the rerun. Therefore, the E2E run could not safely continue to login/profile completion by guessing a credential. This does not prove that the backend failed to send the second email; it proves that the selected disposable mailbox did not provide it to the test harness.

## Findings

### F-001 — Backend email route was not registered in the frontend

The backend sends `/verify-email`, while the frontend originally only registered `/onboarding/verify`. This was fixed by adding `/verify-email` as a compatibility route to the existing verification screen. The route was revalidated in the subsequent E2E run: the browser reached the Sign In page after successful verification.

### F-002 — Registration password is not accepted after verification

The password submitted during registration was rejected after successful email verification. This confirms the previously reported password replacement/temporary-password anomaly in a fresh account journey.

The backend must document whether:

- the registration password remains valid;
- it is replaced by a temporary password;
- a separate credential email is guaranteed;
- the user must complete a password setup step;
- the verification response token is intended for continuation.

### F-003 — Student enrollment was not reachable in this run

The run was blocked before profile completion, so no enrollment request was submitted. The documented contract still only exposes `studentEnrollments` inside `POST /api/Auth/register/complete`; no dedicated Student self-enrollment or independent/invited Student endpoint is documented.

## Recommended next fixes

1. Keep `/verify-email` as a compatibility route until the backend email template is aligned.
2. Confirm the intended post-verification credential with the backend and expose a deterministic UI path for it.
3. Do not tell users to use a temporary password unless the backend guarantees that email and its delivery content.
4. Once login is unblocked, rerun the complete journey and capture the `register/complete`, `update-profile`, and `/api/Auth/me` responses to determine the exact enrollment requirement.

## Environment note

The verification run proceeded with an explicit 14% disk-space override. Post-run health improved to 16% free space, with no project files deleted. The local Vite server was stopped after testing.

## Follow-up E2E run — 25 August 2026

The disposable inbox later exposed the second Sqooli message containing the effective temporary credential. The credential itself is intentionally omitted from this report.

### Journey executed

1. Logged in through the live API using the temporary credential.
2. Confirmed the backend returned HTTP 200 and `message: "Login Success"`.
3. Confirmed the frontend routed the account to `/onboarding/complete` because `isProfileComplete` was `false`.
4. Submitted the documented Student completion request with profile data.
5. Confirmed the backend returned HTTP 200 and `message: "Registration completed successfully"`.
6. Re-authenticated the account.
7. Confirmed the backend role and dashboard changed to Student/student.
8. Confirmed `isProfileComplete` still remained `false` and `studentEnrollment` remained `null`.
9. Probed the documented reference-data endpoints needed to build a Student enrollment.

### Sanitized live observations

Initial login:

```json
{
  "status": true,
  "message": "Login Success",
  "user": {
    "isEmailConfirmed": true,
    "userType": "Pending",
    "userRole": "Pending",
    "dashboard": "admin",
    "isProfileComplete": false,
    "role": [],
    "studentEnrollment": null
  }
}
```

Current-user response immediately after login:

```json
{
  "status": true,
  "message": "Current user retrieved successfully",
  "data": {
    "isVerified": false,
    "isProfileComplete": false,
    "userType": "Pending",
    "studentEnrollment": null
  }
}
```

Completion response:

```json
{
  "status": true,
  "message": "Registration completed successfully"
}
```

Login after completion:

```json
{
  "status": true,
  "message": "Login Success",
  "user": {
    "isEmailConfirmed": true,
    "userType": "Student",
    "userRole": "Student",
    "dashboard": "student",
    "isProfileComplete": false,
    "role": ["Student"]
  }
}
```

### Browser result

The local frontend correctly used the login response and navigated to:

```text
/onboarding/complete?email=<redacted>&userId=<redacted>&source=login
```

The completion form displayed the existing name/email, preselected Student, and collected gender, date of birth, address, and optional phone. The `register/complete` request returned HTTP 200. The frontend then waited for the profile update/current-user state to become complete; it did not send the account to a dashboard while the backend still reported `isProfileComplete:false`.

### Reference-data blocker

With the authenticated Student token, the documented endpoints returned:

| Endpoint | Result |
|---|---:|
| `GET /api/Curricula` | 403 |
| `GET /api/GradeLevels` | 403 |
| `GET /api/Subject` | 403 |
| `GET /api/Educationlevels` | 403 |

The completion contract accepts `studentEnrollments`, but the Student client cannot obtain valid curriculum, grade-level, or subject IDs from these protected reference endpoints. The account therefore remains without a `studentEnrollment`, and the backend continues to report an incomplete profile.

### Follow-up result

**PASS:** temporary-password login and backend role/dashboard assignment.

**PASS:** frontend routes an incomplete authenticated account to profile completion.

**BLOCKED:** dashboard access, because the backend still returns `isProfileComplete:false` after successful completion and does not expose usable Student enrollment reference data to the Student session.

### Required next decision

The backend team must provide one of the following:

- a Student-safe enrollment/reference-data contract;
- a dedicated independent-Student enrollment endpoint that accepts the required selections; or
- a clearly defined rule that a Student with no enrollment may still enter the Student dashboard.

The frontend should retain the current guard until one of those contracts is confirmed. It must not route by changing `isProfileComplete` locally or by treating a successful completion message as proof that the account is dashboard-ready.

## Frontend workaround verification — 27 August 2026

The approved workaround was implemented and verified with a deterministic Playwright test using a mocked backend response matching the live account state:

```text
userType: Student
userRole: Student
dashboard: student
isProfileComplete: false
studentEnrollment: null
```

The browser journey submitted credentials, received a successful login response, and reached `/student` without redirecting back to `/onboarding/complete`. The dashboard displayed the branded setup reminder and a `Complete setup` action. No password or access token was persisted in the test source or evidence.

Command:

```bash
npm run test:e2e
```

Result: **PASS — 1 Playwright test passed.**

The test is intentionally backend-mocked: it verifies the frontend routing contract and prevents regression, while live Student enrollment/API capability remains a backend-dependent acceptance item.
