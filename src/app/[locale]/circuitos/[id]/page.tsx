import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { circuitos } from "@/data/circuitos";
import { destinos } from "@/data/destinos";
import { routing } from "@/i18n/routing";
import { fetchDepartureDates } from "@/lib/googleSheets";
import { CheckCircle2, Clock, MapPin, Map } from "lucide-react";
import { CircuitoDetailEditorial } from "./CircuitoDetailEditorial";
import { JsonLd } from "@/components/JsonLd";
import { buildCircuitoSchema, buildBreadcrumbs, buildDepartureDateEvents } from "@/lib/schema";

// Mirrors routing.ts pathnames for /circuitos
const JOURNEYS_PATH: Record<string, string> = {
  es: "circuitos",
  en: "journeys",
  de: "rundreisen",
  fr: "circuits",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    circuitos.map((c) => ({ locale, id: c.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const tData = await getTranslations({ locale, namespace: "circuitosData" });
  const circuito = circuitos.find((c) => c.id === id);
  if (!circuito) return {};

  const name = tData(`${id}.name`);
  const description = tData(`${id}.description`);
  const ogImageUrl = circuito.image.startsWith("http")
    ? circuito.image
    : `https://www.ontourdmc.com${circuito.image}`;

  const path = JOURNEYS_PATH[locale] ?? "circuitos";
  const baseUrl = locale === "es"
    ? `https://www.ontourdmc.com/${path}/${id}`
    : `https://www.ontourdmc.com/${locale}/${path}/${id}`;

  return {
    title: `${name} | OnTour DMC Colombia`,
    description,
    alternates: { canonical: baseUrl },
    openGraph: {
      title: `${name} | OnTour DMC Colombia`,
      description,
      url: baseUrl,
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

export default async function CircuitoPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("circuitDetail");
  const tData = await getTranslations("circuitosData");
  const circuito = circuitos.find((c) => c.id === id);

  if (!circuito) return notFound();

  const name = tData(`${id}.name`);
  const description = tData(`${id}.description`);
  let highlights: string[] = [];
  try { highlights = tData.raw(`${id}.highlights`) as string[]; } catch { highlights = []; }
  let itinerary: string[] = [];
  try { itinerary = tData.raw(`${id}.itinerary`) as string[]; } catch { itinerary = []; }
  const price = tData(`${id}.price`);
  const departureDates = await fetchDepartureDates();
  const whatsappMessage = t("whatsappMessage", { name });
  const whatsappUrl = `https://wa.me/573143415177?text=${encodeURIComponent(whatsappMessage)}`;

  // -- Resolve optional extensions --------------------------------
  const tDestinos = await getTranslations("destinosData");
  const tExt = await getTranslations("circuitExtensions");
  const extensions = destinos
    .filter((d) => d.asExtension?.linkedCircuits.includes(id))
    .map((d) => ({
      id: d.id,
      name: tDestinos(`${d.id}.name`),
      description: tDestinos(`${d.id}.description`),
      image: d.image,
      extensionLabel: d.asExtension?.extensionLabel,
      extensionPrice: d.asExtension?.extensionPrice,
      extensionDuration: d.asExtension?.extensionDuration,
    }));

  // -- Editorial Layout ----------------------------------------
  const schema = buildCircuitoSchema({ id, name, description, days: circuito.days, nights: circuito.nights, image: circuito.image, locale });
  const eventSchemas = buildDepartureDateEvents({ circuitId: id, circuitName: name, image: circuito.image, departureDates, locale });
  const path = JOURNEYS_PATH[locale] ?? "circuitos";
  const listUrl = locale === "es"
    ? `https://www.ontourdmc.com/${path}`
    : `https://www.ontourdmc.com/${locale}/${path}`;
  const detailUrl = `${listUrl}/${id}`;

  const breadcrumb = buildBreadcrumbs([
    { name: "Home", url: "https://www.ontourdmc.com" },
    { name: locale === "es" ? "Circuitos" : "Journeys", url: listUrl },
    { name, url: detailUrl },
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumb} />
      {eventSchemas.map((e, i) => <JsonLd key={i} data={e} />)}
      <CircuitoDetailEditorial
        name={name} description={description} highlights={highlights}
        itinerary={itinerary} image={circuito.image}
        days={circuito.days} nights={circuito.nights} price={price}
        id={id} locale={locale} dayImages={circuito.dayImages}
        brochureUrl={circuito.brochureUrl} brochurePdfUrl={circuito.brochurePdfUrl}
        departureDates={departureDates} whatsappUrl={whatsappUrl}
        extensions={extensions} colorTheme={circuito.colorTheme}
        mapEmbedUrl={circuito.mapEmbedUrl}
        t={{
          badge: t("badge"), colombia: t("colombia"),
          daysNights: t("daysNights", { days: circuito.days, nights: circuito.nights }),
          tripDescription: t("tripDescription"), youWillEnjoy: t("youWillEnjoy"),
          itinerary: t("itinerary"), tripSummary: t("tripSummary"),
          duration: t("duration"), location: t("location"), nationalDest: t("nationalDest"),
          pricePerPerson: t("pricePerPerson"), priceNote: t("priceNote"),
          requestQuote: t("requestQuote"),
          galleryClose: t("galleryClose"), galleryPhotoOf: t("galleryPhotoOf"),
          galleryClickToEnlarge: t("galleryClickToEnlarge"),
          downloadPdf: t("downloadPdf"), downloadWord: t("downloadWord"),
          downloadProgram: t("downloadProgram"), generating: t("generating"),
          downloaded: t("downloaded"),
          routeMapTitle: t("routeMap"),
          routeMapSubtitle: t("routeMapSubtitle"),
          extensionsSectionLabel: tExt("sectionLabel"),
          extensionsSectionTitle: tExt("sectionTitle"),
          extensionsAddToQuote: tExt("addToQuote"),
          extensionsFrom: tExt("from"),
          extensionsPerPerson: tExt("perPerson"),
          extensionsWhatsappTemplate: tExt("whatsappTemplate"),
        }}
      />
    </>
  );
}