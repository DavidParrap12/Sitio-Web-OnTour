import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { CardDestino } from "@/components/CardDestino";
import { destinos } from "@/data/destinos";
import { circuitos } from "@/data/circuitos";
import { ShieldCheck, Map, HeartHandshake, Headphones } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const topPasadias = destinos.slice(0, 3);
  const topCircuitos = circuitos.slice(0, 3);

  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
      title: "Viajes Seguros",
      description: "Contamos con todas las pólizas y protocolos para tu tranquilidad."
    },
    {
      icon: <Map className="w-8 h-8 text-secondary" />,
      title: "Rutas Exclusivas",
      description: "Descubre lugares increíbles que no están en las guías tradicionales."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-secondary" />,
      title: "Trato Humano",
      description: "Atención personalizada para que tu viaje sea exactamente lo que sueñas."
    },
    {
      icon: <Headphones className="w-8 h-8 text-secondary" />,
      title: "Soporte 24/7",
      description: "Asistencia continua durante todo tu recorrido con nosotros."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle 
            title="¿Por qué viajar con nosotros?" 
            subtitle="Nos apasiona mostrarte lo mejor de cada destino con el servicio que mereces."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-16">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pasadias */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionTitle 
              title="Pasadías Populares" 
              subtitle="Escapas de un día para recargar energía"
              alignment="left"
            />
            <Link href="/pasadias" className="mb-12 text-primary font-semibold hover:opacity-80 transition-opacity flex items-center gap-1">
              Ver todos los pasadías &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topPasadias.map(destino => (
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
      </section>

      {/* Featured Circuitos */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionTitle 
              title="Circuitos Inolvidables" 
              subtitle="Aventuras de varios días para exploradores"
              alignment="left"
            />
            <Link href="/circuitos" className="mb-12 text-primary font-semibold hover:opacity-80 transition-opacity flex items-center gap-1">
              Ver todos los circuitos &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCircuitos.map(circuito => (
              <CardDestino
                key={circuito.id}
                type="circuito"
                title={circuito.name}
                description={circuito.description}
                duration={`${circuito.days} Días / ${circuito.nights} Noches`}
                image={circuito.image}
                href={`/circuitos/${circuito.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Contáctanos hoy mismo y recibe una asesoría personalizada para planear tus vacaciones o pasadía soñado.
          </p>
          <Link 
            href="/contacto"
            className="inline-block bg-accent hover:brightness-90 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Cotiza con Nosotros
          </Link>
        </div>
      </section>
    </div>
  );
}
