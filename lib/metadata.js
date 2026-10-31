import { SITE } from "../data/site";

export const OG_IMAGE = {
  url: "/images/og/default.jpg",
  width: 1200,
  height: 630,
  alt: "African Simba Events, Kampala nightlife and official Martell brand ambassador in Uganda",
};

// Builds a page's title, description, canonical URL and link previews.
export function pageMetadata({ title, description, path }) {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE.name,
      type: "website",
      locale: "en_UG",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
