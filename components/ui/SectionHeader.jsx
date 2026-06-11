import styles from "./ui.module.css";

/**
 * SectionHeader — the repeated section intro pattern, rendered on the server.
 *
 * DATUM title block (DESIGN_SPEC §6.1): a 1px dimension rule with a 5×5 gold
 * endcap, label left / drawing index right, monumental expanded-caps h2
 * (+ optional hanging-rule sub paragraph).
 *
 *   meta   border-top 1px var(--rule) + gold square endcap
 *   label  11px / 700 / 3.5px tracking, gold (gold-deep on light)
 *   index  Archivo 125% 700 12px tabular-nums — decorative, aria-hidden
 *   h2     var(--display-h2) Archivo 118% 700 uppercase
 *
 * Props: { label, title, sub, dark = true, center = false, index }
 * `title` and `sub` accept nodes, so multi-line titles (<>…<br/>…</>) work.
 * `index` is the drawing-set numeral ("02"–"09"), silent to screen readers.
 */
export default function SectionHeader({ label, title, sub, dark = true, center = false, index }) {
  const cls = [
    styles.header,
    !dark && styles.light,
    center && styles.center,
  ].filter(Boolean).join(" ");

  return (
    <div className={cls}>
      <div className={styles.meta}>
        <p className={styles.label}>{label}</p>
        {index && <span className={styles.index} aria-hidden="true">{index}</span>}
      </div>
      <h2 className={styles.title}>{title}</h2>
      {sub != null && <p className={styles.sub}>{sub}</p>}
    </div>
  );
}

export { SectionHeader };
