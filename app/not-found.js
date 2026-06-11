// Branded 404 — server component, zero client JS (contract §6).
// Inline styles are permitted here ONLY, to avoid CSS-module overhead
// on error paths; hover/focus styling lives in the small <style> block.

export const metadata = { title: "Page not found" };

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
  code: {
    fontSize: "clamp(96px, 22vw, 168px)",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    color: "transparent",
    WebkitTextStroke: "1.5px rgba(251,191,36,0.4)",
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
  btn: {
    display: "inline-block",
    marginTop: 36,
    padding: "15px 34px",
    background: "var(--gold, #fbbf24)",
    color: "var(--dark, #1e1e24)",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.3,
    borderRadius: 100,
    textDecoration: "none",
  },
};

export default function NotFound() {
  return (
    <main id="main" style={styles.main}>
      <style>{`
        .c2c-err-btn{transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s cubic-bezier(.16,1,.3,1)}
        .c2c-err-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(251,191,36,.3)}
        @media (prefers-reduced-motion:reduce){.c2c-err-btn,.c2c-err-btn:hover{transition:none;transform:none}}
      `}</style>
      <div aria-hidden="true" style={styles.code}>404</div>
      <p style={styles.label}>Page not found</p>
      <h1 style={styles.title}>
        This page doesn&rsquo;t <span style={{ color: "var(--gold, #fbbf24)" }}>exist.</span>
      </h1>
      <p style={styles.copy}>
        The page you&rsquo;re looking for may have been moved or removed. Head back
        to the homepage to find what you need.
      </p>
      <a href="/" className="c2c-err-btn" style={styles.btn}>
        Back to homepage
      </a>
    </main>
  );
}
