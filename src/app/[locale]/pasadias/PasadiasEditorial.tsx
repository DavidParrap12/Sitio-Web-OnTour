"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { EditorialSection } from "@/components/editorial/EditorialSection";
import { ImageRevealClip } from "@/components/editorial/ImageRevealClip";
import { ParallaxFloat } from "@/components/editorial/ParallaxFloat";
import { CaptionLabel } from "@/components/editorial/CaptionLabel";
import { RotatingPasadias } from "@/components/editorial/RotatingPasadias";
import { IMAGE_SIZES, type DestinationTheme } from "@/lib/design-config";
import { resolveDestinationTheme } from "@/lib/hooks/useDestinationTheme";

const BLUR_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

interface PasadiaSlide {
  id: string;
  image: string;
  name: string;
  description: string;
  duration: string;
  brochureUrl?: string;
  colorTheme?: DestinationTheme;
}

interface PasadiasEditorialProps {
  slides: PasadiaSlide[];
  title: string;
  subtitle: string;
}

export function PasadiasEditorial({ slides, title, subtitle }: PasadiasEditorialProps) {
  return (
    <div className="min-h-screen bg-editorial-warm">
      {/* -- Split Hero: copy left, rotating cards right --------- */}
      <section className="relative overflow-hidden bg-editorial-dark">
        <ParallaxFloat speed={0.08} className="absolute inset-0">
          <Image
            src={slides[0]?.image || "/image/makalu-colombia-3631740.jpg"}
            alt="Pasadías Colombia"
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            priority
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </ParallaxFloat>
        <div className="absolute inset-0 bg-gradient-to-r from-editorial-dark/95 via-editorial-dark/70 to-editorial-dark/40" />
        <div className="absolute inset-0 editorial-overlay-vignette" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-20 pb-32 md:pt-28 md:pb-44">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <RotatingPasadias items={slides} />
            </motion.div>
          </div>
        </div>

        {/* Wave transition: Hero (dark) → Masonry (warm) */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block">
            <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="#faf8f4" />
          </svg>
        </div>
      </section>

      {/* -- Masonry Grid --------------------------------------- */}
      <EditorialSection bg="warm" bleed="bottom" bleedColor="#faf8f4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 editorial-stagger-variance">
              {slides.map((slide, i) => {
                const theme = resolveDestinationTheme(slide.colorTheme);
                // Asymmetric pattern: alternating large/small spans
                const isLarge = i % 3 === 0;
                const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4";
                const height = isLarge ? "h-[420px] md:h-[500px]" : "h-[350px] md:h-[500px]";

                return (
                  <ImageRevealClip
                    key={slide.id}
                    direction={isLarge ? "left" : "right"}
                    durationSec={0.9}
                    delaySec={(i % 3) * 0.08}
                    className={`${colSpan}`}
                  >
                    <Link
                      href={`/pasadias/${slide.id}` as any}
                      className={`group block relative overflow-hidden rounded-2xl ${height} editorial-hover-scale`}
                      style={theme.style}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.name}
                        fill
                        sizes={isLarge ? IMAGE_SIZES.cardHalf : IMAGE_SIZES.gallery}
                        className={`object-cover editorial-scale-target transition-transform duration-700 ${theme.gradeClass}`}
                        placeholder="blur"
                        blurDataURL={BLUR_PLACEHOLDER}
                      />

                      {/* Theme badge */}
                      {slide.colorTheme && (
                        <div
                          className="absolute top-4 left-4 z-10 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm"
                          style={{ backgroundColor: `${theme.color}dd` }}
                        >
                          {theme.label}
                        </div>
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-400" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <CaptionLabel icon="duration" className="text-white/70 mb-2">
                          {slide.duration}
                        </CaptionLabel>
                        <h3 className={`${isLarge ? "heading-1" : "heading-2"} text-white mb-2 group-hover:text-[var(--theme-accent-light)] transition-colors duration-300`}>
                          {slide.name}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {slide.description}
                        </p>
                      </div>
                    </Link>
                  </ImageRevealClip>
                );
              })}
        </div>
      </EditorialSection>
    </div>
  );
}
