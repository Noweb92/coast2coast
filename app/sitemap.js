import { business } from "@/lib/site.config";

export default function sitemap() {
  // Single-page site — the canonical homepage is the only indexable URL.
  // (In-page anchors like #services aren't listed: search engines drop URL
  // fragments, so they'd just look like duplicates of the homepage.)
  // Add real sub-pages here as the site grows.
  return [
    {
      url: business.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
