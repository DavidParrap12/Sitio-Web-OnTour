"use client";

import { useActionState } from "react";
import { DownloadCloud, Loader2 } from "lucide-react";
import { importStarterCircuits, type ActionState } from "@/app/admin/circuit-actions";

const initial: ActionState = { ok: false };

export function ImportButton() {
  const [state, action, pending] = useActionState(importStarterCircuits, initial);

  return (
    <div className="mt-4">
      <form action={action}>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-[#16352D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B49A68] hover:text-[#16352D] disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <DownloadCloud className="h-4 w-4" />
          )}
          {pending ? "Importando..." : "Importar catálogo inicial como borradores"}
        </button>
      </form>

      {state.error ? (
        <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {state.error}
        </p>
      ) : null}

      {state.ok ? (
        <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Catálogo importado como borradores. Revise imágenes y tarifas antes de publicar. Recarga la página para verlo.
        </p>
      ) : null}
    </div>
  );
}
