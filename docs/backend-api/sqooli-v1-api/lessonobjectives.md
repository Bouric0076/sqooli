# LessonObjectives

Learning objectives attached to lessons.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/LessonObjectives {#get-api-lessonobjectives}

`GET` `/api/LessonObjectives`

Operation id: `get_api_LessonObjectives`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `query` | `integer` (int32) | no |  |
| `page` | `query` | `integer` (int32) | no |  |
| `pageSize` | `query` | `integer` (int32) | no |  |
| `search` | `query` | `string` | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/LessonObjectives?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/LessonObjectives {#post-api-lessonobjectives}

`POST` `/api/LessonObjectives`

Operation id: `post_api_LessonObjectives`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`LessonObjectiveRequest`](schemas.md#schema-lessonobjectiverequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `objective` | `string` | no |  |

Example:

```json
{
  "lessonId": 0,
  "objective": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/LessonObjectives?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "objective": "string"}'
```

---

## GET /api/LessonObjectives/{id} {#get-api-lessonobjectives-id}

`GET` `/api/LessonObjectives/{id}`

Operation id: `get_api_LessonObjectives_id`

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
curl -X GET 'https://api.antodb.com/api/LessonObjectives/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/LessonObjectives/{id} {#put-api-lessonobjectives-id}

`PUT` `/api/LessonObjectives/{id}`

Operation id: `put_api_LessonObjectives_id`

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

Schema: [`LessonObjectiveRequest`](schemas.md#schema-lessonobjectiverequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `objective` | `string` | no |  |

Example:

```json
{
  "lessonId": 0,
  "objective": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/LessonObjectives/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "objective": "string"}'
```

---

## DELETE /api/LessonObjectives/{id} {#delete-api-lessonobjectives-id}

`DELETE` `/api/LessonObjectives/{id}`

Operation id: `delete_api_LessonObjectives_id`

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
curl -X DELETE 'https://api.antodb.com/api/LessonObjectives/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/LessonObjectives/bulk {#post-api-lessonobjectives-bulk}

`POST` `/api/LessonObjectives/bulk`

Operation id: `post_api_LessonObjectives_bulk`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`BulkLessonObjectiveRequest`](schemas.md#schema-bulklessonobjectiverequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `objectives` | `array` of `string` | no |  |

Example:

```json
{
  "lessonId": 0,
  "objectives": [
    "string"
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/LessonObjectives/bulk?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "objectives": ["string"]}'
```

---

## PUT /api/LessonObjectives/bulk-replace {#put-api-lessonobjectives-bulk-replace}

`PUT` `/api/LessonObjectives/bulk-replace`

Operation id: `put_api_LessonObjectives_bulk_replace`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`BulkLessonObjectiveRequest`](schemas.md#schema-bulklessonobjectiverequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `objectives` | `array` of `string` | no |  |

Example:

```json
{
  "lessonId": 0,
  "objectives": [
    "string"
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/LessonObjectives/bulk-replace?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "objectives": ["string"]}'
```

---
