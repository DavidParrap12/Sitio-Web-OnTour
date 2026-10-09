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
      <div className="flex items-center justify-center gap-2 py-4 text-stone-400">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    ),
  }
);

export { CircuitProgramDownload as CircuitProgramDownloadDynamic };
