import styles from "./ui.module.css";

/**
 * SectionHeader — the repeated section intro pattern, rendered on the server.
 *
 * Gold gradient line → uppercase gold label → h2 (+ optional sub paragraph).
 * Ports the visual of the legacy GoldLine / SectionLabel primitives:
 *   line  50×2 (40×2 centered), gold → gold-dark (dark) / gold-deep (light)
 *   label 12px / 600 / 4px tracking
 *   h2    clamp(28px,4vw,46px) / 800 / -2px tracking
 *
 * Props: { label, title, sub, dark = true, center = false }
 * `title` and `sub` accept nodes, so multi-line titles (<>…<br/>…</>) work.
 */
export default function SectionHeader({ label, title, sub, dark = true, center = false }) {
  const cls = [
    styles.header,
    !dark && styles.light,
    center && styles.center,
  ].filter(Boolean).join(" ");

  return (
    <div className={cls}>
      <span className={styles.line} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
      <h2 className={styles.title}>{title}</h2>
      {sub != null && <p className={styles.sub}>{sub}</p>}
    </div>
  );
}

export { SectionHeader };
