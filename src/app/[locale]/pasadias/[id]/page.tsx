import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { destinos } from "@/data/destinos";
import { routing } from "@/i18n/routing";
import { CheckCircle2, Clock, MapPin, Send } from "lucide-react";
import { PasadiaGallery } from "@/components/PasadiaGallery";
import { Link } from "@/i18n/navigation";

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

  // Read translated content from messages
  const name = tData(`${id}.name`);
  const description = tData(`${id}.description`);
  const duration = tData(`${id}.duration`);
  const highlights = tData.raw(`${id}.highlights`) as string[];

  const gallery = pasadia.gallery ?? [];

  return (
    <div className="pt-20 bg-secondary/50 min-h-screen pb-20">
      {/* Hero banner */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src={pasadia.image}
          alt={name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 text-white text-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium tracking-wide mb-4 uppercase">
              {t("badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 drop-shadow-md">
              {name}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/90 font-medium">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" /> {t("colombia")}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" /> {duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content — centered, single column */}
      <div className="container mx-auto px-4 md:px-6 mt-12 md:mt-20 max-w-4xl">
        <div className="space-y-14">

          {/* Description */}
          <section className="text-center">
            <h2 className="text-3xl font-heading font-bold mb-6 text-primary">
              {t("activityDesc")}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="text-3xl font-heading font-bold mb-6 text-primary text-center">
              {t("youWillFind")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                  <span className="text-foreground/80 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery — only shows if images exist */}
          {gallery.length > 0 && (
            <section>
              <h2 className="text-3xl font-heading font-bold mb-6 text-primary text-center">
                {t("gallery")}
              </h2>
              {locale !== "es" && (
                <div className="flex items-center justify-center gap-2 mb-4 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-sm max-w-2xl mx-auto">
                  <span className="text-base">ℹ️</span>
                  <span>{t("galleryLangNotice")}</span>
                </div>
              )}
              <PasadiaGallery images={gallery} altPrefix={name} />
            </section>
          )}

          {/* CTA — single centered "Cotizar" button */}
          <section className="text-center pt-4 pb-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-lg mx-auto">
              <h3 className="text-2xl font-heading font-bold mb-3 text-primary">
                {t("ctaTitle")}
              </h3>
              <p className="text-foreground/60 mb-6">
                {t("ctaSubtitle")}
              </p>
              <Link
                href={"/contacto" as any}
                className="inline-flex items-center gap-2 bg-accent hover:brightness-90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Send className="w-5 h-5" />
                {t("ctaButton")}
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
