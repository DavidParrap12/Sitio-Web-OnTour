import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { CardDestino } from "@/components/CardDestino";
import { destinos } from "@/data/destinos";
import { circuitos } from "@/data/circuitos";
import { ShieldCheck, Map, HeartHandshake, Headphones } from "lucide-react";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";

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
  const tDestinos = await getTranslations("destinosData");
  const tCircuitos = await getTranslations("circuitosData");

  const topPasadias = destinos.slice(0, 3);
  const topCircuitos = circuitos.slice(0, 3);

  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      title: t("features.safe.title"),
      description: t("features.safe.desc"),
    },
    {
      icon: <Map className="w-8 h-8 text-accent" />,
      title: t("features.routes.title"),
      description: t("features.routes.desc"),
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-accent" />,
      title: t("features.human.title"),
      description: t("features.human.desc"),
    },
    {
      icon: <Headphones className="w-8 h-8 text-accent" />,
      title: t("features.support.title"),
      description: t("features.support.desc"),
    },
  ];

  return (
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

      {/* Features Section — Why travel with us */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Dark blue background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061b35] via-primary to-[#061b35]" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Title */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
              {t("whyUs")}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {t("whyUsSubtitle")}
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-14">
            {[
              { value: "500+", label: t("stats.travelers") },
              { value: "12+", label: t("stats.destinations") },
              { value: "100%", label: t("stats.tailored") },
              { value: "4 min", label: t("stats.responseTime") },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center py-6 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent font-heading">{stat.value}</p>
                <p className="text-white/50 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-7 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.09] hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent/25 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white font-heading mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center mt-12">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/30 animate-bounce">
              ↓
            </div>
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
  );
}
