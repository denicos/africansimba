"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

import LiveBadge from "./LiveBadge";
import MusicNotes from "./MusicNotes";
import VibeLine from "./VibeLine";
import WhatsAppButton from "./WhatsAppButton";
import { NIGHTS, NIGHT_HOURS, nightLocation } from "../data/nights";
import useTonight from "../lib/useTonight";
import { SITE } from "../data/site";
import { nightMessages } from "../lib/whatsapp";

// A soft glow in the colours of tonight's poster, under the dark overlay. Each night's glow fades into the next.
export function HeroGlow() {
  const tonight = useTonight();
  return NIGHTS.map((night) => (
    <span
      key={night.slug}
      className={tonight?.night.slug === night.slug ? "hero-glow is-active" : "hero-glow"}
      style={{ "--glow": night.poster.glow }}
      aria-hidden="true"
    />
  ));
}

// The homepage's tab title. The SEO title in the page's metadata stays as it is.
export function TonightTitle() {
  const tonight = useTonight();

  useEffect(() => {
    if (!tonight) return;
    const original = document.title;
    const lead = tonight.isNextUp ? "Next up" : "Tonight";
    document.title = `${lead}: ${tonight.night.name} at ${tonight.night.venue} | African Simba Events`;
    return () => {
      document.title = original;
    };
  }, [tonight]);

  return null;
}

// Falls back to the venue's logo, then its name, if a poster can't load, so the box is never empty.
function PosterFallback({ night, logo }) {
  return (
    <span className="tonight-card-fallback">
      {logo ? <Image src={logo} alt="" fill sizes="96px" /> : night.venue}
    </span>
  );
}

export default function TonightCard({ venueLogos }) {
  const tonight = useTonight();
  const [isHeld, setIsHeld] = useState(false);
  const [failed, setFailed] = useState(() => new Set());
  // Posters already shown stay in place, under the one on show.
  const shown = useRef(new Set());
  if (tonight) shown.current.add(tonight.night.slug);

  if (!tonight) {
    return (
      <div className="tonight-card is-loading" aria-hidden="true">
        <span className="tonight-card-poster" />
        <span className="tonight-card-info">
          <span />
          <span />
          <span />
        </span>
        <span className="tonight-card-action" />
      </div>
    );
  }

  const { night, isHappening, isNextUp } = tonight;

  return (
    <div className={isHappening ? "tonight-card has-music" : "tonight-card"}>
      {isHappening && <MusicNotes />}
      <Link href={`/nights/${night.slug}`} className="tonight-card-poster" tabIndex={-1} aria-hidden="true">
        {failed.has(night.slug) ? (
          <PosterFallback night={night} logo={venueLogos[night.venue]} />
        ) : (
          NIGHTS.filter((item) => shown.current.has(item.slug) && !failed.has(item.slug)).map((item) => (
            <Image
              key={item.slug}
              src={item.poster.src}
              alt=""
              fill
              sizes="96px"
              quality={75}
              loading="eager"
              className={item.slug === night.slug ? "is-active" : undefined}
              style={item.slug === night.slug && shown.current.size > 1 ? { animation: "soft-fade 0.8s ease" } : undefined}
              onError={() => setFailed((previous) => new Set(previous).add(item.slug))}
            />
          ))
        )}
      </Link>
      <div key={night.slug} className="tonight-card-info is-fading">
        <span className="tonight-card-top">
          <span className="tonight-card-day">{night.weekday}</span>
          <LiveBadge tonight={tonight} />
        </span>
        <Link href={`/nights/${night.slug}`} className="tonight-card-name">
          {night.name}
        </Link>
        <span className="tonight-card-venue">
          {night.venue}, {nightLocation(night)}
        </span>
        {isHappening && <VibeLine night={night} />}
        {isNextUp && (
          <span className="tonight-card-status">
            {night.weekday} from {NIGHT_HOURS.startLabel}
          </span>
        )}
      </div>
      <div className="tonight-card-action">
        <WhatsAppButton
          action="book_table"
          item={night.name}
          message={nightMessages.book(night)}
          variant={null}
          icon={false}
          className={isHeld ? "btn btn-small btn-alternating is-held" : "btn btn-small btn-alternating"}
          label={`Book a table on WhatsApp ${SITE.phoneDisplay}`}
          onPointerDown={() => setIsHeld(true)}
          onPointerUp={() => setIsHeld(false)}
          onPointerCancel={() => setIsHeld(false)}
          onPointerLeave={() => setIsHeld(false)}
        >
          <span className="btn-alternating-book">
            <FaWhatsapp aria-hidden="true" /> Book a Table
          </span>
          <span className="btn-alternating-number">
            <FaWhatsapp aria-hidden="true" /> {SITE.phoneDisplay}
          </span>
        </WhatsAppButton>
      </div>
    </div>
  );
}
