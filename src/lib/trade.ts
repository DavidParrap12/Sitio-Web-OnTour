/**
 * Validation for the B2B / travel-trade form on the contact page.
 *
 * Reuses the sanitisation helpers from the public quote form so both endpoints
 * behave identically, but keeps its own limits and honeypot: an agency enquiry
 * legitimately includes a company name and a website, which are honeypot
 * fields for the traveller quote form.
 */

import { cleanText } from "./quote";

export const TRADE_LIMITS = {
  name: 80,
  email: 254,
  agency: 120,
  country: 60,
  website: 200,
  phone: 40,
  agencyType: 24,
  volume: 24,
  destinations: 300,
  notes: 2000,
} as const;

export const AGENCY_TYPES = [
  "tour_operator",
  "travel_agency",
  "dmc",
  "mice",
  "other",
] as const;

export type AgencyType = (typeof AGENCY_TYPES)[number];

export const AGENCY_VOLUMES = [
  "none",
  "1_50",
  "51_200",
  "201_500",
  "500_plus",
] as const;

export type AgencyVolume = (typeof AGENCY_VOLUMES)[number];

export type TradeInput = {
  name: string;
  email: string;
  agency: string;
  country: string;
  website: string;
  phone: string;
  agencyType: AgencyType | "";
  volume: AgencyVolume | "";
  destinations: string;
  notes: string;
};

export type TradeValidation =
  | { ok: true; data: TradeInput }
  | { ok: false; errors: string[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WEBSITE_RE = /^https?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i;

/**
 * Accepts "agencia.com", "www.agencia.com" or a full URL and returns a
 * normalized absolute URL. Anything that does not look like a domain is
 * dropped instead of rejected: the field is optional and not worth a failed
 * submission.
 */
export function normalizeWebsite(value: unknown): string {
  const raw = cleanText(value, TRADE_LIMITS.website);
  if (!raw) return "";

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  return WEBSITE_RE.test(candidate) ? candidate : "";
}

function pickOption<T extends string>(
  value: unknown,
  allowed: readonly T[],
  maxLength: number
): T | "" {
  const cleaned = cleanText(value, maxLength) as T;

  return allowed.includes(cleaned) ? cleaned : "";
}

export function validateTradePayload(raw: unknown): TradeValidation {
  const errors: string[] = [];

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, errors: ["body"] };
  }

  const body = raw as Record<string, unknown>;

  const name = cleanText(body.name, TRADE_LIMITS.name);
  const email = cleanText(body.email, TRADE_LIMITS.email).toLowerCase();
  const agency = cleanText(body.agency, TRADE_LIMITS.agency);
  const country = cleanText(body.country, TRADE_LIMITS.country);
  const website = normalizeWebsite(body.website);
  const phone = cleanText(body.phone, TRADE_LIMITS.phone);
  const agencyType = pickOption(
    body.agencyType,
    AGENCY_TYPES,
    TRADE_LIMITS.agencyType
  );
  const volume = pickOption(body.volume, AGENCY_VOLUMES, TRADE_LIMITS.volume);
  const destinations = cleanText(body.destinations, TRADE_LIMITS.destinations);
  const notes = cleanText(body.notes, TRADE_LIMITS.notes);

  if (name.length < 2) errors.push("name");
  if (!EMAIL_RE.test(email)) errors.push("email");
  if (agency.length < 2) errors.push("agency");
  if (phone && phone.replace(/[^\d]/g, "").length < 6) errors.push("phone");

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      agency,
      country,
      website,
      phone,
      agencyType,
      volume,
      destinations,
      notes,
    },
  };
}

/** Returns true when a bot filled the hidden field of the agency form. */
export function isTradeHoneypotFilled(raw: unknown): boolean {
  if (!raw || typeof raw !== "object") return false;

  const body = raw as Record<string, unknown>;

  return (
    typeof body._gotcha === "string" && body._gotcha.trim().length > 0
  );
}
