"use client";

import Image from "next/image";

interface MarqueeLogosProps {
  logos: { src: string; alt: string }[];
}

export function MarqueeLogos({ logos }: MarqueeLogosProps) {
  // Duplicate for seamless scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="overflow-hidden w-full py-12 relative bg-white border-y border-editorial-border">
      {/* Gradient masks for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="editorial-marquee gap-16 items-center pr-16">
        {duplicatedLogos.map((logo, i) => (
          <div key={i} className="relative w-32 h-16 flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
