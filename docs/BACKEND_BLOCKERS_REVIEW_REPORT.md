# Sqooli Backend Blockers and Missing Endpoints

## Review purpose

This report contains only backend anomalies, blockers, undefined contracts, and missing endpoints affecting the Sqooli frontend integration. It is intended for backend review and resolution tracking.

Review date: 22 August 2026  
Frontend consumer: `sqooli-landing`  
API reference: `docs/backend-api/sqooli-v1-api/` and its generated OpenAPI document.

## Executive summary

The Student authentication path is connected to the real API, but production acceptance is blocked by incomplete backend contracts rather than frontend routing logic.

The most urgent issue is account completion. The API accepts registration/profile requests and returns success messages, but a subsequent login can still return `isProfileComplete: false`. The frontend correctly prevents dashboard access in this state, leaving the user in a completion loop. A live authenticated probe has now confirmed that the current-user endpoint returns `studentEnrollment: null` and `isProfileComplete: false` for the affected Student account, so the missing enrollment is a concrete candidate requirement. The backend must define and enforce completion rules and return authoritative completion data.

The second major issue is session lifecycle. The documented API exposes login but does not expose a refresh-token, current-user/session bootstrap, or logout/revocation contract. The frontend can safely clear local state after a 401, but cannot implement persistent authentication or silent renewal without these backend capabilities.

The supplied OpenAPI contract also lacks security declarations, reliable response schemas, explicit required fields, enum values, and standardized error envelopes.

## Severity guide

- **P0 — Release blocker:** prevents a core authenticated journey or creates a serious security/authorization ambiguity.
- **P1 — High:** blocks reliable feature integration or causes repeated user-facing failures.
- **P2 — Medium:** limits a feature or creates substantial integration risk.
- **P3 — Low:** clarification or quality improvement that does not block the Student MVP.

## 1. Critical anomalies and blockers

### B-001 — Successful profile completion does not set `isProfileComplete`

**Severity:** P0 — Release blocker  
**Area:** Registration completion, profile update, dashboard access

**Observed behavior:** The frontend receives success responses such as `Registration completed successfully` and `Profile updated successfully`. Phone, date of birth, and address can be persisted, but a subsequent login still returns:

```json
{
  "user": {
    "userType": "Student",
    "userRole": "Student",
    "dashboard": "student",
    "isProfileComplete": false
  }
}
```

**Impact:** The frontend must block dashboard access. Bypassing the flag could expose an incomplete account; obeying it traps the user in onboarding.

**Required backend action:** Set `isProfileComplete` to true when all role-specific requirements are valid, or return an explicit `missingFields` / `completionRequirements` response. Document whether completion depends on the user record, role profile, enrollment, accepted terms, or a combination.

**Acceptance criteria:**

- Valid Student completion changes the authoritative login response to `isProfileComplete: true`.
- Invalid completion returns the missing requirement.
- A success message is not returned while the next login still reports incomplete state.

### B-002 — Student completion requirements are undefined

**Severity:** P0 — Release blocker  
**Area:** Student onboarding

The OpenAPI `RegisterCompleteRequest` marks `gender`, `address`, `studentEnrollments`, `curriculumIds`, and role-specific fields optional, while `StudentModel` marks `gender` and `dob` required.

The backend has not stated whether Student completion additionally requires a student profile, curriculum, grade level, school, subject selection, enrollment, or accepted terms.

**Impact:** The frontend can submit a schema-valid request that backend business logic still considers incomplete.

**Required backend action:** Publish a role-specific completion matrix:

| Role | Required fields | Required related records | Completion condition |
| --- | --- | --- | --- |
| Student | Must be defined | Must be defined | Must be defined |
| Teacher | Must be defined | Must be defined | Must be defined |
| Parent | Must be defined | Must be defined | Must be defined |
| School | Must be defined | Must be defined | Must be defined |

Correct the OpenAPI required arrays and role-specific validation responses.

### B-003 — `studentEnrollments` may be required despite being optional in the schema

**Severity:** P0/P1 — Blocked until clarified  
**Area:** Student registration completion

Documented shape:

```json
{
  "studentEnrollments": [
    {
      "curriculumId": 0,
      "gradeLevelId": 0,
      "schoolId": 0,
      "subjectIds": [0]
    }
  ]
}
```

The schema does not say whether this is required, whether an independent learner may omit `schoolId`, or whether `subjectIds` may be empty.

**Required backend clarification:**

- Is an enrollment mandatory for a Student?
- Are curriculum and grade level mandatory?
- Is school nullable for independent learners?
- Are subject IDs required?
- Are repeated submissions idempotent?
- Which reference-data endpoints supply valid IDs?

### B-003a — Student enrollment and independent/invited-student lifecycle are undocumented

**Severity:** P0/P1 — Blocks reliable Student onboarding

The contract exposes `studentEnrollments` only as an optional field on `POST /api/Auth/register/complete`. It does not document a dedicated Student enrollment endpoint. The separate Student resource exposes CRUD routes (`GET/POST/PUT/DELETE /api/Student`), but its permissions and relationship to `studentEnrollments` are unclear; the affected Student token received `403` from `GET /api/Student` during live testing.

`StudentEnrollmentRequest` contains only `curriculumId`, `gradeLevelId`, optional `schoolId`, and `subjectIds`. It has no `isIndependent` or invitation token field. `isIndependent` appears on the documented `TeacherModel`, not `StudentModel`.

The contract supports a generic `referralCode` during registration and exposes `referredByUserId`/`referrals` on user-shaped models, but it does not document how a referred Student is attached to a school or how referral status affects completion. The invitation routes documented are generic email invitations, teacher invitations, school-admin invitations, and lesson-slot invitations; no Student school-invitation acceptance flow is defined.

**Required backend action:** Document separate Student paths for independent enrollment, school invitation acceptance, and referral attribution, including required IDs, tokens, authorization, idempotency, and the rule that changes `isProfileComplete`.

### B-004 — No refresh-token or token-renewal endpoint

**Severity:** P0 — Release blocker for persistent sessions  
**Area:** Authentication lifecycle

No refresh endpoint is documented. The access-token expiry and renewal lifecycle are also undefined.

**Impact:** The frontend can only clear local state after a 401 and require sign-in again. It cannot safely implement persistent login.

**Required endpoint or decision:**

```text
POST /api/Auth/refresh
```

Document refresh-token transport, access/refresh lifetimes, rotation, reuse detection, revocation, invalid-token responses, and logout interaction. Alternatively, explicitly confirm that re-login after expiry is the intended behavior.

### B-005 — Current-user endpoint exists live but is absent from the published contract

**Severity:** P1 — High  
**Area:** Reload and persistent session validation

The published API documentation does not list a canonical current-user endpoint. However, a live authenticated request to `GET /api/Auth/me?api-version=1.0` returned HTTP 200 with `status: true` and `message: "Current user retrieved successfully"`.

The live response shape is:

```json
{
  "status": true,
  "message": "Current user retrieved successfully",
  "data": {
    "id": "<user-id>",
    "userName": "<email>",
    "email": "<email>",
    "firstName": "<first-name>",
    "lastName": "<last-name>",
    "phone": "<phone>",
    "gender": "Male",
    "dob": null,
    "address": "Nairobi",
    "userType": "Student",
    "isVerified": false,
    "isActive": true,
    "isProfileComplete": false,
    "roles": ["Student"],
    "schoolId": null,
    "schoolName": null,
    "studentEnrollment": null
  }
}
```

This endpoint is therefore an observed backend capability, but its response schema is undocumented and inconsistent with the login projection previously observed for the same account: login reported `isEmailConfirmed: true` and a populated DOB, while `/api/Auth/me` reported `isVerified: false` and `dob: null`.

**Impact:** Browser reload can restore stale login data but cannot revalidate token validity, role, dashboard, permissions, profile completion, or account status.

**Required contract action:**

```text
GET /api/Auth/me
```

Document and stabilize the existing endpoint. It should return the authoritative user, email-confirmation state, profile-completion state, dashboard, role, permissions, profile data, enrollment data, and enabled/disabled state. The frontend can use it for session bootstrap only after the field meanings and consistency with login are confirmed.

### B-006 — No documented logout or token-revocation endpoint

**Severity:** P1 — High  
**Area:** Account security

Frontend logout removes local credentials, but a backend token may remain usable until expiry.

**Required endpoint or decision:**

```text
POST /api/Auth/logout
```

Document whether tokens are revoked, how password changes and account disablement invalidate sessions, and whether logout is idempotent.

### B-007 — Authentication security is absent from OpenAPI metadata

**Severity:** P1 — High  
**Area:** API security

The OpenAPI document does not declare security schemes or operation-level security requirements, although integration uses `Authorization: Bearer <token>`.

**Required backend action:** Define the bearer/cookie scheme, mark protected operations, document public exceptions, and define 401/403 responses and token claims.

### B-008 — Response schemas and error envelopes are incomplete/inconsistent

**Severity:** P1 — High  
**Area:** All domains

Generated operations often have no usable response schema, while live responses use variations such as `status`/`Status`, `message`/`Message`, `data`, and `error`.

**Impact:** The frontend must parse unknown responses defensively. HTTP 200 can conceal business failure unless the envelope is interpreted correctly.

**Required backend action:** Publish response schemas/examples for login, registration, verification, completion, profile update, current user, lists, pagination, validation, and 401/403/404/409/422/429/5xx responses. Standardize casing and envelope structure.

### B-009 — Registration password behavior is contradictory or undocumented

**Severity:** P1 — High  
**Area:** Registration and login

Users entered a password during registration, then received an email containing a temporary password. In testing, the original password failed while the temporary password worked. In another test, the API returned login success and a token while the UI displayed invalid credentials.

**Required backend action:** Define one authoritative flow: preserve the user password, replace it with a temporary password and require a change, or use a passwordless setup step. Define expiry, forced change, and the exact invalid-credential status. A successful authentication must never map to an invalid-credentials response.

The published request schema only declares `password` as a string. It does not state minimum length, uppercase/lowercase requirements, numeric/special-character requirements, breached-password checks, expiry, or forced-change behavior. The frontend currently communicates the only confirmed local rule: at least 8 characters. It must not claim stronger requirements until the backend publishes them.

### B-010 — Role, user type, dashboard, and permission values can conflict

**Severity:** P1 — High  
**Area:** Authorization and routing

An earlier Student response contained `dashboard: "admin"`; later corrected data contained `userType: Student`, `userRole: Student`, `dashboard: student`, and `role: ["Student"]`. The backend also stated that current accounts should have one role while legacy records may contain multiple roles.

**Required backend action:** Define authoritative fields, the type of `role`, the relationship between role fields and permissions, legacy migration behavior, and conflict behavior. A Student must always receive a Student-compatible dashboard and permission set.

### B-011 — API version, environment, and CORS behavior are not formalized

**Severity:** P1 — High  
**Area:** Deployment and API access

The documentation references `api-version=1.0`, but environment URLs and required values are not consistently defined. Direct browser calls encountered CORS/preflight problems, so local/demo deployments use same-origin proxying.

**Required backend/platform action:** Document development/staging/production URLs, base-path rules, API-version requirements, allowed origins, methods/headers, credential policy, proxy expectations, and a health-check endpoint.

## 2. Missing or undefined endpoints

### E-001 — Auth refresh

```text
POST /api/Auth/refresh
```

Required for access-token renewal and persistent sessions. See B-004.

### E-002 — Document and normalize current authenticated user

```text
GET /api/Auth/me
```

`GET /api/Auth/me` is available live and returned HTTP 200 for the authenticated Student account. It should be formally documented and normalized for session bootstrap, authoritative role/profile state, and post-login hydration. See B-005.

The same authenticated probe returned HTTP 403 for the reference-data routes tested at `/api/Curricula`, `/api/GradeLevels`, `/api/Subject`, `/api/Educationlevels`, and `/api/Teacher`. This prevents the frontend from safely constructing a `studentEnrollments` payload until the correct Student-readable reference endpoints or permissions are provided.

### E-003 — Logout/revocation

```text
POST /api/Auth/logout
```

Required if backend tokens are revocable. See B-006.

### E-004 — Profile completion status/requirements

Possible forms:

```text
GET /api/Auth/profile-completion
GET /api/Auth/registration/status
```

Required to return missing fields and role-specific next steps instead of forcing the frontend to infer completion from nullable fields.

### E-005 — Student enrollment lifecycle

Possible forms:

```text
GET /api/Student/enrollments
POST /api/Student/enrollments
PUT /api/Student/enrollments/{id}
```

The schema contains `StudentEnrollmentRequest`, but the lifecycle for retrieving, creating, updating, and validating enrollments is not defined.

### E-006 — Parent operations

A Parent model exists, but the complete parent workflow is not clearly documented. Expected operations may include:

```text
GET /api/Parent/profile
GET /api/Parent/students
GET /api/Parent/students/{id}
GET /api/Parent/progress
GET /api/Parent/bookings
```

The backend must publish the actual routes and ownership rules.

### E-007 — Student timetable and attendance

The roadmap requires timetable and attendance, but route ownership and response shapes are not sufficiently defined. Explicit read endpoints are needed, for example:

```text
GET /api/Student/timetable
GET /api/Student/attendance
```

The exact paths must come from the backend contract.

### E-008 — Assignment list and submission status

A complete Student workflow requires documented list, detail, submission, and submission-status operations:

```text
GET /api/Assignment/student
GET /api/Assignment/{id}
POST /api/Assignment/submit
GET /api/Assignment/{id}/submission
```

Define pagination, idempotency, resubmission rules, grading status, and attachments.

### E-009 — Quiz/exam attempt and result status

Read and submit operations exist, but attempt and result behavior is not fully defined:

```text
GET /api/Quizzes/{id}/attempt
GET /api/Quizzes/{id}/result
GET /api/exams/{id}/result
```

Define eligibility, repeat attempts, scoring, and final-result timing.

### E-010 — Payment status and verification

Initiating an M-Pesa/Paystack transaction is not proof of payment. The backend must document or expose:

```text
GET /api/wallet/transactions/{id}
GET /api/payments/{reference}
POST /api/payments/{reference}/verify
POST /api/payments/webhook
```

Define asynchronous states, callback ownership, idempotency, failure/reversal states, and receipts.

### E-011 — Public school discovery

A clear public all-schools search/list contract is not confirmed:

```text
GET /api/schools
GET /api/schools/{id}
```

Define public visibility, search, pagination, and the difference between public school access and `my-schools`.

### E-012 — Public tutor/teacher discovery

`GET /api/Teacher` exists, but public visibility and safe fields are not confirmed. Define public list/detail behavior, search, pagination, and authorization.

### E-013 — Public question list/search

Only topic-based question access is clear. The landing page and question board require:

```text
GET /api/questions
GET /api/questions/search
GET /api/topics
```

Define moderation, visibility, pagination, and anonymous access.

### E-014 — Contact-message submission

`POST /api/email/send` exists, but its purpose, authorization, persistence, abuse controls, and payload are unclear. A dedicated endpoint such as `POST /api/contact/messages` is preferable.

### E-015 — Newsletter/notification subscription

No dedicated subscription contract is confirmed. Define subscription, unsubscribe, duplicate, consent, and email-verification behavior.

### E-016 — Bookmark/save

The UI suggests saved content, but no bookmark lifecycle is documented. Either provide list/create/delete operations or remove the persistence implication from the UI.

### E-017 — Password recovery and credential lifecycle

The backend should document or provide:

```text
POST /api/Auth/forgot-password
POST /api/Auth/reset-password
POST /api/Auth/change-password
```

Define token expiry, one-time use, password policy, temporary-password replacement, and email-confirmation requirements.

### E-018 — File upload metadata and status

File upload is referenced, but limits and response data are unclear. Define upload, metadata, retrieval, and deletion behavior, including entity ownership, MIME/size validation, storage URL lifetime, and authorization.

## 3. Required backend review deliverables

1. Corrected OpenAPI JSON with security schemes and protected-operation declarations.
2. Complete Auth response schemas and examples.
3. A role-specific registration/completion requirements table.
4. A fix or explicit contract for `isProfileComplete`.
5. Refresh, current-user, and logout/revocation decisions/endpoints.
6. Standard error envelope and HTTP-status mapping.
7. Environment, API-version, and CORS configuration.
8. Student enrollment lifecycle and reference-data requirements.
9. Payment status/idempotency/callback contract.
10. Test accounts and seeded IDs for every supported role.

## 4. Resolution criteria

A blocker may be marked resolved only when:

- the API documentation is updated;
- a sanitized request/response example is supplied;
- the behavior is reproducible in the demo environment;
- the frontend can implement it without guessing;
- negative cases and authorization behavior are documented;
- a fresh test account passes the relevant acceptance flow.

Until B-001 through B-006 are resolved or formally accepted as product decisions, the Student authentication flow remains in controlled acceptance testing and is not fully production-ready.
