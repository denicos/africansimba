// Business details used across the whole site. Edit here, not in page code.
// Anything marked TODO is hidden or shows a friendly fallback until it is filled in.

export const SITE = {
  name: "African Simba Events",
  legalName: "AF-Simba Establishments Ltd",
  url: "https://www.africansimbaevents.com",
  title: "African Simba Events | Kampala Nightlife, Martell & Premium Drinks",
  description:
    "Five weekly nights in Kampala by African Simba Events, the official Martell brand ambassador in Uganda. Book a table or order Martell and premium drinks on WhatsApp.",
  phoneDisplay: "+256 748 634 813",
  phoneE164: "+256748634813",
  whatsappNumber: "256748634813",
  email: "admin@africansimbaevents.com",
  address: {
    area: "Kansanga",
    division: "Makindye",
    city: "Kampala",
    country: "Uganda",
    countryCode: "UG",
  },
  // Used when NEXT_PUBLIC_GA_ID is not set, so tracking never stops.
  defaultGaId: "G-R5TEY7FSET",
};

export const SOCIALS = {
  instagram: "https://www.instagram.com/africansimbaevents/",
  tiktok: "https://www.tiktok.com/@africansimbaevents",
  x: "https://x.com/Afsimbaevents",
  snapchat: "", // TODO: Snapchat URL
  whatsappChannel: "", // TODO: WhatsApp channel URL
  facebook: "https://www.facebook.com/p/African-SIMBA-Events-100093632272961/",
  youtube: "https://www.youtube.com/@africansimbaevents",
};

export const MAGNUM = {
  hours: "", // TODO: opening hours, e.g. "Mon-Sat 10am-10pm, Sun 12pm-8pm"
  mapEmbedUrl: "", // TODO: Google Maps "Embed a map" src URL for the Kololo store
};

export const MARTELL_LOGO = {
  src: "/images/partners/martell-logo.png",
  width: 544,
  height: 352,
  alt: "Martell Cognac logo",
};

// Partners section, in display order. Leave logo empty to show the name as text.
export const PARTNERS = [
  { name: "Thrones", label: "Bugolobi", logo: "/logos/thrones.webp", logoWidth: 400, logoHeight: 400 },
  { name: "Nomad", label: "Ggaba Road", logo: "" }, // TODO: Nomad logo
  { name: "Vanquish", label: "Kampala", logo: "" }, // TODO: Vanquish logo
  { name: "Magnum", label: "Our store", logo: "/images/partners/magnum-logo.webp", logoWidth: 315, logoHeight: 89, href: "/magnum" },
];
