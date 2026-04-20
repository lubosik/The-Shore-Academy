import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)", padding: "60px 24px 30px", borderTop: "1px solid rgba(255,255,255,0.05)" }} role="contentinfo">
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, maxWidth: 1200, margin: "0 auto" }} className="footer-grid">
        <div>
          <div style={{ marginBottom: 16 }}>
            <Image src="/logo.png" alt="The Shore Academy logo" width={180} height={72} style={{ height: 64, width: "auto", mixBlendMode: "screen" }} />
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, maxWidth: 280 }}>
            South Florida&apos;s only dedicated ocean safety and navigation school. 50+ years combined open water experience. Strict 2:1 student-to-instructor ratio. Every team member is a certified ocean lifeguard.
          </p>
          <address style={{ fontStyle: "normal", marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
            The Shore Academy<br />
            West Palm Beach, FL<br />
            Serving: West Palm Beach &bull; Boca Raton &bull; Delray Beach &bull; Miami &bull; Fort Lauderdale<br />
            <a href="mailto:info@theshoreacademy.com" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }} className="hover-footer-link">info@theshoreacademy.com</a>
          </address>
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Programs</h4>
          {[
            { label: "Ocean Safety Curriculum", href: "/#curriculum" },
            { label: "Pricing & Sessions", href: "/#pricing" },
            { label: "Junior Lifeguard Program", href: "/#jlp" },
            { label: "Prerequisites", href: "/#prereqs" },
            { label: "FAQ", href: "/#faq" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="hover-footer-link" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", padding: "4px 0" }}>{l.label}</Link>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Company</h4>
          {[
            { label: "About Us", href: "/#about" },
            { label: "Our Team", href: "/#team" },
            { label: "Gallery", href: "/#gallery" },
            { label: "Reviews", href: "/#testimonials" },
            { label: "Academy Resources", href: "/academy-resources" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="hover-footer-link" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", padding: "4px 0" }}>{l.label}</Link>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Connect</h4>
          {[
            { label: "Instagram", href: "https://www.instagram.com/theshoreacademy", external: true },
            { label: "TikTok", href: "https://www.tiktok.com/@theshoreacademy", external: true },
            { label: "YouTube", href: "https://www.youtube.com/@theshoreacademy", external: true },
            { label: "Email Us", href: "mailto:info@theshoreacademy.com", external: false },
            { label: "Google Business Profile", href: "https://g.page/theshoreacademy", external: true },
          ].map((l) => (
            <a key={l.href} href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined}
              className="hover-footer-link"
              style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", padding: "4px 0" }}
            >{l.label}</a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "40px auto 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>&copy; 2026 The Shore Academy LLC. All rights reserved. &bull; Ocean Safety School &bull; South Florida</p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>theshoreacademy.com &bull; Junior Lifeguard Program Florida &bull; West Palm Beach &bull; Miami &bull; Fort Lauderdale</p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </footer>
  );
}
