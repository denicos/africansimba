"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

import WhatsAppButton from "./WhatsAppButton";
import { NIGHTS, NIGHT_HOURS, nightLocation } from "../data/nights";
import useTonight from "../lib/useTonight";
import { SITE } from "../data/site";
import { nightMessages } from "../lib/whatsapp";

const MINUTE_MS = 60 * 1000;

function formatCountdown(ms) {
  const minutes = Math.ceil(ms / MINUTE_MS);
  const hours = Math.floor(minutes / 60);
  return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}

function liveDetail({ night, isHappening, isNextUp, msUntilStart }) {
  if (isHappening) return `Ends ${NIGHT_HOURS.endLabel}`;
  if (isNextUp) return `Starts ${night.weekday} ${NIGHT_HOURS.startLabel}`;
  return `Starts in ${formatCountdown(msUntilStart)}`;
}

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

export default function TonightCard() {
  const tonight = useTonight();
  const [isHeld, setIsHeld] = useState(false);
  // Posters already shown stay in place, so the new one can crossfade over the old one.
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

  const { night, badge } = tonight;

  return (
    <div className="tonight-card">
      <Link href={`/nights/${night.slug}`} className="tonight-card-poster" tabIndex={-1} aria-hidden="true">
        {NIGHTS.filter((item) => shown.current.has(item.slug)).map((item) => (
          <Image
            key={item.slug}
            src={item.poster.src}
            alt=""
            fill
            sizes="96px"
            quality={75}
            className={item.slug === night.slug ? "is-active" : undefined}
          />
        ))}
      </Link>
      <div key={night.slug} className="tonight-card-info is-fading">
        <span className="tonight-card-top">
          <span className="tonight-card-day">{night.weekday}</span>
          <span key={badge} className="week-badge">
            {badge}
          </span>
        </span>
        <Link href={`/nights/${night.slug}`} className="tonight-card-name">
          {night.name}
        </Link>
        <span className="tonight-card-venue">
          {night.venue}, {nightLocation(night)} · {NIGHT_HOURS.label}
        </span>
        <span className="tonight-card-status">{liveDetail(tonight)}</span>
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
