"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface ParallaxFloatProps {
  children: ReactNode;
  /** Translation amplitude as fraction of element height (default 0.12) */
  speed?: number;
  /** Additional classes — typically positioning (e.g. "absolute inset-0") */
  className?: string;
}

/**
 * Scroll-driven parallax for background/decorative layers.
 * Translates children vertically as the section scrolls past.
 * Applies an internal scale so edges never show; pair with a
 * parent that has overflow-hidden.
 * Renders static when prefers-reduced-motion is active.
 */
export function ParallaxFloat({
  children,
  speed = 0.12,
  className = "",
}: ParallaxFloatProps) {
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

  if (prefersReducedMotion) {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, scale: 1 + speed * 2 + 0.04 }}
    >
      {children}
    </motion.div>
  );
}
