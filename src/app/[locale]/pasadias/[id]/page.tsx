import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { DESIGN_FLAGS } from "@/lib/flags";
import { destinos } from "@/data/destinos";
import { routing } from "@/i18n/routing";
import { CheckCircle2, Clock, MapPin, Send } from "lucide-react";
import { PasadiaGallery } from "@/components/PasadiaGallery";
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

  // -- Editorial Layout ----------------------------------------
  const schema = buildPasadiaSchema({ id, name, description, duration, image: pasadia.image, locale });
  const breadcrumb = buildBreadcrumbs([
    { name: "Home", url: "https://www.agenciaontour.com" },
    { name: locale === "es" ? "Pasadías" : "Day Trips", url: `https://www.agenciaontour.com/${locale === "es" ? "pasadias" : locale + "/day-trips"}` },
    { name, url: `https://www.agenciaontour.com/${locale === "es" ? "pasadias" : locale + "/day-trips"}/${id}` },
  ]);
  if (DESIGN_FLAGS.pasadiaDetail) {
    return (
      <>
        <JsonLd data={schema} />
        <JsonLd data={breadcrumb} />
      <PasadiaDetailEditorial
        name={name} description={description} duration={duration}
        highlights={highlights} activities={activities} image={pasadia.image} gallery={gallery}
        locale={locale} id={id}
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

  // -- Legacy Layout -------------------------------------------
  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumb} />
      <div className="pt-20 bg-secondary/50 min-h-screen pb-20">
      {/* Hero banner */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image src={pasadia.image} alt={name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 text-white text-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium tracking-wide mb-4 uppercase">
              {t("badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 drop-shadow-md">{name}</h1>
            <div className="flex items-center justify-center gap-6 text-white/90 font-medium">
              <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {t("colombia")}</span>
              <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> {duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12 md:mt-20 max-w-7xl">
        <div className="space-y-14">
          <section className="text-center">
            <h2 className="text-3xl font-heading font-bold mb-6 text-primary">{t("activityDesc")}</h2>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">{description}</p>
          </section>

          <section>
            <h2 className="text-3xl font-heading font-bold mb-6 text-primary text-center">{t("youWillFind")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                  <span className="text-foreground/80 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Activities Legacy Layout */}
          {activities.length > 0 && (
            <section>
              <h2 className="text-3xl font-heading font-bold mb-6 text-primary text-center">{t("activitiesAndPlans")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {activities.map((act: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-primary mb-1">{act.nombre}</h3>
                    <p className="text-sm text-foreground/60 mb-4 flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {act.destino}
                    </p>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-accent mb-2">{t("includes") || "Incluye"}</h4>
                        <ul className="space-y-1">
                          {act.incluye.map((inc: string, i: number) => (
                            <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                              <span className="text-accent mt-0.5">•</span> {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-foreground/60 uppercase block">{t("priceFrom") || "Precio desde"}</span>
                        <span className="font-bold text-lg text-primary">
                          {act.precio_desde ? (typeof act.precio_desde === 'number' ? `$${act.precio_desde.toLocaleString()}` : act.precio_desde) : (t("consult") || 'A consultar')}
                        </span>
                      </div>
                      <Link href={"/contacto" as any} className="text-accent hover:underline font-medium text-sm">
                        {t("quoteShort")}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <BrochureDownload
              images={gallery} title={name} slug={id}
              labels={{
                downloadPdf: t("downloadPdf"), downloadWord: t("downloadWord"),
                downloadBrochure: t("downloadBrochure"), generating: t("generating"), downloaded: t("downloaded"),
              }}
            />
          </section>

          <section className="text-center pt-4 pb-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-lg mx-auto">
              <h3 className="text-2xl font-heading font-bold mb-3 text-primary">{t("ctaTitle")}</h3>
              <p className="text-foreground/60 mb-6">{t("ctaSubtitle")}</p>
              <Link
                href={"/contacto" as any}
                className="inline-flex items-center gap-2 bg-accent hover:brightness-90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Send className="w-5 h-5" />{t("ctaButton")}
              </Link>
            </div>
          </section>
        </div>
      </div>
      </div>
    </>
  );
}
