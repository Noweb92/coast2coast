"use client";

/**
 * Fixed primary navigation (client island — whitelisted).
 * - Scrolled state (rAF-throttled, passive) toggles a CSS class only.
 * - Mobile menu at ≤768px with aria-expanded / aria-controls.
 * - All static styling + hover states live in Navbar.module.css.
 */

import { useState, useEffect } from "react";
import { Home, Menu, X, Phone } from "lucide-react";
import { navLinks, business } from "@/lib/site.config";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // sync immediately (e.g. reload with restored scroll position)
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={scrolled ? `${styles.header} ${styles.scrolled}` : styles.header}>
      <nav aria-label="Primary">
        <div className={styles.inner}>
          <a href="#hero" aria-label="Coast2Coast Roofing home" className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              <Home size={17} />
            </span>
            <span>
              <span className={styles.brandName}>
                COAST<span className={styles.gold}>2</span>COAST
              </span>
              <span className={styles.brandSub}>ROOFING WA</span>
            </span>
          </a>

          <div className={styles.desk}>
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className={styles.link}>
                {l.label}
              </a>
            ))}
            <a href={`tel:${business.phoneE164}`} className={styles.phone}>
              <Phone size={14} className={styles.phoneIcon} aria-hidden="true" />
              {business.phoneDisplay}
            </a>
            <a href="#contact" className={styles.cta}>
              GET QUOTE
            </a>
          </div>

          <button
            type="button"
            className={styles.mobBtn}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Always mounted so aria-controls resolves; shown via class at ≤768px. */}
        <div
          id="primary-mobile-menu"
          className={open ? `${styles.mobMenu} ${styles.menuOpen}` : styles.mobMenu}
        >
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={close} className={styles.mobLink}>
              {l.label}
            </a>
          ))}
          <a href={`tel:${business.phoneE164}`} onClick={close} className={styles.mobPhone}>
            <Phone size={16} className={styles.phoneIcon} aria-hidden="true" />
            {business.phoneDisplay}
          </a>
          <a href="#contact" onClick={close} className={styles.mobCta}>
            GET FREE QUOTE
          </a>
        </div>
      </nav>
    </header>
  );
}
