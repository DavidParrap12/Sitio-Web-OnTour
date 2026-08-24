import type { Meta, StoryObj } from "@storybook/react";
import { DisplayHeading } from "./DisplayHeading";
import { CaptionLabel } from "./CaptionLabel";
import { EditorialBody } from "./EditorialBody";
import { EditorialSection } from "./EditorialSection";
import { EditorialCarousel } from "./EditorialCarousel";
import { HeroEditorial } from "./HeroEditorial";
import { SectionReveal } from "./SectionReveal";

// ============================================================
// DisplayHeading
// ============================================================

const meta: Meta<typeof DisplayHeading> = {
  title: "Components/DisplayHeading",
  component: DisplayHeading,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DisplayHeading>;

// @ts-ignore — Storybook adds 'args' dynamically
export const H1Display: Story = {
  name: "H1 (display-1)",
  args: { as: "h1", variant: "display-1", children: "Título principal H1" },
};

export const H2Display: Story = {
  name: "H2 (display-2)",
  args: { as: "h2", variant: "display-2", children: "Subtítulo H2" },
};

export const H3Display: Story = {
  name: "H3 (heading-1)",
  args: { as: "h3", variant: "heading-1", children: "Tertiary heading" },
};

export const H4Display: Story = {
  name: "H4 (heading-2)",
  args: { as: "h4", variant: "heading-2", children: "Secondary heading" },
};

export const WithTheme: Story = {
  name: "Con tema destino",
  args: {
    as: "h2",
    theme: "naturaleza",
    children: "Experiencias en la naturaleza",
  },
};

// ============================================================
// CaptionLabel
// ============================================================

const captionMeta: Meta<typeof CaptionLabel> = {
  title: "Components/CaptionLabel",
  component: CaptionLabel,
  tags: ["autodocs"],
};

export default captionMeta;
type CaptionStory = StoryObj<typeof CaptionLabel>;

// @ts-ignore
export const LocationCaption: CaptionStory = {
  name: "Ubicación",
  args: {
    children: "Bogotá, Colombia",
    icon: "location",
  },
};

export const DurationCaption: CaptionStory = {
  name: "Duración",
  args: {
    children: "3 días / 4 noches",
    icon: "duration",
  },
};

export const PriceCaption: CaptionStory = {
  name: "Precio",
  args: {
    children: "$2.500.000 COP",
    icon: "price",
  },
};

export const GroupCaption: CaptionStory = {
  name: "Grupo",
  args: {
    children: "Hasta 10 personas",
    icon: "group",
  },
};

export const CaptionVariantLabel: CaptionStory = {
  name: "Variante label",
  args: {
    children: "2.500.000 COP",
    variant: "label",
    icon: "price",
  },
};

// ============================================================
// EditorialBody
// ============================================================

const bodyMeta: Meta<typeof EditorialBody> = {
  title: "Components/EditorialBody",
  component: EditorialBody,
  tags: ["autodocs"],
};

export default bodyMeta;
type BodyStory = StoryObj<typeof EditorialBody>;

export const BodyDefault: BodyStory = {
  name: "Cuerpo por defecto",
  args: { children: "Este es un párrafo de cuerpo con altura de línea óptima para lectura prolongada." },
};

export const BodyBodyLg: BodyStory = {
  name: "Cuerpo body-lg",
  args: { variant: "body-lg", children: "Este texto usa la variante body-lg con mayor altura de línea." },
};

export const BodyCentered: BodyStory = {
  name: "Cuerpo centrado",
  args: { centered: true, children: "Texto centrado en la pantalla." },
};

// ============================================================
// EditorialSection
// ============================================================

const sectionMeta: Meta<typeof EditorialSection> = {
  title: "Components/EditorialSection",
  component: EditorialSection,
  tags: ["autodocs"],
};

export default sectionMeta;
type SectionStory = StoryObj<typeof EditorialSection>;

export const SectionDefault: SectionStory = {
  name: "Sección estándar",
  args: {
    children: <p>Contenido de la sección con padding medio y fondo cálido.</p>,
  },
};

export const SectionWithBleedTop: SectionStory = {
  name: "Bleed en la parte superior",
  args: {
    bleed: "top",
    bleedColor: "#1e3a5f",
    children: <p>Contenido con bleed superior.</p>,
  },
};

export const SectionWithBleedBottom: SectionStory = {
  name: "Bleed en la parte inferior",
  args: {
    bleed: "bottom",
    bleedColor: "#1e3a5f",
    children: <p>Contenido con bleed inferior.</p>,
  },
};

export const SectionNoReveal: SectionStory = {
  name: "Sin reveal (fade)",
  args: {
    reveal: "none",
    children: <p>Contenido sin animación de reveal.</p>,
  },
};

export const SectionStaggerReveal: SectionStory = {
  name: "Reveal con stagger",
  args: {
    reveal: "stagger",
    staggerMs: 150,
    children: [
      <p key="1">Primer elemento</p>,
      <p key="2">Segundo elemento</p>,
      <p key="3">Tercer elemento</p>,
    ],
  },
};

export const SectionWarmBg: SectionStory = {
  name: "Fondo cálido",
  args: { bg: "warm", children: <p>Fondo cálido OnTour.</p> },
};

export const SectionWhiteBg: SectionStory = {
  name: "Fondo blanco",
  args: { bg: "white", padding: "lg", children: <p>Fondo blanco.</p> },
};

export const SectionDarkBg: SectionStory = {
  name: "Fondo oscuro",
  args: { bg: "dark", children: <p>Fondo oscuro.</p> },
};

// ============================================================
// EditorialCarousel
// ============================================================

const carouselMeta: Meta<typeof EditorialCarousel> = {
  title: "Components/EditorialCarousel",
  component: EditorialCarousel,
  tags: ["autodocs"],
};

export default carouselMeta;
type CarouselStory = StoryObj<typeof EditorialCarousel>;

const sampleItems = [
  {
    id: "1",
    href: "/pasadias/epoca-precolombina-sur-colombia",
    image: "/image/makalu-colombia-3631740.jpg",
    title: "Epoca Precolombina",
    description: "Recorrido arqueológico por Colombia",
    meta: ["Tolima", "Cultura"],
    colorTheme: { grade: "naturaleza", label: "naturaleza", color: "#3b82f6", badgeStyle: { color: "#e2e8f0" } },
  },
  {
    id: "2",
    href: "/pasadias/tour-colombia-corazon-andes",
    image: "/image/ibague_torre-iglesia-guayacan-rosado.jpeg",
    title: "Corazón de los Andes",
    description: "Tour cultural por el Eje Cafetero",
    meta: ["Andes", "Cultura"],
    colorTheme: { grade: "cultura", label: "cultura", color: "#f97316", badgeStyle: { color: "#fffaf0" } },
  },
  {
    id: "3",
    href: "/pasadias/tour-colombia-boyaca-colonial",
    image: "/image/villa de leyva.jpg",
    title: "Colonial Boyacá",
    description: "Pueblos coloniales de Boyacá",
    meta: ["Boyacá", "Historia"],
    colorTheme: { grade: "naturaleza", label: "naturaleza", color: "#3b82f6", badgeStyle: { color: "#e2e8f0" } },
  },
];

export const CarouselPasadia: CarouselStory = {
  name: "Variante pasadia",
  args: {
    items: sampleItems.slice(0, 3),
    config: {
      aspectRatio: "4:5",
      contentPosition: "bottom",
      showProgress: true,
      autoplay: true,
      variant: "pasadia",
    },
  },
};

export const CarouselCircuito: CarouselStory = {
  name: "Variante circuito",
  args: {
    items: sampleItems.slice(0, 3),
    config: {
      aspectRatio: "16:9",
      contentPosition: "center",
      showProgress: false,
      autoplay: false,
      variant: "circuito",
    },
  },
};

export const CarouselEditorial: CarouselStory = {
  name: "Variante editorial",
  args: {
    items: sampleItems.slice(0, 3),
    config: {
      aspectRatio: "16:9",
      contentPosition: "split",
      showProgress: true,
      autoplay: true,
      variant: "editorial",
    },
  },
};

export const CarouselWithCustomSlide: CarouselStory = {
  name: "Slide personalizado",
  args: {
    items: sampleItems.slice(0, 2),
    config: {
      aspectRatio: "16:9",
      contentPosition: "bottom",
      showProgress: false,
      autoplay: false,
      variant: "editorial",
    },
    renderSlide: (item) => (
      <div
        className="p-4 border rounded-lg bg-white shadow-sm"
        style={{ borderColor: "#e2e8f0" }}
      >
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
    ),
  },
};

// ============================================================
// HeroEditorial
// ============================================================

const heroMeta: Meta<typeof HeroEditorial> = {
  title: "Components/HeroEditorial",
  component: HeroEditorial,
  tags: ["autodocs"],
};

export default heroMeta;
type HeroStory = StoryObj<typeof HeroEditorial>;

const heroSlides = [
  { src: "/image/makalu-colombia-3631740.jpg", alt: "Makalu Colorado" },
  { src: "/image/ibague_torre-iglesia-guayacan-rosado.jpeg", alt: "Torre de Iglesia" },
];

export const KenBurnsDefault: HeroStory = {
  name: "Ken Burns (por defecto)",
  args: {
    variant: "ken-burns",
    slides: heroSlides,
    title: "Descubre Colombia",
    subtitle: "Circuitos turísticos y experiencias inolvidables",
    badge: "OnTour DMC",
    actions: [
      { label: "Cotar viaje", href: "/cotizar", variant: "primary" },
      { label: "Conocé más", href: "/nosotros", variant: "secondary" },
    ],
  },
};

export const KenBurnsReducedMotion: HeroStory = {
  name: "Ken Burns motion-reduced",
  args: {
    variant: "ken-burns",
    slides: heroSlides,
    title: "Descubre Colombia",
    subtitle: "Circuitos turísticos y experiencias inolvidables",
    intervalMs: 0,
  },
};

export const StaticDetail: HeroStory = {
  name: "Static (página de detalle)",
  args: {
    variant: "static",
    slides: [{ src: "/image/makalu-colombia-3631740.jpg", alt: "Makalu Colorado" }],
    title: "Epoca Precolombina",
    subtitle: "Sur de Colombia",
    gradeClass: "grade-naturaleza",
    overlay: "bottom",
    actions: [
      { label: "Reservar", href: "/contacto", variant: "primary" },
    ],
  },
};

export const StaticWithChildren: HeroStory = {
  name: "Static con children",
  args: {
    variant: "static",
    slides: [{ src: "/image/makalu-colombia-3631740.jpg", alt: "Makalu Colorado" }],
    title: "Personalizado",
    subtitle: "Hero a medida",
    children: (
      <div className="space-y-6">
        <p>Texto introductorio personalizado</p>
        <ul>
          <li>Característica 1</li>
          <li>Característica 2</li>
        </ul>
      </div>
    ),
  },
};

// ============================================================
// SectionReveal
// ============================================================

const revealMeta: Meta<typeof SectionReveal> = {
  title: "Components/SectionReveal",
  component: SectionReveal,
  tags: ["autodocs"],
};

export default revealMeta;
type RevealStory = StoryObj<typeof SectionReveal>;

export const RevealDefault: RevealStory = {
  name: "Reveal fade (predeterminado)",
  args: {
    children: <p>Texto que se fade in al hacer scroll.</p>,
  },
};

export const RevealStagger: RevealStory = {
  name: "Reveal staggered",
  args: {
    children: [
      <p key="1">Primer bloque</p>,
      <p key="segundo">Segundo bloque</p>,
      <p key="tercero">Tercer bloque</p>,
    ],
    staggerMs: 100,
  },
};

export const RevealReducedMotion: RevealStory = {
  name: "Reveal motion-reduced",
  args: {
    children: <p>Texto sin animación en modo reduced-motion.</p>,
  },
};

export const RevealAsSection: RevealStory = {
  name: "Usar etiqueta section",
  args: {
    as: "section",
    children: <p>Contenido en etiqueta section.</p>,
  },
};

// ============================================================
// Export type utils for testing
// ============================================================

export type { HeroVariant } from "./HeroEditorial";
export type { CarouselConfig, CarouselItem } from "./EditorialCarousel";
export type { EditorialSectionProps } from "./EditorialSection";
export type { DisplayHeadingProps } from "./DisplayHeading";
export type { CaptionLabelProps } from "./CaptionLabel";
export type { EditorialBodyProps } from "./EditorialBody";
export type { SectionRevealProps } from "./SectionReveal";