import { ImageResponse } from "next/og";
import { business } from "@/lib/site.config";

// "nodejs" (not "edge") so the image is statically generated at build time.
export const runtime = "nodejs";
export const alt = `${business.name} — Western Australia's premium roofing specialists`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1e1e24 0%, #161619 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
          <div style={{ width: 60, height: 60, border: "3px solid #b8860b", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, color: "#fbbf24" }}>⌂</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 800, color: "#f5f5f4", letterSpacing: 4 }}>
              COAST<span style={{ color: "#fbbf24" }}>2</span>COAST
            </div>
            <div style={{ fontSize: 14, color: "#a8a29e", letterSpacing: 6 }}>ROOFING WA</div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, color: "#f5f5f4", lineHeight: 1.05, letterSpacing: -2 }}>
          Built to <span style={{ color: "#fbbf24", marginLeft: 18 }}>protect.</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#d6d3d1", marginTop: 28, maxWidth: 900 }}>
          Roof repairs, cleaning &amp; restoration across Western Australia.
        </div>
        <div style={{ display: "flex", marginTop: 48, gap: 16 }}>
          {["Licensed & Insured", "Free Quotes", "5.0★ Rated"].map((t) => (
            <div key={t} style={{ display: "flex", padding: "10px 22px", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 100, color: "#fbbf24", fontSize: 22 }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
