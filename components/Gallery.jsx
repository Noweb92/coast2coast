"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowRight } from "lucide-react";
import { C } from "@/lib/theme";
import { projects } from "@/lib/site.config";
import { images } from "@/lib/images";
import { Fade, GoldLine, SectionLabel, SmartImage } from "@/components/ui/primitives";

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowLeft" && selected > 0) setSelected(selected - 1);
      if (e.key === "ArrowRight" && selected < projects.length - 1) setSelected(selected + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="work" style={{ padding: "110px 28px", background: C.warmLight }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Fade>
          <GoldLine dark={false} /><SectionLabel dark={false}>PORTFOLIO</SectionLabel>
          <h2 style={{ color: C.textDark, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-2px", margin: "12px 0 12px" }}>Recent projects.</h2>
          <p style={{ color: C.textDarkMuted, fontSize: 15, margin: "0 0 56px" }}>Click any project for details.</p>
        </Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
          {projects.map((p, i) => (
            <Fade key={i} delay={i * 0.07}>
              <button
                onClick={() => setSelected(i)}
                aria-label={`View project: ${p.title}, ${p.loc}`}
                style={{ all: "unset", display: "block", width: "100%", borderRadius: 12, overflow: "hidden", position: "relative", cursor: "pointer", height: 220, transition: "all 0.4s ease", boxSizing: "border-box" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(30,30,36,0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <SmartImage image={images[p.image]} style={{ position: "absolute", inset: 0 }} overlay overlayStrength={0.35}>
                  <span style={{ position: "absolute", top: 14, right: 14, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", color: C.textWhite, padding: "4px 14px", borderRadius: 100, fontSize: 10, fontWeight: 600, zIndex: 2 }}>{p.tag}</span>
                  <span style={{ position: "absolute", top: 14, left: 14, width: 36, height: 36, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                    <ZoomIn size={16} color="rgba(255,255,255,0.85)" />
                  </span>
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 22, zIndex: 2 }}>
                    <h3 style={{ color: C.textWhite, fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>{p.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, margin: 0 }}>{p.loc}, WA</p>
                  </div>
                </SmartImage>
              </button>
            </Fade>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div role="dialog" aria-modal="true" aria-label={projects[selected].title} style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 28, animation: "fadeIn 0.3s ease" }} onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: C.darkCard, borderRadius: 16, maxWidth: 640, width: "100%", overflow: "hidden", border: `1px solid ${C.border}`, animation: "scaleIn 0.3s ease" }}>
            <div style={{ position: "relative", height: 280 }}>
              <SmartImage image={images[projects[selected].image]} style={{ position: "absolute", inset: 0 }} />
              <button onClick={() => setSelected(null)} aria-label="Close" style={{ position: "absolute", top: 14, right: 14, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", zIndex: 3 }}>
                <X size={18} color="white" />
              </button>
              {selected > 0 && (
                <button onClick={(e) => { e.stopPropagation(); setSelected(selected - 1); }} aria-label="Previous project" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", zIndex: 3 }}>
                  <ChevronLeft size={18} color="white" />
                </button>
              )}
              {selected < projects.length - 1 && (
                <button onClick={(e) => { e.stopPropagation(); setSelected(selected + 1); }} aria-label="Next project" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", zIndex: 3 }}>
                  <ChevronRight size={18} color="white" />
                </button>
              )}
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ background: C.goldMuted, border: `1px solid ${C.goldBorder}`, color: C.gold, padding: "4px 14px", borderRadius: 100, fontSize: 11, fontWeight: 600 }}>{projects[selected].tag}</span>
                <span style={{ color: C.textDim, fontSize: 12 }}>{projects[selected].loc}, WA</span>
              </div>
              <h3 style={{ color: C.textWhite, fontSize: 22, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.5px" }}>{projects[selected].title}</h3>
              <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.8, margin: "0 0 20px" }}>{projects[selected].desc}</p>
              <a href="#contact" onClick={() => setSelected(null)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.gold, color: C.dark, padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontWeight: 700, fontSize: 13, letterSpacing: "0.5px", transition: "all 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.goldLight)}
                onMouseLeave={(e) => (e.currentTarget.style.background = C.gold)}>
                GET A SIMILAR QUOTE <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
