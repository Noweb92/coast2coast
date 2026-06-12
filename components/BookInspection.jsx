import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/islands/Reveal";
import InspectionForm from "@/components/islands/InspectionForm";
import styles from "./BookInspection.module.css";

/**
 * BookInspection — server-rendered shell for the booking section.
 *
 * The centered header ships as static HTML; only the form hydrates,
 * via the <InspectionForm/> island. Keeps the frozen anchor id="booking".
 */
export default function BookInspection() {
  return (
    <section id="booking" className={`${styles.section} cv-section`}>
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <SectionHeader
            center
            index="04"
            label="BOOK NOW"
            title="Book a free inspection."
            sub={<>Pick a date, we&apos;ll come to you. No obligation, no cost.</>}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <InspectionForm />
        </Reveal>
      </div>
    </section>
  );
}
