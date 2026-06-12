import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/site.config";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/islands/Reveal";
import styles from "./FAQ.module.css";

/**
 * FAQ — server component, zero JS.
 *
 * Native <details>/<summary> accordion: answers are present in the initial
 * server-rendered HTML (SEO-indexable even while closed) and the disclosure
 * behaviour is built into the browser. The chevron rotates and the answer
 * fades in via CSS on `details[open]` — no height animation, no hydration.
 */
export default function FAQ() {
  return (
    <section id="faq" className={`cv-section ${styles.section}`}>
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <SectionHeader label="FAQ" title="Questions? Answered." dark={false} center index="06" />
        </Reveal>

        <div className={styles.list}>
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <details className={styles.item}>
                <summary className={styles.summary}>
                  <span className={styles.question}>{f.q}</span>
                  <ChevronDown size={18} className={styles.chevron} aria-hidden="true" />
                </summary>
                <p className={styles.answer}>{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
