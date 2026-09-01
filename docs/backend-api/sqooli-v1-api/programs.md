# Programs

Alternate/legacy program listing endpoints.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/Programs {#get-api-programs}

`GET` `/api/Programs`

Operation id: `get_api_Programs`

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
curl -X GET 'https://api.antodb.com/api/Programs?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Programs {#post-api-programs}

`POST` `/api/Programs`

Operation id: `post_api_Programs`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`ProgramRequest`](schemas.md#schema-programrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `startDate` | `string` (date) | yes |  |
| `endDate` | `string` (date) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `colorCode` | `string` | yes |  |

Example:

```json
{
  "startDate": "2026-01-15",
  "endDate": "2026-01-15",
  "curriculumId": 0,
  "name": "string",
  "colorCode": "string"
}
```

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`ProgramsModel`](schemas.md#schema-programsmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `colorCode` | `string` | yes |  |
| `startDate` | `string` (date) | yes |  |
| `endDate` | `string` (date) | yes |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |

  Example:

```json
{
  "id": 0,
  "curriculumId": 0,
  "name": "string",
  "colorCode": "string",
  "startDate": "2026-01-15",
  "endDate": "2026-01-15",
  "curriculum": {
    "id": 0,
    "name": "string",
    "acronym": "string",
    "schools": null
  }
}
```

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Programs?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"startDate": "2026-01-15", "endDate": "2026-01-15", "curriculumId": 0, "name": "string", "colorCode": "string"}'
```

---

## GET /api/Programs/{id} {#get-api-programs-id}

`GET` `/api/Programs/{id}`

Operation id: `get_api_Programs_id`

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

Schema: [`ProgramGetResponse`](schemas.md#schema-programgetresponse)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`ProgramsModel`](#schema-programsmodel) | no |  |

  Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "curriculumId": 0,
    "name": "string",
    "colorCode": "string",
    "startDate": "2026-01-15",
    "endDate": "2026-01-15",
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    }
  }
}
```

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Programs/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/Programs/{id} {#put-api-programs-id}

`PUT` `/api/Programs/{id}`

Operation id: `put_api_Programs_id`

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

Schema: [`ProgramRequest`](schemas.md#schema-programrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `startDate` | `string` (date) | yes |  |
| `endDate` | `string` (date) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `colorCode` | `string` | yes |  |

Example:

```json
{
  "startDate": "2026-01-15",
  "endDate": "2026-01-15",
  "curriculumId": 0,
  "name": "string",
  "colorCode": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/Programs/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"startDate": "2026-01-15", "endDate": "2026-01-15", "curriculumId": 0, "name": "string", "colorCode": "string"}'
```

---

## DELETE /api/Programs/{id} {#delete-api-programs-id}

`DELETE` `/api/Programs/{id}`

Operation id: `delete_api_Programs_id`

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
curl -X DELETE 'https://api.antodb.com/api/Programs/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
