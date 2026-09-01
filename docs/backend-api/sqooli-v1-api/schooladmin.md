# SchoolAdmin

School administrator accounts.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/SchoolAdmin {#get-api-schooladmin}

`GET` `/api/SchoolAdmin`

Operation id: `get_api_SchoolAdmin`

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
curl -X GET 'https://api.antodb.com/api/SchoolAdmin?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/SchoolAdmin/invite {#post-api-schooladmin-invite}

`POST` `/api/SchoolAdmin/invite`

Operation id: `post_api_SchoolAdmin_invite`

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
curl -X POST 'https://api.antodb.com/api/SchoolAdmin/invite?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"fullName": "string", "email": "string", "phone": "string", "role": "string", "nationalId": "string", "curriculumId": 0, "educationLevelId": 0, "gradeLevelId": 0, "certificateLevelId": 0, "subjectId": 0, "address": "string", "gender": "string", "tscNumber": "string", "dob": "2026-01-15", "workplace": "string"}'
```

---

## DELETE /api/SchoolAdmin/{id} {#delete-api-schooladmin-id}

`DELETE` `/api/SchoolAdmin/{id}`

Operation id: `delete_api_SchoolAdmin_id`

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
curl -X DELETE 'https://api.antodb.com/api/SchoolAdmin/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
