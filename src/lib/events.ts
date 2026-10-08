export type Event = {
  date: string;
  startTime: string;
  endTime: string;
  city: string;
  host: string;
  address: string;
  postUrl?: string;
};

export function getTodayInDetroit(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Detroit",
  }).format(now);
}

export function upcomingEvent(
  event: Event | null,
  today: string,
): Event | null {
  if (!event) return null;
  // A hand-typed date that isn't a real YYYY-MM-DD counts as no event.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date)) return null;
  if (Number.isNaN(Date.parse(`${event.date}T12:00:00Z`))) return null;
  return event.date >= today ? event : null;
}

export function daysUntil(date: string, today: string): number {
  const ms = Date.parse(`${date}T12:00:00Z`) - Date.parse(`${today}T12:00:00Z`);
  return Math.round(ms / 86_400_000);
}

export function toIcsStamp(date: string, time: string): string {
  const match = /(\d+):(\d+)\s*(AM|PM)/i.exec(time);
  if (!match) return `${date.replaceAll("-", "")}T000000`;
  let hours = Number(match[1]) % 12;
  if (match[3]!.toUpperCase() === "PM") hours += 12;
  const mm = match[2]!.padStart(2, "0");
  return `${date.replaceAll("-", "")}T${String(hours).padStart(2, "0")}${mm}00`;
}

function firstSaturdayOf(year: number, month: number): string {
  const weekday = new Date(Date.UTC(year, month, 1, 12)).getUTCDay();
  const day = 1 + ((6 - weekday + 7) % 7);
  return new Date(Date.UTC(year, month, day, 12)).toISOString().slice(0, 10);
}

export function nextFirstSaturday(today: string): string {
  const [y, m] = today.split("-").map(Number) as [number, number];
  const thisMonth = firstSaturdayOf(y, m - 1);
  return thisMonth >= today ? thisMonth : firstSaturdayOf(y, m);
}

export function upcomingEvents(events: Event[], today: string): Event[] {
  return events
    .flatMap((event) => {
      const upcoming = upcomingEvent(event, today);
      return upcoming ? [upcoming] : [];
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

const API_URL = "https://detmeets.com/api/v1/meets/search?q=first+gear";

type ApiMeet = {
  title: string;
  venueName: string | null;
  addressLine: string | null;
  externalUrl: string | null;
  startsAt: string;
  endsAt: string | null;
  timeZone: string | null;
  timesTbd?: boolean;
  operationalStatus?: string;
};

export function fromApiMeet(m: ApiMeet): Event | null {
  const start = new Date(m.startsAt);
  if (
    Number.isNaN(start.getTime()) ||
    !m.addressLine ||
    m.operationalStatus === "cancelled"
  )
    return null;
  const tz = m.timeZone ?? "America/Detroit";
  const time = (d: Date) =>
    d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
    });
  return {
    date: new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(start),
    startTime: time(start),
    endTime: m.endsAt ? time(new Date(m.endsAt)) : "",
    city: m.addressLine.split(",")[1]?.trim() ?? "",
    host: m.venueName ?? m.title,
    address: m.addressLine,
    postUrl: m.externalUrl ?? undefined,
  };
}

export async function getEvents(): Promise<Event[]> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(String(res.status));
    const { data } = (await res.json()) as { data: ApiMeet[] };
    return data.flatMap((m) => fromApiMeet(m) ?? []);
  } catch {
    return [];
  }
}
