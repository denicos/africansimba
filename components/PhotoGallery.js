"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export default function PhotoGallery({ photos, emptyText = "Photos coming soon" }) {
  const [selected, setSelected] = useState(null);
  const isOpen = selected !== null;

  const close = useCallback(() => setSelected(null), []);
  const step = useCallback(
    (delta) => setSelected((current) => (current + delta + photos.length) % photos.length),
    [photos.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, step]);

  if (photos.length === 0) {
    return (
      <div className="photo-placeholder">
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <>
      <ul className="photo-grid">
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <button type="button" className="photo-tile" onClick={() => setSelected(index)} aria-label={`View photo: ${photo.alt}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
                quality={65}
                loading="lazy"
              />
            </button>
          </li>
        ))}
      </ul>

      {isOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button type="button" className="lightbox-button lightbox-close" onClick={close} aria-label="Close photo viewer">
            <FiX aria-hidden="true" />
          </button>
          <button type="button" className="lightbox-button lightbox-prev" onClick={() => step(-1)} aria-label="Previous photo">
            <FiChevronLeft aria-hidden="true" />
          </button>
          <div className="lightbox-image">
            <Image src={photos[selected].src} alt={photos[selected].alt} fill sizes="100vw" quality={75} style={{ objectFit: "contain" }} />
          </div>
          <button type="button" className="lightbox-button lightbox-next" onClick={() => step(1)} aria-label="Next photo">
            <FiChevronRight aria-hidden="true" />
          </button>
          <p className="lightbox-count">
            {selected + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
