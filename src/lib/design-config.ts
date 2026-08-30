/**
 * OnTour Editorial Design Configuration
 *
 * Central TS config for the editorial design system.
 * Mirrors CSS custom properties for use in JS/TS contexts
 * (Framer Motion, dynamic styles, computed layouts).
 */

// -- Brand Colors -----------------------------------------------------------
export const BRAND_COLORS = {
  // Primary accent — verde selva profundo (Colombia identity)
  editorialAccent: '#1a4a2e',
  editorialAccentHover: '#143822',
  editorialAccentLight: '#226b3a',
} as const;

// -- Destination Color Themes ---------------------------------------------
export const DESTINATION_THEMES = {
  naturaleza: {
    color: '#1b4332',
    colorLight: '#2d6a4f',
    label: 'Naturaleza',
    grade: 'editorial-grade-naturaleza',
  },
  cultura: {
    color: '#9c4221',
    colorLight: '#c76f45',
    label: 'Cultura',
    grade: 'editorial-grade-cultura',
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
  /** Magnetic button spring config (MagneticButton component) */
  magneticSpring: { stiffness: 150, damping: 15, mass: 0.1 },
  /** Rich card hover — scale + lift combined (use with .editorial-hover-rich) */
  hoverRich: {
    whileHover: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  },
  /** Clip-path wipe reveal for images on scroll (ImageRevealClip component) */
  clipRevealWipe: {
    initial: { clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)' },
    whileInView: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

/**
 * Randomized stagger delays (seconds) for organic motion variance.
 * Returns an array of delays where entry i is the delay (in seconds)
 * assigned to child i — order is shuffled so entrances feel non-linear.
 * Pair with dynamic variants via Framer Motion's `custom` prop.
 */
export function varianceStagger(count: number, stepMs = 80): number[] {
  const order = Array.from({ length: count }, (_, i) => i);
  // Fisher-Yates shuffle
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order.map((rank) => rank * (stepMs / 1000));
}

// -- Regions --------------------------------------------------------------
export const REGIONS = [
  'Andina',
  'Caribe',
  'Pacífico',
  'Orinoquía',
  'Amazonía',
] as const;

export type Region = (typeof REGIONS)[number];

// -- Wellness / Dental Premium Color Palette ---------------------------------
export const WELLNESS_COLORS = {
  // Azul marino profundo — credibilidad médica
  primary: '#0A2540',
  primaryForeground: '#ffffff',
  primaryMid: '#0f3460',

  // Blanco hueso — limpieza profesional
  background: '#FAFAF7',
  foreground: '#171717',

  // Verde sage — conexión con naturaleza del Tolima
  accent: '#8FB39C',
  accentHover: '#7a9282',
  accentLight: '#a7c5b1',
  accentBg: 'rgba(143, 179, 156, 0.12)',

  // Dorado suave — detalles premium
  gold: '#C9A961',
  goldHover: '#b5944e',
  goldLight: '#e0c98a',
  goldBg: 'rgba(201, 169, 97, 0.1)',

  // Separadores y bordes
  border: 'rgba(143, 179, 156, 0.2)',
  borderGold: 'rgba(201, 169, 97, 0.4)',
} as const;
