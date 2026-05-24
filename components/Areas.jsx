"use client";

import { C } from "@/lib/theme";
import { areas } from "@/lib/site.config";
import { Fade, GoldLine, SectionLabel } from "@/components/ui/primitives";

export default function Areas() {
  return (
    <section id="areas" style={{ padding: "110px 28px", background: C.darkSoft, position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.goldDark}40, transparent)` }} />
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ display: "flex", justifyContent: "center" }}><GoldLine width={40} /></div>
            <SectionLabel>COVERAGE</SectionLabel>
            <h2 style={{ color: C.textWhite, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-2px", margin: "12px 0 10px" }}>All of WA.</h2>
            <p style={{ color: C.textDim, fontSize: 15, maxWidth: 400, margin: "0 auto" }}>Coast to coast, north to south.</p>
          </div>
        </Fade>
        <Fade delay={0.15}>
          <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
            {areas.map((a, i) => (
              <li key={i} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 100, padding: "10px 22px", fontSize: 13, fontWeight: 500, color: C.textMuted, transition: "all 0.3s ease", cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; e.currentTarget.style.background = C.goldMuted; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; e.currentTarget.style.background = "transparent"; }}>
                {a}
              </li>
            ))}
          </ul>
        </Fade>
        <Fade delay={0.25}>
          <p style={{ textAlign: "center", color: C.textDim, fontSize: 13, marginTop: 24 }}>
            Don&apos;t see your area? <a href="#contact" style={{ color: C.gold, fontWeight: 600, textDecoration: "none" }}>Get in touch</a> — we likely cover it.
          </p>
        </Fade>
      </div>
    </section>
  );
}
