# First Gear

Website for First Gear, a monthly cars & coffee meet in metro Detroit. It shows the next meet, what's coming up, photos, and social links.

Built with Next.js (App Router), React 19, and Tailwind CSS.

## Develop

```sh
bun install
bun dev
```

Other scripts: `bun run build`, `bun run check` (lint + typecheck), `bun test`.

## How it works

- **Events** come from the [detmeets.com](https://detmeets.com) API, fetched in `getEvents()` in [src/lib/events.ts](src/lib/events.ts) and cached for an hour. Past and cancelled meets are filtered out. If the API is down, no events are shown.
- **Social links** live in [src/data/links.ts](src/data/links.ts).
- **Photos** are in `public/gallery/`, brand assets in `public/brand/`.
- **Pages** are in [src/app/](src/app/): home, `/calendar`, and `/pfp-icon`.
