# Student

Student records and enrollment.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/Student {#get-api-student}

`GET` `/api/Student`

Operation id: `get_api_Student`

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
curl -X GET 'https://api.antodb.com/api/Student?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Student {#post-api-student}

`POST` `/api/Student`

Operation id: `post_api_Student`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`StudentModel`](schemas.md#schema-studentmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `userId` | `string` | yes |  |
| `user` | [`UserModel`](#schema-usermodel) | no |  |
| `admissionNumber` | `string` | yes |  |
| `fullName` | `string` | yes |  |
| `gender` | `string` | yes |  |
| `dob` | `string` (date) | yes |  |
| `createdAt` | `string` (date-time) | no |  |
| `avatarUrl` | `string` \| `null` | no |  |

Example:

```json
{
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
}
```

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`StudentModel`](schemas.md#schema-studentmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `userId` | `string` | yes |  |
| `user` | [`UserModel`](#schema-usermodel) | no |  |
| `admissionNumber` | `string` | yes |  |
| `fullName` | `string` | yes |  |
| `gender` | `string` | yes |  |
| `dob` | `string` (date) | yes |  |
| `createdAt` | `string` (date-time) | no |  |
| `avatarUrl` | `string` \| `null` | no |  |

  Example:

```json
{
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
}
```

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Student?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"id": 0, "userId": "string", "user": {"firstName": "string", "lastName": "string", "userType": "string", "nationalId": "string", "nationality": "string", "gender": "string", "dob": "2026-01-15", "isActive": true, "isVerified": true, "address": "string", "chatId": "string", "hasAcceptedTerms": true, "termsAcceptedAt": "2026-01-15T08:00:00Z", "createdAt": "2026-01-15T08:00:00Z", "lastLoginAt": "2026-01-15T08:00:00Z", "transactionPinHash": "string", "referralCode": "string", "referredByUserId": "string", "referredByUser": null, "referrals": null, "adminProfileId": 0, "teacherProfileId": 0, "studentProfileId": 0, "parentProfileId": 0, "adminProfile": null, "teacherProfile": null, "studentProfile": null, "parentProfile": null, "id": "string", "userName": "string", "normalizedUserName": "string", "email": "string", "normalizedEmail": "string", "emailConfirmed": true, "passwordHash": "string", "securityStamp": "string", "concurrencyStamp": "string", "phoneNumber": "string", "phoneNumberConfirmed": true, "twoFactorEnabled": true, "lockoutEnd": "2026-01-15T08:00:00Z", "lockoutEnabled": true, "accessFailedCount": 0}, "admissionNumber": "string", "fullName": "string", "gender": "string", "dob": "2026-01-15", "createdAt": "2026-01-15T08:00:00Z", "avatarUrl": "string"}'
```

---

## GET /api/Student/booking-students {#get-api-student-booking-students}

`GET` `/api/Student/booking-students`

Operation id: `get_api_Student_booking_students`

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
curl -X GET 'https://api.antodb.com/api/Student/booking-students?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/Student/{id} {#get-api-student-id}

`GET` `/api/Student/{id}`

Operation id: `get_api_Student_id`

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

Schema: [`StudentModel`](schemas.md#schema-studentmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `userId` | `string` | yes |  |
| `user` | [`UserModel`](#schema-usermodel) | no |  |
| `admissionNumber` | `string` | yes |  |
| `fullName` | `string` | yes |  |
| `gender` | `string` | yes |  |
| `dob` | `string` (date) | yes |  |
| `createdAt` | `string` (date-time) | no |  |
| `avatarUrl` | `string` \| `null` | no |  |

  Example:

```json
{
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
}
```

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Student/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/Student/{id} {#put-api-student-id}

`PUT` `/api/Student/{id}`

Operation id: `put_api_Student_id`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`StudentModel`](schemas.md#schema-studentmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `userId` | `string` | yes |  |
| `user` | [`UserModel`](#schema-usermodel) | no |  |
| `admissionNumber` | `string` | yes |  |
| `fullName` | `string` | yes |  |
| `gender` | `string` | yes |  |
| `dob` | `string` (date) | yes |  |
| `createdAt` | `string` (date-time) | no |  |
| `avatarUrl` | `string` \| `null` | no |  |

Example:

```json
{
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
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/Student/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"id": 0, "userId": "string", "user": {"firstName": "string", "lastName": "string", "userType": "string", "nationalId": "string", "nationality": "string", "gender": "string", "dob": "2026-01-15", "isActive": true, "isVerified": true, "address": "string", "chatId": "string", "hasAcceptedTerms": true, "termsAcceptedAt": "2026-01-15T08:00:00Z", "createdAt": "2026-01-15T08:00:00Z", "lastLoginAt": "2026-01-15T08:00:00Z", "transactionPinHash": "string", "referralCode": "string", "referredByUserId": "string", "referredByUser": null, "referrals": null, "adminProfileId": 0, "teacherProfileId": 0, "studentProfileId": 0, "parentProfileId": 0, "adminProfile": null, "teacherProfile": null, "studentProfile": null, "parentProfile": null, "id": "string", "userName": "string", "normalizedUserName": "string", "email": "string", "normalizedEmail": "string", "emailConfirmed": true, "passwordHash": "string", "securityStamp": "string", "concurrencyStamp": "string", "phoneNumber": "string", "phoneNumberConfirmed": true, "twoFactorEnabled": true, "lockoutEnd": "2026-01-15T08:00:00Z", "lockoutEnabled": true, "accessFailedCount": 0}, "admissionNumber": "string", "fullName": "string", "gender": "string", "dob": "2026-01-15", "createdAt": "2026-01-15T08:00:00Z", "avatarUrl": "string"}'
```

---

## DELETE /api/Student/{id} {#delete-api-student-id}

`DELETE` `/api/Student/{id}`

Operation id: `delete_api_Student_id`

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

cURL:

```bash
curl -X DELETE 'https://api.antodb.com/api/Student/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
