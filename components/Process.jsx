import { processSteps } from "@/lib/site.config";
import Reveal from "@/components/islands/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import styles from "./Process.module.css";

/**
 * Process — the four-step timeline, rendered fully on the server.
 *
 * Steps are an ordered list; the column dividers and gold connector dots
 * are pure CSS (Process.module.css). Stagger-in is delegated to the
 * <Reveal> island wrapping each server-rendered step.
 */
export default function Process() {
  return (
    <section id="process" className={`${styles.section} cv-section`}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <SectionHeader label="HOW IT WORKS" title="Four steps. Zero stress." center />
        </Reveal>

        <ol className={styles.grid}>
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.num} delay={i * 0.15} className={styles.cell}>
              <div className={styles.step}>
                <div className={styles.num} aria-hidden="true">{s.num}</div>
                <div className={styles.icon}>
                  <Icon name={s.icon} size={22} aria-hidden="true" />
                </div>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.desc}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
