"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

export default function PhotoGallery({ photos, emptyText = "Photos coming soon" }) {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

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

      {selected !== null && <Lightbox photos={photos} index={selected} onChange={setSelected} onClose={close} />}
    </>
  );
}
