# Email

Transactional email send endpoints.

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/email/send {#post-api-email-send}

`POST` `/api/email/send`

Operation id: `post_api_email_send`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/email/send?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
