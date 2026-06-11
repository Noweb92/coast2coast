"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CountUp — hero stat counter island.
 *
 * Server-renders the FINAL value so the number is present in the initial
 * HTML (SEO, no-JS) and never hidden. On the client, once the element
 * scrolls into view, the visual digits restart from 0 and ease up to `end`
 * via requestAnimationFrame (cubic ease-out, matching the legacy useCounter).
 *
 * Accessibility: the animated digits are `aria-hidden` and a visually-hidden
 * sibling carries the real final value as plain text (aria-label on a generic
 * <span> is unreliably exposed across AT), so assistive tech always announces
 * the real stat, never a mid-animation frame. `prefers-reduced-motion`
 * skips the animation entirely and keeps the static final value.
 */
export default function CountUp({ end, suffix = "", duration = 2000 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(end);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // keep the final value rendered statically
    }

    let raf = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);

        let startTime = null;
        const step = (ts) => {
          if (startTime === null) startTime = ts;
          const p = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(eased * end));
          if (p < 1) raf = requestAnimationFrame(step);
        };

        setValue(0);
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.12 }
    );
    obs.observe(node);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{value}{suffix}</span>
      <span className="sr-only">{end}{suffix}</span>
    </span>
  );
}

export { CountUp };
