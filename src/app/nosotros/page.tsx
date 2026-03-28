import { SectionTitle } from "@/components/SectionTitle";
import Image from "next/image";
import { Compass, Users, Target, Heart } from "lucide-react";

export const metadata = {
  title: "Quiénes Somos | Ontour",
  description: "Conoce más sobre Ontour, nuestra misión, visión y equipo de expertos en turismo.",
};

export default function Nosotros() {
  const values = [
    { icon: <Compass className="w-6 h-6" />, title: "Aventura", desc: "Buscamos siempre nuevos horizontes." },
    { icon: <Users className="w-6 h-6" />, title: "Comunidad", desc: "Viajar es compartir grandes momentos." },
    { icon: <Target className="w-6 h-6" />, title: "Excelencia", desc: "El mejor servicio en cada paso." },
    { icon: <Heart className="w-6 h-6" />, title: "Pasión", desc: "Amamos lo que hacemos." },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/50">
      {/* Hero Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/image/on-tour-ofc-centro-2025-scaled.jpg')" }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Nuestra Historia</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            Somos una empresa con sede en el corazón de los Andes Colombianos comprometidos a enseñar lo mejor del País de la Belleza, somos un equipo de más de 20 Personas en la compañía y nos destacamos por nuestro conocimiento, profesionalismo y cercanía con los pasajeros.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-24">
        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-heading font-bold text-primary mb-6 flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">M</span>
              Nuestra Misión
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Brindar experiencias turísticas excepcionales, promoviendo el desarrollo sostenible de las regiones, el respeto por la cultura local y la máxima satisfacción de nuestros viajeros a través de pasadías y circuitos inolvidables.
            </p>
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-heading font-bold text-accent mb-6 flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">E</span>
              Experiencias únicas en Colombia
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              En On Tour DMC Colombia, conectamos a los viajeros con experiencias auténticas y memorables en todo el país.
              Somos expertos locales, diseñamos y operamos recorridos a la medida con atención personalizada, confianza y un acompañamiento cercano en cada etapa del viaje.
            </p>
          </div>
        </div>
        
        {/* Valores */}
        <div className="mb-24">
          <SectionTitle title="Nuestros Valores" subtitle="Los pilares de cada uno de nuestros viajes." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="font-bold text-xl font-heading mb-3">{v.title}</h3>
                <p className="text-foreground/70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
