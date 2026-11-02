"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import Button from "./Button";
import Lightbox from "./Lightbox";
import LiveBadge from "./LiveBadge";
import MusicNotes from "./MusicNotes";
import VibeLine from "./VibeLine";
import WhatsAppButton from "./WhatsAppButton";
import { NIGHTS, VENUES, nightLocation } from "../data/nights";
import { HOST_FULL_NAME, MARTELL_LOGO } from "../data/site";
import useTonight from "../lib/useTonight";
import useRotation from "../lib/useRotation";
import { nightMessages } from "../lib/whatsapp";

const COUNT = NIGHTS.length;
const HALF = Math.floor(COUNT / 2);
const SWIPE_START = 6;
const SWIPE_DISTANCE = 40;
const RETURN_TO_LIVE_MS = 8000;
const HOLD_MS = 500;
const POSTER_SIZES = "(max-width: 899px) 85vw, 400px";

const posterAlt = (night) => `${night.name} poster with our host at ${night.venue}`;
const POSTERS = NIGHTS.map((night) => ({ src: night.poster.src, alt: posterAlt(night) }));

// How many places a poster is from the centre: -2 and -1 on the left, 1 and 2 on the right.
const offsetFrom = (index, active) => ((index - active + COUNT + HALF) % COUNT) - HALF;
const poseName = (offset) => (offset === 0 ? "0" : `${offset < 0 ? "m" : "p"}${Math.abs(offset)}`);

function DetailsPanel({ night, tonight, venueLogo, isLive, actions }) {
  const isTonight = tonight?.night.slug === night.slug;
  const logo = VENUES[night.venue].emblem || venueLogo;
  const isLiveNow = isTonight && tonight.isHappening;

  return (
    <div className={isLiveNow ? "host-panel has-music" : "host-panel"}>
      {isLiveNow && <MusicNotes />}
      <div aria-live={isLive ? "polite" : "off"}>
        <div key={night.slug}>
          <div className="host-panel-top host-step" style={{ "--step": 0 }}>
            <span className="host-panel-day">{night.weekday}</span>
            {isTonight && <LiveBadge tonight={tonight} />}
          </div>
          <h3 className="host-panel-title host-step" style={{ "--step": 1 }}>
            {night.name}
          </h3>
          <div className="host-panel-venue host-step" style={{ "--step": 2 }}>
            {logo ? (
              <span className="host-venue-logo">
                <Image src={logo} alt={`${night.venue} logo`} fill sizes="72px" loading="lazy" />
              </span>
            ) : (
              <span className="host-venue-badge">{night.venue}</span>
            )}
            <span>
              {night.venue}, {nightLocation(night)}
            </span>
          </div>
          {isLiveNow && (
            <div className="host-step" style={{ "--step": 2 }}>
              <VibeLine night={night} className="vibe-line host-panel-vibe" />
            </div>
          )}
          <div className="host-panel-meta host-step" style={{ "--step": 2 }}>
            <p>Hosted by {HOST_FULL_NAME}</p>
            <p className="host-panel-martell">
              <Image src={MARTELL_LOGO.src} alt="" width={MARTELL_LOGO.width} height={MARTELL_LOGO.height} sizes="40px" quality={90} loading="lazy" />
              In partnership with Martell
            </p>
          </div>
        </div>
      </div>
      {/* Kept in place when the night changes, so keyboard focus is never lost. Its fade-in is started in CoverFlow. */}
      <div ref={actions} className="button-row">
        <WhatsAppButton action="book_table" item={night.name} message={nightMessages.book(night)}>
          Book a Table
        </WhatsAppButton>
        <Button href={`/nights/${night.slug}`}>
          View night
        </Button>
      </div>
    </div>
  );
}

export default function CoverFlow({ venueLogos }) {
  const container = useRef(null);
  const actions = useRef(null);
  const row = useRef(null);
  const swipe = useRef(null);
  const wasSwiped = useRef(false);
  const scrolledTo = useRef(null);
  const scrollTimer = useRef(null);
  const isFirstChange = useRef(true);

  const { paused, reducedMotion, handlers, setPause } = useRotation(container);
  const [active, setActive] = useState(0);
  const [wraps, setWraps] = useState({});
  const [start, setStart] = useState(null);
  const tonight = useTonight();
  const [isSettled, setIsSettled] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lastLook, setLastLook] = useState(0);

  const night = NIGHTS[active];

  // Starts on tonight's night, and turns to it by itself at 6 PM and 6 AM if the page is left open.
  const tonightIndex = NIGHTS.findIndex((item) => item.slug === tonight?.night.slug);
  const isLiveNight = Boolean(tonight?.isHappening);
  useEffect(() => {
    if (tonightIndex < 0) return;
    if (start === null) {
      setActive(tonightIndex);
      setStart(tonightIndex);
      const frame = requestAnimationFrame(() => requestAnimationFrame(() => setIsSettled(true)));
      return () => cancelAnimationFrame(frame);
    }
    goTo(tonightIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tonightIndex, isLiveNight]);

  // While a night is live its poster stays in front. Visitors can look at the others, then it comes back.
  useEffect(() => {
    if (!isLiveNight || active === tonightIndex || paused || isLightboxOpen) return;
    const timer = setTimeout(() => goTo(tonightIndex), RETURN_TO_LIVE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLiveNight, active, tonightIndex, paused, isLightboxOpen, lastLook]);

  useEffect(() => setPause("lightbox", isLightboxOpen), [isLightboxOpen, setPause]);

  // Fades the buttons in last, after the night's details.
  useEffect(() => {
    if (!isSettled || reducedMotion) return;
    if (isFirstChange.current) {
      isFirstChange.current = false;
      return;
    }
    actions.current?.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 550, delay: 270, easing: "ease", fill: "backwards" }
    );
  }, [active, isSettled, reducedMotion]);

  // Reduced motion: keeps the chosen poster centred in the row, unless the visitor scrolled to it themselves.
  useEffect(() => {
    if (!reducedMotion || !row.current || scrolledTo.current === active) return;
    const item = row.current.children[active];
    row.current.scrollTo({ left: item.offsetLeft - (row.current.clientWidth - item.offsetWidth) / 2 });
  }, [active, reducedMotion]);

  const goTo = (next) => {
    const index = (next + COUNT) % COUNT;
    if (index === active) return;
    const crossing = {};
    NIGHTS.forEach((_, i) => {
      const from = offsetFrom(i, active);
      const to = offsetFrom(i, index);
      if (Math.abs(to - from) > HALF) crossing[i] = { from, direction: to > from ? "left" : "right" };
    });
    scrolledTo.current = null;
    setWraps(crossing);
    setActive(index);
  };

  // A visitor choosing a night, which restarts the wait before a live night's poster comes back.
  const lookAt = (next) => {
    setLastLook(Date.now());
    goTo(next);
  };

  const handleRowScroll = () => {
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const view = row.current;
      if (!view) return;
      const middle = view.scrollLeft + view.clientWidth / 2;
      const items = Array.from(view.children);
      const distance = (item) => Math.abs(item.offsetLeft + item.offsetWidth / 2 - middle);
      const nearest = items.indexOf(items.reduce((best, item) => (distance(item) < distance(best) ? item : best)));
      scrolledTo.current = nearest;
      setActive(nearest);
      setLastLook(Date.now());
    }, 120);
  };

  const handleKeyDown = (event) => {
    if (isLightboxOpen) return;
    if (event.key === "ArrowRight") lookAt(active + 1);
    if (event.key === "ArrowLeft") lookAt(active - 1);
  };

  const handlePointerDown = (event) => {
    wasSwiped.current = false;
    swipe.current = { startX: event.clientX, pointerId: event.pointerId, startTime: event.timeStamp };
  };

  const handlePointerMove = (event) => {
    if (!swipe.current || wasSwiped.current) return;
    if (Math.abs(event.clientX - swipe.current.startX) < SWIPE_START) return;
    wasSwiped.current = true;
    event.currentTarget.setPointerCapture(swipe.current.pointerId);
  };

  const handlePointerUp = (event) => {
    if (!swipe.current) return;
    const distance = event.clientX - swipe.current.startX;
    // Holding a poster only pauses the rotation, so letting go shouldn't open it.
    if (event.timeStamp - swipe.current.startTime > HOLD_MS) wasSwiped.current = true;
    swipe.current = null;
    if (Math.abs(distance) >= SWIPE_DISTANCE) lookAt(active + (distance < 0 ? 1 : -1));
  };

  const handleClickCapture = (event) => {
    if (!wasSwiped.current) return;
    wasSwiped.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const posterClick = (index) => {
    if (index === active) setIsLightboxOpen(true);
    else lookAt(index);
  };

  const panel = (
    <DetailsPanel
      night={night}
      tonight={tonight}
      venueLogo={venueLogos[night.venue]}
      isLive={isSettled && (paused || reducedMotion)}
      actions={actions}
    />
  );
  const lightbox = isLightboxOpen && (
    <Lightbox photos={POSTERS} index={active} onChange={lookAt} onClose={() => setIsLightboxOpen(false)} />
  );

  if (reducedMotion) {
    return (
      <div ref={container} className="host-layout" onKeyDown={handleKeyDown}>
        <div ref={row} className="cf-row" onScroll={handleRowScroll}>
          {NIGHTS.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className="cf-row-item"
              style={{ aspectRatio: `${item.poster.width} / ${item.poster.height}` }}
              aria-current={index === active || undefined}
              onClick={() => posterClick(index)}
            >
              <Image src={item.poster.src} alt={posterAlt(item)} fill sizes={POSTER_SIZES} quality={80} loading="lazy" />
            </button>
          ))}
        </div>
        {panel}
        {lightbox}
      </div>
    );
  }

  return (
    <div
      ref={container}
      className={paused ? "host-layout cf-paused" : "host-layout"}
      role="group"
      aria-roledescription="carousel"
      aria-label="Our five weekly nights"
      onKeyDown={handleKeyDown}
      {...handlers}
    >
      <div>
        <div className="cf-viewport">
          <div
            className={isSettled ? "cf-stage" : "cf-stage is-settling"}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              swipe.current = null;
            }}
            onClickCapture={handleClickCapture}
          >
            {NIGHTS.map((item, index) => {
              const offset = offsetFrom(index, active);
              const isActive = offset === 0;
              const wrap = wraps[index];
              return (
                <div
                  key={item.slug}
                  className={wrap ? `cf-card is-wrap-${wrap.direction}` : "cf-card"}
                  data-offset={offset}
                  style={{
                    aspectRatio: `${item.poster.width} / ${item.poster.height}`,
                    ...(wrap && { "--cf-from": `var(--cf-pose-${poseName(wrap.from)})` }),
                  }}
                  onAnimationEnd={() => setWraps((previous) => (previous[index] ? { ...previous, [index]: undefined } : previous))}
                >
                  <button
                    type="button"
                    className="cf-face"
                    tabIndex={isActive ? undefined : -1}
                    aria-hidden={!isActive || undefined}
                    aria-label={`${posterAlt(item)}. Open full screen`}
                    onClick={() => posterClick(index)}
                  >
                    <Image
                      src={item.poster.src}
                      alt={posterAlt(item)}
                      fill
                      sizes={POSTER_SIZES}
                      quality={80}
                      loading={index === start ? "eager" : "lazy"}
                      draggable={false}
                    />
                  </button>
                  <div className="cf-reflection" aria-hidden="true">
                    <span>
                      <Image src={item.poster.src} alt="" fill sizes={POSTER_SIZES} quality={80} loading="lazy" draggable={false} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cf-controls">
          {isLiveNight ? (
            <p className="cf-live-label">Live now</p>
          ) : (
            <div className="cf-progress">
              <span key={active} onAnimationEnd={() => goTo(active + 1)} />
            </div>
          )}
          <div className="cf-buttons">
            <button type="button" className="cf-arrow" onClick={() => lookAt(active - 1)} aria-label="Previous night">
              <FiChevronLeft aria-hidden="true" />
            </button>
            {NIGHTS.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                className="cf-dot"
                data-label={item.weekday.slice(0, 3).toUpperCase()}
                aria-label={`Show ${item.name}, ${item.weekday}`}
                aria-current={index === active || undefined}
                onClick={() => lookAt(index)}
              >
                <span />
              </button>
            ))}
            <button type="button" className="cf-arrow" onClick={() => lookAt(active + 1)} aria-label="Next night">
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {panel}
      {lightbox}
    </div>
  );
}
