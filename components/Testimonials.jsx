"use client";

import { Star } from "lucide-react";
import { C } from "@/lib/theme";
import { testimonials } from "@/lib/site.config";
import { Fade, GoldLine, SectionLabel } from "@/components/ui/primitives";

export default function Testimonials() {
  return (
    <section style={{ padding: "110px 28px", background: C.darkSoft, position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.goldDark}40, transparent)` }} />
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "flex", justifyContent: "center" }}><GoldLine width={40} /></div>
            <SectionLabel>TESTIMONIALS</SectionLabel>
            <h2 style={{ color: C.textWhite, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-2px", margin: "12px 0 0" }}>Earned trust.</h2>
          </div>
        </Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))", gap: 14 }}>
          {testimonials.map((t, i) => (
            <Fade key={i} delay={i * 0.1}>
              <figure style={{ margin: 0, padding: 26, borderRadius: 12, border: `1px solid ${C.border}`, background: C.darkCard, transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div aria-label={`${t.rating} out of 5 stars`} style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, si) => <Star key={si} size={13} fill={C.gold} color={C.gold} />)}
                </div>
                <blockquote style={{ margin: 0 }}>
                  <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.8, margin: "0 0 20px", fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p>
                </blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", border: `1.5px solid ${C.goldDark}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, fontWeight: 700, fontSize: 13 }}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={{ color: C.textWhite, fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                    <div style={{ color: C.textDim, fontSize: 11 }}>{t.location}, WA</div>
                  </div>
                </figcaption>
              </figure>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
