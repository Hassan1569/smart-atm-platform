# Product Requirements Document (PRD)
## Smart ATM Operations & Monitoring Platform

**Version:** 1.0
**Status:** Active
**Owner:** Project Lead
**Last Updated:** Phase 1

---

## 1. Product Overview

The Smart ATM Operations & Monitoring Platform is a **frontend-only prototype** of an enterprise-grade IT operations command center for managing a fleet of ATMs. It simulates real-world ATM monitoring: device health, connectivity, cash levels, alerts, incidents, maintenance, and transaction volume — all driven by mock data and a controllable real-time simulation engine.

**Tagline:** A professional ATM Operations & Monitoring Command Center for an enterprise IT operations team.

---

## 2. Problem Statement

Bank IT operations teams today need a single pane of glass to monitor hundreds of ATMs across regions. Real systems are expensive, closed-source, and backend-heavy. This project demonstrates how a modern React frontend can present ATM operations data with clarity, density, and interactivity — without requiring real banking infrastructure.

---

## 3. Target Users

| User | Description | Primary Needs |
|---|---|---|
| **Admin** | Platform administrator | Full access, user management, settings |
| **Operations Manager** | Oversees ATM fleet health | Dashboard, alerts, incidents, reports |
| **Technician** | Field/remote maintenance staff | Assigned ATMs, tickets, device status |
| **Viewer** | Stakeholder / auditor | Read-only access to dashboards and reports |

---

## 4. Business Goals

- Demonstrate enterprise frontend architecture.
- Showcase IT operations workflows (alerts → incidents → resolution).
- Provide a portfolio-quality reference for real-time monitoring UIs.
- Remain backend-ready for future API/WebSocket integration.

## 5. Product Goals

- Deliver a coherent, information-dense command center.
- Support role-based views and permissions.
- Simulate realistic live changes without chaos.
- Keep the codebase modular, documented, and maintainable.

---

## 6. Functional Requirements

### FR-1 Dashboard
- Show KPIs: total/online/offline/warning ATMs, critical alerts, low cash, open incidents, transaction volume, network health.
- Charts: ATM status distribution, health, cash, transaction volume.
- Panels: recent alerts, recent incidents, activity feed, operational summary.

### FR-2 ATM Management
- Table with search, filter (status, bank, vendor, location, health, cash), sort, pagination.
- Each ATM: ID, location, bank, vendor, model, type, IP, status, health, cash, network, last seen, install date, last maintenance, software/firmware version.
- Row click → ATM Details.

### FR-3 ATM Details
- Overview (identity, location, vendor, model, status, health, last comm).
- System Health grid with per-component status, health %, last checked, error info.

### FR-4 Device Monitoring
- Groups: ATM (card reader, PIN pad, printer, dispenser, acceptor, camera, door sensor), Cash Recycler (cassettes 1–3, reject, in/out modules), Network/System (controller, network, host, security service, monitoring agent).

### FR-5 Connectivity Monitoring
- Simulated ping status, latency, packet loss, IP, last check, last online.
- Backed by a service abstraction (no real ICMP).

### FR-6 Alert Management
- Severities: Critical, Warning, Info.
- Fields: ID, ATM, severity, message, created, status, assignee, acknowledged, resolved.
- Workflow: Detected → Created → Acknowledged → Assigned → Investigating → Resolved.

### FR-7 Incident & Maintenance
- Incident fields: ID, ATM, issue, priority, technician, status, timeline, comments, resolution notes.
- Workflow: Detected → Alert → Assignment → Investigation → Repair → Testing → Resolved.

### FR-8 Cash Management
- Total/available cash, utilization, cassette levels, low-cash alerts, replenishment history, last/next replenishment.

### FR-9 Transaction Monitoring
- Total transactions, withdrawals, deposits, balance inquiries, failed, success rate, hourly volume, ATM-wise volume.

### FR-10 ATM Map
- Leaflet + OpenStreetMap. Markers by status (online/warning/offline/critical). Popup shows ID, location, status, cash, health, last seen.

### FR-11 Reports
- Daily ATM, availability, device health, alert, incident, cash, transaction, maintenance.
- Filters: date, ATM, location, status. Export-ready layout.

### FR-12 User Roles
- Admin, Operations Manager, Technician, Viewer. LocalStorage-simulated auth.

### FR-13 Real-Time Simulation
- Toggle ON/OFF. Updates dashboard, ATM table, alerts, activity feed, notifications, timestamps at sensible intervals.

### FR-14 Global Search
- Search ATM ID, incident ID, alert ID, location, device, technician → quick navigation.

### FR-15 UI/UX
- Dark/light mode, responsive sidebar, topbar, notifications, status indicators, charts, tables, filters, modals, toasts, skeleton loading, empty/error states, confirmation dialogs.

---

## 7. Non-Functional Requirements

- **Performance:** First meaningful paint < 1.5s on mid-tier laptop; interactions < 100ms.
- **Responsiveness:** Usable at 320px–1920px.
- **Accessibility:** WCAG 2.1 AA targets — keyboard nav, focus states, labels, semantic HTML, contrast.
- **Maintainability:** Modular components, no file > 300 lines, services decoupled from UI.
- **Documentation:** Docs updated every phase.
- **Portability:** Runs with `npm install && npm run dev`. No backend required.
- **Token efficiency:** Incremental development; no full-project dumps.

---

## 8. Modules

1. Dashboard
2. ATM Management
3. ATM Details
4. Device Monitoring
5. Connectivity Monitoring
6. Alert Management
7. Incident & Maintenance
8. Cash Management
9. Transaction Monitoring
10. ATM Map
11. Reports
12. Users & Settings
13. Authentication & Roles
14. Real-Time Simulation
15. Global Search

---

## 9. User Roles & Permissions

| Module | Admin | Ops Manager | Technician | Viewer |
|---|---|---|---|---|
| Dashboard | ✅ | ✅ | ✅ (assigned only) | ✅ |
| ATMs | ✅ | ✅ | ✅ (assigned) | ✅ |
| Alerts | ✅ | ✅ | ✅ (assigned) | 👁 |
| Incidents | ✅ | ✅ | ✅ (assigned) | 👁 |
| Maintenance | ✅ | ✅ | ✅ | 👁 |
| Cash | ✅ | ✅ | ❌ | 👁 |
| Transactions | ✅ | ✅ | ❌ | 👁 |
| Map | ✅ | ✅ | ✅ | ✅ |
| Reports | ✅ | ✅ | ❌ | ✅ |
| Users | ✅ | ❌ | ❌ | ❌ |
| Settings | ✅ | ✅ | ❌ | ❌ |

✅ full · 👁 read-only · ❌ no access

---

## 10. User Journeys

**Ops Manager — morning check**
Login → Dashboard → scan KPIs → drill into critical alert → open related incident → assign technician.

**Technician — daily work**
Login → filtered ATM list (assigned) → open ATM → inspect device health → resolve incident → add resolution notes.

**Admin — weekly review**
Login → Reports → pick availability report → filter date range → review → export layout.

**Viewer — audit**
Login → Dashboard → ATMs → read-only drill-down → no mutation actions visible.

---

## 11. Core Workflows

```
Alert Detected
    ↓
Alert Created (Critical/Warning/Info)
    ↓
Acknowledged
    ↓
Assigned to Technician
    ↓
Incident Created / Linked
    ↓
Investigation → Repair → Testing
    ↓
Resolved
    ↓
Activity Feed Updated
```

---

## 12. Data Requirements

- ATM: id, location, bank, vendor, model, type, ip, status, health, cash, network, lastSeen, installDate, lastMaintenance, swVersion, fwVersion.
- Device: id, atmId, group, name, status, health, lastChecked, error.
- Alert: id, atmId, severity, message, createdAt, status, assignee, acknowledgedAt, resolvedAt.
- Incident: id, atmId, alertId, issue, priority, technician, status, timeline[], comments[], resolutionNotes.
- Cassette: id, atmId, name, level%, capacity, currency, lastReplenished.
- Transaction: id, atmId, type, amount, status, timestamp.
- User: id, name, role, email, assignedAtms[].

## 13. Mock-Data Strategy

- All data lives in `src/data/`.
- Access only via `src/services/`.
- Seed 10–15 ATMs initially; expand to 60–100 for realism.
- Fictional but realistic: Pakistani city codes (KHI, LHR, ISB), plausible vendors (NCR, Diebold, GRG — as names only), plausible banks (fictional).
- No real customer, account, or transaction data.

## 14. Future Backend Requirements

- REST API for CRUD + queries.
- WebSocket channel for live events.
- Auth service (JWT/OAuth).
- PostgreSQL for persistence, Redis for live cache.
- Monitoring workers pinging real ATMs.
- **Not in scope for this prototype.**

## 15. Future API Integration

- Replace `apiClient.js` internals with `fetch`/`axios`.
- Services keep identical signatures → components unchanged.
- Swap `simulationService` for WebSocket subscriber.
- Add `VITE_API_URL` and `VITE_WS_URL` env vars.

## 16. Success Criteria

- All 15 modules implemented and navigable.
- Simulation toggle visibly updates UI.
- RBAC enforced across routes and actions.
- Zero console errors in normal use.
- Responsive on desktop/tablet/mobile.
- Documentation complete and synchronized.

## 17. Scope

**In scope:** Frontend prototype, mock data, simulated real-time, RBAC, docs.

**Out of scope:** Real ATM/bank integration, real transactions, backend services, real authentication, ICMP ping, payment processing.

## 18. Known Limitations

- Data is fictional and resets on refresh (unless persisted to LocalStorage).
- Simulation is rule-based, not truly random-realistic.
- No backend → no cross-device sync.
- No real security (auth is simulated).

---

*End of PRD.*