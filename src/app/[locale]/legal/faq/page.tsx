import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { HelpCircle } from "lucide-react";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legalFaq");

  const faqs = [
    { q: t("q1.question"), a: t("q1.answer") },
    { q: t("q2.question"), a: t("q2.answer") },
    { q: t("q3.question"), a: t("q3.answer") },
    { q: t("q4.question"), a: t("q4.answer") },
    { q: t("q5.question"), a: t("q5.answer") },
    { q: t("q6.question"), a: t("q6.answer") },
    { q: t("q7.question"), a: t("q7.answer") },
    { q: t("q8.question"), a: t("q8.answer") },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/50">
      {/* Hero */}
      <div className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">{t("title")}</h1>
          <p className="text-lg max-w-2xl mx-auto text-white/80">{t("subtitle")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12 max-w-4xl">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 group"
            >
              <summary className="p-6 cursor-pointer font-heading font-semibold text-lg text-primary flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                <span>{faq.q}</span>
                <span className="text-accent text-2xl transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <div className="px-6 pb-6 text-foreground/70 leading-relaxed border-t border-gray-50 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
