"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";
import { MARTELL_BOTTLES as BOTTLES } from "../data/drinks";
import { bottleMessages } from "../lib/whatsapp";
import useRotation from "../lib/useRotation";

const TAG = "Official Brand Ambassador · Uganda";

function OrderButton({ bottle, className, children = "Order on WhatsApp" }) {
  return (
    <WhatsAppButton action="order" item={bottle.name} message={bottleMessages.order(bottle.name)} className={className}>
      {children}
    </WhatsAppButton>
  );
}

export default function MartellShowcase() {
  const container = useRef(null);
  const { paused, isNear, reducedMotion, handlers } = useRotation(container);
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [ready, setReady] = useState(() => new Set([0]));

  const bottle = BOTTLES[active];

  const markReady = (index) => setReady((previous) => new Set(previous).add(index));

  // Moves to the next bottle that has loaded, so a slow connection never holds the rotation up.
  // If none has, the same bottle gets another turn.
  const advance = () => {
    for (let step = 1; step < BOTTLES.length; step++) {
      const index = (active + step) % BOTTLES.length;
      if (ready.has(index)) {
        setActive(index);
        return;
      }
    }
    setCycle((previous) => previous + 1);
  };

  if (reducedMotion) {
    return (
      <div ref={container}>
        <p className="martell-tag">{TAG}</p>
        <ul className="martell-grid">
          {BOTTLES.map((item) => (
            <li key={item.name}>
              <div className="martell-stage">
                <Image src={`/images/drinks/${item.image}`} alt={item.alt} fill sizes="(max-width: 899px) 50vw, 280px" quality={70} loading="lazy" />
              </div>
              <p className="martell-name">{item.name}</p>
              <OrderButton bottle={item} className="btn btn-whatsapp btn-small">
                Order
              </OrderButton>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      ref={container}
      className={paused ? "martell-showcase is-paused" : "martell-showcase"}
      role="group"
      aria-roledescription="carousel"
      aria-label="Martell bottles"
      {...handlers}
    >
      <div className="martell-stage">
        {BOTTLES.map((item, index) => {
          // Every bottle starts loading once the section is close (300px away), so none has to be waited for.
          if (index !== active && !isNear) return null;
          const isShown = index === active && ready.has(index);
          return (
            <div key={item.name} className={isShown ? "martell-slide is-active" : "martell-slide"} aria-hidden={!isShown || undefined}>
              <Image
                src={`/images/drinks/${item.image}`}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 899px) calc(100vw - 80px), 520px"
                quality={75}
                loading={isNear ? "eager" : "lazy"}
                draggable={false}
                onLoad={() => markReady(index)}
                onError={() => markReady(index)}
              />
            </div>
          );
        })}
      </div>

      <div key={bottle.name} className="martell-caption">
        <p className="martell-tag">{TAG}</p>
        <p className="martell-name">{bottle.name}</p>
      </div>

      <div className="martell-footer">
        <OrderButton bottle={bottle} />
        <div className="martell-dots">
          {BOTTLES.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className="martell-dot"
              onClick={() => setActive(index)}
              aria-label={`Show ${item.name}`}
              aria-current={index === active || undefined}
            >
              <span>{index === active && <i key={cycle} onAnimationEnd={advance} />}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
