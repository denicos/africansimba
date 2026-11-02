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
  instagram: "https://www.instagram.com/africansimba_barackeffect",
  tiktok: "https://www.tiktok.com/@africansimba_1",
  x: "https://x.com/African__Simba",
  snapchat: "", // TODO: "African Simba TV" link, once the exact username is confirmed. The icon stays hidden until then.
  whatsappChannel: "", // TODO: WhatsApp channel URL
  facebook: "https://www.facebook.com/p/African-SIMBA-Events-100093632272961/",
  youtube: "https://www.youtube.com/@africansimbaevents",
};

export const MAGNUM = {
  name: "Magnum Liquors",
  location: "Kololo, Kampala",
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
// featured makes the card wider with a gold border. The others take turns getting the gold shine, in this order.
export const PARTNERS = [
  { name: "Martell", label: "Official Brand Ambassador", logo: MARTELL_LOGO.src, logoWidth: MARTELL_LOGO.width, logoHeight: MARTELL_LOGO.height, href: "/drinks", featured: true },
  { name: "Thrones", label: "Bugolobi", logo: "/images/partners/thrones-logo.webp", logoWidth: 400, logoHeight: 400, href: "/nights/bandali-mondays" },
  { name: "Vanquish", label: "Kololo", logo: "/images/partners/vanquish-logo-full.webp", logoWidth: 460, logoHeight: 440, href: "/nights/illicit-saturday" },
  { name: "Nomad", label: "Ggaba Road", logo: "", href: "/nights/swift-fridays" }, // TODO: Nomad logo
  { name: "Magnum", label: "Our store · Kololo", logo: "/images/partners/magnum-logo.webp", logoWidth: 315, logoHeight: 89, href: "/magnum" },
];

// Our resident host, shown in "Meet Your Host" and on the night pages. The posters are set in data/nights.ts.
export const HOST = {
  name: "African Simba",
  title: "aka The Game Changer",
  bio: "African Simba, aka The Game Changer, is the voice and energy behind African Simba Events. Five nights a week he hosts Kampala's biggest nights at Thrones, Nomad and Vanquish – great music, Martell at every table, and a crowd that never sits down.",
  instagram: SOCIALS.instagram,
};

export const HOST_FULL_NAME = `${HOST.name} ${HOST.title}`;
