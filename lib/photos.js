import fs from "fs";
import path from "path";
import { VENUES } from "../data/nights";

const IMAGE_FILE = /\.(webp|avif|jpe?g|png)$/i;
const HOST_POSTER = /-host\.(webp|avif|jpe?g|png)$/i;

// Lists the images in a public/ folder at build time, so adding a photo only needs a redeploy.
export function listPhotos(folder, altFor) {
  let files = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", folder));
  } catch {
    return [];
  }
  return files
    .filter((file) => IMAGE_FILE.test(file) && !HOST_POSTER.test(file))
    .sort()
    .map((file, index) => ({ src: `/${folder}/${file}`, alt: altFor(file, index) }));
}

// A venue's logo from public/images/partners/ (e.g. nomad-logo.png), or null if there isn't one yet.
export function venueLogo(venue) {
  const name = venue.toLowerCase();
  let files = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public/images/partners")).filter((file) => IMAGE_FILE.test(file));
  } catch {
    return null;
  }
  const file = files.find((f) => f.startsWith(`${name}-logo-full.`)) || files.find((f) => f.startsWith(`${name}-logo.`));
  return file ? `/images/partners/${file}` : null;
}

export function venueLogos() {
  return Object.fromEntries(Object.keys(VENUES).map((venue) => [venue, venueLogo(venue)]));
}
