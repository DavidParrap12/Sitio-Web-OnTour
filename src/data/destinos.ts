export interface Destino {
  id: string;
  image: string;
  brochureUrl?: string;
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
  },
];
