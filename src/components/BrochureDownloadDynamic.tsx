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
      <div className="flex items-center justify-center gap-2 py-4 text-stone-400">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    ),
  }
);

export { BrochureDownload as BrochureDownloadDynamic };
