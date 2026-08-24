import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ContactoEditorial } from "./ContactoEditorial";

export default async function Contacto({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <ContactoEditorial
      title={t("title")}
      subtitle={t("subtitle")}
      infoTitle={t("infoTitle")}
      infoSubtitle={t("infoSubtitle")}
      schedule={t("schedule")}
      support={t("support")}
      mainOffice={t("mainOffice")}
      mapTitle={t("mapTitle")}
    />
  );
}