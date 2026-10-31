import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

import Analytics from "../components/Analytics";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import NavBar from "../components/NavBar";
import ScrollReveal from "../components/ScrollReveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { SITE, SOCIALS } from "../data/site";
import { OG_IMAGE } from "../lib/metadata";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: "/",
    siteName: SITE.name,
    type: "website",
    locale: "en_UG",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [OG_IMAGE.url],
  },
};

export const viewport = {
  themeColor: "#000000",
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  legalName: SITE.legalName,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/logos/simba_white.webp`,
  image: `${SITE.url}${OG_IMAGE.url}`,
  telephone: SITE.phoneE164,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.area,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.division,
    addressCountry: SITE.address.countryCode,
  },
  areaServed: { "@type": "City", name: SITE.address.city },
  sameAs: Object.values(SOCIALS).filter(Boolean),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <JsonLd data={localBusiness} />
        <NavBar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton
          action="general_enquiry"
          item="Floating button"
          message="Hi African Simba, I have a question."
          className="whatsapp-float"
          label="Chat with African Simba Events on WhatsApp"
        />
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  );
}
