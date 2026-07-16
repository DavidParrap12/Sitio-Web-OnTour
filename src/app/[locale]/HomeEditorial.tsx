"use client";

import { Link } from "@/i18n/navigation";

import { SectionReveal } from "@/components/editorial/SectionReveal";
import { HeroEditorial } from "@/components/editorial/HeroEditorial";
import { RotatingPasadias } from "@/components/editorial/RotatingPasadias";
import { CircuitosCarousel } from "@/components/editorial/CircuitosCarousel";
import { Testimonials } from "@/components/Testimonials";

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
          { label: t["hero.ctaDayTrips"], href: `/${t["_locale"]}/pasadias`, variant: "primary" },
          { label: t["hero.ctaCircuits"], href: `/${t["_locale"]}/circuitos`, variant: "secondary" },
        ]}
      />

      {/* -- Pasadías Destacados (rotating) ---------------------- */}
      <section className="py-20 md:py-28 bg-editorial-warm">
        <div className="container mx-auto px-4 md:px-6">
          <SectionReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
              <div>
                <span className="label text-editorial-accent mb-3 block">Descubre Colombia</span>
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
      </section>

      {/* -- Circuitos Destacados (carousel) --------------------- */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <SectionReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
              <div>
                <span className="label text-editorial-accent mb-3 block">Rutas de varios días</span>
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
      </section>

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
