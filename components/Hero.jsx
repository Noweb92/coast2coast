import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/lib/site.config";
import { images } from "@/lib/images";
import SmartImage from "@/components/ui/SmartImage";
import CountUp from "@/components/islands/CountUp";
import styles from "./Hero.module.css";

/**
 * Hero — full-viewport opener. SERVER COMPONENT (contract §2).
 *
 * Photographic backdrop (LCP candidate: priority + sizes="100vw"), tagline
 * kicker, the "Built to / protect." H1 with a pure-CSS letter stagger
 * (keyframes + per-span animation-delay, max delay 0.88s ≤ 0.9s — contract
 * §4: paints without JS/hydration; reduced-motion shows it static via the
 * global kill-switch + module fallback), sub copy, the two CTAs (CSS-only
 * hovers) and the three stats. Only the stat counters hydrate (<CountUp/>),
 * and they server-render their final values, so every word and number of
 * approved copy is in the initial HTML.
 *
 * Inline styles are limited to truly dynamic values: per-letter
 * animation-delay and the SmartImage frame position (its documented API).
 */

const LINE_ONE = "Built to";
const LINE_TWO = "protect.";

/** Per-letter spans with staggered animation-delay (the lone dynamic style). */
function Letters({ text, base, step, gold = false }) {
  const cls = gold ? `${styles.letter} ${styles.letterGold}` : styles.letter;
  return text.split("").map((ch, i) => (
    <span key={i} className={cls} style={{ animationDelay: `${(base + i * step).toFixed(2)}s` }}>
      {ch === " " ? " " : ch}
    </span>
  ));
}

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Photographic backdrop with darkening overlay for text contrast */}
      <SmartImage
        image={images.hero}
        priority
        sizes="100vw"
        overlay
        overlayStrength={0.55}
        style={{ position: "absolute", inset: 0 }}
      />
      <div className={styles.gradient} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.baseline} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.rise}>
          <span className={styles.line} aria-hidden="true" />
          <p className={styles.label}>{business.tagline}</p>
        </div>

        <h1 className={`${styles.title} ${styles.rise} ${styles.riseTitle}`} aria-label={`${LINE_ONE} ${LINE_TWO}`}>
          <span aria-hidden="true">
            <Letters text={LINE_ONE} base={0.15} step={0.025} />
            <br />
            <Letters text={LINE_TWO} base={0.4} step={0.02} gold />
          </span>
        </h1>

        <p className={`${styles.sub} ${styles.rise} ${styles.riseSub}`}>
          Roof repairs, cleaning &amp; restoration done with precision. From Perth to the Pilbara — no roof too far, no job too tough.
        </p>

        <div className={`${styles.ctas} ${styles.rise} ${styles.riseCtas}`}>
          <a href="#contact" className={styles.ctaPrimary}>
            FREE QUOTE <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a href={`tel:${business.phoneE164}`} className={styles.ctaGhost}>
            <Phone size={16} aria-hidden="true" /> {business.phoneDisplay}
          </a>
        </div>

        <div className={`${styles.stats} ${styles.rise} ${styles.riseStats}`}>
          <div>
            <div className={styles.statValue}>
              <CountUp end={business.stats.roofsCompleted} suffix="+" duration={2000} />
            </div>
            <div className={styles.statLabel}>Roofs completed</div>
          </div>
          <div>
            <div className={styles.statValue}>
              <CountUp end={business.stats.satisfactionRate} suffix="%" duration={1800} />
            </div>
            <div className={styles.statLabel}>Satisfaction rate</div>
          </div>
          <div>
            <div className={styles.statValue}>{business.stats.googleRating.toFixed(1)}★</div>
            <div className={styles.statLabel}>Google rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
