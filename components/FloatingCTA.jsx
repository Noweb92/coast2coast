"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, X, MessageCircle } from "lucide-react";
import { C } from "@/lib/theme";
import { business } from "@/lib/site.config";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  if (!show) return null;

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 997, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
      {expanded && (
        <div style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, width: 230, animation: "fadeUp 0.3s ease", boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
          <p style={{ color: C.textWhite, fontSize: 14, fontWeight: 700, margin: "0 0 12px" }}>Need help?</p>
          <a href={`tel:${business.phoneE164}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: C.goldMuted, border: `1px solid ${C.goldBorder}`, borderRadius: 8, textDecoration: "none", marginBottom: 8, transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(251,191,36,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.goldMuted)}>
            <Phone size={16} color={C.gold} />
            <div>
              <div style={{ color: C.textWhite, fontSize: 13, fontWeight: 600 }}>Call us</div>
              <div style={{ color: C.textDim, fontSize: 11 }}>{business.phoneDisplay}</div>
            </div>
          </a>
          <a href="#contact" onClick={() => setExpanded(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: C.goldMuted, border: `1px solid ${C.goldBorder}`, borderRadius: 8, textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(251,191,36,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.goldMuted)}>
            <Mail size={16} color={C.gold} />
            <div>
              <div style={{ color: C.textWhite, fontSize: 13, fontWeight: 600 }}>Free quote</div>
              <div style={{ color: C.textDim, fontSize: 11 }}>Response in 24h</div>
            </div>
          </a>
        </div>
      )}
      <button onClick={() => setExpanded(!expanded)} aria-label={expanded ? "Close contact options" : "Open contact options"} aria-expanded={expanded}
        style={{ width: 56, height: 56, borderRadius: "50%", background: C.gold, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(251,191,36,0.35)", transition: "transform 0.3s", animation: "pulseGold 2s ease infinite" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
        {expanded ? <X size={22} color={C.dark} /> : <MessageCircle size={22} color={C.dark} />}
      </button>
    </div>
  );
}
