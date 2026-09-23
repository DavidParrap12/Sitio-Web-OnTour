"use client";

import { useRef, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MOTION } from "@/lib/design-config";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  /** Additional classes for the magnetic wrapper */
  className?: string;
  /** Cursor-follow intensity 0-1 (default 0.25) */
  strength?: number;
}

/**
 * Magnetic wrapper — content subtly follows the cursor while hovered,
 * springing back on leave. Wrap any interactive element (Link, button).
 * Renders a plain div when prefers-reduced-motion is active.
 */
export function MagneticButton({
  children,
  className = "inline-block",
  strength = 0.25,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, MOTION.magneticSpring);
  const springY = useSpring(y, MOTION.magneticSpring);

  function handleMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const rawX = (e.clientX - rect.left - rect.width / 2) * strength;
    const rawY = (e.clientY - rect.top - rect.height / 2) * strength;
    const maxOffset = 8;
    x.set(Math.max(-maxOffset, Math.min(maxOffset, rawX)));
    y.set(Math.max(-maxOffset, Math.min(maxOffset, rawY)));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
