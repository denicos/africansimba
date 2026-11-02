"use client";

import { useState } from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa6";

import CrewModal from "./CrewModal";
import Vinyl from "./Vinyl";
import { CREW, crewNights } from "../data/crew";
import useTonight from "../lib/useTonight";

// From 4 members the cards become a swipeable row. Fewer sit centred.
const ROW_FROM = 4;

function CrewCard({ member, isOnNow, onOpen }) {
  const nights = crewNights(member);

  return (
    <article className="crew-card">
      <button type="button" className="crew-card-open" onClick={onOpen} aria-label={`${member.stageName}, ${member.tagline}. Open profile`}>
        <span className="crew-card-photo">
          <Image src={member.photo} alt={`${member.stageName} on the mic`} fill sizes="(max-width: 599px) 80vw, 300px" quality={80} loading="lazy" />
          {isOnNow && (
            <span className="crew-on-now">
              <Vinyl /> ON NOW
            </span>
          )}
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
  const openMember = CREW.find((member) => member.slug === openSlug);

  if (CREW.length === 0) return null;

  const isOnNow = (member) => Boolean(tonight?.isHappening && member.nights.includes(tonight.night.slug));

  return (
    <section className="section crew-section" aria-labelledby="crew-heading">
      <div className="container">
        <div className="center">
          <p className="eyebrow">On the mic &amp; on the decks</p>
          <h2 id="crew-heading">The Crew</h2>
          <p className="lead">The voices and sounds behind every African Simba night.</p>
        </div>
        <ul className={CREW.length >= ROW_FROM ? "crew-list is-row" : "crew-list"}>
          {CREW.map((member) => (
            <li key={member.slug}>
              <CrewCard member={member} isOnNow={isOnNow(member)} onOpen={() => setOpenSlug(member.slug)} />
            </li>
          ))}
        </ul>
      </div>
      {openMember && <CrewModal member={openMember} isOnNow={isOnNow(openMember)} onClose={() => setOpenSlug(null)} />}
    </section>
  );
}
