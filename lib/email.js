/**
 * Server-only email helper — sends lead notifications via Resend.
 *
 * ⚠️  This module imports the Resend SDK and reads server env vars
 *     (RESEND_API_KEY, RESEND_FROM, LEAD_NOTIFY_TO). Do not import it
 *     from any client (`"use client"`) component.
 *
 *  Environment variables (see .env.example):
 *    RESEND_API_KEY   — Resend dashboard → API Keys
 *    RESEND_FROM      — Verified sender, e.g. "Coast2Coast <quotes@coast2coastroofing.com.au>".
 *                       Defaults to "Coast2Coast <onboarding@resend.dev>" (works
 *                       immediately without domain verification, for development).
 *    LEAD_NOTIFY_TO   — Where leads go. Falls back to business.email from site.config.
 */

import { Resend } from "resend";
import { business } from "@/lib/site.config";

const DEFAULT_FROM = "Coast2Coast <onboarding@resend.dev>";

/**
 * Send a lead notification.
 *
 * @param {object} opts
 * @param {string} opts.subject       — Email subject line
 * @param {Record<string,string>} opts.fields — Ordered key/value rows to render
 * @param {string} [opts.replyTo]     — Optional reply-to (typically the lead's email)
 * @returns {Promise<{ok:true,id:string}|{ok:false,error:string}>}
 */
export async function sendLeadEmail({ subject, fields, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Email service is not configured (missing RESEND_API_KEY)." };
  }

  const from = process.env.RESEND_FROM || DEFAULT_FROM;
  const to = process.env.LEAD_NOTIFY_TO || business.email;
  if (!to) {
    return { ok: false, error: "No recipient configured." };
  }

  const resend = new Resend(apiKey);
  const { html, text } = renderLeadEmail({ subject, fields });

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      html,
      text,
      replyTo: replyTo || undefined,
    });
    if (error) return { ok: false, error: error.message || String(error) };
    return { ok: true, id: data?.id || "" };
  } catch (err) {
    return { ok: false, error: err?.message || "Email send failed." };
  }
}

/**
 * Render a clean HTML + plain-text email body from an ordered fields object.
 * Stays inline-styled so all clients render it correctly (no external CSS).
 */
function renderLeadEmail({ subject, fields }) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(([k, v]) => {
      const safeKey = escapeHtml(k);
      const safeVal = escapeHtml(String(v)).replace(/\n/g, "<br/>");
      return `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #eee;color:#78716c;font-size:12px;letter-spacing:.5px;text-transform:uppercase;width:140px;vertical-align:top;">${safeKey}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #eee;color:#1e1e24;font-size:14px;line-height:1.55;">${safeVal}</td>
        </tr>`;
    })
    .join("");

  const html = `<!doctype html>
<html><body style="margin:0;background:#f5f5f4;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:620px;margin:0 auto;padding:32px 16px;">
    <div style="background:#1e1e24;border-radius:14px 14px 0 0;padding:22px 24px;color:#fff;">
      <div style="font-size:11px;letter-spacing:3px;color:#fbbf24;font-weight:600;">NEW LEAD</div>
      <div style="font-size:20px;font-weight:700;margin-top:4px;">${escapeHtml(subject)}</div>
    </div>
    <table role="presentation" style="width:100%;border-collapse:collapse;background:#ffffff;border-radius:0 0 14px 14px;overflow:hidden;border:1px solid #eee;border-top:none;">
      ${rows}
    </table>
    <p style="margin:24px 16px 0;color:#a8a29e;font-size:11px;text-align:center;">
      Sent from ${escapeHtml(business.url)} — reply directly to this email to respond to the customer.
    </p>
  </div>
</body></html>`;

  const text = `${subject}\n\n${Object.entries(fields)
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")}\n\n— Sent from ${business.url}`;

  return { html, text };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
