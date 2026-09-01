# ADR-001: Dashboard access while backend profile completion remains false

Date: 27 August 2026  
Status: Accepted for frontend implementation  
Scope: Student onboarding and dashboard routing

## Context

The live backend accepts `POST /api/Auth/register/complete` and assigns the account a valid role and dashboard, but it can continue returning `isProfileComplete: false` and `studentEnrollment: null`. The current frontend treats that flag as an unconditional dashboard block, creating a completion loop. The backend has not yet clarified the exact completion requirements or supplied Student-accessible enrollment reference data.

## Decision

The frontend will use the backend `dashboard` value and non-pending role as the routing authority after successful authentication. `isProfileComplete` will remain an explicit setup state, not an unconditional route block, when the backend has assigned a valid dashboard.

An incomplete authenticated Student will:

- enter the Student dashboard;
- see a persistent, truthful setup/enrollment notice;
- retain access only to features supported by the current backend session;
- receive a clear pending-enrollment state when a feature requires unavailable enrollment data;
- be able to return to profile completion without entering a redirect loop.

An account with a pending/unknown role or unsafe dashboard value will remain in onboarding or go to the safe forbidden state. The frontend will never manufacture a dashboard, role, enrollment, or `isProfileComplete:true` value.

The frontend will retain the authenticated token after completion and will not store or reuse passwords. A 401 still clears the session and redirects to Sign In.

## Consequences

This allows users whose backend role/dashboard is usable to reach the correct product shell while backend enrollment completion is pending. Feature-level API authorization remains authoritative, so incomplete or forbidden operations must show a pending/permission state rather than fake data.

The backend questions about completion rules, refresh tokens, logout revocation, current-user consistency, and validation contracts remain deferred. They must be revisited when backend updates arrive.

## Reversal

If the backend starts rejecting dashboard access for incomplete users or provides a reliable completion contract, restore a strict completion guard and replace the compatibility notice with the authoritative backend requirements.
