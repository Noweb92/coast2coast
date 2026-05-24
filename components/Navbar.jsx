"use client";

import { useState, useEffect } from "react";
import { Home, Menu, X, Phone } from "lucide-react";
import { C } from "@/lib/theme";
import { navLinks, business } from "@/lib/site.config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav aria-label="Primary" style={{ position: "fixed", top: 3, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(30,30,36,0.97)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", transition: "all 0.4s ease", padding: scrolled ? "12px 0" : "22px 0" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="#hero" aria-label="Coast2Coast Roofing home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, border: `1.5px solid ${C.goldDark}`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Home size={17} color={C.gold} />
          </div>
          <div>
            <div style={{ color: C.textWhite, fontWeight: 700, fontSize: 15, letterSpacing: "2.5px" }}>COAST<span style={{ color: C.gold }}>2</span>COAST</div>
            <div style={{ color: C.textDim, fontSize: 8, letterSpacing: "3px" }}>ROOFING WA</div>
          </div>
        </a>

        <div className="nav-desk" style={{ gap: 28, alignItems: "center" }}>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} style={{ color: C.textMuted, textDecoration: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.3px", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target.style.color = C.gold)}
              onMouseLeave={(e) => (e.target.style.color = C.textMuted)}>
              {l.label}
            </a>
          ))}
          <a href={`tel:${business.phoneE164}`} style={{ color: C.textLight, textDecoration: "none", fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 7 }}>
            <Phone size={14} color={C.gold} /> {business.phoneDisplay}
          </a>
          <a href="#contact" style={{ background: "transparent", border: `1.5px solid ${C.gold}`, color: C.gold, padding: "9px 24px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: 12, letterSpacing: "1px", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.target.style.background = C.gold; e.target.style.color = C.dark; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = C.gold; }}>
            GET QUOTE
          </a>
        </div>

        <button className="nav-mob-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: C.textWhite, cursor: "pointer", lineHeight: 0 }}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="nav-mob-menu" style={{ background: C.darkDeep, padding: "20px 28px", borderTop: `1px solid ${C.border}` }}>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", color: C.textMuted, textDecoration: "none", fontSize: 15, fontWeight: 500, padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
              {l.label}
            </a>
          ))}
          <a href={`tel:${business.phoneE164}`} onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8, color: C.textLight, textDecoration: "none", fontSize: 15, fontWeight: 600, padding: "14px 0" }}>
            <Phone size={16} color={C.gold} /> {business.phoneDisplay}
          </a>
          <a href="#contact" onClick={() => setOpen(false)} style={{ display: "block", background: C.gold, color: C.dark, padding: "14px", borderRadius: 6, textDecoration: "none", fontWeight: 700, fontSize: 14, textAlign: "center", marginTop: 6, letterSpacing: "1px" }}>
            GET FREE QUOTE
          </a>
        </div>
      )}
    </nav>
  );
}
