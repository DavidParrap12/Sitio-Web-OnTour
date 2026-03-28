import { notFound } from "next/navigation";
import Image from "next/image";
import { destinos } from "@/data/destinos";
import { CheckCircle2, Clock, MapPin, Map } from "lucide-react";

export function generateStaticParams() {
  return destinos.map((destino) => ({
    id: destino.id,
  }));
}

export default async function PasadiaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const pasadia = destinos.find((d) => d.id === resolvedParams.id);

  if (!pasadia) return notFound();

  const whatsappMessage = `Hola, interesad@ en el pasadía: ${pasadia.name}`;
  const whatsappUrl = `https://wa.me/573132322335?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="pt-20 bg-secondary/50 min-h-screen pb-20">
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image 
          src={pasadia.image} 
          alt={pasadia.name} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6 text-white text-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium tracking-wide mb-4 uppercase">
              Pasadía Corto
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 drop-shadow-md">{pasadia.name}</h1>
            <div className="flex items-center justify-center gap-6 text-white/90 font-medium">
              <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Colombia</span>
              <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> {pasadia.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-heading font-bold mb-6 text-primary border-b pb-4">Descripción de la Actividad</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {pasadia.description}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-heading font-bold mb-6 text-primary border-b pb-4">Lo que encontrarás</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pasadia.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-foreground/80 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-heading font-bold mb-6 text-primary">Resumen</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Duración</p>
                    <p className="font-semibold">{pasadia.duration}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mb-8 text-center">
                <p className="text-sm text-foreground/60 mb-2">Precio sugerido</p>
                <div className="text-4xl font-black text-primary mb-2">
                  A Cotizar
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-2 bg-accent hover:brightness-90 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md"
              >
                Reservar Pasadía Ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
