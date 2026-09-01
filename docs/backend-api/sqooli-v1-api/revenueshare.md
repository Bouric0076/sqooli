# RevenueShare

Revenue share configuration and reporting.

[Back to index](README.md) · [Data models](schemas.md)

## PUT /api/lesson-revenue-share/{lessonId}/pricing {#put-api-lesson-revenue-share-lessonid-pricing}

`PUT` `/api/lesson-revenue-share/{lessonId}/pricing`

Operation id: `put_api_lesson_revenue_share_lessonId_pricing`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`LessonPricingDto`](schemas.md#schema-lessonpricingdto)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `price` | `number` | no |  |
| `revenueShares` | `array` of [`RevenueShareDto`](#schema-revenuesharedto) \| `null` | no |  |

Example:

```json
{
  "lessonId": 0,
  "price": 0,
  "revenueShares": [
    {
      "userId": "string",
      "commissionType": "string",
      "value": 0
    }
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/lesson-revenue-share/123/pricing?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "price": 0, "revenueShares": [{"userId": "string", "commissionType": "string", "value": 0}]}'
```

---

## GET /api/lesson-revenue-share/{lessonId}/pricing {#get-api-lesson-revenue-share-lessonid-pricing}

`GET` `/api/lesson-revenue-share/{lessonId}/pricing`

Operation id: `get_api_lesson_revenue_share_lessonId_pricing`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/lesson-revenue-share/123/pricing?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
