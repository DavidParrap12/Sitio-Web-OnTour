import { describe, expect, it } from "vitest";
import {
  cleanText,
  getFormspreeEndpoint,
  isHoneypotFilled,
  QUOTE_LIMITS,
  validateQuotePayload,
} from "./quote";

const valid = {
  name: "Ana Pérez",
  email: "ANA@Example.com",
  phone: "+57 300 123 4567",
  country: "Colombia",
  destination: "Eje Cafetero",
  travelMonth: "Marzo",
  travelers: "2",
  interests: ["nature", "coffee"],
  notes: "Anniversary trip",
};

describe("validateQuotePayload", () => {
  it("accepts and normalizes a valid payload", () => {
    const result = validateQuotePayload(valid);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.data.email).toBe("ana@example.com");
    expect(result.data.name).toBe("Ana Pérez");
    expect(result.data.interests).toEqual(["nature", "coffee"]);
  });

  it("rejects missing name and invalid email", () => {
    const result = validateQuotePayload({ ...valid, name: "", email: "not-an-email" });

    expect(result.ok).toBe(false);
    if (result.ok) return;

    expect(result.errors).toContain("name");
    expect(result.errors).toContain("email");
  });

  it("rejects a phone number with too few digits", () => {
    const result = validateQuotePayload({ ...valid, phone: "12" });

    expect(result.ok).toBe(false);
    if (result.ok) return;

    expect(result.errors).toContain("phone");
  });

  it("strips control characters and enforces limits", () => {
    const result = validateQuotePayload({
      ...valid,
      name: `  Ana\u0000 Pérez  `,
      notes: "x".repeat(QUOTE_LIMITS.notes + 500),
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.data.name).toBe("Ana Pérez");
    expect(result.data.notes).toHaveLength(QUOTE_LIMITS.notes);
  });

  it("deduplicates and caps interests", () => {
    const result = validateQuotePayload({
      ...valid,
      interests: ["a", "a", "b", "c", "d", "e", "f", "g", "h", "i"],
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.data.interests).toHaveLength(QUOTE_LIMITS.interests);
    expect(new Set(result.data.interests).size).toBe(result.data.interests.length);
  });

  it("rejects non-object bodies", () => {
    expect(validateQuotePayload(null).ok).toBe(false);
    expect(validateQuotePayload("hello").ok).toBe(false);
    expect(validateQuotePayload([]).ok).toBe(false);
  });
});

describe("isHoneypotFilled", () => {
  it("detects filled hidden fields", () => {
    expect(isHoneypotFilled({ ...valid, company: "spam Inc" })).toBe(true);
    expect(isHoneypotFilled({ ...valid, website: "https://spam.example" })).toBe(true);
    expect(isHoneypotFilled(valid)).toBe(false);
  });
});

describe("cleanText", () => {
  it("trims and truncates", () => {
    expect(cleanText("  hello  ", 3)).toBe("hel");
    expect(cleanText(undefined, 10)).toBe("");
  });
});

describe("getFormspreeEndpoint", () => {
  it("always returns a formspree URL", () => {
    expect(getFormspreeEndpoint()).toMatch(/^https:\/\/formspree\.io\/f\//);
  });
});
