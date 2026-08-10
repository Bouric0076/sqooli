# Sqooli landing styles

Styles are grouped by responsibility so page code stays focused on structure and behavior.

## Directories

- `pages/landing/` — landing, partners, contact, popular, and question-board page styles.
- `pages/schools.css` — shared school, school profile, timetable, course, and tutor page styles.
- `pages/search.css` — shared search, controls, cards, and booking styles used across discovery pages.
- `responsive/` — cross-page responsive overrides. Keep breakpoint-only rules here when they affect multiple pages.
- `components/` — styles owned by reusable standalone components such as modals.

## Import conventions

Import a page stylesheet from the page component that owns the page. Shared styles used by multiple routes belong in `pages/`, while reusable component styles belong in `components/`. Keep global landing cascade imports in `App.tsx` so their order remains predictable.
