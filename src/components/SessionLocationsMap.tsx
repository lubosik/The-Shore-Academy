"use client";

import { useState } from "react";

const LOCATIONS = {
  saturday: {
    label: "Saturday",
    name: "Deerfield Beach",
    day: "Every Saturday",
    badge: "Saturdays",
    color: "var(--ocean)",
    icon: "🌊",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Deerfield+Beach+Pier+2200+NE+21st+Ave+Deerfield+Beach+FL+33441&t=k&z=17&ie=UTF8&iwloc=&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir//Deerfield+Beach+Pier,+2200+NE+21st+Ave,+Deerfield+Beach,+FL+33441",
    meetingPoint:
      "Exact meeting point TBD — confirmed during your pre-session consultation call. We will send you a pin the evening before.",
    parkingInstructions:
      "Parking details TBD — confirmed when you book. Generally free and metered parking available near the pier. Arrive 15 minutes early so you are not rushed.",
    address: "Deerfield Beach, FL (exact access point confirmed at booking)",
    note:
      "We are finalising our exact Saturday beach access point. Full details — precise pin, parking instructions, and where to stand — will be shared with you when you confirm your session.",
  },
  sunday: {
    label: "Sunday",
    name: "Miami Beach",
    day: "Every Sunday",
    badge: "Sundays",
    color: "var(--teal)",
    icon: "🏖",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Miami+Beach+FL+33139&t=k&z=15&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://www.google.com/maps/dir//Miami+Beach,+FL+33139",
    meetingPoint:
      "Exact meeting point TBD — confirmed during your pre-session consultation call. We will send you a pin the evening before.",
    parkingInstructions:
      "Parking details TBD — confirmed when you book. Miami Beach has multiple metered lots and street parking near public beach access points. Arrive 15 minutes early so you are not rushed.",
    address: "Miami Beach, FL (exact access point confirmed at booking)",
    note:
      "We are finalising our exact Sunday beach access point. Full details — precise pin, parking instructions, and where to stand — will be shared with you when you confirm your session.",
  },
};

export default function SessionLocationsMap() {
  const [active, setActive] = useState<"saturday" | "sunday">("saturday");
  const loc = LOCATIONS[active];

  return (
    <section
      id="session-locations"
      aria-labelledby="locations-map-title"
      style={{ padding: "100px 24px", background: "var(--navy)", color: "#fff" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
          Where We Meet
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
          Fixed Weekly Session Locations
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 680,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Same locations every week so you always know where to go. Exact beach access points,
          parking pins, and meeting instructions are shared with you when you confirm your session.
        </p>

        {/* Day tabs */}
        <div style={{ display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
          {(["saturday", "sunday"] as const).map((day) => {
            const d = LOCATIONS[day];
            const isActive = active === day;
            return (
              <button
                key={day}
                onClick={() => setActive(day)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 28px",
                  borderRadius: 50,
                  border: isActive ? "2px solid var(--teal)" : "2px solid rgba(255,255,255,0.15)",
                  background: isActive ? "rgba(15,163,177,0.15)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: 18 }}>{d.icon}</span>
                <span>
                  {d.badge} — {d.name}
                </span>
                {isActive && (
                  <span
                    style={{
                      background: "var(--teal)",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: 20,
                      letterSpacing: "0.5px",
                    }}
                  >
                    ACTIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Map + Info grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 32,
            alignItems: "start",
          }}
          className="map-grid"
        >
          {/* Map */}
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "3px solid rgba(15,163,177,0.3)",
              boxShadow: "0 0 60px rgba(15,163,177,0.12)",
              position: "relative",
            }}
          >
            {/* Satellite badge */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                zIndex: 10,
                background: "rgba(10,22,40,0.85)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--teal)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                backdropFilter: "blur(6px)",
              }}
            >
              🛰 Satellite View — {loc.name}
            </div>
            <iframe
              src={loc.mapEmbedUrl}
              width="100%"
              height="460"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Satellite map of ${loc.name} session location`}
            />
            {/* Coming soon overlay for exact pin */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(0deg, rgba(10,22,40,0.92) 0%, transparent 100%)",
                padding: "28px 20px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                <span style={{ color: "var(--teal)", fontWeight: 700 }}>📍 Exact pin TBD</span> —
                shared with you the evening before your session
              </div>
              <a
                href={loc.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "var(--teal)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  padding: "8px 18px",
                  borderRadius: 50,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Get Directions →
              </a>
            </div>
          </div>

          {/* Info panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Header card */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "24px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 28 }}>{loc.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "var(--teal)",
                    }}
                  >
                    {loc.badge}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {loc.name}
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.6,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: 12,
                  marginTop: 4,
                }}
              >
                {loc.note}
              </p>
            </div>

            {/* Meeting Point */}
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "20px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 20 }}>📍</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "var(--teal)",
                  }}
                >
                  Meeting Point
                </span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                {loc.meetingPoint}
              </p>
            </div>

            {/* Parking */}
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "20px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 20 }}>🅿️</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "var(--teal)",
                  }}
                >
                  Parking
                </span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                {loc.parkingInstructions}
              </p>
            </div>

            {/* What to bring */}
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "20px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <span style={{ fontSize: 20 }}>🎒</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "var(--teal)",
                  }}
                >
                  What to Bring
                </span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  "Swimwear (rash guard recommended)",
                  "Reef-safe sunscreen",
                  "Water bottle",
                  "Towel",
                  "Arrive 15 minutes early",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.65)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "var(--teal)", fontWeight: 700, fontSize: 10 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/book-a-session"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "var(--coral)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                padding: "15px 24px",
                borderRadius: 50,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Book Your {loc.badge} Session →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .map-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
