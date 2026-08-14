"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import { MarqueeLogos, type LogoItem } from "@/components/editorial/MarqueeLogos";
import { ReconocimientosGallery } from "@/components/ReconocimientosGallery";

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
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        {/* Image Side */}
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto">
          <Image
            src="/image/on-tour-ofc-centro-2025-scaled.jpg"
            alt="Equipo OnTour"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-editorial-warm/20" />
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-1/2 flex items-center px-8 md:px-16 lg:px-20 xl:px-28 py-16 lg:py-24">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 py-2.5 px-6 rounded-full bg-gradient-to-r from-editorial-accent/30 to-sky-500/20 backdrop-blur-xl border border-editorial-accent/40 text-editorial-dark font-semibold text-sm md:text-base tracking-widest uppercase mb-6 shadow-[0_0_30px_rgba(28,126,214,0.15)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-editorial-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-editorial-accent" />
              </span>
              OnTour DMC Colombia
            </motion.span>
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
      </div>

      {/* -- Mission & Vision ----------------------------------- */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
              {/* Mission */}
              <div className="relative p-10 md:p-14 rounded-3xl bg-editorial-warm border border-editorial-border">
                <div className="w-14 h-14 rounded-2xl bg-destino-natural/10 flex items-center justify-center mb-6">
                  <span className="display-2 text-destino-natural leading-none" style={{ fontSize: '1.5rem' }}>M</span>
                </div>
                <h2 className="heading-1 text-editorial-dark mb-4">{missionTitle}</h2>
                <p className="body text-editorial-muted leading-relaxed">{missionText}</p>
              </div>

              {/* Vision */}
              <div className="relative p-10 md:p-14 rounded-3xl bg-editorial-warm border border-editorial-border">
                <div className="w-14 h-14 rounded-2xl bg-editorial-accent/10 flex items-center justify-center mb-6">
                  <span className="display-2 text-editorial-accent leading-none" style={{ fontSize: '1.5rem' }}>E</span>
                </div>
                <h2 className="heading-1 text-editorial-dark mb-4">{visionTitle}</h2>
                <p className="body text-editorial-muted leading-relaxed">{visionText}</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>


      {/* -- Aliados / Partners ---------------------------------- */}
      <SectionReveal>
        <div className="py-4">
          <p className="label text-editorial-muted text-center pt-10 pb-2">Aliados y plataformas</p>
          <MarqueeLogos logos={ALIADOS} speed={40} />
        </div>
      </SectionReveal>

      {/* -- Reconocimientos ------------------------------------- */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="display-2 text-editorial-dark mb-4">{recognitionsTitle}</h2>
              <p className="body-lg text-editorial-muted mx-auto">{recognitionsSubtitle}</p>
            </div>
            <ReconocimientosGallery closeLabel={recognitionsClose} />
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
