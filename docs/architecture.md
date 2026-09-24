# Architecture
## Smart ATM Operations & Monitoring Platform

**Version:** 1.0
**Last Updated:** Phase 1

---

## 1. High-Level Architecture

**Current (frontend prototype):**

React Frontend (Pages → Components → Hooks → Context)
    ↓
Service Layer (atmService, alertService, monitoringService, ...)
    ↓
apiClient (mock — simulated latency + optional error injection)
    ↓
Mock Data (src/data/*.js)

simulationService (timer-driven event bus)
    └──▶ emits events to subscribed hooks

**Future (target) architecture:**

React
    ↓
REST API
    ↓
Backend (Node / NestJS)
    ↓
PostgreSQL (persistence) + Redis (live state cache)
    ↓
Monitoring Workers
    ↓
WebSocket Channel
    ↓
ATM Infrastructure

---

## 2. Frontend Architecture

- **Pages** compose features; no business logic beyond orchestration.
- **Components** are presentational or containerized; reusable primitives live in `common/`.
- **Hooks** encapsulate stateful logic (data fetching, subscriptions, filters).
- **Contexts** carry cross-cutting concerns (Auth, Theme, Simulation, Notifications).
- **Services** are the sole data-access boundary.
- **Utils** are pure functions with no React dependency.

Rule: **Pages → Hooks → Services → Data.** Components never import from `data/` directly.

---

## 3. Component Architecture

DashboardLayout wraps:
- Sidebar
- Topbar (GlobalSearch, ThemeToggle, NotificationsPanel)
- Routes → Page
    - Common primitives
    - Domain components
- ToastContainer

Component layers:
1. **Primitives** (`common/`) — Button, Card, Badge, Modal, Table.
2. **Layout** (`layout/`) — Sidebar, Topbar, GlobalSearch.
3. **Domain** (`atm/`, `alerts/`, `incidents/`, …) — composed widgets.
4. **Pages** — route-level composition.

---

## 4. Data Architecture

- `data/` holds **static seeds** (arrays of objects).
- `apiClient.js` wraps access with simulated async (`setTimeout`) and optional error injection.
- Services expose typed-shaped functions: `getAtms(filters)`, `getAtmById(id)`.
- State lives in hooks/context — never in `data/` files.

---

## 5. Service Layer

| Service | Responsibility |
|---|---|
| `apiClient` | Simulated latency, error injection, future fetch swap |
| `atmService` | ATM CRUD + filtered queries |
| `monitoringService` | Device + connectivity probes (simulated) |
| `alertService` | Alert lifecycle (create, ack, assign, resolve) |
| `incidentService` | Incident lifecycle + comments |
| `cashService` | Cassette levels + replenishment |
| `transactionService` | Aggregations + lists |
| `authService` | Fake login, session, role resolution |
| `simulationService` | Timed event bus for live updates |

---

## 6. State Management

- **Local state:** `useState` for UI-only concerns.
- **Feature state:** custom hooks (`useAlerts`, `useATMStatus`).
- **Global state:** React Context for Auth, Theme, Simulation, Notifications.
- **Persistence:** `useLocalStorage` hook for auth token, theme, filters.
- **No Redux/Zustand** — complexity not justified at this scale.

---

## 7. Routing

- React Router v6.
- `AppRoutes.jsx` declares top-level routes.
- `ProtectedRoute.jsx` enforces auth + role checks via `permissions.js`.
- `DashboardLayout` wraps authenticated pages; `AuthLayout` wraps login.
- Unknown routes → `NotFound.jsx`.

Route map:
```
/login → Login (AuthLayout)
/ → Dashboard
/atms → ATMs
/atms/:id → ATMDetails
/devices → Devices
/alerts → Alerts
/incidents → Incidents
/maintenance → Maintenance
/cash → CashManagement
/transactions → Transactions
/map → Map
/reports → Reports
/users → Users (admin only)
/settings → Settings
*      → NotFound
```

---

## 8. Mock API Strategy

- `apiClient.js` exposes `get`, `post`, `patch`, `del` returning Promises.
- Each call: `await delay(150–400ms)` → resolve from `data/`.
- Optional failure mode toggled via context for QA of error states.
- Swap target: replace internals with `fetch` and keep same signatures.

---

## 9. Real-Time Simulation

- `simulationService` runs a `setInterval` (default 5s, configurable).
- Emits events: `atm:health`, `atm:status`, `atm:cash`, `alert:new`.
- Hooks subscribe via `simulationService.subscribe(event, cb)`.
- `SimulationContext` exposes ON/OFF and interval.
- Rules:
  - Health drifts ±1–3 within [0, 100].
  - Status flips only if health crosses thresholds.
  - Cash decreases slowly; replenishment resets to 90%+.
  - New alerts only when status degrades.
- **Never chaotic.** Rates are tuned so 1–2 changes occur per tick, not dozens.

---

## 10. Authentication Strategy

- Simulated via `authService.login(email, password)` → returns `{ user, token }`.
- Preset accounts (Admin / Ops Manager / Technician / Viewer).
- Session persisted to LocalStorage under `satm.session`.
- On boot, `AuthContext` rehydrates session.
- No real security — clearly documented as simulated.

---

## 11. Role-Based Access

- `permissions.js` maps `role → allowedRoutes[]` and `role → allowedActions[]`.
- `ProtectedRoute` checks route access.
- Components conditionally render actions (`<Button disabled={!can('resolve-alert')} />`).
- Single source of truth — no scattered role checks.

---

## 12. Error Handling

- `apiClient` supports failure injection.
- Hooks expose `{ data, loading, error }`.
- Pages render `<ErrorState />` on error, `<Skeleton />` on load, `<EmptyState />` on empty.
- Global error boundary (future) — not required in Phase 1.
- Toasts for user-initiated action failures.

---

## 13. Performance

- Route-level code splitting via `React.lazy` (Phase 16 polish).
- Virtualization only if lists exceed 200 rows (probably unnecessary).
- Memoize heavy chart data via `useMemo`.
- Debounce search input (300ms) via `useDebounce`.
- Avoid re-render storms during simulation: subscribe per-hook, not per-component.

---

## 14. Security

- **No real security claims.**
- No secrets in client.
- No real banking data.
- Simulated auth only.
- `.env.example` documents future API vars.

---

## 15. Future Backend Architecture

React
    ↓
API Gateway (REST + WS)
    ↓
Auth Service (JWT)
    ↓
Core Services (ATM, Alerts, Incidents)
    ↓
PostgreSQL (persistence) + Redis (live cache)
    ↓
Monitoring Workers (poller / SNMP / agent)
    ↓
ATM Infrastructure

Technologies under consideration: Node.js (NestJS or Express), PostgreSQL, Redis, WebSocket (Socket.IO or native), Docker.

---

## 16. Future WebSocket Architecture

- Channel: `/ws/atm-events`.
- Message types: `atm.health`, `atm.status`, `atm.cash`, `alert.created`, `incident.updated`.
- Client: single WS connection in `simulationService` (renamed `realtimeService`).
- Same event names as current mock bus → minimal UI changes.

---

*End of Architecture.*