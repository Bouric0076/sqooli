# Sqooli | v1 developer guide

Version **1.0.0**. OpenAPI **3.1.1**.

This guide is generated from the Sqooli v1 OpenAPI document. Use it as the contract for clients (web, mobile, enroll, admin).

## Interactive OpenAPI viewer

Open [`index.html`](index.html) through a local HTTP server to browse the specification in Swagger UI. From the repository root, run:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000/docs/backend-api/sqooli-v1-api/>. The viewer loads `sqooli_v1_api_documentation.json` from this directory.

## Contents

- [Base URL and versioning](#base-url-and-versioning)
- [Conventions](#conventions)
- [Authentication](#authentication)
- [Typical flows](#typical-flows)
- [Error handling](#error-handling)
- [Endpoint index](#endpoint-index)
- [Data models](schemas.md)

## Base URL and versioning

- Documented server: `https://api.antodb.com/api/`
- Every path in this spec already starts with `/api/...`.
- **Do not concatenate blindly.** If the server URL already ends with `/api/`, calling `https://api.antodb.com/api/` + `/api/Auth/login` produces a double `/api/api/` path. Prefer treating the host as `https://api.antodb.com` and using the documented path as-is (for example `POST https://api.antodb.com/api/Auth/login`).
- Most operations accept an optional query parameter `api-version` (string). Send `1.0` unless the backend team specifies otherwise.

## Conventions

- **Content-Type:** `application/json` for almost all writes. File upload is documented as `application/x-www-form-urlencoded` (typical ASP.NET IFormFile export). Send multipart form fields in real clients: the file plus `EntityType`, `EntityId`, `Category`, `IsPublic`, `Title`. Ignore swagger-only file metadata fields such as `Headers` / `Length` unless the backend team requires them.
- OpenAPI **does not mark request properties as required**. Tables show `Required: no` even when the product expects values (email, password, ids). Treat examples as shapes, not as a complete validation contract.
- **Path parameters** use `{camelCase}` placeholders (for example `{lessonId}`).
- **IDs:** several integer fields are documented as `integer | string` with an int32 pattern. Send JSON numbers unless a specific client requires strings.
- **Nullable fields** are listed as `type | null`. Omit them when unused rather than sending empty strings, unless the API requires the key.
- **HTTP verbs:** `GET` read, `POST` create/action, `PUT` replace/update, `DELETE` remove.
- The OpenAPI file documents **200 OK** for most operations and does not list error bodies. Clients should still handle 4xx/5xx (see [Error handling](#error-handling)).

## Authentication

The OpenAPI document does **not** declare a `securitySchemes` block. In practice this API is a bearer-token ASP.NET-style surface:

1. Call `POST /api/Auth/login` or `POST /api/Auth/google-login` (or complete registration).
2. Persist the access token from the JSON response (field name is not in the spec; typically `token` / `accessToken`).
3. Send `Authorization: Bearer <token>` on subsequent requests.
4. Unauthenticated endpoints are the Auth register/login/verify/resend family and payment callbacks/webhooks.

Treat webhook and M-Pesa callback URLs as **server-to-server**. Do not expose provider secrets in the browser.

## Typical flows

### Register a user

1. `POST /api/Auth/register/init` — start with email (and related fields).
2. User receives a verification email.
3. `POST /api/Auth/verify-email` — confirm the code/token.
4. Optionally `POST /api/Auth/resend-verification-email` if the message was lost.
5. `POST /api/Auth/register/complete` — profile, role, school, teacher/student enrollments.
6. Teachers may later `PUT /api/Auth/update-subjects`.

### Teach a lesson

1. Ensure catalog lookups exist: curricula, education levels, grade levels, subjects, topics, lesson types.
2. `POST` a program (and sub-programs / slots) if scheduling is program-based.
3. `POST /api/Lesson` (or the documented lesson create path) with pricing and requirements.
4. Attach objectives, content, resources, quizzes, assignments, exams.
5. Students book via LessonBooking; attendance and grading follow.

### Pay with M-Pesa wallet

1. `POST /api/wallet/verify-pin` if the product requires a PIN.
2. `POST /api/wallet/topup/mpesa` to load funds.
3. Handle `MpesaCallback` on the backend.
4. `GET /api/wallet/balance` and `GET /api/wallet/transactions` for UI.
5. `POST /api/wallet/withdraw/mpesa` or `POST /api/wallet/transfer` as needed.

## Error handling

Because the spec only lists `200 OK`, assume a typical ASP.NET problem-details or wrapper shape:

```json
{
  "success": false,
  "message": "Human-readable error",
  "errors": { "field": ["validation message"] }
}
```

Recommended client behavior:

- **400** — show validation messages; do not retry blindly.
- **401** — refresh login; send the user to Auth.
- **403** — hide the action; the role cannot perform it.
- **404** — treat the entity as missing.
- **409** — conflict (duplicate email, already booked slot).
- **5xx** — retry with backoff only for idempotent GETs.

## Endpoint index

Total operations: **178**. Grouped by tag.

### [Auth](auth.md)

Registration, login, Google sign-in, profile, terms, and teacher subject enrollment.

| Method | Path |
| --- | --- |
| `POST` | [`/api/Auth/register/init`](auth.md#post-api-auth-register-init) |
| `POST` | [`/api/Auth/verify-email`](auth.md#post-api-auth-verify-email) |
| `POST` | [`/api/Auth/resend-verification-email`](auth.md#post-api-auth-resend-verification-email) |
| `POST` | [`/api/Auth/set-password`](auth.md#post-api-auth-set-password) |
| `POST` | [`/api/Auth/register/complete`](auth.md#post-api-auth-register-complete) |
| `PUT` | [`/api/Auth/update-subjects`](auth.md#put-api-auth-update-subjects) |
| `POST` | [`/api/Auth/google-login`](auth.md#post-api-auth-google-login) |
| `POST` | [`/api/Auth/login`](auth.md#post-api-auth-login) |
| `PUT` | [`/api/Auth/update-profile`](auth.md#put-api-auth-update-profile) |
| `POST` | [`/api/Auth/accept-terms`](auth.md#post-api-auth-accept-terms) |

### [Assignment](assignment.md)

Assignments, student submission, and grading.

| Method | Path |
| --- | --- |
| `POST` | [`/api/Assignment/create`](assignment.md#post-api-assignment-create) |
| `PUT` | [`/api/Assignment/{assignmentId}`](assignment.md#put-api-assignment-assignmentid) |
| `GET` | [`/api/Assignment/{assignmentId}`](assignment.md#get-api-assignment-assignmentid) |
| `POST` | [`/api/Assignment/submit`](assignment.md#post-api-assignment-submit) |
| `POST` | [`/api/Assignment/grade`](assignment.md#post-api-assignment-grade) |
| `GET` | [`/api/assignment-resources/{type}`](assignment.md#get-api-assignment-resources-type) |

### [CertificateLevel](certificatelevel.md)

Teacher/student certificate levels lookup.

| Method | Path |
| --- | --- |
| `GET` | [`/api/CertificateLevel`](certificatelevel.md#get-api-certificatelevel) |
| `POST` | [`/api/CertificateLevel`](certificatelevel.md#post-api-certificatelevel) |
| `GET` | [`/api/CertificateLevel/{id}`](certificatelevel.md#get-api-certificatelevel-id) |
| `PUT` | [`/api/CertificateLevel/{id}`](certificatelevel.md#put-api-certificatelevel-id) |
| `DELETE` | [`/api/CertificateLevel/{id}`](certificatelevel.md#delete-api-certificatelevel-id) |

### [Contract](contract.md)

Contracts between schools, teachers, or platform.

| Method | Path |
| --- | --- |
| `GET` | [`/api/Contract`](contract.md#get-api-contract) |
| `POST` | [`/api/Contract`](contract.md#post-api-contract) |
| `GET` | [`/api/Contract/{id}`](contract.md#get-api-contract-id) |
| `PUT` | [`/api/Contract/{id}`](contract.md#put-api-contract-id) |
| `DELETE` | [`/api/Contract/{id}`](contract.md#delete-api-contract-id) |

### [Curricula](curricula.md)

Curriculum catalog.

| Method | Path |
| --- | --- |
| `GET` | [`/api/Curricula`](curricula.md#get-api-curricula) |
| `POST` | [`/api/Curricula`](curricula.md#post-api-curricula) |
| `GET` | [`/api/Curricula/{id}`](curricula.md#get-api-curricula-id) |
| `PUT` | [`/api/Curricula/{id}`](curricula.md#put-api-curricula-id) |
| `DELETE` | [`/api/Curricula/{id}`](curricula.md#delete-api-curricula-id) |

### [Educationlevels](educationlevels.md)

Education levels lookup (e.g. primary, secondary).

| Method | Path |
| --- | --- |
| `GET` | [`/api/Educationlevels`](educationlevels.md#get-api-educationlevels) |
| `POST` | [`/api/Educationlevels`](educationlevels.md#post-api-educationlevels) |
| `GET` | [`/api/Educationlevels/{id}`](educationlevels.md#get-api-educationlevels-id) |
| `PUT` | [`/api/Educationlevels/{id}`](educationlevels.md#put-api-educationlevels-id) |
| `DELETE` | [`/api/Educationlevels/{id}`](educationlevels.md#delete-api-educationlevels-id) |

### [Email](email.md)

Transactional email send endpoints.

| Method | Path |
| --- | --- |
| `POST` | [`/api/email/send`](email.md#post-api-email-send) |

### [Exam](exam.md)

Exams, submission, and grading.

| Method | Path |
| --- | --- |
| `GET` | [`/api/exams`](exam.md#get-api-exams) |
| `POST` | [`/api/exams/create`](exam.md#post-api-exams-create) |
| `POST` | [`/api/exams/{examId}/publish`](exam.md#post-api-exams-examid-publish) |
| `POST` | [`/api/exams/{examId}/unpublish`](exam.md#post-api-exams-examid-unpublish) |
| `POST` | [`/api/exams/submit`](exam.md#post-api-exams-submit) |
| `POST` | [`/api/exams/grade/{submissionId}`](exam.md#post-api-exams-grade-submissionid) |
| `GET` | [`/api/exams/{examId}/submissions`](exam.md#get-api-exams-examid-submissions) |

### [FileUpload](fileupload.md)

Upload and list files used by lessons and resources.

| Method | Path |
| --- | --- |
| `POST` | [`/api/files/upload`](fileupload.md#post-api-files-upload) |
| `GET` | [`/api/files`](fileupload.md#get-api-files) |
| `DELETE` | [`/api/files/{id}`](fileupload.md#delete-api-files-id) |

### [GradeLevels](gradelevels.md)

Grade levels lookup.

| Method | Path |
| --- | --- |
| `GET` | [`/api/GradeLevels`](gradelevels.md#get-api-gradelevels) |
| `POST` | [`/api/GradeLevels`](gradelevels.md#post-api-gradelevels) |
| `GET` | [`/api/GradeLevels/{id}`](gradelevels.md#get-api-gradelevels-id) |
| `PUT` | [`/api/GradeLevels/{id}`](gradelevels.md#put-api-gradelevels-id) |
| `DELETE` | [`/api/GradeLevels/{id}`](gradelevels.md#delete-api-gradelevels-id) |

### [Invite](invite.md)

User and teacher invitations (single and bulk).

| Method | Path |
| --- | --- |
| `POST` | [`/api/invite`](invite.md#post-api-invite) |

### [Lesson](lesson.md)

CRUD for lessons, pricing, requirements, and lesson-scoped lookups.

| Method | Path |
| --- | --- |
| `GET` | [`/api/Lesson`](lesson.md#get-api-lesson) |
| `POST` | [`/api/Lesson`](lesson.md#post-api-lesson) |
| `GET` | [`/api/Lesson/{id}`](lesson.md#get-api-lesson-id) |
| `PUT` | [`/api/Lesson/{id}/requirements`](lesson.md#put-api-lesson-id-requirements) |
| `POST` | [`/api/Lesson/assign-teacher`](lesson.md#post-api-lesson-assign-teacher) |
| `POST` | [`/api/Lesson/{lessonId}/approve`](lesson.md#post-api-lesson-lessonid-approve) |
| `POST` | [`/api/Lesson/{lessonId}/start`](lesson.md#post-api-lesson-lessonid-start) |
| `POST` | [`/api/Lesson/{lessonId}/join`](lesson.md#post-api-lesson-lessonid-join) |
| `POST` | [`/api/Lesson/{lessonId}/end`](lesson.md#post-api-lesson-lessonid-end) |
| `GET` | [`/api/Lesson/{lessonId}/attendance`](lesson.md#get-api-lesson-lessonid-attendance) |
| `GET` | [`/api/Lesson/{lessonId}/status`](lesson.md#get-api-lesson-lessonid-status) |

### [LessonAttendance](lessonattendance.md)

Attendance for booked lessons.

| Method | Path |
| --- | --- |
| `GET` | [`/api/LessonAttendance`](lessonattendance.md#get-api-lessonattendance) |
| `GET` | [`/api/LessonAttendance/{id}`](lessonattendance.md#get-api-lessonattendance-id) |
| `POST` | [`/api/LessonAttendance/attendance/teacher/join`](lessonattendance.md#post-api-lessonattendance-attendance-teacher-join) |
| `POST` | [`/api/LessonAttendance/attendance/student/join`](lessonattendance.md#post-api-lessonattendance-attendance-student-join) |
| `POST` | [`/api/LessonAttendance/attendance/leave`](lessonattendance.md#post-api-lessonattendance-attendance-leave) |
| `GET` | [`/api/LessonAttendance/attendance/status`](lessonattendance.md#get-api-lessonattendance-attendance-status) |
| `GET` | [`/api/LessonAttendance/attendance/result`](lessonattendance.md#get-api-lessonattendance-attendance-result) |

### [LessonBooking](lessonbooking.md)

Student booking of lesson slots and invitation accept/reject.

| Method | Path |
| --- | --- |
| `GET` | [`/api/LessonBooking`](lessonbooking.md#get-api-lessonbooking) |
| `GET` | [`/api/LessonBooking/{id}`](lessonbooking.md#get-api-lessonbooking-id) |
| `POST` | [`/api/LessonBooking/book-lesson`](lessonbooking.md#post-api-lessonbooking-book-lesson) |

### [LessonContent](lessoncontent.md)

Structured lesson lectures, sections, and content items.

| Method | Path |
| --- | --- |
| `GET` | [`/api/lesson-content/{lessonId}`](lessoncontent.md#get-api-lesson-content-lessonid) |
| `PUT` | [`/api/lesson-content/replace`](lessoncontent.md#put-api-lesson-content-replace) |

### [LessonObjectives](lessonobjectives.md)

Learning objectives attached to lessons.

| Method | Path |
| --- | --- |
| `GET` | [`/api/LessonObjectives`](lessonobjectives.md#get-api-lessonobjectives) |
| `POST` | [`/api/LessonObjectives`](lessonobjectives.md#post-api-lessonobjectives) |
| `GET` | [`/api/LessonObjectives/{id}`](lessonobjectives.md#get-api-lessonobjectives-id) |
| `PUT` | [`/api/LessonObjectives/{id}`](lessonobjectives.md#put-api-lessonobjectives-id) |
| `DELETE` | [`/api/LessonObjectives/{id}`](lessonobjectives.md#delete-api-lessonobjectives-id) |
| `POST` | [`/api/LessonObjectives/bulk`](lessonobjectives.md#post-api-lessonobjectives-bulk) |
| `PUT` | [`/api/LessonObjectives/bulk-replace`](lessonobjectives.md#put-api-lessonobjectives-bulk-replace) |

### [LessonType](lessontype.md)

Lesson type lookup.

| Method | Path |
| --- | --- |
| `GET` | [`/api/LessonType`](lessontype.md#get-api-lessontype) |
| `POST` | [`/api/LessonType`](lessontype.md#post-api-lessontype) |
| `GET` | [`/api/LessonType/{id}`](lessontype.md#get-api-lessontype-id) |
| `PUT` | [`/api/LessonType/{id}`](lessontype.md#put-api-lessontype-id) |
| `DELETE` | [`/api/LessonType/{id}`](lessontype.md#delete-api-lessontype-id) |

### [License](license.md)

License issuance and lookup.

| Method | Path |
| --- | --- |
| `POST` | [`/api/License/save-qualifications`](license.md#post-api-license-save-qualifications) |

### [MpesaCallback](mpesacallback.md)

M-Pesa STK / callback notifications.

| Method | Path |
| --- | --- |
| `POST` | [`/api/mpesa/callback`](mpesacallback.md#post-api-mpesa-callback) |

### [Payments](payments.md)

Payment records and status.

| Method | Path |
| --- | --- |
| `GET` | [`/api/Payments`](payments.md#get-api-payments) |
| `POST` | [`/api/Payments`](payments.md#post-api-payments) |
| `GET` | [`/api/Payments/{id}`](payments.md#get-api-payments-id) |
| `PUT` | [`/api/Payments/{id}`](payments.md#put-api-payments-id) |
| `DELETE` | [`/api/Payments/{id}`](payments.md#delete-api-payments-id) |

### [PaymentWebhook](paymentwebhook.md)

Inbound payment provider webhooks.

| Method | Path |
| --- | --- |
| `POST` | [`/api/payments/webhook/mpesa`](paymentwebhook.md#post-api-payments-webhook-mpesa) |

### [Paystack](paystack.md)

Paystack-specific payment operations.

| Method | Path |
| --- | --- |
| `POST` | [`/api/payment/paystack/initialize`](paystack.md#post-api-payment-paystack-initialize) |
| `GET` | [`/api/payment/paystack/verify`](paystack.md#get-api-payment-paystack-verify) |
| `POST` | [`/api/payment/paystack/webhook`](paystack.md#post-api-payment-paystack-webhook) |

### [Program](program.md)

Academic programs, sub-programs, schedules, slots, and holidays.

| Method | Path |
| --- | --- |
| `GET` | [`/api/CPrograms`](program.md#get-api-cprograms) |
| `POST` | [`/api/CPrograms`](program.md#post-api-cprograms) |
| `GET` | [`/api/CPrograms/{id}`](program.md#get-api-cprograms-id) |
| `PUT` | [`/api/CPrograms/{id}`](program.md#put-api-cprograms-id) |
| `DELETE` | [`/api/CPrograms/{id}`](program.md#delete-api-cprograms-id) |
| `POST` | [`/api/CPrograms/{programId}`](program.md#post-api-cprograms-programid) |
| `GET` | [`/api/CPrograms/{subProgramId}/slots`](program.md#get-api-cprograms-subprogramid-slots) |
| `POST` | [`/api/CPrograms/slots/bulk-invite`](program.md#post-api-cprograms-slots-bulk-invite) |
| `GET` | [`/api/CPrograms/slots`](program.md#get-api-cprograms-slots) |
| `GET` | [`/api/CPrograms/timetable`](program.md#get-api-cprograms-timetable) |
| `GET` | [`/api/CPrograms/invitations`](program.md#get-api-cprograms-invitations) |
| `GET` | [`/api/CPrograms/slots/details`](program.md#get-api-cprograms-slots-details) |
| `POST` | [`/api/CPrograms/slots/accept`](program.md#post-api-cprograms-slots-accept) |
| `POST` | [`/api/CPrograms/slots/decline`](program.md#post-api-cprograms-slots-decline) |
| `POST` | [`/api/CPrograms/slots/{slotId}/respond`](program.md#post-api-cprograms-slots-slotid-respond) |

### [Programs](programs.md)

Alternate/legacy program listing endpoints.

| Method | Path |
| --- | --- |
| `GET` | [`/api/Programs`](programs.md#get-api-programs) |
| `POST` | [`/api/Programs`](programs.md#post-api-programs) |
| `GET` | [`/api/Programs/{id}`](programs.md#get-api-programs-id) |
| `PUT` | [`/api/Programs/{id}`](programs.md#put-api-programs-id) |
| `DELETE` | [`/api/Programs/{id}`](programs.md#delete-api-programs-id) |

### [ProgramType](programtype.md)

Lookup of program types.

| Method | Path |
| --- | --- |
| `GET` | [`/api/ProgramType`](programtype.md#get-api-programtype) |
| `POST` | [`/api/ProgramType`](programtype.md#post-api-programtype) |
| `GET` | [`/api/ProgramType/{id}`](programtype.md#get-api-programtype-id) |
| `PUT` | [`/api/ProgramType/{id}`](programtype.md#put-api-programtype-id) |
| `DELETE` | [`/api/ProgramType/{id}`](programtype.md#delete-api-programtype-id) |

### [Question](question.md)

Question bank CRUD and options.

| Method | Path |
| --- | --- |
| `POST` | [`/api/questions/create`](question.md#post-api-questions-create) |
| `GET` | [`/api/questions/topic/{topicId}`](question.md#get-api-questions-topic-topicid) |

### [QuestionTypes](questiontypes.md)

Lookup of question types.

| Method | Path |
| --- | --- |
| `GET` | [`/api/question-types`](questiontypes.md#get-api-question-types) |
| `POST` | [`/api/question-types`](questiontypes.md#post-api-question-types) |

### [Quizzes](quizzes.md)

Create quizzes for lessons, list quizzes, and submit student answers.

| Method | Path |
| --- | --- |
| `POST` | [`/api/Quizzes`](quizzes.md#post-api-quizzes) |
| `GET` | [`/api/Quizzes/lesson/{lessonId}`](quizzes.md#get-api-quizzes-lesson-lessonid) |
| `POST` | [`/api/Quizzes/submit`](quizzes.md#post-api-quizzes-submit) |

### [Resource](resource.md)

Learning resources attached to lessons or topics.

| Method | Path |
| --- | --- |
| `POST` | [`/api/Resource/create`](resource.md#post-api-resource-create) |
| `POST` | [`/api/Resource/{resourceId}/attach`](resource.md#post-api-resource-resourceid-attach) |
| `GET` | [`/api/Resource/resource/{resourceType}`](resource.md#get-api-resource-resource-resourcetype) |
| `GET` | [`/api/Resource/{id}`](resource.md#get-api-resource-id) |

### [RevenueShare](revenueshare.md)

Revenue share configuration and reporting.

| Method | Path |
| --- | --- |
| `PUT` | [`/api/lesson-revenue-share/{lessonId}/pricing`](revenueshare.md#put-api-lesson-revenue-share-lessonid-pricing) |
| `GET` | [`/api/lesson-revenue-share/{lessonId}/pricing`](revenueshare.md#get-api-lesson-revenue-share-lessonid-pricing) |

### [School](school.md)

School records and configuration.

| Method | Path |
| --- | --- |
| `GET` | [`/api/schools/my-schools`](school.md#get-api-schools-my-schools) |
| `GET` | [`/api/schools/{id}`](school.md#get-api-schools-id) |

### [SchoolAdmin](schooladmin.md)

School administrator accounts.

| Method | Path |
| --- | --- |
| `GET` | [`/api/SchoolAdmin`](schooladmin.md#get-api-schooladmin) |
| `POST` | [`/api/SchoolAdmin/invite`](schooladmin.md#post-api-schooladmin-invite) |
| `DELETE` | [`/api/SchoolAdmin/{id}`](schooladmin.md#delete-api-schooladmin-id) |

### [SchoolTypes](schooltypes.md)

Lookup of school types.

| Method | Path |
| --- | --- |
| `GET` | [`/api/school-types`](schooltypes.md#get-api-school-types) |
| `POST` | [`/api/school-types`](schooltypes.md#post-api-school-types) |
| `GET` | [`/api/school-types/{id}`](schooltypes.md#get-api-school-types-id) |
| `PUT` | [`/api/school-types/{id}`](schooltypes.md#put-api-school-types-id) |
| `DELETE` | [`/api/school-types/{id}`](schooltypes.md#delete-api-school-types-id) |

### [Student](student.md)

Student records and enrollment.

| Method | Path |
| --- | --- |
| `GET` | [`/api/Student`](student.md#get-api-student) |
| `POST` | [`/api/Student`](student.md#post-api-student) |
| `GET` | [`/api/Student/booking-students`](student.md#get-api-student-booking-students) |
| `GET` | [`/api/Student/{id}`](student.md#get-api-student-id) |
| `PUT` | [`/api/Student/{id}`](student.md#put-api-student-id) |
| `DELETE` | [`/api/Student/{id}`](student.md#delete-api-student-id) |

### [Subject](subject.md)

Subjects catalog.

| Method | Path |
| --- | --- |
| `GET` | [`/api/Subject`](subject.md#get-api-subject) |
| `POST` | [`/api/Subject`](subject.md#post-api-subject) |
| `GET` | [`/api/Subject/{id}`](subject.md#get-api-subject-id) |
| `PUT` | [`/api/Subject/{id}`](subject.md#put-api-subject-id) |
| `DELETE` | [`/api/Subject/{id}`](subject.md#delete-api-subject-id) |

### [SubjectCategory](subjectcategory.md)

Subject categories.

| Method | Path |
| --- | --- |
| `GET` | [`/api/SubjectCategory`](subjectcategory.md#get-api-subjectcategory) |
| `POST` | [`/api/SubjectCategory`](subjectcategory.md#post-api-subjectcategory) |
| `GET` | [`/api/SubjectCategory/{id}`](subjectcategory.md#get-api-subjectcategory-id) |
| `PUT` | [`/api/SubjectCategory/{id}`](subjectcategory.md#put-api-subjectcategory-id) |
| `DELETE` | [`/api/SubjectCategory/{id}`](subjectcategory.md#delete-api-subjectcategory-id) |

### [Teacher](teacher.md)

Teacher directory, qualifications, invites, and lesson assignment.

| Method | Path |
| --- | --- |
| `GET` | [`/api/Teacher`](teacher.md#get-api-teacher) |
| `GET` | [`/api/Teacher/invited-teachers`](teacher.md#get-api-teacher-invited-teachers) |
| `GET` | [`/api/Teacher/school-admins`](teacher.md#get-api-teacher-school-admins) |
| `POST` | [`/api/Teacher/invite-teacher`](teacher.md#post-api-teacher-invite-teacher) |
| `POST` | [`/api/Teacher/accept-teacher-invite`](teacher.md#post-api-teacher-accept-teacher-invite) |

### [Topics](topics.md)

Topics within subjects.

| Method | Path |
| --- | --- |
| `GET` | [`/api/Topics`](topics.md#get-api-topics) |
| `POST` | [`/api/Topics`](topics.md#post-api-topics) |
| `GET` | [`/api/Topics/{id}`](topics.md#get-api-topics-id) |
| `PUT` | [`/api/Topics/{id}`](topics.md#put-api-topics-id) |
| `DELETE` | [`/api/Topics/{id}`](topics.md#delete-api-topics-id) |

### [Wallet](wallet.md)

Wallet balance, transaction history, M-Pesa top-up/withdraw, transfers, and PIN verification.

| Method | Path |
| --- | --- |
| `GET` | [`/api/wallet/balance`](wallet.md#get-api-wallet-balance) |
| `GET` | [`/api/wallet/transactions`](wallet.md#get-api-wallet-transactions) |
| `POST` | [`/api/wallet/topup/mpesa`](wallet.md#post-api-wallet-topup-mpesa) |
| `POST` | [`/api/wallet/withdraw/mpesa`](wallet.md#post-api-wallet-withdraw-mpesa) |
| `POST` | [`/api/wallet/transfer`](wallet.md#post-api-wallet-transfer) |
| `POST` | [`/api/wallet/verify-pin`](wallet.md#post-api-wallet-verify-pin) |
