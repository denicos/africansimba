"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiChevronRight, FiMapPin } from "react-icons/fi";
import { NIGHTS, getHighlight, kampalaWeekday, nightLocation } from "../data/nights";

// Pages are built ahead of time, so today's night is worked out in the browser.
export default function WeekList() {
  const [highlight, setHighlight] = useState(null);

  useEffect(() => {
    setHighlight(getHighlight(kampalaWeekday()));
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
