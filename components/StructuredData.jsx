/**
 * Structured data (JSON-LD) for rich results in Google.
 * Server component — renders inert <script> tags, no client JS.
 *
 * Schemas: RoofingContractor (LocalBusiness), Service list, FAQPage,
 * WebSite. All values come from lib/site.config.js.
 */

import { business, services, faqs, areas } from "@/lib/site.config";

export default function StructuredData() {
  const sameAs = [business.social.facebook, business.social.instagram, business.social.google].filter(Boolean);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `${business.url}/#business`,
    name: business.name,
    legalName: business.legalName,
    description: business.longDescription,
    url: business.url,
    telephone: business.phoneE164,
    email: business.email,
    foundingDate: String(business.foundedYear),
    image: `${business.url}/og-image.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street || undefined,
      addressLocality: business.address.suburb,
      addressRegion: business.address.state,
      postalCode: business.address.postcode || undefined,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    areaServed: areas.map((a) => ({ "@type": "City", name: `${a}, Western Australia` })),
    openingHoursSpecification: business.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(business.stats.googleRating),
      reviewCount: String(business.stats.reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Roofing Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.desc },
      })),
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: business.url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
