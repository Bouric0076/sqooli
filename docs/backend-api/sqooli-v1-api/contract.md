# Contract

Contracts between schools, teachers, or platform.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/Contract {#get-api-contract}

`GET` `/api/Contract`

Operation id: `get_api_Contract`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `page` | `query` | `integer` (int32) | no |  |
| `pageSize` | `query` | `integer` (int32) | no |  |
| `search` | `query` | `string` | no |  |
| `type` | `query` | [`ContractType`](#schema-contracttype) | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Contract?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Contract {#post-api-contract}

`POST` `/api/Contract`

Operation id: `post_api_Contract`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`ContractRequest`](schemas.md#schema-contractrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | yes |  |
| `content` | `string` | yes |  |
| `contractType` | [`ContractType`](#schema-contracttype) | yes |  |

Example:

```json
{
  "title": "string",
  "content": "string",
  "contractType": 0
}
```

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`ContractModel`](schemas.md#schema-contractmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `title` | `string` | yes |  |
| `content` | `string` | yes |  |
| `contractType` | [`ContractType`](#schema-contracttype) | yes |  |

  Example:

```json
{
  "id": 0,
  "title": "string",
  "content": "string",
  "contractType": 0
}
```

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Contract?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"title": "string", "content": "string", "contractType": 0}'
```

---

## GET /api/Contract/{id} {#get-api-contract-id}

`GET` `/api/Contract/{id}`

Operation id: `get_api_Contract_id`

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

Schema: [`ContractGetResponse`](schemas.md#schema-contractgetresponse)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`ContractModel`](#schema-contractmodel) | no |  |

  Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "title": "string",
    "content": "string",
    "contractType": 0
  }
}
```

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Contract/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/Contract/{id} {#put-api-contract-id}

`PUT` `/api/Contract/{id}`

Operation id: `put_api_Contract_id`

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

Schema: [`ContractRequest`](schemas.md#schema-contractrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | yes |  |
| `content` | `string` | yes |  |
| `contractType` | [`ContractType`](#schema-contracttype) | yes |  |

Example:

```json
{
  "title": "string",
  "content": "string",
  "contractType": 0
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/Contract/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"title": "string", "content": "string", "contractType": 0}'
```

---

## DELETE /api/Contract/{id} {#delete-api-contract-id}

`DELETE` `/api/Contract/{id}`

Operation id: `delete_api_Contract_id`

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
curl -X DELETE 'https://api.antodb.com/api/Contract/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
