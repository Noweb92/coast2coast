import { testimonials } from "@/lib/site.config";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/islands/Reveal";
import Tilt from "@/components/islands/Tilt";
import styles from "./Testimonials.module.css";

/**
 * Testimonials — fully server-rendered review cards.
 *
 * Semantics: each review is a <figure> (blockquote + figcaption); the star
 * row carries an aria-label ("5 out of 5 stars") so the rating is announced,
 * not twinkled. Hover lift is pure CSS. Frozen copy from lib/site.config.
 */
export default function Testimonials() {
  return (
    <section className={`${styles.section} cv-section`}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <SectionHeader label="TESTIMONIALS" title="Earned trust." center index="05" />
        </Reveal>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <Tilt max={4} className={styles.tilt}>
              <figure className={styles.card}>
                <div className={styles.stars} role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Icon key={si} name="Star" size={13} className={styles.star} />
                  ))}
                </div>
                <blockquote className={styles.quote}>
                  <p>&ldquo;{t.text}&rdquo;</p>
                </blockquote>
                <figcaption className={styles.byline}>
                  <span className={styles.avatar} aria-hidden="true">
                    {t.name.charAt(0)}
                  </span>
                  <span className={styles.who}>
                    <span className={styles.name}>{t.name}</span>
                    <span className={styles.where}>{t.location}, WA</span>
                  </span>
                </figcaption>
              </figure>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
