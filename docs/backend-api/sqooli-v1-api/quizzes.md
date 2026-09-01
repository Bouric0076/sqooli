# Quizzes

Create quizzes for lessons, list quizzes, and submit student answers.

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/Quizzes {#post-api-quizzes}

`POST` `/api/Quizzes`

Operation id: `post_api_Quizzes`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`CreateQuizRequest`](schemas.md#schema-createquizrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `title` | `string` | no |  |
| `description` | `string` \| `null` | no |  |
| `isPublished` | `boolean` | no |  |
| `questionIds` | `array` of `integer` (int32) | no |  |

Example:

```json
{
  "lessonId": 0,
  "title": "string",
  "description": "string",
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
curl -X POST 'https://api.antodb.com/api/Quizzes?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "title": "string", "description": "string", "isPublished": true, "questionIds": [0]}'
```

---

## GET /api/Quizzes/lesson/{lessonId} {#get-api-quizzes-lesson-lessonid}

`GET` `/api/Quizzes/lesson/{lessonId}`

Operation id: `get_api_Quizzes_lesson_lessonId`

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
curl -X GET 'https://api.antodb.com/api/Quizzes/lesson/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Quizzes/submit {#post-api-quizzes-submit}

`POST` `/api/Quizzes/submit`

Operation id: `post_api_Quizzes_submit`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`SubmitQuizRequest`](schemas.md#schema-submitquizrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `quizId` | `integer` (int32) | no |  |
| `answers` | `array` of [`QuizAnswerRequest`](#schema-quizanswerrequest) | no |  |

Example:

```json
{
  "quizId": 0,
  "answers": [
    {
      "questionId": 0,
      "selectedOptionLabel": "string",
      "answerText": "string"
    }
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Quizzes/submit?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"quizId": 0, "answers": [{"questionId": 0, "selectedOptionLabel": "string", "answerText": "string"}]}'
```

---
