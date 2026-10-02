# OnTour DMC Colombia — Sitio Web Oficial

Plataforma digital para **On Tour S.A.S. (OnTour DMC Colombia)**, agencia de viajes y operador receptivo registrada con **RNT 62212** en Ibagué, Tolima.

El sitio ofrece un catálogo editorial interactivo de experiencias turísticas, pasadías, circuitos multirregionales, programas de bienestar/salud, galería fotográfica multilingüe y sistema de cotizaciones directas vía Formspree y WhatsApp.

---

## 🚀 Tecnologías Principales

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Next 16 conventions con `proxy.ts`)
- **Librería UI:** [React 19](https://react.dev/)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/) + Sistema de Diseño Editorial (`@/app/globals.css`)
- **Internacionalización (i18n):** [next-intl](https://next-intl.dev/) con soporte para 4 idiomas:
  - 🇪🇸 Español (`es`)
  - 🇺🇸 Inglés (`en`)
  - 🇫🇷 Francés (`fr`)
  - 🇩🇪 Alemán (`de`)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Mapas:** [Leaflet](https://leafletjs.com/) + React Leaflet con capas personalizadas
- **Tipografía:** Bodoni Moda (editorial/lujo) + Plus Jakarta Sans (cuerpo moderno)
- **Generación y Descarga de Documentos:** `jspdf`, `docx`, `file-saver`
- **Formularios:** React Hook Form + Formspree

---

## 📁 Estructura del Proyecto

```text
Ontour/
├── docs/                      # Documentación del proyecto y material fuente
│   ├── material-fuente/       # Documentos de referencia originales (.docx, .pdf)
│   │   ├── circuitos/         # Folletos y planes originales de circuitos
│   │   └── reconocimientos/   # Certificados y tarjetas profesionales
│   ├── COMPONENTS.md          # Catálogo de componentes y catálogo visual
│   ├── DESIGN_SYSTEM_PLAN.md  # Arquitectura del sistema de diseño editorial
│   └── VISUAL_IDENTITY.md     # Guía de identidad visual, paleta y tipografía
│
├── messages/                  # Diccionarios de traducción i18n
│   ├── es.json                # Español (idioma base)
│   ├── en.json                # Inglés
│   ├── fr.json                # Francés
│   └── de.json                # Alemán
│
├── public/                    # Archivos estáticos servidos públicamente
│   ├── image/                 # Fotografías organizadas por región y sección
│   │   ├── Tolima-fotos/      # Paisajes, fauna y atractivos del Tolima
│   │   ├── fotos-turistas/    # Fotos de viajeros y reseñas reales
│   │   ├── reconocimientos/   # PDFs de certificaciones mostrados en web
│   │   └── ...
│   ├── programas-circuitos/   # Folletos .docx y .pdf descargables en la web
│   └── RNT-ON-TOUR-2027.pdf   # Certificado oficial de Registro Nacional de Turismo
│
├── src/                       # Código fuente de la aplicación
│   ├── app/                   # Next.js App Router
│   │   ├── [locale]/          # Rutas internacionalizadas (/es, /en, /fr, /de)
│   │   │   ├── bienestar/     # Página de Retiros de Bienestar y Salud
│   │   │   ├── circuitos/     # Catálogo y detalle dinámico de Circuitos ([id])
│   │   │   ├── contacto/      # Página de contacto y formulario
│   │   │   ├── galeria/       # Galería fotográfica editorial con lightbox
│   │   │   ├── legal/         # Términos, condiciones y Registro de Turismo
│   │   │   ├── nosotros/      # Historia, equipo y certificaciones
│   │   │   ├── pasadias/      # Pasadías y aventuras de un día ([id])
│   │   │   ├── servicios/     # Transporte, guianza, alojamiento y eventos
│   │   │   ├── layout.tsx     # Layout localizado con Navbar, Footer y Modales
│   │   │   └── page.tsx       # Portada principal (Home)
│   │   ├── api/               # Endpoints de API internos
│   │   ├── globals.css        # Variables del sistema de diseño y utilidades
│   │   ├── layout.tsx         # Root layout HTML
│   │   ├── robots.ts          # Configuración SEO robots
│   │   └── sitemap.ts         # Generación dinámica de sitemap multilingüe
│   │
│   ├── components/            # Componentes reutilizables de UI
│   │   ├── editorial/         # Primitivas del sistema de diseño editorial
│   │   ├── wellness/          # Componentes especializados de la sección Bienestar
│   │   ├── Navbar.tsx         # Navegación global con selector de idioma
│   │   ├── Footer.tsx         # Pie de página y enlaces institucionales
│   │   ├── Testimonials.tsx   # Carrusel interactivo de reseñas Google con estrellas
│   │   ├── RequestQuoteModal  # Modal interactivo de cotización rápida
│   │   └── ...
│   │
│   ├── data/                  # Fuentes de datos estáticos y colecciones
│   │   ├── circuitos.ts       # Datos de circuitos (itinerarios, precios, días)
│   │   ├── destinos.ts        # Información de destinos y regiones
│   │   ├── gallery.ts         # Fotografías de galería con textos i18n
│   │   ├── testimonials.ts    # Reseñas reales de clientes verificados
│   │   └── index.ts           # Barrel export de colecciones de datos
│   │
│   ├── i18n/                  # Configuración de routing y navegación i18n
│   │   ├── routing.ts         # Idiomas soportados y prefijo de locale
│   │   └── request.ts         # Carga de mensajes por locale para Next
│   │
│   ├── lib/                   # Utilidades, configuración y tipos
│   │   ├── analytics.ts       # Seguimiento de eventos y métricas
│   │   ├── design-config.ts   # Tokens de diseño, dimensiones y animaciones
│   │   ├── googleSheets.ts    # Conexión opcional para captura de leads
│   │   ├── schema.ts          # Esquemas estructurados JSON-LD
│   │   └── hooks/             # Custom React Hooks (useFocusTrap, useReducedMotion)
│   │
│   └── proxy.ts               # Middleware de proxy i18n (Next.js 16)
│
└── package.json               # Dependencias y scripts de ejecución
```

---

## 🛠️ Comandos Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local en `http://localhost:3000` |
| `npm run build` | Compila la aplicación optimizada para producción |
| `npm run start` | Inicia el servidor de producción compilado |
| `npm run lint` | Ejecuta el análisis estático de código con ESLint |
| `npm run storybook` | Inicia el entorno de componentes Storybook en el puerto 6006 |
| `npm run build-storybook` | Construye la versión estática de Storybook |

---

## 🌐 Internacionalización (i18n)

Para añadir o editar textos traducidos:
1. Localiza el bloque correspondiente en `messages/es.json` (español).
2. Agrega las claves equivalentes en `messages/en.json`, `messages/fr.json` y `messages/de.json`.
3. Para colecciones de fotos o datos estructurados con traducción directa, consulta `src/data/gallery.ts` o `src/data/testimonials.ts`.
