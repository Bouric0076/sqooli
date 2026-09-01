# Educationlevels

Education levels lookup (e.g. primary, secondary).

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/Educationlevels {#get-api-educationlevels}

`GET` `/api/Educationlevels`

Operation id: `get_api_Educationlevels`

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
curl -X GET 'https://api.antodb.com/api/Educationlevels?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Educationlevels {#post-api-educationlevels}

`POST` `/api/Educationlevels`

Operation id: `post_api_Educationlevels`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`EducationlevelsRequest`](schemas.md#schema-educationlevelsrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `curriculumId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "curriculumId": 0,
  "name": "string"
}
```

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`EducationlevelsModel`](schemas.md#schema-educationlevelsmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |
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
  "name": "string"
}
```

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Educationlevels?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"curriculumId": 0, "name": "string"}'
```

---

## GET /api/Educationlevels/{id} {#get-api-educationlevels-id}

`GET` `/api/Educationlevels/{id}`

Operation id: `get_api_Educationlevels_id`

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

Schema: [`EducationlevelsGetResponse`](schemas.md#schema-educationlevelsgetresponse)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`EducationlevelsModel`](#schema-educationlevelsmodel) | no |  |

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
    "name": "string"
  }
}
```

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Educationlevels/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/Educationlevels/{id} {#put-api-educationlevels-id}

`PUT` `/api/Educationlevels/{id}`

Operation id: `put_api_Educationlevels_id`

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

Schema: [`EducationlevelsRequest`](schemas.md#schema-educationlevelsrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `curriculumId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |

Example:

```json
{
  "curriculumId": 0,
  "name": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/Educationlevels/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"curriculumId": 0, "name": "string"}'
```

---

## DELETE /api/Educationlevels/{id} {#delete-api-educationlevels-id}

`DELETE` `/api/Educationlevels/{id}`

Operation id: `delete_api_Educationlevels_id`

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
curl -X DELETE 'https://api.antodb.com/api/Educationlevels/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
