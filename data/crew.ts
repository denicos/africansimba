import { NIGHTS } from "./nights";

// The MCs and DJs shown in "The Crew" on the homepage, in display order.
// To add someone: drop their photos in public/images/crew/ and add an entry below.
// nights takes night slugs from data/nights.ts, e.g. ["bandali-mondays", "illicit-saturday"].
// While a listed night is live their card shows "LIVE NOW". Leave it empty to hide the nights line;
// until nights are set, the card shows "LIVE NOW" on every live night.

export type CrewMember = {
  slug: string;
  stageName: string;
  role: "MC" | "DJ";
  tagline: string;
  bio: string;
  photo: string; // the card photo, shown at 3:4
  gallery: string[]; // the slideshow in the profile
  instagram?: string;
  nights: string[];
};

export const CREW: CrewMember[] = [
  {
    slug: "mc-future",
    stageName: "MC Future",
    role: "MC",
    tagline: "The Voice on the Mic",
    bio: "MC Future brings the fire to every night – big voice, bigger energy, and a crowd that answers back.",
    photo: "/images/crew/mc-future-poster4.jpg",
    gallery: [
      "/images/crew/mc-future-poster2.jpg",
      "/images/crew/mc-future-poster3.jpg",
      "/images/crew/mc-future-poster4.jpg",
      "/images/crew/mc-future-poster5.jpg",
    ],
    instagram: "https://www.instagram.com/life_of_future_mc",
    nights: [],
  },
];

// Whether this member is on tonight. With no nights set yet, they count as on for every live night.
export function isCrewLive(member: CrewMember, liveSlug: string | undefined) {
  if (!liveSlug) return false;
  return member.nights.length === 0 || member.nights.includes(liveSlug);
}

// The names of the nights this member works, in week order.
export function crewNights(member: CrewMember) {
  return NIGHTS.filter((night) => member.nights.includes(night.slug)).map((night) => night.name);
}
