"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import { EditorialSection } from "@/components/editorial/EditorialSection";
import { ParallaxFloat } from "@/components/editorial/ParallaxFloat";
import { HeroCircuitPreview } from "@/components/editorial/HeroCircuitPreview";
import { CaptionLabel } from "@/components/editorial/CaptionLabel";
import { IMAGE_SIZES, type DestinationTheme } from "@/lib/design-config";
import { resolveDestinationTheme } from "@/lib/hooks/useDestinationTheme";
import { Calendar, ArrowRight } from "lucide-react";

const BLUR_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

interface CircuitSlide {
  id: string;
  image: string;
  days: number;
  nights: number;
  name: string;
  description: string;
  price: string;
  colorTheme?: DestinationTheme;
}

interface CircuitosEditorialProps {
  slides: CircuitSlide[];
  title: string;
  subtitle: string;
  heroImage?: string;
}

export function CircuitosEditorial({ slides, title, subtitle, heroImage }: CircuitosEditorialProps) {
  return (
    <div className="min-h-screen bg-editorial-warm">
      {/* -- Hero ------------------------------------------------ */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        <ParallaxFloat speed={0.1} className="absolute inset-0">
          <Image
            src={heroImage || "/image/portadas/Statues_at_San_Agustín_park_202608141341.jpeg"}
            alt="Circuitos Colombia"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </ParallaxFloat>
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/90 via-editorial-dark/40 to-transparent" />
        <div className="absolute inset-0 editorial-overlay-vignette" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-36 md:pt-44 lg:pt-48 pb-24 md:pb-32">
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

          {/* Timeline preview — horizontal scroll of circuits */}
          <div className="mt-12 md:mt-16">
            <HeroCircuitPreview items={slides} />
          </div>
        </div>

        {/* Wave transition: Hero (dark) → Cards (warm) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-px">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ display: 'block', marginBottom: -1 }}>
            <path d="M0,70 C360,10 1080,100 1440,30 L1440,100 L0,100 Z" fill="#faf8f4" />
          </svg>
        </div>
      </section>

      {/* -- Circuit Cards -------------------------------------- */}
      <EditorialSection bg="#faf8f4" reveal="stagger">
        <div className="space-y-6">
          {slides.map((slide, i) => {
            const theme = resolveDestinationTheme(slide.colorTheme);
            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={`/circuitos/${slide.id}` as any}
                  className="group relative flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-editorial-border editorial-hover-lift transition-all duration-300"
                  style={theme.style}
                >
                  {/* Theme accent edge (left on desktop, top on mobile) */}
                  <div
                    aria-hidden
                    className="md:absolute md:left-0 md:top-0 md:bottom-0 md:w-1.5 md:z-10 h-1.5 w-full"
                    style={{ backgroundColor: theme.color }}
                  />
                  {/* Image */}
                  <div className="relative w-full md:w-2/5 lg:w-1/3 h-64 md:h-auto md:min-h-[280px] editorial-hover-scale overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.name}
                      fill
                      sizes={IMAGE_SIZES.cardHalf}
                      className={`object-cover editorial-scale-target transition-transform duration-700 ${theme.gradeClass}`}
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                    {/* Duration badge */}
                    <div className="absolute top-4 left-4 bg-editorial-dark/80 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold">{slide.days}D / {slide.nights}N</span>
                    </div>
                    {slide.colorTheme && (
                      <div
                        className="absolute top-4 right-4 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm"
                        style={theme.badgeStyle}
                      >
                        {theme.label}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="heading-1 text-editorial-dark mb-3 group-hover:text-editorial-accent transition-colors duration-300">
                          {slide.name}
                        </h3>
                        <p className="body text-editorial-muted line-clamp-3 mb-5">
                          {slide.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                          <CaptionLabel icon="duration" className="text-editorial-muted">
                            {slide.days} días / {slide.nights} noches
                          </CaptionLabel>
                          {slide.price && (
                            <CaptionLabel icon="price" className="text-editorial-accent font-semibold">
                              {slide.price}
                            </CaptionLabel>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-editorial-border-light group-hover:bg-[var(--theme-accent)] group-hover:text-white text-editorial-muted transition-all duration-300 flex-shrink-0 mt-2">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </EditorialSection>
    </div>
  );
}
