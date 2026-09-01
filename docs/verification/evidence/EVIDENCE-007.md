# EVIDENCE-007

Requirement(s): R1, R2  
Platform/device/browser: Local web application, Playwright Desktop Chrome  
Starting state and test data: Fresh browser context; mocked backend response representing an assigned Student with `isProfileComplete:false` and no enrollment.

## Journey steps

1. Open `/login`.
2. Submit test credentials.
3. Return Login Success with `dashboard: "student"`, `userType: "Student"`, `userRole: "Student"`, and `isProfileComplete:false`.
4. Return current-user response with the same incomplete state.
5. Observe the final route and setup notice.

## Expected result

The user reaches `/student` because the backend assigned a valid Student dashboard. The user sees a truthful setup reminder and can return to profile completion. The user is not sent into an infinite completion redirect.

## Observed result

The browser reached `/student`; `Finish setting up your Sqooli account` and `Complete setup` were visible. Pending/unknown accounts remain blocked by the assigned-dashboard guard.

## Screenshots/traces/logs/network

- Playwright command: `npm run test:e2e`
- Result: 1 test passed in 5.4 seconds.
- Backend calls were mocked and contained no real credentials.
- Trace artifacts are retained on failure only.

## Result

PASS

## Scope note

This proves the frontend workaround and regression contract. It does not prove that the backend has completed Student enrollment or that every Student dashboard API permits an incomplete profile. That live backend question remains deferred and is recorded in the blocker reports.
