"use client";

import Vinyl from "./Vinyl";
import useTonight from "../lib/useTonight";

const EQ_BARS = 6;

// Gold bars bouncing like music playing. Every live equalizer on the site is this one. Still with reduced motion.
export function Equalizer() {
  return (
    <span className="eq" aria-hidden="true">
      {Array.from({ length: EQ_BARS }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}

// The one live look, used wherever a live night shows. Only render it while the night is on.
// "inline": the turning record and equalizer, next to a LIVE badge.
// "strip": dark glass with the equalizer, "LIVE NOW · night" and the venue, for the bottom of a photo or poster.
export default function LiveVibe({ night, variant = "inline", vinyl = variant === "inline", className }) {
  if (variant === "inline") {
    return (
      <span className={["live-vibe", className].filter(Boolean).join(" ")} aria-hidden="true">
        {vinyl && <Vinyl />}
        <Equalizer />
      </span>
    );
  }

  return (
    <span className={["live-strip", className].filter(Boolean).join(" ")}>
      {vinyl && <Vinyl />}
      <Equalizer />
      <span className="live-strip-text">
        <span className="live-strip-title">
          <i className="live-strip-dot" aria-hidden="true" />
          LIVE NOW · {night.name}
        </span>
        <span className="live-strip-venue">
          {night.venue}, {night.area}
        </span>
      </span>
    </span>
  );
}

// For server-rendered pages: the strip, shown only while this night is the one that's live.
export function NightLiveStrip({ night, className }) {
  const tonight = useTonight();
  if (!tonight?.isHappening || tonight.night.slug !== night.slug) return null;
  return <LiveVibe night={night} variant="strip" vinyl className={["is-standalone", className].filter(Boolean).join(" ")} />;
}
