import { NextResponse } from "next/server";
import {
  getFormspreeEndpoint,
  isHoneypotFilled,
  validateQuotePayload,
} from "@/lib/quote";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

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
  const rate = checkRateLimit(`quote:${ip}`, [
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
    raw = await request.json();
  } catch {
    return json({ error: "invalid_json" }, { status: 400 });
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
  const subject = `Nueva Solicitud: ${data.destination || "Colombia Custom Journey"} — ${data.name} (${travelers} pax)`;

  const payload = {
    _subject: subject,
    name: data.name,
    email: data.email,
    phone: data.phone || "No proporcionado",
    country: data.country || "No especificado",
    destination: data.destination || "Colombia Custom Journey",
    timing: data.travelMonth || "Flexible",
    travelers,
    interests: data.interests.length > 0 ? data.interests.join(", ") : "Tailor-made",
    notes: data.notes || "Sin notas adicionales",
    submittedAt: new Date().toISOString(),
  };

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

  if (!dispatched) {
    // Do not echo the payload or the destination address back to the client.
    return json({ error: "delivery_failed" }, { status: 502 });
  }

  console.log("[Quote API] Quote dispatched successfully.");

  return json({ success: true });
}
