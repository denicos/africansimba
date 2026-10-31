"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TARGETS =
  ".section h2, .section .eyebrow, .week-card, .bottle-card, .card, .night-details li, .video-card";
const SKIP = ".reveal-list > *, .card h2, .prose h2";
const STAGGER_MS = 80;
const MAX_STAGGER_MS = 320;

// Headings and cards fade up once as they scroll into view. Only things still below the screen are hidden,
// so nothing already on screen flickers, and without JavaScript everything simply shows.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            entry.target.style.setProperty("--reveal-delay", `${Math.min(index * STAGGER_MS, MAX_STAGGER_MS)}ms`);
            entry.target.classList.remove("reveal-pending");
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          });
      },
      { rootMargin: "0px 0px -6% 0px" }
    );

    const elements = Array.from(document.querySelectorAll(TARGETS)).filter(
      (element) => !element.matches(SKIP) && element.getBoundingClientRect().top > window.innerHeight
    );
    elements.forEach((element) => {
      element.classList.add("reveal-pending");
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, [pathname]);

  return null;
}
