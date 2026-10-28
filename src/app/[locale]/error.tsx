"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error("[OnTour] Unhandled route error:", error);
  }, [error]);

  return (
    <section className="min-h-[70vh] pt-32 pb-20 md:pt-40 md:pb-28 bg-editorial-warm">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 border border-rose-200 mb-8">
          <AlertTriangle className="w-7 h-7 text-rose-500" aria-hidden />
        </span>

        <h1 className="heading-1 text-editorial-dark mb-5">{t("title")}</h1>
        <p className="body text-editorial-muted max-w-xl mx-auto mb-10">{t("description")}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-editorial-dark text-white px-6 py-3 text-sm font-semibold min-h-[44px] transition-colors hover:bg-editorial-accent hover:text-editorial-dark cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden />
            {t("retry")}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-editorial-border bg-white text-editorial-dark px-6 py-3 text-sm font-semibold min-h-[44px] transition-colors hover:border-editorial-accent"
          >
            <Home className="w-4 h-4" aria-hidden />
            {t("homeCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
