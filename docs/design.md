# Design System
## Smart ATM Operations & Monitoring Platform

**Version:** 1.0
**Last Updated:** Phase 1

---

## 1. Design Philosophy

**Enterprise IT Operations Command Center.**

Principles:
- **Information density > decoration.** Ops users scan dozens of ATMs at once.
- **Status is king.** Color communicates state, not brand.
- **Consistency breeds trust.** Same status = same color, everywhere.
- **Dark mode is first-class.** Ops centers often run dark.
- **Calm in crisis.** Critical alerts are loud; nothing else is.

Anti-patterns to avoid:
- Bootstrap admin look
- Gradient-heavy heroes
- Glassmorphism
- Bouncy animations
- Icon-only nav without labels

---

## 2. Color Palette

### Status colors (semantic — used everywhere)

| Token | Light | Dark | Meaning |
|---|---|---|---|
| `status-online` | emerald-500 | emerald-400 | Healthy |
| `status-warning` | amber-500 | amber-400 | Degraded |
| `status-critical` | red-500 | red-400 | Failed |
| `status-offline` | slate-500 | slate-400 | Unreachable |
| `status-info` | sky-500 | sky-400 | Informational |

### Surfaces

| Token | Light | Dark |
|---|---|---|
| `bg-base` | slate-50 | slate-950 |
| `bg-surface` | white | slate-900 |
| `bg-elevated` | white | slate-800 |
| `border-default` | slate-200 | slate-800 |
| `border-strong` | slate-300 | slate-700 |

### Text

| Token | Light | Dark |
|---|---|---|
| `text-primary` | slate-900 | slate-100 |
| `text-secondary` | slate-600 | slate-400 |
| `text-muted` | slate-400 | slate-500 |

### Accent (brand / interactive)
- Primary: **indigo-600** (light) / **indigo-500** (dark)
- Focus ring: indigo-500 @ 40% opacity

---

## 3. Typography

- **Headings + large display numbers:** Poppins.
- **Body / UI text:** Inter.
- **Monospace (IDs, IPs, timestamps):** JetBrains Mono → system mono stack.

| Role | Font | Size | Weight | Line height |
|---|---|---|---|---|
| Page title | Poppins | 24px | 600 | 32px |
| Section title | Poppins | 18px | 600 | 28px |
| Card title | Inter | 14px | 600 | 20px |
| KPI number | Poppins | 28px | 700 | 32px |
| Body | Inter | 14px | 400 | 20px |
| Small / meta | Inter | 12px | 400 | 16px |
| Monospace | JetBrains Mono | 13px | 500 | 18px |

**Rules:**
- Poppins is used only for headings and large numeric displays (KPI values).
- Inter is used for everything else — paragraphs, labels, tables, buttons, nav.
- Monospace stack is used for ATM IDs, IP addresses, timestamps, and code-like text.
---

## 4. Spacing

Base unit: **4px**.

Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

Rules:
- Card padding: 16–20px.
- Section gap: 24px.
- Table row height: 44px.
- Sidebar width: 240px (expanded), 64px (collapsed).
- Topbar height: 56px.

---

## 5. Grid

- 12-column responsive grid via Tailwind.
- Dashboard KPIs: 4-up on ≥1280px, 2-up on ≥768px, 1-up below.
- Content max width: none (ops centers use full width).
- Gutters: 16px mobile, 20px tablet, 24px desktop.

---

## 6. Cards

Structure:
- Title bar (14px semibold, 16px padding)
- Content area

Rules:
- Border: 1px `border-default`.
- Radius: 8px.
- Shadow: none in dark mode; `shadow-sm` in light mode.
- Hover: subtle border color shift only.

---

## 7. Tables

- Header: 12px uppercase, muted text, sticky.
- Rows: 44px height, hover background tint.
- Status column: dot + text (never color alone).
- Numeric columns: right-aligned, monospace.
- Pagination: bottom-right, "Showing X–Y of Z".
- Empty state: centered illustration + message + action.

---

## 8. Forms

- Label: 12px semibold, above input.
- Input height: 36px.
- Border radius: 6px.
- Focus: 2px indigo ring.
- Error: red border + red helper text.
- Required: asterisk on label.

---

## 9. Buttons

| Variant | Use | Style |
|---|---|---|
| Primary | Main action | Indigo bg, white text |
| Secondary | Alternate | Border + transparent bg |
| Ghost | Tertiary | Text only, hover bg |
| Danger | Destructive | Red bg (requires confirm) |

Sizes: sm (28px), md (36px), lg (44px). Icon-only buttons require `aria-label`.

---

## 10. Badges

Used for status, severity, priority. Pattern: `[dot] Label`.

Examples:
- `● Online` (emerald)
- `● Warning` (amber)
- `● Critical` (red)
- `● Offline` (slate)

Severity badges for alerts use same palette, larger padding.

---

## 11. Alerts (inline)

Types: info, warning, error, success.

Style: left border 4px in type color, tinted background, icon + message + optional dismiss.

---

## 12. Charts (Recharts)

- Line/area for time series (transaction volume, health drift).
- Bar for distributions (ATM status by region).
- Donut for proportions (health breakdown).
- Colors pulled from status palette.
- Grid: subtle, dashed.
- Tooltip: dark surface, monospace numbers.
- No 3D, no gradients, no shadows on series.

---

## 13. Modals

- Overlay: black @ 60% (light) / 70% (dark).
- Panel: 480px default, 720px for detail views.
- Radius: 12px.
- Content: title + body + footer actions (right-aligned).
- Close: X icon top-right + ESC + overlay click.
- Focus trap mandatory.

---

## 14. Toasts

- Position: bottom-right.
- Auto-dismiss: 4s (info/success), 8s (warning/error).
- Stack max: 3.
- Types: info, success, warning, error.
- Dismissible.

---

## 15. Sidebar

- Fixed left, 240px expanded.
- Logo + nav sections + collapse toggle.
- Nav item: icon + label, 40px height, active state = indigo left bar + tinted bg.
- Sections: Operations, Monitoring, Management, Admin.
- Bottom: user chip + role badge + logout.

---

## 16. Topbar

- 56px height, sticky.
- Left: breadcrumb / page title.
- Center: GlobalSearch (⌘K hint).
- Right: Simulation toggle, theme toggle, notifications bell, user avatar.

---

## 17. Navigation

- Sidebar = primary.
- Breadcrumbs on detail pages.
- Back button on ATM Details / Incident Details.
- Deep links preserved for all routes.

---

## 18. Loading States

- Skeleton components matching final layout shape.
- No spinners for content areas (spinners only for buttons/actions).
- Delay skeleton display by 150ms to avoid flashes.

---

## 19. Empty States

Structure: icon (muted) → headline → subtext → primary action (if applicable).

Examples:
- No ATMs match filters → "No ATMs found. Adjust filters."
- No alerts → "All clear. No active alerts."

---

## 20. Error States

- Inline error for section-level failures.
- Full-page error for route-level failures.
- Always: retry action + support link (mailto placeholder).

---

## 21. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| < 640px | Sidebar collapsed (drawer), KPIs stacked, tables scroll horizontally |
| 640–1023px | Sidebar collapsed toggle, KPIs 2-up |
| 1024–1279px | Sidebar expanded, KPIs 3-up |
| ≥ 1280px | Full layout, KPIs 4-up |

---

## 22. Accessibility

- Minimum contrast 4.5:1 for text.
- Focus visible on all interactives.
- All icons have `aria-label` when standalone.
- Tables use `<thead>`, `<th scope="col">`.
- Modals trap focus and restore on close.
- Status never conveyed by color alone (always dot + text).

---

## 23. Dark Mode

- Class strategy: `dark` on `<html>`.
- Persist to LocalStorage.
- Default: follow system preference.
- All status colors have dark variants (see Section 2).
- Charts use dark-aware grid/tooltip colors.

---

## 24. Light Mode

- Default surface is `slate-50` (not pure white) to reduce glare.
- Cards on white with `shadow-sm`.
- Borders subtle `slate-200`.

---

## 25. Motion

- Framer Motion only where it aids comprehension (page transitions, toast entry).
- Durations: 150ms (micro), 200ms (page), 300ms (toast).
- Respect `prefers-reduced-motion`.

---

*End of Design System.*