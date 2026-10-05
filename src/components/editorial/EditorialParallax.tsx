"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface EditorialParallaxProps {
  /** Background image source */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Parallax speed multiplier (0.1 - 0.5 typical) */
  speed?: number;
  /** Minimum height */
  minHeight?: string;
  /** Content to overlay */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
  /** Override background position */
  objectPosition?: string;
  /** Override object fit */
  objectFit?: "cover" | "contain" | "fill";
  /** Priority loading for hero images */
  priority?: boolean;
  /** @deprecated — unused, kept for API compat */
  blurDataURL?: string;
  /** CSS filter string applied to the image (e.g. "saturate(1.1)") */
  colorGrade?: string;
  /** Vertical alignment of content: 'start' | 'center' | 'end' */
  contentAlign?: "start" | "center" | "end";
}

/**
 * Scroll-driven parallax background using Framer Motion's useScroll/useTransform.
 * Creates depth by moving background slower than foreground content.
 * Respects prefers-reduced-motion.
 *
 * WHY NO scale():
 *   Combining CSS `filter` (colorGrade) with a `scale` transform forces the
 *   browser to rasterize the compositing layer at a reduced resolution, producing
 *   visible blur. Instead, the image container extends beyond its parent by the
 *   parallax travel distance (speed × 100%) so translateY never exposes edges —
 *   no pixel-stretching, full native sharpness.
 */
export function EditorialParallax({
  src,
  alt,
  speed = 0.3,
  minHeight = "60vh",
  children,
  className = "",
  objectPosition = "center",
  priority = false,
  colorGrade,
  contentAlign = "center",
}: EditorialParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = speed * 100; // percentage the image travels over the scroll range

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${travel}%`, `${-travel}%`]
  );

  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {/*
        Image wrapper: bleeds `travel%` above and below the visible container.
        This is the "room" the translateY consumes, so edges are never exposed
        even without scaling pixels.
      */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `-${travel}%`,
          bottom: `-${travel}%`,
          y: prefersReducedMotion ? 0 : y,
          willChange: "transform",
        }}
      >
        {/* filter lives on its own div so it never combines with the transform layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            filter: colorGrade ?? "none",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition }}
            priority={priority}
            quality={90}
          />
        </div>
      </motion.div>

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-editorial-dark/80 via-editorial-dark/50 to-editorial-dark/20" />

      {/* Content */}
      {children && (
        <div
          className={`relative z-10 w-full h-full flex items-${contentAlign} py-20 md:py-28`}
          style={{ minHeight }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Simpler parallax for section backgrounds — no content children,
 * just applies parallax to a background image on a section.
 */
export function SectionParallax({
  src,
  alt,
  speed = 0.15,
  className = "",
  colorGrade,
  children,
}: Omit<EditorialParallaxProps, "minHeight" | "priority" | "blurDataURL"> & {
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = speed * 100;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${travel}%`, `${-travel}%`]
  );

  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight: "50vh" }}
    >
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `-${travel}%`,
          bottom: `-${travel}%`,
          y: prefersReducedMotion ? 0 : y,
          willChange: "transform",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            filter: colorGrade ?? "none",
          }}
        >
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
          />
        </div>
      </motion.div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}