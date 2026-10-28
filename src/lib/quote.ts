/**
 * Validation and normalization for the public quote form.
 *
 * Kept framework-agnostic so it can be unit-tested and reused by the API
 * route. Never trust client input: every field is length-limited and control
 * characters are stripped before forwarding to the email provider.
 */

export const QUOTE_LIMITS = {
  name: 80,
  email: 254,
  phone: 40,
  country: 60,
  destination: 160,
  travelMonth: 80,
  travelers: 20,
  interest: 80,
  interests: 8,
  notes: 2000,
} as const;

export type QuoteInput = {
  name: string;
  email: string;
  phone: string;
  country: string;
  destination: string;
  travelMonth: string;
  travelers: string;
  interests: string[];
  notes: string;
};

export type QuoteValidation =
  | { ok: true; data: QuoteInput }
  | { ok: false; errors: string[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Removes control characters and hard-truncates a string. */
export function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";

  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function cleanInterests(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of value) {
    if (typeof item !== "string") continue;
    const cleaned = cleanText(item, QUOTE_LIMITS.interest);
    if (!cleaned || seen.has(cleaned)) continue;
    seen.add(cleaned);
    result.push(cleaned);
    if (result.length >= QUOTE_LIMITS.interests) break;
  }

  return result;
}

export function validateQuotePayload(raw: unknown): QuoteValidation {
  const errors: string[] = [];

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, errors: ["body"] };
  }

  const body = raw as Record<string, unknown>;

  const name = cleanText(body.name, QUOTE_LIMITS.name);
  const email = cleanText(body.email, QUOTE_LIMITS.email).toLowerCase();
  const phone = cleanText(body.phone, QUOTE_LIMITS.phone);
  const country = cleanText(body.country, QUOTE_LIMITS.country);
  const destination = cleanText(body.destination, QUOTE_LIMITS.destination);
  const travelMonth = cleanText(body.travelMonth, QUOTE_LIMITS.travelMonth);
  const travelers = cleanText(
    typeof body.travelers === "number" ? String(body.travelers) : body.travelers,
    QUOTE_LIMITS.travelers
  );
  const interests = cleanInterests(body.interests);
  const notes = cleanText(body.notes, QUOTE_LIMITS.notes);

  if (name.length < 2) errors.push("name");
  if (!EMAIL_RE.test(email)) errors.push("email");
  if (phone && phone.replace(/[^\d]/g, "").length < 6) errors.push("phone");

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      country,
      destination,
      travelMonth,
      travelers,
      interests,
      notes,
    },
  };
}

/** Returns true when a bot filled one of the hidden honeypot fields. */
export function isHoneypotFilled(raw: unknown): boolean {
  if (!raw || typeof raw !== "object") return false;

  const body = raw as Record<string, unknown>;
  const fields = ["company", "website", "subject"];

  return fields.some(
    (field) => typeof body[field] === "string" && body[field].trim() !== ""
  );
}

export function getFormspreeEndpoint(): string {
  const configured = process.env.FORMSPREE_ENDPOINT?.trim();
  const fallback = "https://formspree.io/f/mojgzoqw";

  if (configured && /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(configured)) {
    return configured;
  }

  return fallback;
}
