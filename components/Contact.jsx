import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { business } from "@/lib/site.config";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/islands/Reveal";
import QuoteForm from "@/components/islands/QuoteForm";
import styles from "./Contact.module.css";

/**
 * Contact — server-rendered shell for the "Get your free quote" section.
 *
 * Left column (header + contact rows from business.*) ships as static HTML;
 * only the form itself hydrates, via the <QuoteForm/> island.
 */

function addressLine() {
  const a = business.address;
  return [a.street, a.suburb && `${a.suburb}${a.postcode ? " " + a.postcode : ""}`, a.state]
    .filter(Boolean)
    .join(", ");
}

const ROWS = [
  { Icon: Phone, label: "CALL", value: business.phoneDisplay, href: `tel:${business.phoneE164}` },
  { Icon: Mail, label: "EMAIL", value: business.email, href: `mailto:${business.email}` },
  { Icon: MapPin, label: "BASED IN", value: addressLine() || `${business.address.suburb}, ${business.address.state}` },
  { Icon: Clock, label: "HOURS", value: `${business.hours.weekdays} · ${business.hours.saturday}` },
];

export default function Contact() {
  return (
    <section id="contact" className={`${styles.section} cv-section`}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <Reveal>
            <SectionHeader
              label="CONTACT"
              index="08"
              dark={false}
              title={<>Get your<br />free quote.</>}
              sub={<>Tell us about your roof and we&apos;ll get back to you within 24 hours with an honest, itemised quote.</>}
            />
            <div className={styles.rows}>
              {ROWS.map(({ Icon, label, value, href }) => (
                <div key={label} className={styles.row}>
                  <div className={styles.rowIcon} aria-hidden="true">
                    <Icon size={17} />
                  </div>
                  <div>
                    <div className={styles.rowLabel}>{label}</div>
                    {href ? (
                      <a className={styles.rowValue} href={href}>{value}</a>
                    ) : (
                      <div className={styles.rowValue}>{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className={styles.formCol}>
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
