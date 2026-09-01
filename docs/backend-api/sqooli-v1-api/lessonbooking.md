# LessonBooking

Student booking of lesson slots and invitation accept/reject.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/LessonBooking {#get-api-lessonbooking}

`GET` `/api/LessonBooking`

Operation id: `get_api_LessonBooking`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `page` | `query` | `integer` (int32) | no |  |
| `pageSize` | `query` | `integer` (int32) | no |  |
| `search` | `query` | `string` | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/LessonBooking?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/LessonBooking/{id} {#get-api-lessonbooking-id}

`GET` `/api/LessonBooking/{id}`

Operation id: `get_api_LessonBooking_id`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`LessonBookingModel`](schemas.md#schema-lessonbookingmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `studentId` | `integer` (int32) | no |  |
| `student` | [`StudentModel`](#schema-studentmodel) | no |  |
| `lessonId` | `integer` (int32) | no |  |
| `lesson` | [`LessonModel`](#schema-lessonmodel) | no |  |
| `teacherId` | `integer` (int32) | no |  |
| `teacher` | [`TeacherModel`](#schema-teachermodel) | no |  |
| `status` | [`BookingStatus`](#schema-bookingstatus) | no |  |
| `amount` | `number` | no |  |
| `start` | `string` (date-time) | yes |  |
| `end` | `string` (date-time) | yes |  |
| `scheduledAt` | `string` (date-time) | no |  |
| `meetingLink` | `string` \| `null` | no |  |
| `eventId` | `string` \| `null` | no |  |
| `createdAt` | `string` (date-time) | no |  |

  Example:

```json
{
  "id": 0,
  "studentId": 0,
  "student": {
    "id": 0,
    "userId": "string",
    "user": {
      "firstName": "string",
      "lastName": "string",
      "userType": "string",
      "nationalId": "string",
      "nationality": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "isActive": true,
      "isVerified": true,
      "address": "string",
      "chatId": "string",
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "createdAt": "2026-01-15T08:00:00Z",
      "lastLoginAt": "2026-01-15T08:00:00Z",
      "transactionPinHash": "string",
      "referralCode": "string",
      "referredByUserId": "string",
      "referredByUser": null,
      "referrals": null,
      "adminProfileId": 0,
      "teacherProfileId": 0,
      "studentProfileId": 0,
      "parentProfileId": 0,
      "adminProfile": null,
      "teacherProfile": null,
      "studentProfile": null,
      "parentProfile": null,
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2026-01-15T08:00:00Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0
    },
    "admissionNumber": "string",
    "fullName": "string",
    "gender": "string",
    "dob": "2026-01-15",
    "createdAt": "2026-01-15T08:00:00Z",
    "avatarUrl": "string"
  },
  "lessonId": 0,
  "lesson": {
    "id": 0,
    "createdByUserId": "string",
    "createdByUser": {
      "firstName": "string",
      "lastName": "string",
      "userType": "string",
      "nationalId": "string",
      "nationality": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "isActive": true,
      "isVerified": true,
      "address": "string",
      "chatId": "string",
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "createdAt": "2026-01-15T08:00:00Z",
      "lastLoginAt": "2026-01-15T08:00:00Z",
      "transactionPinHash": "string",
      "referralCode": "string",
      "referredByUserId": "string",
      "referredByUser": null,
      "referrals": null,
      "adminProfileId": 0,
      "teacherProfileId": 0,
      "studentProfileId": 0,
      "parentProfileId": 0,
      "adminProfile": null,
      "teacherProfile": null,
      "studentProfile": null,
      "parentProfile": null,
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2026-01-15T08:00:00Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0
    },
    "lessonTypeId": 0,
    "curriculumId": 0,
    "subjectId": 0,
    "gradeLevelId": 0,
    "educationLevelId": 0,
    "topicId": 0,
    "programId": 0,
    "name": "string",
    "description": "string",
    "requirements": "string",
    "link": "string",
    "eventId": "string",
    "isDeleted": true,
    "isApproved": true,
    "start": "2026-01-15T08:00:00Z",
    "end": "2026-01-15T08:00:00Z",
    "created_at": "2026-01-15T08:00:00Z",
    "status": "string",
    "price": 0,
    "isStarted": true,
    "startedAt": "2026-01-15T08:00:00Z",
    "endedAt": "2026-01-15T08:00:00Z",
    "liveRoomId": "string",
    "schoolId": 0,
    "school": null,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "subject": {
      "id": 0,
      "categoryId": 0,
      "category": null,
      "curriculumId": 0,
      "curriculum": null,
      "educationLevelId": 0,
      "educationlevel": null,
      "gradeLevelId": 0,
      "gradeLevel": null,
      "name": "string",
      "colorCode": "string",
      "subProgramSubjects": []
    },
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": null,
      "educationLevelId": 0,
      "educationLevel": null,
      "name": "string"
    },
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": null,
      "name": "string"
    },
    "lessonType": {
      "id": 0,
      "name": "string"
    },
    "topic": {
      "id": 0,
      "curriculumId": 0,
      "subjectId": 0,
      "gradeLevelId": 0,
      "educationLevelId": 0,
      "name": "string",
      "curriculum": null,
      "subject": null,
      "gradeLevel": null,
      "educationlevel": null
    },
    "slotId": 0,
    "slot": {
      "id": 0,
      "subProgramId": 0,
      "subProgram": null,
      "gradeLevelId": 0,
      "gradeLevel": null,
      "slotDate": "2026-01-15T08:00:00Z",
      "startTime": "string",
      "endTime": "string",
      "status": null,
      "code": "string",
      "subjectId": 0,
      "subjectName": "string",
      "subject": null,
      "teacherId": 0,
      "teacherName": "string",
      "teacher": null,
      "lessonId": 0,
      "lesson": null,
      "invitations": []
    },
    "program": {
      "id": 0,
      "programName": "string",
      "programTypeId": 0,
      "programType": null,
      "curriculumId": 0,
      "curriculum": null,
      "programStartDate": "2026-01-15T08:00:00Z",
      "programEndDate": "2026-01-15T08:00:00Z",
      "hasSubPrograms": true,
      "subPrograms": [],
      "schedules": [],
      "holidays": null,
      "businessHours": null
    }
  },
  "teacherId": 0,
  "teacher": {
    "id": 0,
    "userId": "string",
    "user": {
      "firstName": "string",
      "lastName": "string",
      "userType": "string",
      "nationalId": "string",
      "nationality": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "isActive": true,
      "isVerified": true,
      "address": "string",
      "chatId": "string",
      "hasAcceptedTerms": true,
      "termsAcceptedAt": "2026-01-15T08:00:00Z",
      "createdAt": "2026-01-15T08:00:00Z",
      "lastLoginAt": "2026-01-15T08:00:00Z",
      "transactionPinHash": "string",
      "referralCode": "string",
      "referredByUserId": "string",
      "referredByUser": null,
      "referrals": null,
      "adminProfileId": 0,
      "teacherProfileId": 0,
      "studentProfileId": 0,
      "parentProfileId": 0,
      "adminProfile": null,
      "teacherProfile": null,
      "studentProfile": null,
      "parentProfile": null,
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2026-01-15T08:00:00Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0
    },
    "certificateLevelId": 0,
    "certificateLevel": {
      "id": 0,
      "name": "string"
    },
    "fullName": "string",
    "nationalId": "string",
    "phone": "string",
    "address": "string",
    "bio": "string",
    "gender": "string",
    "tscNumber": "string",
    "dob": "2026-01-15",
    "workplace": "string",
    "nationality": "string",
    "createdAt": "2026-01-15T08:00:00Z",
    "isIndependent": true,
    "hasAcceptedContract": true,
    "hasAcceptedTerms": true,
    "termsAcceptedAt": "2026-01-15T08:00:00Z",
    "avatarUrl": "string"
  },
  "status": 0,
  "amount": 0,
  "start": "2026-01-15T08:00:00Z",
  "end": "2026-01-15T08:00:00Z",
  "scheduledAt": "2026-01-15T08:00:00Z",
  "meetingLink": "string",
  "eventId": "string",
  "createdAt": "2026-01-15T08:00:00Z"
}
```

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/LessonBooking/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/LessonBooking/book-lesson {#post-api-lessonbooking-book-lesson}

`POST` `/api/LessonBooking/book-lesson`

Operation id: `post_api_LessonBooking_book_lesson`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`BookLessonRequest`](schemas.md#schema-booklessonrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | yes |  |
| `paymentMethod` | `string` | yes |  |
| `email` | `string` \| `null` | no |  |

Example:

```json
{
  "lessonId": 0,
  "paymentMethod": "string",
  "email": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/LessonBooking/book-lesson?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "paymentMethod": "string", "email": "string"}'
```

---
