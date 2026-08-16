import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { BRAND } from "@/lib/brand";

const display = Archivo({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--v1-display",
});
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--v1-body",
});

// V1 — "Beweis in eigener Sache": paper white + ink + marker yellow,
// editorial 60/40 split, the cold email itself as hero artifact.
export default function V1Page() {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen overflow-x-hidden bg-[#FBFBF9] text-[#1A1A18] [font-family:var(--v1-body)] selection:bg-[#F7E948]`}
    >
      {/* Nav */}
      <header className="flex items-center justify-between px-6 sm:px-12 py-5 border-b border-[#1A1A18]/10">
        <span className="[font-family:var(--v1-display)] font-black tracking-tight text-lg">
          {BRAND}
        </span>
        <a
          href="#"
          className="bg-[#1A1A18] text-[#FBFBF9] text-sm font-semibold px-5 py-2.5 transition-colors duration-300 ease-out hover:bg-[#3A3A36]"
        >
          Erstgespräch vereinbaren
        </a>
      </header>

      {/* Hero — asymmetric 60/40 */}
      <section className="px-6 sm:px-12 pt-16 pb-20 sm:pt-24 sm:pb-28 grid gap-14 lg:grid-cols-[3fr_2fr] lg:gap-10 max-w-7xl mx-auto items-start">
        <div>
          <p className="text-sm font-medium text-[#6B6B64] mb-6 max-w-md leading-relaxed">
            Sie lesen das hier, weil eine E-Mail von uns Sie neugierig gemacht
            hat. Genau so gewinnen Sie Ihre nächsten Kunden.
          </p>
          <h1 className="[font-family:var(--v1-display)] font-black text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[1.02] tracking-tight mb-8">
            Warme Termine statt{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-[-0.15em] bottom-[0.05em] top-[0.28em] bg-[#F7E948] -z-10" />
              Cold Calls.
            </span>
          </h1>
          <p className="text-lg text-[#3A3A36] max-w-xl leading-relaxed mb-10">
            Cold-E-Mail-Terminierung für Recruiting-Agenturen: Wir schreiben
            Geschäftsführer direkt an, mit Terminvorschlag in jeder Mail. Wer
            antwortet, will reden.
          </p>
          <a
            href="#"
            className="inline-block bg-[#1A1A18] text-[#FBFBF9] font-semibold px-8 py-4 transition-colors duration-300 ease-out hover:bg-[#3A3A36]"
          >
            Erstgespräch vereinbaren
          </a>
        </div>

        {/* The email artifact */}
        <div className="border border-[#1A1A18]/15 bg-white shadow-[8px_8px_0_#1A1A18]">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[#1A1A18]/10 text-xs text-[#6B6B64]">
            <span className="font-semibold text-[#1A1A18]">Posteingang</span>
            <span>· heute, 09:14</span>
          </div>
          <div className="px-5 py-5 text-sm leading-relaxed">
            <p className="mb-1">
              <span className="text-[#6B6B64]">Von:</span>{" "}
              <span className="font-semibold">{BRAND}</span>
            </p>
            <p className="mb-4">
              <span className="text-[#6B6B64]">An:</span> Geschäftsführung
            </p>
            <p className="mb-3">Guten Tag,</p>
            <p className="mb-3 text-[#3A3A36]">
              zwei Sätze zu Ihrer Agentur, ein konkreter Nutzen, kein
              Blabla.
            </p>
            <p className="mb-4">
              <span className="relative inline">
                <span className="bg-[#F7E948] box-decoration-clone px-0.5">
                  Passt Ihnen Donnerstag, 10:30 Uhr für 15 Minuten?
                </span>
              </span>
            </p>
            <p className="text-[#6B6B64]">Mit freundlichen Grüßen</p>
          </div>
          <div className="flex gap-2 px-5 pb-5">
            <span className="border border-[#1A1A18]/20 text-xs px-3 py-1.5 text-[#3A3A36]">
              Antworten
            </span>
            <span className="border border-[#1A1A18]/20 text-xs px-3 py-1.5 text-[#3A3A36]">
              Termin bestätigen
            </span>
          </div>
        </div>
      </section>

      {/* Proof — campaign ledger */}
      <section className="border-t border-[#1A1A18]/10 px-6 sm:px-12 py-16 sm:py-20 max-w-7xl mx-auto">
        <h2 className="[font-family:var(--v1-display)] font-bold text-2xl mb-10">
          Kampagnen-Log
        </h2>
        <dl className="divide-y divide-[#1A1A18]/10 border-y border-[#1A1A18]/10">
          {[
            ["Öffnungsrate", "Ø 76 %", "Geschäftsführer-Direktadressen, kein info@-Postfach"],
            ["Antwortrate", "Ø 4,2 %", "Antworten von Entscheidern, nicht von Assistenzen"],
            ["Referenzkampagne", "25.000 Mails → 3–4 Abschlüsse", "Peak-Phasen: mehrere Interessenten pro Tag"],
            ["Terminvorschlag", "in jeder Mail", "Wer antwortet, bestätigt einen Termin — kein Hin und Her"],
          ].map(([label, value, note]) => (
            <div
              key={label}
              className="grid sm:grid-cols-[1fr_auto] gap-x-8 gap-y-1 py-5 items-baseline"
            >
              <div>
                <dt className="font-semibold">{label}</dt>
                <dd className="text-sm text-[#6B6B64]">{note}</dd>
              </div>
              <dd className="[font-family:var(--v1-display)] font-black text-2xl sm:text-3xl sm:whitespace-nowrap">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 max-w-2xl text-[#3A3A36] leading-relaxed">
          Zum Vergleich: Ein eigener Vertriebler kostet 3.500 € im Monat fix,
          plus Provision — und liefert kalte Termine. Unsere Termine kommen aus
          Antworten von Geschäftsführern, die bereits interessiert sind.
        </p>
      </section>
    </div>
  );
}
