"use client";

import { C } from "@/lib/theme";
import { processSteps } from "@/lib/site.config";
import { Fade, GoldLine, SectionLabel, Icon } from "@/components/ui/primitives";

export default function Process() {
  return (
    <section id="process" style={{ padding: "110px 28px", background: C.darkSoft, position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.goldDark}40, transparent)` }} />
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "flex", justifyContent: "center" }}><GoldLine width={40} /></div>
            <SectionLabel>HOW IT WORKS</SectionLabel>
            <h2 style={{ color: C.textWhite, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-2px", margin: "12px 0 0" }}>Four steps. Zero stress.</h2>
          </div>
        </Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 0, position: "relative" }}>
          {processSteps.map((s, i) => (
            <Fade key={i} delay={i * 0.15}>
              <div style={{ padding: "32px 28px", position: "relative", borderLeft: i > 0 ? `1px solid ${C.border}` : "none" }}>
                <div aria-hidden="true" style={{ position: "absolute", top: 32, left: i > 0 ? -7 : "auto", width: 14, height: 14, borderRadius: "50%", background: C.gold, display: i > 0 ? "block" : "none", boxShadow: `0 0 0 4px ${C.darkSoft}` }} />
                <div style={{ color: C.gold, fontSize: 36, fontWeight: 800, opacity: 0.2, marginBottom: 12, letterSpacing: "-2px" }}>{s.num}</div>
                <div style={{ color: C.gold, marginBottom: 14 }}><Icon name={s.icon} size={22} /></div>
                <h3 style={{ color: C.textWhite, fontSize: 17, fontWeight: 700, margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ color: C.textDim, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
