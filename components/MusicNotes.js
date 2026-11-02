"use client";

import { useEffect, useRef, useState } from "react";

// ︎ keeps the notes as text, so phones don't turn them into emoji.
const GLYPHS = ["♪︎", "♫︎"];
const MAX_NOTES = 4;

// Gold notes that float up behind a live card's content, one every second or two. None with reduced motion.
export default function MusicNotes() {
  const [notes, setNotes] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer;
    const spawn = () => {
      if (!document.hidden) {
        const id = nextId.current++;
        const note = {
          id,
          glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          left: 6 + Math.random() * 88,
          size: 11 + Math.random() * 6,
          drift: Math.round((Math.random() - 0.5) * 28),
        };
        setNotes((previous) => [...previous.slice(1 - MAX_NOTES), note]);
      }
      timer = setTimeout(spawn, 1000 + Math.random() * 1000);
    };
    timer = setTimeout(spawn, 500);
    return () => clearTimeout(timer);
  }, []);

  const remove = (id) => setNotes((previous) => previous.filter((note) => note.id !== id));

  return (
    <span className="music-notes" aria-hidden="true">
      {notes.map((note) => (
        <i
          key={note.id}
          style={{ left: `${note.left}%`, fontSize: `${note.size}px`, "--drift": `${note.drift}px` }}
          onAnimationEnd={() => remove(note.id)}
        >
          {note.glyph}
        </i>
      ))}
    </span>
  );
}
