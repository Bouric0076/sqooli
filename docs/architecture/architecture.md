# Student onboarding and authentication error architecture

## Current authoritative state

The backend response is authoritative for:

- email confirmation;
- profile completion;
- dashboard selection;
- role and permissions;
- access-token validity.

The frontend may improve presentation and collect known fields, but must not promote an incomplete account to a dashboard.

## Flow

```text
Registration form
  -> POST /api/Auth/register/init
  -> VerificationSentPage
  -> POST /api/Auth/verify-email
  -> Sign In
  -> POST /api/Auth/login
      -> unverified: VerificationSentPage
      -> incomplete: CompletionPage
      -> complete: allowlisted dashboard route
  -> authenticated completion calls
      -> POST /api/Auth/register/complete
      -> PUT /api/Auth/update-profile
  -> local session cleared
  -> Sign In again
```

## Error pipeline

```text
fetch response
  -> HTTP status + JSON envelope extraction
  -> ApiError { status, code, message, fieldErrors, requestId }
  -> domain mapping for auth/registration
  -> field-level form errors and safe global notification
```

The pipeline must handle both non-2xx responses and 2xx responses whose body contains `status: false`.

## Workaround boundary

The frontend can:

- validate known local rules;
- map backend duplicate-email/password/verification/rate-limit messages;
- show missing requirements returned by the backend;
- retain the incomplete guard;
- preserve non-sensitive in-progress onboarding context.

The frontend cannot safely:

- set `isProfileComplete` to true locally;
- infer an unknown Student enrollment requirement;
- refresh or revoke tokens without backend endpoints;
- treat a generic success message as authoritative completion.

## Proposed backend-independent improvements

1. Introduce a shared response/envelope parser for auth mutations.
2. Add domain error classification for registration and login.
3. Map field errors into React Hook Form `setError`.
4. Add an explicit incomplete/pending completion notice.
5. Add tests for HTTP errors, 200 business failures, duplicate email, password policy, unverified login, and session expiry.
6. Keep backend requests required for refresh, current-user, logout/revocation, and completion requirements.

