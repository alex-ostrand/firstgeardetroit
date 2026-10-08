import { expect, test } from "bun:test";

import { fromApiMeet, daysUntil, getTodayInDetroit, nextFirstSaturday, toIcsStamp, upcomingEvent, upcomingEvents } from "~/lib/events";

const meet = {
  date: "2026-10-03",
  startTime: "9:00 AM",
  endTime: "12:00 PM",
  city: "Troy",
  host: "Mood Coffee Shop",
  address: "5385 Crooks Road, Troy, MI 48098",
};

test("past event is hidden", () => {
  expect(upcomingEvent(meet, "2026-10-06")).toBeNull();
});

test("event today is still shown", () => {
  expect(upcomingEvent(meet, "2026-10-03")).toEqual(meet);
});

test("no event returns null", () => {
  expect(upcomingEvent(null, "2026-10-06")).toBeNull();
});

test("Detroit date at 10:30pm local is still the same day", () => {
  // 02:30 UTC on Oct 4 is 10:30pm EDT on Oct 3 in Detroit.
  expect(getTodayInDetroit(new Date("2026-10-04T02:30:00Z"))).toBe("2026-10-03");
});

test("malformed date is treated as no event", () => {
  expect(upcomingEvent({ ...meet, date: "2026-11-7" }, "2026-10-06")).toBeNull();
  expect(upcomingEvent({ ...meet, date: "2026-13-45" }, "2026-10-06")).toBeNull();
});

test("days until the meet", () => {
  expect(daysUntil("2026-11-07", "2026-10-06")).toBe(32);
  expect(daysUntil("2026-10-06", "2026-10-06")).toBe(0);
  expect(daysUntil("2026-10-07", "2026-10-06")).toBe(1);
});

test("calendar stamps use 24-hour Detroit wall time", () => {
  expect(toIcsStamp("2026-11-07", "9:00 AM")).toBe("20261107T090000");
  expect(toIcsStamp("2026-11-07", "12:00 PM")).toBe("20261107T120000");
  expect(toIcsStamp("2026-11-07", "12:15 AM")).toBe("20261107T001500");
});

test("next first Saturday", () => {
  expect(nextFirstSaturday("2026-10-06")).toBe("2026-11-07");
  expect(nextFirstSaturday("2026-11-07")).toBe("2026-11-07");
  expect(nextFirstSaturday("2026-11-08")).toBe("2026-12-05");
  expect(nextFirstSaturday("2026-12-20")).toBe("2027-01-02");
  expect(nextFirstSaturday("2026-10-03")).toBe("2026-10-03");
});

test("upcoming events are filtered, validated, and sorted soonest first", () => {
  const a = { ...meet, date: "2026-12-05", host: "B" };
  const b = { ...meet, date: "2026-11-07", host: "A" };
  const past = { ...meet, date: "2026-10-03" };
  const bad = { ...meet, date: "11/07/2026" };
  expect(upcomingEvents([a, past, bad, b], "2026-10-06").map((e) => e.host)).toEqual(["A", "B"]);
  expect(upcomingEvents([], "2026-10-06")).toEqual([]);
});

test("fromApiMeet maps an API meet to an Event in Detroit time", () => {
    expect(
      fromApiMeet({
        title: "ECC Cars & Coffee",
        venueName: "ZF North America",
        addressLine: "15702 Technology Drive, Northville, MI, 48168",
        externalUrl: "https://example.com",
        startsAt: "2026-10-10T13:00:00.000Z",
        endsAt: "2026-10-10T16:00:00.000Z",
        timeZone: "America/Detroit",
      }),
    ).toMatchObject({ date: "2026-10-10", startTime: "9:00 AM", endTime: "12:00 PM", city: "Northville", host: "ZF North America" });
});
