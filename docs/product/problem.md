# Student onboarding and authentication error problem

## Problem

A user can complete registration and receive a valid Student dashboard value, but the backend may still return `isProfileComplete: false`. The frontend correctly prevents dashboard access, but the user receives a repeated completion screen without knowing which backend requirement remains.

Authentication and registration failures also frequently surface as generic messages. This hides actionable cases such as an existing email, invalid password policy, unverified email, expired session, rate limiting, or backend validation errors.

## User impact

- Users cannot tell whether registration succeeded, failed, or is waiting for backend completion.
- Users may repeatedly submit the same profile information.
- Users cannot correct duplicate-email or password-validation errors efficiently.
- Support and QA cannot distinguish frontend parsing failures from backend business-rule failures.

## Goal

Provide a truthful, actionable onboarding and authentication experience while preserving backend authority:

- Do not route incomplete users into a dashboard.
- Explain missing or unresolved completion requirements when the API provides them.
- Preserve safe, useful backend messages without exposing internals or sensitive data.
- Keep password and token data out of client persistence and user-visible diagnostics.

