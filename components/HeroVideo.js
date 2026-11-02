"use client";

import { useEffect, useRef, useState } from "react";

// A touch, click, key or scroll. Some browsers only let a video start after one.
const INTERACTIONS = ["pointerdown", "touchstart", "scroll", "keydown"];

// A new number each time the hero mounts, so coming back to the homepage always gets a fresh <video>.
let mounts = 0;

function shouldPlayVideo() {
  if (navigator.connection?.saveData) return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The poster image sits behind this and stays on show until the video really plays, then the video fades in over it,
// so phones that block autoplay (like iPhones in Low Power Mode) still get a full picture. The video is only added in
// the browser, so visitors with reduced motion or Save-Data never download it. To change the clip, replace the files
// in public/videos/.
export default function HeroVideo() {
  const video = useRef(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mountKey] = useState(() => ++mounts);

  useEffect(() => setIsAllowed(shouldPlayVideo()), []);

  // Starts the video, and starts it again whenever it has stopped (when it can play, when the tab comes back, on any
  // touch or scroll), which does nothing while it's already playing. Off screen or in a hidden tab it pauses to save battery.
  useEffect(() => {
    if (!isAllowed) return;
    const element = video.current;
    let isOnScreen = true;

    const tryPlay = () => {
      if (!isOnScreen || document.hidden || !element.paused) return;
      element.muted = true;
      element.defaultMuted = true;
      element.play()?.catch(() => {});
    };

    const onPlaying = () => setIsPlaying(true);
    const onVisibility = () => (document.hidden ? element.pause() : tryPlay());

    const observer = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting;
      if (isOnScreen) tryPlay();
      else element.pause();
    });
    observer.observe(element);

    element.addEventListener("loadeddata", tryPlay);
    element.addEventListener("canplay", tryPlay);
    element.addEventListener("playing", onPlaying);
    document.addEventListener("visibilitychange", onVisibility);
    INTERACTIONS.forEach((name) => window.addEventListener(name, tryPlay, { passive: true }));
    tryPlay();

    return () => {
      observer.disconnect();
      element.removeEventListener("loadeddata", tryPlay);
      element.removeEventListener("canplay", tryPlay);
      element.removeEventListener("playing", onPlaying);
      document.removeEventListener("visibilitychange", onVisibility);
      INTERACTIONS.forEach((name) => window.removeEventListener(name, tryPlay));
    };
  }, [isAllowed]);

  if (!isAllowed) return null;

  return (
    <video
      key={mountKey}
      ref={video}
      className={isPlaying ? "hero-video is-playing" : "hero-video"}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="/images/hero-poster.jpg"
      aria-hidden="true"
    >
      <source src="/videos/hero-bg.webm" type="video/webm" />
      <source src="/videos/hero-bg.mp4" type="video/mp4" />
      <source src="/videos/club-bg.mp4" type="video/mp4" />
    </video>
  );
}
