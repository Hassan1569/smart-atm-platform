# Smart ATM Operations & Monitoring Platform

> A professional ATM Operations & Monitoring Command Center for an enterprise IT operations team — built as a frontend prototype with mock data and simulated real-time events.

![Status](https://img.shields.io/badge/status-complete-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Made with React](https://img.shields.io/badge/React-18-61dafb)
![Built with Vite](https://img.shields.io/badge/Vite-5-646cff)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

---

## Overview

This project simulates an enterprise-grade ATM monitoring platform. It presents a fleet of ATMs with device health, connectivity status, cash levels, alerts, incidents, maintenance workflows, and transaction volume — all driven by mock data and a controllable real-time simulation engine.

**It is not** a generic admin dashboard.
**It is** an IT Operations Command Center UI.

> ⚠️ **Truthfulness note:** This is a frontend prototype. It does **not** connect to real ATMs, banks, or payment systems. All data is fictional. All connectivity (ping/latency) is simulated.

---
> **Built by Hassan** — a portfolio project demonstrating enterprise React architecture, IT operations workflows, and real-time UI patterns.

---

## Features

### Monitoring
- **Dashboard** — fleet KPIs, status distribution, health, cash, transaction volume, recent activity
- **ATM Management** — searchable, filterable, sortable, paginated ATM fleet table
- **ATM Details** — overview, identity, system health grid, device groups, connectivity probe
- **Device Monitoring** — card reader, PIN pad, printer, dispenser, acceptor, camera, door sensor, cassettes, controller, network, host, security service, monitoring agent
- **Connectivity** — simulated ping, latency, packet loss, sparkline, last online
- **ATM Map** — Leaflet + OpenStreetMap with status-colored markers and popups

### Operations
- **Alerts** — Critical / Warning / Info with full lifecycle (Detected → Ack → Assign → Investigate → Resolve), timeline, and drawer view
- **Incidents** — priority, technician assignment, timeline, comments, resolution notes
- **Maintenance** — scheduled / in-progress / completed / cancelled with tabs, filters, and history
- **Cash Management** — cassettes, utilization, replenishment history
- **Transactions** — volume, success rate, type breakdown, hourly trends, top ATMs
- **Reports** — 8 report types with filters and print/export layout

### Platform
- **Authentication** (simulated) with 4 roles: Admin, Operations Manager, Technician, Viewer
- **Role-Based Access Control** enforced across routes and sidebar nav
- **Real-Time Simulation** toggle with adjustable interval (3s–30s) that mutates ATM health, cash, status; generates alerts; updates activity feed
- **Notification Center** — slide-over panel with unread badge, severity icons, mark-all-read, dismiss
- **Toast System** — ephemeral notifications for critical/warning alerts
- **Global Search** placeholder (topbar)
- **Dark / Light Mode** with system preference detection and persistence
- **Responsive** from 320px to 1920px
- **Accessibility** — keyboard nav, focus states, ARIA, semantic HTML, skip-to-content, error boundary

---

## Screenshots

> Placeholder — replace with real screenshots of your deployed app.

| Dashboard | ATM Details | Alerts Workflow |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

| ATM Map | Cash Management | Reports |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

**Recommended**: Run the app, use browser screenshot tools, save to `docs/screenshots/` and update the table above.

---

## Technology Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build | Vite 5 |
| Language | JavaScript (ES2022) |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| Charts | Recharts |
| Icons | Lucide React |
| Map | Leaflet + React Leaflet + OpenStreetMap |
| Animation | Framer Motion (used sparingly) |
| State | React Context + custom hooks |
| Persistence | LocalStorage |
| Data | Mock (in `src/data/`) |
| Backend | **None** (future roadmap) |

---

## Architecture

```
React (Pages → Components → Hooks → Context)
    ↓
Service Layer (atmService, alertService, ...)
    ↓
apiClient (simulated latency)
    ↓
Mock Data (src/data/*.js)

simulationService (timer-driven event bus)
    └──▶ emits events to subscribed hooks
```

Full details: [`docs/architecture.md`](docs/architecture.md).

---

## Installation

**Requirements:** Node.js ≥ 18, npm ≥ 9.

```bash
git clone <your-repo-url>
cd smart-atm-platform
npm install
```

---

## Development Commands

```bash
npm run dev       # start Vite dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

---

## Folder Structure

```
smart-atm-platform/
├── docs/                       # PRD, architecture, rules, design, tasks, memory
├── public/                     # static assets (favicon)
├── src/
│   ├── components/             # common, layout, domain widgets
│   ├── context/                # Auth, Theme, Simulation, Notifications, Toast
│   ├── data/                   # mock datasets (ATMs, alerts, incidents, cash, etc.)
│   ├── hooks/                  # reusable stateful logic
│   ├── layouts/                # DashboardLayout, AuthLayout
│   ├── pages/                  # route-level components
│   ├── routes/                 # AppRoutes, ProtectedRoute
│   ├── services/               # data access + business ops
│   ├── styles/                 # Tailwind entry + global CSS
│   ├── utils/                  # constants, formatters, helpers, permissions
│   ├── App.jsx
│   └── main.jsx
├── LICENSE
├── README.md
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Mock Data Explanation

- All datasets live in `src/data/`.
- Components **never** import from `data/` directly — they go through `src/services/`.
- `src/services/apiClient.js` wraps access with simulated latency (120–320ms) and optional error injection.
- `src/services/simulationService.js` publishes events on a timer; hooks subscribe and mutate their state.

**Preset login accounts:**

| Role | Email | Password |
|---|---|---|
| Admin | admin@satm.local | admin123 |
| Operations Manager | ops@satm.local | ops123 |
| Technician | tech@satm.local | tech123 |
| Viewer | viewer@satm.local | viewer123 |

---

## Role Permissions

| Module | Admin | Ops Manager | Technician | Viewer |
|---|---|---|---|---|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| ATMs | ✅ | ✅ | ✅ | ✅ |
| Devices | ✅ | ✅ | ✅ | ✅ |
| Alerts | ✅ | ✅ | ✅ | 👁 |
| Incidents | ✅ | ✅ | ✅ | 👁 |
| Maintenance | ✅ | ✅ | ✅ | 👁 |
| Cash | ✅ | ❌ | ❌ | 👁 |
| Transactions | ✅ | ❌ | ❌ | 👁 |
| Map | ✅ | ✅ | ✅ | ✅ |
| Reports | ✅ | ✅ | ❌ | ✅ |
| Users | ✅ | ❌ | ❌ | ❌ |
| Settings | ✅ | ✅ | ❌ | ❌ |

✅ full access · 👁 read-only · ❌ no access

---

## Real-Time Simulation

Toggle it in the topbar. When enabled:
- ATM health drifts ±1–3 per tick
- Status flips when health crosses thresholds
- Cash slowly depletes (rare replenishment events)
- New alerts generated ~20% of ticks (critical/warning trigger toasts)
- Activity feed grows
- Notifications panel gets entries
- Interval adjustable in **Settings** (3s / 5s / 10s / 30s)

**Simulation is rule-based and intentionally non-chaotic** — 1–3 changes per tick.

---

## Limitations

- ❌ No real ATM, bank, or payment integration.
- ❌ No real ICMP/SNMP connectivity probes.
- ❌ No backend — all data is client-side.
- ❌ No real authentication — simulated only.
- ❌ Session persists in LocalStorage but alert/incident mutations reset on refresh.
- ❌ No automated tests.
- ❌ No multi-tenant / multi-org support.
- ❌ No i18n (English only).

---

## Future Roadmap

- **Backend** — Node.js (NestJS) + PostgreSQL + Redis
- **Real-time** — WebSocket channel replaces `simulationService`
- **Auth** — JWT/OAuth with real user management
- **Monitoring workers** — real ICMP/SNMP pollers behind the API
- **Testing** — Vitest + React Testing Library + Playwright
- **i18n** — English + Urdu
- **Export** — PDF reports via server-side rendering
- **Global search** — full-text across ATMs, alerts, incidents

Full historical roadmap: [`docs/tasks.md`](docs/tasks.md).

---

## Documentation

| Doc | Purpose |
|---|---|
| [`docs/prd.md`](docs/prd.md) | Product requirements |
| [`docs/architecture.md`](docs/architecture.md) | System architecture |
| [`docs/rules.md`](docs/rules.md) | Project constitution |
| [`docs/design.md`](docs/design.md) | Design system |
| [`docs/tasks.md`](docs/tasks.md) | Phased roadmap |
| [`docs/memory.md`](docs/memory.md) | Persistent context |

---
## Author

**Hassan**

- Portfolio project — 2026
- If you fork, reuse, or learn from this project, please keep this attribution intact.

---

## License

MIT — see [LICENSE](LICENSE).

Copyright (c) 2026 **Hassan**. Please retain the copyright notice and this attribution if you reuse or redistribute any part of this project.

**Important:** This is a frontend prototype for educational and portfolio purposes. Not for production or safety-critical use.

## Acknowledgements

- OpenStreetMap contributors for map tiles
- Lucide for the icon set
- Recharts for charting primitives
- Tailwind CSS team
- Vite team

---

*End of README.*