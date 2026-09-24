# Project Rules
## Smart ATM Operations & Monitoring Platform

**Version:** 1.0
**Status:** Constitution — amendments require explicit user approval.

These rules are **non-negotiable**. Any deviation must be justified and documented in `memory.md`.

---

## A. Truthfulness & Realism

1. **Never claim real ATM integration.** No "connected to GRG/NCR/Diebold" claims.
2. **Never invent real APIs.** No fake GRG, FEEL, or bank endpoints presented as real.
3. **Never attempt real ATM infrastructure operations** from the browser (no ICMP, no SNMP, no TCP probes).
4. **Use only mock/simulated data.** Label it as such in UI where ambiguity could arise.
5. **Never fabricate banking information.** No real account numbers, card numbers, or customer data.
6. **Use approved terminology:** "simulated monitoring", "mock ATM data", "frontend prototype", "simulated connectivity".
7. **Do not implement future features prematurely.** If it's Phase 12, don't build Phase 15.

---

## B. Architecture & Code Quality

8. **Keep mock data separate from service logic.** `data/` is inert; `services/` orchestrates.
9. **Do not place huge datasets inside components.** Always import from `data/` via services.
10. **Reuse components.** Before building new, search `common/` and domain folders.
11. **Avoid unnecessary dependencies.** Every dep must have a documented purpose.
12. **Avoid duplicated business logic.** If it's used twice, extract it.
13. **Never delete working functionality unnecessarily.** Refactor with cause.
14. **Test changes before declaring completion.** No "should work" claims.
15. **Keep documentation synchronized.** Update `memory.md` and `tasks.md` each phase.
16. **Do not refactor unrelated code.** Stay in scope of the current task.
17. **Prefer maintainability over complexity.** Simpler wins.
18. **Avoid unnecessarily large files.** Target < 300 lines; split when exceeding.
19. **Preserve existing project architecture** unless there is a strong technical reason to change it.
20. **Single source of truth.** Statuses in `constants.js`, permissions in `permissions.js`, colors in `statusColors.js`.
21. **Services are the only data boundary.** Components never import from `data/`.
22. **Pure functions in `utils/`.** No React, no side effects, no data access.

---

## C. UI/UX

23. **Maintain responsive design.** Test 320px, 768px, 1280px, 1920px.
24. **Maintain accessibility.** Keyboard nav, focus states, ARIA where needed, semantic HTML.
25. **Avoid overusing** gradients, glassmorphism, animations, decorative effects.
26. **Information hierarchy > visual effects.** Density is fine; chaos is not.
27. **All states must exist:** loading (skeleton), empty, error, success.
28. **All destructive actions require confirmation dialogs.**
29. **Dark mode and light mode must both be usable.** No invisible text, no broken contrast.
30. **No unstyled native controls** where a design-system equivalent exists.

---

## D. Data & Simulation

31. **Simulation must be controllable.** Toggle ON/OFF always present.
32. **Simulation must be sensible.** 1–2 changes per tick, not a storm.
33. **Simulation events must be named consistently** (`atm:health`, `alert:new`).
34. **Timestamps must update** for any changed entity.
35. **Activity feed must reflect** every simulated change.
36. **No silent mutations.** Every state change traces to a user action or a simulation event.

---

## E. Roles & Auth

37. **RBAC is centralized.** No inline `role === 'admin'` checks outside `permissions.js`.
38. **ProtectedRoute is mandatory** for every authenticated route.
39. **Simulated auth must never be described as secure.**
40. **LocalStorage session must be clearable** from Settings.

---

## F. Development Workflow

41. **Follow the phase sequence.** Phase N+1 starts only after Phase N is approved.
42. **1–3 related tasks per response.** Large tasks split into sub-tasks.
43. **Inspect before modifying.** Read file → understand → change only what's needed.
44. **Stop after completing the requested task.** Never auto-advance phases.
45. **Use the standard response format** (see Section G).

---

## G. Response Format (Development Phases)

```
## Completed
- Task:
- Files created:
- Files modified:
- Main changes:
- Testing:
- Documentation updated:
- Remaining issue:
- Next task:
```

No full-file dumps of unchanged code.

---

## H. Priority System

```
P0 — Build/runtime errors
P1 — Current task
P2 — Required dependencies
P3 — UX/accessibility fixes
P4 — Documentation
P5 — Optional improvements
```

Never jump to P5 while P0/P1 remains incomplete.

---

## I. Amendments

Any new rule must be:
1. Justified in `memory.md` under "Architecture Decisions".
2. Approved by the user.
3. Added with a version bump.

---

*End of Rules.*