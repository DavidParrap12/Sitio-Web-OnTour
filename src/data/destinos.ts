export interface Destino {
  id: string;
  image: string;
  brochureUrl?: string;
  gallery?: string[];
}

export const destinos: Destino[] = [
  {
    id: "rafting-coello-pasadia",
    image: "/image/julianza-medellin-182353.jpg",
    brochureUrl: "https://estaciongrafica.co/ontour/pasadias-medellin/",
  },
  {
    id: "bogota-tu-casa-pasadia",
    image: "/image/bogota-zipaquira.jpg",
    brochureUrl: "https://estaciongrafica.co/ontour/pagina-ejemplo/",
  },
  {
    id: "cascada-la-plata-pasadia",
    image: "/image/ibagúe-tolima.jpg",
    brochureUrl: "https://estaciongrafica.co/ontour/inicio/",
    gallery: [
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0001.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0002.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0003.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0004.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0005.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0006.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0007.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0008.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0009.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0010.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0011.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0012.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0013.jpg",
    ],
  },
];
