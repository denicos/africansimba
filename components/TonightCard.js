"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NIGHT_HOURS, nightLocation, nightStatus } from "../data/nights";
import { currentTime } from "../lib/currentTime";

const REFRESH_MS = 30 * 1000;
const MINUTE_MS = 60 * 1000;

function formatCountdown(ms) {
  const minutes = Math.ceil(ms / MINUTE_MS);
  const days = Math.floor(minutes / (24 * 60));
  const hours = Math.floor(minutes / 60) % 24;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}

// Pages are built ahead of time, so this is worked out in the browser, always in Kampala time.
// The empty card holds its space until then, so the hero doesn't jump.
export default function TonightCard() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const refresh = () => setStatus(nightStatus(currentTime()));
    refresh();
    const timer = setInterval(refresh, REFRESH_MS);
    return () => clearInterval(timer);
  }, []);

  if (!status) return <div className="tonight-card" style={{ visibility: "hidden" }} aria-hidden="true" />;

  const { night, label, isHappening, msUntilStart } = status;

  return (
    <Link href={`/nights/${night.slug}`} className="tonight-card">
      <span className="tonight-card-top">
        <span className="week-day">{night.weekday}</span>
        <span className="week-badge">{label}</span>
      </span>
      <span className="tonight-card-name">{night.name}</span>
      <span className="tonight-card-venue">
        {night.venue}, {nightLocation(night)} · {NIGHT_HOURS.label}
      </span>
      <span className={isHappening ? "tonight-card-status is-happening" : "tonight-card-status"}>
        {isHappening ? "Happening now" : `Starts in ${formatCountdown(msUntilStart)}`}
      </span>
    </Link>
  );
}
