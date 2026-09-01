# USER-FLOW-GJ-002 — Assigned incomplete Student reaches dashboard

Requirement(s): R1, R2  
Risk tier: medium

## Preconditions

- [x] Playwright browser test environment
- [x] Mocked login and current-user responses
- [x] Backend-shaped account: `userType: Student`, `userRole: Student`, `dashboard: student`, `isProfileComplete: false`
- [x] No real password, token, email, payment, or personal account

## Steps

1. Open Sign In → login form is visible.
2. Submit valid-shaped test credentials → backend-shaped Login Success response is returned.
3. Hydrate current-user state → account remains assigned Student but incomplete.
4. Follow the post-login route → browser reaches `/student`, not `/onboarding/complete`.
5. Inspect the dashboard → setup reminder and `Complete setup` action are visible.

## Failure states

- [x] Incomplete profile is represented without a redirect loop.
- [x] Unknown/pending role remains protected by the dashboard guard.
- [x] Real 401/session expiry behavior remains covered by the existing auth client path.
- [ ] Live backend Student enrollment acceptance — deferred until backend contract/reference data is available.

## Evidence

Path: `docs/verification/evidence/EVIDENCE-007.md`  
Automated command: `npm run test:e2e`  
Result: PASS
