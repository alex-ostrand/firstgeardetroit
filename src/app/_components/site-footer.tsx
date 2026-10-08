import { FACEBOOK_URL, INSTAGRAM_URL, TIKTOK_URL } from "~/data/links";

const links = [
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Facebook", href: FACEBOOK_URL },
  { label: "TikTok", href: TIKTOK_URL },
];

export function SiteFooter() {
  return (
    <footer className="border-rule flex w-full flex-col items-center gap-3 border-t-4 border-double px-6 pt-6 pb-12 text-center sm:px-10">
      <p className="font-masthead text-3xl uppercase">First Gear Detroit</p>
      <nav
        aria-label="Social links"
        className="flex flex-wrap justify-center gap-x-8 font-bold"
      >
        {links.map((link) => (
          <a
            key={link.label}
            className="hover:text-muted inline-flex min-h-11 items-center underline underline-offset-4"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
