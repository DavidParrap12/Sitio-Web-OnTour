import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Playfair_Display, Fraunces, Cormorant_Garamond } from "next/font/google";
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

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/**
 * Google Tag Manager container — disabled by default.
 *
 * Analytics runs on gtag.js directly (see components/GoogleAnalytics.tsx).
 * Shipping a GTM container as well would load a second Google tag and invite
 * double counting, so it only activates when NEXT_PUBLIC_GTM_ID is defined.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${dmSans.variable} ${playfairDisplay.variable} ${fraunces.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-background text-foreground">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
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
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsappButton />
        </NextIntlClientProvider>
        {/* Google Tag Manager (optional).
            afterInteractive defers load until hydration — keeps it out of the
            critical path (-114 KiB render-blocking, ~60ms main thread), while
            still running before any user interaction.
            NOTE: a GTM container and the direct gtag.js tag fight over the
            same dataLayer, so only one should be enabled at a time. */}
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
