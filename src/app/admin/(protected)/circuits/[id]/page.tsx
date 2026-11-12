import {DepartureManager} from "@/components/admin/DepartureManager";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/adminAuth";
import {
  CircuitForm,
  type CircuitFormValues,
} from "@/components/admin/CircuitForm";
import { MediaManager } from "@/components/admin/MediaManager";
import { PriceManager } from "@/components/admin/PriceManager";
import { DeleteCircuitButton } from "@/components/admin/DeleteCircuitButton";

export const dynamic = "force-dynamic";

interface CircuitRecord {
  id: string;
  kind: "circuit" | "day_trip";
  days: number;
  nights: number;
  image: string | null;
  color_theme: string | null;
  region: string | null;
  map_embed_url: string | null;
  brochure_url: string | null;
  brochure_pdf_url: string | null;
  published: boolean;
  sort_order: number | null;
}

interface TranslationRecord {
  locale: string;
  duration?: string;
  included?: string;
  excluded?: string;
  name: string | null;
  description: string | null;
  price: string | null;
  highlights: unknown;
  itinerary: unknown;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export default async function EditCircuitPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; created?: string }>;
}) {
  const [{ id }, flags] = await Promise.all([params, searchParams]);
  const { supabase } = await requireAdmin();

  const { data: circuit, error } = await supabase
    .from("circuits")
    .select(
      "id,kind,days,nights,image,color_theme,region,map_embed_url,brochure_url,brochure_pdf_url,published,sort_order"
    )
    .eq("id", id)
    .maybeSingle<CircuitRecord>();

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800">
        No se pudo leer el circuito: {error.message}
      </div>
    );
  }

  if (!circuit) notFound();

  const [{ data: translations }, { data: media }, { data: prices }] =
    await Promise.all([
      supabase
        .from("circuit_translations")
        .select("locale,name,description,price,highlights,itinerary,duration,included,excluded")
        .eq("circuit_id", id),
      supabase
        .from("circuit_media")
        .select("id,kind,url,location,sort_order")
        .eq("circuit_id", id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("circuit_prices")
        .select("*")
        .eq("circuit_id", id)
        .order("sort_order", { ascending: true }),
    ]);

  const byLocale = new Map<string, TranslationRecord>();
  for (const row of (translations ?? []) as TranslationRecord[]) {
    byLocale.set(row.locale, row);
  }

  const spanish = byLocale.get("es");
  const translationFor = (locale: string) => {
    const row = byLocale.get(locale) ?? spanish;
    return {
      name: row?.name ?? "",
      description: row?.description ?? "",
      price: row?.price ?? "",
      duration: row?.duration??"", included: row?.included??"", excluded: row?.excluded??"",
      highlights: stringArray(row?.highlights),
      itinerary: stringArray(row?.itinerary),
    };
  };

  const initial: CircuitFormValues = {
    id: circuit.id, kind: circuit.kind,
    days: circuit.days,
    nights: circuit.nights,
    image: circuit.image ?? "",
    colorTheme: circuit.color_theme ?? "cultura",
    region: circuit.region ?? "andes",
    mapEmbedUrl: circuit.map_embed_url ?? "",
    brochureUrl: circuit.brochure_url ?? "",
    brochurePdfUrl: circuit.brochure_pdf_url ?? "",
    published: circuit.published,
    sortOrder: circuit.sort_order ?? 0,
    translations: {
      es: translationFor("es"),
      en: translationFor("en"),
      de: translationFor("de"),
      fr: translationFor("fr"),
    },
  };

  const priceRows = (
    (prices ?? []) as {
      label: string;
      amount: number | string | null;
      currency: string;
      notes: string;
    }[]
  ).map((row) => ({
    ...row,
    label: row.label,
    amount:
      row.amount === null || row.amount === undefined ? "" : String(row.amount),
    currency: row.currency || "USD",
    notes: row.notes ?? "",
  }));

  const {data: departures} = await supabase.from("departures").select("departure_date,capacity,available,status").eq("circuit_id",id).order("departure_date");
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-[#0a3566]"
          >
            <ArrowLeft className="h-4 w-4" />
            Circuitos
          </Link>
          <h1 className="mt-3 font-heading text-3xl font-light text-stone-900">
            {spanish?.name || circuit.id}
          </h1>
          <p className="mt-1 font-mono text-xs text-stone-400">{circuit.id}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${
              circuit.published
                ? "bg-emerald-50 text-emerald-700"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {circuit.published ? "Publicado" : "Borrador"}
          </span>
          <Link
            href={"/es/"+(circuit.kind==="day_trip"?"pasadias":"circuitos")+"/"+circuit.id}
            target="_blank"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-[#0a3566] hover:text-[#0a3566]"
          >
            <ExternalLink className="h-4 w-4" />
            Ver ficha
          </Link>
        </div>
      </div>

      {flags.created === "1" ? (
        <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Circuito creado. Ahora puedes subir fotos y ajustar las tarifas.
        </p>
      ) : null}

      {flags.saved === "1" ? (
        <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Cambios guardados. Solo los productos marcados como publicados aparecen en la web.
        </p>
      ) : null}

      <div className="mt-8">
        <CircuitForm mode="edit" initial={initial} />
      </div>

      <MediaManager
        circuitId={circuit.id}
        coverImage={circuit.image ?? ""}
        items={(media ?? []) as { id: string; kind: "image" | "video"; url: string; location: string }[]}
      />

      <PriceManager circuitId={circuit.id} initial={priceRows} />
      <DepartureManager circuitId={circuit.id} initial={departures ?? []} />

      <section className="mt-8 rounded-3xl border border-rose-200 bg-rose-50/60 p-6 sm:p-7">
        <h2 className="font-heading text-lg font-semibold text-rose-900">
          Zona de riesgo
        </h2>
        <p className="mt-1 mb-4 max-w-xl text-sm leading-relaxed text-rose-800/80">
          Retirar el producto lo oculta de la web y conserva textos, fotos, tarifas e historial. Puede volver a publicarlo marcando Publicado.
        </p>
        <DeleteCircuitButton circuitId={circuit.id} />
      </section>
    </div>
  );
}
