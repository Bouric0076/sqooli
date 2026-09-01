# Assignment

Assignments, student submission, and grading.

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/Assignment/create {#post-api-assignment-create}

`POST` `/api/Assignment/create`

Operation id: `post_api_Assignment_create`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`CreateAssignmentRequest`](schemas.md#schema-createassignmentrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `description` | `string` | no |  |
| `type` | [`AssessmentType`](#schema-assessmenttype) | no |  |
| `sections` | `array` of [`SectionDto`](#schema-sectiondto) | no |  |

Example:

```json
{
  "name": "string",
  "description": "string",
  "type": 0,
  "sections": [
    {
      "title": "string",
      "questions": []
    }
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Assignment/create?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"name": "string", "description": "string", "type": 0, "sections": [{"title": "string", "questions": []}]}'
```

---

## PUT /api/Assignment/{assignmentId} {#put-api-assignment-assignmentid}

`PUT` `/api/Assignment/{assignmentId}`

Operation id: `put_api_Assignment_assignmentId`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `assignmentId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`CreateAssignmentRequest`](schemas.md#schema-createassignmentrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `description` | `string` | no |  |
| `type` | [`AssessmentType`](#schema-assessmenttype) | no |  |
| `sections` | `array` of [`SectionDto`](#schema-sectiondto) | no |  |

Example:

```json
{
  "name": "string",
  "description": "string",
  "type": 0,
  "sections": [
    {
      "title": "string",
      "questions": []
    }
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/Assignment/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"name": "string", "description": "string", "type": 0, "sections": [{"title": "string", "questions": []}]}'
```

---

## GET /api/Assignment/{assignmentId} {#get-api-assignment-assignmentid}

`GET` `/api/Assignment/{assignmentId}`

Operation id: `get_api_Assignment_assignmentId`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `assignmentId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Assignment/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Assignment/submit {#post-api-assignment-submit}

`POST` `/api/Assignment/submit`

Operation id: `post_api_Assignment_submit`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`SubmitAssignmentRequest`](schemas.md#schema-submitassignmentrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignmentId` | `integer` (int32) | no |  |
| `submissionText` | `string` | no |  |
| `fileUrl` | `string` \| `null` | no |  |

Example:

```json
{
  "assignmentId": 0,
  "submissionText": "string",
  "fileUrl": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Assignment/submit?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"assignmentId": 0, "submissionText": "string", "fileUrl": "string"}'
```

---

## POST /api/Assignment/grade {#post-api-assignment-grade}

`POST` `/api/Assignment/grade`

Operation id: `post_api_Assignment_grade`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`GradeAssignmentRequest`](schemas.md#schema-gradeassignmentrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `submissionId` | `integer` (int32) | no |  |
| `score` | `integer` (int32) | no |  |
| `feedback` | `string` | no |  |

Example:

```json
{
  "submissionId": 0,
  "score": 0,
  "feedback": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Assignment/grade?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"submissionId": 0, "score": 0, "feedback": "string"}'
```

---

## GET /api/assignment-resources/{type} {#get-api-assignment-resources-type}

`GET` `/api/assignment-resources/{type}`

Operation id: `get_api_assignment_resources_type`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `type` | `path` | `string` | yes |  |

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
curl -X GET 'https://api.antodb.com/api/assignment-resources/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
