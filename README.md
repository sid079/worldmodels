# Spatial AI Competitive Intelligence

A single-page React application serving as a job project assignment for BD/GTM roles at spatial AI / world model companies (World Labs, Odyssey, SpAItial). Built to impress technical founders and hiring managers in the generative AI space.

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Instrument Serif (headings), IBM Plex Mono (body/data)

## Design

- **Theme**: Dark mode (`#0A0A0B`), accent `#E8FF59`
- **Aesthetic**: Bloomberg Terminal meets Dieter Rams — data-dense, precise, editorial

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
```

Output in `dist/` — deploy to Vercel, Netlify, or any static host.

## Structure

- `src/data/companies.ts` — All 12 company data (easy to update)
- `src/components/` — Thesis, Competitive Benchmarking (5 sub-tabs), About Me
- `src/App.tsx` — Main app with tab routing

## Customization

1. **About Me**: Replace placeholder content with your name, bio, photo, contact, and "Why This Company" cards
2. **Company Data**: Edit `src/data/companies.ts` to update any company information
