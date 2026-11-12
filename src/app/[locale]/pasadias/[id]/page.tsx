import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import {getCircuitEntry,getPublishedCircuitIds} from "@/lib/circuits";
import {getDepartures} from "@/lib/departures";
export const revalidate = 60;
import { routing } from "@/i18n/routing";
import { PasadiaDetailEditorial } from "./PasadiaDetailEditorial";
import { JsonLd } from "@/components/JsonLd";
import { buildPasadiaSchema, buildBreadcrumbs } from "@/lib/schema";
import { buildAlternates, buildOpenGraph, buildTwitter, canonicalFor } from "@/lib/seo";

export async function generateStaticParams() {
 const ids=await getPublishedCircuitIds("day_trip");
 return routing.locales.flatMap(locale=>ids.map(id=>({locale,id})));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const pasadia = await getCircuitEntry(locale,id,"day_trip");
  if (!pasadia) return {};

  const name = pasadia.name;
  const description = pasadia.description;
  const ogImageUrl = pasadia.image.startsWith("http")
    ? pasadia.image
    : `https://www.ontourdmc.com${pasadia.image}`;
  const title = `${name} | OnTour DMC Colombia`;
  const href = { pathname: "/pasadias/[id]", params: { id } } as const;

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

export default async function PasadiaPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pasadiaDetail");
  const pasadia = await getCircuitEntry(locale,id,"day_trip");
  if(!pasadia)return notFound();
  const {name,description,duration,highlights,activities}=pasadia;
  const gallery=pasadia.dayImages.map(m=>m.image);
  const departureDates=await getDepartures(id);

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
        tariffs={pasadia.prices} departureDates={departureDates} included={pasadia.included} excluded={pasadia.excluded}
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