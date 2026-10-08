"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SECONDS_PER_PHOTO = 5;

export function PhotoReel({ photos }: { photos: string[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (photos.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setCurrent((n) => (n + 1) % photos.length),
      SECONDS_PER_PHOTO * 1000,
    );
    return () => clearInterval(id);
  }, [photos.length, paused]);

  if (photos.length === 0) return null;

  return (
    <figure className="border-rule relative aspect-[4/3] w-full overflow-hidden border">
      {photos.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Photo ${i + 1} of ${photos.length} from a First Gear meet`}
          fill
          priority={i === 0}
          aria-hidden={i !== current}
          sizes="(min-width: 1024px) 360px, 100vw"
          className={`object-cover contrast-[1.05] grayscale sepia-[18%] transition-opacity duration-700 ease-out motion-reduce:transition-none ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {photos.length > 1 && (
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
          className="bg-rule text-paper font-headline absolute right-0 bottom-0 inline-flex min-h-11 items-center px-4 text-sm font-bold tracking-[0.08em] uppercase"
        >
          {paused ? "Play" : "Pause"}
        </button>
      )}
    </figure>
  );
}
