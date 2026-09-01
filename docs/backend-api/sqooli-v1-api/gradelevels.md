# GradeLevels

Grade levels lookup.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/GradeLevels {#get-api-gradelevels}

`GET` `/api/GradeLevels`

Operation id: `get_api_GradeLevels`

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
curl -X GET 'https://api.antodb.com/api/GradeLevels?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/GradeLevels {#post-api-gradelevels}

`POST` `/api/GradeLevels`

Operation id: `post_api_GradeLevels`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`GradeLevelsRequest`](schemas.md#schema-gradelevelsrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `curriculumId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "curriculumId": 0,
  "educationLevelId": 0,
  "name": "string"
}
```

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`GradeLevelsModel`](schemas.md#schema-gradelevelsmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `educationLevel` | [`EducationlevelsModel`](#schema-educationlevelsmodel) | no |  |
| `name` | `string` | yes |  |

  Example:

```json
{
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
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "name": "string"
  },
  "name": "string"
}
```

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/GradeLevels?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"curriculumId": 0, "educationLevelId": 0, "name": "string"}'
```

---

## GET /api/GradeLevels/{id} {#get-api-gradelevels-id}

`GET` `/api/GradeLevels/{id}`

Operation id: `get_api_GradeLevels_id`

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

Schema: [`GradeLevelsGetResponse`](schemas.md#schema-gradelevelsgetresponse)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`GradeLevelsModel`](#schema-gradelevelsmodel) | no |  |

  Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
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
  }
}
```

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/GradeLevels/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/GradeLevels/{id} {#put-api-gradelevels-id}

`PUT` `/api/GradeLevels/{id}`

Operation id: `put_api_GradeLevels_id`

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

Schema: [`GradeLevelsRequest`](schemas.md#schema-gradelevelsrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `curriculumId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "curriculumId": 0,
  "educationLevelId": 0,
  "name": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/GradeLevels/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"curriculumId": 0, "educationLevelId": 0, "name": "string"}'
```

---

## DELETE /api/GradeLevels/{id} {#delete-api-gradelevels-id}

`DELETE` `/api/GradeLevels/{id}`

Operation id: `delete_api_GradeLevels_id`

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
curl -X DELETE 'https://api.antodb.com/api/GradeLevels/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
