export const INSTAGRAM_URL = "https://www.instagram.com/FirstGearDetroit";
export const FACEBOOK_URL = "https://www.facebook.com/people/First-Gear-Detroit-Cars-Coffee/61592465012229/";
export const TIKTOK_URL = "https://www.tiktok.com/@firstgeardetroit";

export function directionsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
