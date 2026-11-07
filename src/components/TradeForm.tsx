"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AlertCircle, Check } from "lucide-react";
import { trackTradeFormSubmit } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full px-4 py-3 rounded-xl border border-editorial-border bg-white text-foreground placeholder:text-editorial-muted-light focus:ring-2 focus:ring-editorial-accent focus:border-transparent outline-none transition-all";

const labelClass =
  "block text-sm font-medium text-foreground/70 mb-2";

/**
 * B2B enquiry form. Deliberately separate from the traveller form: an agency
 * needs to share company details and volume, and the submission goes through
 * a validated server route instead of posting straight to Formspree.
 */
export function TradeForm() {
  const t = useTranslations("tradeForm");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("_gotcha")) {
      // Bot: pretend everything went fine.
      setStatus("success");
      return;
    }

    const payload = {
      agency: String(formData.get("agency") ?? ""),
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      country: String(formData.get("country") ?? ""),
      website: String(formData.get("website") ?? ""),
      agencyType: String(formData.get("agencyType") ?? ""),
      volume: String(formData.get("volume") ?? ""),
      destinations: String(formData.get("destinations") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    };

    setStatus("submitting");

    try {
      const response = await fetch("/api/trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      trackTradeFormSubmit({
        country: payload.country,
        agencyType: payload.agencyType,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10" aria-hidden="true" />
        </div>
        <h3 className="heading-2 mb-2">{t("successTitle")}</h3>
        <p className="body text-foreground/70 max-w-sm">{t("successText")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-editorial-accent font-semibold hover:underline"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h3 className="heading-2 mb-2">{t("title")}</h3>
        <p className="body text-editorial-muted">{t("intro")}</p>
      </div>

      {/* Honeypot — hidden from humans, tempting for bots. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="trade-gotcha">Leave this field empty</label>
        <input
          id="trade-gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="trade-agency" className={labelClass}>
          {t("agencyLabel")}
        </label>
        <input
          id="trade-agency"
          name="agency"
          type="text"
          required
          autoComplete="organization"
          className={fieldClass}
          placeholder={t("agencyPlaceholder")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="trade-name" className={labelClass}>
            {t("nameLabel")}
          </label>
          <input
            id="trade-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder={t("namePlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="trade-email" className={labelClass}>
            {t("emailLabel")}
          </label>
          <input
            id="trade-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder={t("emailPlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="trade-phone" className={labelClass}>
            {t("phoneLabel")}{" "}
            <span className="font-normal text-editorial-muted-light">
              ({t("optional")})
            </span>
          </label>
          <input
            id="trade-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder={t("phonePlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="trade-country" className={labelClass}>
            {t("countryLabel")}
          </label>
          <input
            id="trade-country"
            name="country"
            type="text"
            autoComplete="country-name"
            className={fieldClass}
            placeholder={t("countryPlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="trade-website" className={labelClass}>
            {t("websiteLabel")}{" "}
            <span className="font-normal text-editorial-muted-light">
              ({t("optional")})
            </span>
          </label>
          <input
            id="trade-website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            className={fieldClass}
            placeholder={t("websitePlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="trade-type" className={labelClass}>
            {t("typeLabel")}
          </label>
          <select
            id="trade-type"
            name="agencyType"
            className={fieldClass}
            defaultValue=""
          >
            <option value="">{t("typePlaceholder")}</option>
            <option value="tour_operator">{t("typeTourOperator")}</option>
            <option value="travel_agency">{t("typeTravelAgency")}</option>
            <option value="dmc">{t("typeDmc")}</option>
            <option value="mice">{t("typeMice")}</option>
            <option value="other">{t("typeOther")}</option>
          </select>
        </div>

        <div>
          <label htmlFor="trade-volume" className={labelClass}>
            {t("volumeLabel")}
          </label>
          <select
            id="trade-volume"
            name="volume"
            className={fieldClass}
            defaultValue=""
          >
            <option value="">{t("volumePlaceholder")}</option>
            <option value="none">{t("volumeNone")}</option>
            <option value="1_50">{t("volumeSmall")}</option>
            <option value="51_200">{t("volumeMedium")}</option>
            <option value="201_500">{t("volumeLarge")}</option>
            <option value="500_plus">{t("volumeExtra")}</option>
          </select>
        </div>

        <div>
          <label htmlFor="trade-destinations" className={labelClass}>
            {t("destinationsLabel")}
          </label>
          <input
            id="trade-destinations"
            name="destinations"
            type="text"
            className={fieldClass}
            placeholder={t("destinationsPlaceholder")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="trade-message" className={labelClass}>
          {t("messageLabel")}
        </label>
        <textarea
          id="trade-message"
          name="notes"
          rows={4}
          className={`${fieldClass} resize-none`}
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>{t("errorText")}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="bg-accent hover:brightness-90 text-white font-bold py-4 rounded-xl shadow-md transition-all disabled:opacity-70"
      >
        {status === "submitting" ? t("sending") : t("submit")}
      </button>

      <p className="caption text-editorial-muted-light -mt-2">{t("privacy")}</p>
    </form>
  );
}
