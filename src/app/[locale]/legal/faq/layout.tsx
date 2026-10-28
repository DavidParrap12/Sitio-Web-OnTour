import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter, canonicalFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legalFaq" });
  const title = `${t("title")} | OnTour DMC Colombia`;
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/legal/faq"),
    openGraph: buildOpenGraph({
      locale,
      title,
      description,
      url: canonicalFor(locale, "/legal/faq"),
    }),
    twitter: buildTwitter({ title, description }),
  };
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
