"use client";

import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiClock, FiMapPin } from "react-icons/fi";
import { NIGHTS, NIGHT_HOURS, VENUES, nightLocation } from "../data/nights";
import useTonight from "../lib/useTonight";

export default function WeekList() {
  const tonight = useTonight();

  return (
    <ul className="week-list">
      {NIGHTS.map((night) => {
        const isHighlighted = tonight?.night.slug === night.slug;
        const emblem = VENUES[night.venue].emblem;
        return (
          <li key={night.slug}>
            <Link href={`/nights/${night.slug}`} className={isHighlighted ? "week-card is-highlighted" : "week-card"}>
              <span className="week-day">{night.weekday}</span>
              <span className="week-info">
                <span className="week-name">{night.name}</span>
                <span className="week-venue">
                  <FiMapPin aria-hidden="true" /> {night.venue}, {nightLocation(night)}
                </span>
                <span className="week-venue">
                  <FiClock aria-hidden="true" /> {NIGHT_HOURS.label}
                </span>
              </span>
              {emblem && <Image src={emblem} alt="" width={32} height={32} loading="lazy" className="venue-emblem" />}
              {isHighlighted && (
                <span key={tonight.badge} className="week-badge is-fading">
                  {tonight.badge}
                </span>
              )}
              <FiChevronRight className="week-arrow" aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
