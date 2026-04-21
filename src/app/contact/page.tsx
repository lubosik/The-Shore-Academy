import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact Us | The Shore Academy — Ocean Safety School South Florida",
  description:
    "Get in touch with The Shore Academy. Email us at info@theshoreacademy.com. Serving West Palm Beach, Boca Raton, Delray Beach, Miami, and Fort Lauderdale with certified ocean safety instruction.",
  openGraph: {
    title: "Contact The Shore Academy | Ocean Safety School South Florida",
    description:
      "Questions about ocean safety sessions, the Junior Lifeguard Program, or pricing? Reach us at info@theshoreacademy.com. Serving all of South Florida.",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Shore Academy",
  description:
    "South Florida's only dedicated ocean safety school. Rip current training, wave navigation, and beach safety for children, teens, and adults.",
  url: "https://theshoreacademy.com",
  email: "info@theshoreacademy.com",
  areaServed: [
    { "@type": "City", name: "West Palm Beach", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Boca Raton", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Delray Beach", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Fort Lauderdale", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Miami", containedIn: { "@type": "State", name: "Florida" } },
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "FL",
    addressCountry: "US",
    addressLocality: "West Palm Beach",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.7153,
    longitude: -80.0534,
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero */}
      <section style={{ background: "linear-gradient(165deg, var(--navy), var(--deep-blue))", padding: "140px 24px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--teal)", marginBottom: 16 }}>Reach Out</span>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
            Contact The Shore Academy
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
            Questions about sessions, the Junior Lifeguard Program, or whether your child is ready? We&apos;re happy to help. Email us or book directly online.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div style={{ background: "var(--off-white)", padding: "12px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "var(--text-light)" }}>
          <Link href="/" style={{ color: "var(--ocean)", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span>Contact Us</span>
        </div>
      </div>

      {/* Contact cards + Map */}
      <section style={{ padding: "80px 24px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Contact info cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 64 }} className="contact-cards">
            {[
              {
                icon: "✉️",
                title: "Email Us",
                body: "The fastest way to reach us for general questions, pricing, or to learn if your child is ready.",
                link: "mailto:info@theshoreacademy.com",
                linkText: "info@theshoreacademy.com",
              },
              {
                icon: "📅",
                title: "Book a Session",
                body: "Ready to enroll? Fill out our booking form and our team will call to confirm readiness and lock in your session.",
                link: "/book-a-session",
                linkText: "Book Now →",
              },
              {
                icon: "📍",
                title: "Service Area",
                body: "We operate on Atlantic Ocean beaches across South Florida. The exact beach location is confirmed during your pre-session consultation.",
                link: null,
                linkText: "West Palm Beach · Boca Raton · Delray Beach · Miami · Fort Lauderdale",
              },
            ].map((card) => (
              <div key={card.title} style={{ background: "#fff", borderRadius: "var(--radius)", padding: 32, boxShadow: "var(--shadow)", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 36 }}>{card.icon}</div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", margin: 0 }}>{card.title}</h2>
                <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6, margin: 0 }}>{card.body}</p>
                {card.link ? (
                  <Link href={card.link} style={{ fontSize: 15, fontWeight: 600, color: "var(--ocean)", textDecoration: "none" }}>{card.linkText}</Link>
                ) : (
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ocean)", margin: 0 }}>{card.linkText}</p>
                )}
              </div>
            ))}
          </div>

          {/* Google Maps embed — South Florida service area */}
          <div style={{ borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow-lg)", marginBottom: 48 }}>
            <div style={{ padding: "24px 32px", background: "#fff", borderBottom: "1px solid #eee" }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", margin: "0 0 4px" }}>Our Service Area — South Florida</h2>
              <p style={{ fontSize: 14, color: "var(--text-light)", margin: 0 }}>
                We serve Atlantic Ocean beaches from West Palm Beach to Miami. Session locations are confirmed during your pre-session consultation based on conditions and your nearest beach.
              </p>
            </div>
            <iframe
              title="The Shore Academy South Florida Service Area"
              src="https://maps.google.com/maps?q=Palm+Beach+County+Florida+Beaches&t=&z=10&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="480"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Enquiry Form */}
          <div style={{ marginBottom: 48 }}>
            <EnquiryForm />
          </div>

          {/* CTA */}
          <div style={{ background: "linear-gradient(135deg, var(--navy), var(--deep-blue))", borderRadius: "var(--radius)", padding: "56px 40px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Ready to Learn the Ocean?
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 32px" }}>
              Fill out our enrollment form and a member of our team will call to confirm readiness, discuss your child&apos;s swimming level, and lock in your session.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book-a-session" style={{ display: "inline-block", background: "var(--coral)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 50, textDecoration: "none" }}>
                Book a Session →
              </Link>
              <a href="mailto:info@theshoreacademy.com" style={{ display: "inline-block", background: "transparent", color: "#fff", fontWeight: 600, fontSize: 16, padding: "14px 32px", borderRadius: 50, textDecoration: "none", border: "2px solid rgba(255,255,255,0.35)" }}>
                Email Us
              </a>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
