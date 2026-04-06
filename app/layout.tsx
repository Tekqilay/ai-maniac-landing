import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The AI Maniac — Your Calls. Automatically Documented.",
  description:
    "Record your call. Get custom documents in minutes. No manual work, no copy-pasting. Built for coaches, consultants, and sales teams.",
  openGraph: {
    title: "The AI Maniac — Your Calls. Automatically Documented.",
    description:
      "Record your call. Get custom documents in minutes. Built for coaches, consultants, and sales teams.",
    url: "https://theaimaniac.com",
    siteName: "The AI Maniac",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body
        className={`${plusJakartaSans.variable} font-[family-name:var(--font-plus-jakarta)] min-h-full flex flex-col bg-slate-950 text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
