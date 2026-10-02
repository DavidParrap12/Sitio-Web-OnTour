import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      experience,
      option,
      name,
      email,
      phone,
      country,
      dates,
      travelers,
      notes,
    } = data;

    // Validate minimum required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Forward to Formspree configured for OnTour DMC (delivering to info@ontourdmc.com)
    const formspreeEndpoint = "https://formspree.io/f/mojgzoqw";

    const payload = {
      _subject: `Nueva Cotización: ${option || experience} - ${name}`,
      to: "info@ontourdmc.com",
      name,
      email,
      phone: phone || "No proporcionado",
      country: country || "No especificado",
      experience: experience || "General",
      option: option || "General",
      dates: dates || "Por definir",
      travelers: travelers || "2",
      notes: notes || "Sin notas adicionales",
      submittedAt: new Date().toISOString(),
    };

    let dispatched = false;
    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      dispatched = response.ok;
    } catch (err) {
      console.error("[Quote API] Formspree dispatch error:", err);
    }

    // Always log the request for auditability
    console.log(
      `[Quote API] Processed quote for info@ontourdmc.com: ${payload._subject} | Dispatched: ${dispatched}`
    );

    return NextResponse.json({
      success: true,
      deliveredTo: "info@ontourdmc.com",
      dispatched,
      data: payload,
    });
  } catch (error) {
    console.error("[Quote API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to process quote request" },
      { status: 500 }
    );
  }
}
