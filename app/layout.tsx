import "@/lib/storyblok"; // 👈 REQUIRED (runs storyblokInit)

import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import SpookyHeader from "@/components/SpookyHeader";
import { apiPlugin, storyblokInit } from "@storyblok/react";

const bodyFont = Inter({ subsets: ["latin"] });
export const headingFont = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Haunters",
  description: "Haunted attractions and experiences",
};

const cachedFetch =(input: any, init?: any): Promise<Response> => {
  return fetch(input, {
    ...init,
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
  })
};

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    fetch: cachedFetch,
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.className} ${headingFont.variable} antialiased bg-slate-950 text-white`}>
        <Providers>
          <SpookyHeader />       
          {children}
        </Providers>
      </body>
    </html>
  );
}
