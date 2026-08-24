import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Bus, Hotel, Users, ShieldCheck, Utensils, CalendarCheck, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ServiciosHero } from "./ServiciosHero";

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const services = [
    { key: "transport", icon: Bus, image: "/image/servicios/transport.jpeg" },
    { key: "accommodation", icon: Hotel, image: "/image/servicios/accommodation.jpeg" },
    { key: "guides", icon: Users, image: "/image/servicios/guides.jpeg" },
    { key: "insurance", icon: ShieldCheck, image: "/image/servicios/insurance.jpeg" },
    { key: "food", icon: Utensils, image: "/image/servicios/food.jpg" },
    { key: "events", icon: CalendarCheck, image: "/image/servicios/events.jpeg" },
  ];

  return (
    <div className="min-h-screen bg-editorial-warm">
      {/* Hero — editorial style (same as Circuitos) */}
      <ServiciosHero title={t("title")} subtitle={t("subtitle")} />

      {/* Services Grid */}
      <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ key, icon: Icon, image }) => (
            <div
              key={key}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col"
            >
              {/* Image area */}
              <div className="relative h-52 w-full overflow-hidden bg-primary/10 shrink-0">
                <Image
                  src={image}
                  alt={t(`${key}.title`)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Icon badge */}
                <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm text-primary flex items-center justify-center shadow-md group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-xl font-bold font-heading text-foreground mb-3">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-4 text-sm">
                  {t(`${key}.description`)}
                </p>
                <ul className="space-y-2 mt-auto">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {t(`${key}.feature${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-accent hover:brightness-90 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {t("ctaButton")}
            </Link>
            <a
              href="https://reservas.ontourdmc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-gray-200 hover:border-gray-300 bg-gray-50/80 hover:bg-gray-100/90 text-foreground/75 hover:text-foreground text-sm font-medium transition-all"
            >
              <span>{t("aviaturButton")}</span>
              <ExternalLink className="w-4 h-4 text-foreground/45" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
