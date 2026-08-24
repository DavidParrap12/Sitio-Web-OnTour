# Frontend & Design Review — Implementation Plan

**Created:** 2026-08-15  
**Status:** Planning phase — ready for execution  
**Project:** OnTour DMC Colombia — Editorial Design System Migration

**All Decisions Resolved:** 2026-08-15

---

## Executive Summary

The editorial design system (Fases 1-4) is **architecturally complete** with feature flags all enabled, but the **visual execution feels static and section-bound** due to:
- Hard section boundaries with flat backgrounds
- Repetitive hero/motion patterns
- Underused destination color theming
- No depth/parallax/layering
- All pages using identical fade-up reveal

All legacy code is now dead weight (flags = true) — Phase 6 cleanup can begin.

---

## Phase 0.5: Visual Identity Definition (½ day) — **NEW: Pre-Fase 1 Foundation**

*With "carta blanca" — define the visual DNA before building anything. This ensures every component from Phase 1 onward has coherent identity.*

| # | Decision | Value | Implementation |
|---|----------|-------|----------------|
| 1 | **Primary Accent Color** | Verde selva profundo `#1a4a2e` (connects to Colombia, differentiates from generic travel blue) | Add to `design-config.ts` + `globals.css` as `--color-editorial-accent` |
| 2 | **Display Font** | **Fraunces** (variable serif, editorial personality, Google Fonts free) | Add to `layout.tsx` via `next/font`, update `--font-display` in `globals.css` |
| 3 | **Photo Color Grading** | Auto-apply per `colorTheme` (see 1.2) | CSS filters in `globals.css`, applied via `useDestinationTheme` hook |

**Deliverable:** A single `VISUAL_IDENTITY.md` doc + updated tokens — **do this in one afternoon before Phase 1 starts.**

---

## Phase 0: Quick Wins (1-2 days) — Critical Bugs & A11y

| # | Task | File(s) | Effort |
|---|------|---------|--------|
| 0.1 | Fix hardcoded WhatsApp number in `PasadiaCarousel` | `src/components/PasadiaCarousel.tsx:112` | 5 min |
| 0.2 | Add `prefers-reduced-motion` guard to all Framer Motion components | `src/components/editorial/SectionReveal.tsx`, `HeroEditorial.tsx`, `ActivityStrips.tsx`, carousels | 30 min |
| 0.3 | Add focus trap to lightbox (`GaleriaEditorial`) and dropdown (`PasadiaCarousel`) | New hook `useFocusTrap.ts` + apply | 1 hr |
| 0.4 | Enable blur placeholders on all `Image` components | All editorial pages + components | 1 hr |
| 0.5 | Move inline Ken Burns CSS to `globals.css` (remove `dangerouslySetInnerHTML`) | `src/components/Hero.tsx`, `src/app/globals.css` | 15 min |
| 0.6 | Fix color contrast on overlay text (audit + adjust opacity) | `globals.css` overlay gradients | 30 min |

**Acceptance:** No console errors, Lighthouse a11y > 95, no vestibular triggers.

---

## Phase 1: Visual Polish — "Break the Static Feel" (1 week)

### 1.1 Scroll-Driven Parallax & Depth
- Use **Framer Motion `useScroll` / `useTransform`** (not `@tailwindcss/scroll-driven-animations` — partial Safari/iOS support, tourism = high iPhone traffic)
- Create `EditorialParallax` wrapper component using Framer's scroll-driven animations
- Apply to section backgrounds (images, gradients) — not content
- **Files:** New `src/components/editorial/EditorialParallax.tsx`, update all editorial pages

### 1.2 Destination Color Theming Per Section + Auto Color Grading
- Extend `Destino` / `Circuito` interfaces with `colorTheme` (already in `DESIGN_SYSTEM_PLAN.md`)
- Create `useDestinationTheme(theme)` hook returning CSS vars for: accent color, border, badge bg, CTA variant
- **Auto color grading** — apply CSS `filter` per theme on all destination images:
```css
.editorial-grade-naturaleza { filter: saturate(1.1) contrast(1.05) hue-rotate(-5deg); }
.editorial-grade-cultura    { filter: saturate(0.9) sepia(0.15) contrast(1.08); }
.editorial-grade-aventura   { filter: saturate(1.2) contrast(1.1) brightness(0.95); }
.editorial-grade-playa      { filter: saturate(1.1) brightness(1.05) contrast(0.98); }
.editorial-grade-urbano     { filter: saturate(0.85) contrast(1.1); }
```
- Apply to: section accents, CTA variants, border colors, badge backgrounds, **AND image filters**
- **Files:** `src/data/destinos.ts`, `src/data/circuitos.ts`, `src/lib/design-config.ts`, `src/app/globals.css`, new hook

### 1.3 Vary Hero Layouts by Page Type
| Page | Current | New Concept |
|------|---------|-------------|
| `/` (Home) | Ken Burns full-bleed | Keep — add subtle parallax |
| `/pasadias` | Single hero image | **Split hero**: image left, rotating cards right |
| `/circuitos` | Single hero image | **Timeline hero**: horizontal scroll preview of circuits |
| `/nosotros` | Split image/text | **SplitScroll** with sticky image (already built!) |
| `/galeria` | Single hero | **Masonry hero**: collage of top images |
| `/contacto` | Office photo | **Map-integrated hero**: interactive map background |
| Detail pages | Single hero | **Contextual**: show day-images strip or map preview |

### 1.4 Micro-Interactions & Motion Variance
- Magnetic buttons (follow cursor slightly)
- Image reveal: `clip-path` polygon animation on scroll
- Stagger with **variance** (not uniform 100ms) — use `staggerChildren: { each: 0.08, from: "random" }`
- Hover: `scale(1.02)` + `box-shadow` + **color shift** (not just lift)
- **Files:** `src/lib/design-config.ts` (extend `MOTION`), `globals.css` (new utilities)

### 1.5 Soften Section Transitions
- Gradient bleeds between sections (bottom of A → top of B)
- Overlapping elements (cards crossing section boundary)
- `mask-image` fade on section edges
- **Files:** `globals.css` (new `.editorial-section-bleed`, `.editorial-gradient-bleed`), apply in editorial pages

---

## Phase 2: Component Consolidation (3-5 days)

### 2.1 Unified Carousel System
**Current:** 3 implementations (`PasadiaCarousel`, `CircuitCarousel`, `CircuitosCarousel`)
**Target:** Single `EditorialCarousel` with config:
```ts
interface CarouselConfig {
  aspectRatio: '4:5' | '16:9' | '1:1';
  contentPosition: 'bottom' | 'center' | 'split';
  showProgress: boolean;
  autoplay: boolean;
  variant: 'pasadia' | 'circuito' | 'editorial';
}
```
- **Files:** New `src/components/editorial/EditorialCarousel.tsx`, delete 3 legacy files

### 2.2 Hero Variant System
**Current:** `HeroEditorial` (Ken Burns) + inline heroes in detail pages
**Target:** `HeroEditorial` with `variant` prop:
```ts
type HeroVariant = 'ken-burns' | 'parallax' | 'split' | 'timeline' | 'static';
```
- **Files:** Refactor `HeroEditorial.tsx`, update all pages

### 2.3 EditorialSection Wrapper
Extract repeated pattern:
```tsx
<EditorialSection 
  theme="naturaleza" 
  bleed="bottom" 
  reveal="stagger"
  className="py-24"
>
  {children}
</EditorialSection>
```
Handles: reveal, padding, background bleed, theme vars, container width
- **Files:** New `src/components/editorial/EditorialSection.tsx`

### 2.4 Storybook Setup — Visual Safety Net (BEFORE legacy deletion)
- Add Storybook 8 + Chromatic
- Write stories for **core components only**: `HeroEditorial` (all variants), `EditorialCarousel` (all configs), `EditorialSection`, `PasadiaCardEditorial`, `CaptionLabel`, `DisplayHeading`, `SectionReveal`
- Configure Chromatic for visual regression on PR
- **Files:** `.storybook/`, `src/components/editorial/*.stories.tsx`
- **Why:** Gives visual regression safety before Phase 2.5 mass deletion

### 2.5 Delete All Legacy Code (Phase 6)
- Remove `DESIGN_FLAGS` and all `if (FLAG) ... else ...` branches
- Delete legacy components: `Hero`, `CardDestino`, `PasadiaCarousel`, `CircuitCarousel`, `SectionTitle`, `PasadiaGallery`, `GalleryGrid`, `ReconocimientosGallery`, `CircuitRouteMap`, `ItineraryTimeline`, `BookingForm`, `ContactForm`, `BrochureDownload`, `CircuitProgramDownload`, `CircuitExtensions`, `ActivityStrips`, `Testimonials`, `JsonLd`
- Delete legacy page branches (keep only editorial versions)
- Clean `globals.css` — remove legacy carousel styles, unused tokens
- **Estimated deletion:** ~40 files, ~3000 lines

---

## Phase 3: Performance & Architecture (1 week)

### 3.1 RSC + Client Islands
Convert editorial pages to Server Components with minimal client boundaries:
- Only interactive parts (`'use client'`): carousels, lightbox, dropdowns, forms, maps
- Static content (hero copy, descriptions, highlights) → RSC
- **Target:** < 100KB JS per page (currently ~120-180KB) — Framer Motion ~45KB gzip sets floor

### 3.2 Virtualization for GaleriaEditorial
- Use `@tanstack/react-virtual` or `react-window`
- Masonry layout + virtualized rows
- **Files:** Refactor `GaleriaEditorial.tsx`

### 3.3 Image Optimization Pipeline
- Add `placeholder="blur"` + `blurDataURL` to all `Image` components
- Generate blur placeholders at build (sharp) or use tiny base64
- Proper `sizes` per breakpoint (audit current)
- Enable AVIF/WebP in `next.config.ts`
- **Files:** `next.config.ts`, all editorial pages

### 3.4 Bundle Analysis & Budget
- Add `@next/bundle-analyzer`
- Set CI budget: `next build --profile` + size-limit
- Target: Home < 100KB, Detail pages < 80KB, Gallery < 120KB

---

## Phase 4: Design System Hardening (Ongoing)

### 4.1 Storybook + Visual Regression
- Add Storybook 8 for editorial components
- Chromatic for visual regression on PR
- Stories for all variants of: `HeroEditorial`, `EditorialCarousel`, `PasadiaCardEditorial`, `CaptionLabel`, `DisplayHeading`, `EditorialBody`, `SectionReveal`

### 4.2 Design Tokens as Single Source
- Migrate `globals.css` `@theme` → `tailwind.config.ts` + `design-config.ts` sync script
- Generate CSS custom properties from TS config at build
- **Files:** New `scripts/sync-tokens.ts`, `tailwind.config.ts`

### 4.3 Type-Safe Translations
- Generate TypeScript types from `messages/*.json`
- Use `ts-i18n` or custom script
- Replace `t: Record<string, string>` with typed namespaces

### 4.4 Component API Documentation
- Add JSDoc/TSDoc to all editorial components
- Document: props, variants, composition patterns, accessibility notes
- Create `COMPONENT_API.md` or use Storybook docs

---

## File Structure After Cleanup (Target)

```
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx                    # HomeEditorial only
│   │   ├── pasadias/page.tsx           # PasadiasEditorial only
│   │   ├── circuitos/page.tsx          # CircuitosEditorial only
│   │   ├── nosotros/page.tsx           # NosotrosEditorial only
│   │   ├── galeria/page.tsx            # GaleriaEditorial only
│   │   ├── contacto/page.tsx           # ContactoEditorial only
│   │   ├── pasadias/[id]/page.tsx      # PasadiaDetailEditorial only
│   │   └── circuitos/[id]/page.tsx     # CircuitoDetailEditorial only
│   ├── globals.css                     # Cleaned, only editorial tokens
│   └── layout.tsx
├── components/
│   ├── editorial/                      # ALL NEW SYSTEM
│   │   ├── HeroEditorial.tsx
│   │   ├── EditorialCarousel.tsx
│   │   ├── EditorialSection.tsx
│   │   ├── EditorialParallax.tsx
│   │   ├── PasadiaCardEditorial.tsx
│   │   ├── CircuitCardEditorial.tsx
│   │   ├── DisplayHeading.tsx
│   │   ├── EditorialBody.tsx
│   │   ├── CaptionLabel.tsx
│   │   ├── SectionReveal.tsx
│   │   ├── MarqueeLogos.tsx
│   │   ├── GalleryMasonry.tsx
│   │   ├── Lightbox.tsx
│   │   ├── SplitScroll.tsx
│   │   ├── CircuitTimeline.tsx
│   │   ├── MasonryDestinos.tsx
│   │   ├── CircuitExtensions.tsx
│   │   ├── ActivityStrips.tsx
│   │   ├── BookingFormEditorial.tsx
│   │   ├── ContactFormEditorial.tsx
│   │   ├── BrochureDownloadEditorial.tsx
│   │   ├── MapEmbed.tsx
│   │   └── index.ts
│   ├── Navbar.tsx                      # Keep (functional)
│   ├── Footer.tsx                      # Keep (functional)
│   ├── WhatsappButton.tsx              # Keep (functional)
│   └── JsonLd.tsx                      # Keep (SEO)
├── lib/
│   ├── design-config.ts                # Single source of tokens
│   ├── flags.ts                        # DELETE after Phase 2
│   ├── googleSheets.ts                 # Keep
│   ├── schema.ts                       # Keep (SEO)
│   └── hooks/
│       ├── useFocusTrap.ts
│       ├── useReducedMotion.ts
│       ├── useDestinationTheme.ts
│       └── useScrollParallax.ts
├── data/
│   ├── destinos.ts                     # Extended with colorTheme, ratio, etc.
│   └── circuitos.ts                    # Extended with colorTheme, difficulty, etc.
├── styles/
│   └── design-tokens.css               # Generated from design-config.ts
└── i18n/                               # Keep
```

---

## Dependencies to Add

```json
{
  "dependencies": {
    "@tanstack/react-virtual": "^3.x",           // Phase 3.2
    "focus-trap-react": "^10.x",                 // Phase 0.3
    "sharp": "^0.33.x",                          // Phase 3.3 (blur placeholders)
    // @tailwindcss/scroll-driven-animations REMOVED — use Framer useScroll (Safari/iOS safe)
  },
  "devDependencies": {
    "@storybook/nextjs": "^8.x",                 // Phase 2.5 (MOVED UP — before legacy deletion)
    "@chromatic-com/storybook": "^1.x",          // Phase 2.5
    "@next/bundle-analyzer": "^14.x",            // Phase 3.4
    "size-limit": "^11.x",                       // Phase 3.4
    "ts-i18n": "^1.x"                            // Phase 4.3 (or custom)
  }
}
```

---

## Execution Order & Milestones

| Week | Phase | Milestone |
|------|-------|-----------|
| 1 | **0.5** | **Visual Identity Definition** (accent color, Fraunces font, color grading filters) |
| 1 | 0 + 1.1-1.2 | Bugs fixed, parallax working, destination theming + color grading on 2 pages |
| 2 | 1.3-1.5 | All heroes varied (bold/expressive), micro-interactions, soft transitions |
| 3 | 2.1-2.3 | Unified carousel + hero system + EditorialSection wrapper |
| 4 | **2.4** | **Storybook + Chromatic + core component stories (visual safety net)** |
| 5 | **2.5** | **All legacy deleted** (with visual regression protection) |
| 6 | 3.1-3.2 | RSC conversion + Galeria virtualization |
| 7 | 3.3-3.4 | Image optimization + bundle budgets in CI |
| 8+ | 4.x | Token sync, type-safe i18n, docs (Storybook done) |

---

## Decision Points — **ALL RESOLVED** (2026-08-15)

| # | Decision | Resolution | Notes |
|---|----------|------------|-------|
| 1 | **Design Direction** | **Bold/Expressive** — larger type, aggressive crops, asymmetric layouts, less dead space | Matches premium tourism competitors |
| 2 | **Motion Budget** | **Keep Framer Motion** (~45KB gzip) → bundle target <100KB/page | CSS-only scroll anim saves ~30KB but Safari/iOS issues |
| 3 | **Dark Mode** | **Defer** — no value for target market, adds complexity | Tokens exist if needed later |
| 4 | **Image Color Grading** | **Auto-implement** per `colorTheme` — CSS filters in `globals.css` | Highest impact/lowest effort visual win |
| 5 | **Carousel Library** | **Keep Embla** — CSS scroll-snap has iOS bugs with peek | Works, don't touch |
| 6 | **Map Integration** | **Leaflet** — already in deps, avoids Google Maps API costs, more style flexibility | For `/contacto` hero + detail pages |

> **Resolved:** Scroll-driven animations → **Framer `useScroll`/`useTransform`** (Safari/iOS safe, no extra dep)

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Visual regression during consolidation | **Storybook + Chromatic in Phase 2.4 (Week 4) — BEFORE legacy deletion in Phase 2.5** |
| Bundle size increase from new features | Size-limit CI gate, analyze after each phase |
| Breaking i18n during cleanup | Type-safe translations (Phase 4.3) before mass deletion |
| Performance regression on mobile | Test on real devices (not just devtools) after Phase 3 |
| Design inconsistency across pages | Design token sync (Phase 4.2) + component audit checklist |

---

## Success Metrics

- **Lighthouse:** Performance > 90, Accessibility > 95, Best Practices > 95
- **Bundle:** Home < 100KB JS, Detail < 100KB, Gallery < 120KB (Framer Motion ~45KB floor)
- **CLS:** < 0.1 on all pages
- **INP:** < 200ms
- **Zero** `dangerouslySetInnerHTML`, `any` types in components, hardcoded strings
- **100%** editorial components have Storybook stories
- **Zero** legacy code remaining

---

## Next Step

**All decisions resolved.** Ready to begin execution.

**Execution Order (Updated with Visual Identity):**

| Week | Phase | Milestone |
|------|-------|-----------|
| 1 | **0.5** | **Visual Identity Definition** (accent color, Fraunces font, color grading filters) |
| 1 | 0 + 1.1-1.2 | Bugs fixed, parallax working, destination theming + color grading on 2 pages |
| 2 | 1.3-1.5 | All heroes varied (bold/expressive), micro-interactions, soft transitions |
| 3 | 2.1-2.3 | Unified carousel + hero system + EditorialSection wrapper |
| 4 | **2.4** | **Storybook + Chromatic + core component stories (visual safety net)** |
| 5 | **2.5** | **All legacy deleted** (with visual regression protection) |
| 6 | 3.1-3.2 | RSC conversion + Galeria virtualization |
| 7 | 3.3-3.4 | Image optimization + bundle budgets in CI |
| 8+ | 4.x | Token sync, type-safe i18n, docs (Storybook done) |

**Recommended first command (Phase 0.5):**
```bash
# 1. Add Fraunces font to layout.tsx
# 2. Update design-config.ts with #1a4a2e accent
# 3. Add color grading filters to globals.css
# 4. Create VISUAL_IDENTITY.md
# Then Phase 0.1-0.6 in parallel
```