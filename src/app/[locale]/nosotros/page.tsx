import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionTitle } from "@/components/SectionTitle";
import Image from "next/image";
import { Compass, Users, Target, Heart } from "lucide-react";

export default async function Nosotros({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  const values = [
    { icon: <Compass className="w-6 h-6" />, title: t("values.adventure.title"), desc: t("values.adventure.desc") },
    { icon: <Users className="w-6 h-6" />, title: t("values.community.title"), desc: t("values.community.desc") },
    { icon: <Target className="w-6 h-6" />, title: t("values.excellence.title"), desc: t("values.excellence.desc") },
    { icon: <Heart className="w-6 h-6" />, title: t("values.passion.title"), desc: t("values.passion.desc") },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/50">
      {/* Hero Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/image/on-tour-ofc-centro-2025-scaled.jpg')" }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">{t("title")}</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">{t("subtitle")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-24">
        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-heading font-bold text-primary mb-6 flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">M</span>
              {t("missionTitle")}
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">{t("missionText")}</p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-heading font-bold text-accent mb-6 flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">E</span>
              {t("visionTitle")}
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">{t("visionText")}</p>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-24">
          <SectionTitle title={t("valuesTitle")} subtitle={t("valuesSubtitle")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="font-bold text-xl font-heading mb-3">{v.title}</h3>
                <p className="text-foreground/70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
