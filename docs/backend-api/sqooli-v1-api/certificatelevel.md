# CertificateLevel

Teacher/student certificate levels lookup.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/CertificateLevel {#get-api-certificatelevel}

`GET` `/api/CertificateLevel`

Operation id: `get_api_CertificateLevel`

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
curl -X GET 'https://api.antodb.com/api/CertificateLevel?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/CertificateLevel {#post-api-certificatelevel}

`POST` `/api/CertificateLevel`

Operation id: `post_api_CertificateLevel`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`CertificateLevelModel`](schemas.md#schema-certificatelevelmodel)

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

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`CertificateLevelModel`](schemas.md#schema-certificatelevelmodel)

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
curl -X POST 'https://api.antodb.com/api/CertificateLevel?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"id": 0, "name": "string"}'
```

---

## GET /api/CertificateLevel/{id} {#get-api-certificatelevel-id}

`GET` `/api/CertificateLevel/{id}`

Operation id: `get_api_CertificateLevel_id`

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

Schema: [`CertificateLevelModel`](schemas.md#schema-certificatelevelmodel)

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
curl -X GET 'https://api.antodb.com/api/CertificateLevel/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/CertificateLevel/{id} {#put-api-certificatelevel-id}

`PUT` `/api/CertificateLevel/{id}`

Operation id: `put_api_CertificateLevel_id`

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

Schema: [`CertificateLevelModel`](schemas.md#schema-certificatelevelmodel)

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

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/CertificateLevel/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"id": 0, "name": "string"}'
```

---

## DELETE /api/CertificateLevel/{id} {#delete-api-certificatelevel-id}

`DELETE` `/api/CertificateLevel/{id}`

Operation id: `delete_api_CertificateLevel_id`

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
curl -X DELETE 'https://api.antodb.com/api/CertificateLevel/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
