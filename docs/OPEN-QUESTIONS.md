# Open Questions

| Question | Blocks | Raised | Status |
|---|---|---|---|
| What exact Student fields/related records set `isProfileComplete=true`? | Backend follow-up | 2026-08-25 | deferred; frontend workaround accepted |
| Is there a refresh-token endpoint and what is the token lifecycle? | Backend follow-up | 2026-08-25 | deferred; frontend keeps 401 re-login fallback |
| Is there a canonical current-user/session bootstrap endpoint? | Backend follow-up | 2026-08-25 | deferred; `/api/Auth/me` is used when available |
| Is logout client-only or does the backend revoke tokens? | Backend follow-up | 2026-08-25 | deferred; frontend clears local session |
| Which backend response fields/codes represent duplicate email and password policy failures? | Backend follow-up | 2026-08-25 | deferred; revisit with corrected contract |
| Which API endpoints persist teacher 2FA contacts and social links from teacher onboarding? | Teacher onboarding | 2026-09-04 | open; no matching write endpoints exist in the newer 216-path export |
| What fields are required by `POST /api/Teacher/invite-teacher`, and what response/status envelope is returned? | Teacher onboarding | 2026-09-05 | open; schema marks fields optional but the UI currently collects only email and role |
| What is the supported source and test procedure for a real teacher invite token? | Teacher onboarding | 2026-09-05 | open; acceptance requires token and password; no token was consumed |
