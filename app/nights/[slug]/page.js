import Image from "next/image";
import { notFound } from "next/navigation";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";

import JsonLd from "../../../components/JsonLd";
import PageHeader from "../../../components/PageHeader";
import PhotoGallery from "../../../components/PhotoGallery";
import WhatsAppButton from "../../../components/WhatsAppButton";
import { NIGHTS, NIGHT_HOURS, VENUES, getNight, nextDay, nextOccurrence, nightLocation } from "../../../data/nights";
import { HOST_FULL_NAME, SITE } from "../../../data/site";
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
    startTime: NIGHT_HOURS.start,
    endTime: NIGHT_HOURS.end,
  };
  const date = nextOccurrence(night);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: night.name,
    description: `${night.tagline} An official Martell night by African Simba Events in Kampala.`,
    startDate: `${date}T${NIGHT_HOURS.start}:00+03:00`,
    endDate: `${nextDay(date)}T${NIGHT_HOURS.end}:00+03:00`,
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

// Zooms the poster in on the face, which sits at a different spot on each poster.
function avatarStyle({ x, y, zoom }) {
  const origin = (position) => ((zoom * position - 0.5) / (zoom - 1)) * 100;
  return { transform: `scale(${zoom})`, transformOrigin: `${origin(x)}% ${origin(y)}%` };
}

export default function NightPage({ params }) {
  const night = getNight(params.slug);
  if (!night) notFound();

  const photos = listPhotos(
    `images/nights/${night.folder}`,
    (_file, index) => `${night.name} at ${night.venue}, Kampala, photo ${index + 1}`
  );

  const emblem = VENUES[night.venue].emblem;

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
                <strong>Venue</strong>
                <span className="night-venue">
                  {emblem && <Image src={emblem} alt="" width={28} height={28} className="venue-emblem" />}
                  {night.venue}, {nightLocation(night)}
                </span>
              </span>
            </li>
            <li>
              <FiClock aria-hidden="true" />
              <span>
                <strong>Hours</strong> {NIGHT_HOURS.label}
              </span>
            </li>
          </ul>

          <p className="night-martell">
            Official Martell night by African Simba Events, Martell brand ambassador in Uganda
          </p>

          <p className="hosted-by">
            <span className="hosted-by-avatar">
              <Image src={night.poster.src} alt="" fill sizes="128px" quality={70} style={avatarStyle(night.poster.face)} />
            </span>
            Hosted by {HOST_FULL_NAME}
          </p>

          <div className="button-row">
            <WhatsAppButton action="book_table" item={night.name} message={nightMessages.book(night)}>
              Book a Table
            </WhatsAppButton>
            <WhatsAppButton
              action="reserve_bottle"
              item={night.name}
              message={nightMessages.reserve(night)}
            >
              Reserve a Martell Bottle
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="section section-tight" aria-labelledby="photos-heading">
        <div className="container">
          <p className="eyebrow">Gallery</p>
          <h2 id="photos-heading">Photos from {night.name}</h2>
          <PhotoGallery photos={photos} emptyText={`Photos from ${night.name} coming soon`} />
        </div>
      </section>
    </>
  );
}
