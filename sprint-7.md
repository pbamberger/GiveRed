# Sprint 7 — OG Image

Goal: when someone shares a GiveRed URL in Slack, email, or a pitch deck, the preview card looks like a real product.

## Deliverables

### 1. Default OG image — `app/opengraph-image.tsx`
- 1200×630, generated via `next/og` ImageResponse
- Brand red background, white GiveRed wordmark, "Give blood. Together." tagline
- Used by home page, about, eligible, accessibility, start, book, dashboard

### 2. Per-group OG image — `app/groups/[slug]/opengraph-image.tsx`
- Same dimensions, white/tonal background
- Shows group name, type, city, donation count
- Dynamic — each group URL gets its own card
- Falls back to default if slug not found

## Why this matters for the pitch
Stakeholders will share the URL. The card is the first impression before they even click.
