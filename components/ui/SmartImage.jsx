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
 * Inline styles here are structural/dynamic by design: callers position the
 * frame (`style`) and tune the photo (`imgStyle`, `overlayStrength`) per use.
 */
export default function SmartImage({
  image,
  style = {},
  imgStyle = {},
  overlay = false,
  overlayStrength = 0.45,
  priority = false,
  sizes = "100vw",
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
          style={{ objectFit: "cover", ...imgStyle }}
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
