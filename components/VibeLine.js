"use client";

import { useEffect, useState } from "react";
import { vibeLines } from "../data/nights";

const ROTATE_MS = 3000;

// Hidden from screen readers, so the changing text isn't read out every 3 seconds.
export default function VibeLine({ night, className = "vibe-line" }) {
  const lines = vibeLines(night);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((previous) => previous + 1), ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const line = lines[index % lines.length];

  return (
    <span className={className} aria-hidden="true">
      <span key={index}>{line}</span>
    </span>
  );
}
