"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export interface SectionRevealProps {
  /** Content to animate in */
  children: ReactNode;
  /** Stagger delay between children in ms (default 100) */
  staggerMs?: number;
  /** Y offset to animate from (default 40) */
  yOffset?: number;
  /** Additional CSS classes for the wrapper */
  className?: string;
  /** HTML element to render (default div) */
  as?: "div" | "section" | "article";
}

/**
 * Scroll-triggered reveal wrapper using Framer Motion.
 * Fades in + slides up when the element enters the viewport.
 * Respects prefers-reduced-motion via useReducedMotion hook.
 */
export function SectionReveal({
  children,
  staggerMs = 100,
  yOffset = 40,
  className = "",
  as: Tag = "div",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
        <div style={{ opacity: 1, transform: "none" }}>{children}</div>
      </Tag>
    );
  }

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      <motion.div
        initial={{ opacity: 0, y: yOffset }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          staggerChildren: staggerMs / 1000,
        }}
      >
        {children}
      </motion.div>
    </Tag>
  );
}

// -- Child item for stagger animation -------------------------------------
interface RevealItemProps {
  children: ReactNode;
  className?: string;
}

export function RevealItem({ children, className = "" }: RevealItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className} style={{ opacity: 1, transform: "none" }}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
