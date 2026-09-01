# Auth

Registration, login, Google sign-in, profile, terms, and teacher subject enrollment.

[Back to index](README.md) · [Data models](schemas.md)

## POST /api/Auth/register/init {#post-api-auth-register-init}

`POST` `/api/Auth/register/init`

Operation id: `post_api_Auth_register_init`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`RegisterInitRequest`](schemas.md#schema-registerinitrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chatId` | `string` \| `null` | no |  |
| `firstName` | `string` | no |  |
| `lastName` | `string` | no |  |
| `email` | `string` | no |  |
| `password` | `string` | no |  |
| `referralCode` | `string` \| `null` | no |  |

Example:

```json
{
  "chatId": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "referralCode": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Auth/register/init?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"chatId": "string", "firstName": "string", "lastName": "string", "email": "string", "password": "string", "referralCode": "string"}'
```

---

## POST /api/Auth/verify-email {#post-api-auth-verify-email}

`POST` `/api/Auth/verify-email`

Operation id: `post_api_Auth_verify_email`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`VerificationEmailRequest`](schemas.md#schema-verificationemailrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `userId` | `string` | no |  |
| `token` | `string` | no |  |

Example:

```json
{
  "userId": "string",
  "token": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Auth/verify-email?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"userId": "string", "token": "string"}'
```

---

## POST /api/Auth/resend-verification-email {#post-api-auth-resend-verification-email}

`POST` `/api/Auth/resend-verification-email`

Operation id: `post_api_Auth_resend_verification_email`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`ResendVerificationEmailRequest`](schemas.md#schema-resendverificationemailrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | no |  |

Example:

```json
{
  "email": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Auth/resend-verification-email?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"email": "string"}'
```

---

## POST /api/Auth/set-password {#post-api-auth-set-password}

`POST` `/api/Auth/set-password`

Used by an authenticated invite or first-login session to replace the temporary credential with the user's chosen password.

### Request body

Required. Content-Type: `application/json`.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `password` | `string` | no | New password. |
| `confirmPassword` | `string` | no | Must match `password`. |
| `currentPassword` | `string` \| `null` | no | Existing password when changing a password; send `null` for an invite setup session. |

Example:

```json
{
  "password": "string",
  "confirmPassword": "string",
  "currentPassword": null
}
```

### Responses

- **200** — OK

---

## POST /api/Auth/register/complete {#post-api-auth-register-complete}

`POST` `/api/Auth/register/complete`

Operation id: `post_api_Auth_register_complete`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`RegisterCompleteRequest`](schemas.md#schema-registercompleterequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | no |  |
| `role` | `string` | no |  |
| `gender` | `string` \| `null` | no |  |
| `firstName` | `string` \| `null` | no |  |
| `lastName` | `string` \| `null` | no |  |
| `phone` | `string` | no |  |
| `address` | `string` \| `null` | no |  |
| `referralCode` | `string` \| `null` | no |  |
| `certificateLevelId` | `integer` (int32) \| `null` | no |  |
| `teacherEnrollments` | `array` of [`TeacherEnrollmentRequest`](#schema-teacherenrollmentrequest) \| `null` | no |  |
| `studentEnrollments` | `array` of [`StudentEnrollmentRequest`](#schema-studentenrollmentrequest) \| `null` | no |  |
| `nationalId` | `string` \| `null` | no |  |
| `nationality` | `string` \| `null` | no |  |
| `schoolName` | `string` \| `null` | no |  |
| `code` | `string` \| `null` | no |  |
| `schoolEmail` | `string` \| `null` | no |  |
| `adminEmail` | `string` \| `null` | no |  |
| `website` | `string` \| `null` | no |  |
| `motto` | `string` \| `null` | no |  |
| `description` | `string` \| `null` | no |  |
| `logoPath` | `string` \| `null` | no |  |
| `schoolTypeId` | `integer` (int32) | no |  |
| `curriculumIds` | `array` of `integer` (int32) | no |  |

Example:

```json
{
  "email": "string",
  "role": "string",
  "gender": "string",
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "address": "string",
  "referralCode": "string",
  "certificateLevelId": 0,
  "teacherEnrollments": [
    {
      "curriculumId": 0,
      "gradeLevelId": 0,
      "schoolId": 0,
      "subjectIds": [
        0
      ]
    }
  ],
  "studentEnrollments": [
    {
      "curriculumId": 0,
      "gradeLevelId": 0,
      "schoolId": 0,
      "subjectIds": [
        0
      ]
    }
  ],
  "nationalId": "string",
  "nationality": "string",
  "schoolName": "string",
  "code": "string",
  "schoolEmail": "string",
  "adminEmail": "string",
  "website": "string",
  "motto": "string",
  "description": "string",
  "logoPath": "string",
  "schoolTypeId": 0,
  "curriculumIds": [
    0
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Auth/register/complete?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"email": "string", "role": "string", "gender": "string", "firstName": "string", "lastName": "string", "phone": "string", "address": "string", "referralCode": "string", "certificateLevelId": 0, "teacherEnrollments": [{"curriculumId": 0, "gradeLevelId": 0, "schoolId": 0, "subjectIds": [0]}], "studentEnrollments": [{"curriculumId": 0, "gradeLevelId": 0, "schoolId": 0, "subjectIds": [0]}], "nationalId": "string", "nationality": "string", "schoolName": "string", "code": "string", "schoolEmail": "string", "adminEmail": "string", "website": "string", "motto": "string", "description": "string", "logoPath": "string", "schoolTypeId": 0, "curriculumIds": [0]}'
```

---

## PUT /api/Auth/update-subjects {#put-api-auth-update-subjects}

`PUT` `/api/Auth/update-subjects`

Operation id: `put_api_Auth_update_subjects`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`TeacherSelfEnrollmentRequest`](schemas.md#schema-teacherselfenrollmentrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `curriculumId` | `integer` (int32) | no |  |
| `educationLevelId` | `integer` (int32) | no |  |
| `gradeLevelId` | `integer` (int32) | no |  |
| `schoolId` | `integer` (int32) \| `null` | no |  |
| `tscNumber` | `string` \| `null` | no |  |
| `referralCode` | `string` \| `null` | no |  |
| `subjectIds` | `array` of `integer` (int32) \| `null` | no |  |

Example:

```json
{
  "curriculumId": 0,
  "educationLevelId": 0,
  "gradeLevelId": 0,
  "schoolId": 0,
  "tscNumber": "string",
  "referralCode": "string",
  "subjectIds": [
    0
  ]
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/Auth/update-subjects?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"curriculumId": 0, "educationLevelId": 0, "gradeLevelId": 0, "schoolId": 0, "tscNumber": "string", "referralCode": "string", "subjectIds": [0]}'
```

---

## POST /api/Auth/google-login {#post-api-auth-google-login}

`POST` `/api/Auth/google-login`

Operation id: `post_api_Auth_google_login`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`GoogleLoginRequest`](schemas.md#schema-googleloginrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idToken` | `string` | no |  |
| `referralCode` | `string` \| `null` | no |  |

Example:

```json
{
  "idToken": "string",
  "referralCode": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Auth/google-login?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"idToken": "string", "referralCode": "string"}'
```

---

## POST /api/Auth/login {#post-api-auth-login}

`POST` `/api/Auth/login`

Operation id: `post_api_Auth_login`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`LoginRequest`](schemas.md#schema-loginrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | no |  |
| `password` | `string` | no |  |

Example:

```json
{
  "email": "string",
  "password": "string"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Auth/login?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"email": "string", "password": "string"}'
```

---

## PUT /api/Auth/update-profile {#put-api-auth-update-profile}

`PUT` `/api/Auth/update-profile`

Operation id: `put_api_Auth_update_profile`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`UpdateProfileRequest`](schemas.md#schema-updateprofilerequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `firstName` | `string` \| `null` | no |  |
| `lastName` | `string` \| `null` | no |  |
| `nationality` | `string` \| `null` | no |  |
| `nationalId` | `string` \| `null` | no |  |
| `email` | `string` \| `null` | no |  |
| `phone` | `string` \| `null` | no |  |
| `address` | `string` \| `null` | no |  |
| `role` | `string` | no |  |
| `gender` | `string` | no |  |
| `dob` | `string` (date) | no |  |

Example:

```json
{
  "firstName": "string",
  "lastName": "string",
  "nationality": "string",
  "nationalId": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "role": "string",
  "gender": "string",
  "dob": "2026-01-15"
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X PUT 'https://api.antodb.com/api/Auth/update-profile?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"firstName": "string", "lastName": "string", "nationality": "string", "nationalId": "string", "email": "string", "phone": "string", "address": "string", "role": "string", "gender": "string", "dob": "2026-01-15"}'
```

---

## POST /api/Auth/accept-terms {#post-api-auth-accept-terms}

`POST` `/api/Auth/accept-terms`

Operation id: `post_api_Auth_accept_terms`

### Query parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `api-version` | `query` | `string` | no |  |

### Request body

Required. Content-Type: `application/json`.

Schema: [`AcceptTermsRequest`](schemas.md#schema-accepttermsrequest)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acceptTerms` | `boolean` | no |  |

Example:

```json
{
  "acceptTerms": true
}
```

### Responses

- **200** — OK

cURL:

```bash
curl -X POST 'https://api.antodb.com/api/Auth/accept-terms?api-version=1.0' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"acceptTerms": true}'
```

---
