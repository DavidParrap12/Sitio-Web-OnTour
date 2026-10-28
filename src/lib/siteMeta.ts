import { OG_LOCALES } from "./seo";

export type SiteMetadataCopy = {
  title: string;
  description: string;
  ogTitle: string;
  ogDesc: string;
  twTitle: string;
  twDesc: string;
};

export const SITE_METADATA: Record<string, SiteMetadataCopy> = {
  es: {
    title: "OnTour DMC Colombia | Viajes Privados y Rutas a Medida",
    description:
      "Operador local DMC en los Andes colombianos. Pasadías privados, circuitos a medida y turismo médico. Habilitados RNT 62212.",
    ogTitle: "OnTour DMC Colombia | Viajes Privados y Rutas a Medida",
    ogDesc: "Operador DMC local en Colombia. Pasadías privados, rutas a medida y turismo médico. RNT 62212.",
    twTitle: "OnTour DMC Colombia | Viajes Privados a Medida",
    twDesc: "Pasadías y rutas privadas en Colombia. Operador local RNT 62212.",
  },
  en: {
    title: "Private Tours & Tailor-Made Journeys in Colombia | OnTour DMC",
    description:
      "Private journeys through the Colombian Andes — Tatacoa Desert, Bogotá, Coffee Region & beyond. Local DMC operator, licensed and insured. RNT 62212.",
    ogTitle: "Private Tours & Tailor-Made Journeys in Colombia | OnTour DMC",
    ogDesc: "Private journeys through the Colombian Andes. Local DMC operator, licensed and insured. RNT 62212.",
    twTitle: "OnTour DMC Colombia | Private & Tailor-Made Journeys",
    twDesc: "Private tours & custom itineraries in Colombia. Local operator, RNT 62212.",
  },
  de: {
    title: "OnTour DMC Kolumbien | Tagesausflüge & Rundreisen",
    description:
      "Entdecken Sie die besten Reiseziele, Tagesausflüge und Rundreisen mit OnTour. Tourismus in Kolumbien.",
    ogTitle: "OnTour DMC Kolumbien | Tagesausflüge & Rundreisen",
    ogDesc:
      "Entdecken Sie die besten Reiseziele, Tagesausflüge und Rundreisen mit OnTour. Tourismus in Kolumbien.",
    twTitle: "OnTour DMC Kolumbien | Tourismus in Kolumbien",
    twDesc: "Tagesausflüge und Rundreisen in Kolumbien.",
  },
  fr: {
    title: "OnTour DMC Colombie | Excursions & Circuits Touristiques",
    description:
      "Découvrez les meilleures destinations, excursions et circuits avec OnTour. Tourisme en Colombie.",
    ogTitle: "OnTour DMC Colombie | Excursions & Circuits Touristiques",
    ogDesc:
      "Découvrez les meilleures destinations, excursions et circuits avec OnTour. Tourisme en Colombie.",
    twTitle: "OnTour DMC Colombie | Tourisme en Colombie",
    twDesc: "Excursions et circuits touristiques en Colombie.",
  },
};

export const OG_IMAGE_ALT: Record<string, string> = {
  es: "OnTour DMC Colombia — Tour Operador y Destinos a Medida",
  en: "OnTour DMC Colombia — Private Tours & Tailor-Made Journeys",
  de: "OnTour DMC Kolumbien — Private Rundreisen und Individualreisen",
  fr: "OnTour DMC Colombie — Voyages Privés et Circuits Sur Mesure",
};

export function siteMetadataFor(locale: string): SiteMetadataCopy {
  return SITE_METADATA[locale] ?? SITE_METADATA.es;
}

export function ogLocaleFor(locale: string): string {
  return OG_LOCALES[locale] ?? OG_LOCALES.es;
}
