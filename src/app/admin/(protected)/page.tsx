import Link from "next/link";
import {
  AlertTriangle,
  CalendarDays,
  ImageIcon,
  Languages,
  Pencil,
  Plus,
} from "lucide-react";
import { requireAdmin } from "@/lib/adminAuth";
import { ImportButton } from "@/components/admin/ImportButton";

export const dynamic = "force-dynamic";

interface CircuitRow {
  id: string;
  days: number;
  nights: number;
  image: string;
  published: boolean;
  sort_order: number;
  updated_at: string;
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  const { deleted } = await searchParams;
  const { supabase } = await requireAdmin();

  const [{ data: circuits, error }, { data: translations }, { data: media }] =
    await Promise.all([
      supabase
        .from("circuits")
        .select("id,days,nights,image,published,sort_order,updated_at")
        .order("sort_order", { ascending: true })
        .order("id", { ascending: true }),
      supabase.from("circuit_translations").select("circuit_id,locale,name"),
      supabase.from("circuit_media").select("circuit_id,kind"),
    ]);

  const schemaError =
    error && /relation|schema|does not exist/i.test(error.message);

  if (schemaError) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h1 className="font-heading text-xl font-semibold text-amber-950">
              Las tablas todavía no existen
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-amber-900">
              Ejecuta <code className="rounded bg-white/70 px-1.5 py-0.5">supabase/schema.sql</code>{" "}
              y todas las migraciones de supabase/migrations/ en orden. Sigue docs/admin-cms.md antes de recargar.
            </p>
            <p className="mt-3 rounded-xl bg-white/70 px-3 py-2 font-mono text-xs text-amber-800">
              {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const rows = (circuits ?? []) as CircuitRow[];
  const nameById = new Map<string, string>();
  const localeCount = new Map<string, number>();
  for (const item of translations ?? []) {
    if (item.locale === "es" && item.name) nameById.set(item.circuit_id, item.name);
    localeCount.set(item.circuit_id, (localeCount.get(item.circuit_id) ?? 0) + 1);
  }
  const mediaCount = new Map<string, number>();
  for (const item of media ?? []) {
    mediaCount.set(item.circuit_id, (mediaCount.get(item.circuit_id) ?? 0) + 1);
  }

  const published = rows.filter((row) => row.published).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B49A68]">
            Contenido
          </p>
          <h1 className="mt-1 font-heading text-3xl font-light text-stone-900">
            Catálogo
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            {rows.length} productos · {published} publicados en la web
          </p>
        </div>
        <Link
          href="/admin/circuits/new"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#16352D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B49A68] hover:text-[#16352D]"
        >
          <Plus className="h-4 w-4" />
          Crear circuito
        </Link>
      </div>

      {deleted === "1" ? (
        <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Producto retirado de la web.
        </p>
      ) : null}

      {rows.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-stone-300 bg-white p-8 text-center">
          <h2 className="font-heading text-xl font-semibold text-stone-900">
            La base de datos está vacía
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-stone-500">
            Importa los circuitos que ya publica la web para editarlos aquí, o
            crea uno nuevo desde cero.
          </p>
          <ImportButton />
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-3xl border border-stone-200 bg-white">
          <div className="hidden grid-cols-[minmax(0,1fr)_110px_110px_110px_90px] gap-4 border-b border-stone-200 bg-stone-50 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-stone-500 md:grid">
            <span>Circuito</span>
            <span>Duración</span>
            <span>Idiomas</span>
            <span>Multimedia</span>
            <span className="text-right">Estado</span>
          </div>

          <ul className="divide-y divide-stone-100">
            {rows.map((row) => {
              const name = nameById.get(row.id) ?? row.id;
              return (
                <li
                  key={row.id}
                  className="grid grid-cols-1 gap-4 px-5 py-4 transition-colors hover:bg-stone-50/70 md:grid-cols-[minmax(0,1fr)_110px_110px_110px_90px] md:items-center"
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                      {row.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={row.image}
                          alt={name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-stone-400">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/admin/circuits/${row.id}`}
                        className="block truncate font-semibold text-stone-900 hover:text-[#16352D]"
                      >
                        {name}
                      </Link>
                      <p className="truncate font-mono text-[11px] text-stone-400">
                        {row.id}
                      </p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 text-sm text-stone-600">
                    <CalendarDays className="h-3.5 w-3.5 text-stone-400" />
                    {row.days} días / {row.nights} noches
                  </span>

                  <span className="flex items-center gap-1.5 text-sm text-stone-600">
                    <Languages className="h-3.5 w-3.5 text-stone-400" />
                    {localeCount.get(row.id) ?? 0} de 4
                  </span>

                  <span className="flex items-center gap-1.5 text-sm text-stone-600">
                    <ImageIcon className="h-3.5 w-3.5 text-stone-400" />
                    {mediaCount.get(row.id) ?? 0} archivos
                  </span>

                  <div className="flex items-center justify-between gap-2 md:justify-end">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        row.published
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {row.published ? "Publicado" : "Borrador"}
                    </span>
                    <Link
                      href={`/admin/circuits/${row.id}`}
                      aria-label={`Editar ${name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition hover:border-[#16352D] hover:text-[#16352D]"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
