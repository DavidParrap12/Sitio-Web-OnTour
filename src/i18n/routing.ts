import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "de", "fr"],
  defaultLocale: "es",
  pathnames: {
    "/": "/",
    "/nosotros": {
      es: "/nosotros",
      en: "/about",
      de: "/ueber-uns",
      fr: "/a-propos",
    },
    "/pasadias": {
      es: "/pasadias",
      en: "/day-trips",
      de: "/tagesausfluege",
      fr: "/excursions",
    },
    "/pasadias/[id]": {
      es: "/pasadias/[id]",
      en: "/day-trips/[id]",
      de: "/tagesausfluege/[id]",
      fr: "/excursions/[id]",
    },
    "/circuitos": {
      es: "/circuitos",
      en: "/circuits",
      de: "/rundreisen",
      fr: "/circuits",
    },
    "/circuitos/[id]": {
      es: "/circuitos/[id]",
      en: "/circuits/[id]",
      de: "/rundreisen/[id]",
      fr: "/circuits/[id]",
    },
    "/servicios": {
      es: "/servicios",
      en: "/services",
      de: "/dienstleistungen",
      fr: "/services",
    },
    "/galeria": {
      es: "/galeria",
      en: "/gallery",
      de: "/galerie",
      fr: "/galerie",
    },
    "/contacto": {
      es: "/contacto",
      en: "/contact",
      de: "/kontakt",
      fr: "/contact",
    },
    "/legal/terminos": {
      es: "/legal/terminos",
      en: "/legal/terms",
      de: "/legal/agb",
      fr: "/legal/conditions",
    },
    "/legal/privacidad": {
      es: "/legal/privacidad",
      en: "/legal/privacy",
      de: "/legal/datenschutz",
      fr: "/legal/confidentialite",
    },
    "/legal/registro-turismo": {
      es: "/legal/registro-turismo",
      en: "/legal/tourism-registry",
      de: "/legal/tourismusregister",
      fr: "/legal/registre-tourisme",
    },
    "/legal/faq": "/legal/faq",
  },
});
