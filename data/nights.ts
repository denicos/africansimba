// The 5 weekly nights, Monday to Sunday.
// Photos: drop them in public/images/nights/<folder>/ and redeploy.

export type Night = {
  slug: string;
  name: string;
  weekday: string;
  venue: string;
  area: string;
  folder: string;
  tagline: string;
  // The host poster. face is for the small "Hosted by" photo: where the face centre is, measured in
  // poster widths from the top left, and how far to zoom in on it.
  // glow is the poster's main colour, for the soft light behind the homepage hero on that night.
  poster: { src: string; width: number; height: number; glow: string; face: { x: number; y: number; zoom: number } };
};

// Every night runs at the same times, in Kampala time. A night ends the next morning.
export const NIGHT_HOURS = { start: "18:00", end: "06:00", label: "6 PM – 6 AM", startLabel: "6 PM", endLabel: "6 AM" };

export const VENUES: Record<string, { area: string; emblem?: string }> = {
  Thrones: { area: "Bugolobi" },
  Nomad: { area: "Ggaba Road" },
  Vanquish: { area: "Kololo", emblem: "/images/partners/vanquish-emblem.webp" },
};

export const NIGHTS: Night[] = [
  {
    slug: "bandali-mondays",
    name: "Bandali Mondays",
    weekday: "Monday",
    venue: "Thrones",
    area: VENUES.Thrones.area,
    folder: "bandali",
    tagline: "Start the week right, with Martell at Thrones.",
    poster: { src: "/images/nights/bandali/bandali-mondays-host.png", width: 588, height: 783, glow: "#d9822b", face: { x: 0.57, y: 0.54, zoom: 1.75 } },
  },
  {
    slug: "wahala-wednesday",
    name: "Wahala Wednesday",
    weekday: "Wednesday",
    venue: "Thrones",
    area: VENUES.Thrones.area,
    folder: "wahala",
    tagline: "Midweek party madness at Thrones.",
    poster: { src: "/images/nights/wahala/wahala-wednesday-host.png", width: 558, height: 738, glow: "#2f45ff", face: { x: 0.55, y: 0.34, zoom: 2.6 } },
  },
  {
    slug: "swift-fridays",
    name: "Swift Fridays",
    weekday: "Friday",
    venue: "Nomad",
    area: VENUES.Nomad.area,
    folder: "swift",
    tagline: "Kick off the weekend at Nomad.",
    poster: { src: "/images/nights/swift/swift-fridays-host.png", width: 574, height: 743, glow: "#1f3bd1", face: { x: 0.53, y: 0.285, zoom: 2.6 } },
  },
  {
    slug: "illicit-saturday",
    name: "Illicit Saturday",
    weekday: "Saturday",
    venue: "Vanquish",
    area: VENUES.Vanquish.area,
    folder: "illicit",
    tagline: "Saturday night, the way it should be, at Vanquish.",
    poster: { src: "/images/nights/illicit/illicit-saturday-host.png", width: 610, height: 761, glow: "#2a4bff", face: { x: 0.71, y: 0.52, zoom: 2.4 } },
  },
  {
    slug: "belle-vie-sunday",
    name: "Belle Vie Sunday",
    weekday: "Sunday",
    venue: "Vanquish",
    area: VENUES.Vanquish.area,
    folder: "belle-vie",
    tagline: "Close the week living the good life at Vanquish.",
    poster: { src: "/images/nights/belle-vie/belle-vie-sunday-host.png", width: 547, height: 622, glow: "#2146c7", face: { x: 0.66, y: 0.44, zoom: 2.8 } },
  },
];

const WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function getNight(slug: string) {
  return NIGHTS.find((night) => night.slug === slug);
}

export function nightLocation(night: Night) {
  return night.area ? `${night.area}, Kampala` : "Kampala";
}

export function kampalaWeekday(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "Africa/Kampala" }).format(date);
}

// A night runs until 6:00 AM, so Saturday 1:00 AM in Kampala still counts as Friday night.
const NIGHT_START_HOURS = parseInt(NIGHT_HOURS.start, 10);
const NIGHT_END_HOURS = parseInt(NIGHT_HOURS.end, 10);
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const KAMPALA_UTC_OFFSET_HOURS = 3; // Uganda has no daylight saving.

export function kampalaNightWeekday(date = new Date()) {
  return kampalaWeekday(new Date(date.getTime() - NIGHT_END_HOURS * HOUR_MS));
}

// Tonight's night, or the next one on days without a night (Tuesday, Thursday).
function getHighlight(weekday: string) {
  const today = WEEK.indexOf(weekday);
  for (let offset = 0; offset < WEEK.length; offset++) {
    const night = NIGHTS.find((n) => n.weekday === WEEK[(today + offset) % WEEK.length]);
    if (night) return { slug: night.slug, offset };
  }
  return null;
}

// The one answer to "what's on?", used by the whole site: tonight's night, or the next one on Tuesday and Thursday.
export function nightStatus(now = new Date()) {
  const highlight = getHighlight(kampalaNightWeekday(now));
  if (!highlight) return null;
  // Time since 6:00 AM on the day this night belongs to, which is when one night hands over to the next.
  const sinceDayStart = (now.getTime() + (KAMPALA_UTC_OFFSET_HOURS - NIGHT_END_HOURS) * HOUR_MS) % DAY_MS;
  const msUntilStart = highlight.offset * DAY_MS + (NIGHT_START_HOURS - NIGHT_END_HOURS) * HOUR_MS - sinceDayStart;
  const night = getNight(highlight.slug) as Night;
  const isHappening = msUntilStart <= 0;
  const isNextUp = highlight.offset > 0;

  let badge = "Tonight";
  if (isHappening) badge = "Happening now";
  else if (isNextUp) badge = "Next up";

  return {
    night,
    badge,
    isHappening,
    isNextUp,
    msUntilStart: Math.max(msUntilStart, 0),
    key: `${night.slug}|${badge}|${Math.ceil(Math.max(msUntilStart, 0) / 60000)}`,
  };
}

// The next date this night happens, as YYYY-MM-DD in Kampala time.
export function nextOccurrence(night: Night, from = new Date()) {
  const daysAhead = (WEEK.indexOf(night.weekday) - WEEK.indexOf(kampalaWeekday(from)) + 7) % 7;
  const date = new Date(from.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Kampala" }).format(date);
}

// The morning after a YYYY-MM-DD date, when that night ends.
export function nextDay(date: string) {
  return new Date(new Date(`${date}T00:00:00Z`).getTime() + DAY_MS).toISOString().slice(0, 10);
}
