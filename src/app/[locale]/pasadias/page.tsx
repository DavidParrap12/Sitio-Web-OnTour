import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionTitle } from "@/components/SectionTitle";
import { CardDestino } from "@/components/CardDestino";
import { destinos } from "@/data/destinos";

export default async function Pasadias({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("dayTrips");
  const tData = await getTranslations("destinosData");

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {destinos.map((destino) => (
            <CardDestino
              key={destino.id}
              type="pasadia"
              title={tData(`${destino.id}.name`)}
              description={tData(`${destino.id}.description`)}
              duration={tData(`${destino.id}.duration`)}
              image={destino.image}
              href={`/pasadias/${destino.id}`}
              brochureUrl={destino.brochureUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
