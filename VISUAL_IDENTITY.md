# OnTour DMC Colombia — Visual Identity

**Defined:** 2026-08-15  
**Status:** Approved — Foundation for all editorial components

---

## Core Identity Decisions

| Element | Choice | Rationale |
|---------|--------|-----------|
| **Primary Accent** | `#1a4a2e` (Verde Selva Profundo) | Connects to Colombia's biodiversity, differentiates from generic travel blue, works in both light/dark contexts |
| **Display Font** | **Fraunces** (Variable Serif, 400-900) | Editorial personality, premium tourism feel, Google Fonts free, variable = single font file |
| **Body Font** | DM Sans (existing) | Clean, readable, pairs well with Fraunces |
| **Heading Font** | Playfair Display (existing) | Elegant serif for sub-headlines, already in use |

---

## Color Palette

### Brand Accent (Verde Selva)
```css
--color-editorial-accent:       #1a4a2e;  /* Primary CTA, links, accents */
--color-editorial-accent-hover: #143822;  /* Hover states */
--color-editorial-accent-light: #226b3a;  /* Subtle backgrounds, badges */
```

### Warm Neutrals (Editorial Paper Feel)
```css
--color-editorial-warm:       #faf8f4;  /* Page backgrounds */
--color-editorial-warm-alt:   #f0ebe3;  /* Alternating section backgrounds */
--color-editorial-border:     #d6e4d6;  /* Subtle borders with green tint */
--color-editorial-border-light: #eaf1ea;
```

### Dark (Text & Overlays)
```css
--color-editorial-dark:       #0a1628;  /* Primary text on light */
--color-editorial-dark-mid:   #0f2240;  /* Secondary text */
```

### Shadows (Green-tinted)
```css
--shadow-editorial-glow: 0 0 40px rgba(26, 74, 46, 0.2);
```

---

## Typography Scale (Fluid clamp)

| Class | Font | Size | Weight | Use |
|-------|------|------|--------|-----|
| `.display-1` | Fraunces | `clamp(2.5rem, 5vw + 1rem, 5rem)` | 700 | Hero H1 |
| `.display-2` | Fraunces | `clamp(2rem, 3.5vw + 0.5rem, 3.5rem)` | 600 | Section H2 |
| `.heading-1` | Fraunces | `clamp(1.5rem, 2vw + 0.5rem, 2.25rem)` | 600 | Card titles, H3 |
| `.heading-2` | Fraunces | `clamp(1.25rem, 1.5vw + 0.25rem, 1.75rem)` | 600 | Small cards, H4 |
| `.body-lg` | DM Sans | `clamp(1.125rem, 1vw + 0.25rem, 1.375rem)` | 400 | Lead paragraphs |
| `.body` | DM Sans | `1rem` | 400 | Body copy |
| `.caption` | DM Sans | `0.8125rem` | 500 | Metadata, locations |
| `.label` | DM Sans | `0.75rem` | 600 | Badges, tags (uppercase, tracking-wide) |

---

## Destination Color Themes (Semantic)

Each destination gets a `colorTheme` — applies to:
- Section accent colors
- CTA variants
- Border colors
- Badge backgrounds
- **Image color grading filters**

| Theme | Color | Light | CSS Filter (Auto-applied) |
|-------|-------|-------|---------------------------|
| `naturaleza` | `#1b4332` | `#2d6a4f` | `saturate(1.1) contrast(1.05) hue-rotate(-5deg)` |
| `cultura` | `#9c4221` | `#c76f45` | `saturate(0.9) sepia(0.15) contrast(1.08)` |
| `aventura` | `#1864ab` | `#2b8fd9` | `saturate(1.2) contrast(1.1) brightness(0.95)` |
| `playa` | `#0c8577` | `#12b5a0` | `saturate(1.1) brightness(1.05) contrast(0.98)` |
| `urbano` | `#495057` | `#6c757d` | `saturate(0.85) contrast(1.1)` |

**Usage:** Add `.editorial-grade-{theme}` class to images, or apply via `useDestinationTheme` hook.

---

## Motion & Interaction

| Pattern | Values |
|---------|--------|
| Scroll Reveal | `y: 40 → 0`, `opacity: 0 → 1`, `0.6s`, `ease-out` |
| Stagger | `80-120ms` variance, `from: "random"` for organic feel |
| Parallax | Background `translateY 10-15%` viewport |
| Hover Card | `scale(1.02)` + `box-shadow` + **color shift** (accent tint) |
| Hover Image | `scale(1.05)` slow (500ms) |
| Marquee | Linear, 30-60s loop, pause on hover |
| Reduced Motion | All animations disabled via `prefers-reduced-motion` |

---

## Layout Principles (Bold/Expressive)

1. **Asymmetric grids** — CSS Grid `template-areas`, not uniform columns
2. **Aggressive image crops** — `object-cover`, intentional ratios (4:5, 16:9, 1:1, 3:4)
3. **Overlapping elements** — Cards crossing section boundaries, negative margins
4. **Gradient bleeds** — Section transitions blend, no hard lines
5. **Large type** — `display-1` at 5rem max, tight leading (1.05)
6. **Generous whitespace** — But purposeful, not "airy template" spacing

---

## Component Visual Language

### Buttons
- **Primary:** Verde selva bg, white text, rounded-full, hover darker
- **Secondary:** White bg, verde selva text, border, hover verde selva bg
- **Ghost:** Transparent, verde selva text, underline on hover

### Cards
- No white boxes with shadows — **full-bleed images** with gradient overlays
- Text sits **on top of image** (bottom-aligned), not below
- Hover: subtle scale + overlay opacity change + accent color tint

### Sections
- Alternating `bg-editorial-warm` / `bg-white` / `bg-editorial-dark`
- Gradient bleeds between sections (bottom→top)
- `mask-image` fade on section edges for organic transitions

---

## Implementation Tokens (CSS Custom Properties)

All tokens defined in `src/app/globals.css` `@theme` block and mirrored in `src/lib/design-config.ts`.

**Source of truth:** `globals.css` → `design-config.ts` (mirror for JS/TS contexts)

---

## Usage Guidelines

### Do
- Use Fraunces for all display/heading text (`.display-*`, `.heading-*`)
- Apply destination color theme per section via `useDestinationTheme()`
- Let images breathe — full bleed, intentional crops
- Use stagger with variance for organic entrance
- Respect `prefers-reduced-motion` always

### Don't
- Use Sora or generic sans-serif for headlines
- Use the old blue (`#1c7ed6`) anywhere new
- Uniform card grids — use Masonry/asymmetric layouts
- Flat white cards with box-shadows — editorial = image-forward
- Hard section boundaries — bleed, blend, overlap

---

## File References

| File | Purpose |
|------|---------|
| `src/app/globals.css` | CSS custom properties (`@theme`), utility classes, color grading |
| `src/lib/design-config.ts` | TS mirror of tokens, motion presets, theme config |
| `src/app/layout.tsx` | Font loading (Fraunces, DM Sans, Playfair) |
| `src/components/editorial/*.tsx` | Components consuming this identity |

---

## Next Steps (Phase 1+)

1. **Phase 1.1** — `EditorialParallax` wrapper using Framer `useScroll`
2. **Phase 1.2** — `useDestinationTheme` hook + apply to editorial pages
3. **Phase 1.3** — Bold hero variants per page type
4. **Phase 1.4** — Micro-interactions with color shift
5. **Phase 1.5** — Section bleeds + mask transitions