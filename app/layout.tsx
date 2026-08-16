import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Firmengedächtnis für Elektro-Großhandel — The AI Maniac",
  description:
    "Automatische Call-Dokumentation für den Elektro-Großhandel Innendienst. Jeder Anruf wird zur Bestellnotiz, zum Angebots-Draft, zum Reklamations-Protokoll — ohne Tippen, ohne Vergessen.",
  openGraph: {
    title: "Firmengedächtnis für Elektro-Großhandel — The AI Maniac",
    description:
      "Jeder eingehende Call im Innendienst wird automatisch dokumentiert. Bestellnotiz, Angebot, Reklamation, Beratungs-Protokoll — direkt vom Schreibtisch-PC.",
    url: "https://theaimaniac.com",
    siteName: "The AI Maniac",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark h-full antialiased">
      <body
        className={`${plusJakartaSans.variable} font-[family-name:var(--font-plus-jakarta)] min-h-full flex flex-col bg-slate-950 text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
