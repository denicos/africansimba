"use client";

import { useEffect, useRef } from "react";

const STAGGER_MS = 100;

// A list whose items fade up one after another as they scroll into view. The animation is in globals.css.
export default function RevealList({ className, children }) {
  const list = useRef(null);

  useEffect(() => {
    const element = list.current;
    element.classList.add("is-armed");
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            entry.target.style.setProperty("--reveal-delay", `${index * STAGGER_MS}ms`);
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
      },
      { threshold: 0.1 }
    );
    Array.from(element.children).forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={list} className={`reveal-list ${className}`}>
      {children}
    </ul>
  );
}
