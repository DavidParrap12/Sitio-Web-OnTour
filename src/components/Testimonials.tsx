"use client";

import { useState } from "react";
import { Star, CheckCircle, ExternalLink, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { testimonials } from "@/data/testimonials";
import { SectionReveal } from "@/components/editorial/SectionReveal";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/On+Tour+Agencia+de+Viajes+Colombia/@4.4453535,-75.2418751,19z/data=!4m18!1m9!3m8!1s0x8e38c5dc9b21e75d:0xdfe89bd87d6ae4a2!2sOn+Tour+Agencia+de+Viajes+Colombia!8m2!3d4.4453522!4d-75.2412314!9m1!1b1!16s%2Fg%2F11ryf7f3t2!3m7!1s0x8e38c5dc9b21e75d:0xdfe89bd87d6ae4a2!8m2!3d4.4453522!4d-75.2412314!9m1!1b1!16s%2Fg%2F11ryf7f3t2?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D";

// Curate the most detailed reviews (filtering out corporate usernames like Samsung)
const FEATURED_REVIEWS = [
  testimonials.find((t) => t.id === "review-micilene") || testimonials[0],
  testimonials.find((t) => t.id === "review-yamel") || testimonials[1],
  testimonials.find((t) => t.id === "review-maria-antonia") || testimonials[2],
  testimonials.find((t) => t.id === "review-angie") || testimonials[3],
  testimonials.find((t) => t.id === "review-sandra") || testimonials[4],
  testimonials.find((t) => t.id === "review-david-parra") || testimonials[5],
];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [page, setPage] = useState(0);

  const reviewsPerPage = 3;
  const maxPages = Math.ceil(FEATURED_REVIEWS.length / reviewsPerPage);
  const currentReviews = FEATURED_REVIEWS.slice(page * reviewsPerPage, (page + 1) * reviewsPerPage);

  return (
    <section className="py-20 md:py-28 bg-[#faf8f4] border-t border-stone-200/60 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <SectionReveal>
          {/* Header & Google Rating Badge */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              {/* Aggregated Google Reviews Badge */}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white border border-stone-200/80 rounded-full px-4 py-2 shadow-sm mb-4 hover:shadow-md hover:border-editorial-accent/40 transition-all text-xs sm:text-sm font-semibold text-stone-800 group"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div className="flex items-center gap-0.5" aria-label="Calificación 5 estrellas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-bold text-stone-900">5.0 / 5</span>
                <span className="text-stone-500 font-medium">· {t("ratingSubtitle")}</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-editorial-accent transition-colors ml-0.5" />
              </a>

              <h2 className="display-2 text-editorial-dark font-heading font-medium tracking-tight mb-3">
                {t("title")}
              </h2>
              <p className="body text-editorial-muted">
                {t("subtitle")}
              </p>
            </div>

            {/* Pagination Controls */}
            {maxPages > 1 && (
              <div className="flex items-center gap-2 self-start md:self-end">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-700 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
                  aria-label={t("prevReview")}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-stone-500 font-medium px-2">
                  {page + 1} / {maxPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(maxPages - 1, p + 1))}
                  disabled={page === maxPages - 1}
                  className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-700 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
                  aria-label={t("nextReview")}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* 3-Card Grid of Visible Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
            {currentReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-editorial-accent/30 transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Quote watermark */}
                <Quote className="absolute top-5 right-6 w-8 h-8 text-stone-100 group-hover:text-amber-100 transition-colors pointer-events-none" />

                <div>
                  {/* Top Bar: Stars + Country Flag & Name */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
                      {review.country}
                    </span>
                  </div>

                  {/* Trip Badge */}
                  {review.tripName && (
                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-editorial-accent uppercase tracking-wider block">
                        {review.tripName}
                      </span>
                    </div>
                  )}

                  {/* Review Quote Text */}
                  <p className="text-sm text-stone-700 leading-relaxed italic mb-6">
                    &ldquo;{t(`reviews.${review.reviewKey}.text`)}&rdquo;
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-sm text-editorial-dark">
                      {review.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px] text-stone-500 font-medium">
                        {t("verifiedReview")}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-400 font-medium">
                    {review.date ? review.date.slice(0, 7) : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Link to Google Reviews */}
          <div className="text-center">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-editorial-accent hover:underline underline-offset-4 group"
            >
              <span>{t("seeAllOnGoogle")}</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
