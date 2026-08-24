"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import { MarqueeLogos, type LogoItem } from "@/components/editorial/MarqueeLogos";
import { ReconocimientosGallery } from "@/components/ReconocimientosGallery";

const BLUR_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

const ALIADOS: LogoItem[] = [
  { src: "/image/logo-aliados/booking-ar21.svg",           alt: "Booking.com",                      width: 140 },
  { src: "/image/logo-aliados/tripadvisor-seeklogo.svg",    alt: "TripAdvisor",                       width: 130 },
  { src: "/image/logo-aliados/civitatis.svg",               alt: "Civitatis",                         width: 130 },
  { src: "/image/logo-aliados/Logo_Tolima_Principal.png",   alt: "Explora Tolima Corazón de los Andes", width: 160, bgColor: "#1b4d2e" },
  { src: "/image/logo-aliados/marca-pa-s-colombia-logo-1.svg",    alt: "Marca País Colombia",                       width: 80 },
  { src: "/image/logo-aliados/assist-card-seeklogo.svg",    alt: "Assist Card",                       width: 120 },
];


interface NosotrosEditorialProps {
  title: string;
  subtitle: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  recognitionsTitle: string;
  recognitionsSubtitle: string;
  recognitionsClose: string;

}

export function NosotrosEditorial({
  title,
  subtitle,
  missionTitle,
  missionText,
  visionTitle,
  visionText,
  recognitionsTitle,
  recognitionsSubtitle,
  recognitionsClose,
}: NosotrosEditorialProps) {


  return (
    <div className="min-h-screen bg-editorial-warm">
      {/* -- Hero: SplitScroll style ---------------------------- */}
      <section className="flex flex-col lg:flex-row min-h-[80vh] editorial-section--bleed relative">
        {/* Image Side */}
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto">
          <Image
            src="/image/fotos-turistas/WhatsApp Image 2026-08-18 at 1.15.33 PM (1).jpeg"
            alt="Viajeros disfrutando Colombia con OnTour"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-editorial-warm/20" />
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-1/2 flex items-center px-8 md:px-16 lg:px-20 xl:px-28 py-16 lg:py-24">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="display-2 text-editorial-dark mb-6"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="body-lg text-editorial-muted"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>

        {/* Wave transition: hero (warm) → Mission/Vision (white) */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block">
            <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* -- Mission & Vision ----------------------------------- */}
      <section className="relative -mt-2 py-20 md:py-28 bg-white editorial-section--bleed">
        <SectionReveal className="editorial-stagger-variance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="relative p-10 md:p-14 rounded-3xl bg-editorial-warm border border-editorial-border">
              <h2 className="heading-1 text-editorial-dark mb-4">{missionTitle}</h2>
              <p className="body text-editorial-muted leading-relaxed">{missionText}</p>
            </div>

            {/* Vision */}
            <div className="relative p-10 md:p-14 rounded-3xl bg-editorial-warm border border-editorial-border">
              <h2 className="heading-1 text-editorial-dark mb-4">{visionTitle}</h2>
              <p className="body text-editorial-muted leading-relaxed">{visionText}</p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* -- Aliados / Partners ---------------------------------- */}
      <div className="relative bg-white">
        <MarqueeLogos logos={ALIADOS} speed={40} label="Aliados y plataformas" />
      </div>

      {/* -- Reconocimientos ------------------------------------- */}
      <section className="py-20 md:py-28 bg-white editorial-section--bleed relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionReveal className="editorial-stagger-variance">
            <div className="text-center mb-16">
              <h2 className="display-2 text-editorial-dark mb-4">{recognitionsTitle}</h2>
              <p className="body-lg text-editorial-muted mx-auto">{recognitionsSubtitle}</p>
            </div>
            <div>
              <ReconocimientosGallery closeLabel={recognitionsClose} />
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}