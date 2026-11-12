import { describe, expect, it } from "vitest";
import {
  isTradeHoneypotFilled,
  normalizeWebsite,
  TRADE_LIMITS,
  validateTradePayload,
} from "./trade";

const valid = {
  name: "Claire Dubois",
  email: "CLAIRE@Agence-Exemple.fr",
  agency: "Agence Exemple",
  country: "France",
  website: "agence-exemple.fr",
  phone: "+33 6 12 34 56 78",
  agencyType: "travel_agency",
  people: 24,
  destinations: "Café, Carthagène",
  notes: "Groupe de 24 personnes en mars",
};

describe("validateTradePayload", () => {
  it("accepts and normalizes a valid agency enquiry", () => {
    const result = validateTradePayload(valid);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.data.email).toBe("claire@agence-exemple.fr");
    expect(result.data.website).toBe("https://agence-exemple.fr");
    expect(result.data.agencyType).toBe("travel_agency");
    expect(result.data.people).toBe(24);
  });

  it("requires name, a valid email and an agency name", () => {
    const result = validateTradePayload({
      ...valid,
      name: "",
      email: "nope",
      agency: "",
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;

    expect(result.errors).toEqual(
      expect.arrayContaining(["name", "email", "agency"])
    );
  });

  it("rejects a phone number with too few digits but allows an empty one", () => {
    expect(validateTradePayload({ ...valid, phone: "12" }).ok).toBe(false);
    expect(validateTradePayload({ ...valid, phone: "" }).ok).toBe(true);
  });

  it("ignores unknown select values instead of failing", () => {
    const result = validateTradePayload({
      ...valid,
      agencyType: "hacker",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.data.agencyType).toBe("");
  });

  it("requires a realistic group size for the quotation", () => {
    expect(validateTradePayload({ ...valid, people: 0 }).ok).toBe(false);
    expect(validateTradePayload({ ...valid, people: 501 }).ok).toBe(false);
    expect(validateTradePayload({ ...valid, people: "12" }).ok).toBe(true);

    const result = validateTradePayload({ ...valid, people: "12 viajeros" });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.people).toBe(12);
  });

  it("strips control characters and enforces limits", () => {
    const result = validateTradePayload({
      ...valid,
      agency: `  Agence\u0000 Exemple  `,
      notes: "x".repeat(TRADE_LIMITS.notes + 500),
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.data.agency).toBe("Agence Exemple");
    expect(result.data.notes).toHaveLength(TRADE_LIMITS.notes);
  });

  it("rejects non-object bodies", () => {
    expect(validateTradePayload(null).ok).toBe(false);
    expect(validateTradePayload("hello").ok).toBe(false);
    expect(validateTradePayload([]).ok).toBe(false);
  });
});

describe("normalizeWebsite", () => {
  it("adds a protocol and keeps valid domains", () => {
    expect(normalizeWebsite("agencia.com")).toBe("https://agencia.com");
    expect(normalizeWebsite("www.agencia.com/rutas")).toBe(
      "https://www.agencia.com/rutas"
    );
    expect(normalizeWebsite("https://agencia.co")).toBe("https://agencia.co");
  });

  it("drops values that are not domains", () => {
    expect(normalizeWebsite("")).toBe("");
    expect(normalizeWebsite("no es una web")).toBe("");
    expect(normalizeWebsite("javascript:alert(1)")).toBe("");
  });
});

describe("isTradeHoneypotFilled", () => {
  it("detects the hidden field only", () => {
    expect(isTradeHoneypotFilled({ ...valid, _gotcha: "spam" })).toBe(true);
    expect(isTradeHoneypotFilled({ ...valid, agency: "Real Agency" })).toBe(
      false
    );
    expect(isTradeHoneypotFilled(null)).toBe(false);
  });
});
