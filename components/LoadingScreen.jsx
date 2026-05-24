"use client";

import { useState, useEffect } from "react";
import { Home } from "lucide-react";
import { C } from "@/lib/theme";

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setHide(true), 300);
          setTimeout(onDone, 800);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: C.dark, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: hide ? 0 : 1, transition: "opacity 0.5s ease", pointerEvents: hide ? "none" : "all" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
        <div style={{ width: 44, height: 44, border: `1.5px solid ${C.goldDark}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 1.5s ease infinite" }}>
          <Home size={20} color={C.gold} />
        </div>
        <div>
          <div style={{ color: C.textWhite, fontWeight: 700, fontSize: 18, letterSpacing: "3px" }}>COAST<span style={{ color: C.gold }}>2</span>COAST</div>
          <div style={{ color: C.textDim, fontSize: 9, letterSpacing: "3px" }}>ROOFING WA</div>
        </div>
      </div>
      <div style={{ width: 200, height: 2, background: C.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, width: `${progress}%`, transition: "width 0.1s ease", borderRadius: 2 }} />
      </div>
      <div style={{ color: C.textDim, fontSize: 11, marginTop: 14, letterSpacing: "2px" }}>{progress}%</div>
    </div>
  );
}
