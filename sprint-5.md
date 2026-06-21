# Sprint 5 — Pitch Polish

Goal: make the prototype feel like a real, shareable product — the things a pitch audience notices.

## Deliverables

### 1. Root metadata & Open Graph
- `app/layout.tsx` — add `metadata` export: title template (`%s — GiveRed`), description, `metadataBase`, OG site_name, locale, type
- When a stakeholder shares the URL, they see a real preview card, not a bare URL

### 2. App icon
- `app/icon.tsx` — `ImageResponse` generating a simple branded mark (red circle + white heart)
- Replaces the default Next.js favicon

### 3. Custom 404
- `app/not-found.tsx` — branded, helpful: message + links back to Home and Find a group

### 4. Error boundary
- `app/error.tsx` — `'use client'` error boundary with Reset button and a calm message

### 5. Home page: "Who is it for?" section
- Three illustrated cards: Whānau · Workplace · Community
- Slots between "How it works" and the stats bar
- Makes the group taxonomy concrete for a pitch audience

### 6. Home page: Testimonials
- Three short fictional quotes (clearly illustrative)
- One per group type, attributed to first name + city only
- Slots before the CTA band

## Out of scope
- Full Lighthouse audit (manual, run separately)
- Real OG image (requires design assets)
- Animation / page transitions
