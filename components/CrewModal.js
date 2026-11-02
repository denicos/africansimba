"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa6";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

import Button from "./Button";
import Vinyl from "./Vinyl";
import { crewNights } from "../data/crew";

// A crew member's profile: a swipeable slideshow of their photos, then who they are.
export default function CrewModal({ member, isOnNow, onClose }) {
  const closeButton = useRef(null);
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const count = member.gallery.length;
  const nights = crewNights(member);
  const titleId = `crew-modal-${member.slug}`;

  const goTo = useCallback(
    (next) => {
      const view = track.current;
      if (!view) return;
      const target = (next + count) % count;
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      view.scrollTo({ left: target * view.clientWidth, behavior: smooth ? "smooth" : "auto" });
    },
    [count]
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goTo(index + 1);
      if (event.key === "ArrowLeft") goTo(index - 1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [goTo, index, onClose]);

  useEffect(() => {
    const opener = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = "";
      opener?.focus?.({ preventScroll: true });
    };
  }, []);

  const handleScroll = () => {
    const view = track.current;
    if (view) setIndex(Math.round(view.scrollLeft / view.clientWidth));
  };

  return (
    <div className="crew-modal" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={onClose}>
      <div className="crew-modal-box" onClick={(event) => event.stopPropagation()}>
        <button ref={closeButton} type="button" className="crew-modal-close" onClick={onClose} aria-label="Close profile">
          <FiX aria-hidden="true" />
        </button>

        <div className="crew-slides">
          <div ref={track} className="crew-slides-track" onScroll={handleScroll}>
            {member.gallery.map((src, i) => (
              <div key={src} className="crew-slide" aria-hidden={i !== index || undefined}>
                <Image src={src} alt={`${member.stageName}, photo ${i + 1} of ${count}`} fill sizes="(max-width: 899px) 92vw, 460px" quality={80} />
              </div>
            ))}
          </div>
          {count > 1 && (
            <>
              <button type="button" className="crew-slides-arrow is-prev" onClick={() => goTo(index - 1)} aria-label="Previous photo">
                <FiChevronLeft aria-hidden="true" />
              </button>
              <button type="button" className="crew-slides-arrow is-next" onClick={() => goTo(index + 1)} aria-label="Next photo">
                <FiChevronRight aria-hidden="true" />
              </button>
              <div className="crew-slides-dots">
                {member.gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === index || undefined}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="crew-modal-info">
          <div className="crew-modal-top">
            <span className="crew-role">{member.role}</span>
            {isOnNow && (
              <span className="crew-on-now">
                <Vinyl /> ON NOW
              </span>
            )}
          </div>
          <h3 id={titleId} className="crew-modal-name">
            {member.stageName}
          </h3>
          <p className="crew-modal-tagline">{member.tagline}</p>
          <p className="crew-modal-bio">{member.bio}</p>
          {nights.length > 0 && <p className="crew-modal-nights">Catch {member.stageName} at {nights.join(", ")}</p>}
          {member.instagram && (
            <Button href={member.instagram} external variant="outline">
              <FaInstagram aria-hidden="true" /> Follow on Instagram
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
