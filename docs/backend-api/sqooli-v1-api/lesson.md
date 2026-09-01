# Lesson

CRUD for lessons, pricing, requirements, and lesson-scoped lookups.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/Lesson {#get-api-lesson}

`GET` `/api/Lesson`

Operation id: `get_api_Lesson`

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
curl -X GET 'https://api.antodb.com/api/Lesson?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Lesson {#post-api-lesson}

`POST` `/api/Lesson`

Operation id: `post_api_Lesson`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`LessonRequest`](schemas.md#schema-lessonrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) \| `null` | no |  |
| `lessonTypeId` | `integer` (int32) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `subjectId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `topicId` | `integer` (int32) | yes |  |
| `programId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `description` | `string` | yes |  |
| `start` | `string` (date-time) | yes |  |
| `end` | `string` (date-time) | yes |  |
| `token` | `string` \| `null` | no |  |

Example:

```json
{
  "lessonId": 0,
  "lessonTypeId": 0,
  "curriculumId": 0,
  "subjectId": 0,
  "gradeLevelId": 0,
  "educationLevelId": 0,
  "topicId": 0,
  "programId": 0,
  "name": "string",
  "description": "string",
  "start": "2026-01-15T08:00:00Z",
  "end": "2026-01-15T08:00:00Z",
  "token": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Lesson?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "lessonTypeId": 0, "curriculumId": 0, "subjectId": 0, "gradeLevelId": 0, "educationLevelId": 0, "topicId": 0, "programId": 0, "name": "string", "description": "string", "start": "2026-01-15T08:00:00Z", "end": "2026-01-15T08:00:00Z", "token": "string"}'
```

---

## GET /api/Lesson/{id} {#get-api-lesson-id}

`GET` `/api/Lesson/{id}`

Operation id: `get_api_Lesson_id`

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

Schema: [`ApiResponseOfLessonDetailsDto`](schemas.md#schema-apiresponseoflessondetailsdto)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` | no |  |
| `data` | `null` \| [`LessonDetailsDto`](#schema-lessondetailsdto) | no |  |
| `error` | `null` \| [`LessonDetailsDto`](#schema-lessondetailsdto) | no |  |

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
curl -X GET 'https://api.antodb.com/api/Lesson/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/Lesson/{id}/requirements {#put-api-lesson-id-requirements}

`PUT` `/api/Lesson/{id}/requirements`

Operation id: `put_api_Lesson_id_requirements`

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

Schema: [`UpdateLessonRequirementsRequest`](schemas.md#schema-updatelessonrequirementsrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | yes |  |
| `requirements` | `string` | yes |  |

Example:

```json
{
  "lessonId": 0,
  "requirements": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/Lesson/123/requirements?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "requirements": "string"}'
```

---

## POST /api/Lesson/assign-teacher {#post-api-lesson-assign-teacher}

`POST` `/api/Lesson/assign-teacher`

Operation id: `post_api_Lesson_assign_teacher`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`AssignTeacherToLessonRequest`](schemas.md#schema-assignteachertolessonrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | yes |  |
| `teacherId` | `integer` (int32) | yes |  |

Example:

```json
{
  "lessonId": 0,
  "teacherId": 0
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Lesson/assign-teacher?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "teacherId": 0}'
```

---

## POST /api/Lesson/{lessonId}/approve {#post-api-lesson-lessonid-approve}

`POST` `/api/Lesson/{lessonId}/approve`

Operation id: `post_api_Lesson_lessonId_approve`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Lesson/123/approve?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Lesson/{lessonId}/start {#post-api-lesson-lessonid-start}

`POST` `/api/Lesson/{lessonId}/start`

Operation id: `post_api_Lesson_lessonId_start`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Lesson/123/start?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Lesson/{lessonId}/join {#post-api-lesson-lessonid-join}

`POST` `/api/Lesson/{lessonId}/join`

Operation id: `post_api_Lesson_lessonId_join`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Lesson/123/join?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Lesson/{lessonId}/end {#post-api-lesson-lessonid-end}

`POST` `/api/Lesson/{lessonId}/end`

Operation id: `post_api_Lesson_lessonId_end`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Lesson/123/end?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/Lesson/{lessonId}/attendance {#get-api-lesson-lessonid-attendance}

`GET` `/api/Lesson/{lessonId}/attendance`

Operation id: `get_api_Lesson_lessonId_attendance`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Lesson/123/attendance?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/Lesson/{lessonId}/status {#get-api-lesson-lessonid-status}

`GET` `/api/Lesson/{lessonId}/status`

Operation id: `get_api_Lesson_lessonId_status`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `path` | `string` | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Lesson/123/status?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
