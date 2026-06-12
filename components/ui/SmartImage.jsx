"use client";

import { useState } from "react";
import Image from "next/image";
import { C } from "@/lib/theme";

/**
 * SmartImage — resilient image with graceful brand fallback.
 *
 * Wraps next/image (responsive srcset, automatic AVIF/WebP, lazy by default)
 * for real bandwidth savings on mobile. If the photo fails to load (404,
 * network, blocked CDN), it swaps to a branded gradient so the layout always
 * looks intentional. Use `overlay` to darken photos for text. `priority`
 * eager-loads above-the-fold images (the hero); `sizes` tells the browser how
 * wide the image renders so it can pick the smallest sufficient source.
 *
 * `grade` (default true) applies the brand colour grade — one cinematic
 * treatment shared by every photo on the site (slightly lifted contrast,
 * tamed saturation, warm gold-tinted shadows via a soft-light wash) so
 * mixed-source photography reads as a single art-directed shoot.
 *
 * Inline styles here are structural/dynamic by design: callers position the
 * frame (`style`) and tune the photo (`imgStyle`, `overlayStrength`) per use.
 */
const GRADE_FILTER = "saturate(0.88) contrast(1.07) brightness(0.99) sepia(0.06)";
const GRADE_WASH =
  "linear-gradient(160deg, rgba(184,134,11,0.16) 0%, rgba(30,30,36,0.12) 55%, rgba(22,22,25,0.22) 100%)";

export default function SmartImage({
  image,
  style = {},
  imgStyle = {},
  overlay = false,
  overlayStrength = 0.45,
  priority = false,
  sizes = "100vw",
  grade = true,
  children,
}) {
  const [failed, setFailed] = useState(false);
  const fallback = image?.fallback || C.darkSoft;

  return (
    <div style={{ position: "relative", overflow: "hidden", background: fallback, ...style }}>
      {!failed && image?.src && (
        <Image
          src={image.src}
          alt={image.alt || ""}
          fill
          sizes={sizes}
          priority={priority}
          quality={72}
          onError={() => setFailed(true)}
          style={{
            objectFit: "cover",
            // Art-directed crop focus from lib/images.js (optional)
            ...(image.position ? { objectPosition: image.position } : {}),
            ...(grade ? { filter: GRADE_FILTER } : {}),
            ...imgStyle,
          }}
        />
      )}
      {!failed && image?.src && grade && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: GRADE_WASH,
            mixBlendMode: "soft-light",
          }}
        />
      )}
      {failed && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${fallback}, ${C.dark})`,
            opacity: 0.95,
          }}
        />
      )}
      {overlay && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, rgba(22,22,25,${overlayStrength + 0.25}), rgba(22,22,25,${overlayStrength}))`,
          }}
        />
      )}
      {children}
    </div>
  );
}

export { SmartImage };
