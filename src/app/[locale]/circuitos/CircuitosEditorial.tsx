"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import { CaptionLabel } from "@/components/editorial/CaptionLabel";
import { IMAGE_SIZES } from "@/lib/design-config";
import { Calendar, ArrowRight } from "lucide-react";

interface CircuitSlide {
  id: string;
  image: string;
  days: number;
  nights: number;
  name: string;
  description: string;
  price: string;
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
      <div className="relative h-[55vh] md:h-[60vh] flex items-end overflow-hidden">
        <Image
          src={heroImage || "/image/Nuquí-entre-ballenas–1.jpg"}
          alt="Circuitos Colombia"
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
            Aventuras de varios días
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

      {/* -- Circuit Cards -------------------------------------- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionReveal>
            <div className="space-y-6">
              {slides.map((slide, i) => (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link
                    href={`/circuitos/${slide.id}` as any}
                    className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-editorial-border editorial-hover-lift transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative w-full md:w-2/5 lg:w-1/3 h-64 md:h-auto md:min-h-[280px] editorial-hover-scale overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.name}
                        fill
                        sizes={IMAGE_SIZES.cardHalf}
                        className="object-cover editorial-scale-target transition-transform duration-700"
                      />
                      {/* Duration badge */}
                      <div className="absolute top-4 left-4 bg-editorial-dark/80 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-semibold">{slide.days}D / {slide.nights}N</span>
                      </div>
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
                        <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-editorial-border-light group-hover:bg-editorial-accent group-hover:text-white text-editorial-muted transition-all duration-300 flex-shrink-0 mt-2">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
