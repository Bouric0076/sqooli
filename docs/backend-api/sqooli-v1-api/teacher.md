# Teacher

Teacher directory, qualifications, invites, and lesson assignment.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/Teacher {#get-api-teacher}

`GET` `/api/Teacher`

Operation id: `get_api_Teacher`

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
curl -X GET 'https://api.antodb.com/api/Teacher?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/Teacher/invited-teachers {#get-api-teacher-invited-teachers}

`GET` `/api/Teacher/invited-teachers`

Operation id: `get_api_Teacher_invited_teachers`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`ApiResponseOfListOfInvitedTeacherDto`](schemas.md#schema-apiresponseoflistofinvitedteacherdto)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` | no |  |
| `data` | `array` of [`InvitedTeacherDto`](#schema-invitedteacherdto) \| `null` | no |  |
| `error` | `array` of [`InvitedTeacherDto`](#schema-invitedteacherdto) \| `null` | no |  |

  Example:

```json
{
  "status": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "role": "string",
      "accepted": true,
      "expiresAt": "2026-01-15T08:00:00Z",
      "isExpired": true,
      "invitedAt": "2026-01-15T08:00:00Z"
    }
  ],
  "error": [
    {
      "id": 0,
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "role": "string",
      "accepted": true,
      "expiresAt": "2026-01-15T08:00:00Z",
      "isExpired": true,
      "invitedAt": "2026-01-15T08:00:00Z"
    }
  ]
}
```

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Teacher/invited-teachers?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/Teacher/school-admins {#get-api-teacher-school-admins}

`GET` `/api/Teacher/school-admins`

Operation id: `get_api_Teacher_school_admins`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`ApiResponseOfObject`](schemas.md#schema-apiresponseofobject)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` | no |  |
| `data` | `any` | no |  |
| `error` | `any` | no |  |

  Example:

```json
{
  "status": true,
  "message": "string",
  "data": null,
  "error": null
}
```

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Teacher/school-admins?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Teacher/invite-teacher {#post-api-teacher-invite-teacher}

`POST` `/api/Teacher/invite-teacher`

Operation id: `post_api_Teacher_invite_teacher`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`InviteTeacherRequest`](schemas.md#schema-inviteteacherrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fullName` | `string` | no |  |
| `email` | `string` | no |  |
| `phone` | `string` | no |  |
| `role` | `string` | no |  |
| `nationalId` | `string` \| `null` | no |  |
| `curriculumId` | `integer` (int32) \| `null` | no |  |
| `educationLevelId` | `integer` (int32) \| `null` | no |  |
| `gradeLevelId` | `integer` (int32) \| `null` | no |  |
| `certificateLevelId` | `integer` (int32) \| `null` | no |  |
| `subjectId` | `integer` (int32) \| `null` | no |  |
| `address` | `string` \| `null` | no |  |
| `gender` | `string` \| `null` | no |  |
| `tscNumber` | `string` \| `null` | no |  |
| `dob` | `string` (date) \| `null` | no |  |
| `workplace` | `string` \| `null` | no |  |

Example:

```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "role": "string",
  "nationalId": "string",
  "curriculumId": 0,
  "educationLevelId": 0,
  "gradeLevelId": 0,
  "certificateLevelId": 0,
  "subjectId": 0,
  "address": "string",
  "gender": "string",
  "tscNumber": "string",
  "dob": "2026-01-15",
  "workplace": "string"
}
```

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`ApiResponseOfstring`](schemas.md#schema-apiresponseofstring)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` | no |  |
| `data` | `string` \| `null` | no |  |
| `error` | `string` \| `null` | no |  |

  Example:

```json
{
  "status": true,
  "message": "string",
  "data": "string",
  "error": "string"
}
```

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Teacher/invite-teacher?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"fullName": "string", "email": "string", "phone": "string", "role": "string", "nationalId": "string", "curriculumId": 0, "educationLevelId": 0, "gradeLevelId": 0, "certificateLevelId": 0, "subjectId": 0, "address": "string", "gender": "string", "tscNumber": "string", "dob": "2026-01-15", "workplace": "string"}'
```

---

## POST /api/Teacher/accept-teacher-invite {#post-api-teacher-accept-teacher-invite}

`POST` `/api/Teacher/accept-teacher-invite`

Operation id: `post_api_Teacher_accept_teacher_invite`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`AcceptTeacherInviteRequest`](schemas.md#schema-acceptteacherinviterequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | yes |  |
| `password` | `string` | yes |  |

Example:

```json
{
  "token": "string",
  "password": "string"
}
```

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`ApiResponseOfstring`](schemas.md#schema-apiresponseofstring)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` | no |  |
| `data` | `string` \| `null` | no |  |
| `error` | `string` \| `null` | no |  |

  Example:

```json
{
  "status": true,
  "message": "string",
  "data": "string",
  "error": "string"
}
```

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Teacher/accept-teacher-invite?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"token": "string", "password": "string"}'
```

---
