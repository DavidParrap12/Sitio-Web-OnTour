"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import BrochureDownload with SSR disabled to avoid
// Node.js-only modules (fflate/Worker) from being bundled during SSR.
const BrochureDownload = dynamic(
  () =>
    import("./BrochureDownload").then((mod) => ({
      default: mod.BrochureDownload,
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

export { BrochureDownload as BrochureDownloadDynamic };
