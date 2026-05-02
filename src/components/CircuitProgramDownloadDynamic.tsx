"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const CircuitProgramDownload = dynamic(
  () =>
    import("./CircuitProgramDownload").then((mod) => ({
      default: mod.CircuitProgramDownload,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center gap-2 py-4 text-foreground/40">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Cargando...</span>
      </div>
    ),
  }
);

export { CircuitProgramDownload as CircuitProgramDownloadDynamic };
