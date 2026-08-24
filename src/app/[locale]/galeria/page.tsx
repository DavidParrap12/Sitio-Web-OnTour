import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Camera } from "lucide-react";
import { GaleriaEditorial, type GalleryImageData } from "./GaleriaEditorial";
import Image from "next/image";

// Gallery data — used by the editorial gallery layout.
const galleryImages: GalleryImageData[] = [
  // Tolima
  { src: "/image/Tolima-fotos/tolima_nevado-ruiz-emision-ceniza-vista-aerea.jpeg", alt: "Nevado del Ruiz - Emisión de ceniza", category: "Tolima" },
  { src: "/image/Tolima-fotos/ibague_cañon-combeima-senalizacion-turistica.jpeg", alt: "Cañón de Combeima - Señalización Turística", category: "Tolima" },
  { src: "/image/Tolima-fotos/ibague_vista-aerea-guayacanes-en-flor.jpeg", alt: "Vista aérea - Guayacán en flor", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_paramo-frailejones-paisaje.jpeg", alt: "Páramo con frailejones", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_sendero-piedra-vegetacion-tropical.jpeg", alt: "Sendero con piedras y vegetación tropical", category: "Tolima" },
  { src: "/image/Tolima-fotos/ibague_catedral-nocturna-luna-llena.jpeg", alt: "Catedral de Ibagué nocturna con luna llena", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_edificio-colonial-arcos-patio.jpeg", alt: "Edificio colonial con arcos y patio", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_hibisco-rojo-palmera-tropical.jpeg", alt: "Hibisco rojo con Palmera tropical", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_escultura-musico-guitarrista-plaza.jpeg", alt: "Escultura de músico guitarrrista en plaza", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_palmas-cera-niebla-montana-mistico.jpeg", alt: "Palmas de cera con niebla en montaña", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_alpinista-bandera-colombia-nevado-cumbre.jpeg", alt: "Alpinista con bandera en Nevado del Ruiz", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_palmas-cera-valle-cielo-nublado.jpeg", alt: "Palmas de cera en valle con cielo nublado", category: "Tolima" },
  { src: "/image/Tolima-fotos/ibague_guayacan-rosado-florecido-detalle.jpeg", alt: "Guayacán rosado florecido - detalle", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_sendero-ecologico-pinos-barandal.jpeg", alt: "Sendero ecológico con pinos y barandal", category: "Tolima" },
  { src: "/image/Tolima-fotos/ibague_torre-iglesia-guayacan-rosado.jpeg", alt: "Torre de iglesia con guayacán rosado", category: "Tolima" },
  { src: "/image/Tolima-fotos/ibague_guayacan-rosado-copa-vista-inferior.jpeg", alt: "Guayacán rosado - vista inferior de la copa", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_cabana-rural-montana-niebla-campesino.jpeg", alt: "Cabaña rural en montaña con niebla", category: "Tolima" },
  { src: "/image/Tolima-fotos/ibague_collage-guayacan-ciudad-iglesia-estatua.jpeg", alt: "Collage de guayacanes, ciudad e iglesia", category: "Tolima" },
  { src: "/image/Tolima-fotos/ibague_catedral-torre-reloj-cupula-guayacan.jpeg", alt: "Catedral con torre de reloj y cupula", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_nevado-ruiz-columna-ceniza-vista-aerea-atardecer.jpeg", alt: "Nevado del Ruiz - columna de ceniza al atardecer", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_bosque-palmas-cera-vista-aerea-drone.jpeg", alt: "Bosque de palmas de cera - vista aérea con drone", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_loros-periquitos-pelea-rama-fauna.jpeg", alt: "Loros y periquitos peleando en rama", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_bandada-loros-vuelo-bosque-fauna.jpeg", alt: "Bandada de loros volando en el bosque", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_campesino-paraguas-palmas-cera-lluvia-niebla.jpeg", alt: "Campesino con paraguas entre palmas de cera", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_palmas-cera-ladera-verde-cielo-azul.jpeg", alt: "Palmas de cera en ladera verde con cielo azul", category: "Tolima" },
  { src: "/image/Tolima-fotos/tolima_palmas-cera-vista-inferior-contrapicado.jpeg", alt: "Palmas de cera - vista inferior contrapicado", category: "Tolima" },
  // Bogotá
  { src: "/image/imagenes-pasadias/bogota-zipaquira.jpg", alt: "Bogotá y Zipaquirá", category: "Bogotá" },
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
  // Experiencias de clientes (fotos de viajeros)
  { src: "/image/Canotaje_Rio_Fonce_10_8337700f9c.jpg", alt: "Canotaje en el Río Fonce", category: "Experiencias", author: "Familia Martínez" },
  { src: "/image/cascade-juan-curi-colombie.jpg", alt: "Cascada Juan Curí, San Gil", category: "Experiencias", author: "Andrea R." },
  { src: "/image/Nuquí-entre-ballenas–1.jpg", alt: "Ballenas jorobadas en Nukuí", category: "Experiencias", author: "Carlos y María" },
  { src: "/image/parque-el-gallineral-san-gil-4.jpg", alt: "Parque El Gallineral, San Gil", category: "Experiencias", author: "Grupo Bogotá 2024" },
  // Fotos de turistas — agosto 2026
  { src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.21%20PM.jpeg", alt: "Turistas disfrutando Colombia con OnTour", category: "Experiencias", author: "OnTour Viajeros" },
  { src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.29%20PM.jpeg", alt: "Momentos únicos en Colombia", category: "Experiencias", author: "OnTour Viajeros" },
  { src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.30%20PM.jpeg", alt: "Explorando Colombia con OnTour", category: "Experiencias", author: "OnTour Viajeros" },
  { src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.31%20PM%20(1).jpeg", alt: "Aventura en tierras colombianas", category: "Experiencias", author: "OnTour Viajeros" },
  { src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.31%20PM.jpeg", alt: "Paisajes y recuerdos de Colombia", category: "Experiencias", author: "OnTour Viajeros" },
  { src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.32%20PM%20(1).jpeg", alt: "Viajeros felices en Colombia", category: "Experiencias", author: "OnTour Viajeros" },
  { src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.32%20PM%20(2).jpeg", alt: "Recuerdos del viaje a Colombia", category: "Experiencias", author: "OnTour Viajeros" },
  { src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.32%20PM%20(3).jpeg", alt: "Experiencia OnTour en Colombia", category: "Experiencias", author: "OnTour Viajeros" },
  { src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.32%20PM.jpeg", alt: "Turistas explorando destinos colombianos", category: "Experiencias", author: "OnTour Viajeros" },
  { src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.33%20PM%20(1).jpeg", alt: "Momentos inolvidables en Colombia", category: "Experiencias", author: "OnTour Viajeros" },
  { src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.33%20PM.jpeg", alt: "Colombia a través de los ojos del viajero", category: "Experiencias", author: "OnTour Viajeros" },
];

const categories = ["Tolima", "Bogotá", "Caribe", "Eje Cafetero", "Boyacá", "Experiencias"];

export default async function GaleriaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");

  return (
    <GaleriaEditorial
      images={galleryImages}
      categories={categories}
      title={t("title")}
      subtitle={t("subtitle")}
      filterAllLabel={t("all")}
    />
  );
}
