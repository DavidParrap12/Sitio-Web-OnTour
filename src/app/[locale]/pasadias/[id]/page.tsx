import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { destinos } from "@/data/destinos";
import { routing } from "@/i18n/routing";
import { CheckCircle2, Clock, MapPin, Send } from "lucide-react";
import { BrochureDownloadDynamic as BrochureDownload } from "@/components/BrochureDownloadDynamic";
import { Link } from "@/i18n/navigation";
import { PasadiaDetailEditorial } from "./PasadiaDetailEditorial";
import { JsonLd } from "@/components/JsonLd";
import { buildPasadiaSchema, buildBreadcrumbs } from "@/lib/schema";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    destinos.map((d) => ({ locale, id: d.id }))
  );
}

const DAY_TRIPS_PATH: Record<string, string> = {
  es: "pasadias",
  en: "day-trips",
  de: "tagesausfluege",
  fr: "excursions",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const tData = await getTranslations({ locale, namespace: "destinosData" });
  const pasadia = destinos.find((d) => d.id === id);
  if (!pasadia) return {};

  const name = tData(`${id}.name`);
  const description = tData(`${id}.description`);
  const ogImageUrl = pasadia.image.startsWith("http")
    ? pasadia.image
    : `https://www.ontourdmc.com${pasadia.image}`;

  const path = DAY_TRIPS_PATH[locale] ?? "day-trips";
  const canonicalUrl = locale === "es"
    ? `https://www.ontourdmc.com/${path}/${id}`
    : `https://www.ontourdmc.com/${locale}/${path}/${id}`;

  return {
    title: `${name} | OnTour DMC Colombia`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${name} | OnTour DMC Colombia`,
      description,
      url: canonicalUrl,
      siteName: "Ontour DMC Colombia",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | OnTour DMC Colombia`,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function PasadiaPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pasadiaDetail");
  const tData = await getTranslations("destinosData");
  const pasadia = destinos.find((d) => d.id === id);

  if (!pasadia) return notFound();

  const name = tData(`${id}.name`);
  const description = tData(`${id}.description`);
  const duration = tData(`${id}.duration`);
  let highlights: string[] = [];
  try { highlights = tData.raw(`${id}.highlights`) as string[]; } catch { highlights = []; }
  let activitiesRaw: unknown;
  try { activitiesRaw = tData.raw(`${id}.activities`); } catch { activitiesRaw = []; }
  const activities = Array.isArray(activitiesRaw) ? activitiesRaw : [];
  const gallery = pasadia.gallery ?? [];

  const schema = buildPasadiaSchema({ id, name, description, duration, image: pasadia.image, locale });
  const breadcrumb = buildBreadcrumbs([
    { name: "Home", url: "https://www.ontourdmc.com" },
    { name: locale === "es" ? "Pasadías" : "Day Trips", url: `https://www.ontourdmc.com/${locale === "es" ? "pasadias" : locale + "/day-trips"}` },
    { name, url: `https://www.ontourdmc.com/${locale === "es" ? "pasadias" : locale + "/day-trips"}/${id}` },
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumb} />
      <PasadiaDetailEditorial
        name={name} description={description} duration={duration}
        highlights={highlights} activities={activities} image={pasadia.image} gallery={gallery}
        locale={locale} id={id} colorTheme={pasadia.colorTheme}
        t={{
          badge: t("badge"), colombia: t("colombia"), activityDesc: t("activityDesc"),
          youWillFind: t("youWillFind"), gallery: t("gallery"),
          galleryLangNotice: t("galleryLangNotice"), ctaTitle: t("ctaTitle"),
          ctaSubtitle: t("ctaSubtitle"), ctaButton: t("ctaButton"),
          downloadPdf: t("downloadPdf"), downloadWord: t("downloadWord"),
          downloadBrochure: t("downloadBrochure"), generating: t("generating"),
          downloaded: t("downloaded"),
          activitiesAndPlans: t("activitiesAndPlans"),
          quote: t("quote"),
          quoteShort: t("quoteShort"),
          includes: t("includes"),
          priceFrom: t("priceFrom"),
          consult: t("consult"),
          booking: t("booking"),
          departure: t("departure"),
        }}
      />
    </>
  );
}