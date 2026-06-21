# Sprint 6 — Demo Hardening

Goal: make the prototype safe to hand to a stakeholder or present live without surprises.

## Deliverables

### 1. Demo banner
- `components/DemoBanner.tsx` — dismissible info bar above all pages
- Message: "Prototype — all data is illustrative. Not a real service."
- Dismiss stores in sessionStorage (gone for the session, reappears on next visit)
- Added to `app/layout.tsx` between NavBar and main content

### 2. Mobile nav hamburger
- Current mobile nav hides "Find a group" entirely — real gap for a demo
- Add a hamburger IconButton + Drawer to NavBar (xs only)
- Drawer contains all nav links + Start a group CTA

### 3. Demo home page entry point
- Add a subtle "Suggested demo path" chip/callout to the home page hero
- Gives a presenter a starting point: Home → Find a group → Group profile → Book → Dashboard

### 4. Responsive fixes
- NavBar logo text truncates on very small screens — add `noWrap` / truncation guard
- Hero CTA buttons stack cleanly on 375px
- "Who is it for?" cards have adequate padding on xs

## Out of scope
- Full Lighthouse audit
- Real touch-target audit (WCAG 2.5.8)
