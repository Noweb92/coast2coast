"use client";

import { useState } from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import styles from "./forms.module.css";

/**
 * InspectionForm — the "Book a free inspection" form island.
 *
 * Owns only the interactive state (fields, loading, error, booked); the
 * section shell stays server-rendered in components/BookInspection.jsx.
 * POSTs JSON to /api/inspection (contract frozen — see
 * app/api/inspection/route.js). On success it replaces only the form
 * with a confirmation panel — the section and its header stay.
 */

const INITIAL = {
  name: "", phone: "", email: "", address: "", suburb: "",
  service: "", date: "", time: "", notes: "", website: "",
};

export default function InspectionForm() {
  const [form, setForm] = useState(INITIAL);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

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
      <div className={styles.success} role="status">
        <div className={styles.successIcon} aria-hidden="true">
          <CheckCircle size={28} />
        </div>
        <h3 className={styles.successTitle}>Inspection booked!</h3>
        <p className={styles.successText}>
          We&apos;ll call you within 24 hours to confirm your appointment time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={`${styles.card} ${styles.cardWide}`}>
      {/* Honeypot — keep first, hidden from sighted + screen-reader users */}
      <div aria-hidden="true" className={styles.honeypot}>
        <label>
          Website (leave empty)
          <input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={upd("website")} />
        </label>
      </div>

      <div className={styles.grid2}>
        <input className={styles.input} aria-label="Full name" placeholder="Full name *" required value={form.name} onChange={upd("name")} />
        <input className={styles.input} aria-label="Phone" placeholder="Phone *" required type="tel" value={form.phone} onChange={upd("phone")} />
      </div>
      <input className={styles.input} aria-label="Email" placeholder="Email *" required type="email" value={form.email} onChange={upd("email")} />
      <div className={styles.gridAddress}>
        <input className={styles.input} aria-label="Street address" placeholder="Street address *" required value={form.address} onChange={upd("address")} />
        <input className={styles.input} aria-label="Suburb" placeholder="Suburb *" required value={form.suburb} onChange={upd("suburb")} />
      </div>
      <select
        className={`${styles.input} ${styles.select}${form.service ? "" : ` ${styles.placeholder}`}`}
        aria-label="Service needed"
        required
        value={form.service}
        onChange={upd("service")}
      >
        <option value="" disabled>What do you need? *</option>
        <option>Roof Inspection</option>
        <option>Roof Repair</option>
        <option>Roof Cleaning</option>
        <option>Roof Restoration</option>
        <option>Not sure — need advice</option>
      </select>

      <div className={styles.grid2}>
        <div className={styles.floatWrap}>
          <label className={styles.floatLabel} aria-hidden="true">PREFERRED DATE</label>
          <input
            className={`${styles.input} ${styles.date}`}
            aria-label="Preferred date"
            type="date"
            required
            value={form.date}
            onChange={upd("date")}
          />
        </div>
        <div className={styles.floatWrap}>
          <label className={styles.floatLabel} aria-hidden="true">PREFERRED TIME</label>
          <select
            className={`${styles.input} ${styles.select}${form.time ? "" : ` ${styles.placeholder}`}`}
            aria-label="Preferred time"
            value={form.time}
            onChange={upd("time")}
          >
            <option value="" disabled>Select time</option>
            <option>8:00 AM - 10:00 AM</option>
            <option>10:00 AM - 12:00 PM</option>
            <option>12:00 PM - 2:00 PM</option>
            <option>2:00 PM - 4:00 PM</option>
            <option>4:00 PM - 6:00 PM</option>
          </select>
        </div>
      </div>

      <textarea
        className={`${styles.input} ${styles.textarea}`}
        aria-label="Additional notes"
        placeholder="Anything else we should know? (e.g. roof access, parking, pets...)"
        rows={3}
        value={form.notes}
        onChange={upd("notes")}
      />

      {error && (
        <div role="alert" className={styles.alert}>
          <AlertCircle size={16} className={styles.alertIcon} aria-hidden="true" />
          <p className={styles.alertText}>{error}</p>
        </div>
      )}

      <button type="submit" disabled={loading} className={`${styles.submit} ${styles.submitLg}`}>
        <Clock size={16} aria-hidden="true" /> {loading ? "BOOKING…" : "BOOK MY FREE INSPECTION"}
      </button>
      <p className={styles.note}>We&apos;ll call to confirm within 24 hours. 100% free, zero obligation.</p>
    </form>
  );
}
