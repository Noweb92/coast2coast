"use client";

import { C } from "@/lib/theme";
import { trustBadges } from "@/lib/site.config";
import { Fade, Icon } from "@/components/ui/primitives";

export default function TrustBadges() {
  return (
    <section aria-label="Why choose us" style={{ padding: "60px 28px", background: C.darkSoft, position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.goldDark}40, transparent)` }} />
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {trustBadges.map((b, i) => (
            <Fade key={i} delay={i * 0.06}>
              <div style={{ textAlign: "center", padding: "24px 16px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.darkCard, transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ color: C.gold, marginBottom: 10, display: "flex", justifyContent: "center" }}><Icon name={b.icon} size={28} /></div>
                <div style={{ color: C.textWhite, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{b.title}</div>
                <div style={{ color: C.textDim, fontSize: 11, lineHeight: 1.4 }}>{b.desc}</div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
