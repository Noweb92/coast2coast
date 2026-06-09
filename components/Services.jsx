"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { C } from "@/lib/theme";
import { services } from "@/lib/site.config";
import { images } from "@/lib/images";
import { Fade, GoldLine, SectionLabel, Icon, SmartImage } from "@/components/ui/primitives";

const IMAGE_BY_ID = {
  repairs: images.serviceRepairs,
  cleaning: images.serviceCleaning,
  restoration: images.serviceRestoration,
};

export default function Services() {
  const [active, setActive] = useState(null);

  return (
    <section id="services" style={{ padding: "110px 28px", background: C.warm }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Fade>
          <GoldLine dark={false} /><SectionLabel dark={false}>SERVICES</SectionLabel>
          <h2 style={{ color: C.textDark, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-2px", margin: "12px 0 14px" }}>What we do.</h2>
          <p style={{ color: C.textDarkMuted, fontSize: 15, lineHeight: 1.7, maxWidth: 440, margin: "0 0 56px" }}>Three core services, one standard of excellence.</p>
        </Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))", gap: 16 }}>
          {services.map((s, i) => {
            const isA = active === i;
            return (
              <Fade key={s.id} delay={i * 0.08}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isA}
                  onClick={() => setActive(isA ? null : i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(isA ? null : i); } }}
                  style={{ borderRadius: 14, cursor: "pointer", transition: "all 0.4s ease", background: isA ? C.dark : C.white, border: `1px solid ${isA ? C.goldBorder : C.borderLight}`, transform: isA ? "translateY(-4px)" : "none", boxShadow: isA ? "0 16px 40px rgba(30,30,36,0.12)" : "none", overflow: "hidden" }}
                  onMouseEnter={(e) => { if (!isA) e.currentTarget.style.boxShadow = "0 10px 28px rgba(30,30,36,0.08)"; }}
                  onMouseLeave={(e) => { if (!isA) e.currentTarget.style.boxShadow = "none"; }}
                >
                  <SmartImage image={IMAGE_BY_ID[s.id]} sizes="(max-width: 768px) 100vw, 360px" style={{ height: 150 }} overlay overlayStrength={0.15}>
                    <div style={{ position: "absolute", left: 16, bottom: 12, width: 44, height: 44, borderRadius: 10, background: "rgba(22,22,25,0.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", color: C.gold }}>
                      <Icon name={s.icon} size={22} />
                    </div>
                  </SmartImage>
                  <div style={{ padding: 24 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 8px", color: isA ? C.textWhite : C.textDark, transition: "color 0.3s" }}>{s.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.7, margin: "0 0 16px", color: isA ? C.textMuted : C.textDarkMuted, transition: "color 0.3s" }}>{s.desc}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {s.features.map((f, fi) => (
                        <div key={fi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <CheckCircle size={13} color={isA ? C.gold : C.goldDeep} />
                          <span style={{ fontSize: 12, fontWeight: 500, color: isA ? C.textLight : C.textDarkMuted, transition: "color 0.3s" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
