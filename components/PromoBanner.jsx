"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { C } from "@/lib/theme";
import { business } from "@/lib/site.config";

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div role="region" aria-label="Seasonal announcement" style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, padding: "10px 44px 10px 28px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, position: "relative", zIndex: 999 }}>
      <AlertTriangle size={15} color={C.dark} aria-hidden="true" />
      <p style={{ color: C.dark, fontSize: 13, fontWeight: 600, margin: 0, textAlign: "center" }}>
        Storm season is here — <span style={{ fontWeight: 800 }}>24/7 emergency roof repairs</span> across all WA.
        <a href={`tel:${business.emergencyPhoneE164}`} style={{ color: C.dark, marginLeft: 6, textDecoration: "underline", fontWeight: 700 }}>Call now</a>
      </p>
      <button onClick={() => setVisible(false)} aria-label="Dismiss announcement" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.dark, opacity: 0.6, padding: 4, lineHeight: 0 }}>
        <X size={16} />
      </button>
    </div>
  );
}
