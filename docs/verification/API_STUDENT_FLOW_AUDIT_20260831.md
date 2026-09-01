# Student API flow audit — 31 August 2026

## Scope

API-only verification against the demo deployment and its documented backend host. No frontend automation was used. No verification token, credential, personal data, enrollment mutation, wallet mutation, or payment was replayed.

## Live contract findings

| Area | Endpoint | Observed result | Interpretation |
|---|---|---:|---|
| Session | `GET /api/Auth/me?api-version=1.0` | 401 | Current-user state requires authentication. |
| Catalog | `GET /api/Enrollment/programs?api-version=1.0` | 200 | Public enrollment catalog is available. |
| Catalog | `GET /api/Enrollment/intakes?api-version=1.0` | 200 | Public intake data is available. |
| Catalog | `GET /api/Enrollment/countries?api-version=1.0` | 200 | Public country data is available. |
| Registration validation | `POST /api/Auth/register/init` with `{}` | 400 | Public endpoint validates required name, email, and password fields. |
| Verification validation | `POST /api/Auth/verify-email` with `{}` | 400 | Public endpoint validates `userId` and `token`; no token was consumed. |
| Registration completion | `POST /api/Auth/register/complete` with `{}` | 401 | Live backend requires an authenticated/verified session before profile completion. |
| Password setup | `POST /api/Auth/set-password` with `{}` | 401 | Invite/first-login password setup requires an authenticated session. |
| Enrollments | `GET /api/Student/my-enrollments` | 401 | Student enrollment data is protected. |
| Invites | `GET /api/student-invite/my` | 401 | Invite data is protected. |
| Wallet | `GET /api/wallet/balance` | 401 | Wallet data is protected. |
| Wallet | `GET /api/wallet/transactions` | 401 | Wallet history is protected. |

The same public enrollment catalog was confirmed through `demo.sqooli.africa`, so the deployed demo frontend and API proxy are aligned for those routes.

## Important documentation discrepancy

The newer root OpenAPI file includes `Auth/set-password`, student-invite routes, self-enrollment, and wallet setup. The older checked-in generated API document did not include `Auth/set-password`. The live behavior also establishes that `register/complete` is not a freely callable public step: it needs the authenticated session created by the preceding flow.

The current enrollment state machine is therefore best understood as:

1. Public enrollment/catalog selection.
2. `Auth/register/init` creates or prepares the account and sends verification.
3. Verification consumes the one-time link and establishes or enables an authenticated continuation session.
4. `Auth/register/complete` saves the student profile/enrollment payload using that session.
5. `Auth/me`, `Student/my-enrollments`, and dashboard resources confirm the resulting state.
6. Invite users may enter through verification and then use `Auth/set-password` before dashboard access.

The exact verification response, cookie/session handoff, profile-completion transition, and enrollment persistence still require an authenticated test identity and a usable mailbox link.

## Wallet/payment safety boundary

The wallet read contract is reachable but protected. The available M-Pesa endpoints are mutation endpoints and the project sandbox policy states that no payment sandbox is available. They were intentionally not invoked. A full wallet/payment test requires a dedicated test account, an approved test phone/provider arrangement, and explicit confirmation that a real charge or withdrawal will not occur.

## Remaining blockers to full E2E proof

- A fresh registration was created successfully with a disposable demo test identity, and the verification email was delivered.
- The delivered message did not contain an extractable verification CTA/link in its API-visible `text` or `html` content. Its subject was `Confirm your email to finish your Sqooli account`, but the only URL-shaped HTML attribute observed was a tracking image; no verification token was consumed.
- A fresh, controlled demo test identity with access to its verification mailbox.
- Permission to create one disposable enrollment/account record on demo.
- The verification response/session cookies or bearer token must be captured only in memory and sanitized from evidence.
- Confirmation of the backend rule that changes `isProfileComplete` to `true`.
- A non-charging wallet/payment test mode, or explicit human-supervised payment authorization.

## Recommended next API test sequence

Use a new controlled identity and execute the following without frontend involvement:

1. `GET` public programs/intakes/countries and select a valid current intake.
2. `POST Auth/register/init`; record only status/message.
3. Retrieve the fresh email link from the controlled mailbox.
4. `POST Auth/verify-email`; record only status/message and non-sensitive state fields.
5. Reuse the returned authenticated context for `POST Auth/register/complete` with the selected student enrollment.
6. Call `GET Auth/me`, `GET Student/my-enrollments`, and dashboard reads; compare profile/enrollment flags.
7. Call `POST Auth/set-password` only for the invite-session branch.
8. Call wallet balance/setup only with the approved test identity; leave M-Pesa initiation out until a safe provider sandbox exists.
