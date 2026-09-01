# Exam

Exams, submission, and grading.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/exams {#get-api-exams}

`GET` `/api/exams`

Operation id: `get_api_exams`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `query` | `integer` (int32) | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/exams?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/exams/create {#post-api-exams-create}

`POST` `/api/exams/create`

Operation id: `post_api_exams_create`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`CreateExamRequest`](schemas.md#schema-createexamrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `title` | `string` | no |  |
| `description` | `string` | no |  |
| `startTime` | `string` (date-time) | no |  |
| `endTime` | `string` (date-time) | no |  |
| `isPublished` | `boolean` | no |  |
| `questionIds` | `array` of `integer` (int32) | no |  |

Example:

```json
{
  "lessonId": 0,
  "title": "string",
  "description": "string",
  "startTime": "2026-01-15T08:00:00Z",
  "endTime": "2026-01-15T08:00:00Z",
  "isPublished": true,
  "questionIds": [
    0
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/exams/create?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "title": "string", "description": "string", "startTime": "2026-01-15T08:00:00Z", "endTime": "2026-01-15T08:00:00Z", "isPublished": true, "questionIds": [0]}'
```

---

## POST /api/exams/{examId}/publish {#post-api-exams-examid-publish}

`POST` `/api/exams/{examId}/publish`

Operation id: `post_api_exams_examId_publish`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `examId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/exams/123/publish?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/exams/{examId}/unpublish {#post-api-exams-examid-unpublish}

`POST` `/api/exams/{examId}/unpublish`

Operation id: `post_api_exams_examId_unpublish`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `examId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/exams/123/unpublish?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/exams/submit {#post-api-exams-submit}

`POST` `/api/exams/submit`

Operation id: `post_api_exams_submit`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`SubmitExamRequest`](schemas.md#schema-submitexamrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `examId` | `integer` (int32) | no |  |
| `answers` | `array` of [`ExamAnswerRequest`](#schema-examanswerrequest) | no |  |

Example:

```json
{
  "examId": 0,
  "answers": [
    {
      "questionId": 0,
      "answerText": "string",
      "selectedOptionLabel": "string"
    }
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/exams/submit?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"examId": 0, "answers": [{"questionId": 0, "answerText": "string", "selectedOptionLabel": "string"}]}'
```

---

## POST /api/exams/grade/{submissionId} {#post-api-exams-grade-submissionid}

`POST` `/api/exams/grade/{submissionId}`

Operation id: `post_api_exams_grade_submissionId`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `submissionId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`GradeExamRequest`](schemas.md#schema-gradeexamrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `grades` | `array` of [`QuestionGrade`](#schema-questiongrade) | no |  |

Example:

```json
{
  "grades": [
    {
      "questionId": 0,
      "score": 0,
      "feedback": "string"
    }
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/exams/grade/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"grades": [{"questionId": 0, "score": 0, "feedback": "string"}]}'
```

---

## GET /api/exams/{examId}/submissions {#get-api-exams-examid-submissions}

`GET` `/api/exams/{examId}/submissions`

Operation id: `get_api_exams_examId_submissions`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `examId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/exams/123/submissions?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
