import { areas } from "@/lib/site.config";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/islands/Reveal";
import styles from "./Areas.module.css";

/**
 * Areas — server component, zero JS.
 *
 * Service-area pill list on the dark-soft background, with the gold hairline
 * along the top edge. Pill hover (gold border/text/tint) is CSS-only.
 */
export default function Areas() {
  return (
    <section id="areas" className={`cv-section ${styles.section}`}>
      <span className={styles.hairline} aria-hidden="true" />
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <SectionHeader
            label="COVERAGE"
            title="All of WA."
            sub="Coast to coast, north to south."
            center
          />
        </Reveal>

        <Reveal delay={0.15}>
          <ul className={styles.pills}>
            {areas.map((a) => (
              <li key={a} className={styles.pill}>{a}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.25}>
          <p className={styles.more}>
            Don&apos;t see your area?{" "}
            <a href="#contact" className={styles.moreLink}>Get in touch</a> — we
            likely cover it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
