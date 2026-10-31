"use client";

import { useEffect, useRef, useState } from "react";

const SLOW_CONNECTIONS = ["slow-2g", "2g", "3g"];

function shouldPlayVideo() {
  const connection = navigator.connection;
  if (connection?.saveData || SLOW_CONNECTIONS.includes(connection?.effectiveType)) return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The poster image sits behind this and stays on show until the video really plays, so phones that block autoplay
// (like iPhones in Low Power Mode) still get a full picture. The video is only added in the browser, so visitors
// with reduced motion, Save-Data or a slow connection never download it. To change the clip, replace the files in public/videos/.
export default function HeroVideo() {
  const video = useRef(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => setIsAllowed(shouldPlayVideo()), []);

  // Off screen it only uses up battery, so it pauses until the visitor scrolls back up.
  useEffect(() => {
    if (!isAllowed) return;
    const element = video.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.play().catch(() => {});
      else element.pause();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [isAllowed]);

  if (!isAllowed) return null;

  return (
    <video
      ref={video}
      className={isPlaying ? "hero-video is-playing" : "hero-video"}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="/images/hero-poster.jpg"
      aria-hidden="true"
      onPlaying={() => setIsPlaying(true)}
    >
      <source src="/videos/hero-bg.webm" type="video/webm" />
      <source src="/videos/hero-bg.mp4" type="video/mp4" />
      <source src="/videos/club-bg.mp4" type="video/mp4" />
    </video>
  );
}
