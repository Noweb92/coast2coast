import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/islands/Reveal";
import BeforeAfterSlider from "@/components/islands/BeforeAfterSlider";
import styles from "./BeforeAfter.module.css";

/**
 * BeforeAfter — server shell for the results section.
 *
 * Renders the section chrome + heading on the server (all copy in the
 * initial HTML); the draggable comparison itself is the
 * `islands/BeforeAfterSlider` client island. Slider styles live in
 * BeforeAfter.module.css, shared with the island.
 */
export default function BeforeAfter() {
  return (
    <section className={`${styles.section} cv-section`}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <SectionHeader
            label="RESULTS"
            title="See the difference."
            sub="Drag the slider to compare before and after."
            dark={false}
            center
          />
        </Reveal>
        <Reveal delay={0.15}>
          <BeforeAfterSlider />
        </Reveal>
      </div>
    </section>
  );
}
