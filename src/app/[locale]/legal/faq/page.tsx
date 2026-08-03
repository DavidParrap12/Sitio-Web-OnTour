"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="border border-editorial-border rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left group"
        aria-expanded={open}
      >
        <span className="heading-2 text-editorial-dark group-hover:text-editorial-accent transition-colors duration-200">
          {q}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-editorial-border flex items-center justify-center transition-all duration-300 ${
            open
              ? "bg-editorial-accent border-editorial-accent rotate-45"
              : "bg-editorial-warm group-hover:border-editorial-accent"
          }`}
        >
          <Plus className={`w-4 h-4 transition-colors ${open ? "text-white" : "text-editorial-dark"}`} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="body text-editorial-muted px-6 md:px-8 pb-8 max-w-none leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPage() {
  const t = useTranslations("legalFaq");

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
    <div className="min-h-screen bg-editorial-warm">
      {/* Hero */}
      <div className="relative bg-editorial-dark pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(28,126,214,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="label text-editorial-accent mb-4 block"
          >
            Centro de Ayuda
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="display-1 text-white mb-6"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-lg text-white/60 mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Accordion */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 max-w-4xl">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center p-10 md:p-14 rounded-3xl bg-editorial-dark border border-editorial-border-light/10"
        >
          <p className="heading-2 text-white mb-2">¿No encontraste tu respuesta?</p>
          <p className="body text-white/50 mb-8">Escríbenos directamente y te respondemos en menos de 24h.</p>
          <a
            href="/contacto"
            className="inline-block bg-editorial-accent hover:bg-editorial-accent-hover text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-editorial-lg hover:shadow-editorial-xl"
          >
            Contactar ahora
          </a>
        </motion.div>
      </div>
    </div>
  );
}
