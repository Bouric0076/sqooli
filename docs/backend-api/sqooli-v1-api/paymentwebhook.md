# PaymentWebhook

Inbound payment provider webhooks.

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/payments/webhook/mpesa {#post-api-payments-webhook-mpesa}

`POST` `/api/payments/webhook/mpesa`

Operation id: `post_api_payments_webhook_mpesa`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`MpesaPaymentNotification`](schemas.md#schema-mpesapaymentnotification)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `reference` | `string` | no |  |
| `isSuccess` | `boolean` | no |  |

Example:

```json
{
  "reference": "string",
  "isSuccess": true
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/payments/webhook/mpesa?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"reference": "string", "isSuccess": true}'
```

---
