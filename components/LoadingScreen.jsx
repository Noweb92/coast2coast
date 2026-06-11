"use client";

/**
 * Brand intro veil (client island — whitelisted).
 *
 * NON-BLOCKING by design — it never gates page content:
 * - Takes no props (no onDone); page.js needs no `loaded` state.
 * - `pointer-events: none` — the page underneath is interactive throughout.
 * - Total run ≤700ms (bar fills ~440ms, fade ends ~670ms), then it unmounts
 *   itself. A pure-CSS fallback animation clears the veil on the same clock
 *   even if hydration is slow.
 * - Skipped entirely (renders nothing) on repeat visits in the same session
 *   (sessionStorage "c2c_intro_seen") and for prefers-reduced-motion users.
 */

import { useState, useEffect } from "react";
import { Home } from "lucide-react";
import styles from "./LoadingScreen.module.css";

const SEEN_KEY = "c2c_intro_seen";

const STEP_MS = 22; // +5% per tick → 100% at 440ms
const FADE_AT_MS = 450; // fade transition is 220ms → fully clear ~670ms
const UNMOUNT_AT_MS = 690;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}

    // Repeat visit or reduced motion → skip entirely, render nothing.
    if (reducedMotion || seen) {
      setGone(true);
      return;
    }
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}

    // Fast, single intro — a brand moment, not a wait.
    const ticker = setInterval(() => {
      setProgress((p) => Math.min(p + 5, 100));
    }, STEP_MS);
    const fadeTimer = setTimeout(() => setFading(true), FADE_AT_MS);
    const goneTimer = setTimeout(() => setGone(true), UNMOUNT_AT_MS);

    return () => {
      clearInterval(ticker);
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <>
    <div
      id="c2c-veil"
      className={fading ? `${styles.veil} ${styles.hide}` : styles.veil}
      aria-hidden="true"
    >
      <div className={styles.brandRow}>
        <span className={styles.mark}>
          <Home size={20} />
        </span>
        <span>
          <span className={styles.brandName}>
            COAST<span className={styles.gold}>2</span>COAST
          </span>
          <span className={styles.brandSub}>ROOFING WA</span>
        </span>
      </div>
      <div className={styles.track}>
        {/* width is the one truly dynamic value — inline by contract */}
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.pct}>{progress}%</div>
    </div>
    {/* Synchronous repeat-visit skip: hides the server-rendered veil BEFORE
        hydration (the useEffect check above only runs after). It injects a
        <style> into <head> — React never hydrates/diffs head children, so
        this cannot cause a hydration mismatch on the veil element. */}
    <script
      dangerouslySetInnerHTML={{
        __html:
          'try{if(sessionStorage.getItem("c2c_intro_seen")==="1"){var s=document.createElement("style");s.textContent="#c2c-veil{display:none!important}";document.head.appendChild(s)}}catch(e){}',
      }}
    />
    </>
  );
}
