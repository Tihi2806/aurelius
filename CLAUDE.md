# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Aurelius — Next.js portfolio for a brand & digital agency. Production: https://aurelius-sigma.vercel.app.

## Commands

- `npm run dev` — Next dev server at http://localhost:3000
- `npm run build` — production build (`next build`)
- `npm start` — serve the production build
- `npm run lint` — ESLint (Next core-web-vitals + TS configs)

There is no test runner configured.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- **React Compiler is enabled** (`next.config.ts` → `reactCompiler: true`). Avoid hand-written memoization (`useMemo` / `useCallback` / `React.memo`) unless profiling shows the compiler missed something — it adds noise and the compiler usually does the right thing.
- Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config.*`; configured in `src/app/globals.css`)
- Framer Motion, lucide-react, recharts
- Path alias: `@/*` → `./src/*`

## High-level architecture

### Single-page scroll-hijack home (`src/app/page.tsx`)

The home page is **not** a normal scrolling document. The outer `<div>` is `position: fixed; inset: 0`, and a `wheel`/`touch` handler installed in a `useEffect` drives section transitions by translating each section by ±100% via `requestAnimationFrame` tweens. There are 10 sections (hero → cards → work → manifesto → services → calculator → revenue leak → speed timeline → performance grid → contact). Right-edge `.section-dot` buttons jump directly. Per-section "enter animations" (`animateWork`, `animateManifesto`, `animateServices`, `animateContact`) are gated by `data-animated` so they run once.

Section 1 (`<LayoutShowcase>`) has its **own** internal step state. The home page delegates scroll to it via an imperative ref handle (`LayoutShowcaseHandle.onScrollDelta` returns `true` when the showcase consumed the delta, `false` to release back to page-level navigation). When changing scroll behavior on the home page, both sides need to stay in sync.

If you add or remove a section in `page.tsx`, you must also update:
- the `allSections` array
- the per-`current` branches in `onWheel` / `onTouchEnd`
- the dot count in the JSX nav
- the initial `translateY(100%)` setup block
- `triggerEnterAnimation` if the new section has an entrance

### Theme showcase routes

Each named theme has its own route under `src/app/<theme>/` with a local `layout.tsx`, `page.tsx`, and (usually) a theme-specific CSS file. Themes: `brutalist`, `classy`, `editorial`, `elegant`, `flashy`, `midnight`, `organic`, `saas`, `scandi`. They are independent demo sites and intentionally do **not** share visual primitives — each owns its typography, palette, and layout. The list of themes surfaced on the home cards lives in `src/components/mosaic/themeConfig.ts` and (separately) in the `STYLES` array at the top of `src/components/mosaic/LayoutShowcase.tsx` — keep them in sync if you add a theme.

`src/app/builder/page.tsx` is a self-contained interactive page builder (state shape `BuilderState` + `PerSectionStyles`) — not wired into the marketing site.

### Case studies

Two parallel patterns exist:
- `src/app/work/[slug]/page.tsx` — global case study route, `generateStaticParams` from `src/lib/content.ts` `work[]`
- `src/app/classy/work/[slug]/` — theme-scoped case studies for the Classy demo

`src/lib/content.ts` is the single source of truth for hero copy variants (`heroFlashy`, `heroClassy`, `heroBrutalist`, …), services, and the work list.

### Styling layering

Tailwind v4 utility classes are the default, but section-level visual treatments live in dedicated CSS files (`src/app/hero.css`, `src/app/sections.css`, `src/components/browser-mockup.css`, `src/components/mosaic/mosaic.css`, plus per-theme `*.css`). When something looks "magical" (marquee timing, parallax transforms, dot states), check the matching CSS file before assuming it's inline.

### Global chrome

`src/app/layout.tsx` mounts three always-on components: `<Preloader>`, `<CustomCursor>`, `<AIConcierge>`. Three Google fonts (Cormorant Garamond, DM Sans, Inter) are loaded via `next/font/google` and exposed as CSS vars (`--font-cormorant`, `--font-dm-sans`, `--font-inter`).
