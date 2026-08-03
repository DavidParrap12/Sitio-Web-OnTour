import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { DESIGN_FLAGS } from "@/lib/flags";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { CardDestino } from "@/components/CardDestino";
import { destinos } from "@/data/destinos";
import { circuitos } from "@/data/circuitos";

import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";
import { HomeEditorial } from "./HomeEditorial";
import { JsonLd } from "@/components/JsonLd";
import { buildOrgSchema } from "@/lib/schema";

const Testimonials = dynamic(
  () => import("@/components/Testimonials").then((mod) => mod.Testimonials),
  { loading: () => <div className="py-16 md:py-24 bg-white" /> }
);

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tHero = await getTranslations("hero");
  const tDestinos = await getTranslations("destinosData");
  const tCircuitos = await getTranslations("circuitosData");

  const topPasadias = destinos.slice(0, 3);
  const topCircuitos = circuitos.slice(0, 3);

  // All items for editorial carousel/rotation
  const allPasadias = destinos;
  const allCircuitos = circuitos;

  // -- Editorial Layout ----------------------------------------
  if (DESIGN_FLAGS.home) {
    const translations: Record<string, string> = {
      _locale: locale,
      "hero.tagline": tHero("tagline"),
      "hero.title1": tHero("title1"),
      "hero.title2": tHero("title2"),
      "hero.subtitle": tHero("subtitle"),
      "hero.ctaDayTrips": tHero("ctaDayTrips"),
      "hero.ctaCircuits": tHero("ctaCircuits"),
      popularDayTrips: t("popularDayTrips"),
      popularDayTripsSubtitle: t("popularDayTripsSubtitle"),
      viewAllDayTrips: t("viewAllDayTrips"),
      memorableCircuits: t("memorableCircuits"),
      memorableCircuitsSubtitle: t("memorableCircuitsSubtitle"),
      viewAllCircuits: t("viewAllCircuits"),

      discoverColombia: t("discoverColombia"),
      multiDayRoutes: t("multiDayRoutes"),

      ctaTitle: t("ctaTitle"),
      ctaSubtitle: t("ctaSubtitle"),
      ctaButton: t("ctaButton"),
    };

    const orgSchema = buildOrgSchema(locale);
    return (
      <>
        <JsonLd data={orgSchema} />
        <HomeEditorial
          pasadias={allPasadias.map((d) => ({
            id: d.id,
            image: d.image,
            name: tDestinos(`${d.id}.name`),
            description: tDestinos(`${d.id}.description`),
            duration: tDestinos(`${d.id}.duration`),
          }))}
          circuitos={allCircuitos.map((c) => ({
            id: c.id,
            image: c.image,
            days: c.days,
            nights: c.nights,
            name: tCircuitos(`${c.id}.name`),
            description: tCircuitos(`${c.id}.description`),
          }))}
          t={translations}
        />
      </>
    );
  }

  // -- Legacy Layout -------------------------------------------

  const orgSchema = buildOrgSchema(locale);


  return (
    <>
      <JsonLd data={orgSchema} />
      <div className="flex flex-col min-h-screen">
        <Hero />

      {/* Featured Pasadias */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionTitle
              title={t("popularDayTrips")}
              subtitle={t("popularDayTripsSubtitle")}
              alignment="left"
            />
            <Link href="/pasadias" className="mb-12 text-primary font-semibold hover:opacity-80 transition-opacity flex items-center gap-1">
              {t("viewAllDayTrips")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topPasadias.map((destino, idx) => (
              <CardDestino
                key={destino.id}
                type="pasadia"
                title={tDestinos(`${destino.id}.name`)}
                description={tDestinos(`${destino.id}.description`)}
                duration={tDestinos(`${destino.id}.duration`)}
                image={destino.image}
                href={`/pasadias/${destino.id}`}
                brochureUrl={destino.brochureUrl}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Circuitos */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionTitle
              title={t("memorableCircuits")}
              subtitle={t("memorableCircuitsSubtitle")}
              alignment="left"
            />
            <Link href="/circuitos" className="mb-12 text-primary font-semibold hover:opacity-80 transition-opacity flex items-center gap-1">
              {t("viewAllCircuits")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCircuitos.map((circuito, idx) => (
              <CardDestino
                key={circuito.id}
                type="circuito"
                title={tCircuitos(`${circuito.id}.name`)}
                description={tCircuitos(`${circuito.id}.description`)}
                duration={circuito.days + " / " + circuito.nights}
                image={circuito.image}
                href={`/circuitos/${circuito.id}`}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>



      {/* Testimonials — Google Reviews */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            {t("ctaTitle")}
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            {t("ctaSubtitle")}
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-accent hover:brightness-90 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}

