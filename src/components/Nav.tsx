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
        background: scrolled ? "rgb(10,22,40)" : "transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 64 : 80, transition: "height 0.3s ease" }}>
        <Link href="/" aria-label="The Shore Academy - Ocean Safety School" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="The Shore Academy" width={180} height={72} style={{ height: scrolled ? 52 : 68, width: "auto", transition: "height 0.3s ease", display: "block" }} priority />
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 500, textDecoration: "none", padding: "8px 12px", borderRadius: 8, transition: "color 0.2s, background 0.2s", letterSpacing: "0.2px" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#0fa3b1";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book-a-session"
            style={{ marginLeft: 8, background: "var(--coral)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 50, textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--coral-dark)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--coral)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
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
          <span style={{ display: "block", width: 22, height: 2, background: "#fff", transition: "all 0.25s", transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#fff", transition: "all 0.25s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#fff", transition: "all 0.25s", transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(10,22,40,0.98)", backdropFilter: "blur(20px)", padding: "16px 24px 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.85)", fontSize: 16, fontWeight: 500, textDecoration: "none", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 44 }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book-a-session"
            onClick={() => setOpen(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 16, background: "var(--coral)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 24px", borderRadius: 50, textDecoration: "none", minHeight: 52 }}
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
