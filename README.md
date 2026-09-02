# Ekdant Capital — marketing site

Single-page marketing site for **Ekdant Capital**, an NBFC / retail lending
brand. Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind
CSS v4.

## Getting started

**Prerequisites** — Node.js 20.9+ (developed on v26) and npm. No database, no
API keys, no `.env` file: the site is fully static.

```bash
git clone https://github.com/Sudeep-More/ekdant-capital.git
cd ekdant-capital
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack and hot reload |
| `npm run build` | Production build — also type-checks and prerenders |
| `npm start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint |

Run `npm run build` before pushing: it is the only step that type-checks the
whole project.

## Deploying

Every route is static (`○ (Static)` in the build output), so any host that can
serve a Next.js build will do.

- **Vercel** — import the GitHub repo; the framework preset, build command and
  output directory are all detected. No environment variables to set.
- **Anywhere else** — `npm ci && npm run build`, then `npm start` behind a
  reverse proxy on port 3000.

Set `metadataBase` in `app/layout.tsx` to the real production origin before
going live, or Open Graph URLs resolve against `localhost`.

## Structure

```
app/
  layout.tsx        Fonts (Sora + Inter), metadata, theme init script
  globals.css       Design tokens, component classes, motion prefs
  page.tsx          Section composition — the whole page order lives here
components/
  SiteHeader.tsx    Utility bar, dropdown nav, mobile drawer
  Hero.tsx          Hero band with headline metrics
  Products.tsx      Loan products with rates and artwork
  Lenders.tsx       Lending-partner logo wall
  Process.tsx       Application flow steps
  EmiCalculator.tsx Live EMI maths + principal/interest donut
  Team.tsx          Leadership cards
  Contact.tsx       Contact channels + ApplyForm
  ApplyForm.tsx     Eligibility form with client-side validation
  SiteFooter.tsx    Contact block, link columns, disclosures
  WhatsAppFab.tsx   Floating WhatsApp button
  ThemeToggle.tsx   Light/dark toggle, THEME_KEY, themeInitScript, useTheme
  Art.tsx           Original SVG artwork (orbit / bars / arch / coins)
  Icon.tsx          Inline 24×24 icon set
  Logo.tsx          Ekdant wordmark
lib/
  site.ts           ALL copy, rates, nav and figures
public/
  ekdant-logo.png   Wordmark (light) — `-dark.png` is the dark-theme variant
  lenders/          Partner logos referenced by `lenders` in site.ts
```

## Editing content

Nearly everything is in **`lib/site.ts`** — `company`, `socials`,
`navigation`, `hero`, `heroMetrics`, `products`, `steps`, `leadership`,
`lenders`, `contactChannels`, `footerColumns`. Change it there rather than in
the components.

Section order and which sections appear is controlled by `app/page.tsx`.

Adding a lending partner: drop the logo into `public/lenders/` and add a
`{ name, logo }` entry to `lenders` in `lib/site.ts`.

## Design system

Two layers of tokens, both in `globals.css`.

**1. Fixed scales** — absolute colours that never change (`@theme`):

| Role | Token | Value |
| --- | --- | --- |
| Brand (forest green, keyed to the logo) | `brand-950` → `brand-50` | `#012512` → `#f0fdf3` |
| Accent (emerald) | `accent-700` → `accent-50` | `#047857` → `#ecfdf5` |
| Neutrals (green-tinted grey) | `ink-950` → `ink-50` | `#0b1410` → `#f2f7f3` |

**2. Semantic roles** — what components actually use. Declared as plain custom
properties, re-declared under `[data-theme="dark"]`, then exposed to Tailwind
via `@theme inline` so the utilities emit `var(--role)` and flip at runtime
with no rebuild:

| Utility | Light | Dark | Used for |
| --- | --- | --- | --- |
| `bg-page` | `#ffffff` | `#071310` | Section grounds |
| `bg-surface` | `#ffffff` | `#0e1a15` | Cards on the ground |
| `bg-surface-alt` | `#f4faf6` | `#0a1611` | Alternating bands |
| `bg-surface-sunken` | `#e8f4ec` | `#16251d` | Wells, slider tracks |
| `bg-tint` | `#eafaf0` | `#10261a` | Icon wells, chips |
| `bg-feature` / `-deep` | `#e9f6ee` / `#d8efe1` | `#0c1a14` / `#06110d` | Full-bleed emphasis bands |
| `border-line` / `-strong` | `#dbeee1` / `#c2e2cd` | `#1c2f24` / `#27412f` | Hairlines / inputs |
| `text-heading` | `#0c2418` | `#eff7f1` | Headings |
| `text-body` | `#37564a` | `#b3c8bb` | Body copy |
| `text-muted` / `text-faint` | `#5c7a6d` / `#93b0a1` | `#87a091` / `#63806e` | Meta / placeholders |
| `text-brand-ink` | `#01582b` | `#88e4a0` | Metrics, eyebrows, links |

The emphasis bands invert between themes (light green on white, deep green on
black), so anything sitting on them uses the paired `on-feature-*` roles —
`text-on-feature-heading`, `text-on-feature-body`, `text-on-feature-muted`,
`text-on-feature-accent`, `border-on-feature-line`, `bg-on-feature-fill` —
rather than a raw scale. That way a band can flip without touching a component.

**Rule of thumb: reach for a semantic role, not a raw scale.**

Reusable classes: `.shell` (page gutter), `.eyebrow` (section kicker),
`.btn` + `.btn-primary` / `.btn-dark` / `.btn-ghost` / `.btn-outline`,
`.range` (calculator sliders), `.grid-veil` (band grid overlay).

Motion is suppressed wholesale under `prefers-reduced-motion`, and the
count-up figures jump straight to their final values.

### Theming

- `data-theme="light" | "dark"` on `<html>` drives everything.
- `themeInitScript` (in `ThemeToggle.tsx`, injected into `<head>` by
  `layout.tsx`) stamps the attribute **before first paint**, so there is no
  flash of the wrong palette. `<html>` carries `suppressHydrationWarning`
  because of it.
- First visit follows the OS preference and keeps following it until the
  visitor clicks the toggle; the explicit choice is then saved to
  `localStorage` under `ekdant-theme` (`THEME_KEY`).
- `ThemeToggle` reads the theme from the DOM via `useSyncExternalStore` +
  `MutationObserver` rather than mirroring it into React state, so there is
  one source of truth. `useTheme()` is exported if other components need it.
- `color-scheme` is set per theme, so native controls (the product `<select>`,
  scrollbars) match.
- A `dark:` variant is wired up (`@custom-variant`) for the rare case a
  semantic token cannot express something — the sun/moon icon swap uses it.

**Swapping the palette again** is a token edit, not a component edit: change
the fixed scales and the two role blocks in `globals.css`, plus the
`--art-*` values that colour the SVG artwork.

### Artwork

`Art.tsx` draws four abstract variants (`orbit`, `bars`, `arch`, `coins`) on a
400×300 canvas. Colours come from `--art-dark-*` (fixed — used on the
always-dark bands) and `--art-light-*` (theme-following — used on cards).
They are applied via `style` props rather than `fill`/`stroke` attributes,
because `var()` is not resolved in SVG presentation attributes.

## Before going live

- [ ] **Replace the footer disclosure.** It is a placeholder. Add your CIN,
      NBFC registration number, registered office and any regulatory
      disclaimers your jurisdiction requires.
- [ ] **All rates, tenures and figures in `lib/site.ts` are illustrative
      sample content.** Swap in your real approved product terms.
- [ ] **Confirm you have permission to display each lender logo** in
      `public/lenders/`. Third-party marks are the one thing in this repo that
      is not original work.
- [ ] Wire up `ApplyForm.tsx` (`handleSubmit`) to your CRM or lead endpoint —
      it currently only validates and shows a success state. Add server-side
      validation and rate limiting there.
- [ ] Replace the hard-coded reference number in the form success state.
- [ ] Set `metadataBase` in `app/layout.tsx` to the production origin.
- [ ] Nav items point at on-page anchors. Add real routes under `app/` if you
      want separate About / Blog / Contact pages.
- [ ] Add an OG image and favicon.

## Originality note

Layout structure follows a conventional lending-site section order, but all
markup, styles, copy, iconography and artwork in this repo were written from
scratch. No third-party template code, stock imagery, or icon fonts are
included or referenced. The SVG artwork in `Art.tsx` is generated geometry,
so there are no image licences to track. Lender logos in `public/lenders/` are
the trademarks of their respective owners.
