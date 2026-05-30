"use client";

import { useState } from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { C } from "@/lib/theme";
import { Fade, GoldLine, SectionLabel } from "@/components/ui/primitives";

const inp = { width: "100%", padding: "13px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.darkSoft, color: C.textWhite, fontSize: 14, fontFamily: "inherit", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" };
const selectArrow = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2378716c' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`;
// Hidden honeypot field — bots fill it in, humans never see it.
const honeypotStyle = { position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden", opacity: 0 };

export default function BookInspection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", suburb: "", service: "", date: "", time: "", notes: "", website: "" });
  const [booked, setBooked] = useState(false);
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
      const res = await fetch("/api/inspection", {
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
      setBooked(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  if (booked) {
    return (
      <section id="booking" style={{ padding: "110px 28px", background: C.dark, position: "relative" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.goldDark}40, transparent)` }} />
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: C.goldMuted, border: `1px solid ${C.goldBorder}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><CheckCircle size={28} color={C.gold} /></div>
          <h2 style={{ color: C.textWhite, fontSize: 26, fontWeight: 800, margin: "0 0 10px", letterSpacing: "-1px" }}>Inspection booked!</h2>
          <p style={{ color: C.textDim, fontSize: 15, lineHeight: 1.7 }}>We&apos;ll call you within 24 hours to confirm your appointment time.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" style={{ padding: "110px 28px", background: C.dark, position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.goldDark}40, transparent)` }} />
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "center" }}><GoldLine width={40} /></div>
            <SectionLabel>BOOK NOW</SectionLabel>
            <h2 style={{ color: C.textWhite, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-2px", margin: "12px 0 10px" }}>Book a free inspection.</h2>
            <p style={{ color: C.textDim, fontSize: 15 }}>Pick a date, we&apos;ll come to you. No obligation, no cost.</p>
          </div>
        </Fade>
        <Fade delay={0.15}>
          <form onSubmit={onSubmit} noValidate style={{ background: C.darkCard, borderRadius: 16, padding: "32px 28px", border: `1px solid ${C.border}` }}>
            {/* Honeypot — keep first, hidden from sighted + screen-reader users */}
            <div aria-hidden="true" style={honeypotStyle}>
              <label>Website (leave empty)
                <input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={upd("website")} />
              </label>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <input aria-label="Full name" placeholder="Full name *" required value={form.name} onChange={upd("name")} style={inp} onFocus={focus} onBlur={blur} />
              <input aria-label="Phone" placeholder="Phone *" required type="tel" value={form.phone} onChange={upd("phone")} style={inp} onFocus={focus} onBlur={blur} />
            </div>
            <input aria-label="Email" placeholder="Email *" required type="email" value={form.email} onChange={upd("email")} style={{ ...inp, marginBottom: 10 }} onFocus={focus} onBlur={blur} />
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10, marginBottom: 10 }}>
              <input aria-label="Street address" placeholder="Street address *" required value={form.address} onChange={upd("address")} style={inp} onFocus={focus} onBlur={blur} />
              <input aria-label="Suburb" placeholder="Suburb *" required value={form.suburb} onChange={upd("suburb")} style={inp} onFocus={focus} onBlur={blur} />
            </div>
            <select aria-label="Service needed" value={form.service} onChange={upd("service")} required style={{ ...inp, marginBottom: 10, color: form.service ? C.textWhite : C.textDim, appearance: "none", backgroundImage: selectArrow, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }} onFocus={focus} onBlur={blur}>
              <option value="" disabled>What do you need? *</option>
              <option>Roof Inspection</option><option>Roof Repair</option><option>Roof Cleaning</option><option>Roof Restoration</option><option>Not sure — need advice</option>
            </select>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div style={{ position: "relative" }}>
                <label style={{ position: "absolute", top: -8, left: 12, background: C.darkCard, padding: "0 6px", fontSize: 10, color: C.textDim, letterSpacing: "0.5px" }}>PREFERRED DATE</label>
                <input aria-label="Preferred date" type="date" required value={form.date} onChange={upd("date")} style={{ ...inp, colorScheme: "dark" }} onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ position: "relative" }}>
                <label style={{ position: "absolute", top: -8, left: 12, background: C.darkCard, padding: "0 6px", fontSize: 10, color: C.textDim, letterSpacing: "0.5px" }}>PREFERRED TIME</label>
                <select aria-label="Preferred time" value={form.time} onChange={upd("time")} style={{ ...inp, color: form.time ? C.textWhite : C.textDim, appearance: "none", backgroundImage: selectArrow, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }} onFocus={focus} onBlur={blur}>
                  <option value="" disabled>Select time</option>
                  <option>8:00 AM - 10:00 AM</option><option>10:00 AM - 12:00 PM</option><option>12:00 PM - 2:00 PM</option><option>2:00 PM - 4:00 PM</option><option>4:00 PM - 6:00 PM</option>
                </select>
              </div>
            </div>
            <textarea aria-label="Additional notes" placeholder="Anything else we should know? (e.g. roof access, parking, pets...)" rows={3} value={form.notes} onChange={upd("notes")} style={{ ...inp, marginBottom: 20, resize: "vertical" }} onFocus={focus} onBlur={blur} />
            {error && (
              <div role="alert" style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: 8, padding: "10px 12px", marginBottom: 14 }}>
                <AlertCircle size={16} color="#f87171" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ color: "#fca5a5", fontSize: 12.5, margin: 0, lineHeight: 1.5 }}>{error}</p>
              </div>
            )}
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? C.goldDark : C.gold, color: C.dark, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: loading ? "wait" : "pointer", fontFamily: "inherit", letterSpacing: "0.5px", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: loading ? 0.85 : 1 }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = C.goldLight; e.currentTarget.style.transform = "translateY(-1px)"; } }}
              onMouseLeave={(e) => { if (!loading) { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = "translateY(0)"; } }}>
              <Clock size={16} /> {loading ? "BOOKING…" : "BOOK MY FREE INSPECTION"}
            </button>
            <p style={{ color: C.textDim, fontSize: 11, textAlign: "center", margin: "12px 0 0" }}>We&apos;ll call to confirm within 24 hours. 100% free, zero obligation.</p>
          </form>
        </Fade>
      </div>
    </section>
  );
}
