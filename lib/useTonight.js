"use client";

import { useSyncExternalStore } from "react";
import { nightStatus } from "../data/nights";
import { currentTime } from "./currentTime";

const MINUTE_MS = 60 * 1000;

// Everything that depends on tonight's night reads this one value, so they can never disagree.
let current = null;
let timer = null;
const listeners = new Set();

function refresh() {
  const next = nightStatus(currentTime());
  if (current?.key === next?.key) return;
  current = next;
  listeners.forEach((listener) => listener());
}

// Checks on the minute, so the switch at 6 PM and 6 AM happens right on time.
function schedule() {
  timer = setTimeout(() => {
    refresh();
    schedule();
  }, MINUTE_MS - (Date.now() % MINUTE_MS));
}

function subscribe(listener) {
  listeners.add(listener);
  if (listeners.size === 1) {
    refresh();
    schedule();
    document.addEventListener("visibilitychange", refresh);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", refresh);
    }
  };
}

// Pages are built ahead of time, so this is null on the server and for the very first moment in the browser.
export default function useTonight() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null
  );
}
