import { business } from "@/lib/site.config";

export default function manifest() {
  return {
    name: `${business.name} WA`,
    short_name: business.name,
    description: business.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#1e1e24",
    theme_color: "#1e1e24",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
