# Wallet

Wallet balance, transaction history, M-Pesa top-up/withdraw, transfers, and PIN verification.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/wallet/balance {#get-api-wallet-balance}

`GET` `/api/wallet/balance`

Operation id: `get_api_wallet_balance`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/wallet/balance?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/wallet/transactions {#get-api-wallet-transactions}

`GET` `/api/wallet/transactions`

Operation id: `get_api_wallet_transactions`

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
curl -X GET 'https://api.antodb.com/api/wallet/transactions?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/wallet/topup/mpesa {#post-api-wallet-topup-mpesa}

`POST` `/api/wallet/topup/mpesa`

Operation id: `post_api_wallet_topup_mpesa`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`MpesaTopupRequest`](schemas.md#schema-mpesatopuprequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `phoneNumber` | `string` | no |  |
| `amount` | `number` | no |  |

Example:

```json
{
  "phoneNumber": "string",
  "amount": 0
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/wallet/topup/mpesa?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"phoneNumber": "string", "amount": 0}'
```

---

## POST /api/wallet/withdraw/mpesa {#post-api-wallet-withdraw-mpesa}

`POST` `/api/wallet/withdraw/mpesa`

Operation id: `post_api_wallet_withdraw_mpesa`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`MpesaWithdrawRequest`](schemas.md#schema-mpesawithdrawrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `phoneNumber` | `string` | no |  |
| `amount` | `number` | no |  |
| `pin` | `string` | no |  |

Example:

```json
{
  "phoneNumber": "string",
  "amount": 0,
  "pin": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/wallet/withdraw/mpesa?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"phoneNumber": "string", "amount": 0, "pin": "string"}'
```

---

## POST /api/wallet/transfer {#post-api-wallet-transfer}

`POST` `/api/wallet/transfer`

Operation id: `post_api_wallet_transfer`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`TransferRequest`](schemas.md#schema-transferrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `receiverUserId` | `string` | no |  |
| `amount` | `number` | no |  |
| `pin` | `string` | no |  |

Example:

```json
{
  "receiverUserId": "string",
  "amount": 0,
  "pin": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/wallet/transfer?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"receiverUserId": "string", "amount": 0, "pin": "string"}'
```

---

## POST /api/wallet/verify-pin {#post-api-wallet-verify-pin}

`POST` `/api/wallet/verify-pin`

Operation id: `post_api_wallet_verify_pin`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`PinRequest`](schemas.md#schema-pinrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `pin` | `string` | no |  |

Example:

```json
{
  "pin": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/wallet/verify-pin?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"pin": "string"}'
```

---
