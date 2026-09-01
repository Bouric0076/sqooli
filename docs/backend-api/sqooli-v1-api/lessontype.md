# LessonType

Lesson type lookup.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/LessonType {#get-api-lessontype}

`GET` `/api/LessonType`

Operation id: `get_api_LessonType`

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
curl -X GET 'https://api.antodb.com/api/LessonType?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/LessonType {#post-api-lessontype}

`POST` `/api/LessonType`

Operation id: `post_api_LessonType`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`LessonTypeRequest`](schemas.md#schema-lessontyperequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | yes |  |

Example:

```json
{
  "name": "string"
}
```

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`LessonTypeModel`](schemas.md#schema-lessontypemodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `name` | `string` | yes |  |

  Example:

```json
{
  "id": 0,
  "name": "string"
}
```

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/LessonType?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"name": "string"}'
```

---

## GET /api/LessonType/{id} {#get-api-lessontype-id}

`GET` `/api/LessonType/{id}`

Operation id: `get_api_LessonType_id`

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

Schema: [`LessonTypeGetResponse`](schemas.md#schema-lessontypegetresponse)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`LessonTypeModel`](#schema-lessontypemodel) | no |  |

  Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "name": "string"
  }
}
```

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/LessonType/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/LessonType/{id} {#put-api-lessontype-id}

`PUT` `/api/LessonType/{id}`

Operation id: `put_api_LessonType_id`

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

Schema: [`LessonTypeRequest`](schemas.md#schema-lessontyperequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | yes |  |

Example:

```json
{
  "name": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/LessonType/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"name": "string"}'
```

---

## DELETE /api/LessonType/{id} {#delete-api-lessontype-id}

`DELETE` `/api/LessonType/{id}`

Operation id: `delete_api_LessonType_id`

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
curl -X DELETE 'https://api.antodb.com/api/LessonType/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
