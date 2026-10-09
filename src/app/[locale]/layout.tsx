import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";


const metadataByLocale: Record<string, { title: string; description: string; ogTitle: string; ogDesc: string; ogLocale: string; twTitle: string; twDesc: string }> = {
  es: {
    title: "OnTour DMC Colombia | Viajes Privados y Rutas a Medida",
    description: "Operador local DMC en los Andes colombianos. Pasadías privados, circuitos a medida y turismo médico. Habilitados RNT 62212.",
    ogTitle: "OnTour DMC Colombia | Viajes Privados y Rutas a Medida",
    ogDesc: "Operador DMC local en Colombia. Pasadías privados, rutas a medida y turismo médico. RNT 62212.",
    ogLocale: "es_CO",
    twTitle: "OnTour DMC Colombia | Viajes Privados a Medida",
    twDesc: "Pasadías y rutas privadas en Colombia. Operador local RNT 62212.",
  },
  en: {
    title: "Private Tours & Tailor-Made Journeys in Colombia | OnTour DMC",
    description: "Private journeys through the Colombian Andes — Tatacoa Desert, Bogotá, Coffee Region & beyond. Local DMC operator, licensed and insured. RNT 62212.",
    ogTitle: "Private Tours & Tailor-Made Journeys in Colombia | OnTour DMC",
    ogDesc: "Private journeys through the Colombian Andes. Local DMC operator, licensed and insured. RNT 62212.",
    ogLocale: "en_US",
    twTitle: "OnTour DMC Colombia | Private & Tailor-Made Journeys",
    twDesc: "Private tours & custom itineraries in Colombia. Local operator, RNT 62212.",
  },
  de: {
    title: "OnTour DMC Kolumbien | Tagesausflüge & Rundreisen",
    description: "Entdecken Sie die besten Reiseziele, Tagesausflüge und Rundreisen mit OnTour. Tourismus in Kolumbien.",
    ogTitle: "OnTour DMC Kolumbien | Tagesausflüge & Rundreisen",
    ogDesc: "Entdecken Sie die besten Reiseziele, Tagesausflüge und Rundreisen mit OnTour. Tourismus in Kolumbien.",
    ogLocale: "de_DE",
    twTitle: "OnTour DMC Kolumbien | Tourismus in Kolumbien",
    twDesc: "Tagesausflüge und Rundreisen in Kolumbien.",
  },
  fr: {
    title: "OnTour DMC Colombie | Excursions & Circuits Touristiques",
    description: "Découvrez les meilleures destinations, excursions et circuits avec OnTour. Tourisme en Colombie.",
    ogTitle: "OnTour DMC Colombie | Excursions & Circuits Touristiques",
    ogDesc: "Découvrez les meilleures destinations, excursions et circuits avec OnTour. Tourisme en Colombie.",
    ogLocale: "fr_FR",
    twTitle: "OnTour DMC Colombie | Tourisme en Colombie",
    twDesc: "Excursions et circuits touristiques en Colombie.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = metadataByLocale[locale] ?? metadataByLocale.es;

  const ogImageAltByLocale: Record<string, string> = {
    es: "OnTour DMC Colombia — Tour Operador y Destinos a Medida",
    en: "OnTour DMC Colombia — Private Tours & Tailor-Made Journeys",
    de: "OnTour DMC Kolumbien — Private Rundreisen und Individualreisen",
    fr: "OnTour DMC Colombie — Voyages Privés et Circuits Sur Mesure",
  };

  return {
    metadataBase: new URL("https://www.ontourdmc.com"),
    title: t.title,
    description: t.description,
    // hreflang alternates are valid at layout level; canonical is set per page
    alternates: {
      languages: {
        es: "https://www.ontourdmc.com",
        en: "https://www.ontourdmc.com/en",
        de: "https://www.ontourdmc.com/de",
        fr: "https://www.ontourdmc.com/fr",
      },
    },
    openGraph: {
      title: t.ogTitle,
      description: t.ogDesc,
      siteName: "Ontour DMC Colombia",
      images: [
        {
          url: "https://www.ontourdmc.com/image/portadas/Statues_at_San_Agust%C3%ADn_park_202608141341.jpeg",
          width: 1200,
          height: 630,
          alt: ogImageAltByLocale[locale] || ogImageAltByLocale.es,
        },
      ],
      locale: t.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.twTitle,
      description: t.twDesc,
      images: ["https://www.ontourdmc.com/image/portadas/Statues_at_San_Agust%C3%ADn_park_202608141341.jpeg"],
    },
  };
}


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Provide all messages to client components
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/*
        Preload the first hero slide so the browser fetches it during HTML parse.
        Next.js App Router hoists <link> tags from Server Components into <head>.
        This directly cuts the LCP "element render delay" (~1700 ms → ~400 ms).
      */}
      <link
        rel="preload"
        as="image"
        href="/_next/image?url=%2Fimage%2Fmakalu-colombia-3631740.jpg&w=1080&q=80"
        // @ts-ignore — fetchpriority is valid HTML but not yet in React types
        fetchpriority="high"
      />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsappButton />
    </NextIntlClientProvider>
  );
}

