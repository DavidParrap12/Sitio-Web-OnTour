import { SectionTitle } from "@/components/SectionTitle";
import { CardDestino } from "@/components/CardDestino";
import { circuitos } from "@/data/circuitos";

export const metadata = {
  title: "Circuitos Turísticos | Ontour",
  description: "Aventuras de varios días para los exploradores de verdad con Ontour.",
};

export default function Circuitos() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="Circuitos de Varios Días" 
          subtitle="Sumergete en unas vacaciones inolvidables descubriendo lo mejor de cada región."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {circuitos.map(circuito => (
            <CardDestino
              key={circuito.id}
              type="circuito"
              title={circuito.name}
              description={circuito.description}
              price={circuito.price}
              duration={`${circuito.days} Días / ${circuito.nights} Noches`}
              image={circuito.image}
              href={`/circuitos/${circuito.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}