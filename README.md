# GiveRed

A pitch prototype for a New Zealand blood donation group coordination platform.

GiveRed lets people create or join blood donation groups — whānau, workplace, sports club, or community — and coordinate sessions together. The goal: turn a solitary medical appointment into a shared habit.

**Live demo:** https://givered.vercel.app

---

## What's built

| Route | Description |
|---|---|
| `/` | Home — hero, how it works, who it's for, stats, testimonials |
| `/groups` | Browse groups — search, filter by type, sort, paginate |
| `/groups/[slug]` | Group profile — stats, next session, members, badges, join form |
| `/book` | Book a session — select, confirm, download ICS calendar invite |
| `/start` | Start a group — 3-step wizard (details → champion → share link) |
| `/dashboard` | Group dashboard — members, sessions, badges, city leaderboard |
| `/eligible` | Eligibility — links to official NZBS checker, common questions |
| `/about` | About GiveRed + privacy (NZ Privacy Act 2020) |
| `/accessibility` | Accessibility statement (WCAG 2.2 AA, NZ Web Standard 1.2) |

All data is mocked — JSON files under `data/`. No backend required.

---

## Stack

- **Next.js 16** (App Router)
- **MUI v6** with a Material 3 colour palette seeded from `#C0392B`
- **React Hook Form + Zod v4** for form validation
- **TypeScript**

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
app/                  Next.js App Router pages
components/           Shared UI components
data/                 Mock JSON data (groups, sessions, leaderboard)
types/                TypeScript interfaces
public/               Static assets (logo)
theme-tokens.json     Material 3 tonal palette tokens
```

---

## Constraints

This is a **pitch prototype**, not a production system.

- NZ law applies throughout (Privacy Act 2020, Web Accessibility Standard 1.2)
- No clinical eligibility information — defers entirely to [New Zealand Blood Service](https://www.nzblood.co.nz/give-blood/can-i-give/)
- Wrong information is worse than missing information — fabricated medical or legal details are avoided
