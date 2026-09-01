# Main landing page API audit

Source reviewed: `sqooli-landing/src/pages/landing/LandingPage.tsx` and the imported backend guide in `docs/backend-api/sqooli-v1-api/`.

## Live-site verification

Checked on 20 August 2026:

- `https://sqooli.africa` responds with HTTP 200 and exposes Home, Schools, Partners, Contact Us, Login, and Get Started navigation.
- The live homepage contains static hero metrics and popular-content UI; it is not a reliable source for backend behavior.
- The visible contact path is primarily a WhatsApp link; no structured contact form was confirmed in the homepage HTML.
- `https://sqooli.africa/login` responds with HTTP 200 and contains email/password login controls, but its payload also includes Next.js 404 fallback data. It should not be treated as a clean reference implementation.
- The live site exposes fewer public landing surfaces than the current client design.

Conclusion: use the local client and backend contract as the implementation source of truth. Keep the live-site observations in this report only as context for the backend/product clarification conversation.

## Findings

| Landing-page feature | Current behavior | API fit | Decision |
| --- | --- | --- | --- |
| Hero “Find Lessons” | Navigates to `/search` | `GET /api/Lesson` exists with `page`, `pageSize`, and `search` | Wire the search page first; keep the hero as navigation. |
| Popular Classes | Hardcoded class card and local carousel | `GET /api/Lesson` exists | Replace demo card data with a small public/authorized lesson query once visibility rules are confirmed. |
| Popular Tutors | Hardcoded Jane Doe card | `GET /api/Teacher` exists | Wire to teacher query after confirming whether public access is allowed. |
| Popular Questions | Hardcoded question cards | Only `GET /api/questions/topic/{topicId}` is documented; no general question-list/search endpoint | Backend gap: request public question listing/search or define topic IDs and a discovery flow. |
| Popular Programs | Hardcoded values and external UDBC links | `GET /api/CPrograms`, `GET /api/Programs` exist, but UDBC content may be a separate product | Confirm ownership and source before connecting. |
| Popular Enrolments | Hardcoded UDBC intake card | No clear Sqooli enrolment-list endpoint | Keep as campaign content until backend/product confirms a source. |
| Save card | Shows “Saved to your list” only | No bookmark/save endpoint found | Backend gap or remove the action from the public landing page. |
| Share card | Shows “Share link copied” only; no clipboard operation | No share endpoint needed if using Web Share/clipboard, but current code does not copy | Implement browser share/copy locally with a real URL and feedback. |
| Ongoing/upcoming programs | Hardcoded UDBC/program content | Program endpoints exist, but the displayed content is not clearly represented by the contract | Keep static until a canonical program response is agreed. |
| School listings search | Filters one hardcoded school locally | `GET /api/schools/my-schools` and `GET /api/schools/{id}` exist; no clear public all-schools endpoint | Backend gap: request a public school discovery/list endpoint. |
| School “View Lessons” / “View Tutors” | Navigates to placeholder routes | Lesson and Teacher endpoints exist | Wire destination pages after adding route query/ID parameters and API hooks. |
| Notifications subscription | Clears form and shows success locally | `POST /api/email/send` is not a safe substitute for newsletter subscription | Backend gap: request a subscription endpoint or approved integration. |
| FAQ | Static expandable content | No API required | Keep local. |
| Question Board search | Navigates to `/questions?q=...` | No general search endpoint; topic endpoint requires `topicId` | Add backend question search/list endpoint or implement topic lookup plus topic filtering. |
| Contact form | Explicitly says message is not sent or saved | `POST /api/email/send` exists but its intended authorization/payload is unclear | Confirm a public contact-message endpoint and wire only after payload/security is approved. |
| Join/Get Started | Navigates to onboarding | Auth registration flow exists | Keep navigation; wire onboarding registration next. |
| Hero metrics | Hardcoded `12K+`, `2K+`, `5K+` | No aggregate/public metrics endpoint identified | Keep static or request a public metrics endpoint; do not derive counts from paginated lists. |

## What should be wired first

1. Hero/search → lesson discovery.
2. Student/parent registration and login → dashboard redirect using `user.dashboard`.
3. Public or authorized lesson listing.
4. Public tutor listing if backend permits it.
5. Parent dashboard → `GET /api/LessonBooking`.
6. Contact and notification flows after backend confirms dedicated endpoints.

## Landing-page backend requests

Ask the backend team to confirm or add:

- public lesson discovery and visibility rules;
- public tutor discovery and visibility rules;
- public school listing/search;
- public question listing/search;
- newsletter/notification subscription;
- public contact-message submission;
- bookmark/save behavior, if the feature is required;
- public aggregate metrics, if the hero numbers must be live.

## Staged implementation and package installation

### Stage 1: foundation

```bash
npm install @reduxjs/toolkit react-redux react-router-dom react-hook-form @hookform/resolvers zod sonner date-fns
```

Implement environment parsing, API base query, auth slice, RTK Query API slice, route protection, error normalization, and form schemas.

### Stage 2: type and test safety

```bash
npm install -D openapi-typescript vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event msw
```

Generate types only for the parts of the OpenAPI contract whose responses are sufficiently described. Add tests for auth, route redirects, API envelopes, landing search, and error states.

### Stage 3: browser acceptance coverage

```bash
npm install -D @playwright/test
npx playwright install chromium
```

Cover login, dashboard redirect by `user.dashboard`, lesson discovery, parent bookings, and contact/subscription flows once their endpoints are confirmed.

### Add only when needed

- `dompurify` before rendering user/backend HTML such as question or lesson descriptions.
- `react-error-boundary` around route-level dashboard areas.
- `@tanstack/react-virtual` for large school/student/teacher tables.
- `@sentry/react` after privacy and production observability decisions.
- Radix UI or React Aria if custom menus, dialogs, tabs, and comboboxes need accessible primitives.
- Uppy if backend file uploads require resumable uploads or progress management.
