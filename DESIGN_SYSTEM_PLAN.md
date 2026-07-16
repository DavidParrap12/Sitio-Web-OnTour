# Plan de Rediseño — OnTour DMC Colombia

> Sistema de diseño editorial para salir del "look AI / grid de cards genérico".
> Integración **gradual, no destructiva** — los componentes actuales siguen funcionando.

---

## 1. Contexto y diagnóstico

### El problema
La web cae en patrones visuales genéricos típicos de sitios generados por IA:
- Grid uniforme de cards repetido en todas las secciones
- Mismo ritmo visual, misma densidad, misma "personalidad de dashboard"
- Falta de "art direction" / intención editorial
- No aprovecha el contenido real abundante del que ya dispone el proyecto

### La oportunidad
- Personalidad: **Moderno / diseño consciente**
- Lenguaje visual: **Mix equilibrado** (foto + tipografía + elementos gráficos sutiles)
- Contenido: **Mucho** (textos, fotos propias, data estructurada de destinos/circuitos)

### Datos que ya tenemos
- `src/data/destinos.ts` → 7 destinos con `id`, `image`, `gallery[]`, `brochureUrl`
- `src/data/circuitos.ts` → 10 circuitos con `id`, `days`, `nights`, `image`, `dayImages[]` (location, image)
- `messages/{es,en,de,fr}.json` → traducciones completas
- Galería de fotos propias en `public/image/`

---

## 2. Principios rectores

1. **Adicción, no sustitución** — Nuevos componentes conviven con los actuales
2. **Feature flag por página** — Activación gradual sin riesgo de deploy
3. **Data backwards-compatible** — Extender interfaces, no romper
4. **Tipografía protagonista** — Display font con personalidad, escala fluida
5. **Fotografía tratada** — Color grading unificado, ratios intencionales
6. **Layouts por tipo de contenido** — No "un componente para todo"
7. **Motion intencional** — Stagger, parallax suave, hover ricos

---

## 3. Sistema tipográfico

| Nivel | Clase CSS | Uso | Font weight |
|-------|-----------|-----|-------------|
| Hero / Display | `.display-1` | H1 página | 700-800 |
| Sección | `.display-2` | H2 principales | 600-700 |
| Subsección | `.heading-1` | H3 tarjetas hero | 600 |
| Card title | `.heading-2` | H4 elementos | 600 |
| Body lead | `.body-lg` | Párrafos destacados | 400 |
| Body | `.body` | Párrafos normales | 400 |
| Caption | `.caption` | Metadatos, ubicación | 500 |
| Label | `.label` | Badges, tags | 600, tracking ancho |

**Display font:** *Fraunces* o *Sora* (decidir)
**Body font:** *DM Sans* (ya en uso)
**Serif accent (opcional):** *Playfair Display* (ya en uso)

Escala fluida con `clamp()` y baseline grid de 4px.

---

## 4. Sistema de color (semántico)

```
--color-destino-natural      → verdes profundos (Tolima, San Agustín)
--color-destino-cultural     → ocres / terracota (Boyacá, Villa de Leyva)
--color-destino-aventura     → azules saturados (Santander, Chicamocha)
--color-destino-playa        → turquesas / arenas (Cartagena, San Andrés)
--color-destino-urbano       → grises cálidos (Bogotá, Medellín, Cali)
--color-accent               → naranja / dorado (CTA)
--color-foreground           → negro casi negro
--color-background           → blanco hueso
--color-muted                → grises
```

Reglas:
- Uso **restringido** — acentos en CTA, bordes sutiles
- Fondos de sección alternados (no siempre blanco)
- Modo oscuro real (no invertido)

---

## 5. Tokens de diseño (Fase 1)

### Archivos nuevos
| Archivo | Propósito |
|---------|-----------|
| `src/styles/design-tokens.css` | CSS custom properties (colores, spacing, shadows, z-index) |
| `src/styles/typography.css` | Clases utilitarias tipográficas |
| `src/lib/design-config.ts` | Config TS central (paleta, ratios, breakpoints, easing) |
| `tailwind.config.ts` (nuevo) | Extender theme v4 con tokens nuevos |

**Sin reemplazar** — `globals.css` y los tokens actuales se mantienen.

---

## 6. Componentes nuevos (Fase 2)

### Convención de nombres
- `Editorial*` = nuevo sistema
- `CardDestino`, `Hero`, `PasadiaCarousel` = legacy (intactos)

### Listado de componentes a crear

```
src/components/editorial/
├── DisplayHeading.tsx          // H1/H2 con font display + clamp
├── EditorialBody.tsx           // Body con leading óptimo + max-w-prose
├── CaptionLabel.tsx            // Metadatos (ubicación, precio, duración)
├── HeroEditorial.tsx           // Hero full-bleed + parallax + CTA sutil
├── MasonryDestinos.tsx         // Grid asimétrico (CSS Grid template-areas)
├── PasadiaCardEditorial.tsx    // Foto 70% + overlay tipográfico (no card blanca)
├── CircuitTimeline.tsx         // Timeline horizontal scroll / vertical mobile
├── SplitScroll.tsx             // Imagen fija + texto reveal
├── GalleryMasonry.tsx          // Lightbox + masonry lazy
├── MarqueeLogos.tsx            // Aliados/reconocimientos infinite scroll
└── SectionReveal.tsx           // Wrapper scroll-triggered (framer-motion)
```

---

## 7. Data enriquecida (Fase 3 — backwards-compatible)

### Extender `src/data/destinos.ts`

```ts
export interface Destino {
  // ... campos actuales (id, image, gallery, brochureUrl)
  // NUEVOS (opcionales):
  ratio?: '4:5' | '16:9' | '1:1' | '3:4';
  colorTheme?: 'naturaleza' | 'cultura' | 'aventura' | 'playa' | 'urbano';
  highlight?: boolean;
  region?: string;       // "Andina", "Caribe", "Pacífico", "Orinoquía", "Amazonía"
  duracion?: string;     // "Full day", "Medio día", "2 días / 1 noche"
}
```

### Extender `src/data/circuitos.ts`

```ts
export interface Circuito {
  // ... campos actuales
  // NUEVOS (opcionales):
  colorTheme?: 'naturaleza' | 'cultura' | 'aventura' | 'playa' | 'urbano';
  difficulty?: 'fácil' | 'moderado' | 'intenso';
  highlight?: boolean;
  regions?: string[];
  groupSize?: string;    // "2-12", "4-16"
  priceFrom?: number;
}
```

**Componentes nuevos leen campos nuevos si existen; legacy ignora.**

---

## 8. Feature flags (Fase 4)

### Archivo
`src/lib/flags.ts`

```ts
export const DESIGN_FLAGS = {
  home:      process.env.NEXT_PUBLIC_NEW_HOME === 'true',
  pasadias:  process.env.NEXT_PUBLIC_NEW_PASADIAS === 'true',
  circuitos: process.env.NEXT_PUBLIC_NEW_CIRCUITOS === 'true',
  nosotros:  process.env.NEXT_PUBLIC_NEW_NOSOTROS === 'true',
  galeria:   process.env.NEXT_PUBLIC_NEW_GALERIA === 'true',
  contacto:  process.env.NEXT_PUBLIC_NEW_CONTACTO === 'true',
} as const;
```

### Uso en página

```tsx
// src/app/[locale]/pasadias/page.tsx
import { DESIGN_FLAGS } from '@/lib/flags';
import { PasadiasEditorial } from './PasadiasEditorial';
import { PasadiasLegacy } from './PasadiasLegacy'; // código actual movido aquí

export default async function Pasadias({ params }) {
  const { locale } = await params;
  const data = await getData();
  
  if (DESIGN_FLAGS.pasadias) {
    return <PasadiasEditorial locale={locale} {...data} />;
  }
  return <PasadiasLegacy locale={locale} {...data} />;
}
```

**Defaults seguros:** Todos en `false` → legacy al 100% hasta activar.

---

## 9. Orden de migración (Fase 5)

| Orden | Página | Complejidad | Componentes nuevos |
|-------|--------|-------------|---------------------|
| 1 | `/galeria` | Baja | `GalleryMasonry`, `HeroEditorial` |
| 2 | `/nosotros` | Media | `SplitScroll`, `HeroEditorial`, `MarqueeLogos` |
| 3 | `/contacto` | Baja | `HeroEditorial`, `EditorialBody` |
| 4 | `/pasadias` | Media | `MasonryDestinos`, `PasadiaCardEditorial` |
| 5 | `/circuitos` | Alta | `CircuitTimeline`, `MasonryDestinos` |
| 6 | `/` (home) | Alta | `HeroEditorial`, `MasonryDestinos`, `SectionReveal` |
| 7 | `/pasadias/[id]`, `/circuitos/[id]` | Media | `SplitScroll`, `GalleryMasonry` |

---

## 10. Tratamientos de layout por sección

| Sección | Layout propuesto |
|---------|------------------|
| Hero home | Full-bleed foto + headline tipográfico grande + CTA sutil + parallax |
| Destinos destacados (home) | **Masonry asimétrico** (ratios 4:5 / 16:9 / 1:1) |
| Circuitos (home) | **Timeline horizontal** (desktop) / vertical (móvil) |
| Pasadías (listado) | **Cards editoriales** — foto 70% + texto 30% superpuesto |
| Pasadía detalle | **Split scroll** — foto fija + info revela |
| Circuitos (listado) | **Timeline scroll horizontal** con días como nodos |
| Circuito detalle | Hero + Itinerary timeline vertical + mapa + galería |
| Nosotros | **Split scroll** — foto izquierda, texto derecha |
| Galería | **Lightbox masonry** con lazy-load progresivo |
| Reconocimientos | **Carousel marquee** + cards apiladas con profundidad |
| Contacto | Form en split con mapa + info lateral |

---

## 11. Motion & micro-interactions

Framer Motion (ya instalado) — guía:

| Patrón | Valores |
|--------|---------|
| Scroll-reveal | `y: 40 → 0`, `opacity: 0 → 1`, duración 0.6s, easing "easeOut" |
| Stagger por sección | delay 80-120ms entre hijos |
| Parallax hero | `translateY 10-15%` del viewport |
| Hover en card | `scale: 1.03` + overlay fade + texto slide-up (200-400ms) |
| Page transitions | Crossfade entre rutas, layout shift mínimo |
| Marquee logos | `linear`, infinito, 30-60s loop |
| Respeto `prefers-reduced-motion` | Sin motion si activo |

---

## 12. Archivos que **NO se tocan** en todo el proceso

| Archivo | Por qué |
|---------|---------|
| `src/i18n/routing.ts` | Routing i18n intacto |
| `src/middleware.ts` | Middleware intacto |
| `src/app/[locale]/layout.tsx` | Layout root + providers |
| `src/app/layout.tsx` | Root layout + fonts |
| `src/components/Navbar.tsx` | Nav funcional (solo CSS si acaso) |
| `src/components/Footer.tsx` | Footer funcional |
| `src/components/WhatsappButton.tsx` | Funcional |
| `src/components/BookingForm.tsx` | Funcional |
| `src/data/destinos.ts` | Solo *extend* interface |
| `src/data/circuitos.ts` | Solo *extend* interface |
| `messages/*.json` | Solo *add* keys nuevas |

---

## 13. Limpieza (Fase 6 — solo cuando todo en `true`)

1. Borrar `DESIGN_FLAGS` y ramas `else` legacy
2. Renombrar `Editorial*` → nombres canónicos si se desea
3. Eliminar componentes legacy no usados (`CardDestino`, `Hero`, `PasadiaCarousel`, etc.)
4. Limpiar `tailwind.config.ts` (quitar extensiones legacy no usadas)
5. Consolidar `globals.css` y `design-tokens.css` (si aplica)

---

## 14. Decisiones pendientes

| # | Decisión | Estado |
|---|----------|--------|
| 1 | Display font: Fraunces, Sora, Space Grotesk u otro | Pendiente |
| 2 | Paleta semántica: usar colores actuales o redefinir | Pendiente |
| 3 | Tailwind v4 CSS-first (`@theme`) o crear `tailwind.config.ts` | Pendiente |
| 4 | ¿Preview deployments en Vercel para A/B con flags? | Pendiente |
| 5 | ¿Modo oscuro o solo claro? | Pendiente |
| 6 | Color grading de fotos (CSS filter vs pre-procesado) | Pendiente |

---

## 15. Roadmap resumido

```
[Fase 1]  Tokens + tipografía          →  Base reutilizable
[Fase 2]  Componentes Editorial*        →  Bloques de construcción
[Fase 3]  Data enriquecida              →  Contenido con personalidad
[Fase 4]  Feature flags                 →  Sistema de rollout seguro
[Fase 5]  Migración página a página     →  /galeria → ... → /home
[Fase 6]  Limpieza final                →  Borrar legacy
```

---

**Próximo paso sugerido:** Resolver decisiones pendientes (1, 2, 3) y arrancar **Fase 1** con tokens + display font.
