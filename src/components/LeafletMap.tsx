"use client";

import { useEffect, useRef } from "react";

interface MarkerData {
  lat: number;
  lng: number;
  type: "parking" | "meeting";
  label: string;
  description: string;
}

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markers: MarkerData[];
  walkPath?: [number, number][];
  locationName: string;
}

export default function LeafletMap({
  center,
  zoom = 17,
  markers,
  walkPath,
  locationName,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let L: any;
    let isMounted = true;

    (async () => {
      const leaflet = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      L = leaflet.default;

      if (!isMounted || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center,
        zoom,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // USGS National Map — free, no API key, high-quality US satellite imagery
      L.tileLayer(
        "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
          maxZoom: 20,
          maxNativeZoom: 16,
        }
      ).addTo(map);

      // Custom SVG icons
      function makeIcon(type: "parking" | "meeting") {
        const isParking = type === "parking";
        const bg = isParking ? "#1a6fa0" : "#e05c3a";
        const glyph = isParking ? "P" : "★";
        return L.divIcon({
          className: "",
          html: `
            <div style="
              width:40px;height:40px;border-radius:50% 50% 50% 0;
              background:${bg};border:3px solid #fff;
              display:flex;align-items:center;justify-content:center;
              font-size:${isParking ? "16px" : "14px"};font-weight:800;color:#fff;
              box-shadow:0 3px 12px rgba(0,0,0,0.4);
              transform:rotate(-45deg);
            ">
              <span style="transform:rotate(45deg)">${glyph}</span>
            </div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -44],
        });
      }

      // Draw walk path
      if (walkPath && walkPath.length > 1) {
        // Dashed walking path
        L.polyline(walkPath, {
          color: "#0fa3b1",
          weight: 4,
          dashArray: "10, 8",
          opacity: 0.9,
        }).addTo(map);

        // Direction arrows (midpoints)
        for (let i = 0; i < walkPath.length - 1; i++) {
          const [lat1, lng1] = walkPath[i];
          const [lat2, lng2] = walkPath[i + 1];
          const midLat = (lat1 + lat2) / 2;
          const midLng = (lng1 + lng2) / 2;
          const angle = (Math.atan2(lng2 - lng1, lat2 - lat1) * 180) / Math.PI;
          L.marker([midLat, midLng], {
            icon: L.divIcon({
              className: "",
              html: `<div style="transform:rotate(${angle}deg);font-size:18px;color:#0fa3b1;text-shadow:0 0 4px rgba(0,0,0,0.6)">▶</div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            }),
            interactive: false,
          }).addTo(map);
        }
      }

      // Markers
      for (const m of markers) {
        L.marker([m.lat, m.lng], { icon: makeIcon(m.type) })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:sans-serif;min-width:200px">
              <div style="font-size:13px;font-weight:800;color:${m.type === "parking" ? "#1a6fa0" : "#e05c3a"};margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px">
                ${m.type === "parking" ? "🅿️ Parking" : "📍 Meeting Point"}
              </div>
              <div style="font-size:14px;font-weight:700;color:#0a1628;margin-bottom:4px">${m.label}</div>
              <div style="font-size:13px;color:#475569;line-height:1.5">${m.description}</div>
            </div>`,
            { maxWidth: 260 }
          );
      }

      // "You are walking this way" legend
      if (walkPath) {
        const legend = L.control({ position: "bottomleft" });
        legend.onAdd = () => {
          const div = L.DomUtil.create("div");
          div.innerHTML = `
            <div style="background:rgba(10,22,40,0.88);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:10px 14px;font-family:sans-serif;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                <div style="width:28px;height:3px;border-top:3px dashed #0fa3b1;flex-shrink:0"></div>
                <span style="font-size:12px;color:#fff;font-weight:600">Walking route</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                <div style="width:14px;height:14px;border-radius:50%;background:#1a6fa0;flex-shrink:0"></div>
                <span style="font-size:12px;color:rgba(255,255,255,0.75)">Parking area</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <div style="width:14px;height:14px;border-radius:50%;background:#e05c3a;flex-shrink:0"></div>
                <span style="font-size:12px;color:rgba(255,255,255,0.75)">Meeting point</span>
              </div>
            </div>`;
          return div;
        };
        legend.addTo(map);
      }
    })();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%", minHeight: 460, borderRadius: "inherit" }}
      aria-label={`Satellite map showing session location at ${locationName}`}
      role="application"
    />
  );
}
