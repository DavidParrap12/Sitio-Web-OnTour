"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [state, handleSubmit] = useForm("xqeyoyjn");

  if (state.succeeded) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold font-heading mb-2">{t("successTitle")}</h3>
        <p className="text-foreground/70">{t("successText")}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 text-primary font-semibold hover:underline"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h3 className="text-2xl font-heading font-bold mb-2">{t("title")}</h3>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-2">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder={t("namePlaceholder")}
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder={t("emailPlaceholder")}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-2">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          placeholder={t("messagePlaceholder")}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="bg-accent hover:brightness-90 text-white font-bold py-4 rounded-xl shadow-md transition-all disabled:opacity-70 mt-2"
      >
        {state.submitting ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
