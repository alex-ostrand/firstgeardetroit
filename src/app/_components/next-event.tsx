import { directionsUrl, INSTAGRAM_URL } from "~/data/links";
import { type Event } from "~/lib/events";

function parts(date: string) {
  const d = new Date(`${date}T12:00:00Z`);
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("en-US", { ...o, timeZone: "America/Detroit" });
  return {
    weekday: fmt({ weekday: "long" }),
    month: fmt({ month: "short" }),
    day: fmt({ day: "numeric" }),
    year: fmt({ year: "numeric" }),
  };
}

function DateBlock({ date }: { date: string }) {
  const { weekday, month, day, year } = parts(date);
  return (
    <div className="font-headline border-rule flex min-w-[6.5rem] flex-col items-center border-r-2 pr-5 text-center">
      <span className="text-sm font-bold tracking-[0.14em] uppercase">
        {weekday}
      </span>
      <span className="font-masthead text-8xl leading-[0.95]">{day}</span>
      <span className="text-sm font-bold tracking-[0.14em] uppercase">
        {month} {year}
      </span>
    </div>
  );
}

const shell = "flex flex-col border-2 border-rule";
const band =
  "font-headline bg-rule px-5 py-2 text-center text-lg font-bold uppercase tracking-[0.2em] text-paper";
const press =
  "transition-[scale,background-color,border-color,color] duration-150 ease-out active:scale-[0.97] motion-reduce:active:scale-100";
const primaryBtn = `${press} inline-flex min-h-12 items-center justify-center border-2 border-rule bg-rule px-6 font-bold text-paper hover:border-muted hover:bg-muted`;
const secondaryBtn = `${press} inline-flex min-h-12 items-center justify-center border-2 border-rule px-6 font-bold hover:bg-rule hover:text-paper`;

export function NextEvent({ event }: { event: Event | null }) {
  if (event === null) {
    return (
      <aside aria-labelledby="next-meet" className={shell}>
        <h2 id="next-meet" className={band}>
          Next Meet
        </h2>
        <div className="p-5">
          <p className="font-masthead text-5xl leading-[0.95]">Stay tuned</p>
        </div>
        <p className="border-rule border-t-2 px-5 py-4 text-base leading-relaxed">
          Our next meet will be announced soon.
        </p>
        <div className="border-rule border-t-2 p-5">
          <a
            className={`${primaryBtn} w-full`}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow us on Instagram
          </a>
        </div>
      </aside>
    );
  }

  return (
    <aside aria-labelledby="next-meet" className={shell}>
      <h2 id="next-meet" className={band}>
        Next Meet
      </h2>

      <div className="flex gap-5 p-5">
        <DateBlock date={event.date} />
        <div className="flex flex-col justify-center gap-2">
          <p className="font-headline text-2xl leading-tight font-bold">
            {event.host}
          </p>
          <p className="text-lg italic">{event.city}, Michigan</p>
        </div>
      </div>

      <dl className="divide-rule/40 border-rule divide-y border-t-2 text-base">
        <div className="flex gap-4 px-5 py-3">
          <dt className="font-headline w-16 shrink-0 pt-0.5 text-sm font-bold tracking-[0.12em] uppercase">
            Time
          </dt>
          <dd>
            {event.startTime} to {event.endTime}
          </dd>
        </div>
        <div className="flex gap-4 px-5 py-3">
          <dt className="font-headline w-16 shrink-0 pt-0.5 text-sm font-bold tracking-[0.12em] uppercase">
            Where
          </dt>
          <dd>{event.address}</dd>
        </div>
      </dl>

      <div className="border-rule flex flex-col gap-3 border-t-2 p-5">
        <a
          className={primaryBtn}
          href={directionsUrl(event.address)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions
        </a>
        <a className={secondaryBtn} href="/calendar">
          Add to calendar
        </a>
      </div>
    </aside>
  );
}
