/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────
 *  Every piece of business information on the site is read from this file:
 *  the header, footer, contact section, structured data (SEO), sitemap, etc.
 *
 *  To update the live site's business details, edit ONLY this file.
 *
 *  ⚠️  PLACEHOLDER VALUES are marked with `TODO`. Replace them with the real
 *      Coast2Coast details before going live, then redeploy.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const business = {
  name: "Coast2Coast Roofing",
  legalName: "Coast2Coast Roofing WA", // TODO: confirm registered legal entity name
  tagline: "Western Australia's Premium Roofing Specialists",
  shortDescription:
    "Roof repairs, cleaning and restoration across Western Australia — from Perth to the Pilbara.",
  longDescription:
    "Coast2Coast Roofing is Western Australia's premium roofing specialist. We deliver roof repairs, high-pressure cleaning and full restorations with precision craftsmanship. Licensed, insured and trusted — from Perth to the Pilbara, coast to coast.",

  // ── Contact ──
  phoneDisplay: "0499 702 963",
  phoneE164: "+61499702963", // international format for tel: links
  email: "info@coast2coastroofing.com.au", // TODO: confirm real email

  // ── Location / NAP (TODO) ──
  address: {
    street: "", // TODO e.g. "Unit 3, 25 Walters Drive"
    suburb: "Perth", // TODO e.g. "Osborne Park"
    state: "WA",
    postcode: "", // TODO e.g. "6017"
    region: "Western Australia",
    country: "AU",
  },
  // Geo for LocalBusiness schema + maps (TODO: use the real depot coordinates)
  geo: { lat: -31.9523, lng: 115.8613 }, // Perth CBD placeholder

  // ── Credentials (TODO) ──
  abn: "XX XXX XXX XXX", // TODO
  builderLicence: "", // TODO — WA building registration / licence number

  // ── Hours ──
  hours: {
    weekdays: "Mon–Fri: 7:00 AM – 5:00 PM",
    saturday: "Sat: 8:00 AM – 2:00 PM",
    sunday: "Sun: Closed",
  },
  // Machine-readable hours for schema.org openingHoursSpecification
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:00" },
    { days: ["Saturday"], opens: "08:00", closes: "14:00" },
  ],

  // ── Social (TODO: add real profile URLs, leave "" to hide) ──
  social: {
    facebook: "", // TODO
    instagram: "", // TODO
    google: "", // TODO — Google Business Profile URL
  },

  // ── Domain / canonical (TODO: confirm final domain) ──
  domain: "coast2coastroofing.com.au", // TODO
  url: "https://coast2coastroofing.com.au", // TODO

  // ── Social proof figures (used in hero counters + schema) ──
  stats: {
    roofsCompleted: 500,
    satisfactionRate: 100,
    googleRating: 5.0,
    reviewCount: 100,
  },
};

export const services = [
  {
    id: "repairs",
    icon: "Wrench",
    title: "Roof Repairs",
    desc: "From minor leaks to major storm damage. Fast response, quality materials, lasting results.",
    features: ["Leak detection & repair", "Storm damage restoration", "Tile & metal roof fixes", "Fast turnaround"],
  },
  {
    id: "cleaning",
    icon: "Droplets",
    title: "Roof Cleaning",
    desc: "High-pressure cleaning that strips years of grime, moss and lichen. Your roof, reborn.",
    features: ["High-pressure washing", "Moss & lichen removal", "Surface treatment", "Eco-friendly products"],
  },
  {
    id: "restoration",
    icon: "Home",
    title: "Roof Restoration",
    desc: "Complete makeovers — repair, clean, re-coat and seal. A fraction of replacement cost.",
    features: ["Full inspection & report", "Re-pointing & re-bedding", "Protective coating", "Colour restoration"],
  },
];

export const testimonials = [
  { name: "Sarah Mitchell", location: "Perth", rating: 5, text: "Coast2Coast fixed our roof after a nasty storm. Out the next day, incredible job. Can't recommend them enough." },
  { name: "James Torres", location: "Mandurah", rating: 5, text: "Entire roof cleaned and recoated. Looks absolutely brand new. Professional, tidy, great value for money." },
  { name: "Linda & Steve K.", location: "Bunbury", rating: 5, text: "Got quotes from 4 companies. Coast2Coast was the most thorough and the most reasonable. Five stars." },
  { name: "Mark Davidson", location: "Joondalup", rating: 5, text: "Reliable, professional and tidy from start to finish. The team kept us informed the whole way through. Absolute legends." },
];

export const areas = [
  "Perth Metro", "Fremantle", "Joondalup", "Rockingham", "Mandurah", "Bunbury",
  "Geraldton", "Kalgoorlie", "Albany", "Busselton", "Karratha", "Broome",
];

export const processSteps = [
  { num: "01", icon: "Shield", title: "Free Inspection", desc: "We visit your property, assess the roof condition, and identify all issues — no charge, no obligation." },
  { num: "02", icon: "Calculator", title: "Detailed Quote", desc: "You receive a transparent, itemised quote within 24 hours. No hidden costs, no surprises." },
  { num: "03", icon: "Wrench", title: "Expert Execution", desc: "Our licensed team carries out the work with premium materials and precision craftsmanship." },
  { num: "04", icon: "Award", title: "Final Walkthrough", desc: "We walk you through the completed work, clean up, and hand over your written quality guarantee." },
];

export const faqs = [
  { q: "How quickly can you get to my property?", a: "For standard inspections, we book within 1-3 business days in the Perth metro area. Regional WA jobs are scheduled based on location — we'll give you an exact timeline when you get in touch." },
  { q: "Do you offer warranties on your work?", a: "Yes. Every job comes with a written quality guarantee. Repairs are guaranteed for 12 months, restorations for up to 10 years depending on scope, and all materials carry their manufacturer's warranty on top." },
  { q: "What types of roofs do you work on?", a: "All of them. Tile (concrete and terracotta), Colorbond, metal, tin, slate, and flat roofs. If it's a roof, we fix it, clean it, and restore it." },
  { q: "How much does a roof restoration cost?", a: "It depends on roof size, condition, and material. A typical Perth home ranges from $3,500 to $8,000 for a full restoration. Book a free inspection for an exact, itemised quote." },
  { q: "Are you licensed and insured?", a: "Fully. We hold all required WA building licences and carry comprehensive public liability and workers' compensation insurance. Certificates available on request." },
  { q: "Do you service regional Western Australia?", a: "Absolutely. We regularly work in Bunbury, Geraldton, Kalgoorlie, Albany, Karratha, Broome, and everywhere in between. Regional jobs are quoted with travel included — no hidden extras." },
];

export const trustBadges = [
  { icon: "BadgeCheck", title: "Fully Licensed", desc: "WA Building Licence holder" },
  { icon: "Shield", title: "Fully Insured", desc: "Public liability & workers comp" },
  { icon: "FileCheck", title: "Written Guarantee", desc: "On every job, every time" },
  { icon: "Users", title: "Locally Owned", desc: "Proudly WA owned & operated" },
  { icon: "Star", title: "5.0 Google Rating", desc: "100+ verified five-star reviews" },
  { icon: "Calculator", title: "Free Quotes", desc: "No-obligation inspection & quote" },
];

// Primary navigation (label → in-page anchor)
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Areas", href: "#areas" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];
