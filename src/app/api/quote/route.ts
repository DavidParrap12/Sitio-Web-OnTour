import { readLimitedJson } from "@/lib/requestBody";
import { captureLead } from "@/lib/crmIntake";
import { NextResponse } from "next/server";
import {
  getFormspreeEndpoint,
  isHoneypotFilled,
  validateQuotePayload,
} from "@/lib/quote";
import {checkIntakeLimit} from "@/lib/intakeLimit";
import { getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 12_000;

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
  const rate = await checkIntakeLimit(`quote:${ip}`, [
    { limit: 5, windowMs: 10 * 60_000 },
    { limit: 20, windowMs: 60 * 60_000 },
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

  // Bots that fill hidden fields get a quiet success response so they do not
  // learn which field triggered the rejection.
  if (isHoneypotFilled(raw)) {
    return json({ success: true });
  }

  const parsed = validateQuotePayload(raw);
  if (!parsed.ok) {
    return json({ error: "invalid_request", fields: parsed.errors }, { status: 400 });
  }

  const data = parsed.data;
  const travelers = data.travelers || "2";
  const subject =
    data.inquiryType === "medical"
      ? `Solicitud de contacto — ${data.name}`
      : data.inquiryType === "b2b"
        ? `Solicitud B2B: ${data.agency || "Agencia"} — ${data.name}`
        : `Nueva Solicitud: ${data.destination || "Colombia Custom Journey"} — ${data.name} (${travelers} pax)`;

  const payload = {
    _subject: subject,
    type: data.inquiryType,
    name: data.name,
    email: data.email,
    phone: data.phone || "No proporcionado",
    country: data.country || "No especificado",
    agency: data.agency || "No aplica",
    destination: data.inquiryType === "medical" ? "Solicitud de contacto" : data.destination || "Colombia Custom Journey",
    timing:
      data.inquiryType === "medical"
        ? data.travelMonth || "Fecha de cita por definir"
        : data.travelMonth || "Flexible",
    travelers,
    interests: data.inquiryType === "medical" ? "" : data.interests.join(", "),
    notes: data.inquiryType === "medical" ? "Solicitud de contacto. Sin información clínica." : data.notes || "Sin notas adicionales",
    submittedAt: new Date().toISOString(),
  };

  let stored = false;
  try { stored = await captureLead({contact_name:data.name,email:data.email,agency_name:data.agency,phone:data.phone,country:data.country,travelers:/^\d+$/.test(data.travelers)&&Number(data.travelers)>=1&&Number(data.travelers)<=500?Number(data.travelers):undefined,travel_dates:data.travelMonth,destination:data.inquiryType === "medical" ? "Solicitud de contacto" : data.destination,notes:data.inquiryType === "medical" ? "" : data.notes,source:data.inquiryType === "medical" ? "contact" : data.inquiryType}); } catch { return json({error:"delivery_failed"},{status:503}); }
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
      "[Quote API] Formspree dispatch error:",
      error instanceof Error ? error.name : "unknown"
    );
  }

  if (!dispatched && !stored) {
    // Do not echo the payload or the destination address back to the client.
    return json({ error: "delivery_failed" }, { status: 502 });
  }

  console.log("[Quote API] Quote dispatched successfully.");

  return json({ success: true });
}
