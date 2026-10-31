"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

const DRAG_THRESHOLD = 6;
const THUMBNAIL_SIZES = "(max-width: 599px) 50vw, (max-width: 1200px) 25vw, 283px";
const PHOTOS_LOADED_AHEAD = 2;
const LOAD_CHECK_MS = 1000;

// loaded is the set of photos to show, or null to leave it all to the browser's lazy loading.
function StripSet({ items, photos, loaded, hidden, onOpen }) {
  return (
    <ul className="photo-strip-set" aria-hidden={hidden || undefined}>
      {items.map((photoIndex) => {
        const photo = photos[photoIndex];
        return (
          <li key={photo.src}>
            <button
              type="button"
              className="photo-tile"
              tabIndex={hidden ? -1 : undefined}
              onClick={() => onOpen(photoIndex)}
              aria-label={hidden ? undefined : `View photo: ${photo.alt}`}
            >
              {(loaded === null || loaded.has(photoIndex)) && (
                <Image
                  src={photo.src}
                  alt={hidden ? "" : photo.alt}
                  fill
                  sizes={THUMBNAIL_SIZES}
                  quality={60}
                  loading={loaded === null ? "lazy" : "eager"}
                  draggable={false}
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

// The motion is a CSS transform animation (see .photo-strip-track in globals.css), so the browser runs it
// on the GPU. Pausing and dragging control that same animation instead of moving things with JavaScript.
function StripRow({ items, photos, reverse, paused, onOpen }) {
  const row = useRef(null);
  const track = useRef(null);
  const pauses = useRef(new Set(["offscreen"]));
  const drag = useRef(null);
  const wasDragged = useRef(false);
  const [loaded, setLoaded] = useState(() => new Set());

  const getAnimation = () => track.current?.getAnimations()[0];

  const setPause = useCallback((reason, isPaused) => {
    if (isPaused) pauses.current.add(reason);
    else pauses.current.delete(reason);
    const animation = getAnimation();
    if (!animation) return;
    if (pauses.current.size > 0) animation.pause();
    else animation.play();
  }, []);

  // One loop is half the track, because the track holds two copies of the photos.
  const getOffset = (animation) => {
    const duration = animation.effect.getComputedTiming().duration;
    const loop = track.current.offsetWidth / 2;
    const progress = (animation.currentTime % duration) / duration;
    return reverse ? -(1 - progress) * loop : -progress * loop;
  };

  const setOffset = (animation, offset) => {
    const duration = animation.effect.getComputedTiming().duration;
    const loop = track.current.offsetWidth / 2;
    const wrapped = ((-offset % loop) + loop) % loop;
    const progress = wrapped / loop;
    animation.currentTime = (reverse ? 1 - progress : progress) * duration;
  };

  // Browser lazy loading can't keep up with an animation running on the GPU, so the strip works out for itself
  // which photos are on screen or next to arrive, and only those are downloaded.
  const loadNearbyPhotos = useCallback(() => {
    const animation = getAnimation();
    if (!animation) {
      setLoaded(null);
      return;
    }
    const tileWidth = track.current.offsetWidth / 2 / items.length;
    const first = Math.floor(-getOffset(animation) / tileWidth) - PHOTOS_LOADED_AHEAD;
    const count = Math.ceil(row.current.offsetWidth / tileWidth) + PHOTOS_LOADED_AHEAD * 2;
    setLoaded((previous) => {
      const next = new Set(previous);
      for (let position = first; position <= first + count; position++) {
        next.add(items[((position % items.length) + items.length) % items.length]);
      }
      return previous && next.size === previous.size ? previous : next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, reverse]);

  useEffect(() => setPause("lightbox", paused), [paused, setPause]);

  // No need to keep animating or loading photos while the strip is off screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPause("offscreen", !entry.isIntersecting);
        if (entry.isIntersecting) loadNearbyPhotos();
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(row.current);
    const timer = setInterval(() => {
      if (!pauses.current.has("offscreen")) loadNearbyPhotos();
    }, LOAD_CHECK_MS);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [setPause, loadNearbyPhotos]);

  const handlePointerDown = (event) => {
    const animation = getAnimation();
    wasDragged.current = false;
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
    loadNearbyPhotos();
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

  // Brings a photo into view when someone moves through the strip with a keyboard.
  const handleFocus = (event) => {
    if (!event.target.matches(":focus-visible")) return;
    setPause("focus", true);
    const animation = getAnimation();
    if (!animation) return;
    const tile = event.target.getBoundingClientRect();
    const view = row.current.getBoundingClientRect();
    const shift = view.left + view.width / 2 - (tile.left + tile.width / 2);
    setOffset(animation, Math.min(getOffset(animation) + shift, 0));
    loadNearbyPhotos();
  };

  return (
    <div
      ref={row}
      className={reverse ? "photo-strip-row is-reverse" : "photo-strip-row"}
      onPointerEnter={(event) => event.pointerType === "mouse" && setPause("hover", true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setPause("hover", false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onClickCapture={handleClickCapture}
      onFocus={handleFocus}
      onBlur={() => setPause("focus", false)}
    >
      <div ref={track} className="photo-strip-track">
        <StripSet items={items} photos={photos} loaded={loaded} onOpen={onOpen} />
        <StripSet items={items} photos={photos} loaded={loaded} hidden onOpen={onOpen} />
      </div>
    </div>
  );
}

export default function PhotoStrip({ photos }) {
  const [selected, setSelected] = useState(null);
  const [showSecondRow, setShowSecondRow] = useState(false);
  const close = useCallback(() => setSelected(null), []);

  const order = useMemo(() => photos.map((_, index) => index), [photos]);
  // A different starting photo, so the two rows don't show the same picture at once.
  const secondOrder = useMemo(() => {
    const middle = Math.floor(order.length / 2);
    return [...order.slice(middle), ...order.slice(0, middle)];
  }, [order]);

  // Added in the browser so phones never download or lay out the second row.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const update = () => setShowSecondRow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const isOpen = selected !== null;

  return (
    <>
      <div className="photo-strip" role="group" aria-label="Photos from our nights">
        <StripRow items={order} photos={photos} paused={isOpen} onOpen={setSelected} />
        {showSecondRow && <StripRow items={secondOrder} photos={photos} reverse paused={isOpen} onOpen={setSelected} />}
      </div>
      {isOpen && <Lightbox photos={photos} index={selected} onChange={setSelected} onClose={close} />}
    </>
  );
}
