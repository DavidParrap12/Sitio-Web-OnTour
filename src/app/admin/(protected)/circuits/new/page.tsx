import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CircuitForm } from "@/components/admin/CircuitForm";

export const dynamic = "force-dynamic";

export default function NewCircuitPage() {
  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-[#0a3566]"
      >
        <ArrowLeft className="h-4 w-4" />
        Circuitos
      </Link>
      <div className="mt-4 mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B49A68]">
          Nuevo
        </p>
        <h1 className="mt-1 font-heading text-3xl font-light text-stone-900">
          Crear circuito
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-500">
          Crea la ficha en español y completa los otros idiomas cuando los tengas.
          Si un idioma queda vacío, la web muestra el contenido en español.
        </p>
      </div>

      <CircuitForm mode="new" />
    </div>
  );
}
