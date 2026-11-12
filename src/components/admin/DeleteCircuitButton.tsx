"use client";

import { Trash2 } from "lucide-react";
import { deleteCircuit } from "@/app/admin/circuit-actions";

export function DeleteCircuitButton({ circuitId }: { circuitId: string }) {
  return (
    <form
      action={deleteCircuit}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "¿Retirar este producto de la web? Sus datos se conservarán y podrá publicarlo de nuevo."
        );
        if (!confirmed) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={circuitId} />
      <button
        type="submit"
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-rose-200 bg-white px-5 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
      >
        <Trash2 className="h-4 w-4" />
        Retirar de la web
      </button>
    </form>
  );
}
