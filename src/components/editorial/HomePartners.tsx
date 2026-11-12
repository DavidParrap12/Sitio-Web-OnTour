"use client";

import { MarqueeLogos, type LogoItem } from "@/components/editorial/MarqueeLogos";

const INSTITUTIONAL_LOGOS: LogoItem[] = [
  { src: "/image/logo-aliados/procolombia.svg", alt: "ProColombia", width: 130 },
  { src: "/image/logo-aliados/marca-pa-s-colombia-logo-1.svg", alt: "Marca País Colombia", width: 80 },
  { src: "/image/logo-aliados/assist-card-seeklogo.svg", alt: "Assist Card", width: 120 },
  { src: "/image/logo-aliados/Logo_Tolima_Principal.png", alt: "Explora Tolima — Corazón de los Andes", width: 160, bgColor: "#1b4d2e" },
];

const DISTRIBUTION_LOGOS: LogoItem[] = [
  { src: "/image/logo-aliados/booking-ar21.svg", alt: "Booking.com", width: 140 },
  { src: "/image/logo-aliados/tripadvisor-seeklogo.svg", alt: "TripAdvisor", width: 130 },
  { src: "/image/logo-aliados/civitatis.svg", alt: "Civitatis", width: 130 },
];

interface HomePartnersProps {
  locale: string;
}

export function HomePartners({ locale }: HomePartnersProps) {
  return (
    <section className="relative bg-white py-6 md:py-10 editorial-section--bleed">
      {/* -- Institutional Partners ---------------------------------- */}
      <div className="relative bg-white py-2">
        <MarqueeLogos
          logos={INSTITUTIONAL_LOGOS}
          speed={38}
          label={
            locale === "es" ? "Aliados Institucionales" :
            locale === "de" ? "Institutionelle Partner" :
            locale === "fr" ? "Partenaires Institutionnels" :
            "Institutional Partners"
          }
        />
      </div>

      {/* -- Distribution Platforms ---------------------------------- */}
      <div className="relative bg-white pb-4">
        <MarqueeLogos
          logos={DISTRIBUTION_LOGOS}
          speed={45}
          label={
            locale === "es" ? "También nos encuentras en" :
            locale === "de" ? "Auch buchbar über" :
            locale === "fr" ? "Également disponible sur" :
            "Also find us on"
          }
        />
      </div>
    </section>
  );
}
