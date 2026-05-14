import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionTitle } from "@/components/SectionTitle";
import { ReconocimientosGallery } from "@/components/ReconocimientosGallery";
import Image from "next/image";

export default async function Nosotros({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/50">
      {/* Hero Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <Image
          src="/image/on-tour-ofc-centro-2025-scaled.jpg"
          alt=""
          fill
          sizes="100vw"
          className="opacity-20 object-cover"
        />
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

        {/* Reconocimientos y Certificaciones */}
        <div className="mb-24">
          <SectionTitle title={t("recognitionsTitle")} subtitle={t("recognitionsSubtitle")} />
          <ReconocimientosGallery closeLabel={t("recognitionsClose")} />
        </div>
      </div>
    </div>
  );
}
