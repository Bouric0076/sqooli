# Sqooli API integration: 15-minute walkthrough

Use this as a simple script for the API integration session. The goal is to demonstrate one complete request, then show how the same pattern is reused for staff endpoints.

## What she should understand by the end

1. An API request is made from a client to a base URL plus an endpoint path.
2. `POST` requests usually send JSON in the request body; `GET` requests read data.
3. Login returns a token. Protected requests send it as `Authorization: Bearer <token>`.
4. Every request should handle both success and failure responses.
5. The OpenAPI page is the source of truth for endpoint paths, parameters, request bodies, and response examples.

## Suggested 15-minute agenda

### 0–2 minutes: Orient her in the documentation

Open the Swagger UI page:

```text
docs/backend-api/sqooli-v1-api/index.html
```

Explain the main sections:

- **Auth**: registration and login.
- **Teacher**: teacher directory, teacher invitations, and school admins.
- **SchoolAdmin**: invite or remove school staff/admin records.
- Other tags: lessons, schools, wallet, assessments, and so on.

Tell her to start with an endpoint's method, URL, parameters, request body, and response. She does not need to understand all 178 operations at once.

### 2–5 minutes: Explain the URL structure

Use this format:

```text
https://api.antodb.com + /api/Auth/login + ?api-version=1.0
```

Important: the OpenAPI server field contains `/api/`, but the endpoint paths also contain `/api/`. For actual requests, use the host without the trailing `/api/`:

```text
https://api.antodb.com
```

Otherwise the URL can accidentally become:

```text
https://api.antodb.com/api/api/Auth/login
```

### 5–8 minutes: Demonstrate login

Start with `POST /api/Auth/login` in Swagger UI or Postman.

Request:

```json
{
  "email": "staff@example.com",
  "password": "the-password"
}
```

Request details:

```text
POST https://api.antodb.com/api/Auth/login?api-version=1.0
Accept: application/json
Content-Type: application/json
```

Explain that the response should contain an access token, but the current specification does not name the exact response property. Inspect the real response and identify whether it is called `token`, `accessToken`, or another name before wiring the frontend.

Then store the token only for the session or in the application's approved secure storage. Do not put tokens in source code or commit them to Git.

### 8–12 minutes: Demonstrate a staff request

There are two likely staff flows:

#### Invite a teacher

`POST /api/Teacher/invite-teacher`

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+254700000000",
  "role": "Teacher",
  "curriculumId": 1,
  "educationLevelId": 1,
  "gradeLevelId": 4,
  "subjectId": 2
}
```

#### Invite a school administrator/staff member

`POST /api/SchoolAdmin/invite`

The documented request body uses the same `InviteTeacherRequest` shape, so use the fields relevant to the staff member:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+254711111111",
  "role": "SchoolAdmin",
  "workplace": "Example School"
}
```

Both requests need the login token:

```text
Authorization: Bearer <token>
```

Example with `fetch`:

```js
const response = await fetch(
  'https://api.antodb.com/api/SchoolAdmin/invite?api-version=1.0',
  {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+254711111111',
      role: 'SchoolAdmin',
      workplace: 'Example School',
    }),
  },
)

const result = await response.json()

if (!response.ok) {
  throw new Error(result.message || 'The staff invitation failed')
}

console.log(result)
```

After inviting, use these reads to confirm the data:

```text
GET /api/Teacher
GET /api/Teacher/invited-teachers
GET /api/Teacher/school-admins
GET /api/SchoolAdmin
```

All of these are protected and require the bearer token.

### 12–14 minutes: Show the reusable frontend pattern

The integration should have one shared API client. Each feature then supplies only the endpoint, query parameters, and body.

```js
async function apiRequest(path, options = {}) {
  const response = await fetch(`https://api.antodb.com${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const data = await response.json().catch(() => null)

  if (response.status === 401) {
    // Clear the session and send the user back to login.
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed: ${response.status}`)
  }

  return data
}
```

Then the staff feature becomes small and readable:

```js
const invited = await apiRequest(
  '/api/Teacher/invited-teachers?api-version=1.0',
)
```

If she is using TypeScript, recommend generating types from the OpenAPI JSON instead of manually typing every endpoint response.

### 14–15 minutes: Recap and troubleshoot

Ask her to repeat the sequence:

```text
1. Read the endpoint in Swagger UI.
2. Build the URL: host + path + api-version.
3. Select the HTTP method.
4. Add JSON body for POST/PUT.
5. Add the bearer token for protected endpoints.
6. Inspect status code and response body.
7. Update the UI only after the request succeeds.
```

## Common mistakes to call out

| Symptom | Likely cause | Check |
| --- | --- | --- |
| 404 | Wrong path or duplicated `/api` | Use `https://api.antodb.com` plus the documented path |
| 401 | Missing, expired, or malformed token | `Authorization: Bearer <token>` |
| 400 | Invalid body or missing expected values | Compare JSON keys and types with Swagger |
| CORS error | Browser is calling the API directly without server configuration | Use the app's backend proxy or configure the API server's allowed origin |
| Empty list | Wrong account/role or no records | Confirm the logged-in user and query parameters |
| Request never appears | Frontend handler is not being called | Check browser Network and Console tabs |

## Live demo checklist

- Have a valid test account ready; do not use production credentials on screen.
- Open the Swagger UI and expand `Auth` and `Teacher`/`SchoolAdmin`.
- Login and copy the token only into the temporary Swagger authorization field or Postman environment.
- Run one read request first, such as `GET /api/Teacher`.
- Run one invite request only if the backend team confirms it is safe in the test environment.
- Confirm the response status and body before explaining how the UI should update.
- Remove the token from the screen after the demo.

## Important documentation questions for the API owner

The current document does not fully specify these details, so confirm them during the session:

- Which exact login response field contains the token?
- Which roles are accepted for teacher and school-admin invitations?
- Which invitation fields are truly required even though OpenAPI marks them optional?
- What are the standard 400/401/403 response shapes?
- Is the frontend expected to call `api.antodb.com` directly, or through a project backend/proxy?
- What is the expected invitation acceptance flow after the email is sent?
