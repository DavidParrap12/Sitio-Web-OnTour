import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
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
    { name: "Home", url: "https://www.agenciaontour.com" },
    { name: locale === "es" ? "Pasadías" : "Day Trips", url: `https://www.agenciaontour.com/${locale === "es" ? "pasadias" : locale + "/day-trips"}` },
    { name, url: `https://www.agenciaontour.com/${locale === "es" ? "pasadias" : locale + "/day-trips"}/${id}` },
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