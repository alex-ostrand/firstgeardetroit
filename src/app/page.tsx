import { NextEvent } from "~/app/_components/next-event";
import { PhotoReel } from "~/app/_components/photo-reel";
import { UpcomingList } from "~/app/_components/upcoming-list";
import { SiteFooter } from "~/app/_components/site-footer";
import { SiteHeader } from "~/app/_components/site-header";
import { Story } from "~/app/_components/story";
import { getEvents, getTodayInDetroit, upcomingEvents } from "~/lib/events";
import { galleryPhotos } from "~/lib/photos";

export const revalidate = 3600;

export default async function Home() {
  const [event = null, ...later] = upcomingEvents(
    await getEvents(),
    getTodayInDetroit(),
  );

  return (
    <main className="flex min-h-[100dvh] flex-col sm:px-6 sm:py-12">
      <div className="sheet mx-auto flex w-full max-w-6xl flex-col">
        <SiteHeader />

        <div className="w-full px-6 py-8 sm:px-10">
          <section className="grid gap-8 lg:grid-cols-[1.9fr_1fr] lg:gap-10">
            <Story />
            <div className="lg:border-rule flex flex-col gap-8 lg:border-l-2 lg:pl-8">
              <NextEvent event={event} />
              <UpcomingList events={later} />
              <PhotoReel photos={galleryPhotos()} />
            </div>
          </section>
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}
