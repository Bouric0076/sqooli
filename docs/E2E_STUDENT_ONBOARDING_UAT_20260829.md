# Student onboarding live UAT — 29 August 2026

## Scope

This UAT checked the first authenticated journey against the demo API and the local frontend:

1. Student onboarding intent.
2. Account creation contract.
3. Verification-sent route and resend behavior.
4. Login routing rules for verified, unverified, and incomplete accounts.

No personal credentials, passwords, access tokens, verification tokens, or complete verification URLs are stored in this report.

## Environment

- Frontend: local Vite application, port 5174 (port 5173 was already occupied).
- API: `https://demo.sqooli.africa`.
- Browser automation: Playwright/Chromium.
- Mailbox: disposable provider attempted; Mail.tm rate-limited mailbox creation during this run. A synthetic API-only address was used for the registration contract check and was not expected to receive mail.
- Resource note: the machine remained below the normal disk-space threshold. The user explicitly authorized proceeding; only generated caches/artifacts were cleaned before testing.

## Live API evidence

### `POST /api/Auth/register/init?api-version=1.0`

Request fields used:

- `firstName`
- `lastName`
- synthetic UAT email
- optional Kenyan phone value
- password satisfying the documented client policy

Response: HTTP `200`.

```json
{
  "status": true,
  "message": "Registration initiated. Please check your email to verify your account."
}
```

This confirms the current frontend registration payload is accepted by the demo API, including the optional phone field.

## Frontend and automated journey evidence

The browser regression suite passed the following assertions against the current implementation:

- Student selection proceeds to account creation.
- A valid registration form submits the expected payload and routes to `/onboarding/verification-sent`.
- Password input without a symbol is rejected before an API request and explains the missing requirement.
- An unverified successful login response does not enter a dashboard; it routes to the branded verification-sent page.
- The resend action calls `POST /api/Auth/resend-verification-email` with the account email.
- Verified incomplete users follow the existing dashboard-compatible setup path rather than being routed to an unrelated dashboard.

The local suite result at the start of this UAT was:

- ESLint: passed.
- Production build: passed.
- Unit tests: 10 passed.
- Playwright E2E tests: 13 passed.
- `git diff --check`: passed.

## Mailbox limitation

The disposable provider accepted the first mailbox attempt but did not deliver a message during the polling window. A fallback Mail.tm attempt was blocked by its `429` mailbox-creation rate limit. The second attempt therefore could not prove delivery of the verification message or temporary-credential message in this session.

This is a test-infrastructure limitation, not evidence that the Sqooli registration endpoint failed. The previous disposable-mail UAT report remains the source of the verified-link and temporary-password observations.

## Current routing interpretation

The frontend now follows the backend-compatible state machine:

- registration accepted → verification-sent page;
- login response with `isEmailConfirmed: false` → verification-sent page;
- verified but incomplete account → authenticated setup/dashboard reminder path;
- verified account with an assigned `dashboard` key → dashboard path derived from that key;
- a `401`/expired session → clear the Redux session and return to Sign In;
- no password or access token is retained in registration continuation storage.

The backend still returns `isProfileComplete: false` in observed successful login/profile-update responses even after fields such as phone, date of birth, and address were supplied. The exact completion rule or dedicated profile-completion endpoint remains unresolved. The frontend keeps the setup state visible as a safe workaround and must not infer completion from individual fields.

## Follow-up required

1. Repeat the full mailbox-dependent journey when a disposable inbox is available without provider rate limiting.
2. Capture only sanitized status/message/user-state fields after verification and login.
3. Confirm the backend’s temporary-password policy and whether the registration password is intentionally replaced.
4. Confirm the fields/related records that change `isProfileComplete` to `true`, and whether student enrollment is required before that transition.
5. Confirm refresh-token, logout-revocation, and current-user endpoint behavior before claiming persistent sessions.

## Decision

The authentication foundation is ready for continued frontend alignment and regression testing, but mailbox delivery and the backend profile-completion contract remain open UAT dependencies. Do not remove the verification-sent, setup reminder, or safe re-login fallbacks until those backend behaviors are formally confirmed.
