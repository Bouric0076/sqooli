# Invite

User and teacher invitations (single and bulk).

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/invite {#post-api-invite}

`POST` `/api/invite`

Operation id: `post_api_invite`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`InviteRequest`](schemas.md#schema-inviterequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `emails` | `array` of `string` | no |  |

Example:

```json
{
  "emails": [
    "string"
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/invite?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"emails": ["string"]}'
```

---
