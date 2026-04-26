"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Curriculum", href: "/#curriculum" },
  { label: "Our Team", href: "/#team" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Locations", href: "/#service-areas" },
  { label: "Academy Resources", href: "/academy-resources" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease",
        background: "#FFFFFF",
        borderBottom: "2px solid #123A5A",
        boxShadow: scrolled ? "0 2px 20px rgba(18,58,90,0.15)" : "0 1px 4px rgba(18,58,90,0.06)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 64 : 80, transition: "height 0.3s ease" }}>
        <Link href="/" aria-label="The Shore Academy - Ocean Safety School" onClick={() => setOpen(false)}>
          <Image
            src="/logo-new.png"
            alt="The Shore Academy logo — ocean safety school South Florida"
            width={180}
            height={72}
            style={{ maxHeight: "64px", width: "auto", transition: "max-height 0.3s ease", display: "block" }}
            priority
          />
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: "#123A5A", fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "8px 12px", borderRadius: 8, transition: "color 0.2s, background 0.2s", letterSpacing: "0.2px", fontFamily: "'Raleway', sans-serif" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#E85A2E";
                (e.currentTarget as HTMLElement).style.background = "rgba(18,58,90,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#123A5A";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book-a-session"
            style={{ marginLeft: 8, background: "#E85A2E", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 8, textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap", fontFamily: "'Raleway', sans-serif" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#c94420";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#E85A2E";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}
          >
            Book a Session
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="nav-mobile-toggle"
          style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8, minWidth: 44, minHeight: 44, justifyContent: "center", alignItems: "center" }}
        >
          <span style={{ display: "block", width: 22, height: 2, background: "#123A5A", transition: "all 0.25s", transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#123A5A", transition: "all 0.25s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#123A5A", transition: "all 0.25s", transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#FFFFFF", backdropFilter: "blur(20px)", padding: "16px 24px 28px", borderTop: "1px solid rgba(18,58,90,0.1)", boxShadow: "0 8px 24px rgba(18,58,90,0.12)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ display: "flex", alignItems: "center", color: "#123A5A", fontSize: 16, fontWeight: 600, textDecoration: "none", padding: "13px 0", borderBottom: "1px solid rgba(18,58,90,0.08)", minHeight: 44, fontFamily: "'Raleway', sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book-a-session"
            onClick={() => setOpen(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 16, background: "#E85A2E", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 24px", borderRadius: 8, textDecoration: "none", minHeight: 52, fontFamily: "'Raleway', sans-serif" }}
          >
            Book a Session
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
