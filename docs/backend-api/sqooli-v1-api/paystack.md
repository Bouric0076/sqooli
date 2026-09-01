# Paystack

Paystack-specific payment operations.

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/payment/paystack/initialize {#post-api-payment-paystack-initialize}

`POST` `/api/payment/paystack/initialize`

Operation id: `post_api_payment_paystack_initialize`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`PaymentModel`](schemas.md#schema-paymentmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `lessonBookingId` | `integer` (int32) | no |  |
| `lessonBooking` | [`LessonBookingModel`](#schema-lessonbookingmodel) | no |  |
| `amount` | `number` | no |  |
| `provider` | `string` | no |  |
| `reference` | `string` | no |  |
| `email` | `string` \| `null` | no |  |
| `gatewayResponse` | `string` \| `null` | no |  |
| `channel` | `string` \| `null` | no |  |
| `status` | [`PaymentStatus`](#schema-paymentstatus) | no |  |
| `createdAt` | `string` (date-time) | no |  |
| `paidAt` | `string` (date-time) | no |  |

Example:

```json
{
  "id": 0,
  "lessonBookingId": 0,
  "lessonBooking": {
    "id": 0,
    "studentId": 0,
    "student": {
      "id": 0,
      "userId": "string",
      "user": null,
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
      "createdByUser": null,
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
      "curriculum": null,
      "subject": null,
      "gradeLevel": null,
      "educationlevel": null,
      "lessonType": null,
      "topic": null,
      "slotId": 0,
      "slot": null,
      "program": null
    },
    "teacherId": 0,
    "teacher": {
      "id": 0,
      "userId": "string",
      "user": null,
      "certificateLevelId": 0,
      "certificateLevel": null,
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
  },
  "amount": 0,
  "provider": "string",
  "reference": "string",
  "email": "string",
  "gatewayResponse": "string",
  "channel": "string",
  "status": 0,
  "createdAt": "2026-01-15T08:00:00Z",
  "paidAt": "2026-01-15T08:00:00Z"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/payment/paystack/initialize?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"id": 0, "lessonBookingId": 0, "lessonBooking": {"id": 0, "studentId": 0, "student": {"id": 0, "userId": "string", "user": null, "admissionNumber": "string", "fullName": "string", "gender": "string", "dob": "2026-01-15", "createdAt": "2026-01-15T08:00:00Z", "avatarUrl": "string"}, "lessonId": 0, "lesson": {"id": 0, "createdByUserId": "string", "createdByUser": null, "lessonTypeId": 0, "curriculumId": 0, "subjectId": 0, "gradeLevelId": 0, "educationLevelId": 0, "topicId": 0, "programId": 0, "name": "string", "description": "string", "requirements": "string", "link": "string", "eventId": "string", "isDeleted": true, "isApproved": true, "start": "2026-01-15T08:00:00Z", "end": "2026-01-15T08:00:00Z", "created_at": "2026-01-15T08:00:00Z", "status": "string", "price": 0, "isStarted": true, "startedAt": "2026-01-15T08:00:00Z", "endedAt": "2026-01-15T08:00:00Z", "liveRoomId": "string", "schoolId": 0, "school": null, "curriculum": null, "subject": null, "gradeLevel": null, "educationlevel": null, "lessonType": null, "topic": null, "slotId": 0, "slot": null, "program": null}, "teacherId": 0, "teacher": {"id": 0, "userId": "string", "user": null, "certificateLevelId": 0, "certificateLevel": null, "fullName": "string", "nationalId": "string", "phone": "string", "address": "string", "bio": "string", "gender": "string", "tscNumber": "string", "dob": "2026-01-15", "workplace": "string", "nationality": "string", "createdAt": "2026-01-15T08:00:00Z", "isIndependent": true, "hasAcceptedContract": true, "hasAcceptedTerms": true, "termsAcceptedAt": "2026-01-15T08:00:00Z", "avatarUrl": "string"}, "status": 0, "amount": 0, "start": "2026-01-15T08:00:00Z", "end": "2026-01-15T08:00:00Z", "scheduledAt": "2026-01-15T08:00:00Z", "meetingLink": "string", "eventId": "string", "createdAt": "2026-01-15T08:00:00Z"}, "amount": 0, "provider": "string", "reference": "string", "email": "string", "gatewayResponse": "string", "channel": "string", "status": 0, "createdAt": "2026-01-15T08:00:00Z", "paidAt": "2026-01-15T08:00:00Z"}'
```

---

## GET /api/payment/paystack/verify {#get-api-payment-paystack-verify}

`GET` `/api/payment/paystack/verify`

Operation id: `get_api_payment_paystack_verify`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `reference` | `query` | `string` | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/payment/paystack/verify?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/payment/paystack/webhook {#post-api-payment-paystack-webhook}

`POST` `/api/payment/paystack/webhook`

Operation id: `post_api_payment_paystack_webhook`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/payment/paystack/webhook?api-version=1.0' \
  -H 'Accept: application/json'
```

---
