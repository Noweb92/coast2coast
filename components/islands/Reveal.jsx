"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal — scroll-reveal wrapper island.
 *
 * Children stay server-rendered; this wrapper only adds behaviour. It renders
 * with the global `reveal` class (opacity 0 / translateY(28px), defined in
 * app/globals.css) and adds `is-revealed` once the element intersects
 * (IntersectionObserver, fires once, threshold 0.12).
 *
 * Reduced motion: the `.reveal` CSS itself is neutralised by the global
 * `prefers-reduced-motion` rule (content visible from first paint, no JS
 * needed), and the effect short-circuits to the revealed state so no
 * observer work happens either.
 *
 * `delay` is in seconds (matches the legacy Fade API) and is only inlined
 * when > 0 — the lone truly dynamic style.
 */
export default function Reveal({ as = "div", delay = 0, className = "", children }) {
  const Tag = as;
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const cls = ["reveal", revealed && "is-revealed", className].filter(Boolean).join(" ");

  return (
    <Tag
      ref={ref}
      className={cls}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

export { Reveal };
