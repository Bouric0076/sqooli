# Program

Academic programs, sub-programs, schedules, slots, and holidays.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/CPrograms {#get-api-cprograms}

`GET` `/api/CPrograms`

Operation id: `get_api_CPrograms`

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
curl -X GET 'https://api.antodb.com/api/CPrograms?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/CPrograms {#post-api-cprograms}

`POST` `/api/CPrograms`

Operation id: `post_api_CPrograms`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`CProgramRequest`](schemas.md#schema-cprogramrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `programName` | `string` | no |  |
| `programTypeId` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | no |  |
| `programStartDate` | `string` (date-time) | no |  |
| `programEndDate` | `string` (date-time) | no |  |
| `hasSubPrograms` | `boolean` | no |  |
| `subPrograms` | `array` of [`SubProgramRequest`](#schema-subprogramrequest) | no |  |
| `schedules` | `array` of [`ScheduleRequest`](#schema-schedulerequest) | no |  |
| `holidays` | `array` of [`HolidayRequest`](#schema-holidayrequest) | no |  |
| `businessHours` | `array` of [`BusinessHourRequest`](#schema-businesshourrequest) | no |  |
| `slotDurationMinutes` | `integer` (int32) | no |  |

Example:

```json
{
  "programName": "string",
  "programTypeId": 0,
  "curriculumId": 0,
  "programStartDate": "2026-01-15T08:00:00Z",
  "programEndDate": "2026-01-15T08:00:00Z",
  "hasSubPrograms": true,
  "subPrograms": [
    {
      "name": "string",
      "educationLevelId": 0,
      "gradeLevelIds": [
        0
      ],
      "gradeLevelId": 0,
      "subjectIds": [
        0
      ],
      "startDate": "2026-01-15T08:00:00Z",
      "endDate": "2026-01-15T08:00:00Z",
      "slotDurationMinutes": 0
    }
  ],
  "schedules": [
    {
      "dayOfWeek": 0,
      "isActive": true,
      "startTime": "string",
      "endTime": "string",
      "breaks": []
    }
  ],
  "holidays": [
    {
      "holidayName": "string",
      "startDate": "2026-01-15T08:00:00Z",
      "endDate": "2026-01-15T08:00:00Z"
    }
  ],
  "businessHours": [
    {
      "day": 0,
      "isActive": true
    }
  ],
  "slotDurationMinutes": 0
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/CPrograms?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"programName": "string", "programTypeId": 0, "curriculumId": 0, "programStartDate": "2026-01-15T08:00:00Z", "programEndDate": "2026-01-15T08:00:00Z", "hasSubPrograms": true, "subPrograms": [{"name": "string", "educationLevelId": 0, "gradeLevelIds": [0], "gradeLevelId": 0, "subjectIds": [0], "startDate": "2026-01-15T08:00:00Z", "endDate": "2026-01-15T08:00:00Z", "slotDurationMinutes": 0}], "schedules": [{"dayOfWeek": 0, "isActive": true, "startTime": "string", "endTime": "string", "breaks": []}], "holidays": [{"holidayName": "string", "startDate": "2026-01-15T08:00:00Z", "endDate": "2026-01-15T08:00:00Z"}], "businessHours": [{"day": 0, "isActive": true}], "slotDurationMinutes": 0}'
```

---

## GET /api/CPrograms/{id} {#get-api-cprograms-id}

`GET` `/api/CPrograms/{id}`

Operation id: `get_api_CPrograms_id`

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
curl -X GET 'https://api.antodb.com/api/CPrograms/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## PUT /api/CPrograms/{id} {#put-api-cprograms-id}

`PUT` `/api/CPrograms/{id}`

Operation id: `put_api_CPrograms_id`

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

Schema: [`CProgramRequest`](schemas.md#schema-cprogramrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `programName` | `string` | no |  |
| `programTypeId` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | no |  |
| `programStartDate` | `string` (date-time) | no |  |
| `programEndDate` | `string` (date-time) | no |  |
| `hasSubPrograms` | `boolean` | no |  |
| `subPrograms` | `array` of [`SubProgramRequest`](#schema-subprogramrequest) | no |  |
| `schedules` | `array` of [`ScheduleRequest`](#schema-schedulerequest) | no |  |
| `holidays` | `array` of [`HolidayRequest`](#schema-holidayrequest) | no |  |
| `businessHours` | `array` of [`BusinessHourRequest`](#schema-businesshourrequest) | no |  |
| `slotDurationMinutes` | `integer` (int32) | no |  |

Example:

```json
{
  "programName": "string",
  "programTypeId": 0,
  "curriculumId": 0,
  "programStartDate": "2026-01-15T08:00:00Z",
  "programEndDate": "2026-01-15T08:00:00Z",
  "hasSubPrograms": true,
  "subPrograms": [
    {
      "name": "string",
      "educationLevelId": 0,
      "gradeLevelIds": [
        0
      ],
      "gradeLevelId": 0,
      "subjectIds": [
        0
      ],
      "startDate": "2026-01-15T08:00:00Z",
      "endDate": "2026-01-15T08:00:00Z",
      "slotDurationMinutes": 0
    }
  ],
  "schedules": [
    {
      "dayOfWeek": 0,
      "isActive": true,
      "startTime": "string",
      "endTime": "string",
      "breaks": []
    }
  ],
  "holidays": [
    {
      "holidayName": "string",
      "startDate": "2026-01-15T08:00:00Z",
      "endDate": "2026-01-15T08:00:00Z"
    }
  ],
  "businessHours": [
    {
      "day": 0,
      "isActive": true
    }
  ],
  "slotDurationMinutes": 0
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/CPrograms/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"programName": "string", "programTypeId": 0, "curriculumId": 0, "programStartDate": "2026-01-15T08:00:00Z", "programEndDate": "2026-01-15T08:00:00Z", "hasSubPrograms": true, "subPrograms": [{"name": "string", "educationLevelId": 0, "gradeLevelIds": [0], "gradeLevelId": 0, "subjectIds": [0], "startDate": "2026-01-15T08:00:00Z", "endDate": "2026-01-15T08:00:00Z", "slotDurationMinutes": 0}], "schedules": [{"dayOfWeek": 0, "isActive": true, "startTime": "string", "endTime": "string", "breaks": []}], "holidays": [{"holidayName": "string", "startDate": "2026-01-15T08:00:00Z", "endDate": "2026-01-15T08:00:00Z"}], "businessHours": [{"day": 0, "isActive": true}], "slotDurationMinutes": 0}'
```

---

## DELETE /api/CPrograms/{id} {#delete-api-cprograms-id}

`DELETE` `/api/CPrograms/{id}`

Operation id: `delete_api_CPrograms_id`

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
curl -X DELETE 'https://api.antodb.com/api/CPrograms/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/CPrograms/{programId} {#post-api-cprograms-programid}

`POST` `/api/CPrograms/{programId}`

Operation id: `post_api_CPrograms_programId`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `programId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`CProgramRequest`](schemas.md#schema-cprogramrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `programName` | `string` | no |  |
| `programTypeId` | `integer` (int32) | no |  |
| `curriculumId` | `integer` (int32) | no |  |
| `programStartDate` | `string` (date-time) | no |  |
| `programEndDate` | `string` (date-time) | no |  |
| `hasSubPrograms` | `boolean` | no |  |
| `subPrograms` | `array` of [`SubProgramRequest`](#schema-subprogramrequest) | no |  |
| `schedules` | `array` of [`ScheduleRequest`](#schema-schedulerequest) | no |  |
| `holidays` | `array` of [`HolidayRequest`](#schema-holidayrequest) | no |  |
| `businessHours` | `array` of [`BusinessHourRequest`](#schema-businesshourrequest) | no |  |
| `slotDurationMinutes` | `integer` (int32) | no |  |

Example:

```json
{
  "programName": "string",
  "programTypeId": 0,
  "curriculumId": 0,
  "programStartDate": "2026-01-15T08:00:00Z",
  "programEndDate": "2026-01-15T08:00:00Z",
  "hasSubPrograms": true,
  "subPrograms": [
    {
      "name": "string",
      "educationLevelId": 0,
      "gradeLevelIds": [
        0
      ],
      "gradeLevelId": 0,
      "subjectIds": [
        0
      ],
      "startDate": "2026-01-15T08:00:00Z",
      "endDate": "2026-01-15T08:00:00Z",
      "slotDurationMinutes": 0
    }
  ],
  "schedules": [
    {
      "dayOfWeek": 0,
      "isActive": true,
      "startTime": "string",
      "endTime": "string",
      "breaks": []
    }
  ],
  "holidays": [
    {
      "holidayName": "string",
      "startDate": "2026-01-15T08:00:00Z",
      "endDate": "2026-01-15T08:00:00Z"
    }
  ],
  "businessHours": [
    {
      "day": 0,
      "isActive": true
    }
  ],
  "slotDurationMinutes": 0
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/CPrograms/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"programName": "string", "programTypeId": 0, "curriculumId": 0, "programStartDate": "2026-01-15T08:00:00Z", "programEndDate": "2026-01-15T08:00:00Z", "hasSubPrograms": true, "subPrograms": [{"name": "string", "educationLevelId": 0, "gradeLevelIds": [0], "gradeLevelId": 0, "subjectIds": [0], "startDate": "2026-01-15T08:00:00Z", "endDate": "2026-01-15T08:00:00Z", "slotDurationMinutes": 0}], "schedules": [{"dayOfWeek": 0, "isActive": true, "startTime": "string", "endTime": "string", "breaks": []}], "holidays": [{"holidayName": "string", "startDate": "2026-01-15T08:00:00Z", "endDate": "2026-01-15T08:00:00Z"}], "businessHours": [{"day": 0, "isActive": true}], "slotDurationMinutes": 0}'
```

---

## GET /api/CPrograms/{subProgramId}/slots {#get-api-cprograms-subprogramid-slots}

`GET` `/api/CPrograms/{subProgramId}/slots`

Operation id: `get_api_CPrograms_subProgramId_slots`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `subProgramId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `subject` | `query` | `string` | no |  |
| `status` | `query` | `string` | no |  |
| `fromDate` | `query` | `string` (date-time) | no |  |
| `toDate` | `query` | `string` (date-time) | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/CPrograms/123/slots?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/CPrograms/slots/bulk-invite {#post-api-cprograms-slots-bulk-invite}

`POST` `/api/CPrograms/slots/bulk-invite`

Operation id: `post_api_CPrograms_slots_bulk_invite`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`BulkInviteRequest`](schemas.md#schema-bulkinviterequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `subjectId` | `integer` (int32) | no |  |
| `teacherIds` | `array` of `integer` (int32) | no |  |
| `slots` | `array` of [`SlotItem`](#schema-slotitem) | no |  |
| `teachers` | `array` of [`NewTeacherItem`](#schema-newteacheritem) | no |  |

Example:

```json
{
  "subjectId": 0,
  "teacherIds": [
    0
  ],
  "slots": [
    {
      "slotId": 0
    }
  ],
  "teachers": [
    {
      "id": 0,
      "fullName": "string",
      "phone": "string",
      "email": "string",
      "bio": "string",
      "workplace": "string",
      "isNew": true,
      "address": "string",
      "nationalId": "string",
      "gender": "string",
      "dob": "2026-01-15",
      "enrollments": []
    }
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/CPrograms/slots/bulk-invite?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"subjectId": 0, "teacherIds": [0], "slots": [{"slotId": 0}], "teachers": [{"id": 0, "fullName": "string", "phone": "string", "email": "string", "bio": "string", "workplace": "string", "isNew": true, "address": "string", "nationalId": "string", "gender": "string", "dob": "2026-01-15", "enrollments": []}]}'
```

---

## GET /api/CPrograms/slots {#get-api-cprograms-slots}

`GET` `/api/CPrograms/slots`

Operation id: `get_api_CPrograms_slots`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `teacherId` | `query` | `integer` (int32) | no |  |
| `status` | `query` | `string` | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/CPrograms/slots?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/CPrograms/timetable {#get-api-cprograms-timetable}

`GET` `/api/CPrograms/timetable`

Operation id: `get_api_CPrograms_timetable`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `teacherId` | `query` | `integer` (int32) | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/CPrograms/timetable?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/CPrograms/invitations {#get-api-cprograms-invitations}

`GET` `/api/CPrograms/invitations`

Operation id: `get_api_CPrograms_invitations`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `teacherId` | `query` | `integer` (int32) | no |  |
| `status` | `query` | `string` | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/CPrograms/invitations?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/CPrograms/slots/details {#get-api-cprograms-slots-details}

`GET` `/api/CPrograms/slots/details`

Operation id: `get_api_CPrograms_slots_details`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `token` | `query` | `string` | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/CPrograms/slots/details?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/CPrograms/slots/accept {#post-api-cprograms-slots-accept}

`POST` `/api/CPrograms/slots/accept`

Operation id: `post_api_CPrograms_slots_accept`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`AcceptSlotInvitationDto`](schemas.md#schema-acceptslotinvitationdto)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | no |  |

Example:

```json
{
  "token": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/CPrograms/slots/accept?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"token": "string"}'
```

---

## POST /api/CPrograms/slots/decline {#post-api-cprograms-slots-decline}

`POST` `/api/CPrograms/slots/decline`

Operation id: `post_api_CPrograms_slots_decline`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`RejectSlotInvitationDto`](schemas.md#schema-rejectslotinvitationdto)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | no |  |

Example:

```json
{
  "token": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/CPrograms/slots/decline?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"token": "string"}'
```

---

## POST /api/CPrograms/slots/{slotId}/respond {#post-api-cprograms-slots-slotid-respond}

`POST` `/api/CPrograms/slots/{slotId}/respond`

Operation id: `post_api_CPrograms_slots_slotId_respond`

### Path parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `slotId` | `path` | `integer` (int32) | yes |  |

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`SlotResponseRequest`](schemas.md#schema-slotresponserequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `teacherId` | `integer` (int32) | no |  |
| `action` | `string` | no |  |

Example:

```json
{
  "teacherId": 0,
  "action": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/CPrograms/slots/123/respond?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"teacherId": 0, "action": "string"}'
```

---
