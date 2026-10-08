import { type Event } from "~/lib/events";

export function UpcomingList({ events }: { events: Event[] }) {
  if (events.length === 0) return null;

  return (
    <section aria-labelledby="also-coming" className="flex flex-col gap-3">
      <h2
        id="also-coming"
        className="font-headline head-rule text-xl font-bold tracking-[0.04em] uppercase"
      >
        Also Coming Up
      </h2>
      <ul className="flex flex-col">
        {events.map((e) => {
          const when = new Date(`${e.date}T12:00:00Z`).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              timeZone: "America/Detroit",
            },
          );
          return (
            <li
              key={e.date}
              className="border-rule/40 border-b py-3 last:border-b-0"
            >
              <p className="font-headline font-bold">{when}</p>
              <p className="text-base">
                {e.host}, {e.city}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
