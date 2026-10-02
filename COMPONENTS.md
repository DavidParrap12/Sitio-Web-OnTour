# Mapa de Componentes — OnTour DMC
> Complementa [`DESIGN_SYSTEM_PLAN.md`](./DESIGN_SYSTEM_PLAN.md). Lee ese documento primero.

**Pila aprobada:** shadcn/ui (base) · Aceternity (3-4 momentos wow) · Magic UI (micro-detalles) · React Bits (detalles de interacción) · 21st.dev (buscador de variantes).

> **Stack actual confirmado:** Next.js 16.2 · Tailwind v4 · framer-motion v12 · next-intl · React 19.

---

## Mapa por sección

| Sección | Componente | Librería | Por qué |
|---------|-----------|----------|---------|
| **Navbar** | Floating/Resizable Navbar (transparente → sólida al scroll) | Aceternity | Resuelve el header actual de 7 ítems y da sensación premium |
| **Menú móvil** | Sheet + Navigation Menu | shadcn/ui | Accesible y estándar |
| **Hero** | Hero Video Dialog (miniatura con video al clic) | Magic UI | Presencia sin cargar video pesado en el LCP |
| **Titulares** | Blur Fade o Fade Content (solo H1/H2) | Magic UI / React Bits | Aparición suave, sin exagerar |
| **Circuitos destacados** | Apple Cards Carousel | Aceternity | Mejor formato para tarjetas grandes con imagen, duración y "From USD" |
| **Listado de circuitos** | Card + Badge + Toggle Group (filtros) | shadcn/ui | Chips de duración y filtros por región y temática |
| **Detalle de circuito** | Timeline / Sticky Scroll Reveal + Tracing Beam | Aceternity | Itinerario día a día con progreso al scroll |
| **Incluye / No incluye / FAQ** | Accordion + Tabs | shadcn/ui | Reduce muro de texto en móvil |
| **Galería** | Masonry | React Bits | Mejor que la cuadrícula rígida con fotos de distinto formato |
| **"Why OnTour"** | Bento Grid | Magic UI | 4-5 bloques: guías locales, operación propia, grupos pequeños, bilingüe |
| **Cifras (años, viajeros, rating)** | Number Ticker / Count Up | Magic UI / React Bits | Solo con datos reales |
| **Reseñas** | Animated Testimonials | Aceternity | Foto, país y texto; base para reseñas de Google |
| **Logos de asociaciones** | Marquee | Magic UI | Solo con aliados reales (ANATO, RNT, Procolombia, etc.) |
| **Pasos del proceso de salud** | Stepper | React Bits | Reemplaza el carrusel de 5 pasos con "Anterior/Siguiente" |
| **Trust de Wellness** | Card + Badge + Separator (fijas, sin hover) | shadcn/ui | Sustituye la frase interactiva que depende de hover |
| **Formulario de cotización** | Form + Input + Select + Calendar + Sonner | shadcn/ui | Formulario en 2 pasos con fechas y viajeros primero |
| **Carga de imágenes** | Skeleton + Aspect Ratio | shadcn/ui | Evita saltos de layout (CLS) |
| **Footer** | Variante de 21st.dev + Accordion (bloque legal) | 21st.dev / shadcn/ui | Colapsa el párrafo legal en móvil |

---

## Top 5 de mayor impacto

Si solo implementas cinco, hazlo en este orden:

1. **Apple Cards Carousel** (Aceternity) — para los circuitos. Es el mayor salto visual.
2. **Floating Navbar** (Aceternity) — para el header.
3. **Accordion + Tabs** (shadcn/ui) — para itinerarios y FAQ; mayor mejora en lectura móvil.
4. **Animated Testimonials** (Aceternity) — una vez tengas reseñas reales.
5. **Stepper** (React Bits) — para el proceso de Wellness.

---

## Componentes a evitar

| Componente | Razón |
|-----------|-------|
| Compare (antes/después) — Aceternity | En cirugía estética es problema ético y regulatorio |
| Globe, Meteors, Sparkles, Aurora | Se ven a plantilla tech, compiten con las fotos |
| Background Beams, Shimmer Button, Border Beam | Idem |
| H1 hero con efectos largos | Retrasa el LCP y molesta al visitante con prisa |
| Mezclar > 3 librerías con estilos distintos | Si un componente no encaja con la paleta latón/verde, no se usa |

---

## Checklist antes de copiar cualquier componente

### Tailwind v4 ⚠️
- [ ] Aceternity, Magic UI y React Bits asumen Tailwind v3 por defecto — **verifica clases antes de pegar**
- [ ] En v4 el sistema es CSS-first (`@theme`); algunas clases utilitarias cambian
- [ ] `framer-motion` ya está instalado (`v12.38.0`) ✓

### Next.js App Router
- [ ] Cada componente animado necesita `"use client"` al tope del archivo
- [ ] Mantener el Hero como Server Component y aislar la animación en un componente cliente pequeño
- [ ] Revisa la guía de App Router en `node_modules/next/dist/docs/` antes de escribir código

### next-intl
- [ ] Pasar todos los textos por props o por `t()` — los componentes copiados traen textos demo en inglés
- [ ] Nunca hardcodear strings visibles al usuario

### Accesibilidad
- [ ] Respetar `prefers-reduced-motion` en todas las animaciones
- [ ] No dejar información clave solo en hover

### Nombres de componentes
- [ ] Confirmar el nombre exacto en cada sitio antes de instalar — estas librerías renombran con frecuencia
- [ ] Buscar variantes en 21st.dev si el nombre no se encuentra

---

## Integración con DESIGN_SYSTEM_PLAN.md

| Componente (este doc) | Equivalente en plan | Fase |
|----------------------|---------------------|------|
| Floating Navbar (Aceternity) | `Navbar.tsx` (solo CSS si acaso) | Transversal |
| Apple Cards Carousel | `PasadiaCardEditorial.tsx` | Fase 2 |
| Tracing Beam + Sticky Scroll | `CircuitTimeline.tsx` | Fase 2 |
| Masonry (React Bits) | `GalleryMasonry.tsx` | Fase 2 |
| Marquee (Magic UI) | `MarqueeLogos.tsx` | Fase 2 |
| Blur Fade / Fade Content | `SectionReveal.tsx` | Fase 2 |
| Bento Grid (Magic UI) | Nuevo — no está en plan | Fase 2 |
| Number Ticker | Nuevo — agregar en Fase 3 | Fase 3 |
| Animated Testimonials | Nuevo — agregar en Fase 3 | Fase 3 |
| Form + Calendar + Sonner | `BookingForm.tsx` (no tocar) | Fase 5+ |

---

## Fuentes de instalación

| Librería | Instalación | URL |
|----------|------------|-----|
| shadcn/ui | `npx shadcn@latest add <componente>` | https://ui.shadcn.com |
| Aceternity | Copy-paste desde la web | https://ui.aceternity.com |
| Magic UI | `npx magicui-cli@latest add <componente>` | https://magicui.design |
| React Bits | Copy-paste desde la web | https://www.reactbits.dev |
| 21st.dev | Buscador de variantes | https://21st.dev |
