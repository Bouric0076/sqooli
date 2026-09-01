# LessonContent

Structured lesson lectures, sections, and content items.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/lesson-content/{lessonId} {#get-api-lesson-content-lessonid}

`GET` `/api/lesson-content/{lessonId}`

Operation id: `get_api_lesson_content_lessonId`

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
curl -X GET 'https://api.antodb.com/api/lesson-content/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/lesson-content/replace {#put-api-lesson-content-replace}

`PUT` `/api/lesson-content/replace`

Operation id: `put_api_lesson_content_replace`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`LessonContentRequest`](schemas.md#schema-lessoncontentrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lessonId` | `integer` (int32) | no |  |
| `sections` | `array` of [`LessonSectionDto`](#schema-lessonsectiondto) | no |  |

Example:

```json
{
  "lessonId": 0,
  "sections": [
    {
      "title": "string",
      "order": 0,
      "lectures": []
    }
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/lesson-content/replace?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"lessonId": 0, "sections": [{"title": "string", "order": 0, "lectures": []}]}'
```

---
