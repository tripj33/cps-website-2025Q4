/**
 * Chicagoland Plumbing Services — Site Config (v1)
 * Single source of truth for business info, service areas, CTAs, payments, SEO, analytics, etc.
 * ⚠️ Replace placeholder values (marked TODO) with your real data.
 */

import servicesJson from "./services.json";

type Service = {
  name: string;
  price: number;
  uuid: string;
  type: string;
};

type Services = {
  water_heater: Service[];
  rodding: Service[];
  sump_pump: Service[];
  ejector_pump: Service[];
};

// Take the first element of the array
const service_prices: Services = (servicesJson as Services[])[0];

export const SITE = {
  // ──────────────────────────────────────────────
  // Business & Contact
  // ──────────────────────────────────────────────
  business: {
    name: "Chicagoland Plumbing Services",
    legalName: "Chicagoland Plumbing Services, Inc.",
    dba: "CPS",
    tagline: "Fast, fair, and done right.",
    foundedYear: 2002,
    // Typical IL plumbing license format—replace with real number(s)
    licenseNumbers: {
      IL: "055-00XXXX", // TODO
      CityOfChicago: null as string | null,
    },
    certifications: [
      "Licensed Plumber (IL)", 
      "Backflow Certified (RPZ)", 
    ],
    associations: [ // TODO: prune to what you actually hold
    ],
    warranties: {
      laborDays: 365,
      partsDays: 365,
      notes:
        "Standard 1-year labor warranty on most residential services; manufacturer warranty applies to parts/equipment. See invoice for specifics.",
    },
    insurance: { licensed: true, bonded: true, insured: true },
  },

  contact: {
    phone: {
        office_1: { 
            display: "(708) 428-4600", // TODO
            raw: "+7084284600",
            href: "tel:+708-428-4600",
            smsRaw: "",
            },
        office_2: {
            display: "(815)-463-1900", // TODO
            raw: "+8154631900",
            href: "tel:+18154631900",
            smsRaw: "",
        }
    },
    email: {
      office: "service@chicagolandplumbing.com", 
    },
    address: {
      line1: "9623 194th Place", // TODO
      line2: null as string | null,
      city: "Mokena",
      region: "IL",
      postalCode: "60448",
      country: "US",
      geo: {
        // Approx Mokena center—replace with your shop coordinates if you want precise maps
        lat: 41.5364349,
        lng: -87.8545944,
      },
    },
    timezone: "America/Chicago",
  },



  // ──────────────────────────────────────────────
  // Web / Branding
  // ──────────────────────────────────────────────
  web: {
    domain: "chicagolandplumbing.com", // TODO
    canonicalBaseUrl: "https://www.chicagolandplumbing.com", // TODO
    customerPortalUrl: null as string | null, // e.g., https://portal.your-crm.com/account
    onlinePaymentUrl: null as string | null, // e.g., https://pay.your-processor.com/cps
    bookingUrl: "#tally-open=w4e1PO&tally-emoji-text=📅&tally-emoji-animation=none&tally-auto-close=0&tally-form-events-forwarding=1",
    assets: {
      logoLight: "/assets/brand/logo-light.svg",
      logoDark: "/assets/brand/logo-dark.svg",
      favicon: "/favicon.svg",
      socialShareImage: "/assets/og/og-default.jpg",
    },
    colors: {
      primary: "#3981f6", // Tailwind sky-500-ish
      secondary: "#0f172a", // slate-900-ish
      accent: "#22c55e", // green-500-ish
    },
  },

  // ──────────────────────────────────────────────
  // Hours & Emergencies
  // ──────────────────────────────────────────────
  hours: {
    standard: {
      // 24h format, local time
      mon: [{ open: "07:00", close: "17:00" }],
      tue: [{ open: "07:00", close: "17:00" }],
      wed: [{ open: "07:00", close: "17:00" }],
      thu: [{ open: "07:00", close: "17:00" }],
      fri: [{ open: "07:00", close: "17:00" }],
      sat: [{ open: "08:00", close: "14:00" }],
      sun: [],
    },
    emergency: {
      enabled: true,
      is24x7: false,
      afterHours: {
        // Example: “on-call” windows
        mon: [{ open: "17:00", close: "21:00" }],
        tue: [{ open: "17:00", close: "21:00" }],
        wed: [{ open: "17:00", close: "21:00" }],
        thu: [{ open: "17:00", close: "21:00" }],
        fri: [{ open: "17:00", close: "21:00" }],
        sat: [{ open: "14:00", close: "20:00" }],
        sun: [{ open: "09:00", close: "17:00" }],
      },
      notes: "Emergency dispatch subject to technician availability and safety.",
    },
    exceptions: [
      // Example holidays—customize as needed
      { date: "2025-01-01", isClosed: true, note: "New Year’s Day" },
      { date: "2025-07-04", isClosed: true, note: "Independence Day" },
      { date: "2025-12-25", isClosed: true, note: "Christmas Day" },
    ],
  },

  // ──────────────────────────────────────────────
  // Services (Residential + Commercial)
  // ──────────────────────────────────────────────
  services: {
    residential: [
      "Emergency Plumbing",
      "Drain Cleaning & Clog Removal",
      "Sewer Line Repair & Replacement",
      "Sewer Camera Inspection",
      "Water Heater Repair & Installation (Tank & Tankless)",
      "Water Softener & Filtration",
      "Pipe Repair & Repiping",
      "Leak Detection",
      "Sump Pump & Battery Backup",
      "Ejector Pump",
      "Toilet, Faucet, Shower & Tub Repair/Install",
      "Garbage Disposal",
      "Gas Line Installation/Repair (appliances, outdoor)",
      "Kitchen & Bath Remodel Rough-In/Finish",
      "Basement Bathroom Additions (ejectors/vents)",
      "Winterization & De-winterization",
    ],
    commercial: [
      "Commercial Drain & Sewer Maintenance",
      "Grease Trap Installation & Pumping Coordination",
      "Backflow Prevention & Annual Testing",
      "Multi-unit Maintenance (HOA, Property Management)",
      "Retail & Restaurant Build-outs",
      "Commercial Water Heaters & Boilers (light commercial)",
      "Sewer Camera Inspections",
      "Tenant Finish & Remodel Support",
      "Preventive Maintenance Programs",
      "Emergency Response (Priority SLA Available)",
    ],
    notes:
      "Service scope may vary by municipality and licensing requirements. Commercial boiler/chiller scope depends on BTU and local code.",
  },
  service_prices,
  // ──────────────────────────────────────────────
  // Service Areas (South/Southwest Suburbs — example set)
  // ──────────────────────────────────────────────
  serviceAreas: {
  headquartersCity: "Mokena, IL",
  radiusMiles: 12,
  counties: ["Will", "Cook"],
  primaryCities: [
    "Mokena",
    "Frankfort",
    "New Lenox",
    "Orland Park",
    "Tinley Park",
    "Homer Glen",
    "Lockport",
    "Palos Park",
    "Palos Heights",
    "Lemont",
    "Oak Forest",
    "Orland Hills",
    "Matteson",
    "Flossmoor",
    "Homewood",
    "Chicago Heights",
    "Frankfort Square",
    "Hazel Crest"
  ],
  zipCodes: [
    "60448", // Mokena
    "60423", // Frankfort
    "60451", // New Lenox
    "60462", "60467", // Orland Park
    "60477", "60487", // Tinley Park
    "60491", // Homer Glen
    "60441", // Lockport
    "60464", // Palos Park
    "60463", // Palos Heights
    "60439", // Lemont
    "60452", // Oak Forest
    "60487", // Orland Hills (shares with Tinley/Homer Glen)
    "60443", // Matteson
    "60422", // Flossmoor
    "60430", // Homewood
    "60411", "60412", // Chicago Heights
    "60423", // Frankfort Square (shares with Frankfort)
    "60429"  // Hazel Crest
  ],
  mapLinks: {
    googleServiceAreaMap:
      "https://www.google.com/maps/search/?api=1&query=Mokena+IL+plumber",
  },
  notes:
    "Coverage depends on schedule, weather, and job complexity. Call to confirm same-day availability.",
},


  // ──────────────────────────────────────────────
  // Pricing & Payments
  // ──────────────────────────────────────────────
  pricing: {
    freeEstimates: true,
    diagnosticFee: 69, // USD — set to null if not applicable
    tripCharge: null as number | null,
    emergencyMultiplier: 1.5, // example
    notes:
      "Pricing depends on access, condition, parts availability, and code requirements. Written estimates provided before work begins.",
  },
  payments: {
    accepted: [
      "cash",
      "check",
      "visa",
      "mastercard",
      "discover",
    ],
    financing: {
      enabled: true,
      providers: [
        {
          name: "GreenSky", // TODO or remove
          link: "https://www.greensky.com/", // TODO
          termsSnippet: "Subject to credit approval. Minimum monthly payments required.",
        },
      ],
      typicalAPRRange: "0%–29.99% APR (promo dependent)",
      notes:
        "Financing availability and terms based on credit approval and program selection. See provider disclosures.",
    },
    onlinePayments: {
      enabled: false,
      url: null as string | null,
    },
    coupons: [
      {
        code: "WELCOME25",
        description: "$25 off any service over $200",
        expires: "2025-12-31",
        newCustomersOnly: true,
      },
    ],
  },

  // ──────────────────────────────────────────────
  // Calls to Action (centralized links/phrases)
  // ──────────────────────────────────────────────
  ctas: {
    primaryPhoneLabel: "Call Now",
    emergencyPhoneLabel: "Emergency Plumbing",
    bookOnlineLabel: "Schedule Online",
    getEstimateLabel: "Free Estimate",
    phoneRaw: "+17085550137",
    scheduleUrl: "/schedule", // or external booking
    estimateUrl: "/free-estimate",
    emergencyUrl: "/emergency-plumber",
    chatEnabled: true,
    chatHint: "Live chat available during business hours.",
  },

  // ──────────────────────────────────────────────
  // Social & Reviews
  // ──────────────────────────────────────────────
  social: {
    facebook: "https://www.facebook.com/chicagolandplumbing/", // TODO
    instagram: "https://www.instagram.com/yourpage", // TODO
    youtube: null as string | null,
    tiktok: null as string | null,
    nextdoor: null as string | null,
    yelp: "https://www.yelp.com/biz/chicagoland-plumbing-services-mokena-2", // TODO
    googleBusinessProfile: "https://share.google/JK3gvxDpQhoHIL8WH", // TODO
    angi: null as string | null,
    thumbtack: null as string | null,
    linkedin: null as string | null,
  },
  reviews: {
    averageRating: 4.9,
    reviewCount: 327,
    platforms: [
      { name: "Google", url: "https://www.google.com/maps/place/Chicagoland+Plumbing+Services/@41.5364349,-87.8545944,886m/data=!3m1!1e3!4m8!3m7!1s0x880e14d4f54d4f1f:0xee4c88f7e57f5635!8m2!3d41.5364349!4d-87.8520141!9m1!1b1!16s%2Fg%2F1w_vnvyn?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D" },
      { name: "Yelp", url: "https://www.yelp.com/biz/chicagoland-plumbing-services-mokena-2" },
      { name: "Facebook", url: "https://www.facebook.com/chicagolandplumbing/reviews" },
    ],
  },

  // ──────────────────────────────────────────────
  // SEO / Schema.org
  // ──────────────────────────────────────────────
  seo: {
    defaultTitle: "Plumber in Mokena IL | Chicagoland Plumbing Services",
    titleTemplate: "%s • CPS Mokena",
    metaDescription:
      "Licensed plumbers in Mokena, IL for drain cleaning, water heaters, sump pumps, sewer repair, and emergency service. Fast, local, and done right.",
    keywords: [
      "plumber Mokena",
      "drain cleaning Mokena",
      "water heater installation",
      "sewer repair",
      "emergency plumber",
      "southwest suburbs plumber",
    ],
    canonicalBaseUrl: "https://www.cpsmokena.com", // keep in sync with web.canonicalBaseUrl
    robots: "index,follow",
    sitemap: { enabled: true, includeImages: true },
    openGraph: {
      type: "website",
      siteName: "Chicagoland Plumbing Services",
      defaultImage: "/assets/og/og-default.jpg",
      twitterCard: "summary_large_image" as
        | "summary"
        | "summary_large_image",
    },
    localBusiness: {
      enabled: true,
      priceRange: "$$",
      hasMap: true,
      areaServed: ["Mokena, IL", "Frankfort, IL", "Orland Park, IL"],
      sameAsFromSocial: true, // pulls from social links above if true
    },
  },

  // ──────────────────────────────────────────────
  // Analytics / Tracking
  // ──────────────────────────────────────────────
  analytics: {
    ga4MeasurementId: null as string | null, // e.g. "G-XXXXXXX"
    gtmContainerId: null as string | null, // e.g. "GTM-XXXXXXX"
    metaPixelId: null as string | null,
    bingUetTag: null as string | null,
    clarityProjectId: null as string | null,
    hotjarSiteId: null as string | null,
    // Useful for building tracked links across the site:
    utmDefaults: {
      source: "website",
      medium: "organic",
      campaign: "brand",
      lead_id: null as string | null, // e.g. "cps-google-my-business"
    },
  },

  // ──────────────────────────────────────────────
  // Navigation
  // ──────────────────────────────────────────────
  nav: {
    main: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Emergency", href: "/emergency-plumber" },
      { label: "Financing", href: "/financing" },
      { label: "Reviews", href: "/reviews" },
      { label: "Service Area", href: "/service-area" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    footer: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Sitemap", href: "/sitemap.xml" },
      { label: "Licenses", href: "/licenses" },
    ],
  },

  // ──────────────────────────────────────────────
  // Legal Pages (centralized for easy linking)
  // ──────────────────────────────────────────────
  legal: {
    privacyUrl: "/privacy",
    termsUrl: "/terms",
    disclosures: [
      "All services subject to local code requirements and permit approvals where applicable.",
      "Coupons/discounts cannot be combined and must be presented at time of estimate.",
      "Trip/diagnostic fees may apply outside standard hours or service radius.",
    ],
  },

  // ──────────────────────────────────────────────
  // Integrations (optional)
  // ──────────────────────────────────────────────
  integrations: {
    crm: { name: "Jobber", enabled: false, link: null as string | null }, // TODO or remove
    forms: { provider: "Jotform", enabled: false, link: null as string | null },
    chat: { provider: "Tawk.to", enabled: true },
    reviewsWidget: { provider: "NiceJob", enabled: false, link: null as string | null },
  },
} as const;

// ──────────────────────────────────────────────
// Small, reusable helpers (import anywhere)
// ──────────────────────────────────────────────

export const telHref = `tel:${SITE.contact.phone.raw}`;
export const smsHref = `sms:${SITE.contact.phone.smsRaw}`;
export const mailto = (to = SITE.contact.email.office, subject?: string, body?: string) => {
  const p = new URLSearchParams();
  if (subject) p.set("subject", subject);
  if (body) p.set("body", body);
  const qs = p.toString();
  return `mailto:${to}${qs ? `?${qs}` : ""}`;
};
export const googleMapsLink = (() => {
  const { line1, line2, city, region, postalCode } = SITE.contact.address;
  const q = [line1, line2, city, region, postalCode].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
})();

// Is the shop open “now”? (naïve check that respects exceptions)
export function isOpenNow(date = new Date()): boolean {
  const tz = SITE.contact.timezone;
  // Convert to local time by constructing in that TZ via Intl (no luxon dependency here)
  const locale = "en-US";
  const parts = new Intl.DateTimeFormat(locale, {
    timeZone: tz,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const to = (type: string) => parts.find(p => p.type === type)?.value!;
  const weekday = to("weekday").toLowerCase().slice(0,3) as keyof typeof SITE.hours.standard;
  const hh = to("hour");
  const mm = to("minute");
  const now = `${hh}:${mm}`;
  const today = `${to("year")}-${to("month")}-${to("day")}`;

  // Holiday/exception hard close
  if (SITE.hours.exceptions.some(e => e.date === today && e.isClosed)) return false;

  const todayBlocks = SITE.hours.standard[weekday] ?? [];
  return todayBlocks.some(block => now >= block.open && now <= block.close);
}
