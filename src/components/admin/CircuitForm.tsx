"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Save,
} from "lucide-react";
import {
  createCircuit,
  updateCircuit,
  type ActionState,
} from "@/app/admin/circuit-actions";

const LOCALES = [
  { id: "es", label: "Español" },
  { id: "en", label: "English" },
  { id: "de", label: "Deutsch" },
  { id: "fr", label: "Français" },
] as const;

type LocaleId = (typeof LOCALES)[number]["id"];

export interface CircuitTranslationInput {
  name: string;
  description: string;
  price: string;
  duration?: string;
  included?: string;
  excluded?: string;
  highlights: string[];
  itinerary: string[];
}

export interface CircuitFormValues {
  id: string;
  kind?: "circuit" | "day_trip";
  days: number;
  nights: number;
  image: string;
  colorTheme: string;
  region: string;
  mapEmbedUrl: string;
  brochureUrl: string;
  brochurePdfUrl: string;
  published: boolean;
  sortOrder: number;
  translations: Record<LocaleId, CircuitTranslationInput>;
}

const EMPTY_TRANSLATION: CircuitTranslationInput = {
  name: "",
  description: "",
  price: "",
  highlights: [],
  itinerary: [],
};

function emptyValues(): CircuitFormValues {
  return {
    id: "",
    days: 7,
    nights: 6,
    image: "",
    colorTheme: "cultura",
    region: "andes",
    mapEmbedUrl: "",
    brochureUrl: "",
    brochurePdfUrl: "",
    published: false,
    sortOrder: 0,
    translations: {
      es: { ...EMPTY_TRANSLATION },
      en: { ...EMPTY_TRANSLATION },
      de: { ...EMPTY_TRANSLATION },
      fr: { ...EMPTY_TRANSLATION },
    },
  };
}

export function CircuitForm({
  mode,
  initial,
}: {
  mode: "new" | "edit";
  initial?: CircuitFormValues;
}) {
  const values = initial ?? emptyValues();
  const [locale, setLocale] = useState<LocaleId>("es");
  const [state, action, pending] = useActionState<ActionState, FormData>(
    mode === "new" ? createCircuit : updateCircuit,
    { ok: false }
  );

  return (
    <form action={action} className="space-y-8">
      {mode === "edit" ? (
        <input type="hidden" name="id" value={values.id} />
      ) : null}

      {state.error ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      <section className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-7">
        <h2 className="font-heading text-xl font-semibold text-stone-900">
          Datos del producto
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          La duración, el mapa y los documentos son comunes a los cuatro idiomas.
        </p>

        <label className="admin-label mt-4">Tipo de producto<select name="kind" defaultValue={values.kind??"circuit"} className="admin-field"><option value="circuit">Circuito</option><option value="day_trip">Pasadía</option></select></label><div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
              Identificador (URL)
            </label>
            <input
              name="id"
              defaultValue={values.id}
              disabled={mode === "edit"}
              readOnly={mode === "edit"}
              placeholder="tour-colombia-caribe"
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 font-mono text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15 disabled:bg-stone-100 disabled:text-stone-500"
            />
            <p className="mt-1 text-[11px] text-stone-400">
              Se usa en la dirección: /circuitos/…
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
              Días
            </label>
            <input
              name="days"
              type="number"
              min={1}
              max={365}
              defaultValue={values.days}
              required
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
              Noches
            </label>
            <input
              name="nights"
              type="number"
              min={0}
              max={364}
              defaultValue={values.nights}
              required
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
              Región (filtro)
            </label>
            <select
              name="region"
              defaultValue={values.region}
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
            >
              <option value="andes">Andes</option>
              <option value="cafetero">Eje Cafetero</option>
              <option value="caribe">Caribe</option>
              <option value="tolima">Tolima</option>
              <option value="boyaca">Boyacá</option>
              <option value="sur">Sur</option>
              <option value="santander">Santander</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
              Tema visual
            </label>
            <select
              name="color_theme"
              defaultValue={values.colorTheme}
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
            >
              <option value="cultura">Cultura</option>
              <option value="naturaleza">Naturaleza</option>
              <option value="aventura">Aventura</option>
              <option value="playa">Playa</option>
              <option value="urbano">Urbano</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
              Orden en la web
            </label>
            <input
              name="sort_order"
              type="number"
              defaultValue={values.sortOrder}
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
            />
            <p className="mt-1 text-[11px] text-stone-400">
              Menor número aparece primero.
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
              Imagen de portada (URL)
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <input
                name="image"
                defaultValue={values.image}
                placeholder="/image/… o https://…"
                className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
              />
              {values.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={values.image}
                  alt="Portada"
                  className="h-20 w-32 shrink-0 rounded-xl border border-stone-200 object-cover"
                />
              ) : null}
            </div>
            <p className="mt-1 text-[11px] text-stone-400">
              Puedes subir una foto nueva en la sección Multimedia y marcarla
              como portada.
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
              Mapa (URL de inserción de Google Maps)
            </label>
            <input
              name="map_embed_url"
              defaultValue={values.mapEmbedUrl}
              placeholder="https://www.google.com/maps/d/u/0/embed?mid=…"
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
              Programa Word (URL)
            </label>
            <input
              name="brochure_url"
              defaultValue={values.brochureUrl}
              placeholder="/programas-circuitos/…docx"
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
              Programa PDF (URL)
            </label>
            <input
              name="brochure_pdf_url"
              defaultValue={values.brochurePdfUrl}
              placeholder="/programas-circuitos/…pdf"
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
            />
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 sm:col-span-2 lg:col-span-1">
            <input
              type="checkbox"
              name="published"
              defaultChecked={values.published}
              className="mt-0.5 h-4 w-4 accent-[#16352D]"
            />
            <span>
              <span className="block text-sm font-semibold text-stone-800">
                Publicado
              </span>
              <span className="block text-[11px] text-stone-500">
                Si lo desmarcas, deja de aparecer en la web.
              </span>
            </span>
          </label>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-semibold text-stone-900">
              Textos por idioma
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Nombre, descripción e itinerario. Los precios se gestionan en Tarifas.
            </p>
          </div>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-medium text-stone-500">
            El español es obligatorio
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {LOCALES.map((item) => {
            const translation = values.translations[item.id];
            const complete = Boolean(translation.name && translation.description);
            const active = locale === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setLocale(item.id)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-[#16352D] bg-[#16352D] text-white"
                    : "border-stone-300 bg-white text-stone-600 hover:border-[#16352D]/50"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    complete ? "bg-emerald-400" : "bg-stone-300"
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </div>

        {LOCALES.map((item) => {
          const translation = values.translations[item.id];
          const hidden = locale !== item.id;
          return (
            <div key={item.id} className={hidden ? "hidden" : "mt-6 space-y-5"}><label className="admin-label">Incluye<textarea className="admin-field" name={"included_"+item.id} defaultValue={translation.included}/></label><label className="admin-label">No incluye<textarea className="admin-field" name={"excluded_"+item.id} defaultValue={translation.excluded}/></label>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Nombre del circuito {item.id === "es" ? "*" : ""}
                  </label>
                  <input
                    name={`name_${item.id}`}
                    defaultValue={translation.name}
                    required={item.id === "es"}
                    className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Duración descriptiva
                  </label>
                  <input
                    name={`duration_${item.id}`}
                    defaultValue={translation.duration}
                    placeholder="8 horas / 7 días"
                    className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
                  />
                  <p className="mt-1 text-[11px] text-stone-400">
                    La tarifa se calcula desde la sección Tarifas.
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
                  Descripción
                </label>
                <textarea
                  name={`description_${item.id}`}
                  defaultValue={translation.description}
                  rows={4}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Lo que vivirás (una línea por punto)
                  </label>
                  <textarea
                    name={`highlights_${item.id}`}
                    defaultValue={translation.highlights.join("\n")}
                    rows={5}
                    placeholder={"Centro histórico de Cartagena\nIslas del Rosario"}
                    className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Itinerario (una línea por día)
                  </label>
                  <textarea
                    name={`itinerary_${item.id}`}
                    defaultValue={translation.itinerary.join("\n")}
                    rows={5}
                    placeholder={"Día 1 — Llegada y city tour\nDía 2 — Islas del Rosario"}
                    className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:border-[#16352D] hover:text-[#16352D]"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-[#16352D] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#B49A68] hover:text-[#16352D] disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : mode === "new" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {pending
            ? "Guardando..."
            : mode === "new"
              ? "Crear circuito"
              : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
