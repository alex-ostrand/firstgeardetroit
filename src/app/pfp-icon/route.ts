import { readFile } from "node:fs/promises";
import path from "node:path";

import { INSTAGRAM_URL } from "~/data/links";

export const revalidate = 86400;

async function profilePicture(): Promise<Response | null> {
  const page = await fetch(INSTAGRAM_URL, { headers: { "User-Agent": "Mozilla/5.0" } });
  const src = /og:image" content="([^"]+)"/.exec(await page.text())?.[1]?.replaceAll("&amp;", "&");
  if (!src) return null;
  const img = await fetch(src);
  return img.ok ? img : null;
}

export async function GET() {
  const headers = { "Cache-Control": "public, max-age=86400" };
  try {
    const img = await profilePicture();
    if (img) {
      return new Response(await img.arrayBuffer(), {
        headers: { ...headers, "Content-Type": img.headers.get("content-type") ?? "image/jpeg" },
      });
    }
  } catch {}
  const fallback = await readFile(path.join(process.cwd(), "public/brand/icon.png"));
  return new Response(fallback, { headers: { ...headers, "Content-Type": "image/png" } });
}
