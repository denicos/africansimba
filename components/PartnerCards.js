"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PARTNERS } from "../data/site";
import useTonight from "../lib/useTonight";

const MAX_TILT = 8;
const DRAG_THRESHOLD = 6;
const MARQUEE_QUERY = "(max-width: 1099px) and (prefers-reduced-motion: no-preference)";
const TILT_QUERY = "(min-width: 1100px) and (hover: hover) and (prefers-reduced-motion: no-preference)";

function shineOrder(partner) {
  return PARTNERS.filter((item) => !item.featured).indexOf(partner);
}

function PartnerCard({ partner, index, hidden }) {
  const frame = useRef(null);
  const tonight = useTonight();
  const isTonight = tonight?.night.venue === partner.name;

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse" || !window.matchMedia(TILT_QUERY).matches) return;
    const card = event.currentTarget;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const box = card.getBoundingClientRect();
      const turnY = ((clientX - box.left) / box.width - 0.5) * 2 * MAX_TILT;
      const turnX = ((clientY - box.top) / box.height - 0.5) * -2 * MAX_TILT;
      card.classList.add("is-tilting");
      card.style.transform = `perspective(800px) rotateX(${turnX}deg) rotateY(${turnY}deg)`;
    });
  };

  const handlePointerLeave = (event) => {
    cancelAnimationFrame(frame.current);
    event.currentTarget.classList.remove("is-tilting");
    event.currentTarget.style.transform = "";
  };

  return (
    <li className={partner.featured ? "is-featured" : undefined}>
      <Link
        href={partner.href}
        className={["partner-card", partner.featured && "is-featured", isTonight && "is-tonight"].filter(Boolean).join(" ")}
        style={{ "--i": index, "--shine": shineOrder(partner) }}
        tabIndex={hidden ? -1 : undefined}
        draggable={false}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {!partner.featured && (
          <>
            <span className="partner-shine">
              <span />
            </span>
            <span className="partner-flash" />
          </>
        )}
        <span className="partner-logo">
          <span className="partner-glow" />
          <span className="partner-float">
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={hidden ? "" : `${partner.name} logo`}
                width={partner.logoWidth}
                height={partner.logoHeight}
                sizes={partner.featured ? "224px" : "136px"}
                quality={90}
                loading="lazy"
                draggable={false}
              />
            ) : (
              <span className="partner-wordmark">{partner.name}</span>
            )}
          </span>
        </span>
        <span className="partner-label">{partner.label}</span>
      </Link>
    </li>
  );
}

export default function PartnerCards() {
  const row = useRef(null);
  const track = useRef(null);
  const pauses = useRef(new Set());
  const drag = useRef(null);
  const wasDragged = useRef(false);
  const [isMarquee, setIsMarquee] = useState(false);
  const [entrance, setEntrance] = useState("");
  const [isPaused, setIsPaused] = useState(true);

  const getAnimation = () => track.current?.getAnimations()[0];

  const setPause = useCallback((reason, paused) => {
    if (paused) pauses.current.add(reason);
    else pauses.current.delete(reason);
    const animation = getAnimation();
    if (!animation) return;
    if (pauses.current.size > 0) animation.pause();
    else animation.play();
  }, []);

  useEffect(() => {
    const query = window.matchMedia(MARQUEE_QUERY);
    const update = () => setIsMarquee(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Cards only wait to rise in if they're still below the screen, so nothing on screen ever flickers.
  useEffect(() => {
    if (row.current.getBoundingClientRect().top <= window.innerHeight) return;
    setEntrance("is-waiting");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntrance("is-entering");
        observer.disconnect();
      },
      { threshold: 0.2 }
    );
    observer.observe(row.current);
    return () => observer.disconnect();
  }, []);

  // Every loop stops while the section is off screen.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsPaused(!entry.isIntersecting);
      setPause("offscreen", !entry.isIntersecting);
    });
    observer.observe(row.current);
    return () => observer.disconnect();
  }, [isMarquee, setPause]);

  // One loop is half the track, because the track holds two copies of the cards.
  const getOffset = (animation) => {
    const duration = animation.effect.getComputedTiming().duration;
    return -((animation.currentTime % duration) / duration) * (track.current.offsetWidth / 2);
  };

  const setOffset = (animation, offset) => {
    const loop = track.current.offsetWidth / 2;
    const wrapped = ((-offset % loop) + loop) % loop;
    animation.currentTime = (wrapped / loop) * animation.effect.getComputedTiming().duration;
  };

  const handlePointerDown = (event) => {
    wasDragged.current = false;
    const animation = isMarquee && getAnimation();
    if (!animation) return;
    setPause("press", true);
    drag.current = { startX: event.clientX, startOffset: getOffset(animation), pointerId: event.pointerId };
  };

  const handlePointerMove = (event) => {
    const animation = getAnimation();
    if (!drag.current || !animation) return;
    const distance = event.clientX - drag.current.startX;
    if (!wasDragged.current && Math.abs(distance) < DRAG_THRESHOLD) return;
    if (!wasDragged.current) {
      wasDragged.current = true;
      row.current.setPointerCapture(drag.current.pointerId);
    }
    setOffset(animation, drag.current.startOffset + distance);
  };

  const handlePointerEnd = () => {
    drag.current = null;
    setPause("press", false);
  };

  const handleClickCapture = (event) => {
    if (!wasDragged.current) return;
    wasDragged.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  // Holds a card still and on screen when someone moves through the row with a keyboard.
  const handleFocus = (event) => {
    const animation = isMarquee && getAnimation();
    if (!animation || !event.target.matches(":focus-visible")) return;
    setPause("focus", true);
    const card = event.target.getBoundingClientRect();
    const view = row.current.getBoundingClientRect();
    setOffset(animation, getOffset(animation) + view.left + view.width / 2 - (card.left + card.width / 2));
  };

  const classes = ["partner-row", isMarquee && "is-marquee", entrance, isPaused && "is-paused"];

  return (
    <div
      ref={row}
      className={classes.filter(Boolean).join(" ")}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onClickCapture={handleClickCapture}
      onFocus={handleFocus}
      onBlur={() => setPause("focus", false)}
    >
      <div ref={track} className="partner-track">
        <ul className="partner-set">
          {PARTNERS.map((partner, index) => (
            <PartnerCard key={partner.name} partner={partner} index={index} />
          ))}
        </ul>
        {isMarquee && (
          <ul className="partner-set" aria-hidden="true">
            {PARTNERS.map((partner, index) => (
              <PartnerCard key={partner.name} partner={partner} index={index} hidden />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
