"use client";

/**
 * Top scroll progress bar (client island — whitelisted).
 * rAF-throttled, passive listeners; progress is applied imperatively as a
 * `scaleX()` transform (compositor-only — no layout, no React re-render).
 * Static styles live in Navbar.module.css (`.progress`) — the shared
 * top-chrome stylesheet; this component owns no module of its own.
 */

import { useEffect, useRef } from "react";
import styles from "./Navbar.module.css";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      const p = max > 0 ? d.scrollTop / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={barRef} className={styles.progress} aria-hidden="true" />;
}
