"use client";

import { Link } from "@/i18n/navigation";

import { SectionReveal } from "@/components/editorial/SectionReveal";
import { HeroEditorial } from "@/components/editorial/HeroEditorial";
import { RotatingPasadias } from "@/components/editorial/RotatingPasadias";
import { CircuitosCarousel } from "@/components/editorial/CircuitosCarousel";
import { MarqueeLogos, type LogoItem } from "@/components/editorial/MarqueeLogos";
import { Testimonials } from "@/components/Testimonials";

const ALIADOS: LogoItem[] = [
  { src: "/image/logo-aliados/booking-ar21.svg",           alt: "Booking.com",                      width: 140 },
  { src: "/image/logo-aliados/tripadvisor-seeklogo.svg",    alt: "TripAdvisor",                       width: 130 },
  { src: "/image/logo-aliados/civitatis.svg",               alt: "Civitatis",                         width: 130 },
  { src: "/image/logo-aliados/Logo_Tolima_Principal.png",   alt: "Explora Tolima Corazón de los Andes", width: 160, bgColor: "#1b4d2e" },
  { src: "/image/logo-aliados/procolombia-seeklogo.png",    alt: "ProColombia",                       width: 140 },
  { src: "/image/logo-aliados/assist-card-seeklogo.svg",    alt: "Assist Card",                       width: 120 },
];

interface PasadiaData {
  id: string;
  image: string;
  name: string;
  description: string;
  duration: string;
}

interface CircuitoData {
  id: string;
  image: string;
  days: number;
  nights: number;
  name: string;
  description: string;
}

interface HomeEditorialProps {
  pasadias: PasadiaData[];
  circuitos: CircuitoData[];
  t: Record<string, string>;
}

const heroSlides = [
  { src: "/image/makalu-colombia-3631740.jpg", alt: "Paisaje montañoso de Colombia" },
  { src: "/image/cuidad-amurallada.jpg", alt: "Ciudad Amurallada de Cartagena" },
  { src: "/image/desierto-tatacoa.jpg", alt: "Desierto de la Tatacoa" },
  { src: "/image/guatape.jpg", alt: "Guatapé" },
];

export function HomeEditorial({ pasadias, circuitos, t }: HomeEditorialProps) {
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
          { label: t["hero.ctaDayTrips"], href: "/pasadias", variant: "primary" },
          { label: t["hero.ctaCircuits"], href: "/circuitos", variant: "secondary" },
        ]}
      />

      {/* -- Gradiente Hero → Pasadías --------------------------- */}
      <div
        aria-hidden="true"
        className="h-24 -mt-24 relative z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #f0f6fc)" }}
      />

      {/* -- Pasadías Destacados (rotating) ---------------------- */}
      <section className="relative pt-4 pb-20 md:pb-28 bg-editorial-warm">
        <div className="container mx-auto px-4 md:px-6">
          <SectionReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
              <div>
                <span className="label text-editorial-accent mb-3 block">{t["discoverColombia"]}</span>
                <h2 className="display-2 text-editorial-dark">{t["popularDayTrips"]}</h2>
                <p className="body text-editorial-muted mt-2">{t["popularDayTripsSubtitle"]}</p>
              </div>
              <Link
                href={"/pasadias" as any}
                className="text-editorial-accent font-semibold hover:underline underline-offset-4 transition-all flex items-center gap-1 whitespace-nowrap"
              >
                {t["viewAllDayTrips"]}
              </Link>
            </div>

            <RotatingPasadias items={pasadias} interval={5000} />
          </SectionReveal>
        </div>

        {/* Gradiente Pasadías → Circuitos (warm → white) */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />
      </section>

      {/* -- Circuitos Destacados (carousel) --------------------- */}
      <section className="relative pt-8 pb-20 md:pb-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <SectionReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
              <div>
                <span className="label text-editorial-accent mb-3 block">{t["multiDayRoutes"]}</span>
                <h2 className="display-2 text-editorial-dark">{t["memorableCircuits"]}</h2>
                <p className="body text-editorial-muted mt-2">{t["memorableCircuitsSubtitle"]}</p>
              </div>
              <Link
                href={"/circuitos" as any}
                className="text-editorial-accent font-semibold hover:underline underline-offset-4 transition-all flex items-center gap-1 whitespace-nowrap"
              >
                {t["viewAllCircuits"]}
              </Link>
            </div>

            <CircuitosCarousel items={circuitos} />
          </SectionReveal>
        </div>

        {/* Gradiente Circuitos → Marquee (white → warm-alt) */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #e4eef8)" }}
        />
      </section>

      {/* -- Aliados strip --------------------------------------- */}
      <MarqueeLogos logos={ALIADOS} speed={38} label="Plataformas y aliados estratégicos" />

      {/* -- Testimonials ---------------------------------------- */}
      <Testimonials />

      {/* -- CTA ------------------------------------------------- */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-editorial-dark">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <SectionReveal>
            <h2 className="display-2 text-white mb-6">{t["ctaTitle"]}</h2>
            <p className="body-lg text-white/60 mx-auto mb-10">{t["ctaSubtitle"]}</p>
            <Link
              href={"/contacto" as any}
              className="inline-block bg-editorial-accent hover:bg-editorial-accent-hover text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {t["ctaButton"]}
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
