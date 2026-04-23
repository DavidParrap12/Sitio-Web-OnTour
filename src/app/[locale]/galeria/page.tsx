import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Camera } from "lucide-react";
import { GalleryGrid, type GalleryImage } from "@/components/GalleryGrid";

// Gallery data — add your images here. Categories are used for filtering.
const galleryImages: GalleryImage[] = [
  // Tolima
  { src: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.08 PM.jpeg", alt: "Ibagué, Ciudad Musical", category: "Tolima" },
  { src: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.09 PM.jpeg", alt: "Nevado del Tolima", category: "Tolima" },
  { src: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.09 PM (1).jpeg", alt: "Cascadas de Prado", category: "Tolima" },
  { src: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.09 PM (2).jpeg", alt: "Represa de Prado", category: "Tolima" },
  { src: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.10 PM.jpeg", alt: "Cordillera de los Andes", category: "Tolima" },
  { src: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.10 PM (1).jpeg", alt: "Puente de Cristal, Huila", category: "Tolima" },
  { src: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.10 PM (2).jpeg", alt: "Puente de Cristal, Huila", category: "Tolima" },
  { src: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.10 PM (3).jpeg", alt: "Puente de Cristal, Huila", category: "Tolima" },
  { src: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.10 PM (4).jpeg", alt: "Puente de Cristal, Huila", category: "Tolima" },
  { src: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.11 PM.jpeg", alt: "Puente de Cristal, Huila", category: "Tolima" },
  { src: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.11 PM (1).jpeg", alt: "Puente de Cristal, Huila", category: "Tolima" },
  // Bogotá
  { src: "/image/bogota-zipaquira.jpg", alt: "Bogotá y Zipaquirá", category: "Bogotá" },
  { src: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", alt: "Aeropuerto El Dorado", category: "Bogotá" },
  { src: "/image/legado-ancestral/iglesia-monserrate-1.jpg", alt: "Monserrate", category: "Bogotá" },
  { src: "/image/legado-ancestral/catedral-1.jpg", alt: "Catedral de Sal, Zipaquirá", category: "Bogotá" },
  // Caribe
  { src: "/image/cuidad-amurallada.jpg", alt: "Ciudad Amurallada, Cartagena", category: "Caribe" },
  // Eje Cafetero
  { src: "/image/guatape.jpg", alt: "Guatapé", category: "Eje Cafetero" },
  { src: "/image/makalu-colombia-3631740.jpg", alt: "Paisaje Cafetero", category: "Eje Cafetero" },
  // Boyacá
  { src: "/image/villa de leyva.jpg", alt: "Villa de Leyva", category: "Boyacá" },
];

const categories = ["Tolima", "Bogotá", "Caribe", "Eje Cafetero", "Boyacá"];

export default async function GaleriaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/50">
      {/* Hero */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: "url('/image/makalu-colombia-3631740.jpg')" }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
            {t("title")}
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/85 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="container mx-auto px-4 md:px-6 mt-12 md:mt-16">
        <GalleryGrid images={galleryImages} categories={categories} />
      </div>
    </div>
  );
}
