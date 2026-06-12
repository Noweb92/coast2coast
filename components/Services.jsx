import { CheckCircle } from "lucide-react";
import { services } from "@/lib/site.config";
import { images } from "@/lib/images";
import Reveal from "@/components/islands/Reveal";
import Tilt from "@/components/islands/Tilt";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import SmartImage from "@/components/ui/SmartImage";
import styles from "./Services.module.css";

/**
 * Services — the three core offerings, rendered fully on the server.
 *
 * Every card always shows its complete feature list (no expand state, no
 * client JS); the elevation on hover — lift, shadow, gold border — is pure
 * CSS in Services.module.css. Stagger-in is delegated to the <Reveal>
 * island, which wraps the server-rendered cards.
 */

const IMAGE_BY_ID = {
  repairs: images.serviceRepairs,
  cleaning: images.serviceCleaning,
  restoration: images.serviceRestoration,
};

export default function Services() {
  return (
    <section id="services" className={`${styles.section} cv-section`}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <SectionHeader
            label="SERVICES"
            title="What we do."
            sub="Three core services, one standard of excellence."
            dark={false}
            index="02"
          />
        </Reveal>

        <ul className={styles.grid}>
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.08} className={styles.cell}>
              <Tilt className={styles.tilt}>
              <article className={styles.card}>
                <SmartImage
                  image={IMAGE_BY_ID[s.id]}
                  sizes="(max-width: 768px) 100vw, 360px"
                  style={{ height: 200 }}
                  overlay
                  overlayStrength={0.15}
                >
                  <div className={styles.chip}>
                    <Icon name={s.icon} size={22} aria-hidden="true" />
                  </div>
                </SmartImage>

                <div className={styles.body}>
                  <h3 className={styles.title}>{s.title}</h3>
                  <p className={styles.desc}>{s.desc}</p>
                  <ul className={styles.features}>
                    {s.features.map((f) => (
                      <li key={f} className={styles.feature}>
                        <CheckCircle size={13} className={styles.check} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
