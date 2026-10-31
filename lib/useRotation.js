"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Shared by the auto-rotating sections. Says when to hold still (hover, touch, keyboard focus, off screen,
// hidden tab), when the section is close enough to start loading images, and whether to rotate at all.
export default function useRotation(container) {
  const pauses = useRef(new Set(["offscreen"]));
  const [paused, setPaused] = useState(true);
  const [isNear, setIsNear] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const setPause = useCallback((reason, isPaused) => {
    if (isPaused) pauses.current.add(reason);
    else pauses.current.delete(reason);
    setPaused(pauses.current.size > 0);
  }, []);

  useEffect(() => {
    const visible = new IntersectionObserver(([entry]) => setPause("offscreen", !entry.isIntersecting));
    const near = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsNear(true), { rootMargin: "300px 0px" });
    visible.observe(container.current);
    near.observe(container.current);

    const onVisibility = () => setPause("hidden", document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(query.matches);
    onMotion();
    query.addEventListener("change", onMotion);

    return () => {
      visible.disconnect();
      near.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      query.removeEventListener("change", onMotion);
    };
  }, [container, setPause]);

  const handlers = {
    onPointerEnter: (event) => event.pointerType === "mouse" && setPause("hover", true),
    onPointerLeave: () => {
      setPause("hover", false);
      setPause("press", false);
    },
    onPointerDown: () => setPause("press", true),
    onPointerUp: () => setPause("press", false),
    onPointerCancel: () => setPause("press", false),
    onFocus: (event) => event.target.matches(":focus-visible") && setPause("focus", true),
    onBlur: () => setPause("focus", false),
  };

  return { paused, isNear, reducedMotion, handlers };
}
