"use client";

import dynamic from "next/dynamic";

/* ────────────────────────────────────────────────────────────────
   Dynamic import wrapper – SSR disabled.
   Leaflet requires `window` and `document`, so we must prevent
   the inner component from loading during server-side rendering.
   ──────────────────────────────────────────────────────────────── */

interface CircuitRouteMapProps {
  dayImages: { image: string; location: string }[];
  circuitName: string;
}

const CircuitRouteMap = dynamic<CircuitRouteMapProps>(
  () => import("./CircuitRouteMapInner"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: 420,
          width: "100%",
          borderRadius: 16,
          background: "#0d2137",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: "3px solid rgba(77,216,224,0.2)",
            borderTopColor: "#4dd8e0",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    ),
  }
);

export default CircuitRouteMap;
