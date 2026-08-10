# Sqooli landing page

An isolated, responsive Vite + React + TypeScript implementation of the Sqooli public-facing experience.
It is currently design-first: routes, local interactions, empty states and responsive layouts are
represented locally while backend and authentication integrations remain out of scope.

## Project shape

- `src/main.tsx` — pathname routing and route-level lazy loading.
- `src/pages/` — page components grouped by product area.
- `src/components/` — reusable UI, layout and modal components.
- `src/styles/pages/` — page-specific styles.
- `src/styles/components/` — shared component styles, including loading and modal states.
- `src/styles/responsive/` — shared responsive overrides.
- `src/assets/images/` — local images used by the experience and design references.

The initial bundle shows a branded loading state while a route chunk is fetched. Page-entry motion
honours `prefers-reduced-motion` for a comfortable and accessible experience.

## Run locally

```bash
npm ci
npm run dev
```

## Validate

```bash
npm run lint
npm run build
git diff --check
```
