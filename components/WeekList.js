"use client";

import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiMapPin } from "react-icons/fi";

import Button from "./Button";
import LiveBadge from "./LiveBadge";
import MusicNotes from "./MusicNotes";
import VibeLine from "./VibeLine";
import WhatsAppButton from "./WhatsAppButton";
import { NIGHTS, VENUES, directionsUrl, nightLocation } from "../data/nights";
import useTonight from "../lib/useTonight";
import { nightMessages } from "../lib/whatsapp";

export default function WeekList() {
  const tonight = useTonight();

  return (
    <ul className="week-list">
      {NIGHTS.map((night) => {
        const isHighlighted = tonight?.night.slug === night.slug;
        const isLive = isHighlighted && tonight.isHappening;
        const emblem = VENUES[night.venue].emblem;
        const classes = ["week-card", isHighlighted && "is-highlighted", isLive && "is-live has-music"].filter(Boolean).join(" ");
        return (
          <li key={night.slug}>
            <div className={classes}>
              {isLive && <MusicNotes />}
              <span className="week-day">{night.weekday}</span>
              <span className="week-info">
                <Link href={`/nights/${night.slug}`} className="week-name week-card-link">
                  {night.name}
                </Link>
                <span className="week-venue">
                  <FiMapPin aria-hidden="true" /> {night.venue}, {nightLocation(night)}
                </span>
                {isLive && <VibeLine night={night} className="vibe-line week-vibe" />}
              </span>
              {emblem && <Image src={emblem} alt="" width={32} height={32} loading="lazy" className="venue-emblem" />}
              {isHighlighted && <LiveBadge tonight={tonight} />}
              {isLive && (
                <div className="week-actions">
                  <WhatsAppButton action="book_table" item={night.name} message={nightMessages.vip(night)} size="small">
                    Reserve VIP Table
                  </WhatsAppButton>
                  <Button href={directionsUrl(night)} external variant="outline" size="small">
                    Get Directions
                  </Button>
                </div>
              )}
              <FiChevronRight className="week-arrow" aria-hidden="true" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
