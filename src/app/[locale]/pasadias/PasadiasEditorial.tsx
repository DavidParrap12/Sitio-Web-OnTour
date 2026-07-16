"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import { CaptionLabel } from "@/components/editorial/CaptionLabel";
import { IMAGE_SIZES } from "@/lib/design-config";

interface PasadiaSlide {
  id: string;
  image: string;
  name: string;
  description: string;
  duration: string;
  brochureUrl?: string;
}

interface PasadiasEditorialProps {
  slides: PasadiaSlide[];
  title: string;
  subtitle: string;
}

export function PasadiasEditorial({ slides, title, subtitle }: PasadiasEditorialProps) {
  return (
    <div className="min-h-screen bg-editorial-warm">
      {/* -- Hero ------------------------------------------------ */}
      <div className="relative h-[55vh] md:h-[60vh] flex items-end overflow-hidden">
        <Image
          src={slides[0]?.image || "/image/makalu-colombia-3631740.jpg"}
          alt="Pasadías Colombia"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/90 via-editorial-dark/40 to-transparent" />
        <div className="absolute inset-0 editorial-overlay-vignette" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-14 md:pb-20">
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 py-2.5 px-6 rounded-full bg-gradient-to-r from-editorial-accent/30 to-sky-500/20 backdrop-blur-xl border border-editorial-accent/40 text-white font-semibold text-sm md:text-base tracking-widest uppercase mb-8 shadow-[0_0_30px_rgba(28,126,214,0.3)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-editorial-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-editorial-accent" />
            </span>
            Experiencias de un día
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="display-1 text-white mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="body-lg text-white/90 max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* -- Masonry Grid --------------------------------------- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
              {slides.map((slide, i) => {
                // Asymmetric pattern: alternating large/small spans
                const isLarge = i % 3 === 0;
                const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4";
                const height = isLarge ? "h-[420px] md:h-[500px]" : "h-[350px] md:h-[500px]";

                return (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                    className={`${colSpan}`}
                  >
                    <Link
                      href={`/pasadias/${slide.id}` as any}
                      className={`group block relative overflow-hidden rounded-2xl ${height} editorial-hover-scale`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.name}
                        fill
                        sizes={isLarge ? IMAGE_SIZES.cardHalf : IMAGE_SIZES.gallery}
                        className="object-cover editorial-scale-target transition-transform duration-700"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-400" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <CaptionLabel icon="duration" className="text-white/70 mb-2">
                          {slide.duration}
                        </CaptionLabel>
                        <h3 className={`${isLarge ? "heading-1" : "heading-2"} text-white mb-2`}>
                          {slide.name}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {slide.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
