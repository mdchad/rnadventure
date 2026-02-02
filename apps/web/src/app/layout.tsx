import type { Metadata } from "next";

import { Geist, Geist_Mono, DM_Sans, Outfit } from "next/font/google";

import "../index.css";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "RNAdventure - Singapore Tour Guide & Transport Services",
  description:
    "Book personalized Singapore tours with an experienced local guide. City tours, food tours, mosque visits, and edutrips. Flexible schedules, multiple languages, private transport available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${outfit.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
