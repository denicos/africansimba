import { notFound } from "next/navigation";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";

import JsonLd from "../../../components/JsonLd";
import PageHeader from "../../../components/PageHeader";
import PhotoGallery from "../../../components/PhotoGallery";
import WhatsAppButton from "../../../components/WhatsAppButton";
import { NIGHTS, getNight, nextOccurrence, nightLocation } from "../../../data/nights";
import { SITE } from "../../../data/site";
import { OG_IMAGE, pageMetadata } from "../../../lib/metadata";
import { listPhotos } from "../../../lib/photos";
import { nightMessages } from "../../../lib/whatsapp";

export const dynamicParams = false;

export function generateStaticParams() {
  return NIGHTS.map((night) => ({ slug: night.slug }));
}

export function generateMetadata({ params }) {
  const night = getNight(params.slug);
  if (!night) return {};
  return pageMetadata({
    title: `${night.name} at ${night.venue}, Kampala | African Simba Events`,
    description: `${night.name}: every ${night.weekday} at ${night.venue}, ${nightLocation(night)}. An official Martell night by African Simba Events. Book a table on WhatsApp.`,
    path: `/nights/${night.slug}`,
  });
}

function eventJsonLd(night) {
  const schedule = {
    "@type": "Schedule",
    repeatFrequency: "P1W",
    byDay: `https://schema.org/${night.weekday}`,
    scheduleTimezone: "Africa/Kampala",
    ...(night.startTime && { startTime: night.startTime }),
  };
  const date = nextOccurrence(night);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: night.name,
    description: `${night.tagline} An official Martell night by African Simba Events in Kampala.`,
    startDate: night.startTime ? `${date}T${night.startTime}:00+03:00` : date,
    eventSchedule: schedule,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: `${SITE.url}${OG_IMAGE.url}`,
    url: `${SITE.url}/nights/${night.slug}`,
    location: {
      "@type": "Place",
      name: night.venue,
      address: {
        "@type": "PostalAddress",
        ...(night.area && { streetAddress: night.area }),
        addressLocality: "Kampala",
        addressCountry: "UG",
      },
    },
    organizer: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

export default function NightPage({ params }) {
  const night = getNight(params.slug);
  if (!night) notFound();

  const photos = listPhotos(
    `images/nights/${night.folder}`,
    (_file, index) => `${night.name} at ${night.venue}, Kampala, photo ${index + 1}`
  );

  return (
    <>
      <JsonLd data={eventJsonLd(night)} />
      <PageHeader eyebrow={`Every ${night.weekday}`} title={`${night.name} at ${night.venue}`} lead={night.tagline} />

      <section className="section section-tight">
        <div className="container">
          <ul className="night-details">
            <li>
              <FiCalendar aria-hidden="true" />
              <span>
                <strong>Day</strong> Every {night.weekday}
              </span>
            </li>
            <li>
              <FiMapPin aria-hidden="true" />
              <span>
                <strong>Venue</strong> {night.venue}, {nightLocation(night)}
              </span>
            </li>
            <li>
              <FiClock aria-hidden="true" />
              <span>
                <strong>Starts</strong> {night.startTime || "Time to be confirmed, ask us on WhatsApp"}
              </span>
            </li>
          </ul>

          <p className="night-martell">
            Official Martell night by African Simba Events, Martell brand ambassador in Uganda
          </p>

          <div className="button-row">
            <WhatsAppButton action="book_table" item={night.name} message={nightMessages.book(night)}>
              Book a Table
            </WhatsAppButton>
            <WhatsAppButton
              action="reserve_bottle"
              item={night.name}
              message={nightMessages.reserve(night)}
              className="btn btn-outline-gold"
            >
              Reserve a Martell Bottle
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="section section-tight" aria-labelledby="photos-heading">
        <div className="container">
          <h2 id="photos-heading">Photos from {night.name}</h2>
          <PhotoGallery photos={photos} emptyText={`Photos from ${night.name} coming soon`} />
        </div>
      </section>
    </>
  );
}
