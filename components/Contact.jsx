"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { C } from "@/lib/theme";
import { business } from "@/lib/site.config";
import { Fade, GoldLine, SectionLabel } from "@/components/ui/primitives";

const inp = { width: "100%", padding: "13px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.darkSoft, color: C.textWhite, fontSize: 14, fontFamily: "inherit", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" };

function addressLine() {
  const a = business.address;
  return [a.street, a.suburb && `${a.suburb}${a.postcode ? " " + a.postcode : ""}`, a.state].filter(Boolean).join(", ");
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const focus = (e) => (e.target.style.borderColor = C.goldDark);
  const blur = (e) => (e.target.style.borderColor = C.border);

  if (sent) {
    return (
      <section id="contact" style={{ padding: "110px 28px", background: C.warm }}>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 60, height: 60, background: "rgba(146,113,10,0.1)", border: "1px solid rgba(146,113,10,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><CheckCircle size={28} color={C.goldDeep} /></div>
          <h2 style={{ color: C.textDark, fontSize: 26, fontWeight: 800, margin: "0 0 10px" }}>Request sent.</h2>
          <p style={{ color: C.textDarkMuted, fontSize: 15, lineHeight: 1.7 }}>We&apos;ll get back to you within 24 hours. Thanks for choosing {business.name}.</p>
        </div>
      </section>
    );
  }

  const contactRows = [
    { icon: <Phone size={17} />, label: "CALL", value: business.phoneDisplay, href: `tel:${business.phoneE164}` },
    { icon: <Mail size={17} />, label: "EMAIL", value: business.email, href: `mailto:${business.email}` },
    { icon: <MapPin size={17} />, label: "BASED IN", value: addressLine() || `${business.address.suburb}, ${business.address.state}` },
    { icon: <Clock size={17} />, label: "HOURS", value: `${business.hours.weekdays} · ${business.hours.emergency}` },
  ];

  return (
    <section id="contact" style={{ padding: "110px 28px", background: C.warm }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 72 }}>
          <Fade>
            <GoldLine dark={false} /><SectionLabel dark={false}>CONTACT</SectionLabel>
            <h2 style={{ color: C.textDark, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-2px", margin: "12px 0 14px", lineHeight: 1.1 }}>Get your<br />free quote.</h2>
            <p style={{ color: C.textDarkMuted, fontSize: 15, lineHeight: 1.8, margin: "0 0 36px" }}>Tell us about your roof. We respond within 24 hours. Emergency? Call us directly.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {contactRows.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, border: `1px solid ${C.borderLight}`, background: C.white, display: "flex", alignItems: "center", justifyContent: "center", color: C.goldDeep, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, color: C.textDim, fontWeight: 500, letterSpacing: "1px" }}>{c.label}</div>
                    {c.href ? <a href={c.href} style={{ fontSize: 14, color: C.textDark, fontWeight: 600, textDecoration: "none" }}>{c.value}</a> : <div style={{ fontSize: 14, color: C.textDark, fontWeight: 600 }}>{c.value}</div>}
                  </div>
                </div>
              ))}
            </div>
          </Fade>
          <Fade delay={0.15}>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ background: C.darkCard, borderRadius: 14, padding: 30, border: `1px solid ${C.border}` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <input aria-label="Name" placeholder="Name *" required value={form.name} onChange={upd("name")} style={inp} onFocus={focus} onBlur={blur} />
                <input aria-label="Phone" placeholder="Phone *" required type="tel" value={form.phone} onChange={upd("phone")} style={inp} onFocus={focus} onBlur={blur} />
              </div>
              <input aria-label="Email" placeholder="Email *" required type="email" value={form.email} onChange={upd("email")} style={{ ...inp, marginBottom: 10 }} onFocus={focus} onBlur={blur} />
              <select aria-label="Service" value={form.service} onChange={upd("service")} style={{ ...inp, marginBottom: 10, color: form.service ? C.textWhite : C.textDim, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2378716c' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }} onFocus={focus} onBlur={blur}>
                <option value="" disabled>Select a service</option>
                <option>Roof Repairs</option><option>Roof Cleaning</option><option>Roof Restoration</option><option>Gutter Services</option><option>Other</option>
              </select>
              <textarea aria-label="Message" placeholder="Tell us about your roof..." rows={4} value={form.message} onChange={upd("message")} style={{ ...inp, marginBottom: 18, resize: "vertical" }} onFocus={focus} onBlur={blur} />
              <button type="submit" style={{ width: "100%", padding: "15px", background: C.gold, color: C.dark, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.5px", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.goldLight; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = "translateY(0)"; }}>
                SEND QUOTE REQUEST
              </button>
              <p style={{ color: C.textDim, fontSize: 11, textAlign: "center", margin: "12px 0 0" }}>We respond within 24 hours. Your info is never shared.</p>
            </form>
          </Fade>
        </div>
      </div>
    </section>
  );
}
