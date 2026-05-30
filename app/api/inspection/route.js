/**
 * POST /api/inspection — receives the "Book a free inspection" form.
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
  const phone = clean(body.phone);
  const email = clean(body.email);
  const address = clean(body.address);
  const suburb = clean(body.suburb);
  const service = clean(body.service);
  const date = clean(body.date);
  const time = clean(body.time);
  const notes = clean(body.notes);

  if (!name) return bad("Please tell us your name.");
  if (!phone) return bad("Please leave a phone number.");
  if (!email || !EMAIL_RE.test(email)) return bad("Please enter a valid email.");
  if (!address) return bad("Please enter the street address.");
  if (!suburb) return bad("Please enter the suburb.");
  if (!service) return bad("Please select what you need.");
  if (!date) return bad("Please pick a preferred date.");
  if (anyTooLong({ name, phone, email, address, suburb, service, date, time, notes }))
    return bad("Submission too long.");

  const result = await sendLeadEmail({
    subject: `Inspection booking — ${service} (${suburb})`,
    replyTo: email,
    fields: {
      Name: name,
      Phone: phone,
      Email: email,
      Address: `${address}, ${suburb}`,
      Service: service,
      "Preferred date": date,
      "Preferred time": time || "(any)",
      Notes: notes || "(none)",
    },
  });

  if (!result.ok) {
    console.error("[/api/inspection] sendLeadEmail failed:", result.error);
    return NextResponse.json({ ok: false, error: "Could not send your booking right now. Please try again or call us directly." }, { status: 502 });
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
