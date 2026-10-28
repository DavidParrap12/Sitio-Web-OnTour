"use client";

import { Compass, ArrowRight, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Segment-level 404. Kept as a Client Component so it reads translations from
 * the `NextIntlClientProvider` instead of request headers — otherwise unknown
 * dynamic params would turn statically generated routes into dynamic ones at
 * runtime (the "Page changed from static to dynamic" error).
 *
 * Next.js injects `<meta name="robots" content="noindex">` automatically.
 */
export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="min-h-[70vh] pt-32 pb-20 md:pt-40 md:pb-28 bg-editorial-warm">
      <title>404 | OnTour DMC Colombia</title>
      <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-editorial-dark/5 border border-editorial-border mb-8">
          <Compass className="w-7 h-7 text-editorial-accent" aria-hidden />
        </span>

        <p className="caption text-editorial-muted mb-3 tracking-[0.2em]">404</p>
        <h1 className="heading-1 text-editorial-dark mb-5">{t("title")}</h1>
        <p className="body text-editorial-muted max-w-xl mx-auto mb-10">{t("description")}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-editorial-dark text-white px-6 py-3 text-sm font-semibold min-h-[44px] transition-colors hover:bg-editorial-accent hover:text-editorial-dark"
          >
            <Home className="w-4 h-4" aria-hidden />
            {t("homeCta")}
          </Link>
          <Link
            href="/circuitos"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-editorial-border bg-white text-editorial-dark px-6 py-3 text-sm font-semibold min-h-[44px] transition-colors hover:border-editorial-accent"
          >
            {t("journeysCta")}
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
