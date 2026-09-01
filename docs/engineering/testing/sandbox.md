# Provider Sandbox Matrix

| Provider | Sandbox/test mode | Credentials source | Verification notes |
|---|---|---|---|
| M-Pesa | no — not used in this journey | none | Payment flows are outside this regression. |
| SMS/email/OTP | mocked — not used in this journey | Playwright route fixtures | No real email, SMS, OTP, or provider credential is used. |

The dashboard-routing regression mocks only the authentication/current-user API responses. Live disposable-mail onboarding remains documented separately in `docs/E2E_STUDENT_ONBOARDING_REPORT.md` and is not required for this frontend guard test.

Production credentials are prohibited in agent-run VERIFY unless a human authorizes a scoped production smoke test for that session.
