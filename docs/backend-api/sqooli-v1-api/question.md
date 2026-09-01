# Question

Question bank CRUD and options.

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/questions/create {#post-api-questions-create}

`POST` `/api/questions/create`

Operation id: `post_api_questions_create`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`CreateQuestionRequest`](schemas.md#schema-createquestionrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `topicId` | `integer` (int32) | yes |  |
| `text` | `string` | yes |  |
| `questionTypeId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `subjectId` | `integer` (int32) | yes |  |
| `options` | `array` of [`CreateQuestionOptionRequest`](#schema-createquestionoptionrequest) \| `null` | no |  |

Example:

```json
{
  "topicId": 0,
  "text": "string",
  "questionTypeId": 0,
  "educationLevelId": 0,
  "gradeLevelId": 0,
  "subjectId": 0,
  "options": [
    {
      "optionText": "string",
      "optionLabel": "string",
      "isCorrect": true
    }
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/questions/create?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"topicId": 0, "text": "string", "questionTypeId": 0, "educationLevelId": 0, "gradeLevelId": 0, "subjectId": 0, "options": [{"optionText": "string", "optionLabel": "string", "isCorrect": true}]}'
```

---

## GET /api/questions/topic/{topicId} {#get-api-questions-topic-topicid}

`GET` `/api/questions/topic/{topicId}`

Operation id: `get_api_questions_topic_topicId`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `topicId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/questions/topic/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
