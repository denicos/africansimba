"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa6";

import CrewModal from "./CrewModal";
import LiveVibe from "./LiveVibe";
import { CREW, crewNights, isCrewLive } from "../data/crew";
import useTonight from "../lib/useTonight";

const ROTATE_MS = 3000;
// Each card waits a little longer before its first change, so they don't all change together.
const STAGGER_MS = 1100;
const SWIPE_DISTANCE = 40;

// The card's photos, crossfading one after another. Holds still on hover or touch, and swipes left and right.
function CrewPhotos({ member, order, reducedMotion, footer }) {
  const photos = member.gallery.length > 0 ? member.gallery : [member.photo];
  const [index, setIndex] = useState(Math.max(0, photos.indexOf(member.photo)));
  const [paused, setPaused] = useState(false);
  const hasChanged = useRef(false);
  const swipe = useRef(null);
  const wasSwiped = useRef(false);

  useEffect(() => {
    if (paused || reducedMotion || photos.length < 2) return;
    const wait = hasChanged.current ? ROTATE_MS : ROTATE_MS + order * STAGGER_MS;
    const timer = setTimeout(() => {
      hasChanged.current = true;
      setIndex((previous) => (previous + 1) % photos.length);
    }, wait);
    return () => clearTimeout(timer);
  }, [index, paused, reducedMotion, order, photos.length]);

  const step = (delta) => {
    hasChanged.current = true;
    setIndex((previous) => (previous + delta + photos.length) % photos.length);
  };

  const handlePointerDown = (event) => {
    wasSwiped.current = false;
    swipe.current = event.clientX;
    if (event.pointerType !== "mouse") setPaused(true);
  };

  const handlePointerUp = (event) => {
    if (event.pointerType !== "mouse") setPaused(false);
    if (swipe.current === null) return;
    const distance = event.clientX - swipe.current;
    swipe.current = null;
    if (Math.abs(distance) < SWIPE_DISTANCE || photos.length < 2) return;
    wasSwiped.current = true;
    step(distance < 0 ? 1 : -1);
  };

  // A swipe changes the photo, so it shouldn't also open the profile.
  const handleClickCapture = (event) => {
    if (!wasSwiped.current) return;
    wasSwiped.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <span
      className="crew-card-photos"
      onPointerEnter={(event) => event.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        swipe.current = null;
        setPaused(false);
      }}
      onClickCapture={handleClickCapture}
    >
      {photos.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="(max-width: 599px) 70vw, 280px"
          quality={75}
          loading="lazy"
          draggable={false}
          className={i === index ? "is-active" : undefined}
        />
      ))}
      <span className="crew-card-bottom">
        {photos.length > 1 && (
          <span className="crew-card-dots" aria-hidden="true">
            {photos.map((src, i) => (
              <i key={src} className={i === index ? "is-active" : undefined} />
            ))}
          </span>
        )}
        {footer}
      </span>
    </span>
  );
}

function CrewCard({ member, order, liveNight, reducedMotion, onOpen }) {
  const nights = crewNights(member);
  const liveLabel = liveNight ? ` Live now at ${liveNight.name}, ${liveNight.venue}.` : "";

  return (
    <article className={liveNight ? "crew-card is-live" : "crew-card"}>
      <button
        type="button"
        className="crew-card-open"
        onClick={onOpen}
        aria-label={`${member.stageName}, ${member.tagline}.${liveLabel} Open profile`}
      >
        <span className="crew-card-photo">
          <CrewPhotos member={member} order={order} reducedMotion={reducedMotion} footer={liveNight && <LiveVibe night={liveNight} variant="strip" />} />
        </span>
        <span className="crew-card-body">
          <span className="crew-role">{member.role}</span>
          <span className="crew-card-name">{member.stageName}</span>
          <span className="crew-card-tagline">{member.tagline}</span>
          {nights.length > 0 && <span className="crew-card-nights">{nights.join(" · ")}</span>}
        </span>
      </button>
      {member.instagram && (
        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="crew-card-instagram" aria-label={`${member.stageName} on Instagram`}>
          <FaInstagram aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

export default function CrewSection() {
  const tonight = useTonight();
  const [openSlug, setOpenSlug] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const openMember = CREW.find((member) => member.slug === openSlug);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  if (CREW.length === 0) return null;

  const liveSlug = tonight?.isHappening ? tonight.night.slug : undefined;
  const liveNightFor = (member) => (isCrewLive(member, liveSlug) ? tonight.night : null);

  return (
    <section className="section crew-section" aria-labelledby="crew-heading">
      <div className="container">
        <header className="crew-intro center">
          <p className="eyebrow">On the mic &amp; on the decks</p>
          <h2 id="crew-heading">The Crew</h2>
          <p className="lead">The voices and sounds behind every African Simba night.</p>
        </header>
        <ul className="crew-list">
          {CREW.map((member, order) => (
            <li key={member.slug}>
              <CrewCard
                member={member}
                order={order}
                liveNight={liveNightFor(member)}
                reducedMotion={reducedMotion}
                onOpen={() => setOpenSlug(member.slug)}
              />
            </li>
          ))}
        </ul>
      </div>
      {openMember && <CrewModal member={openMember} liveNight={liveNightFor(openMember)} onClose={() => setOpenSlug(null)} />}
    </section>
  );
}
