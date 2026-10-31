"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useRotation from "../lib/useRotation";

const ROTATE_MS = 4000;
const DRAG_THRESHOLD = 6;
const SWIPE_DISTANCE = 50;

// A fan of poster cards. Every few seconds, or on a swipe, the front card slides out and goes to the back.
export default function HostStack({ posters }) {
  const stack = useRef(null);
  const cards = useRef([]);
  const drag = useRef(null);
  const { paused, reducedMotion, handlers } = useRotation(stack);
  const [front, setFront] = useState(0);
  const [leaving, setLeaving] = useState(null);
  const [dragging, setDragging] = useState(false);

  const count = posters.length;

  const shuffle = (swipe = 1) => {
    cards.current[front].style.setProperty("--swipe", swipe);
    setLeaving(front);
    setFront((front + 1) % count);
  };

  const clearDrag = (card) => {
    card.style.removeProperty("--drag");
    card.style.removeProperty("--swipe");
  };

  useEffect(() => {
    if (paused || reducedMotion || count < 2) return;
    const timer = setTimeout(shuffle, ROTATE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reducedMotion, front, count]);

  const handlePointerDown = (event) => {
    handlers.onPointerDown(event);
    if (count > 1) drag.current = { startX: event.clientX, pointerId: event.pointerId, moved: false };
  };

  const handlePointerMove = (event) => {
    if (!drag.current) return;
    const distance = event.clientX - drag.current.startX;
    if (!drag.current.moved) {
      if (Math.abs(distance) < DRAG_THRESHOLD) return;
      drag.current.moved = true;
      stack.current.setPointerCapture(drag.current.pointerId);
      setDragging(true);
    }
    cards.current[front].style.setProperty("--drag", `${distance}px`);
  };

  const handlePointerEnd = (event) => {
    handlers.onPointerUp(event);
    if (!drag.current) return;
    const distance = event.clientX - drag.current.startX;
    const wasMoved = drag.current.moved;
    drag.current = null;
    setDragging(false);
    if (!wasMoved) return;
    if (Math.abs(distance) < SWIPE_DISTANCE || event.type === "pointercancel") clearDrag(cards.current[front]);
    else if (reducedMotion) {
      clearDrag(cards.current[front]);
      setFront((front + 1) % count);
    } else shuffle(Math.sign(distance));
  };

  return (
    <div
      ref={stack}
      className="host-stack"
      {...handlers}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      {posters.map((poster, index) => {
        const rank = (index - front + count) % count;
        const classes = ["host-card", index === leaving && "is-leaving", rank === 0 && dragging && "is-dragging"];
        return (
          <div
            key={poster.src}
            ref={(card) => {
              cards.current[index] = card;
            }}
            className={classes.filter(Boolean).join(" ")}
            data-rank={rank}
            aria-hidden={rank !== 0 || undefined}
            onAnimationEnd={(event) => {
              if (event.animationName !== "host-shuffle-move") return;
              clearDrag(event.currentTarget);
              setLeaving(null);
            }}
          >
            <Image src={poster.src} alt={poster.alt} fill sizes="(max-width: 899px) 66vw, 290px" quality={75} loading="lazy" draggable={false} />
          </div>
        );
      })}
    </div>
  );
}
