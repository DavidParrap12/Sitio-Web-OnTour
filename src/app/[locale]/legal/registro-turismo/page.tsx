import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { BadgeCheck } from "lucide-react";

export default async function RegistroTurismoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legalTourism");

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/50">
      {/* Hero */}
      <div className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BadgeCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">{t("title")}</h1>
          <p className="text-lg max-w-2xl mx-auto text-white/80">{t("subtitle")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12 max-w-4xl">
        {/* Registry card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">
          {/* Official badge */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 text-center">
            <BadgeCheck className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-primary mb-2">{t("registryTitle")}</h2>
            <p className="text-foreground/70 mb-4">{t("registryBody")}</p>
            <div className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-mono text-lg font-bold tracking-wider">
              {t("rntNumber")}
            </div>
          </div>

          <section>
            <h2 className="text-xl font-heading font-bold text-primary mb-3">{t("whatIsRnt.title")}</h2>
            <p className="text-foreground/70 leading-relaxed whitespace-pre-line">{t("whatIsRnt.text")}</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-primary mb-3">{t("guarantee.title")}</h2>
            <p className="text-foreground/70 leading-relaxed whitespace-pre-line">{t("guarantee.text")}</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-primary mb-3">{t("fontur.title")}</h2>
            <p className="text-foreground/70 leading-relaxed whitespace-pre-line">{t("fontur.text")}</p>
          </section>

          <p className="text-sm text-foreground/50 border-t border-gray-100 pt-6">{t("lastUpdated")}</p>
        </div>
      </div>
    </div>
  );
}
