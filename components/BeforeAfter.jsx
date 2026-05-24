"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { C } from "@/lib/theme";
import { images } from "@/lib/images";
import { Fade, GoldLine, SectionLabel, SmartImage } from "@/components/ui/primitives";

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const p = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  }, []);

  useEffect(() => {
    const onMove = (e) => { if (dragging.current) handleMove(e.touches ? e.touches[0].clientX : e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [handleMove]);

  const onKey = (e) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(5, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(95, p + 4));
  };

  return (
    <section style={{ padding: "110px 28px", background: C.warmLight }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "center" }}><GoldLine width={40} dark={false} /></div>
            <SectionLabel dark={false}>RESULTS</SectionLabel>
            <h2 style={{ color: C.textDark, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-2px", margin: "12px 0 10px" }}>See the difference.</h2>
            <p style={{ color: C.textDarkMuted, fontSize: 15 }}>Drag the slider to compare before and after.</p>
          </div>
        </Fade>
        <Fade delay={0.15}>
          <div
            ref={containerRef}
            role="slider"
            aria-label="Before and after comparison"
            aria-valuemin={5}
            aria-valuemax={95}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onKeyDown={onKey}
            style={{ position: "relative", width: "100%", height: "clamp(280px, 45vw, 460px)", borderRadius: 14, overflow: "hidden", cursor: "col-resize", userSelect: "none", border: `1px solid ${C.borderLight}` }}
            onMouseDown={(e) => { dragging.current = true; handleMove(e.clientX); }}
            onTouchStart={(e) => { dragging.current = true; handleMove(e.touches[0].clientX); }}
          >
            {/* After (full width) */}
            <SmartImage image={images.beforeAfterAfter} style={{ position: "absolute", inset: 0 }}>
              <span style={{ position: "absolute", bottom: 16, right: 16, background: "rgba(34,197,94,0.85)", color: "#fff", padding: "5px 14px", borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: "0.5px" }}>AFTER</span>
            </SmartImage>
            {/* Before (clipped) */}
            <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <SmartImage image={images.beforeAfterBefore} style={{ position: "absolute", inset: 0 }} overlay overlayStrength={0.2}>
                <span style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(0,0,0,0.6)", color: "#fff", padding: "5px 14px", borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: "0.5px" }}>BEFORE</span>
              </SmartImage>
            </div>
            {/* Slider handle */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, transform: "translateX(-50%)", width: 3, background: C.gold, zIndex: 10 }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 44, height: 44, background: C.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 2, color: C.dark }}>
                  <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} />
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </div>
          <p style={{ textAlign: "center", color: C.textDim, fontSize: 12, marginTop: 14, fontStyle: "italic" }}>Swap these with your own before/after job photos in <code>lib/images.js</code>.</p>
        </Fade>
      </div>
    </section>
  );
}
