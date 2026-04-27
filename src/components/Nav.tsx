"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "/about", sectionId: "about" },
  { label: "Curriculum", href: "/curriculum", sectionId: "curriculum" },
  { label: "Our Team", href: "/team", sectionId: "team" },
  { label: "Pricing", href: "/pricing", sectionId: "pricing" },
  { label: "Locations", href: "/locations", sectionId: "service-areas" },
  { label: "Academy Resources", href: "/academy-resources", sectionId: null },
  { label: "Contact", href: "/contact", sectionId: null },
];

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    const offset = 88;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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

  // On homepage, watch scroll position and update URL to reflect current section
  useEffect(() => {
    const homePaths = new Set(["/", "/home", "/about", "/curriculum", "/team", "/pricing", "/locations"]);
    if (!homePaths.has(pathname)) return;

    const sectionMap: { id: string; route: string }[] = [
      { id: "home", route: "/home" },
      { id: "about", route: "/about" },
      { id: "curriculum", route: "/curriculum" },
      { id: "team", route: "/team" },
      { id: "pricing", route: "/pricing" },
      { id: "service-areas", route: "/locations" },
    ];

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY + 120;
        let current = sectionMap[0];
        for (const section of sectionMap) {
          const el = document.getElementById(section.id);
          if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
            current = section;
          }
        }
        const newUrl = current.route;
        if (window.location.pathname !== newUrl) {
          window.history.replaceState(null, "", newUrl);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, link: typeof navLinks[0]) => {
      e.preventDefault();
      setOpen(false);

      // External pages — hard navigate
      if (!link.sectionId) {
        router.push(link.href);
        return;
      }

      const homePaths = new Set(["/", "/home", "/about", "/curriculum", "/team", "/pricing", "/locations"]);
      const isHomePage = homePaths.has(pathname);

      if (isHomePage) {
        window.history.replaceState(null, "", link.href);
        scrollToSection(link.sectionId);
      } else {
        // Navigate to the section URL — middleware rewrites it to homepage, then initial scroll fires
        router.push(link.href);
      }
    },
    [pathname, router]
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(false);
      const homePaths = new Set(["/", "/home", "/about", "/curriculum", "/team", "/pricing", "/locations"]);
      const isHomePage = homePaths.has(pathname);

      if (isHomePage) {
        window.history.replaceState(null, "", "/home");
        scrollToSection("home");
      } else {
        router.push("/home");
      }
    },
    [pathname, router]
  );

  // On initial load, scroll to the section matching the current pathname
  // (middleware rewrites /about → / etc. so browser URL stays as /about)
  useEffect(() => {
    const pathToSection: Record<string, string> = {
      "/about": "about",
      "/curriculum": "curriculum",
      "/team": "team",
      "/pricing": "pricing",
      "/locations": "service-areas",
    };
    const sectionId = pathToSection[window.location.pathname];
    if (sectionId) {
      const timeout = setTimeout(() => scrollToSection(sectionId), 150);
      return () => clearTimeout(timeout);
    }
    // If landing on /home or /, scroll to top and set URL to /home
    if (window.location.pathname === "/" || window.location.pathname === "/home") {
      window.history.replaceState(null, "", "/home");
    }
  }, []);

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
        <a href="/home" onClick={handleLogoClick} aria-label="The Shore Academy - Ocean Safety School">
          <Image
            src="/logo-new.png"
            alt="The Shore Academy logo, ocean safety school South Florida"
            width={180}
            height={72}
            style={{ maxHeight: "64px", width: "auto", transition: "max-height 0.3s ease", display: "block" }}
            priority
          />
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="nav-desktop">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              style={{ color: "#123A5A", fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "8px 12px", borderRadius: 8, transition: "color 0.2s, background 0.2s", letterSpacing: "0.2px", fontFamily: "'Raleway', sans-serif", cursor: "pointer" }}
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
            </a>
          ))}
          <a
            href="/book-a-session"
            onClick={(e) => { e.preventDefault(); setOpen(false); router.push("/book-a-session"); }}
            style={{ marginLeft: 8, background: "#E85A2E", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 8, textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap", fontFamily: "'Raleway', sans-serif", cursor: "pointer" }}
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
          </a>
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
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              style={{ display: "flex", alignItems: "center", color: "#123A5A", fontSize: 16, fontWeight: 600, textDecoration: "none", padding: "13px 0", borderBottom: "1px solid rgba(18,58,90,0.08)", minHeight: 44, fontFamily: "'Raleway', sans-serif", cursor: "pointer" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/book-a-session"
            onClick={(e) => { e.preventDefault(); setOpen(false); router.push("/book-a-session"); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 16, background: "#E85A2E", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 24px", borderRadius: 8, textDecoration: "none", minHeight: 52, fontFamily: "'Raleway', sans-serif", cursor: "pointer" }}
          >
            Book a Session
          </a>
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
