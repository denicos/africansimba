"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiMapPin } from "react-icons/fi";
import { currentTime } from "../lib/currentTime";
import { NIGHTS, VENUES, getHighlight, kampalaNightWeekday, nightLocation } from "../data/nights";

// Pages are built ahead of time, so tonight's night is worked out in the browser, always in Kampala time.
export default function WeekList() {
  const [highlight, setHighlight] = useState(null);

  useEffect(() => {
    setHighlight(getHighlight(kampalaNightWeekday(currentTime())));
  }, []);

  return (
    <ul className="week-list">
      {NIGHTS.map((night) => {
        const isHighlighted = highlight?.slug === night.slug;
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
              </span>
              {emblem && <Image src={emblem} alt="" width={32} height={32} loading="lazy" className="venue-emblem" />}
              {isHighlighted && <span className="week-badge">{highlight.label}</span>}
              <FiChevronRight className="week-arrow" aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
