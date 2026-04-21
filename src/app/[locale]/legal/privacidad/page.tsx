import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Shield } from "lucide-react";

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legalPrivacy");

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/50">
      {/* Hero */}
      <div className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">{t("title")}</h1>
          <p className="text-lg max-w-2xl mx-auto text-white/80">{t("subtitle")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">
          {(["dataCollection", "usage", "sharing", "security", "rights", "cookies"] as const).map((section) => (
            <section key={section}>
              <h2 className="text-xl font-heading font-bold text-primary mb-3">{t(`${section}.title`)}</h2>
              <p className="text-foreground/70 leading-relaxed whitespace-pre-line">{t(`${section}.text`)}</p>
            </section>
          ))}

          <p className="text-sm text-foreground/50 border-t border-gray-100 pt-6">{t("lastUpdated")}</p>
        </div>
      </div>
    </div>
  );
}
