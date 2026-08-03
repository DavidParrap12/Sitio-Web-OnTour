"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { IMAGE_SIZES } from "@/lib/design-config";

interface HeroSlide {
  src: string;
  alt: string;
}

interface HeroEditorialProps {
  /** Slides to display (min 1) */
  slides: HeroSlide[];
  /** Hero headline — main title */
  title: string;
  /** Highlighted portion of the title (gradient text) */
  titleAccent?: string;
  /** Subtitle / tagline */
  subtitle?: string;
  /** Small badge text above the title */
  badge?: string;
  /** Slide interval in ms (default 6000) */
  intervalMs?: number;
  /** CTA buttons */
  actions?: Array<{
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  }>;
  /** Overlay intensity 0-1 (default 0.5) */
  overlayOpacity?: number;
  /** Minimum height (default "90vh") */
  minHeight?: string;
}

/**
 * Editorial full-bleed hero with Ken Burns effect, fluid typography,
 * and subtle parallax. Replaces the legacy Hero component when
 * DESIGN_FLAGS.home is enabled.
 */
export function HeroEditorial({
  slides,
  title,
  titleAccent,
  subtitle,
  badge,
  intervalMs = 6000,
  actions = [],
  overlayOpacity = 0.5,
  minHeight = "90vh",
}: HeroEditorialProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [next, intervalMs, slides.length]);

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight }}
    >
      {/* -- Background Slides ---------------------------------------- */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={slides[current].src}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            sizes={IMAGE_SIZES.hero}
            className="object-cover object-center"
            quality={80}
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* -- Overlay -------------------------------------------------- */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-editorial-dark/90"
        style={{ opacity: overlayOpacity + 0.3 }}
      />

      {/* -- Vignette ------------------------------------------------- */}
      <div className="absolute inset-0 editorial-overlay-vignette" />

      {/* -- Content -------------------------------------------------- */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center max-w-5xl pt-24 pb-16">
        {/* Badge */}
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 py-2.5 px-6 rounded-full bg-gradient-to-r from-editorial-accent/30 to-sky-500/20 backdrop-blur-xl border border-editorial-accent/40 text-white font-semibold text-sm md:text-base tracking-widest uppercase mb-10 shadow-[0_0_30px_rgba(28,126,214,0.3)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-editorial-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-editorial-accent" />
            </span>
            {badge}
          </motion.span>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="display-1 text-white mb-6"
        >
          {title}
          {titleAccent && (
            <>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-editorial-accent to-sky-400">
                {titleAccent}
              </span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="body-lg text-white/90 mx-auto mb-10 max-w-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href as any}
                className={`
                  w-full sm:w-auto flex items-center justify-center gap-2
                  px-8 py-4 rounded-full font-semibold text-lg
                  transition-all duration-300 shadow-lg
                  hover:shadow-xl hover:-translate-y-1
                  ${
                    action.variant === "secondary"
                      ? "bg-white/95 hover:bg-white text-editorial-dark"
                      : "bg-editorial-accent hover:bg-editorial-accent-hover text-white"
                  }
                `}
              >
                {action.label}
              </Link>
            ))}
          </motion.div>
        )}

        {/* Slide indicators */}
        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 mt-14">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ir a imagen ${i + 1}`}
                className={`transition-all duration-500 rounded-full ${
                  i === current
                    ? "bg-white w-10 h-1.5"
                    : "bg-white/30 hover:bg-white/60 w-4 h-1.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* -- Bottom Gradient Transition ------------------------------- */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
