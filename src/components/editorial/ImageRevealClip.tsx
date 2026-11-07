"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type RevealDirection = "left" | "right" | "up" | "down";

/** Hidden states — collapsed edge depends on reveal direction */
const CLIP_HIDDEN: Record<RevealDirection, string> = {
  left: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  right: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  up: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  down: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
};

const CLIP_VISIBLE = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

interface ImageRevealClipProps {
  children: ReactNode;
  /** Additional classes for the wrapper */
  className?: string;
  /** Edge the wipe starts from (default "left") */
  direction?: RevealDirection;
  /** Animation duration in seconds (default 1) */
  durationSec?: number;
  /** Delay before animating once in view (default 0) */
  delaySec?: number;
}

/**
 * Clip-path polygon reveal — image/content wipes into view when scrolled
 * into the viewport. Fires once. Renders plain when reduced motion is set.
 */
export function ImageRevealClip({
  children,
  className = "",
  direction = "left",
  durationSec = 1,
  delaySec = 0,
}: ImageRevealClipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
        {children}
      </div>
    );
  }

  // The IntersectionObserver must watch an element that is never clipped.
  // A zero-area clip-path makes Chromium report the element as not
  // intersecting, so observing the clipped element itself would deadlock:
  // it never animates because it is never "seen", and it is never "seen"
  // because it is hidden. The clip animates on the inner wrapper instead.
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ clipPath: CLIP_HIDDEN[direction] }}
        animate={isInView ? { clipPath: CLIP_VISIBLE } : { clipPath: CLIP_HIDDEN[direction] }}
        transition={{
          duration: durationSec,
          delay: delaySec,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
