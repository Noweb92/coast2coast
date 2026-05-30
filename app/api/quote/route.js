/**
 * POST /api/quote — receives the "Get your free quote" form.
 *
 * Server-side validation, honeypot anti-spam, then forwards a formatted
 * notification email to the business via Resend (see lib/email.js).
 */

import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LEN = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — bots fill `website`. Silently accept to avoid tipping them off.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const service = clean(body.service);
  const message = clean(body.message);

  if (!name) return bad("Please tell us your name.");
  if (!phone) return bad("Please leave a phone number.");
  if (!email || !EMAIL_RE.test(email)) return bad("Please enter a valid email.");
  if (anyTooLong({ name, email, phone, service, message })) return bad("Submission too long.");

  const result = await sendLeadEmail({
    subject: `New quote request — ${service || "General enquiry"}`,
    replyTo: email,
    fields: {
      Name: name,
      Phone: phone,
      Email: email,
      Service: service || "(not specified)",
      Message: message || "(none)",
    },
  });

  if (!result.ok) {
    console.error("[/api/quote] sendLeadEmail failed:", result.error);
    return NextResponse.json({ ok: false, error: "Could not send your request right now. Please try again or call us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function clean(v) {
  return typeof v === "string" ? v.trim() : "";
}
function bad(message) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}
function anyTooLong(obj) {
  return Object.values(obj).some((v) => v && v.length > MAX_LEN);
}
