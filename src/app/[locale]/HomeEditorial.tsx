"use client";

import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";

import { SectionReveal } from "@/components/editorial/SectionReveal";
import { HeroEditorial } from "@/components/editorial/HeroEditorial";
import { EditorialCarousel, type CarouselItem } from "@/components/editorial/EditorialCarousel";
import { EditorialParallax } from "@/components/editorial/EditorialParallax";
import { MagneticButton } from "@/components/editorial/MagneticButton";
import { type LogoItem } from "@/components/editorial/MarqueeLogos";
import { type DestinationTheme } from "@/lib/design-config";

// Below-the-fold: code-split to keep First Load JS lean
const Testimonials = dynamic(
  () => import("@/components/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const MarqueeLogos = dynamic(
  () => import("@/components/editorial/MarqueeLogos").then((m) => ({ default: m.MarqueeLogos }))
);

const BLUR_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

const ALIADOS: LogoItem[] = [
  { src: "/image/logo-aliados/booking-ar21.svg",           alt: "Booking.com",                      width: 140 },
  { src: "/image/logo-aliados/tripadvisor-seeklogo.svg",    alt: "TripAdvisor",                       width: 130 },
  { src: "/image/logo-aliados/civitatis.svg",               alt: "Civitatis",                         width: 130 },
  { src: "/image/logo-aliados/Logo_Tolima_Principal.png",   alt: "Explora Tolima Corazón de los Andes", width: 160, bgColor: "#1b4d2e" },
  { src: "/image/logo-aliados/marca-pa-s-colombia-logo-1.svg",    alt: "Marca País Colombia",                       width: 80 },
  { src: "/image/logo-aliados/assist-card-seeklogo.svg",    alt: "Assist Card",                       width: 120 },
];

interface CircuitoData {
  id: string;
  image: string;
  days: number;
  nights: number;
  name: string;
  description: string;
  colorTheme?: DestinationTheme;
}

interface HomeEditorialProps {
  circuitos: CircuitoData[];
  t: Record<string, string>;
}

const heroSlides = [
  { src: "/image/makalu-colombia-3631740.jpg", alt: "Paisaje montañoso de Colombia" },
  { src: "/image/cuidad-amurallada.jpg", alt: "Ciudad Amurallada de Cartagena" },
  { src: "/image/desierto-tatacoa.jpg", alt: "Desierto de la Tatacoa" },
  { src: "/image/guatape.jpg", alt: "Guatapé" },
];

export function HomeEditorial({ circuitos, t }: HomeEditorialProps) {
  const carouselItems: CarouselItem[] = circuitos.map((c) => ({
    id: c.id,
    href: `/circuitos/${c.id}`,
    image: c.image,
    title: c.name,
    description: c.description,
    meta: [`${c.days}D / ${c.nights}N`],
    colorTheme: c.colorTheme,
  }));

  return (
    <div className="min-h-screen">
      {/* -- Hero ------------------------------------------------ */}
      <HeroEditorial
        slides={heroSlides}
        title={t["hero.title1"]}
        titleAccent={t["hero.title2"]}
        subtitle={t["hero.subtitle"]}
        badge={t["hero.tagline"]}
        actions={[
          { label: t["hero.ctaCircuits"], href: "/circuitos", variant: "primary" },
          { label: t["hero.ctaContact"], href: "/contacto", variant: "secondary" },
        ]}
      />



      {/* -- Circuitos Destacados (carousel) --------------------- */}
      <section className="relative -mt-2 pt-14 pb-20 md:pb-28 bg-[#faf8f4] editorial-section--bleed">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <SectionReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
              <div>
                <span className="label text-editorial-accent mb-3 block">{t["multiDayRoutes"]}</span>
                <h2 className="display-2 text-editorial-dark italic font-heading">{t["memorableCircuits"]}</h2>
                <p className="body text-editorial-muted mt-2">{t["memorableCircuitsSubtitle"]}</p>
              </div>
              <Link
                href={"/circuitos" as any}
                className="text-editorial-accent font-semibold hover:underline underline-offset-4 transition-all flex items-center gap-1 whitespace-nowrap"
              >
                {t["viewAllCircuits"]}
              </Link>
            </div>

            <EditorialCarousel
              items={carouselItems}
              config={{
                aspectRatio: "4:5",
                contentPosition: "bottom",
                showProgress: false,
                autoplay: true,
                variant: "editorial",
              }}
              intervalMs={4000}
              ariaLabel="Circuitos destacados"
            />
          </SectionReveal>
        </div>
      </section>

      {/* -- Aliados strip --------------------------------------- */}
      <div className="relative py-4 bg-[#faf8f4]">
        <MarqueeLogos logos={ALIADOS} speed={38} label="Plataformas y aliados estratégicos" bgColor="#faf8f4" />
      </div>

      {/* -- Testimonials ---------------------------------------- */}
      <Testimonials />

      {/* -- CTA ------------------------------------------------- */}
      <div
        className="editorial-gradient-bleed"
        style={{ "--bleed-color": "#faf8f4" } as React.CSSProperties}
      >
      <EditorialParallax
        src="/image/islas-corales-del-rosario.jpeg"
        alt="Islas corales del rosario, Colombia"
        speed={0.25}
        minHeight="60vh"
        priority
        blurDataURL={BLUR_PLACEHOLDER}
        colorGrade="saturate(1.1) contrast(1.05) hue-rotate(-5deg)"
        contentAlign="center"
      >
        <div className="container mx-auto px-8 md:px-16 lg:px-24 text-center">
          <SectionReveal>
            <div className="max-w-2xl mx-auto">
              <h2 className="display-2 text-white mb-6 font-heading">{t["ctaTitle"]}</h2>
              <p className="body-lg text-white/85 mb-10">{t["ctaSubtitle"]}</p>
              <MagneticButton>
                <Link
                  href={"/contacto" as any}
                  className="inline-block bg-editorial-accent text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl editorial-hover-rich"
                >
                  {t["ctaButton"]}
                </Link>
              </MagneticButton>
            </div>
          </SectionReveal>
        </div>
      </EditorialParallax>
      </div>
    </div>
  );
}
