import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SWRProvider } from "@/providers/swr-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GearUp | Rent Sports & Outdoor Gear Instantly",
  description: "GearUp is a modern sports and outdoor equipment rental service. Browse gear, choose rental dates, and rent instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}

