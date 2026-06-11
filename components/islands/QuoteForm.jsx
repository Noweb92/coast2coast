"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { business } from "@/lib/site.config";
import styles from "./forms.module.css";

/**
 * QuoteForm — the "Get your free quote" contact form island.
 *
 * Owns only the interactive state (fields, loading, error, sent); the
 * surrounding section shell stays server-rendered in components/Contact.jsx.
 * POSTs JSON to /api/quote (contract frozen — see app/api/quote/route.js).
 * On success it replaces only this column with a confirmation panel.
 */

const INITIAL = { name: "", email: "", phone: "", service: "", message: "", website: "" };

export default function QuoteForm() {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

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
      <div className={`${styles.success} ${styles.light}`} role="status">
        <div className={styles.successIcon} aria-hidden="true">
          <CheckCircle size={28} />
        </div>
        <h3 className={styles.successTitle}>Request sent.</h3>
        <p className={styles.successText}>
          We&apos;ll get back to you within 24 hours. Thanks for choosing {business.name}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={styles.card}>
      {/* Honeypot — keep first, hidden from sighted + screen-reader users */}
      <div aria-hidden="true" className={styles.honeypot}>
        <label>
          Website (leave empty)
          <input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={upd("website")} />
        </label>
      </div>

      <div className={styles.grid2}>
        <input className={styles.input} aria-label="Name" placeholder="Name *" required value={form.name} onChange={upd("name")} />
        <input className={styles.input} aria-label="Phone" placeholder="Phone *" required type="tel" value={form.phone} onChange={upd("phone")} />
      </div>
      <input className={styles.input} aria-label="Email" placeholder="Email *" required type="email" value={form.email} onChange={upd("email")} />
      <select
        className={`${styles.input} ${styles.select}${form.service ? "" : ` ${styles.placeholder}`}`}
        aria-label="Service"
        value={form.service}
        onChange={upd("service")}
      >
        <option value="" disabled>Select a service</option>
        <option>Roof Repairs</option>
        <option>Roof Cleaning</option>
        <option>Roof Restoration</option>
        <option>Other</option>
      </select>
      <textarea
        className={`${styles.input} ${styles.textarea}`}
        aria-label="Message"
        placeholder="Tell us about your roof..."
        rows={4}
        value={form.message}
        onChange={upd("message")}
      />

      {error && (
        <div role="alert" className={styles.alert}>
          <AlertCircle size={16} className={styles.alertIcon} aria-hidden="true" />
          <p className={styles.alertText}>{error}</p>
        </div>
      )}

      <button type="submit" disabled={loading} className={styles.submit}>
        {loading ? "SENDING…" : "SEND QUOTE REQUEST"}
      </button>
      <p className={styles.note}>We respond within 24 hours. Your info is never shared.</p>
    </form>
  );
}
