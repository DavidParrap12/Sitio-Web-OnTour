import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import "../splash.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";
import { SplashScreen } from "@/components/SplashScreen";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const metadataByLocale: Record<string, { title: string; description: string; ogTitle: string; ogDesc: string; ogLocale: string; twTitle: string; twDesc: string }> = {
  es: {
    title: "Ontour | Pasadías y Circuitos Turísticos",
    description: "Explora los mejores destinos, pasadías y circuitos con Ontour. Turismo en Colombia.",
    ogTitle: "Ontour | Pasadías y Circuitos Turísticos en Colombia",
    ogDesc: "Explora los mejores destinos, pasadías y circuitos con Ontour. Turismo en Colombia.",
    ogLocale: "es_CO",
    twTitle: "Ontour | Turismo en Colombia",
    twDesc: "Pasadías y circuitos turísticos en Colombia.",
  },
  en: {
    title: "OnTour DMC Colombia | Day Trips & Tourist Circuits",
    description: "Explore the best destinations, day trips and circuits with OnTour. Tourism in Colombia.",
    ogTitle: "OnTour DMC Colombia | Day Trips & Tourist Circuits",
    ogDesc: "Explore the best destinations, day trips and tourist circuits with OnTour. Tourism in Colombia.",
    ogLocale: "en_US",
    twTitle: "OnTour DMC Colombia | Tourism in Colombia",
    twDesc: "Day trips and tourist circuits in Colombia.",
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

  return {
    metadataBase: new URL("https://www.agenciaontour.com"),
    title: t.title,
    description: t.description,
    icons: {
      icon: "/image/Fav-Ontour.ico",
    },
    openGraph: {
      title: t.ogTitle,
      description: t.ogDesc,
      url: "https://www.agenciaontour.com",
      siteName: "Ontour DMC Colombia",
      images: [{ url: "/image/logo-ON-TOUR-Nuevo.png" }],
      locale: t.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.twTitle,
      description: t.twDesc,
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
    <html
      lang={locale}
      className={`${dmSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <SplashScreen />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsappButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
