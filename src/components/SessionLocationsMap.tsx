"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: 460,
        background: "rgba(255,255,255,0.04)",
        borderRadius: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.4)",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.5px",
      }}
    >
      Loading satellite view...
    </div>
  ),
});

const LOCATIONS = {
  saturday: {
    label: "Saturday",
    name: "Deerfield Beach",
    badge: "Every Saturday",
    icon: "🌊",
    accentColor: "#0fa3b1",
    // Deerfield Beach Pier area, placeholder coordinates (update when exact spot confirmed)
    center: [26.3183, -80.0799] as [number, number],
    zoom: 17,
    markers: [
      {
        lat: 26.3175,
        lng: -80.0810,
        type: "parking" as const,
        label: "Parking Area (TBD)",
        description:
          "Exact parking spot confirmed during your pre-session consultation. Arrive 15 min early.",
      },
      {
        lat: 26.3183,
        lng: -80.0791,
        type: "meeting" as const,
        label: "Beach Meeting Point (TBD)",
        description:
          "Our instructors will be here. Look for The Shore Academy team in coral rash guards.",
      },
    ],
    walkPath: [
      [26.3175, -80.081],
      [26.3178, -80.0803],
      [26.3183, -80.0791],
    ] as [number, number][],
    directionsUrl:
      "https://www.google.com/maps/dir//Deerfield+Beach+Pier,+2200+NE+21st+Ave,+Deerfield+Beach,+FL+33441",
    note: "Finalising our exact Saturday access point. Full details sent the evening before your session.",
    steps: [
      { icon: "🅿️", title: "Park up", text: "Exact lot confirmed at booking. Arrive 15 minutes early." },
      { icon: "🚶", title: "Follow the path", text: "Short walk from parking to the beach access point shown on the map above." },
      { icon: "📍", title: "Find our team", text: "Look for The Shore Academy instructors in coral rash guards at the meeting point." },
      { icon: "🌊", title: "Session begins", text: "Instructors brief the group on conditions before entering the water." },
    ],
  },
  sunday: {
    label: "Sunday",
    name: "Miami Beach",
    badge: "Every Sunday",
    icon: "🏖",
    accentColor: "#e05c3a",
    // Miami Beach, placeholder coordinates (update when exact spot confirmed)
    center: [25.7907, -80.13] as [number, number],
    zoom: 16,
    markers: [
      {
        lat: 25.7900,
        lng: -80.1318,
        type: "parking" as const,
        label: "Parking Area (TBD)",
        description:
          "Exact parking confirmed during your pre-session consultation. Arrive 15 min early.",
      },
      {
        lat: 25.7907,
        lng: -80.1290,
        type: "meeting" as const,
        label: "Beach Meeting Point (TBD)",
        description:
          "Our instructors will be here. Look for The Shore Academy team in coral rash guards.",
      },
    ],
    walkPath: [
      [25.79, -80.1318],
      [25.7903, -80.131],
      [25.7907, -80.129],
    ] as [number, number][],
    directionsUrl: "https://www.google.com/maps/dir//Miami+Beach,+FL+33139",
    note: "Finalising our exact Sunday access point. Full details sent the evening before your session.",
    steps: [
      { icon: "🅿️", title: "Park up", text: "Exact lot confirmed at booking. Arrive 15 minutes early." },
      { icon: "🚶", title: "Follow the path", text: "Short walk from parking to the beach access point shown on the map above." },
      { icon: "📍", title: "Find our team", text: "Look for The Shore Academy instructors in coral rash guards at the meeting point." },
      { icon: "🌊", title: "Session begins", text: "Instructors brief the group on conditions before entering the water." },
    ],
  },
} as const;

export default function SessionLocationsMap() {
  const [active, setActive] = useState<"saturday" | "sunday">("saturday");
  const loc = LOCATIONS[active];

  return (
    <section
      id="session-locations"
      aria-labelledby="locations-map-title"
      style={{ padding: "100px 24px", background: "var(--navy)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <span
          style={{
            display: "inline-block",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "var(--teal)",
            marginBottom: 12,
          }}
        >
          Location Guide
        </span>
        <h2
          id="locations-map-title"
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 12,
          }}
        >
          Find Us &amp; Where to Park
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 640,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Satellite walkthrough of our weekly session locations. Click the markers to see
          parking and meeting point details. Exact pins are confirmed with you the evening before
          your session.
        </p>

        {/* Day tabs */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
          {(["saturday", "sunday"] as const).map((day) => {
            const d = LOCATIONS[day];
            const isActive = active === day;
            return (
              <button
                key={day}
                onClick={() => setActive(day)}
                aria-pressed={isActive}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 28px",
                  borderRadius: 50,
                  border: isActive
                    ? `2px solid ${d.accentColor}`
                    : "2px solid rgba(255,255,255,0.12)",
                  background: isActive
                    ? `rgba(${day === "saturday" ? "15,163,177" : "224,92,58"},0.14)`
                    : "rgba(255,255,255,0.03)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  transition: "all 0.18s",
                  fontFamily: "inherit",
                }}
              >
                <span style={{ fontSize: 18 }}>{d.icon}</span>
                <span>
                  {d.badge}: {d.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Map + steps layout */}
        <div className="map-layout" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" }}>
          {/* Map */}
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: `2px solid rgba(${active === "saturday" ? "15,163,177" : "224,92,58"},0.3)`,
              boxShadow: `0 0 60px rgba(${active === "saturday" ? "15,163,177" : "224,92,58"},0.1)`,
              position: "relative",
              background: "#0a1628",
            }}
          >
            {/* Satellite badge */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                zIndex: 1000,
                background: "rgba(10,22,40,0.9)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--teal)",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                backdropFilter: "blur(6px)",
                pointerEvents: "none",
              }}
            >
              🛰 USGS Satellite: {loc.name}
            </div>

            <LeafletMap
              key={active}
              center={loc.center}
              zoom={loc.zoom}
              markers={loc.markers as any}
              walkPath={loc.walkPath as any}
              locationName={loc.name}
            />
          </div>

          {/* Right panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Location header */}
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 14,
                padding: "22px 22px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 26 }}>{loc.icon}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: loc.accentColor }}>{loc.badge}</div>
                  <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>{loc.name}</div>
                </div>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 10 }}>
                {loc.note}
              </p>
            </div>

            {/* Step-by-step walkthrough */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "20px 20px",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
                On the day
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {loc.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, position: "relative", paddingBottom: i < loc.steps.length - 1 ? 18 : 0 }}>
                    {/* Connector line */}
                    {i < loc.steps.length - 1 && (
                      <div style={{ position: "absolute", left: 19, top: 40, width: 2, height: "calc(100% - 24px)", background: "rgba(255,255,255,0.07)", borderRadius: 1 }} />
                    )}
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                      {step.icon}
                    </div>
                    <div style={{ paddingTop: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{step.title}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{step.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to bring */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "18px 20px",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                🎒 What to bring
              </div>
              {["Swimwear (rash guard recommended)", "Reef-safe sunscreen", "Water bottle", "Towel"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <span style={{ color: "var(--teal)", fontWeight: 800, fontSize: 10 }}>✓</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item}</span>
                </div>
              ))}
            </div>

            <a
              href={loc.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "13px 20px",
                borderRadius: 50,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                fontSize: 13,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Open in Google Maps →
            </a>
            <a
              href="/book-a-session"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 20px",
                borderRadius: 50,
                background: "var(--coral)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Book Your {loc.label} Session →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .map-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
