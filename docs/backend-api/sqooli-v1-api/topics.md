# Topics

Topics within subjects.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/Topics {#get-api-topics}

`GET` `/api/Topics`

Operation id: `get_api_Topics`

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
curl -X GET 'https://api.antodb.com/api/Topics?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Topics {#post-api-topics}

`POST` `/api/Topics`

Operation id: `post_api_Topics`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`TopicRequest`](schemas.md#schema-topicrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `subjectId` | `integer` (int32) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "subjectId": 0,
  "curriculumId": 0,
  "gradeLevelId": 0,
  "educationLevelId": 0,
  "name": "string"
}
```

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`TopicsModel`](schemas.md#schema-topicsmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `subjectId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |
| `subject` | [`SubjectModel`](#schema-subjectmodel) | no |  |
| `gradeLevel` | [`GradeLevelsModel`](#schema-gradelevelsmodel) | no |  |
| `educationlevel` | [`EducationlevelsModel`](#schema-educationlevelsmodel) | no |  |

  Example:

```json
{
  "id": 0,
  "curriculumId": 0,
  "subjectId": 0,
  "gradeLevelId": 0,
  "educationLevelId": 0,
  "name": "string",
  "curriculum": {
    "id": 0,
    "name": "string",
    "acronym": "string",
    "schools": null
  },
  "subject": {
    "id": 0,
    "categoryId": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": null,
      "name": "string"
    },
    "gradeLevelId": 0,
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": null,
      "educationLevelId": 0,
      "educationLevel": null,
      "name": "string"
    },
    "name": "string",
    "colorCode": "string",
    "subProgramSubjects": [
      {
        "id": null,
        "subProgramId": null,
        "subProgram": null,
        "subjectId": null,
        "subject": null
      }
    ]
  },
  "gradeLevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": null,
      "name": "string"
    },
    "name": "string"
  },
  "educationlevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "name": "string"
  }
}
```

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Topics?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"subjectId": 0, "curriculumId": 0, "gradeLevelId": 0, "educationLevelId": 0, "name": "string"}'
```

---

## GET /api/Topics/{id} {#get-api-topics-id}

`GET` `/api/Topics/{id}`

Operation id: `get_api_Topics_id`

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

Schema: [`TopicGetResponse`](schemas.md#schema-topicgetresponse)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`TopicsModel`](#schema-topicsmodel) | no |  |

  Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "curriculumId": 0,
    "subjectId": 0,
    "gradeLevelId": 0,
    "educationLevelId": 0,
    "name": "string",
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "subject": {
      "id": 0,
      "categoryId": 0,
      "category": null,
      "curriculumId": 0,
      "curriculum": null,
      "educationLevelId": 0,
      "educationlevel": null,
      "gradeLevelId": 0,
      "gradeLevel": null,
      "name": "string",
      "colorCode": "string",
      "subProgramSubjects": []
    },
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": null,
      "educationLevelId": 0,
      "educationLevel": null,
      "name": "string"
    },
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": null,
      "name": "string"
    }
  }
}
```

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Topics/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/Topics/{id} {#put-api-topics-id}

`PUT` `/api/Topics/{id}`

Operation id: `put_api_Topics_id`

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

Schema: [`TopicRequest`](schemas.md#schema-topicrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `subjectId` | `integer` (int32) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "subjectId": 0,
  "curriculumId": 0,
  "gradeLevelId": 0,
  "educationLevelId": 0,
  "name": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/Topics/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"subjectId": 0, "curriculumId": 0, "gradeLevelId": 0, "educationLevelId": 0, "name": "string"}'
```

---

## DELETE /api/Topics/{id} {#delete-api-topics-id}

`DELETE` `/api/Topics/{id}`

Operation id: `delete_api_Topics_id`

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
curl -X DELETE 'https://api.antodb.com/api/Topics/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
