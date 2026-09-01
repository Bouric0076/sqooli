# SubjectCategory

Subject categories.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/SubjectCategory {#get-api-subjectcategory}

`GET` `/api/SubjectCategory`

Operation id: `get_api_SubjectCategory`

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
curl -X GET 'https://api.antodb.com/api/SubjectCategory?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/SubjectCategory {#post-api-subjectcategory}

`POST` `/api/SubjectCategory`

Operation id: `post_api_SubjectCategory`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`SubjectCategoryRequest`](schemas.md#schema-subjectcategoryrequest)

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

Schema: [`SubjectCategoryModel`](schemas.md#schema-subjectcategorymodel)

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
curl -X POST 'https://api.antodb.com/api/SubjectCategory?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"name": "string"}'
```

---

## GET /api/SubjectCategory/{id} {#get-api-subjectcategory-id}

`GET` `/api/SubjectCategory/{id}`

Operation id: `get_api_SubjectCategory_id`

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

Schema: [`SubjectCategoryGetResponse`](schemas.md#schema-subjectcategorygetresponse)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`SubjectCategoryModel`](#schema-subjectcategorymodel) | no |  |

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
curl -X GET 'https://api.antodb.com/api/SubjectCategory/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/SubjectCategory/{id} {#put-api-subjectcategory-id}

`PUT` `/api/SubjectCategory/{id}`

Operation id: `put_api_SubjectCategory_id`

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

Schema: [`SubjectCategoryRequest`](schemas.md#schema-subjectcategoryrequest)

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
curl -X PUT 'https://api.antodb.com/api/SubjectCategory/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"name": "string"}'
```

---

## DELETE /api/SubjectCategory/{id} {#delete-api-subjectcategory-id}

`DELETE` `/api/SubjectCategory/{id}`

Operation id: `delete_api_SubjectCategory_id`

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
curl -X DELETE 'https://api.antodb.com/api/SubjectCategory/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
