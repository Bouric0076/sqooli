# Student onboarding and authentication error requirements

## Scope

This change covers the authenticated Student onboarding flow and registration/login error handling. It does not invent a backend completion rule or bypass `isProfileComplete`.

## Functional requirements

### R1 — Account-state routing

- Unverified accounts route to the verification-sent page.
- Verified but incomplete accounts route to profile completion.
- Verified and complete accounts route using the backend `dashboard` key.
- The frontend must never infer completion from local form submission success alone.

### R2 — Completion-state transparency

- If the backend returns missing fields or completion requirements, show them as actionable items.
- If the backend returns success but the next authoritative user state remains incomplete, show a truthful “profile saved, backend completion pending” state rather than claiming completion.
- Persist no password or access token in URLs or local storage.

### R3 — Registration validation

- Invalid email format is shown beside the email field.
- Password shorter than the configured minimum is shown beside the password field.
- Password mismatch is shown beside confirmation.
- Existing email/account responses are mapped to the email field with a clear correction path.
- Network, rate-limit, authorization, and server failures have distinct safe messages.

### R4 — Login validation

- Invalid credentials are presented as a login error without revealing whether an email exists.
- Unverified account responses route to verification guidance.
- Expired session responses route to Sign In with an expiry explanation.
- A successful API response with a valid token must not be displayed as invalid credentials.

### R5 — Error contract resilience

- Parse both HTTP-error responses and HTTP-200 envelopes where `status: false`.
- Preserve field errors, safe message, backend code, HTTP status, and request ID for development diagnostics.
- Never display tokens, passwords, password hashes, stack traces, or raw authorization details.

## Acceptance criteria

- A fresh Student can complete the known valid flow without a generic error replacing a specific backend validation message.
- Duplicate email displays an email-specific correction message.
- Password policy errors are displayed before or alongside the backend response.
- Profile completion remains blocked when authoritative backend state is false, but the user sees the reason or pending-state explanation.
- All existing auth tests continue to pass and new error-routing tests cover HTTP and envelope failures.

