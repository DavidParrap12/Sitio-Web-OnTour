import { readLimitedJson } from "@/lib/requestBody";
import { captureLead } from "@/lib/crmIntake";
import { NextResponse } from "next/server";
import { getFormspreeEndpoint } from "@/lib/quote";
import { isTradeHoneypotFilled, validateTradePayload } from "@/lib/trade";
import {checkIntakeLimit} from "@/lib/intakeLimit";
import { getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 12_000;

/**
 * Selects send stable keys so validation is strict; the team reads the email,
 * so the notification carries human labels instead.
 */
const AGENCY_TYPE_LABELS: Record<string, string> = {
  tour_operator: "Tour operador",
  travel_agency: "Agencia de viajes",
  dmc: "DMC / receptivo",
  mice: "MICE / corporativo",
  other: "Otro",
};

function json(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init?.headers ?? {}),
    },
  });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ error: "unsupported_media_type" }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ error: "payload_too_large" }, { status: 413 });
  }

  const ip = getClientIp(request);
  const rate = await checkIntakeLimit(`trade:${ip}`, [
    { limit: 4, windowMs: 10 * 60_000 },
    { limit: 12, windowMs: 60 * 60_000 },
  ]);

  if (!rate.allowed) {
    return json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfter || 60) },
      }
    );
  }

  let raw: unknown;
  try {
    raw = await readLimitedJson(request, MAX_BODY_BYTES);
  } catch (error) {
    const large = error instanceof Error && error.message === "payload_too_large";
    return json({ error: large ? "payload_too_large" : "invalid_json" }, { status: large ? 413 : 400 });
  }

  // Quiet success so bots do not learn which field was detected.
  if (isTradeHoneypotFilled(raw)) {
    return json({ success: true });
  }

  const parsed = validateTradePayload(raw);
  if (!parsed.ok) {
    return json(
      { error: "invalid_request", fields: parsed.errors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const subject = `Solicitud B2B: ${data.agency} — ${data.name} (${
    data.country || "país n/d"
  })`;

  const payload = {
    _subject: subject,
    formType: "agency",
    agency: data.agency,
    contact: data.name,
    email: data.email,
    phone: data.phone || "No proporcionado",
    country: data.country || "No especificado",
    website: data.website || "No proporcionado",
    agencyType: data.agencyType
      ? AGENCY_TYPE_LABELS[data.agencyType] ?? data.agencyType
      : "No especificado",
    groupSize: `${data.people} ${data.people === 1 ? "persona" : "personas"}`,
    quoteFor: "Grupo / viaje concreto",
    destinations: data.destinations || "No especificado",
    message: data.notes || "Sin mensaje",
    submittedAt: new Date().toISOString(),
  };

  let stored = false;
  try { stored = await captureLead({contact_name:data.name,email:data.email,agency_name:data.agency,phone:data.phone,country:data.country,travelers:data.people,destination:data.destinations,notes:data.notes,source:"trade"}); } catch { return json({error:"delivery_failed"},{status:503}); }
  let dispatched = false;
  try {
    const response = await fetch(getFormspreeEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8_000),
    });
    dispatched = response.ok;
  } catch (error) {
    console.error(
      "[Trade API] Formspree dispatch error:",
      error instanceof Error ? error.name : "unknown"
    );
  }

  if (!dispatched && !stored) {
    // Never echo the payload or the destination address back to the client.
    return json({ error: "delivery_failed" }, { status: 502 });
  }

  console.log("[Trade API] Agency enquiry dispatched successfully.");

  return json({ success: true });
}
