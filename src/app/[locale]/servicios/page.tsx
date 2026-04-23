import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Bus, Hotel, Users, ShieldCheck, Utensils, CalendarCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";

const serviceIcons = [Bus, Hotel, Users, ShieldCheck, Utensils, CalendarCheck];

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const services = [
    { key: "transport", icon: Bus },
    { key: "accommodation", icon: Hotel },
    { key: "guides", icon: Users },
    { key: "insurance", icon: ShieldCheck },
    { key: "food", icon: Utensils },
    { key: "events", icon: CalendarCheck },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/50">
      {/* Hero */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/image/nevado-tolima.jpg')" }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
            {t("title")}
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/85 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-heading text-foreground mb-3">
                {t(`${key}.title`)}
              </h3>
              <p className="text-foreground/70 leading-relaxed mb-4">
                {t(`${key}.description`)}
              </p>
              <ul className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {t(`${key}.feature${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-white rounded-3xl p-12 md:p-16 shadow-sm border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8 text-lg">
            {t("ctaSubtitle")}
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-accent hover:brightness-90 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </div>
    </div>
  );
}
