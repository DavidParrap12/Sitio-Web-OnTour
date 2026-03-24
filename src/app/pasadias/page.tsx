import { SectionTitle } from "@/components/SectionTitle";
import { CardDestino } from "@/components/CardDestino";
import { destinos } from "@/data/destinos";

export const metadata = {
  title: "Pasadías | Ontour",
  description: "Descubre nuestros fantásticos pasadías turísticos repletos de actividades.",
};

export default function Pasadias() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="Pasadías y Excursiones" 
          subtitle="Explora nuestra selección de planes de un día perfectos para escapar de la rutina."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {destinos.map(destino => (
            <CardDestino
              key={destino.id}
              type="pasadia"
              title={destino.name}
              description={destino.description}
              duration={destino.duration}
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
