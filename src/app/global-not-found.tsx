import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

/**
 * Global 404 for URLs that match no route at all (e.g. /es/typo).
 *
 * It bypasses the [locale] root layout, so it renders its own <html>/<body>.
 * The request locale is not available here, so the copy is bilingual ES/EN.
 */
export const metadata: Metadata = {
  title: "Página no encontrada | Page not found | OnTour DMC Colombia",
  description:
    "La página que buscas no existe o cambió de dirección. / The page you are looking for does not exist or has moved.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
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
            OnTour DMC Colombia · 404
          </p>
          <h1 style={{ fontSize: "28px", lineHeight: 1.2, margin: "0 0 12px" }}>
            Página no encontrada
          </h1>
          <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#5A5A52", margin: "0 0 24px" }}>
            La página que buscas no existe o cambió de dirección.
            <br />
            <span lang="en">
              The page you are looking for does not exist or has moved.
            </span>
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <Link
              href="/es"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "999px",
                background: "#16352D",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 600,
                padding: "12px 24px",
                minHeight: "44px",
                textDecoration: "none",
              }}
            >
              Volver al inicio
            </Link>
            <Link
              href="/en"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "999px",
                background: "#ffffff",
                color: "#16352D",
                border: "1px solid #D9D5C7",
                fontSize: "14px",
                fontWeight: 600,
                padding: "12px 24px",
                minHeight: "44px",
                textDecoration: "none",
              }}
            >
              Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
