import Link from "next/link";
import Image from "next/image";

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Footer() {
  return (
    <>
      {/* Mission banner immediately above footer */}
      <div style={{ backgroundColor: "#E85A2E", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 15, letterSpacing: "1px", fontFamily: "'Raleway', sans-serif" }}>
          Educate. &nbsp;|&nbsp; Prepare. &nbsp;|&nbsp; Empower. &nbsp;|&nbsp; Confidence in the Water. &nbsp;|&nbsp; For Life.
        </p>
      </div>

      <footer style={{ background: "#123A5A", padding: "60px 24px 30px", borderTop: "1px solid rgba(255,255,255,0.08)" }} role="contentinfo">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, maxWidth: 1200, margin: "0 auto" }} className="footer-grid">
          <div>
            <div style={{ marginBottom: 16 }}>
              <Image
                src="/logo-new.png"
                alt="The Shore Academy logo, ocean safety school South Florida"
                width={180}
                height={96}
                style={{ maxHeight: "96px", width: "auto" }}
              />
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 280, fontFamily: "'Raleway', sans-serif" }}>
              South Florida&apos;s only dedicated ocean safety and navigation school. 50+ years combined open water experience. Strict 2:1 student-to-instructor ratio. Every team member is a certified ocean lifeguard.
            </p>
            <address style={{ fontStyle: "normal", marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.8, fontFamily: "'Raleway', sans-serif" }}>
              The Shore Academy<br />
              West Palm Beach, FL<br />
              Serving: West Palm Beach &bull; Boca Raton &bull; Delray Beach &bull; Miami &bull; Fort Lauderdale<br />
              <a href="mailto:info@theshoreacademy.com" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }} className="hover-footer-link">info@theshoreacademy.com</a>
            </address>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontFamily: "'Raleway', sans-serif" }}>Programs</h4>
            {[
              { label: "Ocean Safety Curriculum", href: "/#curriculum" },
              { label: "Pricing & Sessions", href: "/#pricing" },
              { label: "Junior Lifeguard Program", href: "/#jlp" },
              { label: "Prerequisites", href: "/#prereqs" },
              { label: "FAQ", href: "/#faq" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="hover-footer-link" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", padding: "4px 0", fontFamily: "'Raleway', sans-serif" }}>{l.label}</Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontFamily: "'Raleway', sans-serif" }}>Company</h4>
            {[
              { label: "About Us", href: "/#about" },
              { label: "Our Team", href: "/#team" },
              { label: "Gallery", href: "/#gallery" },
              { label: "Reviews", href: "/#testimonials" },
              { label: "Academy Resources", href: "/academy-resources" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="hover-footer-link" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", padding: "4px 0", fontFamily: "'Raleway', sans-serif" }}>{l.label}</Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontFamily: "'Raleway', sans-serif" }}>Connect</h4>
            <a
              href="https://www.linkedin.com/company/the-shore-academy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Shore Academy on LinkedIn"
              className="hover-footer-link"
              style={{ display: "inline-flex", alignItems: "center", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: 12 }}
            >
              <LinkedInIcon />
            </a>
            <div>
              <a href="mailto:info@theshoreacademy.com" className="hover-footer-link" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", fontFamily: "'Raleway', sans-serif" }}>info@theshoreacademy.com</a>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "40px auto 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Raleway', sans-serif" }}>&copy; 2026 The Shore Academy LLC. All rights reserved. &bull; Ocean Safety School &bull; South Florida</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Raleway', sans-serif" }}>theshoreacademy.com &bull; Junior Lifeguard Program Florida &bull; West Palm Beach &bull; Miami &bull; Fort Lauderdale</p>
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
    </>
  );
}
