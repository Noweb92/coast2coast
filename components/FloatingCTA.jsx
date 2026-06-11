"use client";

/**
 * Floating phone/quote bubble (client island — whitelisted).
 * Appears after 400px of scroll (rAF-throttled, passive listener);
 * expands into a small contact panel. All static styling + hover
 * states live in FloatingCTA.module.css.
 */

import { useState, useEffect } from "react";
import { Phone, Mail, X, MessageCircle } from "lucide-react";
import { business } from "@/lib/site.config";
import styles from "./FloatingCTA.module.css";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > 400);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // sync immediately (e.g. reload with restored scroll position)
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    // Button first in the DOM (disclosure pattern: content follows its
    // trigger in tab order); column-reverse keeps the panel visually above.
    <div className={styles.root}>
      <button
        type="button"
        className={styles.bubble}
        onClick={() => setExpanded((e) => !e)}
        aria-label={expanded ? "Close contact options" : "Open contact options"}
        aria-expanded={expanded}
        aria-controls="floating-contact-panel"
      >
        {expanded ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
      {expanded && (
        <div id="floating-contact-panel" className={styles.panel}>
          <p className={styles.panelTitle}>Need help?</p>
          <a href={`tel:${business.phoneE164}`} className={styles.option}>
            <Phone size={16} className={styles.optionIcon} aria-hidden="true" />
            <span className={styles.optionText}>
              <span className={styles.optionLabel}>Call us</span>
              <span className={styles.optionSub}>{business.phoneDisplay}</span>
            </span>
          </a>
          <a href="#contact" onClick={() => setExpanded(false)} className={styles.option}>
            <Mail size={16} className={styles.optionIcon} aria-hidden="true" />
            <span className={styles.optionText}>
              <span className={styles.optionLabel}>Free quote</span>
              <span className={styles.optionSub}>Response in 24h</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
