"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiChevronRight, FiMapPin } from "react-icons/fi";
import { NIGHTS, getHighlight, kampalaNightWeekday, nightLocation } from "../data/nights";

// TEMPORARY, development only: ?testDate=2026-11-01T02:00 overrides the current time, read as Kampala time.
// Delete this function and its use below when testing is finished.
function currentTime() {
  if (process.env.NODE_ENV === "development") {
    const testDate = new URLSearchParams(window.location.search).get("testDate");
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(testDate)) {
      const date = new Date(`${testDate}:00+03:00`);
      if (!Number.isNaN(date.getTime())) return date;
    }
  }
  return new Date();
}

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
              {isHighlighted && <span className="week-badge">{highlight.label}</span>}
              <FiChevronRight className="week-arrow" aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
