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
  /** Blur placeholder data URL */
  blurDataURL?: string;
  /** Whether to apply color grading filter */
  colorGrade?: string;
  /** Vertical alignment of content: 'start' | 'center' | 'end' */
  contentAlign?: "start" | "center" | "end";
}

/**
 * Scroll-driven parallax background using Framer Motion's useScroll/useTransform.
 * Creates depth by moving background slower than foreground content.
 * Respects prefers-reduced-motion.
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
  blurDataURL,
  colorGrade,
  contentAlign = "center",
}: EditorialParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}%`, `${-speed * 100}%`]
  );

  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {/* Parallax background image via Next.js Image */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: prefersReducedMotion ? 0 : y,
          filter: colorGrade ?? "none",
          // Scale up slightly so parallax never shows edges (+buffer vs subpixel gaps)
          scale: 1 + speed * 2 + 0.04,
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
          {...(blurDataURL
            ? { placeholder: "blur" as const, blurDataURL }
            : {})}
        />
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

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}%`, `${-speed * 100}%`]
  );

  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight: "50vh" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          y: prefersReducedMotion ? 0 : y,
          filter: colorGrade ?? "none",
          scale: 1 + speed * 2 + 0.04,
        }}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}