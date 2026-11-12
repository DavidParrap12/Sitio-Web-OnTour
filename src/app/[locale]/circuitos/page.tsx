export const revalidate = 60;
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CircuitosEditorial } from "./CircuitosEditorial";
import { getCircuitEntries } from "@/lib/circuits";
import { buildAlternates, buildOpenGraph, buildTwitter, canonicalFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "circuits" });
  const title = `${t("title")} | OnTour DMC Colombia`;
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/circuitos"),
    openGraph: buildOpenGraph({
      locale,
      title,
      description,
      url: canonicalFor(locale, "/circuitos"),
    }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function Circuitos({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("circuits");
  const entries = await getCircuitEntries(locale);

  const slides = entries.map((c) => ({
    id: c.id,
    image: c.image,
    days: c.days,
    nights: c.nights,
    name: c.name,
    description: c.description,
    price: c.price,
    colorTheme: c.colorTheme,
    highlights: c.highlights,
    region: c.region,
  }));

  return (
    <CircuitosEditorial
      slides={slides}
      title={t("title")}
      subtitle={t("subtitle")}
    />
  );
}
