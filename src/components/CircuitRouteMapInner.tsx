"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LeafletMapStyles.css";

/* ────────────────────────────────────────────────────────────────
   Real lat/lng coordinates for Colombian cities
   ──────────────────────────────────────────────────────────────── */
const CITIES: Record<string, [number, number]> = {
  // ── Ciudades y pueblos (centro / plaza principal) ──────────
  "BOGOTÁ":           [4.5981, -74.0761],   // Plaza de Bolívar
  "ZIPAQUIRÁ":        [5.0227, -74.0042],   // Plaza de los Comuneros
  "MEDELLÍN":         [6.2497, -75.5681],   // Parque Berrío
  "GUATAPÉ":          [6.2325, -75.1586],   // Plaza principal
  "CARTAGENA":        [10.4261, -75.5491],  // Centro histórico
  "BARRANQUILLA":     [10.9878, -74.7889],  // Plaza de la Paz
  "MANIZALES":        [5.0681, -75.5175],   // Plaza de Bolívar
  "SALENTO":          [4.6372, -75.5705],   // Plaza de Bolívar
  "ARMENIA":          [4.5350, -75.6757],   // Plaza de Bolívar
  "QUINDÍO":          [4.5390, -75.6690],   // Cerca de Armenia (offset)
  "HONDA":            [5.2069, -74.7367],   // Centro histórico
  "GUADUAS":          [5.0694, -74.5981],   // Plaza de la Constitución
  "LÍBANO":           [4.9218, -75.0623],   // Parque central
  "IBAGUÉ":           [4.4452, -75.2426],   // Plaza de Bolívar
  "TOLIMA":           [4.4500, -75.2350],   // Cerca de Ibagué (offset)
  "PRADO":            [3.7497, -74.9277],   // Plaza principal
  "SAN AGUSTÍN":      [1.8792, -76.2683],   // Plaza principal
  "VILLA DE LEYVA":   [5.6331, -73.5256],   // Plaza Mayor
  "TUNJA":            [5.5325, -73.3617],   // Plaza de Bolívar
  "BOYACÁ":           [5.4545, -73.3620],   // Tunja centro

  // ── Sitios geográficos (no son centros urbanos) ────────────
  "MONSERRATE":       [4.6057, -74.0557],   // Cerro de Monserrate
  "COMBEIMA":         [4.5775, -75.3316],   // Cañón del Combeima
  "HUILA":            [2.9273, -75.2819],   // Neiva (capital Huila)
  "ISLAS DEL ROSARIO":[10.1750, -75.7450],  // Archipiélago
  "BARÚ":             [10.2145, -75.5880],  // Península
  "LAGO DE TOTA":     [5.5600, -72.9500],   // Lago
};

/* ────────────────────────────────────────────────────────────────
   Tile layers (free, no API key needed)
   ──────────────────────────────────────────────────────────────── */
const TILE_URL =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';

/* ────────────────────────────────────────────────────────────────
   Custom marker icon builder
   ──────────────────────────────────────────────────────────────── */
function createMarkerIcon(stopNumber: number) {
  return L.divIcon({
    className: "ontour-marker",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -14],
    html: `
      <div class="ontour-marker-pulse"></div>
      <div class="ontour-marker-dot"></div>
      <div class="ontour-stop-badge">${stopNumber}</div>
    `,
  });
}

/* ────────────────────────────────────────────────────────────────
   Popup HTML builder
   ──────────────────────────────────────────────────────────────── */
function buildPopupHtml(image: string, location: string) {
  return `
    <div class="ontour-popup">
      <img class="ontour-popup-img" src="${image}" alt="${location}" />
      <div class="ontour-popup-info">
        <span class="ontour-popup-name">${location}</span>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────────── */
export interface CircuitRouteMapInnerProps {
  dayImages: { image: string; location: string }[];
  circuitName: string;
}

export default function CircuitRouteMapInner({ dayImages, circuitName }: CircuitRouteMapInnerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isReady, setIsReady] = useState(false);

  /* Build unique stops and route coordinates */
  const { uniqueStops, routeCoords } = useMemo(() => {
    const points = dayImages
      .map((d, idx) => {
        const coords = CITIES[d.location];
        return coords
          ? { name: d.location, lat: coords[0], lng: coords[1], dayIdx: idx, image: d.image }
          : null;
      })
      .filter(Boolean) as {
        name: string; lat: number; lng: number; dayIdx: number; image: string;
      }[];

    /* Deduplicate by location NAME (keep first occurrence) */
    const seen = new Set<string>();
    const unique: typeof points = [];

    for (const p of points) {
      if (!seen.has(p.name)) {
        seen.add(p.name);
        unique.push(p);
      }
    }

    /* Route coordinates: deduplicate CONSECUTIVE same locations
       so the polyline doesn't zig-zag back to the same city */
    const route: L.LatLngExpression[] = [];
    for (const p of points) {
      const coord: [number, number] = [p.lat, p.lng];
      const prev = route[route.length - 1] as [number, number] | undefined;
      if (!prev || prev[0] !== coord[0] || prev[1] !== coord[1]) {
        route.push(coord);
      }
    }

    return { uniqueStops: unique, routeCoords: route };
  }, [dayImages]);

  /* Initialize map */
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
      dragging: true,
      doubleClickZoom: true,
      touchZoom: true,
    });

    mapRef.current = map;

    /* Add dark tile layer */
    L.tileLayer(TILE_URL, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 18,
      subdomains: "abcd",
    }).addTo(map);

    /* Fit bounds to route with padding */
    if (routeCoords.length > 0) {
      const bounds = L.latLngBounds(routeCoords as [number, number][]);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 9 });
    }

    /* Add route polyline */
    if (routeCoords.length > 1) {
      const polyline = L.polyline(routeCoords, {
        color: "#4dd8e0",
        weight: 2.5,
        opacity: 0.75,
        dashArray: "12 8",
        lineCap: "round",
        lineJoin: "round",
        className: "ontour-route-line",
      });
      polyline.addTo(map);
    }

    /* Add markers with popups */
    for (let i = 0; i < uniqueStops.length; i++) {
      const stop = uniqueStops[i];
      const icon = createMarkerIcon(i + 1);
      const marker = L.marker([stop.lat, stop.lng], { icon });

      marker.bindPopup(
        buildPopupHtml(stop.image, stop.name),
        {
          maxWidth: 300,
          minWidth: 220,
          closeButton: true,
          autoPan: true,
          autoPanPaddingTopLeft: L.point(20, 20),
        }
      );

      /* Show popup on hover (desktop) */
      marker.on("mouseover", function (this: L.Marker) {
        this.openPopup();
      });

      /* Click → scroll to itinerary day */
      marker.on("click", function () {
        const dayEl = document.getElementById(`itinerary-day-${stop.dayIdx}`);
        if (dayEl) {
          dayEl.scrollIntoView({ behavior: "smooth", block: "center" });
          /* Brief highlight flash */
          dayEl.style.transition = "background 0.3s ease";
          dayEl.style.background = "rgba(77, 216, 224, 0.08)";
          dayEl.style.borderRadius = "16px";
          setTimeout(() => {
            dayEl.style.background = "";
          }, 1500);
        }
      });

      marker.addTo(map);
    }

    /* Small delay so tiles load before fade-in */
    setTimeout(() => setIsReady(true), 300);

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="ontour-map-container relative"
      style={{
        opacity: isReady ? 1 : 0,
        transition: "opacity 0.5s ease-in",
      }}
    >
      <div
        ref={mapContainerRef}
        style={{ height: 420, width: "100%" }}
      />

      {/* Circuit name overlay */}
      <div className="ontour-map-overlay">
        <span className="ontour-map-overlay-name">{circuitName}</span>
        <span className="ontour-map-overlay-dot" />
      </div>
    </div>
  );
}
