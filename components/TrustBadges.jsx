import { trustBadges } from "@/lib/site.config";
import Reveal from "@/components/islands/Reveal";
import Icon from "@/components/ui/Icon";
import styles from "./TrustBadges.module.css";

/**
 * TrustBadges — the credibility strip between Services and Process.
 *
 * Server-rendered; each badge staggers in via the <Reveal> island and the
 * lift/gold-border hover lives entirely in TrustBadges.module.css.
 */
export default function TrustBadges() {
  return (
    <section aria-labelledby="trust-heading" className={`${styles.section} cv-section`}>
      <div className={styles.inner}>
        <h2 id="trust-heading" className="sr-only">Why choose us</h2>
        <ul className={styles.grid}>
          {trustBadges.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.06} className={styles.cell}>
              <div className={styles.badge}>
                <div className={styles.icon}>
                  <Icon name={b.icon} size={28} aria-hidden="true" />
                </div>
                <h3 className={styles.title}>{b.title}</h3>
                <p className={styles.desc}>{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
