# FileUpload

Upload and list files used by lessons and resources.

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/files/upload {#post-api-files-upload}

`POST` `/api/files/upload`

Operation id: `post_api_files_upload`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/x-www-form-urlencoded`.

Type: `object` + `object`

Example:

```json
{
  "ContentType": "string",
  "ContentDisposition": "string",
  "Headers": {},
  "Length": 0,
  "Name": "string",
  "FileName": "string",
  "EntityType": "string",
  "EntityId": "string",
  "Category": "string",
  "IsPublic": true,
  "Title": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/files/upload?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -F 'file=@/path/to/file' \
  -F 'EntityType=Lesson' \
  -F 'EntityId=123' \
  -F 'Category=resource' \
  -F 'IsPublic=true' \
  -F 'Title=Handout'
```

---

## GET /api/files {#get-api-files}

`GET` `/api/files`

Operation id: `get_api_files`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `entityType` | `query` | `string` | no |  |
| `entityId` | `query` | `string` | no |  |
| `category` | `query` | `string` | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/files?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## DELETE /api/files/{id} {#delete-api-files-id}

`DELETE` `/api/files/{id}`

Operation id: `delete_api_files_id`

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
curl -X DELETE 'https://api.antodb.com/api/files/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
