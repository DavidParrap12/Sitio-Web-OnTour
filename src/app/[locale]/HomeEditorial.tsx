"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";

import { SectionReveal } from "@/components/editorial/SectionReveal";
import { HeroEditorial } from "@/components/editorial/HeroEditorial";
import { EditorialCarousel, type CarouselItem } from "@/components/editorial/EditorialCarousel";
import { EditorialParallax } from "@/components/editorial/EditorialParallax";
import { MagneticButton } from "@/components/editorial/MagneticButton";
import { type LogoItem } from "@/components/editorial/MarqueeLogos";
import { type DestinationTheme } from "@/lib/design-config";
import { ShieldCheck, Star, Clock } from "lucide-react";

import { WhyOnTour } from "@/components/editorial/WhyOnTour";
import { DestinationsShowcase } from "@/components/editorial/DestinationsShowcase";
import { TravelTradeB2B } from "@/components/editorial/TravelTradeB2B";
import { WellnessTeaser } from "@/components/editorial/WellnessTeaser";
import { FaqSection } from "@/components/editorial/FaqSection";
import { MobileStickyBar } from "@/components/editorial/MobileStickyBar";
import { RequestQuoteModal } from "@/components/RequestQuoteModal";

// Below-the-fold: code-split to keep First Load JS lean
const Testimonials = dynamic(
  () => import("@/components/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const MarqueeLogos = dynamic(
  () => import("@/components/editorial/MarqueeLogos").then((m) => ({ default: m.MarqueeLogos }))
);

// Institutional trust logos — shown prominently in trust strip
const TRUST_LOGOS: LogoItem[] = [
  { src: "/image/logo-aliados/marca-pa-s-colombia-logo-1.svg", alt: "Marca País Colombia",  width: 80 },
  { src: "/image/logo-aliados/assist-card-seeklogo.svg",        alt: "Assist Card",          width: 120 },
  { src: "/image/logo-aliados/Logo_Tolima_Principal.png",       alt: "Explora Tolima — Corazón de los Andes", width: 160, bgColor: "#1b4d2e" },
];

// Distribution platforms — shown in a secondary "Also find us on" strip
const DISTRIBUTION_LOGOS: LogoItem[] = [
  { src: "/image/logo-aliados/booking-ar21.svg",           alt: "Booking.com", width: 140 },
  { src: "/image/logo-aliados/tripadvisor-seeklogo.svg",   alt: "TripAdvisor", width: 130 },
  { src: "/image/logo-aliados/civitatis.svg",              alt: "Civitatis",   width: 130 },
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

// Hero slides with locale-aware alt texts — passed from the server component
const heroSlides = (locale: string) => {
  const isEN = locale === "en";
  const isDE = locale === "de";
  const isFR = locale === "fr";

  if (isEN) return [
    { src: "/image/makalu-colombia-3631740.jpg",                               alt: "Mountain landscape of Colombia — Andean heartland" },
    { src: "/image/cuidad-amurallada.jpg",                                      alt: "Walled City of Cartagena, Colombia" },
    { src: "/image/desierto-tatacoa.jpg",                                       alt: "Tatacoa Desert, Huila — Colombia" },
    { src: "/image/guatape.jpg",                                                alt: "Guatapé rock viewpoint, Antioquia — Colombia" },
  ];
  if (isDE) return [
    { src: "/image/makalu-colombia-3631740.jpg",   alt: "Berglandschaft Kolumbiens — Andenregion" },
    { src: "/image/cuidad-amurallada.jpg",          alt: "Ummauerte Stadt Cartagena, Kolumbien" },
    { src: "/image/desierto-tatacoa.jpg",           alt: "Tatacoa-Wüste, Huila — Kolumbien" },
    { src: "/image/guatape.jpg",                    alt: "Guatapé Fels, Antioquia — Kolumbien" },
  ];
  if (isFR) return [
    { src: "/image/makalu-colombia-3631740.jpg",   alt: "Paysage montagneux de Colombie — Cœur des Andes" },
    { src: "/image/cuidad-amurallada.jpg",          alt: "Ville fortifiée de Carthagène, Colombie" },
    { src: "/image/desierto-tatacoa.jpg",           alt: "Désert de Tatacoa, Huila — Colombie" },
    { src: "/image/guatape.jpg",                    alt: "Rocher de Guatapé, Antioquia — Colombie" },
  ];
  // ES default
  return [
    { src: "/image/makalu-colombia-3631740.jpg",   alt: "Paisaje montañoso de Colombia — corazón de los Andes" },
    { src: "/image/cuidad-amurallada.jpg",          alt: "Ciudad Amurallada de Cartagena, Colombia" },
    { src: "/image/desierto-tatacoa.jpg",           alt: "Desierto de la Tatacoa, Huila — Colombia" },
    { src: "/image/guatape.jpg",                    alt: "Peñol de Guatapé, Antioquia — Colombia" },
  ];
};

const CIRCUIT_PRICES: Record<string, Record<string, string>> = {
  "epoca-precolombina-sur-colombia": {
    es: "Desde $1.490 USD pp",
    en: "From $1,490 USD pp",
    de: "Ab $1.490 USD pp",
    fr: "À partir de $1 490 USD pp",
  },
  "tour-colombia-corazon-andes": {
    es: "Desde $1.980 USD pp",
    en: "From $1,980 USD pp",
    de: "Ab $1.980 USD pp",
    fr: "À partir de $1 980 USD pp",
  },
  "tour-colombia-boyaca-colonial": {
    es: "Desde $1.320 USD pp",
    en: "From $1,320 USD pp",
    de: "Ab $1.320 USD pp",
    fr: "À partir de $1 320 USD pp",
  },
};

export function HomeEditorial({ circuitos, t }: HomeEditorialProps) {
  const locale = t["_locale"] || "es";
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Limit to 3 signature journeys for home page (audit: avoid 9-card infinite scroll)
  const signatureJourneys = circuitos.slice(0, 3);

  const carouselItems: CarouselItem[] = signatureJourneys.map((c) => ({
    id: c.id,
    href: `/circuitos/${c.id}`,
    image: c.image,
    title: c.name,
    description: c.description,
    meta: [`${c.days}D / ${c.nights}N`],
    colorTheme: c.colorTheme,
    price: CIRCUIT_PRICES[c.id]?.[locale] || (locale === "es" ? "Desde $1.490 USD pp" : "From $1,490 USD pp"),
    ctaLabel: locale === "es" ? "Ver Itinerario" : locale === "de" ? "Reise ansehen" : locale === "fr" ? "Voir l'itinéraire" : "View Journey",
  }));

  return (
    <div className="min-h-screen">
      {/* 1. Hero ------------------------------------------------ */}
      <HeroEditorial
        slides={heroSlides(locale)}
        title={t["hero.title1"] || (locale === "es" ? "Colombia," : "COLOMBIA,")}
        titleAccent={t["hero.title2"] || (locale === "es" ? "Diseñada Para Ti." : "DESIGNED AROUND YOU.")}
        subtitle={t["hero.subtitle"] || "Private journeys · Local expertise · Seamless service"}
        badge={""}
        actions={[
          {
            label: t["hero.ctaContact"] || (locale === "es" ? "Planea tu Viaje" : "Plan Your Journey"),
            onClick: () => setQuoteModalOpen(true),
            variant: "primary",
          },
          {
            label: t["hero.ctaCircuits"] || (locale === "es" ? "Explora nuestras rutas ↓" : "Explore our journeys ↓"),
            href: "#circuitos-destacados",
            variant: "link",
          },
        ]}
      />

      {/* 2. Cinta de Métricas & Confianza (4 Métricas Principales + Sellos Institucionales) */}
      <section
        aria-label="Trust indicators — OnTour DMC credentials"
        className="bg-[#16352D] text-white py-5 px-4 md:px-8 border-y border-white/10"
      >
        <div className="container mx-auto">
          {/* 4 Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center justify-center text-center pb-4">
            {/* 1. RNT */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-0.5">
                {locale === "es" ? "Operador Habilitado" : "Licensed DMC"}
              </span>
              <span className="font-heading text-lg md:text-xl font-bold tracking-tight text-white">
                RNT 62212
              </span>
            </div>

            {/* 2. Google Rating */}
            <div className="flex flex-col items-center justify-center border-l border-white/10 pl-4 md:pl-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                <span className="font-heading text-lg md:text-xl font-bold text-white">5.0 / 5</span>
              </div>
              <span className="text-xs text-white/70 font-medium">
                {locale === "es" ? "40+ Reseñas en Google" : locale === "de" ? "40+ Google-Bewertungen" : locale === "fr" ? "40+ Avis Google" : "40+ Google Reviews"}
              </span>
            </div>

            {/* 3. Experience */}
            <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0">
              <span className="font-heading text-lg md:text-xl font-bold text-white mb-0.5">
                {locale === "es" ? "12+ Años" : "12+ Years"}
              </span>
              <span className="text-xs text-white/70 font-medium">
                {locale === "es" ? "Operando en Colombia" : locale === "de" ? "Vor Ort in Kolumbien" : locale === "fr" ? "Sur le terrain en Colombie" : "Operating in Colombia"}
              </span>
            </div>

            {/* 4. Response Time */}
            <div className="flex flex-col items-center justify-center border-t md:border-t-0 border-l border-white/10 pt-3 md:pt-0 pl-4 md:pl-0">
              <span className="font-heading text-lg md:text-xl font-bold text-emerald-300 mb-0.5">
                &lt; 24h
              </span>
              <span className="text-xs text-white/70 font-medium">
                {locale === "es" ? "Garantía de Respuesta" : locale === "de" ? "Antwortzeit-Garantie" : locale === "fr" ? "Délai de réponse garanti" : "Response SLA Guarantee"}
              </span>
            </div>
          </div>

          {/* Institutional Seals Row */}
          <div className="border-t border-white/10 pt-3.5 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <span className="text-[11px] uppercase tracking-wider text-white/40 font-medium">
              {locale === "es" ? "Avales & Coberturas" : locale === "de" ? "Zertifizierungen & Partner" : locale === "fr" ? "Agrément & Partenaires" : "Accreditations & Partners"}
            </span>
            <div className="flex items-center gap-6 sm:gap-8">
              {TRUST_LOGOS.map((logo) => (
                <div
                  key={logo.alt}
                  className="relative h-6 shrink-0 opacity-80 hover:opacity-100 transition-opacity"
                  style={{
                    width: logo.width ? Math.round(logo.width * 0.42) : 55,
                    ...(logo.bgColor ? { backgroundColor: logo.bgColor, padding: "2px 5px", borderRadius: "3px" } : {}),
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{ objectFit: "contain", height: "100%", width: "100%", filter: "brightness(0) invert(1)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Circuitos Destacados (3 experiencias con precio y duración) */}
      <section id="circuitos-destacados" className="relative -mt-2 pt-14 pb-20 md:pb-28 bg-[#faf8f4] editorial-section--bleed">
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
                aspectRatio: "16:9",
                contentPosition: "bottom",
                showProgress: false,
                autoplay: true,
                variant: "editorial",
              }}
              intervalMs={4000}
              ariaLabel={locale === "es" ? "Circuitos destacados" : locale === "de" ? "Ausgewählte Reisen" : locale === "fr" ? "Voyages sélectionnés" : "Signature journeys"}
            />
          </SectionReveal>
        </div>
      </section>

      {/* 4. Destinos (Corredores Turísticos de Colombia) */}
      <DestinationsShowcase locale={locale} />

      {/* 5. Why OnTour (Propuesta de Valor & 4 Pilares DMC) */}
      <WhyOnTour locale={locale} />

      {/* 6. Reseñas Enriquecidas (3 tarjetas visibles con país, fecha y Google Rating) */}
      <Testimonials />

      {/* 7. FAQ (Acordeón de Preguntas Frecuentes) */}
      <FaqSection locale={locale} />

      {/* 8. Teaser de Bienestar (Turismo Médico & Recuperación) */}
      <WellnessTeaser locale={locale} />

      {/* 9. Bloque B2B / Travel Trade (Para Agencias y Profesionales) */}
      <TravelTradeB2B locale={locale} />

      {/* 10. CTA Final (Parallax inmersivo con modal de cotización directa) */}
      <div
        className="editorial-gradient-bleed"
        style={{ "--bleed-color": "#faf8f4" } as React.CSSProperties}
      >
        <EditorialParallax
          src="/image/Tolima-fotos/tolima_palmas-cera-ladera-verde-cielo-azul.jpg"
          alt={
            locale === "en" ? "Wax palm trees in Tolima, Colombia — Andean heartland" :
            locale === "de" ? "Wachspalmen im Tolima, Kolumbien" :
            locale === "fr" ? "Palmiers de cire à Tolima, Colombie" :
            "Palmas de cera en Tolima, Colombia"
          }
          speed={0.25}
          minHeight="60vh"
          priority
          colorGrade="saturate(1.1) contrast(1.05) hue-rotate(-5deg)"
          contentAlign="center"
        >
          <div className="container mx-auto px-8 md:px-16 lg:px-24 text-center">
            <SectionReveal>
              <div className="max-w-2xl mx-auto">
                <h2 className="display-2 text-white mb-6 font-heading">{t["ctaTitle"]}</h2>
                <p className="body-lg text-white/85 mb-10">{t["ctaSubtitle"]}</p>
                <MagneticButton>
                  <button
                    type="button"
                    onClick={() => setQuoteModalOpen(true)}
                    className="inline-block bg-editorial-accent hover:bg-editorial-accent-hover text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl editorial-hover-rich cursor-pointer transition-all duration-300"
                  >
                    {t["ctaButton"]}
                  </button>
                </MagneticButton>
              </div>
            </SectionReveal>
          </div>
        </EditorialParallax>
      </div>

      {/* Persistent Mobile Sticky CTA Bar */}
      <MobileStickyBar locale={locale} onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* Fast Quote Modal */}
      <RequestQuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}
