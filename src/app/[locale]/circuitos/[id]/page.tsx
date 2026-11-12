export const revalidate = 60;
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getCircuitEntry, getPublishedCircuitIds } from "@/lib/circuits";
import { destinos } from "@/data/destinos";
import { routing } from "@/i18n/routing";
import { getDepartures } from "@/lib/departures";
import { CircuitoDetailEditorial } from "./CircuitoDetailEditorial";
import { JsonLd } from "@/components/JsonLd";
import { buildCircuitoSchema, buildBreadcrumbs } from "@/lib/schema";
import { buildAlternates, buildOpenGraph, buildTwitter, canonicalFor } from "@/lib/seo";

// Mirrors routing.ts pathnames for /circuitos
const JOURNEYS_PATH: Record<string, string> = {
  es: "circuitos",
  en: "journeys",
  de: "rundreisen",
  fr: "circuits",
};

export async function generateStaticParams() {
  const ids = await getPublishedCircuitIds();
  return routing.locales.flatMap((locale) =>
    ids.map((id) => ({ locale, id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const circuito = await getCircuitEntry(locale, id);
  if (!circuito) return {};

  const name = circuito.name;
  const description = circuito.description;
  const ogImageUrl = circuito.image.startsWith("http")
    ? circuito.image
    : `https://www.ontourdmc.com${circuito.image}`;

  const title = `${name} | OnTour DMC Colombia`;
  const href = { pathname: "/circuitos/[id]", params: { id } } as const;

  return {
    title,
    description,
    alternates: buildAlternates(locale, href),
    openGraph: buildOpenGraph({
      locale,
      title,
      description,
      url: canonicalFor(locale, href),
      image: ogImageUrl,
      imageAlt: name,
    }),
    twitter: buildTwitter({ title, description, image: ogImageUrl }),
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
  const circuito = await getCircuitEntry(locale, id);

  if (!circuito) return notFound();

  const name = circuito.name;
  const description = circuito.description;
  const highlights = circuito.highlights;
  const itinerary = circuito.itinerary;
  const price = circuito.price;
  const departureDates = await getDepartures(id);
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
      extensionPrice: undefined,
      extensionDuration: d.asExtension?.extensionDuration,
    }));

  // -- Editorial Layout ----------------------------------------
  const schema = buildCircuitoSchema({ id, name, description, days: circuito.days, nights: circuito.nights, image: circuito.image, locale });
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
      <CircuitoDetailEditorial
        name={name} description={description} highlights={highlights}
        itinerary={itinerary} image={circuito.image}
        days={circuito.days} nights={circuito.nights} price={price}
        id={id} locale={locale} dayImages={circuito.dayImages}
        brochureUrl={circuito.brochureUrl} brochurePdfUrl={circuito.brochurePdfUrl}
        departureDates={departureDates} whatsappUrl={whatsappUrl}
        extensions={extensions} colorTheme={circuito.colorTheme}
        mapEmbedUrl={circuito.mapEmbedUrl}
        videos={circuito.videos}
        prices={circuito.prices} included={circuito.included} excluded={circuito.excluded}
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