import { NIGHTS } from "../data/nights";
import { SITE } from "../data/site";

const PAGES = ["", "/nights", "/drinks", "/magnum", "/gallery", "/contact-us", "/about", "/past-events", "/privacy-policy", "/terms"];

export default function sitemap() {
  const lastModified = new Date();
  return [...PAGES, ...NIGHTS.map((night) => `/nights/${night.slug}`)].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
  }));
}
