"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { C } from "@/lib/theme";
import { faqs } from "@/lib/site.config";
import { Fade, GoldLine, SectionLabel } from "@/components/ui/primitives";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section id="faq" style={{ padding: "110px 28px", background: C.warm }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "center" }}><GoldLine width={40} dark={false} /></div>
            <SectionLabel dark={false}>FAQ</SectionLabel>
            <h2 style={{ color: C.textDark, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-2px", margin: "12px 0 0" }}>Questions? Answered.</h2>
          </div>
        </Fade>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <Fade key={i} delay={i * 0.06}>
                <div style={{ background: C.white, borderRadius: 10, border: `1px solid ${isOpen ? C.goldBorder : C.borderLight}`, overflow: "hidden", transition: "border-color 0.3s" }}>
                  <button onClick={() => setOpenIdx(isOpen ? null : i)} aria-expanded={isOpen} style={{ width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "inherit", textAlign: "left" }}>
                    <span style={{ color: C.textDark, fontSize: 15, fontWeight: 600, paddingRight: 16 }}>{f.q}</span>
                    <ChevronDown size={18} color={isOpen ? C.gold : C.textDim} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0 }} />
                  </button>
                  <div style={{ maxHeight: isOpen ? 320 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                    <p style={{ padding: "0 22px 18px", color: C.textDarkMuted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
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
