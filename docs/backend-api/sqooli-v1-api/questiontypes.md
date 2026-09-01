# QuestionTypes

Lookup of question types.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/question-types {#get-api-question-types}

`GET` `/api/question-types`

Operation id: `get_api_question_types`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/question-types?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/question-types {#post-api-question-types}

`POST` `/api/question-types`

Operation id: `post_api_question_types`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`CreateQuestionTypeDto`](schemas.md#schema-createquestiontypedto)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | no |  |
| `name` | `string` | no |  |
| `isAutomaticallyGradable` | `boolean` | no |  |

Example:

```json
{
  "code": "string",
  "name": "string",
  "isAutomaticallyGradable": true
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/question-types?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"code": "string", "name": "string", "isAutomaticallyGradable": true}'
```

---
