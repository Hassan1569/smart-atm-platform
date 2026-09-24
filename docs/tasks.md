# Task Roadmap
## Smart ATM Operations & Monitoring Platform

**Legend:** `[ ]` todo · `[~]` in progress · `[x]` done
**Priority:** P0 build/runtime · P1 current · P2 dependency · P3 UX/a11y · P4 docs · P5 optional

---

## Phase 0 — Planning & Structure
- [x] T0.1 Recommend folder structure — P1
- [x] T0.2 Explain folder/file responsibilities — P1
- [x] T0.3 Development phases outline — P1

**Acceptance:** User approves structure. ✅

---

## Phase 1 — Documentation
- [x] T1.1 Write `docs/prd.md` — P1
- [x] T1.2 Write `docs/architecture.md` — P1
- [x] T1.3 Write `docs/rules.md` — P1
- [x] T1.4 Write `docs/design.md` — P1
- [x] T1.5 Write `docs/tasks.md` (this file) — P1
- [x] T1.6 Write `docs/memory.md` — P1
- [x] T1.7 Write `README.md` — P1

**Acceptance:** All 7 docs exist and are consistent. ✅

---

## Phase 2 — Project Setup
- [ ] T2.1 Create `package.json` with exact deps — P1
  - Runtime: react, react-dom, react-router-dom, recharts, lucide-react, leaflet, react-leaflet, framer-motion
  - Dev: vite, @vitejs/plugin-react, tailwindcss, postcss, autoprefixer
  - **Acceptance:** `npm install` succeeds.
- [ ] T2.2 Create `vite.config.js` — P2
- [ ] T2.3 Create `tailwind.config.js` with design tokens — P2
- [ ] T2.4 Create `postcss.config.js` — P2
- [ ] T2.5 Create `index.html` with dark-mode boot script — P2
- [ ] T2.6 Create `src/main.jsx` + `src/App.jsx` skeletons — P1
- [ ] T2.7 Create `src/styles/index.css` — P2
- [ ] T2.8 Create `.gitignore` + `.env.example` — P2

**Acceptance:** `npm run dev` renders placeholder.

---

## Phase 3 — Design System + App Shell
- [ ] T3.1 `utils/constants.js` — P1
- [ ] T3.2 `utils/statusColors.js` — P1
- [ ] T3.3 `utils/formatters.js` — P1
- [ ] T3.4 `utils/helpers.js` — P2
- [ ] T3.5 `utils/permissions.js` — P1
- [ ] T3.6 `components/common/Button.jsx` — P1
- [ ] T3.7 `components/common/Card.jsx` — P1
- [ ] T3.8 `components/common/Badge.jsx` — P1
- [ ] T3.9 `components/common/StatusDot.jsx` — P1
- [ ] T3.10 `components/common/Input.jsx` + `Select.jsx` — P2
- [ ] T3.11 `components/common/Modal.jsx` + `ConfirmDialog.jsx` — P2
- [ ] T3.12 `components/common/Table.jsx` — P2
- [ ] T3.13 `components/common/Pagination.jsx` — P2
- [ ] T3.14 `components/common/Skeleton.jsx`, `EmptyState.jsx`, `ErrorState.jsx` — P2
- [ ] T3.15 `components/common/Toast.jsx` — P3
- [ ] T3.16 `context/ThemeContext.jsx` + `hooks/useTheme.js` — P1
- [ ] T3.17 `components/layout/Sidebar.jsx` — P1
- [ ] T3.18 `components/layout/Topbar.jsx` — P1
- [ ] T3.19 `components/layout/ThemeToggle.jsx` — P2
- [ ] T3.20 `layouts/DashboardLayout.jsx` — P1
- [ ] T3.21 `layouts/AuthLayout.jsx` — P2 (stub)
- [ ] T3.22 `routes/AppRoutes.jsx` — P1
- [ ] T3.23 `pages/NotFound.jsx` — P3

**Acceptance:** Shell renders; theme toggle works; routes resolve.

---

## Phase 4 — Dashboard
- [ ] T4.1 `data/atms.js` — seed 12–15 ATMs — P1
- [ ] T4.2 `data/alerts.js`, `data/incidents.js`, `data/activity.js` — P1
- [ ] T4.3 `services/apiClient.js` — P1
- [ ] T4.4 `services/atmService.js` — P1
- [ ] T4.5 `services/alertService.js`, `incidentService.js` — P2
- [ ] T4.6 `hooks/useATMStatus.js` — P1
- [ ] T4.7 `components/dashboard/KpiCard.jsx` — P1
- [ ] T4.8 `components/dashboard/AtmStatusChart.jsx` — P2
- [ ] T4.9 `components/dashboard/HealthGauge.jsx` — P2
- [ ] T4.10 `components/dashboard/CashLevelChart.jsx` — P2
- [ ] T4.11 `components/dashboard/TransactionVolumeChart.jsx` — P2
- [ ] T4.12 `components/dashboard/RecentAlerts.jsx` — P1
- [ ] T4.13 `components/dashboard/RecentIncidents.jsx` — P2
- [ ] T4.14 `components/dashboard/ActivityFeed.jsx` — P2
- [ ] T4.15 `components/dashboard/OperationalSummary.jsx` — P3
- [ ] T4.16 `pages/Dashboard.jsx` — P1

**Acceptance:** Dashboard renders KPIs, charts, panels; responsive.

---

## Phase 5 — ATM Management
- [ ] T5.1 Expand `data/atms.js` to 60+ — P2
- [ ] T5.2 `hooks/useDebounce.js` — P2
- [ ] T5.3 `components/atm/AtmTable.jsx` — P1
- [ ] T5.4 `components/atm/AtmRow.jsx` — P2
- [ ] T5.5 `components/atm/AtmFilters.jsx` — P1
- [ ] T5.6 Sorting + pagination wired — P1
- [ ] T5.7 `pages/ATMs.jsx` — P1
- [ ] T5.8 Row click → `/atms/:id` — P1

**Acceptance:** Search/filter/sort/pagination work.

---

## Phase 6 — ATM Details + Device Monitoring
- [ ] T6.1 `data/devices.js` — P1
- [ ] T6.2 `services/monitoringService.js` — P1
- [ ] T6.3 `components/atm/AtmOverviewCard.jsx` — P1
- [ ] T6.4 `components/atm/AtmIdentityCard.jsx` — P2
- [ ] T6.5 `components/devices/DeviceGroupSection.jsx` — P1
- [ ] T6.6 `components/devices/DeviceCard.jsx` — P1
- [ ] T6.7 `components/devices/DeviceGrid.jsx` — P2
- [ ] T6.8 `components/devices/CassetteLevelBar.jsx` — P2
- [ ] T6.9 `pages/ATMDetails.jsx` — P1
- [ ] T6.10 `pages/Devices.jsx` — P2

**Acceptance:** Overview + device groups render.

---

## Phase 7 — Connectivity Simulation
- [ ] T7.1 Extend `monitoringService` with `getConnectivity` — P1
- [ ] T7.2 `components/connectivity/ConnectivityPanel.jsx` — P1
- [ ] T7.3 `components/connectivity/LatencySparkline.jsx` — P3
- [ ] T7.4 Integrate into ATMDetails tab — P1

**Acceptance:** Connectivity panel shows simulated data.

---

## Phase 8 — Alert Management
- [ ] T8.1 Expand `data/alerts.js` to 80+ — P2
- [ ] T8.2 `hooks/useAlerts.js` — P1
- [ ] T8.3 `components/alerts/AlertSeverityBadge.jsx` — P1
- [ ] T8.4 `components/alerts/AlertTable.jsx` — P1
- [ ] T8.5 `components/alerts/AlertFilters.jsx` — P1
- [ ] T8.6 `components/alerts/AlertWorkflowTimeline.jsx` — P2
- [ ] T8.7 Ack / assign / resolve actions — P1
- [ ] T8.8 `pages/Alerts.jsx` — P1

**Acceptance:** Full alert lifecycle works.

---

## Phase 9 — Incidents + Maintenance
- [ ] T9.1 Expand `data/incidents.js`, add `data/maintenance.js` — P1
- [ ] T9.2 `hooks/useIncidents.js` — P1
- [ ] T9.3 `components/incidents/IncidentTable.jsx` — P1
- [ ] T9.4 `components/incidents/IncidentFilters.jsx` — P2
- [ ] T9.5 `components/incidents/IncidentTimeline.jsx` — P1
- [ ] T9.6 `components/incidents/IncidentComments.jsx` — P2
- [ ] T9.7 `pages/Incidents.jsx` — P1
- [ ] T9.8 `components/maintenance/MaintenanceSchedule.jsx` — P2
- [ ] T9.9 `components/maintenance/MaintenanceHistory.jsx` — P2
- [ ] T9.10 `pages/Maintenance.jsx` — P2

**Acceptance:** Full incident lifecycle + maintenance visible.

---

## Phase 10 — Cash Management
- [ ] T10.1 `data/cash.js` — P1
- [ ] T10.2 `services/cashService.js` — P1
- [ ] T10.3 `components/cash/CashSummaryCard.jsx` — P1
- [ ] T10.4 `components/cash/CassetteLevelList.jsx` — P1
- [ ] T10.5 `components/cash/ReplenishmentHistory.jsx` — P2
- [ ] T10.6 `pages/CashManagement.jsx` — P1

**Acceptance:** Fleet cash overview + per-ATM cassettes.

---

## Phase 11 — Transactions
- [ ] T11.1 `data/transactions.js` — P1
- [ ] T11.2 `services/transactionService.js` — P1
- [ ] T11.3 `components/transactions/TransactionSummaryCards.jsx` — P1
- [ ] T11.4 `components/transactions/HourlyVolumeChart.jsx` — P2
- [ ] T11.5 `components/transactions/TransactionTypeBreakdown.jsx` — P2
- [ ] T11.6 `pages/Transactions.jsx` — P1

**Acceptance:** Volume + success rate + type breakdown.

---

## Phase 12 — ATM Map
- [ ] T12.1 Verify leaflet + react-leaflet in package.json — P1
- [ ] T12.2 `components/map/AtmMapView.jsx` — P1
- [ ] T12.3 `components/map/AtmMarkerPopup.jsx` — P1
- [ ] T12.4 `components/map/MapLegend.jsx` — P2
- [ ] T12.5 `pages/Map.jsx` — P1
- [ ] T12.6 Marker click → popup with ATM ID, location, status, cash, health, last seen — P1

**Acceptance:** Map renders with markers; popups work.

---

## Phase 13 — Reports
- [ ] T13.1 `components/reports/ReportFilterBar.jsx` — P1
- [ ] T13.2 `components/reports/ReportTable.jsx` — P1
- [ ] T13.3 `components/reports/ReportExportButton.jsx` — P2 (print layout)
- [ ] T13.4 `pages/Reports.jsx` — tabs for 8 report types — P1

**Acceptance:** All 8 reports render with filters; export layout printable.

---

## Phase 14 — Authentication + Roles
- [ ] T14.1 `data/users.js` — preset accounts — P1
- [ ] T14.2 `services/authService.js` — login/logout/session — P1
- [ ] T14.3 `context/AuthContext.jsx` + `hooks/useAuth.js` — P1
- [ ] T14.4 `pages/Login.jsx` — P1
- [ ] T14.5 `routes/ProtectedRoute.jsx` — P1
- [ ] T14.6 Wire `permissions.js` into Sidebar (hide disallowed routes) — P1
- [ ] T14.7 `pages/Users.jsx` — admin only — P2
- [ ] T14.8 `pages/Settings.jsx` — theme, session clear, simulation interval — P2

**Acceptance:** Login works; RBAC enforced; disallowed routes redirect.

---

## Phase 15 — Real-Time Simulation
- [ ] T15.1 `services/simulationService.js` — event bus + timer — P1
- [ ] T15.2 `context/SimulationContext.jsx` — ON/OFF + interval — P1
- [ ] T15.3 `hooks/useSimulation.js` — subscribe helper — P1
- [ ] T15.4 Rules: health drift, status flip, cash depletion, alert generation — P1
- [ ] T15.5 Wire updates into Dashboard, ATMs, Alerts, ActivityFeed, Notifications — P1
- [ ] T15.6 Topbar toggle UI — P1
- [ ] T15.7 `context/NotificationContext.jsx` + `NotificationsPanel.jsx` — P2

**Acceptance:** Toggle ON → visible, sensible updates every tick; toggle OFF → frozen.

---

## Phase 16 — QA + Accessibility + Performance
- [ ] T16.1 Keyboard nav audit — P3
- [ ] T16.2 Contrast audit (both themes) — P3
- [ ] T16.3 Focus states audit — P3
- [ ] T16.4 Responsive audit 320/768/1280/1920 — P3
- [ ] T16.5 Console error sweep — P0
- [ ] T16.6 Route-level code splitting via React.lazy — P3
- [ ] T16.7 Memoize heavy chart data — P3
- [ ] T16.8 Broken import / unused dep sweep — P0

**Acceptance:** Zero P0 issues; a11y targets met; Lighthouse perf ≥ 85.

---

## Phase 17 — Final Documentation + Portfolio Polish
- [ ] T17.1 Update `README.md` with screenshots — P4
- [ ] T17.2 Update `memory.md` — P4
- [ ] T17.3 Update `prd.md` / `architecture.md` with any drift — P4
- [ ] T17.4 Add `.env.example` notes — P4
- [ ] T17.5 Final review checklist — P4

**Acceptance:** All docs synchronized; project portfolio-ready.

---

*End of tasks.md*