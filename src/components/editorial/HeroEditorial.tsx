"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { IMAGE_SIZES } from "@/lib/design-config";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { MagneticButton } from "./MagneticButton";
import { ParallaxFloat } from "./ParallaxFloat";

export interface HeroSlide {
  src: string;
  alt: string;
}

export type HeroVariant = "ken-burns" | "static";

interface HeroEditorialProps {
  /** Visual preset: ken-burns rotates slides; static shows slides[0] */
  variant?: HeroVariant;
  /** Slides to display (min 1; static uses the first) */
  slides: HeroSlide[];
  /** Hero headline — main title (optional when children provided) */
  title?: string;
  /** Highlighted portion of the title */
  titleAccent?: string;
  /** Subtitle / tagline */
  subtitle?: string;
  /** Small badge text above the title */
  badge?: string;
  /** Slide interval in ms (default 6000, ken-burns only) */
  intervalMs?: number;
  /** CTA buttons */
  actions?: Array<{
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  }>;
  /** Minimum height (default "90vh") */
  minHeight?: string;
  /** Color grading class applied to images (e.g. theme.gradeClass) */
  gradeClass?: string;
  /** Overlay style: cinematic (home-style fade) or bottom (heavy to-top gradient) */
  overlay?: "cinematic" | "bottom";
  /** Vertical content alignment (default: center for ken-burns, end for static) */
  align?: "center" | "end";
  /** Custom content block — replaces the built-in title/subtitle/actions */
  children?: ReactNode;
}

/**
 * Unified editorial hero.
 * - ken-burns: rotating full-bleed slides with parallax, CTAs and wave transition.
 * - static: single image hero (detail pages) with custom content slot.
 * Both respect prefers-reduced-motion.
 */
export function HeroEditorial({
  variant = "ken-burns",
  slides,
  title,
  titleAccent,
  subtitle,
  badge,
  intervalMs = 6000,
  actions = [],
  minHeight = "90vh",
  gradeClass = "",
  overlay = "cinematic",
  align,
  children,
}: HeroEditorialProps) {
  const [current, setCurrent] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const isKenBurns = variant === "ken-burns";
  const alignV = align ?? (isKenBurns ? "center" : "end");

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isKenBurns || slides.length <= 1) return;
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [next, intervalMs, slides.length, isKenBurns]);

  const slideTransition = prefersReducedMotion
    ? { duration: 0 } as const
    : { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const };

  const contentTransition = prefersReducedMotion
    ? { duration: 0 } as const
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div
      className={`relative flex ${alignV === "end" ? "items-end" : "items-center"} justify-center overflow-hidden`}
      style={{ minHeight }}
    >
      {/* -- Background ------------------------------------------------ */}
      {isKenBurns ? (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={slides[current].src}
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
            animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={slideTransition}
            className="absolute inset-0"
          >
            <ParallaxFloat speed={0.06} className="absolute inset-0">
              <Image
                src={slides[current].src}
                alt={slides[current].alt}
                fill
                sizes={IMAGE_SIZES.hero}
                className={`object-cover object-center ${gradeClass}`}
                quality={80}
                priority={current === 0}
              />
            </ParallaxFloat>
          </motion.div>
        </AnimatePresence>
      ) : (
        <ParallaxFloat speed={0.06} className="absolute inset-0">
          <Image
            src={slides[0].src}
            alt={slides[0].alt}
            fill
            sizes={IMAGE_SIZES.hero}
            className={`object-cover object-center ${gradeClass}`}
            quality={80}
            priority
          />
        </ParallaxFloat>
      )}

      {/* -- Overlay --------------------------------------------------- */}
      {overlay === "bottom" ? (
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/90 via-editorial-dark/40 to-transparent" />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(0,0,0,0.2) 0%,
              rgba(0,0,0,0.35) 50%,
              rgba(0,0,0,0.75) 85%,
              rgba(0,0,0,0.92) 100%
            )`
          }}
        />
      )}

      {/* -- Vignette -------------------------------------------------- */}
      <div className="absolute inset-0 editorial-overlay-vignette" />

      {/* -- Content --------------------------------------------------- */}
      {children ? (
        <div className="relative z-10 w-full">{children}</div>
      ) : (
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 text-left max-w-full md:max-w-[52%] pt-24 pb-16">
          {/* Badge — solo SEO, invisible al usuario */}
          <span className="sr-only">
            Descubre Colombia con OnTour DMC — Circuitos turísticos y experiencias inolvidables
          </span>

          {/* Title */}
          <motion.h1
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ ...contentTransition, delay: 0.2 }}
            className="display-1 text-white mb-6"
          >
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="text-white">
                  {titleAccent}
                </span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ ...contentTransition, delay: 0.35 }}
              className="body-lg text-white/90 mb-10 max-w-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ ...contentTransition, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start justify-start gap-4"
            >
              {actions.map((action) => (
                <MagneticButton key={action.href} className="w-full sm:w-auto">
                  <Link
                    href={action.href as any}
                    className={`
                      w-full sm:w-auto flex items-center justify-center gap-2
                      px-8 py-4 rounded-full font-semibold text-lg
                      editorial-hover-rich shadow-lg
                      ${
                        action.variant === "secondary"
                          ? "editorial-hover-shift-accent bg-white/95 text-editorial-dark"
                          : "bg-editorial-accent text-white hover:bg-editorial-accent-hover"
                      }
                    `}
                  >
                    {action.label}
                  </Link>
                </MagneticButton>
              ))}
            </motion.div>
          )}

          {/* Slide indicators (ken-burns only) */}
          {isKenBurns && slides.length > 1 && (
            <div className="flex items-center justify-start gap-2.5 mt-14">
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
      )}

      {/* -- Wave transition (ken-burns only) --------------------------- */}
      {isKenBurns && (
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block">
            <path
              d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z"
              fill="#faf8f4"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
