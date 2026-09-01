# Subject

Subjects catalog.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/Subject {#get-api-subject}

`GET` `/api/Subject`

Operation id: `get_api_Subject`

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
curl -X GET 'https://api.antodb.com/api/Subject?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/Subject {#post-api-subject}

`POST` `/api/Subject`

Operation id: `post_api_Subject`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`SubjectRequest`](schemas.md#schema-subjectrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `categoryId` | `integer` (int32) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `colorCode` | `string` | yes |  |

Example:

```json
{
  "categoryId": 0,
  "curriculumId": 0,
  "educationLevelId": 0,
  "gradeLevelId": 0,
  "name": "string",
  "colorCode": "string"
}
```

### Responses

- **200** — OK

  Content-Type: `application/json`

Schema: [`SubjectModel`](schemas.md#schema-subjectmodel)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer` (int32) | no |  |
| `categoryId` | `integer` (int32) | yes |  |
| `category` | [`SubjectCategoryModel`](#schema-subjectcategorymodel) | no |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `curriculum` | [`CurriculaModel`](#schema-curriculamodel) | no |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `educationlevel` | [`EducationlevelsModel`](#schema-educationlevelsmodel) | no |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `gradeLevel` | [`GradeLevelsModel`](#schema-gradelevelsmodel) | no |  |
| `name` | `string` | yes |  |
| `colorCode` | `string` | yes |  |
| `subProgramSubjects` | `array` of [`SubProgramSubjectModel`](#schema-subprogramsubjectmodel) | no |  |

  Example:

```json
{
  "id": 0,
  "categoryId": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "curriculumId": 0,
  "curriculum": {
    "id": 0,
    "name": "string",
    "acronym": "string",
    "schools": null
  },
  "educationLevelId": 0,
  "educationlevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "name": "string"
  },
  "gradeLevelId": 0,
  "gradeLevel": {
    "id": 0,
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": null,
      "name": "string"
    },
    "name": "string"
  },
  "name": "string",
  "colorCode": "string",
  "subProgramSubjects": [
    {
      "id": 0,
      "subProgramId": 0,
      "subProgram": {
        "id": null,
        "programId": null,
        "program": null,
        "name": null,
        "educationLevelId": null,
        "educationLevel": null,
        "startDate": null,
        "endDate": null,
        "slotDurationMinutes": null,
        "subProgramGradeLevels": null,
        "subProgramSubjects": null
      },
      "subjectId": 0,
      "subject": {
        "id": null,
        "categoryId": null,
        "category": null,
        "curriculumId": null,
        "curriculum": null,
        "educationLevelId": null,
        "educationlevel": null,
        "gradeLevelId": null,
        "gradeLevel": null,
        "name": null,
        "colorCode": null,
        "subProgramSubjects": null
      }
    }
  ]
}
```

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Subject?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"categoryId": 0, "curriculumId": 0, "educationLevelId": 0, "gradeLevelId": 0, "name": "string", "colorCode": "string"}'
```

---

## GET /api/Subject/{id} {#get-api-subject-id}

`GET` `/api/Subject/{id}`

Operation id: `get_api_Subject_id`

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

  Content-Type: `application/json`

Schema: [`SubjectGetResponse`](schemas.md#schema-subjectgetresponse)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `boolean` | no |  |
| `message` | `string` \| `null` | no |  |
| `data` | [`SubjectModel`](#schema-subjectmodel) | no |  |

  Example:

```json
{
  "status": true,
  "message": "string",
  "data": {
    "id": 0,
    "categoryId": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "curriculumId": 0,
    "curriculum": {
      "id": 0,
      "name": "string",
      "acronym": "string",
      "schools": null
    },
    "educationLevelId": 0,
    "educationlevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": null,
      "name": "string"
    },
    "gradeLevelId": 0,
    "gradeLevel": {
      "id": 0,
      "curriculumId": 0,
      "curriculum": null,
      "educationLevelId": 0,
      "educationLevel": null,
      "name": "string"
    },
    "name": "string",
    "colorCode": "string",
    "subProgramSubjects": [
      {
        "id": null,
        "subProgramId": null,
        "subProgram": null,
        "subjectId": null,
        "subject": null
      }
    ]
  }
}
```

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/Subject/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/Subject/{id} {#put-api-subject-id}

`PUT` `/api/Subject/{id}`

Operation id: `put_api_Subject_id`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`SubjectRequest`](schemas.md#schema-subjectrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `categoryId` | `integer` (int32) | yes |  |
| `curriculumId` | `integer` (int32) | yes |  |
| `educationLevelId` | `integer` (int32) | yes |  |
| `gradeLevelId` | `integer` (int32) | yes |  |
| `name` | `string` | yes |  |
| `colorCode` | `string` | yes |  |

Example:

```json
{
  "categoryId": 0,
  "curriculumId": 0,
  "educationLevelId": 0,
  "gradeLevelId": 0,
  "name": "string",
  "colorCode": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/Subject/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"categoryId": 0, "curriculumId": 0, "educationLevelId": 0, "gradeLevelId": 0, "name": "string", "colorCode": "string"}'
```

---

## DELETE /api/Subject/{id} {#delete-api-subject-id}

`DELETE` `/api/Subject/{id}`

Operation id: `delete_api_Subject_id`

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
curl -X DELETE 'https://api.antodb.com/api/Subject/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
