import { INSTAGRAM_URL } from "~/data/links";
import { getTodayInDetroit } from "~/lib/events";

export function SiteHeader() {
  return (
    <header className="w-full px-6 pt-6 sm:px-10">
      <div className="border-rule border-y-4 border-double py-4 text-center">
        <h1 className="font-masthead text-[17vw] leading-[0.88] font-normal uppercase sm:text-[8.5rem]">
          First Gear Detroit
        </h1>
      </div>
      <div className="font-headline border-rule flex items-center justify-between gap-4 border-b-2 py-2 text-sm font-bold tracking-[0.06em] uppercase">
        <span className="whitespace-nowrap">Cars &amp; Coffee</span>
        <a
          className="hover:text-muted hidden whitespace-nowrap underline underline-offset-4 sm:inline"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          @FirstGearDetroit
        </a>
        <span className="whitespace-nowrap">July 27, 2026</span>
      </div>
      <p className="font-headline border-rule border-b-4 border-double py-3 text-center text-2xl font-bold tracking-[0.08em] uppercase sm:text-4xl lg:text-5xl">
        A New Kind of Morning Show
      </p>
    </header>
  );
}
