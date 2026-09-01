# Resource

Learning resources attached to lessons or topics.

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/Resource/create {#post-api-resource-create}

`POST` `/api/Resource/create`

Operation id: `post_api_Resource_create`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`CreateResourceRequest`](schemas.md#schema-createresourcerequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `resourceType` | `string` | no |  |
| `title` | `string` | no |  |
| `description` | `string` \| `null` | no |  |
| `isPublic` | `boolean` | no |  |

Example:

```json
{
  "resourceType": "string",
  "title": "string",
  "description": "string",
  "isPublic": true
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Resource/create?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"resourceType": "string", "title": "string", "description": "string", "isPublic": true}'
```

---

## POST /api/Resource/{resourceId}/attach {#post-api-resource-resourceid-attach}

`POST` `/api/Resource/{resourceId}/attach`

Operation id: `post_api_Resource_resourceId_attach`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `resourceId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`AttachResourceRequest`](schemas.md#schema-attachresourcerequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `entityType` | `string` | no |  |
| `entityId` | `integer` (int32) | no |  |
| `usageType` | `string` \| `null` | no |  |
| `order` | `integer` (int32) \| `null` | no |  |

Example:

```json
{
  "entityType": "string",
  "entityId": 0,
  "usageType": "string",
  "order": 0
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Resource/123/attach?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"entityType": "string", "entityId": 0, "usageType": "string", "order": 0}'
```

---

## GET /api/Resource/resource/{resourceType} {#get-api-resource-resource-resourcetype}

`GET` `/api/Resource/resource/{resourceType}`

Operation id: `get_api_Resource_resource_resourceType`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `resourceType` | `path` | `string` | yes |  |

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
curl -X GET 'https://api.antodb.com/api/Resource/resource/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/Resource/{id} {#get-api-resource-id}

`GET` `/api/Resource/{id}`

Operation id: `get_api_Resource_id`

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
curl -X GET 'https://api.antodb.com/api/Resource/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
