"use client";

import { useState, useEffect } from "react";
import { C } from "@/lib/theme";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      setPct(max > 0 ? Math.round((d.scrollTop / max) * 100) : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, zIndex: 1001, height: 3, background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, width: `${pct}%`, transition: "width 0.05s linear" }} />
  );
}
