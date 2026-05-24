import { business } from "@/lib/site.config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${business.url}/sitemap.xml`,
    host: business.url,
  };
}
