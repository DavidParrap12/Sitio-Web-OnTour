export interface Destino {
  id: string;
  name: string;
  description: string;
  duration: string;
  image: string;
  highlights: string[];
  brochureUrl?: string;
}

export const destinos: Destino[] = [
  {
    id: "rafting-coello-pasadia",
    name: "Antioquia es Mágica – Rafting y Aventura en el Río Coello",
    description: "Adrenalina pura en las aguas del Tolima. Disfruta de una experiencia inolvidable practicando rafting, canopy y otros deportes extremos en Coello, un destino perfecto para los amantes de la aventura y la naturaleza.",
    duration: "Full Day",
    image: "/image/julianza-medellin-182353.jpg",
    highlights: [
      "Transporte incluido",
      "Equipo de seguridad",
      "Guías profesionales",
      "Actividad de rafting",
      "Seguro de asistencia"
    ],
    brochureUrl: "https://estaciongrafica.co/ontour/pasadias-medellin/"
  },
  {
    id: "bogota-tu-casa-pasadia",
    name: "Bogotá, Tú Casa",
    description: "Descubre la magia de Bogotá y sus alrededores en un día lleno de historia, cultura y gastronomía. Recorre la imponente Catedral de Sal de Zipaquirá, el colonial pueblo patrimonio de Villa de Leyva y las coloridas calles artesanales de Ráquira. Completa la experiencia con un tour gastronómico por los sabores más auténticos de la región y una panorámica inigualable de la capital colombiana.",
    duration: "Full Day",
    image: "/image/bogota-zipaquira.jpg",
    highlights: [
      "Transporte incluido",
      "Catedral de Sal de Zipaquirá",
      "Recorrido por Villa de Leyva",
      "Tour gastronómico",
      "Panorámica de Bogotá",
      "Guía turístico profesional"
    ],
    brochureUrl: "https://estaciongrafica.co/ontour/pagina-ejemplo/"
  },
  {
    id: "cascada-la-plata-pasadia",
    name: "Tolima, Corazón de los Andes – Cascada La Plata",
    description: "Descubre uno de los tesoros naturales más impresionantes de Ibagué. A través de una caminata ecológica, adéntrate en paisajes de selva, ríos y montañas hasta llegar a la majestuosa Cascada La Plata. Una experiencia de conexión con la naturaleza ideal para los amantes del senderismo y la aventura.",
    duration: "Full Day",
    image: "/image/ibagúe-tolima.jpg",
    highlights: [
      "Transporte opcional",
      "Guía ecológico",
      "Ingreso a la reserva natural",
      "Hidratación incluida",
      "Seguro de caminata"
    ],
    brochureUrl: "https://estaciongrafica.co/ontour/inicio/"
  }
];
