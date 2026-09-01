# License

License issuance and lookup.

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/License/save-qualifications {#post-api-license-save-qualifications}

`POST` `/api/License/save-qualifications`

Operation id: `post_api_License_save_qualifications`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`SaveQualificationsDto`](schemas.md#schema-savequalificationsdto)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | no |  |
| `certificateLevelId` | `integer` (int32) | no |  |
| `licenses` | `array` of [`LicenseDto`](#schema-licensedto) | no |  |

Example:

```json
{
  "bio": "string",
  "certificateLevelId": 0,
  "licenses": [
    {
      "name": "string",
      "organization": "string",
      "month": "string",
      "year": "string",
      "expiryMonth": "string",
      "expiryYear": "string",
      "url": "string"
    }
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/License/save-qualifications?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"bio": "string", "certificateLevelId": 0, "licenses": [{"name": "string", "organization": "string", "month": "string", "year": "string", "expiryMonth": "string", "expiryYear": "string", "url": "string"}]}'
```

---
