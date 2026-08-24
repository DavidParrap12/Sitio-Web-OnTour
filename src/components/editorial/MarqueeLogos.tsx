"use client";

import Image from "next/image";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export interface LogoItem {
  src: string;
  alt: string;
  /** Ancho visual preferido en px (height siempre 80px) */
  width?: number;
  /** Color de fondo para logos con trazos blancos (ej: '#1b5e3b') */
  bgColor?: string;
}

interface MarqueeLogosProps {
  logos: LogoItem[];
  /** Velocidad en segundos para completar un ciclo (default 35) */
  speed?: number;
  /** Título opcional sobre el marquee */
  label?: string;
  /** Color de fondo del strip (default '#ffffff') */
  bgColor?: string;
}

export function MarqueeLogos({ logos, speed = 35, label, bgColor = "#ffffff" }: MarqueeLogosProps) {
  const prefersReducedMotion = useReducedMotion();
  // Triplicar para que el loop sea siempre continuo sin saltos
  const track = [...logos, ...logos, ...logos];

  return (
    <div className="w-full py-10 md:py-14 overflow-hidden relative" style={{ backgroundColor: bgColor }}>
      {/* Gradient fade en bordes */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10" style={{ background: `linear-gradient(to right, ${bgColor}, transparent)` }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10" style={{ background: `linear-gradient(to left, ${bgColor}, transparent)` }} />

      {label && (
        <p className="text-base md:text-lg font-bold uppercase tracking-widest text-editorial-dark text-center mb-8 relative z-10">{label}</p>
      )}

      {/* Track animado */}
      <div
        className="flex items-center gap-20 w-max"
        style={{
          animation: prefersReducedMotion ? "none" : `marquee-slide ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex-shrink-0 relative h-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-400 rounded-lg overflow-hidden"
            style={{
              width: logo.width ? logo.width * 1.35 : 162,
              ...(logo.bgColor ? { backgroundColor: logo.bgColor, padding: '8px 12px' } : {}),
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
