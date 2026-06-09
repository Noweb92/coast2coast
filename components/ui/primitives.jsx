"use client";

/**
 * Shared UI primitives, hooks and helpers used across every section.
 * Keeping these in one place keeps section components lean and consistent.
 */

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Wrench, Droplets, Home, Sparkles, Shield, Calculator, Award,
  BadgeCheck, FileCheck, Users, Star, Clock,
} from "lucide-react";
import { C, ease } from "@/lib/theme";

/* ── Icon registry: lets data files reference icons by name (string) ── */
const ICONS = { Wrench, Droplets, Home, Sparkles, Shield, Calculator, Award, BadgeCheck, FileCheck, Users, Star, Clock };

export function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || Home;
  return <Cmp {...props} />;
}

/* ── Reveal-on-scroll hook (IntersectionObserver, fires once) ── */
export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(e.target); } },
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ── Animated count-up hook ── */
export function useCounter(end, duration = 2000, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let raf;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return val;
}

/* ── Fade-in wrapper ── */
export function Fade({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ${ease} ${delay}s, transform 0.8s ${ease} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Decorative gold underline ── */
export function GoldLine({ width = 50, dark = true }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width,
        height: 2,
        background: `linear-gradient(90deg, ${C.gold}, ${dark ? C.goldDark : C.goldDeep})`,
        borderRadius: 2,
      }}
    />
  );
}

/* ── Small uppercase section label ── */
export function SectionLabel({ children, dark = true }) {
  return (
    <p style={{ color: dark ? C.gold : C.goldDeep, fontSize: 12, fontWeight: 600, letterSpacing: "4px", marginTop: 16, marginBottom: 0 }}>
      {children}
    </p>
  );
}

/**
 * SmartImage — resilient image with graceful brand fallback.
 *
 * Wraps next/image (responsive srcset, automatic AVIF/WebP, lazy by default)
 * for real bandwidth savings on mobile. If the photo fails to load (404,
 * network, blocked CDN), it swaps to a branded gradient so the layout always
 * looks intentional. Use `overlay` to darken photos for text. `priority`
 * eager-loads above-the-fold images (the hero); `sizes` tells the browser how
 * wide the image renders so it can pick the smallest sufficient source.
 */
export function SmartImage({
  image,
  style = {},
  imgStyle = {},
  overlay = false,
  overlayStrength = 0.45,
  priority = false,
  sizes = "100vw",
  children,
}) {
  const [failed, setFailed] = useState(false);
  const fallback = image?.fallback || C.darkSoft;

  return (
    <div style={{ position: "relative", overflow: "hidden", background: fallback, ...style }}>
      {!failed && image?.src && (
        <Image
          src={image.src}
          alt={image.alt || ""}
          fill
          sizes={sizes}
          priority={priority}
          quality={72}
          onError={() => setFailed(true)}
          style={{ objectFit: "cover", ...imgStyle }}
        />
      )}
      {failed && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${fallback}, ${C.dark})`,
            opacity: 0.95,
          }}
        />
      )}
      {overlay && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, rgba(22,22,25,${overlayStrength + 0.25}), rgba(22,22,25,${overlayStrength}))`,
          }}
        />
      )}
      {children}
    </div>
  );
}
