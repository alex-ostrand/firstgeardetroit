import { readdirSync } from "node:fs";
import path from "node:path";

// Every image dropped into public/gallery, in filename order.
export function galleryPhotos(): string[] {
  return readdirSync(path.join(process.cwd(), "public", "gallery"))
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .sort()
    .map((name) => `/gallery/${name}`);
}
