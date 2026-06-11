"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { images } from "@/lib/images";
import SmartImage from "@/components/ui/SmartImage";
import styles from "@/components/BeforeAfter.module.css";

/**
 * BeforeAfterSlider — the draggable before/after comparison figure.
 *
 * Both layers use the SAME verified roof photograph; the "before" layer has a
 * CSS filter applied that simulates a weathered, grimy roof (desaturated,
 * darkened, slight sepia/contrast shift). The result: dragging the slider
 * genuinely shows the same roof clean vs. dirty — the effect actually works.
 *
 * When real before/after job photos become available, swap them in via two
 * separate `images.beforeAfterBefore` / `images.beforeAfterAfter` entries
 * and remove the `imgStyle` filter on the before layer.
 *
 * Interaction: pointer events are scoped to the figure; window move/up
 * listeners are attached ONLY while a drag is in progress. Keyboard:
 * role="slider" + aria-value* with ArrowLeft / ArrowRight (4% steps).
 * The clip-path inset and handle `left` are the only inline styles —
 * truly dynamic values.
 */
const BEFORE_FILTER =
  "grayscale(0.55) contrast(0.92) brightness(0.72) sepia(0.18) saturate(0.7)";

export default function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const figureRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    const node = figureRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setPos(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  // Window listeners exist only for the lifetime of a drag.
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => handleMove(e.touches ? e.touches[0].clientX : e.clientX);
    const onUp = () => setDragging(false);
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
  }, [dragging, handleMove]);

  // Full APG slider pattern: arrows step, Home/End jump to the extremes.
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setPos((p) => Math.max(5, p - 4));
    }
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setPos((p) => Math.min(95, p + 4));
    }
    if (e.key === "Home") {
      e.preventDefault();
      setPos(5);
    }
    if (e.key === "End") {
      e.preventDefault();
      setPos(95);
    }
  };

  const roof = images.beforeAfterRoof;

  return (
    <figure
      ref={figureRef}
      className={styles.figure}
      role="slider"
      tabIndex={0}
      aria-label="Before and after roof comparison"
      aria-valuemin={5}
      aria-valuemax={95}
      aria-valuenow={Math.round(pos)}
      onKeyDown={onKeyDown}
      onMouseDown={(e) => { setDragging(true); handleMove(e.clientX); }}
      onTouchStart={(e) => { setDragging(true); handleMove(e.touches[0].clientX); }}
    >
      {/* AFTER — the same roof, untouched (clean & vibrant) */}
      <SmartImage
        image={roof}
        sizes="(max-width: 900px) 100vw, 900px"
        style={{ position: "absolute", inset: 0 }}
      >
        <span className={`${styles.pill} ${styles.pillAfter}`}>AFTER</span>
      </SmartImage>

      {/* BEFORE — same roof, clipped by the handle, with a "weathered" filter */}
      <div className={styles.clip} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SmartImage
          image={roof}
          sizes="(max-width: 900px) 100vw, 900px"
          style={{ position: "absolute", inset: 0 }}
          imgStyle={{ filter: BEFORE_FILTER }}
          overlay
          overlayStrength={0.25}
        >
          <span className={`${styles.pill} ${styles.pillBefore}`}>BEFORE</span>
        </SmartImage>
      </div>

      {/* Drag handle (decorative — the slider semantics live on the figure) */}
      <div className={styles.handle} style={{ left: `${pos}%` }} aria-hidden="true">
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
