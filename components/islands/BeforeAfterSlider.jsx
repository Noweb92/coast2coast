"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { images } from "@/lib/images";
import SmartImage from "@/components/ui/SmartImage";
import styles from "@/components/BeforeAfter.module.css";

/**
 * BeforeAfterSlider — the draggable before/after comparison figure.
 *
 * A REAL image pair with identical geometry: the AFTER layer is the clean
 * tile photograph, the BEFORE layer is the same photograph through a
 * realistic weathering pass (patchy grime, moss in the grooves, lichen —
 * baked into /photos/beforeafter-before.jpg, not a flat CSS filter).
 *
 * PERFORMANCE: drag NEVER goes through React state. Pointer events are
 * captured on the figure (setPointerCapture — one listener, mouse + touch +
 * pen unified) and position writes happen directly on the DOM inside a
 * requestAnimationFrame: at most one clip-path/left/aria write per frame,
 * zero re-renders, zero reconciliation of the next/image subtree. This is
 * what makes the slider feel native.
 *
 * A11y: role="slider" + aria-value* on the figure, ArrowLeft/Right (4%),
 * Up/Down, Home/End — all through the same rAF path.
 */
const MIN = 5;
const MAX = 95;

export default function BeforeAfterSlider() {
  const figureRef = useRef(null);
  const clipRef = useRef(null);
  const handleRef = useRef(null);
  const pos = useRef(50);
  const raf = useRef(0);
  const dragging = useRef(false);

  /* Single writer — everything that moves goes through this rAF. */
  const render = useCallback(() => {
    raf.current = 0;
    const fig = figureRef.current;
    const clip = clipRef.current;
    const handle = handleRef.current;
    if (!fig || !clip || !handle) return;
    const p = pos.current;
    clip.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
    handle.style.left = `${p}%`;
    fig.setAttribute("aria-valuenow", String(Math.round(p)));
  }, []);

  const setPos = useCallback(
    (p) => {
      pos.current = Math.max(MIN, Math.min(MAX, p));
      if (!raf.current) raf.current = requestAnimationFrame(render);
    },
    [render]
  );

  const moveTo = useCallback(
    (clientX) => {
      const fig = figureRef.current;
      if (!fig) return;
      const rect = fig.getBoundingClientRect();
      setPos(((clientX - rect.left) / rect.width) * 100);
    },
    [setPos]
  );

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onPointerDown = (e) => {
    dragging.current = true;
    figureRef.current?.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };
  const onPointerMove = (e) => {
    if (dragging.current) moveTo(e.clientX);
  };
  const endDrag = (e) => {
    dragging.current = false;
    figureRef.current?.releasePointerCapture?.(e.pointerId);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setPos(pos.current - 4);
    }
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setPos(pos.current + 4);
    }
    if (e.key === "Home") {
      e.preventDefault();
      setPos(MIN);
    }
    if (e.key === "End") {
      e.preventDefault();
      setPos(MAX);
    }
  };

  const after = images.beforeAfterAfter;
  const before = images.beforeAfterBefore;

  return (
    <figure
      ref={figureRef}
      className={styles.figure}
      role="slider"
      tabIndex={0}
      aria-label="Before and after roof comparison"
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      aria-valuenow={50}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* AFTER — the clean roof */}
      <SmartImage
        image={after}
        sizes="(max-width: 900px) 100vw, 900px"
        style={{ position: "absolute", inset: 0 }}
      >
        <span className={`${styles.pill} ${styles.pillAfter}`}>AFTER</span>
      </SmartImage>

      {/* BEFORE — the genuinely weathered version, clipped by the handle */}
      <div ref={clipRef} className={styles.clip} style={{ clipPath: "inset(0 50% 0 0)" }}>
        <SmartImage
          image={before}
          sizes="(max-width: 900px) 100vw, 900px"
          style={{ position: "absolute", inset: 0 }}
        >
          <span className={`${styles.pill} ${styles.pillBefore}`}>BEFORE</span>
        </SmartImage>
      </div>

      {/* Drag handle (decorative — the slider semantics live on the figure) */}
      <div ref={handleRef} className={styles.handle} style={{ left: "50%" }} aria-hidden="true">
        <span className={styles.grip}>
          <span className={styles.chevrons}>
            <ChevronRight size={14} />
            <ChevronRight size={14} />
          </span>
        </span>
      </div>
    </figure>
  );
}
