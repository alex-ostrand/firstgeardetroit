import {
  getEvents,
  getTodayInDetroit,
  toIcsStamp,
  upcomingEvents,
} from "~/lib/events";

export const revalidate = 3600;

function escapeIcsText(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;")
    .replace(/\r?\n/g, "\\n");
}

// TZID events need a matching VTIMEZONE (current US Eastern rules).
const DETROIT_VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:America/Detroit",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:-0500",
  "TZOFFSETTO:-0400",
  "TZNAME:EDT",
  "DTSTART:19700308T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:-0400",
  "TZOFFSETTO:-0500",
  "TZNAME:EST",
  "DTSTART:19701101T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

export async function GET() {
  const [event] = upcomingEvents(await getEvents(), getTodayInDetroit());
  if (!event) return new Response("No upcoming meet.", { status: 404 });

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//First Gear Detroit//Cars and Coffee//EN",
    ...DETROIT_VTIMEZONE,
    "BEGIN:VEVENT",
    `UID:${event.date}@firstgeardetroit`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, "")}`,
    `DTSTART;TZID=America/Detroit:${toIcsStamp(event.date, event.startTime)}`,
    `DTEND;TZID=America/Detroit:${toIcsStamp(event.date, event.endTime)}`,
    "SUMMARY:First Gear Detroit Cars & Coffee",
    `LOCATION:${escapeIcsText(`${event.host}, ${event.address}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(lines.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="first-gear-meet.ics"',
    },
  });
}
