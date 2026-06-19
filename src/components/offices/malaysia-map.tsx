"use client";

/**
 * Real interactive map using Leaflet + OpenStreetMap.
 * Uses CartoDB dark-matter tiles in dark mode and CartoDB Positron in light mode.
 * Dynamically imported (no SSR) to avoid window-is-not-defined errors.
 */

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { OfficeLocation } from "@/lib/types";

// ── Leaflet is only loaded client-side ──────────────────────────────────────
let L: typeof import("leaflet") | null = null;

// Custom SVG pin icon factory
function createPinIcon(active: boolean, L: typeof import("leaflet")) {
  const color = active ? "#22d3ee" : "#06b6d4";
  const glow = active ? "0 0 16px 4px rgba(34,211,238,0.7)" : "none";
  const size = active ? 36 : 28;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 8}" viewBox="0 0 36 44">
      <defs>
        <filter id="g">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="18" cy="18" r="14" fill="${color}" fill-opacity="0.18" />
      <circle cx="18" cy="18" r="${active ? 10 : 8}" fill="${color}" filter="url(#g)" />
      <circle cx="18" cy="18" r="${active ? 5 : 4}" fill="white" />
      <line x1="18" y1="28" x2="18" y2="42" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

  return L.divIcon({
    html: `<div style="filter:drop-shadow(${glow})">${svg}</div>`,
    iconSize: [size, size + 8],
    iconAnchor: [size / 2, size + 8],
    popupAnchor: [0, -(size + 8)],
    className: "",
  });
}

// Popup HTML content
function popupHTML(o: OfficeLocation): string {
  const serviceList = o.services
    .map((s) => `<li style="margin:2px 0;opacity:0.85">• ${s}</li>`)
    .join("");
  return `
    <div style="font-family:'Space Grotesk',system-ui,sans-serif;min-width:220px;padding:2px 0">
      <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#22d3ee;margin:0 0 4px">
        ${o.state}
      </p>
      <p style="font-size:15px;font-weight:700;margin:0 0 6px;line-height:1.2">${o.name.replace("LoopTech ", "")}</p>
      <p style="font-size:11px;opacity:0.7;margin:0 0 8px;line-height:1.4">${o.address}</p>
      <ul style="list-style:none;padding:0;margin:0 0 8px;font-size:11px">${serviceList}</ul>
      <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.3);border-radius:6px;padding:5px 10px;margin-bottom:10px">
        <span style="font-size:11px;opacity:0.8">Live inventory</span>
        <span style="font-size:14px;font-weight:700;color:#4ade80">${o.liveInventory} units</span>
      </div>
      <div style="display:flex;gap:6px">
        <a href="https://wa.me/${o.whatsapp}" target="_blank" rel="noopener noreferrer"
           style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:5px;background:#22d3ee;color:#040f18;font-size:11px;font-weight:700;padding:6px 10px;border-radius:6px;text-decoration:none">
          WhatsApp
        </a>
        <span style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:5px;background:rgba(255,255,255,0.08);color:inherit;font-size:11px;font-weight:600;padding:6px 10px;border-radius:6px">
          ${o.hours.split(",")[1]?.trim() ?? o.hours}
        </span>
      </div>
    </div>`;
}

export function MalaysiaMap({
  offices,
  activeId,
  onSelect,
}: {
  offices: OfficeLocation[];
  activeId?: string;
  onSelect: (office: OfficeLocation) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<Map<string, import("leaflet").Marker>>(new Map());
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);

  // ── Inject Leaflet CSS once on mount ─────────────────────────────────────
  useEffect(() => {
    // Leaflet base CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.crossOrigin = "";
      document.head.appendChild(link);
    }
    // Custom popup/control overrides
    if (!document.getElementById("looptech-map-css")) {
      const style = document.createElement("style");
      style.id = "looptech-map-css";
      style.textContent = `
        .looptech-popup .leaflet-popup-content-wrapper {
          background: rgba(10, 20, 30, 0.96);
          color: #e2f4f8;
          border: 1px solid rgba(34, 211, 238, 0.3);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.15);
          backdrop-filter: blur(16px);
        }
        .looptech-popup .leaflet-popup-tip { background: rgba(10, 20, 30, 0.96); }
        .looptech-popup .leaflet-popup-close-button { color: #22d3ee !important; font-size: 18px; top: 8px; right: 10px; }
        .looptech-popup .leaflet-popup-close-button:hover { color: white !important; }
        html.light .looptech-popup .leaflet-popup-content-wrapper { background: rgba(255,255,255,0.97); color: #0d2233; border: 1px solid rgba(34,211,238,0.4); }
        html.light .looptech-popup .leaflet-popup-tip { background: rgba(255,255,255,0.97); }
        .leaflet-container { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .leaflet-control-zoom a { background: rgba(10,20,30,0.85) !important; color: #22d3ee !important; border-color: rgba(34,211,238,0.25) !important; backdrop-filter: blur(8px); }
        .leaflet-control-zoom a:hover { background: rgba(34,211,238,0.15) !important; }
        html.light .leaflet-control-zoom a { background: rgba(255,255,255,0.9) !important; color: #0891b2 !important; border-color: rgba(8,145,178,0.3) !important; }
        .leaflet-attribution-flag { display: none !important; }
        .leaflet-control-attribution { background: rgba(10,20,30,0.6) !important; color: rgba(255,255,255,0.4) !important; font-size: 10px !important; backdrop-filter: blur(4px); }
        .leaflet-control-attribution a { color: rgba(34,211,238,0.6) !important; }
        html.light .leaflet-control-attribution { background: rgba(255,255,255,0.7) !important; color: rgba(0,0,0,0.5) !important; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // ── Boot Leaflet (client-side only) ───────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current) return;

    import("leaflet").then((mod) => {
      L = mod.default ?? mod;

      // Fix default icon path issue in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapRef.current) return;
      // Guard against React Strict Mode double-invoke / hot-reload
      if ((mapRef.current as any)._leaflet_id) return;

      // Centre on Malaysia
      const map = L.map(mapRef.current, {
        center: [4.2, 109.5],
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      // Zoom control bottom-right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Attribution bottom-left (minimal)
      L.control
        .attribution({ position: "bottomleft", prefix: false })
        .addTo(map);

      mapInstanceRef.current = map;
      setReady(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current.clear();
      }
    };
  }, []);

  // ── Swap tile layer when theme changes ────────────────────────────────────
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !L) return;

    // Remove old tile layers
    map.eachLayer((layer) => {
      if ((layer as any)._url) map.removeLayer(layer);
    });

    const isDark = resolvedTheme === "dark";

    if (isDark) {
      // CartoDB Dark Matter — matches the site's dark aesthetic
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);
    } else {
      // CartoDB Positron — clean light style
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);
    }
  }, [resolvedTheme, ready]);

  // ── Add / update markers ──────────────────────────────────────────────────
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !L || !ready) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    offices.forEach((o) => {
      if (!L) return;
      const active = o.id === activeId;
      const icon = createPinIcon(active, L);

      const marker = L.marker([o.lat, o.lng], { icon })
        .addTo(map)
        .bindPopup(popupHTML(o), {
          maxWidth: 280,
          className: "looptech-popup",
        })
        .on("click", () => {
          onSelect(o);
          marker.openPopup();
        });

      if (active) {
        marker.openPopup();
        map.setView([o.lat, o.lng], Math.max(map.getZoom(), 8), {
          animate: true,
        });
      }

      markersRef.current.set(o.id, marker);
    });
  }, [offices, activeId, ready, onSelect]);

  return (
    <div
      ref={mapRef}
      className="h-full w-full rounded-xl overflow-hidden"
      style={{ minHeight: 420 }}
      aria-label="Interactive map of LoopTech office locations in Malaysia"
    />
  );
}
