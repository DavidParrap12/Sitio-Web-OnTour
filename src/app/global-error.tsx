"use client";

import { useEffect } from "react";

/**
 * Root-level error boundary. It replaces the [locale] layout, so it must
 * render its own <html> and <body> and cannot rely on Tailwind or next-intl
 * (the request locale is unknown at this level). Text is intentionally
 * bilingual ES/EN.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error("[OnTour] Global error:", error);
  }, [error]);

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F5EF",
          color: "#1C2B26",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: "560px", textAlign: "center" }}>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8A8A7E",
              marginBottom: "12px",
            }}
          >
            OnTour DMC Colombia
          </p>
          <h1 style={{ fontSize: "28px", lineHeight: 1.2, margin: "0 0 12px" }}>
            Algo salió mal
          </h1>
          <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#5A5A52", margin: "0 0 24px" }}>
            No pudimos cargar el sitio. Inténtalo de nuevo.
            <br />
            <span lang="en">Something went wrong. Please try again.</span>
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              appearance: "none",
              border: "none",
              borderRadius: "999px",
              background: "#16352D",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              padding: "12px 24px",
              cursor: "pointer",
              minHeight: "44px",
            }}
          >
            Reintentar / Try again
          </button>
        </main>
      </body>
    </html>
  );
}
