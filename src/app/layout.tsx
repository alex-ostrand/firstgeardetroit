import "~/styles/globals.css";

import { type Metadata } from "next";
import { Anton, Old_Standard_TT, PT_Serif } from "next/font/google";

export const metadata: Metadata = {
  title: "First Gear Detroit",
  description: "Monthly Cars & Coffee meets across Michigan.",
  icons: { icon: "/pfp-icon", apple: "/pfp-icon" },
  openGraph: {
    title: "First Gear Detroit",
    description: "Monthly Cars & Coffee meets across Michigan.",
    siteName: "First Gear Detroit",
    type: "website",
  },
};

const oldStandard = Old_Standard_TT({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-old-standard",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-serif",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${oldStandard.variable} ${anton.variable} ${ptSerif.variable}`}
    >
      <body className="font-serif">
        <div aria-hidden className="paper-grain" />
        {children}
      </body>
    </html>
  );
}
