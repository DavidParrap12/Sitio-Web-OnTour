import { MetadataRoute } from "next";
import { destinos } from "@/data/destinos";
import { circuitos } from "@/data/circuitos";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.agenciaontour.com";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/nosotros`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pasadias`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/circuitos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contacto`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/servicios`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/galeria`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/legal/terminos`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/privacidad`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/registro-turismo`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/legal/faq`, changeFrequency: "monthly", priority: 0.5 },
    ...destinos.map((d) => ({
      url: `${base}/pasadias/${d.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...circuitos.map((c) => ({
      url: `${base}/circuitos/${c.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
