"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export default function Lightbox({ photos, index, onChange, onClose }) {
  const closeButton = useRef(null);

  const step = useCallback(
    (delta) => onChange((index + delta + photos.length) % photos.length),
    [index, onChange, photos.length]
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, step]);

  useEffect(() => {
    const opener = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = "";
      opener?.focus?.({ preventScroll: true });
    };
  }, []);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <button ref={closeButton} type="button" className="lightbox-button lightbox-close" onClick={onClose} aria-label="Close photo viewer">
        <FiX aria-hidden="true" />
      </button>
      <button type="button" className="lightbox-button lightbox-prev" onClick={() => step(-1)} aria-label="Previous photo">
        <FiChevronLeft aria-hidden="true" />
      </button>
      <div className="lightbox-image">
        <Image src={photos[index].src} alt={photos[index].alt} fill sizes="100vw" quality={75} style={{ objectFit: "contain" }} />
      </div>
      <button type="button" className="lightbox-button lightbox-next" onClick={() => step(1)} aria-label="Next photo">
        <FiChevronRight aria-hidden="true" />
      </button>
      <p className="lightbox-count">
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}
