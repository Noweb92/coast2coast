import { Home, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { business, services, navLinks } from "@/lib/site.config";
import styles from "./Footer.module.css";

/**
 * Footer — fully server-rendered. Brand block, services / company / contact
 * columns, socials (only when URLs are set in site.config), ABN line.
 * All hovers are CSS-only.
 */
export default function Footer() {
  const a = business.address;
  const addr = [a.suburb, a.state].filter(Boolean).join(", ");
  const socials = [
    business.social.facebook && { Icon: Facebook, href: business.social.facebook, label: "Facebook" },
    business.social.instagram && { Icon: Instagram, href: business.social.instagram, label: "Instagram" },
  ].filter(Boolean);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>

          <div>
            <div className={styles.brand}>
              <div className={styles.logoBox} aria-hidden="true">
                <Home size={14} />
              </div>
              <div>
                <p className={styles.wordmark}>COAST<span>2</span>COAST</p>
                <p className={styles.wordmarkSub}>ROOFING WA</p>
              </div>
            </div>
            <p className={styles.blurb}>
              Premium roofing across Western Australia. Licensed, insured, committed to quality.
            </p>
            {socials.length > 0 && (
              <div className={styles.socials}>
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.social}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className={styles.colTitle}>SERVICES</h3>
            {services.map((s) => (
              <a key={s.id} href="#services" className={styles.link}>{s.title}</a>
            ))}
          </div>

          <div>
            <h3 className={styles.colTitle}>COMPANY</h3>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={styles.link}>{l.label}</a>
            ))}
          </div>

          <div>
            <h3 className={styles.colTitle}>CONTACT</h3>
            <div className={styles.contactCol}>
              <a href={`tel:${business.phoneE164}`} className={styles.contactRow}>
                <Phone size={11} aria-hidden="true" />
                <span>{business.phoneDisplay}</span>
              </a>
              <a href={`mailto:${business.email}`} className={`${styles.contactRow} ${styles.contactEmail}`}>
                <Mail size={11} aria-hidden="true" />
                <span>{business.email}</span>
              </a>
              <div className={styles.contactRow}>
                <MapPin size={11} aria-hidden="true" />
                <span>{addr}</span>
              </div>
            </div>
          </div>

        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} {business.legalName}. All rights reserved.</p>
          <p>{business.builderLicence ? `Builder Reg: ${business.builderLicence} · ` : ""}ABN: {business.abn}</p>
        </div>
      </div>
    </footer>
  );
}
