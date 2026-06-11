// Reuse the Open Graph image for Twitter/X cards.
// "nodejs" (not "edge") so the image is statically generated at build time.
export const runtime = "nodejs";
export { default, alt, size, contentType } from "./opengraph-image";
