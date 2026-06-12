"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Tilt — pointer-tracked 3D card tilt (client island — whitelisted).
 *
 * Wraps server-rendered children (the RSC children-prop pattern: content
 * stays in the initial HTML) and tilts the wrapper in real 3D perspective
 * toward the pointer. The luxe signature effect.
 *
 * PERFORMANCE & A11y:
 * - transform-only (compositor), at most one write per frame via rAF;
 *   pointer math is plain refs — zero React state, zero re-renders.
 * - Disabled for touch pointers (tilt fights scrolling) and for
 *   prefers-reduced-motion users.
 * - On leave, eases back to flat with a temporary transition.
 *
 * Props: { max = 6 (deg), className, children }
 */
export default function Tilt({ max = 6, className = "", children }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const target = useRef({ rx: 0, ry: 0 });
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const render = useCallback(() => {
    raf.current = 0;
    const el = ref.current;
    if (!el) return;
    const { rx, ry } = target.current;
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  }, []);

  const onPointerMove = (e) => {
    if (reduced.current || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    el.style.transition = ""; // cancel any leave-ease in progress
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    target.current = { rx: -py * max * 2, ry: px * max * 2 };
    if (!raf.current) raf.current = requestAnimationFrame(render);
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    target.current = { rx: 0, ry: 0 };
    el.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "perspective(900px)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
