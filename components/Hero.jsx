"use client";

import { Clock, ArrowRight, Phone } from "lucide-react";
import { C } from "@/lib/theme";
import { business } from "@/lib/site.config";
import { images } from "@/lib/images";
import { Fade, GoldLine, SectionLabel, SmartImage, useInView, useCounter } from "@/components/ui/primitives";

export default function Hero() {
  const [ref, vis] = useInView(0.1);
  const c1 = useCounter(business.stats.roofsCompleted, 2000, vis);
  const c2 = useCounter(business.stats.yearsExperience, 1500, vis);
  const c3 = useCounter(business.stats.satisfactionRate, 1800, vis);

  const stats = [
    [c1, "+", "Roofs completed"],
    [c2, "+", "Years experience"],
    [c3, "%", "Satisfaction rate"],
    ["24/7", "", "Emergency service"],
  ];

  return (
    <section id="hero" ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: C.dark, position: "relative", overflow: "hidden", padding: "140px 28px 100px" }}>
      {/* Photographic backdrop with darkening overlay for contrast */}
      <SmartImage image={images.hero} priority overlay overlayStrength={0.55} style={{ position: "absolute", inset: 0 }} imgStyle={{ objectPosition: "center" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, rgba(22,22,25,0.92) 0%, rgba(22,22,25,0.78) 45%, rgba(22,22,25,0.35) 100%)` }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "-25%", right: "-10%", width: 650, height: 650, background: "radial-gradient(circle, rgba(251,191,36,0.08), transparent 60%)", borderRadius: "50%" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.goldDark}50, transparent)` }} />

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <Fade><GoldLine /><SectionLabel>{business.tagline.toUpperCase()}</SectionLabel></Fade>
        <Fade delay={0.12}>
          <h1 style={{ color: C.textWhite, fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-3px", margin: "24px 0" }}>
            {"Built to".split("").map((ch, i) => (
              <span key={i} style={{ display: "inline-block", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `all 0.4s ease ${0.3 + i * 0.03}s` }}>{ch === " " ? " " : ch}</span>
            ))}
            <br />
            {"protect.".split("").map((ch, i) => (
              <span key={i} style={{ display: "inline-block", color: C.gold, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `all 0.4s ease ${0.6 + i * 0.04}s` }}>{ch}</span>
            ))}
          </h1>
        </Fade>
        <Fade delay={0.35}>
          <p style={{ color: C.textLight, fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.8, maxWidth: 480, margin: "0 0 40px" }}>
            Roof repairs, cleaning &amp; restoration done with precision. From Perth to the Pilbara — no roof too far, no job too tough.
          </p>
        </Fade>
        <Fade delay={0.45}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#contact" style={{ background: C.gold, color: C.dark, padding: "15px 36px", borderRadius: 6, textDecoration: "none", fontWeight: 700, fontSize: 14, letterSpacing: "0.5px", display: "inline-flex", alignItems: "center", gap: 10, transition: "all 0.3s", boxShadow: "0 4px 20px rgba(251,191,36,0.2)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.goldLight; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(251,191,36,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(251,191,36,0.2)"; }}>
              FREE QUOTE <ArrowRight size={16} />
            </a>
            <a href={`tel:${business.phoneE164}`} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, color: C.textLight, padding: "15px 32px", borderRadius: 6, textDecoration: "none", fontWeight: 500, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 10, transition: "all 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.goldDark; e.currentTarget.style.color = C.textWhite; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textLight; }}>
              <Phone size={16} /> {business.phoneDisplay}
            </a>
          </div>
        </Fade>
        <Fade delay={0.6}>
          <div style={{ display: "flex", gap: "clamp(28px, 5vw, 64px)", marginTop: 72, flexWrap: "wrap" }}>
            {stats.map(([n, s, l], i) => (
              <div key={i}>
                <div style={{ color: C.gold, fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1 }}>{n}{s}</div>
                <div style={{ color: C.textLight, fontSize: 11, fontWeight: 500, marginTop: 6, letterSpacing: "0.5px" }}>{l}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
