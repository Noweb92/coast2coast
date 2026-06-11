"use client";

// Branded error boundary — Next.js requires "use client" here (contract §6).
// Inline styles are permitted here ONLY, to avoid CSS-module overhead
// on error paths; hover/focus styling lives in the small <style> block.

import { useEffect } from "react";

const styles = {
  main: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "64px 28px",
    background:
      "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(251,191,36,0.06), transparent 60%) var(--dark, #1e1e24)",
    color: "var(--text-white, #f5f5f4)",
  },
  mark: {
    width: 56,
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid var(--gold-border, rgba(251,191,36,0.18))",
    borderRadius: 14,
    background: "var(--gold-muted, rgba(251,191,36,0.08))",
    color: "var(--gold, #fbbf24)",
    fontSize: 26,
    fontWeight: 800,
    userSelect: "none",
  },
  label: {
    marginTop: 28,
    color: "var(--gold, #fbbf24)",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  title: {
    margin: "14px 0 0",
    fontSize: "clamp(28px, 4vw, 46px)",
    fontWeight: 800,
    letterSpacing: -1,
    lineHeight: 1.1,
  },
  copy: {
    margin: "16px auto 0",
    maxWidth: 440,
    color: "var(--text-muted, #a8a29e)",
    fontSize: 15,
    lineHeight: 1.7,
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
    marginTop: 36,
  },
  btnGold: {
    padding: "15px 34px",
    background: "var(--gold, #fbbf24)",
    color: "var(--dark, #1e1e24)",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.3,
    border: "none",
    borderRadius: 100,
    cursor: "pointer",
  },
  btnGhost: {
    display: "inline-block",
    padding: "14px 34px",
    background: "transparent",
    color: "var(--text-light, #d6d3d1)",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.3,
    border: "1px solid var(--border, #333338)",
    borderRadius: 100,
    textDecoration: "none",
  },
};

export default function Error({ error, reset }) {
  useEffect(() => {
    // Surface the error for debugging / monitoring.
    console.error(error);
  }, [error]);

  return (
    <main id="main" style={styles.main}>
      <style>{`
        .c2c-err-btn{transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s cubic-bezier(.16,1,.3,1)}
        .c2c-err-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(251,191,36,.3)}
        .c2c-err-ghost{transition:border-color .3s cubic-bezier(.16,1,.3,1),color .3s cubic-bezier(.16,1,.3,1)}
        .c2c-err-ghost:hover{border-color:var(--gold,#fbbf24);color:var(--text-white,#f5f5f4)}
        @media (prefers-reduced-motion:reduce){.c2c-err-btn,.c2c-err-btn:hover{transition:none;transform:none}}
      `}</style>
      <div aria-hidden="true" style={styles.mark}>!</div>
      <p style={styles.label}>Something went wrong</p>
      <h1 style={styles.title}>
        An unexpected <span style={{ color: "var(--gold, #fbbf24)" }}>error.</span>
      </h1>
      <p style={styles.copy}>
        Sorry about that — an unexpected error occurred while loading this page.
        Try again, or head back to the homepage.
      </p>
      <div style={styles.row}>
        <button type="button" onClick={reset} className="c2c-err-btn" style={styles.btnGold}>
          Try again
        </button>
        <a href="/" className="c2c-err-ghost" style={styles.btnGhost}>
          Back to homepage
        </a>
      </div>
    </main>
  );
}
