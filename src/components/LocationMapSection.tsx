"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "@/lib/locations";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

interface LocationMapSectionProps {
  locationName: string;
  mapCenter: [number, number];
  mapZoom?: number;
  mapMarkers: MapMarker[];
  mapWalkPath?: [number, number][];
}

export default function LocationMapSection({
  locationName,
  mapCenter,
  mapZoom,
  mapMarkers,
  mapWalkPath,
}: LocationMapSectionProps) {
  return (
    <section style={{ padding: "100px 24px", background: "var(--navy)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--teal)", marginBottom: 12 }}>Find Us</span>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
          Parking & Meeting Point: {locationName}
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 680, lineHeight: 1.7, marginBottom: 40 }}>
          Sessions run every weekend at the same location. Use the map below to find parking spots and your meeting point. Click any marker for details.
        </p>
        <div style={{ borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.4)", height: 500 }}>
          <LeafletMap
            center={mapCenter}
            zoom={mapZoom ?? 17}
            markers={mapMarkers}
            walkPath={mapWalkPath}
            locationName={locationName}
          />
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
          {mapMarkers.filter(m => m.type === "parking").map((m) => (
            <div key={m.label} style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: "1 1 260px" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1a6fa0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0 }}>P</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{m.description}</div>
              </div>
            </div>
          ))}
          {mapMarkers.filter(m => m.type === "meeting").map((m) => (
            <div key={m.label} style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: "1 1 260px" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--coral)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0 }}>★</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{m.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
