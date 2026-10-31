"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "ase-age-confirmed";
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Runs before first paint so returning visitors never see the popup flash on a full page load.
const HIDE_IF_CONFIRMED = `try{if(localStorage.getItem("${STORAGE_KEY}")==="yes")document.documentElement.dataset.ageOk="1"}catch(e){}`;

// Falls back to this page view's memory when storage is blocked (e.g. private browsing).
let confirmedInMemory = false;

function isConfirmed() {
  if (confirmedInMemory) return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "yes";
  } catch {
    return false;
  }
}

function rememberConfirmed() {
  confirmedInMemory = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, "yes");
  } catch {
    // Storage is unavailable; the in-memory value still covers this visit.
  }
}

// An overlay rather than a redirect, so search engines can still read the page underneath.
export default function AgeGate() {
  const [status, setStatus] = useState("asking");
  const yesButton = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (isConfirmed()) setStatus("confirmed");
  }, []);

  useEffect(() => {
    if (status === "confirmed") return;
    yesButton.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [status]);

  if (status === "confirmed") return null;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: HIDE_IF_CONFIRMED }} />
      <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
        <div className="age-gate-card">
          <p className="eyebrow">18+ only</p>
          {status === "asking" ? (
            <>
              <h2 id="age-gate-title">Are you 18 or older?</h2>
              <p>You must be of legal drinking age to view this page. Please enjoy responsibly.</p>
              <div className="button-row">
                <button
                  ref={yesButton}
                  type="button"
                  className="btn btn-gold"
                  onClick={() => {
                    rememberConfirmed();
                    setStatus("confirmed");
                  }}
                >
                  Yes, I am 18+
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setStatus("declined")}>
                  No
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 id="age-gate-title">Sorry, this page is for adults only</h2>
              <p>Our drinks are not for sale to persons under 18.</p>
              <div className="button-row">
                <Link href="/" className="btn btn-gold">
                  Back to home
                </Link>
                <button type="button" className="btn btn-outline" onClick={() => setStatus("asking")}>
                  I am 18+
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
