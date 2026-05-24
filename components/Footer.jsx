"use client";

import { Home, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { C } from "@/lib/theme";
import { business, services, navLinks } from "@/lib/site.config";

export default function Footer() {
  const a = business.address;
  const addr = [a.suburb, a.state].filter(Boolean).join(", ");
  const socials = [
    business.social.facebook && { icon: <Facebook size={15} />, href: business.social.facebook, label: "Facebook" },
    business.social.instagram && { icon: <Instagram size={15} />, href: business.social.instagram, label: "Instagram" },
  ].filter(Boolean);

  return (
    <footer style={{ background: C.darkDeep, padding: "56px 28px 24px", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 36, marginBottom: 44 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, border: `1.5px solid ${C.goldDark}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}><Home size={14} color={C.gold} /></div>
              <div>
                <div style={{ color: C.textWhite, fontWeight: 700, fontSize: 13, letterSpacing: "2px" }}>COAST<span style={{ color: C.gold }}>2</span>COAST</div>
                <div style={{ color: C.textDim, fontSize: 7, letterSpacing: "2px" }}>ROOFING WA</div>
              </div>
            </div>
            <p style={{ color: C.textDim, fontSize: 12, lineHeight: 1.7 }}>Premium roofing across Western Australia. Licensed, insured, committed to quality.</p>
            {socials.length > 0 && (
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: 7, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.textMuted, transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = C.gold; e.currentTarget.style.borderColor = C.goldBorder; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = C.textMuted; e.currentTarget.style.borderColor = C.border; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h4 style={{ color: C.gold, fontSize: 10, fontWeight: 600, marginBottom: 14, letterSpacing: "2px" }}>SERVICES</h4>
            {services.map((s, i) => <a key={i} href="#services" style={{ display: "block", color: C.textDim, fontSize: 12, textDecoration: "none", marginBottom: 9, transition: "color 0.2s" }} onMouseEnter={(e) => (e.target.style.color = C.gold)} onMouseLeave={(e) => (e.target.style.color = C.textDim)}>{s.title}</a>)}
          </div>
          <div>
            <h4 style={{ color: C.gold, fontSize: 10, fontWeight: 600, marginBottom: 14, letterSpacing: "2px" }}>COMPANY</h4>
            {navLinks.map((l, i) => <a key={i} href={l.href} style={{ display: "block", color: C.textDim, fontSize: 12, textDecoration: "none", marginBottom: 9, transition: "color 0.2s" }} onMouseEnter={(e) => (e.target.style.color = C.gold)} onMouseLeave={(e) => (e.target.style.color = C.textDim)}>{l.label}</a>)}
          </div>
          <div>
            <h4 style={{ color: C.gold, fontSize: 10, fontWeight: 600, marginBottom: 14, letterSpacing: "2px" }}>CONTACT</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <a href={`tel:${business.phoneE164}`} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}><Phone size={11} color={C.goldDark} /><span style={{ color: C.textDim, fontSize: 12 }}>{business.phoneDisplay}</span></a>
              <a href={`mailto:${business.email}`} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}><Mail size={11} color={C.goldDark} /><span style={{ color: C.textDim, fontSize: 11 }}>{business.email}</span></a>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><MapPin size={11} color={C.goldDark} /><span style={{ color: C.textDim, fontSize: 12 }}>{addr}</span></div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>&copy; {new Date().getFullYear()} {business.legalName}. All rights reserved.</p>
          <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>
            {business.builderLicence ? `Builder Reg: ${business.builderLicence} · ` : ""}ABN: {business.abn}
          </p>
        </div>
      </div>
    </footer>
  );
}
