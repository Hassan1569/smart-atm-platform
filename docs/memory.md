# Project Memory
## Smart ATM Operations & Monitoring Platform

**Purpose:** Persistent context across phases. Only update relevant sections — do not rewrite the whole file.

**Last Updated:** Phase 1 (Documentation)

---

## Current State

- **Current Phase:** 1 — Documentation ✅ complete
- **Current Task:** Awaiting user approval to proceed to Phase 2 (Project Setup)
- **Next Task:** T2.1 `package.json`

---

## Completed Features

- Phase 0: Folder & file structure approved
- Phase 1: All seven docs written (`prd.md`, `architecture.md`, `rules.md`, `design.md`, `tasks.md`, `memory.md`, `README.md`)

---

## Architecture Decisions

| # | Decision | Rationale | Date |
|---|---|---|---|
| AD-01 | Frontend-only prototype, no backend | Scope control; portfolio focus | Phase 0 |
| AD-02 | React Context for global state (no Redux/Zustand) | Scale doesn't justify external store | Phase 0 |
| AD-03 | Services are the only data boundary | Enables future API swap without touching components | Phase 0 |
| AD-04 | Simulation as a service + context, not per-component timers | Prevents render storms; single source of truth | Phase 0 |
| AD-05 | Dark mode via `class` strategy on `<html>` | Tailwind standard; easy persistence | Phase 1 |
| AD-06 | Centralized RBAC in `permissions.js` | Avoid scattered role checks | Phase 1 |
| AD-07 | `apiClient.js` as the simulated-latency boundary | Single swap target for real fetch | Phase 0 |
| AD-08 | Status colors in `statusColors.js` (single source) | Consistency across all modules | Phase 1 |
| AD-09 | No real ICMP/SNMP/TCP — all connectivity simulated | Browser security + truthfulness rule | Phase 0 |
| AD-10 | Leaflet + OpenStreetMap for map | Free, no API key, well-supported | Phase 1 |

---

## Important Technical Decisions

- **Naming:** `.jsx` for components, `.js` for pure logic.
- **Folder casing:** lowercase for folders, PascalCase for component files.
- **Line target:** < 300 lines per file; split when exceeded.
- **Response format:** Standard completed-block (see `rules.md` §G).
- **Token efficiency:** Never dump unchanged files; only show diffs/relevant snippets.

---

## Components Created

*(none yet — Phase 3 onward)*

---

## Dependencies

**Planned runtime:**
- react
- react-dom
- react-router-dom
- recharts
- lucide-react
- leaflet
- react-leaflet
- framer-motion

**Planned dev:**
- vite
- @vitejs/plugin-react
- tailwindcss
- postcss
- autoprefixer

*(Not yet installed — Phase 2)*

---

## Known Bugs

*(none — no code yet)*

---

## Known Limitations

- All data is fictional and resets on refresh unless persisted to LocalStorage.
- Simulation is rule-based, not statistically realistic.
- Auth is simulated — not secure.
- No backend → no cross-device sync.
- No real ICMP — connectivity is mocked.

---

## Pending Work

- Phase 2 through Phase 17 (see `tasks.md`).

---

## Future Improvements

- Replace `apiClient` internals with real REST.
- Replace `simulationService` with WebSocket subscriber.
- Add backend (NestJS + PostgreSQL + Redis).
- Add automated tests (Vitest + React Testing Library).
- Add E2E tests (Playwright).
- Add i18n (English + Urdu) for regional realism.
- Add PDF export for reports.

---

## Important Assumptions

- User is running Node ≥ 18.
- User has `npm` available.
- Target browsers: latest Chrome / Firefox / Safari / Edge.
- No SSR required.
- No PWA required (optional later).
- Single-tenant (no multi-org support).

---

## Phase Log

| Phase | Status | Notes |
|---|---|---|
| 0 | ✅ | Structure approved |
| 1 | ✅ | Docs written |
| 2 | ⏳ | Awaiting go-ahead |

---

*End of memory.md*