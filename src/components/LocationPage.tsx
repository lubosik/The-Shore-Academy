import type { Metadata } from "next";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import FaqList from "@/components/FaqList";
import type { LocationData } from "@/lib/locations";

export function buildLocationMetadata(loc: LocationData): Metadata {
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    openGraph: {
      title: loc.metaTitle,
      description: loc.metaDescription,
    },
  };
}

export default function LocationPage({ loc }: { loc: LocationData }) {
  const localBizSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `The Shore Academy — ${loc.name}`,
    description: loc.metaDescription,
    url: `https://theshoreacademy.com/locations/${loc.slug}`,
    image: "https://theshoreacademy.com/hero-image.png",
    email: "info@theshoreacademy.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.name,
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: loc.geoLat, longitude: loc.geoLng },
    areaServed: loc.neighborhoods,
    priceRange: "$175–$1499",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }} />

      {/* Hero */}
      <section style={{ background: "linear-gradient(165deg, var(--navy) 0%, #0d2040 50%, var(--deep-blue) 100%)", minHeight: "70vh", display: "flex", alignItems: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 40%, rgba(15,163,177,0.12) 0%, transparent 60%)" }} aria-hidden="true" />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2, width: "100%" }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <Link href="/#service-areas" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Locations</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{loc.name}</span>
          </nav>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, padding: "8px 20px", marginBottom: 28, fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.5px" }}>
            🌊 {loc.heroBadge}
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.5px" }}>
            {loc.title}
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.75)", maxWidth: 640, lineHeight: 1.7, marginBottom: 40 }}>
            {loc.heroSubtitle}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/book-a-session" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--coral)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 36px", borderRadius: 50, textDecoration: "none" }}>
              Book a Session →
            </Link>
            <Link href="/#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "2px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.9)", fontWeight: 600, fontSize: 16, padding: "14px 32px", borderRadius: 50, textDecoration: "none" }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Beaches */}
      <section style={{ padding: "100px 24px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ocean)", marginBottom: 12 }}>Where We Train</span>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "var(--navy)", marginBottom: 50 }}>
            {loc.name} Beach Locations
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="beaches-grid">
            {loc.beaches.map((beach) => (
              <div key={beach.name} style={{ background: "var(--off-white)", borderRadius: "var(--radius)", padding: "32px 28px", borderTop: "4px solid var(--teal)" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>🏖</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>{beach.name}</h3>
                <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.7 }}>{beach.description}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`.beaches-grid { @media (max-width:768px) { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Prerequisites (only shown if location has them) */}
      {loc.prerequisites && (
        <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #fff5f5, #fff0ee)", borderTop: "4px solid var(--coral)", borderBottom: "4px solid var(--coral)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 32, fontWeight: 700, color: "var(--coral)", marginBottom: 16 }}>Prerequisites Before Enrolling</h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, margin: "24px auto", maxWidth: 600, textAlign: "left" }}>
              {loc.prerequisites.map((req, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 20px", background: "var(--white)", borderRadius: "var(--radius-sm)", fontSize: 15, fontWeight: 500, color: "var(--text)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <span style={{ color: "var(--teal)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section style={{ padding: "100px 24px", background: "var(--sand-light)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ocean)", marginBottom: 12 }}>Parent Reviews</span>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "var(--navy)", marginBottom: 50 }}>
            {loc.name} Families Love The Shore Academy
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="testimonials-grid">
            {loc.testimonials.map((t) => (
              <div key={t.name} style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "32px 28px", boxShadow: "var(--shadow)" }}>
                <div style={{ color: "#f59e0b", fontSize: 18, marginBottom: 16, letterSpacing: 2 }}>★★★★★</div>
                <blockquote style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>&ldquo;{t.quote}&rdquo;</blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, var(--ocean), var(--teal))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{t.initial}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-light)" }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.testimonials-grid { @media (max-width:768px) { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Neighborhoods served */}
      <section style={{ padding: "80px 24px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ocean)", marginBottom: 12 }}>Service Area</span>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--navy)", marginBottom: 24 }}>
            Families We Serve in {loc.name}
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {loc.neighborhoods.map((n) => (
              <span key={n} style={{ padding: "6px 16px", background: "rgba(26,111,160,0.08)", borderRadius: 50, fontSize: 13, color: "var(--ocean)", fontWeight: 600 }}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (only if location has them) */}
      {loc.faqs && loc.faqs.length > 0 && (
        <section style={{ padding: "100px 24px", background: "var(--off-white)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ocean)", marginBottom: 12 }}>Questions</span>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "var(--navy)", marginBottom: 40 }}>
              {loc.name} Ocean Safety — FAQ
            </h2>
            <FaqList faqs={loc.faqs} />
          </div>
        </section>
      )}

      {/* Booking */}
      <section style={{ padding: "100px 24px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ocean)", marginBottom: 12 }}>Book Now</span>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>
            Book a {loc.name} Ocean Safety Session
          </h2>
          <p style={{ fontSize: 17, color: "var(--text-light)", maxWidth: 680, lineHeight: 1.7, marginBottom: 40 }}>
            Ready to start? Fill in the form below. We&apos;ll call to confirm your child&apos;s readiness and lock in your {loc.name} session.
          </p>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
