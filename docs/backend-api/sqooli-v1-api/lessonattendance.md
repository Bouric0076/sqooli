# LessonAttendance

Attendance for booked lessons.

[Back to index](README.md) · [Data models](schemas.md)

## GET /api/LessonAttendance {#get-api-lessonattendance}

`GET` `/api/LessonAttendance`

Operation id: `get_api_LessonAttendance`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/LessonAttendance?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/LessonAttendance/{id} {#get-api-lessonattendance-id}

`GET` `/api/LessonAttendance/{id}`

Operation id: `get_api_LessonAttendance_id`

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
curl -X GET 'https://api.antodb.com/api/LessonAttendance/123?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/LessonAttendance/attendance/teacher/join {#post-api-lessonattendance-attendance-teacher-join}

`POST` `/api/LessonAttendance/attendance/teacher/join`

Operation id: `post_api_LessonAttendance_attendance_teacher_join`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `query` | `integer` (int32) | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/LessonAttendance/attendance/teacher/join?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/LessonAttendance/attendance/student/join {#post-api-lessonattendance-attendance-student-join}

`POST` `/api/LessonAttendance/attendance/student/join`

Operation id: `post_api_LessonAttendance_attendance_student_join`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `query` | `integer` (int32) | no |  |
| `teacherId` | `query` | `integer` (int32) | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/LessonAttendance/attendance/student/join?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## POST /api/LessonAttendance/attendance/leave {#post-api-lessonattendance-attendance-leave}

`POST` `/api/LessonAttendance/attendance/leave`

Operation id: `post_api_LessonAttendance_attendance_leave`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `query` | `integer` (int32) | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/LessonAttendance/attendance/leave?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/LessonAttendance/attendance/status {#get-api-lessonattendance-attendance-status}

`GET` `/api/LessonAttendance/attendance/status`

Operation id: `get_api_LessonAttendance_attendance_status`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `query` | `integer` (int32) | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/LessonAttendance/attendance/status?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---

## GET /api/LessonAttendance/attendance/result {#get-api-lessonattendance-attendance-result}

`GET` `/api/LessonAttendance/attendance/result`

Operation id: `get_api_LessonAttendance_attendance_result`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `lessonId` | `query` | `integer` (int32) | no |  |
| `api-version` | `query` | `string` | no |  |

### Responses

- **200** — OK

cURL:

```bash
curl -X GET 'https://api.antodb.com/api/LessonAttendance/attendance/result?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN'
```

---
