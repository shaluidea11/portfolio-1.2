# Shalu — Portfolio

Personal portfolio for **Shalu**, AI Generalist & full-stack builder.

## Stack

- React 19 + Vite + TypeScript (strict)
- Tailwind CSS v4
- Self-hosted variable fonts (Syne, Inter Tight)
- Hash-based routing for GitHub Pages
- No heavy dependencies — CSS-first, native `<dialog>`, minimal JS

## Quick start

```bash
npm install
npm run dev        # dev server at localhost:5173
npm run build      # production build to dist/
npm run preview    # preview production build
```

## How to add a project

1. Open `src/data/projects.ts`
2. Add a new entry to the `projects` array following the `Project` type
3. Required fields: `slug`, `title`, `oneLiner`, `status`, `stack[]`, `links[]`, `bentoSize`, `accentColor`
4. For a full case study, add a `caseStudy` object with: `friction`, `whoItsFor`, `whatIBuilt`, `howItWorks`, `decisions[]`, `whatNext`, `designerLens`
5. Set `caseStudy: null` for projects without a full write-up
6. Tag the project in `src/data/skills.ts` by adding its slug to relevant skills' `projectSlugs` arrays
7. Add screenshots to `public/projects/<slug>/` and list paths in `images[]`

## Content validation

```bash
npx tsx scripts/check-content.ts
```

Fails on: missing `source` comments, duplicate skill names, placeholder images.

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via `.github/workflows/deploy.yml`.

**Before deploying:**
1. Update `base` in `vite.config.ts` to match your repo name (e.g. `'/portfolio/'`)
2. Enable GitHub Pages → Settings → Pages → Source: GitHub Actions

## Design decisions

- **Flat, colourful bento** — inspired by modern flat portfolio references
- **CSS Grid with named areas** — explicit layout control for the asymmetric hero
- **Corner bracket notch** — subtle `┐` affordance on interactive tiles
- **No fabricated metrics** — every number comes from `src/data/` with a `source` comment
- **Honest positioning** — skills and experience presented as-is, no inflation
- **Designer lens** — each project links back to workflow tooling thinking

## Accessibility

- WCAG 2.2 AA colour contrast (documented in `docs/contrast.md`)
- Skip link, semantic landmarks, single `<h1>`, logical heading order
- Keyboard-operable with visible focus rings
- `prefers-reduced-motion` respected everywhere
- `aria-label` on icon-only controls, `aria-hidden` on decorative elements
- Touch targets ≥ 44px
