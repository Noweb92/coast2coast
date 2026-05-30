"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { C } from "@/lib/theme";
import { business } from "@/lib/site.config";
import { Fade, GoldLine, SectionLabel } from "@/components/ui/primitives";

const inp = { width: "100%", padding: "13px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.darkSoft, color: C.textWhite, fontSize: 14, fontFamily: "inherit", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" };
// Hidden honeypot field — bots fill it in, humans never see it.
const honeypotStyle = { position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden", opacity: 0 };

function addressLine() {
  const a = business.address;
  return [a.street, a.suburb && `${a.suburb}${a.postcode ? " " + a.postcode : ""}`, a.state].filter(Boolean).join(", ");
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "", website: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const focus = (e) => (e.target.style.borderColor = C.goldDark);
  const blur = (e) => (e.target.style.borderColor = C.border);

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Something went wrong. Please try again or call us.");
        setLoading(false);
        return;
      }
      setSent(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

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
    { icon: <Clock size={17} />, label: "HOURS", value: `${business.hours.weekdays} · ${business.hours.saturday}` },
  ];

  return (
    <section id="contact" style={{ padding: "110px 28px", background: C.warm }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 72 }}>
          <Fade>
            <GoldLine dark={false} /><SectionLabel dark={false}>CONTACT</SectionLabel>
            <h2 style={{ color: C.textDark, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-2px", margin: "12px 0 14px", lineHeight: 1.1 }}>Get your<br />free quote.</h2>
            <p style={{ color: C.textDarkMuted, fontSize: 15, lineHeight: 1.8, margin: "0 0 36px" }}>Tell us about your roof and we&apos;ll get back to you within 24 hours with an honest, itemised quote.</p>
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
            <form onSubmit={onSubmit} noValidate style={{ background: C.darkCard, borderRadius: 14, padding: 30, border: `1px solid ${C.border}` }}>
              {/* Honeypot — keep first, hidden from sighted + screen-reader users */}
              <div aria-hidden="true" style={honeypotStyle}>
                <label>Website (leave empty)
                  <input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={upd("website")} />
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <input aria-label="Name" placeholder="Name *" required value={form.name} onChange={upd("name")} style={inp} onFocus={focus} onBlur={blur} />
                <input aria-label="Phone" placeholder="Phone *" required type="tel" value={form.phone} onChange={upd("phone")} style={inp} onFocus={focus} onBlur={blur} />
              </div>
              <input aria-label="Email" placeholder="Email *" required type="email" value={form.email} onChange={upd("email")} style={{ ...inp, marginBottom: 10 }} onFocus={focus} onBlur={blur} />
              <select aria-label="Service" value={form.service} onChange={upd("service")} style={{ ...inp, marginBottom: 10, color: form.service ? C.textWhite : C.textDim, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2378716c' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }} onFocus={focus} onBlur={blur}>
                <option value="" disabled>Select a service</option>
                <option>Roof Repairs</option><option>Roof Cleaning</option><option>Roof Restoration</option><option>Other</option>
              </select>
              <textarea aria-label="Message" placeholder="Tell us about your roof..." rows={4} value={form.message} onChange={upd("message")} style={{ ...inp, marginBottom: 18, resize: "vertical" }} onFocus={focus} onBlur={blur} />
              {error && (
                <div role="alert" style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: 8, padding: "10px 12px", marginBottom: 12 }}>
                  <AlertCircle size={16} color="#f87171" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ color: "#fca5a5", fontSize: 12.5, margin: 0, lineHeight: 1.5 }}>{error}</p>
                </div>
              )}
              <button type="submit" disabled={loading} style={{ width: "100%", padding: "15px", background: loading ? C.goldDark : C.gold, color: C.dark, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: loading ? "wait" : "pointer", fontFamily: "inherit", letterSpacing: "0.5px", transition: "all 0.3s", opacity: loading ? 0.85 : 1 }}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = C.goldLight; e.currentTarget.style.transform = "translateY(-1px)"; } }}
                onMouseLeave={(e) => { if (!loading) { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = "translateY(0)"; } }}>
                {loading ? "SENDING…" : "SEND QUOTE REQUEST"}
              </button>
              <p style={{ color: C.textDim, fontSize: 11, textAlign: "center", margin: "12px 0 0" }}>We respond within 24 hours. Your info is never shared.</p>
            </form>
          </Fade>
        </div>
      </div>
    </section>
  );
}
