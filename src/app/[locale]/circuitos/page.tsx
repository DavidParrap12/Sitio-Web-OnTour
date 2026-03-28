import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionTitle } from "@/components/SectionTitle";
import { CardDestino } from "@/components/CardDestino";
import { circuitos } from "@/data/circuitos";

export default async function Circuitos({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("circuits");

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {circuitos.map((circuito) => (
            <CardDestino
              key={circuito.id}
              type="circuito"
              title={circuito.name}
              description={circuito.description}
              duration={`${circuito.days} / ${circuito.nights}`}
              image={circuito.image}
              href={`/circuitos/${circuito.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
