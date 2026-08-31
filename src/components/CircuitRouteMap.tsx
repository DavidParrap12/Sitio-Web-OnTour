"use client";

import React from "react";
import { MapPin, Navigation } from "lucide-react";

export interface CircuitRouteMapProps {
  mapEmbedUrl?: string;
  circuitName: string;
}

export default function CircuitRouteMap({ mapEmbedUrl, circuitName }: CircuitRouteMapProps) {
  if (!mapEmbedUrl) {
    return null;
  }

  return (
    <div className="bg-editorial-warm p-6 rounded-3xl border border-editorial-border shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-editorial-accent/10 text-editorial-accent flex items-center justify-center">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-editorial-dark text-base leading-tight">
              Ruta del Circuito
            </h4>
            <p className="text-xs text-editorial-subtle">
              Mapa interactivo del recorrido
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-editorial-border bg-white shadow-inner">
        <iframe
          src={mapEmbedUrl}
          className="absolute -top-[70px] left-0 w-full border-0"
          style={{ height: "calc(100% + 70px)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa interactivo - ${circuitName}`}
        />
      </div>
    </div>
  );
}
