# MpesaCallback

M-Pesa STK / callback notifications.

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/mpesa/callback {#post-api-mpesa-callback}

`POST` `/api/mpesa/callback`

Operation id: `post_api_mpesa_callback`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/mpesa/callback?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

---
