"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CaptionLabel } from "./CaptionLabel";
import { IMAGE_SIZES, type DestinationTheme } from "@/lib/design-config";
import { useDestinationTheme } from "@/lib/hooks/useDestinationTheme";

const BLUR_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

interface PasadiaCardEditorialProps {
  id: string;
  title: string;
  image: string;
  duration?: string;
  href: string;
  colorTheme?: DestinationTheme;
}

export function PasadiaCardEditorial({ id, title, image, duration, href, colorTheme }: PasadiaCardEditorialProps) {
  const theme = useDestinationTheme(colorTheme);

  return (
    <Link href={href as any} className="group block relative overflow-hidden rounded-2xl editorial-hover-lift editorial-hover-scale aspect-[4/5] bg-editorial-dark">
      <Image
        src={image}
        alt={title}
        fill
        sizes={IMAGE_SIZES.cardHalf}
        className={`object-cover editorial-scale-target transition-transform duration-700 ${theme.gradeClass}`}
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
      />
      {colorTheme && (
        <div
          className="absolute top-4 left-4 z-10 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm"
          style={theme.badgeStyle}
        >
          {theme.label}
        </div>
      )}
      <div className="absolute inset-0 editorial-overlay-gradient opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="heading-1 text-white mb-2">{title}</h3>
        {duration && (
          <CaptionLabel icon="duration" className="text-white/80">
            {duration}
          </CaptionLabel>
        )}
      </div>
    </Link>
  );
}
