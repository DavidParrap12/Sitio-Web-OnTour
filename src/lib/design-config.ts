/**
 * OnTour Editorial Design Configuration
 *
 * Central TS config for the editorial design system.
 * Mirrors CSS custom properties for use in JS/TS contexts
 * (Framer Motion, dynamic styles, computed layouts).
 */

// -- Destination Color Themes ---------------------------------------------
export const DESTINATION_THEMES = {
  naturaleza: {
    color: '#1b4332',
    colorLight: '#2d6a4f',
    label: 'Naturaleza',
    grade: 'editorial-grade-natural',
  },
  cultura: {
    color: '#9c4221',
    colorLight: '#c76f45',
    label: 'Cultura',
    grade: 'editorial-grade-cultural',
  },
  aventura: {
    color: '#1864ab',
    colorLight: '#2b8fd9',
    label: 'Aventura',
    grade: 'editorial-grade-aventura',
  },
  playa: {
    color: '#0c8577',
    colorLight: '#12b5a0',
    label: 'Playa',
    grade: 'editorial-grade-playa',
  },
  urbano: {
    color: '#495057',
    colorLight: '#6c757d',
    label: 'Urbano',
    grade: 'editorial-grade-urbano',
  },
} as const;

export type DestinationTheme = keyof typeof DESTINATION_THEMES;

// -- Aspect Ratios --------------------------------------------------------
export const ASPECT_RATIOS = {
  '4:5': 4 / 5,
  '16:9': 16 / 9,
  '1:1': 1,
  '3:4': 3 / 4,
  '3:2': 3 / 2,
} as const;

export type AspectRatio = keyof typeof ASPECT_RATIOS;

// -- Breakpoints (matches Tailwind v4 defaults) ---------------------------
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// -- Image Sizes (for next/image `sizes` prop) ----------------------------
export const IMAGE_SIZES = {
  hero: '100vw',
  cardFull: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  cardHalf: '(max-width: 768px) 100vw, 50vw',
  gallery: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  thumbnail: '(max-width: 640px) 50vw, 200px',
} as const;

// -- Framer Motion Presets ------------------------------------------------
export const MOTION = {
  /** Scroll-reveal: fade up */
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  /** Stagger children */
  stagger: (delayMs = 100) => ({
    animate: { transition: { staggerChildren: delayMs / 1000 } },
  }),
  /** Card hover */
  hoverLift: {
    whileHover: { y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  },
  /** Scale image on hover */
  hoverScale: {
    whileHover: { scale: 1.05, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
  /** Page section reveal (for viewport trigger) */
  sectionReveal: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

// -- Regions --------------------------------------------------------------
export const REGIONS = [
  'Andina',
  'Caribe',
  'Pacífico',
  'Orinoquía',
  'Amazonía',
] as const;

export type Region = (typeof REGIONS)[number];
