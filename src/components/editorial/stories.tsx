import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { DisplayHeading } from "./DisplayHeading";
import { CaptionLabel } from "./CaptionLabel";
import { EditorialBody } from "./EditorialBody";
import { EditorialSection } from "./EditorialSection";
import { EditorialCarousel, type CarouselItem } from "./EditorialCarousel";
import { HeroEditorial, type HeroSlide } from "./HeroEditorial";
import { SectionReveal } from "./SectionReveal";

// ============================================================
// Main Meta (Single default export for CSF compliance)
// ============================================================

const meta: Meta = {
  title: "Editorial Design System/Overview",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

// ============================================================
// DisplayHeading Stories
// ============================================================

export const HeadingH1: StoryObj<typeof DisplayHeading> = {
  name: "DisplayHeading - H1 (display-1)",
  render: () => (
    <DisplayHeading as="h1" variant="display-1">
      Título principal H1
    </DisplayHeading>
  ),
};

export const HeadingH2: StoryObj<typeof DisplayHeading> = {
  name: "DisplayHeading - H2 (display-2)",
  render: () => (
    <DisplayHeading as="h2" variant="display-2">
      Subtítulo H2
    </DisplayHeading>
  ),
};

export const HeadingH3: StoryObj<typeof DisplayHeading> = {
  name: "DisplayHeading - H3 (heading-1)",
  render: () => (
    <DisplayHeading as="h3" variant="heading-1">
      Tertiary heading
    </DisplayHeading>
  ),
};

export const HeadingH4: StoryObj<typeof DisplayHeading> = {
  name: "DisplayHeading - H4 (heading-2)",
  render: () => (
    <DisplayHeading as="h4" variant="heading-2">
      Secondary heading
    </DisplayHeading>
  ),
};

export const HeadingWithTheme: StoryObj<typeof DisplayHeading> = {
  name: "DisplayHeading - Con tema destino",
  render: () => (
    <DisplayHeading as="h2" theme="naturaleza">
      Experiencias en la naturaleza
    </DisplayHeading>
  ),
};

// ============================================================
// CaptionLabel Stories
// ============================================================

export const CaptionLocation: StoryObj<typeof CaptionLabel> = {
  name: "CaptionLabel - Ubicación",
  render: () => <CaptionLabel icon="location">Bogotá, Colombia</CaptionLabel>,
};

export const CaptionDuration: StoryObj<typeof CaptionLabel> = {
  name: "CaptionLabel - Duración",
  render: () => <CaptionLabel icon="duration">3 días / 4 noches</CaptionLabel>,
};

export const CaptionPrice: StoryObj<typeof CaptionLabel> = {
  name: "CaptionLabel - Precio",
  render: () => <CaptionLabel icon="price">$2.500.000 COP</CaptionLabel>,
};

export const CaptionGroup: StoryObj<typeof CaptionLabel> = {
  name: "CaptionLabel - Grupo",
  render: () => <CaptionLabel icon="group">Hasta 10 personas</CaptionLabel>,
};

export const CaptionVariantPill: StoryObj<typeof CaptionLabel> = {
  name: "CaptionLabel - Variante label",
  render: () => (
    <CaptionLabel icon="price" variant="label">
      2.500.000 COP
    </CaptionLabel>
  ),
};

// ============================================================
// EditorialBody Stories
// ============================================================

export const BodyDefault: StoryObj<typeof EditorialBody> = {
  name: "EditorialBody - Por defecto",
  render: () => (
    <EditorialBody>
      Este es un párrafo de cuerpo con altura de línea óptima para lectura prolongada.
    </EditorialBody>
  ),
};

export const BodyLarge: StoryObj<typeof EditorialBody> = {
  name: "EditorialBody - body-lg",
  render: () => (
    <EditorialBody variant="body-lg">
      Este texto usa la variante body-lg con mayor altura de línea.
    </EditorialBody>
  ),
};

export const BodyCentered: StoryObj<typeof EditorialBody> = {
  name: "EditorialBody - Centrado",
  render: () => (
    <EditorialBody centered>
      Texto centrado en la pantalla.
    </EditorialBody>
  ),
};

// ============================================================
// EditorialSection Stories
// ============================================================

export const SectionDefault: StoryObj<typeof EditorialSection> = {
  name: "EditorialSection - Estándar",
  render: () => (
    <EditorialSection>
      <p>Contenido de la sección con padding medio y fondo cálido.</p>
    </EditorialSection>
  ),
};

export const SectionWithBleedTop: StoryObj<typeof EditorialSection> = {
  name: "EditorialSection - Bleed superior",
  render: () => (
    <EditorialSection bleed="top" bleedColor="#1e3a5f">
      <p>Contenido con bleed superior.</p>
    </EditorialSection>
  ),
};

export const SectionWithBleedBottom: StoryObj<typeof EditorialSection> = {
  name: "EditorialSection - Bleed inferior",
  render: () => (
    <EditorialSection bleed="bottom" bleedColor="#1e3a5f">
      <p>Contenido con bleed inferior.</p>
    </EditorialSection>
  ),
};

export const SectionStaggerReveal: StoryObj<typeof EditorialSection> = {
  name: "EditorialSection - Reveal con stagger",
  render: () => (
    <EditorialSection reveal="stagger">
      <p>Primer elemento</p>
      <p>Segundo elemento</p>
      <p>Tercer elemento</p>
    </EditorialSection>
  ),
};

export const SectionWhiteBg: StoryObj<typeof EditorialSection> = {
  name: "EditorialSection - Fondo blanco",
  render: () => (
    <EditorialSection bg="white" padding="lg">
      <p>Fondo blanco.</p>
    </EditorialSection>
  ),
};

export const SectionDarkBg: StoryObj<typeof EditorialSection> = {
  name: "EditorialSection - Fondo oscuro",
  render: () => (
    <EditorialSection bg="dark">
      <p className="text-white">Fondo oscuro.</p>
    </EditorialSection>
  ),
};

// ============================================================
// EditorialCarousel Stories
// ============================================================

const sampleItems: CarouselItem[] = [
  {
    id: "1",
    href: "/pasadias/epoca-precolombina-sur-colombia",
    image: "/image/makalu-colombia-3631740.jpg",
    title: "Epoca Precolombina",
    description: "Recorrido arqueológico por Colombia",
    meta: ["Tolima", "Cultura"],
    colorTheme: "naturaleza",
  },
  {
    id: "2",
    href: "/pasadias/tour-colombia-corazon-andes",
    image: "/image/ibague_torre-iglesia-guayacan-rosado.jpeg",
    title: "Corazón de los Andes",
    description: "Tour cultural por el Eje Cafetero",
    meta: ["Andes", "Cultura"],
    colorTheme: "cultura",
  },
  {
    id: "3",
    href: "/pasadias/tour-colombia-boyaca-colonial",
    image: "/image/villa de leyva.jpg",
    title: "Colonial Boyacá",
    description: "Pueblos coloniales de Boyacá",
    meta: ["Boyacá", "Historia"],
    colorTheme: "aventura",
  },
];

export const CarouselPasadia: StoryObj<typeof EditorialCarousel> = {
  name: "EditorialCarousel - Variante pasadia",
  render: () => (
    <EditorialCarousel
      items={sampleItems}
      config={{
        aspectRatio: "4:5",
        contentPosition: "bottom",
        showProgress: true,
        autoplay: true,
        variant: "pasadia",
      }}
    />
  ),
};

export const CarouselCircuito: StoryObj<typeof EditorialCarousel> = {
  name: "EditorialCarousel - Variante circuito",
  render: () => (
    <EditorialCarousel
      items={sampleItems}
      config={{
        aspectRatio: "16:9",
        contentPosition: "center",
        showProgress: false,
        autoplay: false,
        variant: "circuito",
      }}
    />
  ),
};

export const CarouselEditorialPreset: StoryObj<typeof EditorialCarousel> = {
  name: "EditorialCarousel - Variante editorial",
  render: () => (
    <EditorialCarousel
      items={sampleItems}
      config={{
        aspectRatio: "16:9",
        contentPosition: "split",
        showProgress: true,
        autoplay: true,
        variant: "editorial",
      }}
    />
  ),
};

// ============================================================
// HeroEditorial Stories
// ============================================================

const heroSlides: HeroSlide[] = [
  { src: "/image/makalu-colombia-3631740.jpg", alt: "Makalu Colorado" },
  { src: "/image/ibague_torre-iglesia-guayacan-rosado.jpeg", alt: "Torre de Iglesia" },
];

export const HeroKenBurns: StoryObj<typeof HeroEditorial> = {
  name: "HeroEditorial - Ken Burns",
  render: () => (
    <HeroEditorial
      variant="ken-burns"
      slides={heroSlides}
      title="Descubre Colombia"
      subtitle="Circuitos turísticos y experiencias inolvidables"
      badge="OnTour DMC"
      actions={[
        { label: "Cotizar viaje", href: "/contacto", variant: "primary" },
        { label: "Conoce más", href: "/nosotros", variant: "secondary" },
      ]}
    />
  ),
};

export const HeroStaticDetail: StoryObj<typeof HeroEditorial> = {
  name: "HeroEditorial - Static (detalle)",
  render: () => (
    <HeroEditorial
      variant="static"
      slides={[{ src: "/image/makalu-colombia-3631740.jpg", alt: "Makalu Colorado" }]}
      title="Época Precolombina"
      subtitle="Sur de Colombia"
      gradeClass="editorial-grade-cultura"
      overlay="bottom"
      actions={[{ label: "Reservar", href: "/contacto", variant: "primary" }]}
    />
  ),
};

// ============================================================
// SectionReveal Stories
// ============================================================

export const RevealFade: StoryObj<typeof SectionReveal> = {
  name: "SectionReveal - Fade predeterminado",
  render: () => (
    <SectionReveal>
      <div className="p-8 bg-editorial-warm rounded-2xl border border-editorial-border">
        <p>Texto que hace fade in al hacer scroll.</p>
      </div>
    </SectionReveal>
  ),
};

export const RevealStaggerList: StoryObj<typeof SectionReveal> = {
  name: "SectionReveal - Staggered list",
  render: () => (
    <SectionReveal className="space-y-4">
      <div key="1" className="p-4 bg-white rounded-xl border border-editorial-border">Primer bloque</div>
      <div key="2" className="p-4 bg-white rounded-xl border border-editorial-border">Segundo bloque</div>
      <div key="3" className="p-4 bg-white rounded-xl border border-editorial-border">Tercer bloque</div>
    </SectionReveal>
  ),
};

export const RevealSectionTag: StoryObj<typeof SectionReveal> = {
  name: "SectionReveal - Etiqueta section",
  render: () => (
    <SectionReveal as="section">
      <p>Contenido renderizado en elemento HTML &lt;section&gt;.</p>
    </SectionReveal>
  ),
};

// ============================================================
// Exports for external type testing
// ============================================================

export type { HeroVariant, HeroSlide } from "./HeroEditorial";
export type { CarouselConfig, CarouselItem } from "./EditorialCarousel";
export type { EditorialSectionProps } from "./EditorialSection";
export type { DisplayHeadingProps } from "./DisplayHeading";
export type { CaptionLabelProps } from "./CaptionLabel";
export type { EditorialBodyProps } from "./EditorialBody";
export type { SectionRevealProps } from "./SectionReveal";