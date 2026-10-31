import fs from "fs";
import path from "path";

const IMAGE_FILE = /\.(webp|avif|jpe?g|png)$/i;

// Lists the images in a public/ folder at build time, so adding a photo only needs a redeploy.
export function listPhotos(folder, altFor) {
  let files = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", folder));
  } catch {
    return [];
  }
  return files
    .filter((file) => IMAGE_FILE.test(file))
    .sort()
    .map((file, index) => ({ src: `/${folder}/${file}`, alt: altFor(file, index) }));
}
