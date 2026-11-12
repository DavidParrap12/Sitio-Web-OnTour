import {headers} from "next/headers";
import type { Metadata } from "next";
import { Archivo_Black, Libre_Baskerville } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { OG_LOCALES, SITE_NAME, SITE_URL } from "@/lib/seo";
import { OG_IMAGE_ALT, SITE_METADATA } from "@/lib/siteMeta";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "../globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const metadataByLocale = SITE_METADATA;

const DEFAULT_OG_IMAGE = `${SITE_URL}/image/og/ontour-dmc-colombia.jpg`;

const ogImageAltByLocale = OG_IMAGE_ALT;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = metadataByLocale[locale] ?? metadataByLocale.es;

  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    icons: { icon: "/image/Fav-Ontour.ico" },
    verification: { google: "google8443da66933dc835" },
    openGraph: {
      title: t.ogTitle,
      description: t.ogDesc,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: ogImageAltByLocale[locale] || ogImageAltByLocale.es,
        },
      ],
      locale: OG_LOCALES[locale] ?? OG_LOCALES.es,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.twTitle,
      description: t.twDesc,
      images: [DEFAULT_OG_IMAGE],
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

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Provide all messages to client components
  const messages = await getMessages();
  const nonce=(await headers()).get("x-nonce")??undefined;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${archivoBlack.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-background text-foreground">

        <NextIntlClientProvider locale={locale} messages={messages}>
          {/*
            Preload the first hero slide so the browser fetches it during HTML parse.
            Next.js App Router hoists <link> tags from Server Components into <head>.
          */}
          <link
            rel="preload"
            as="image"
            href="/_next/image?url=%2Fimage%2Fmakalu-colombia-3631740.jpg&w=1080&q=80"
            fetchPriority="high"
          />
          <Navbar />
          <a href="#main-content" className="skip-link">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
          <main id="main-content" className="flex-grow">{children}</main>
          <Footer />
          <WhatsappButton />
        </NextIntlClientProvider>


        <GoogleAnalytics locale={locale} nonce={nonce}/>
      </body>
    </html>
  );
}
