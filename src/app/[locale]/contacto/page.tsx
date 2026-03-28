import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionTitle } from "@/components/SectionTitle";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export default async function Contacto({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto mt-12 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">

          {/* Contact Info Sidebar */}
          <div className="bg-primary text-white p-10 md:p-14 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-6">{t("infoTitle")}</h3>
              <p className="text-white/80 mb-10 leading-relaxed">{t("infoSubtitle")}</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-lg">+57 300 232 2335</p>
                    <p className="font-semibold text-lg">57 316 538 6892</p>
                    <p className="text-sm text-white/70">{t("schedule")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-lg">gerencia@agenciaontour.com</p>
                    <p className="font-semibold text-lg">ontoursas@gmail.com</p>
                    <p className="text-sm text-white/70">{t("support")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-lg">Ibagué, Colombia</p>
                    <p className="text-sm text-white/70">{t("mainOffice")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-10 md:p-14">
            <ContactForm />
          </div>
        </div>

        {/* Google Maps */}
        <div className="max-w-5xl mx-auto mt-10">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <div className="px-8 pt-8 pb-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">{t("mapTitle")}</h3>
                <p className="text-sm text-foreground/60">Ibagué, Tolima, Colombia</p>
              </div>
            </div>
            <div className="w-full h-80 md:h-96">
              <iframe
                title="Ubicación On Tour Agencia de Viajes y Turismo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.28!2d-75.2412314!3d4.4453522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c5dc9b21e75d%3A0xdfe89bd87d6ae4a2!2sOn%20Tour%20Agencia%20de%20Viajes%20y%20Turismo!5e0!3m2!1ses!2sco!4v1742604175123!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
