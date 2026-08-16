import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { BRAND } from "@/lib/brand";

const display = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--v3-display",
});
const body = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--v3-body",
});

// V3 — cobalt poster: one flat color field, oversized serif display,
// no cards, hairline dividers only.
// intentional: serif display on cobalt is a deliberate editorial-poster
// choice, not the cream/serif default (no cream bg, no sage accent).
export default function V3Page() {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#1F3FB5] text-[#F5F3EC] [font-family:var(--v3-body)] selection:bg-[#F5F3EC] selection:text-[#1F3FB5]`}
    >
      {/* Nav */}
      <header className="flex items-center justify-between px-6 sm:px-12 py-6">
        <span className="font-bold tracking-tight">{BRAND}</span>
        <a
          href="#"
          className="text-sm font-medium underline underline-offset-4 decoration-[#F5F3EC]/50 transition-colors duration-300 ease-out hover:decoration-[#F5F3EC]"
        >
          Erstgespräch vereinbaren
        </a>
      </header>

      {/* Hero — poster */}
      <section className="px-6 sm:px-12 pt-16 pb-24 sm:pt-24 sm:pb-32 max-w-6xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#F5F3EC]/70 mb-10">
          Cold-E-Mail-Terminierung für Recruiting-Agenturen
        </p>
        <h1 className="[font-family:var(--v3-display)] text-[clamp(3.2rem,10vw,8rem)] leading-[0.98] tracking-tight mb-4">
          Kein Vertriebler.
        </h1>
        <h1 className="[font-family:var(--v3-display)] italic text-[clamp(3.2rem,10vw,8rem)] leading-[0.98] tracking-tight mb-12">
          Trotzdem Termine.
        </h1>
        <p className="text-lg text-[#F5F3EC]/85 max-w-xl leading-relaxed mb-12">
          Wir schreiben Geschäftsführer direkt an — mit Terminvorschlag in
          jeder Mail. Sie führen nur noch das Gespräch.
        </p>
        <a
          href="#"
          className="inline-block bg-[#F5F3EC] text-[#1F3FB5] font-bold px-10 py-5 transition-colors duration-300 ease-out hover:bg-white"
        >
          Erstgespräch vereinbaren
        </a>
      </section>

      {/* Proof — poster numbers */}
      <section className="border-t border-[#F5F3EC]/25">
        {[
          ["76 %", "durchschnittliche Öffnungsrate — Geschäftsführer-Direktadressen"],
          ["4,2 %", "durchschnittliche Antwortrate von Entscheidern"],
          ["25.000 → 3–4", "Mails einer Referenzkampagne → Abschlüsse"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="grid sm:grid-cols-[1fr_1fr] items-baseline gap-x-10 gap-y-2 border-b border-[#F5F3EC]/25 px-6 sm:px-12 py-10 max-w-6xl mx-auto"
          >
            <span className="[font-family:var(--v3-display)] text-[clamp(2.6rem,6vw,5rem)] leading-none">
              {value}
            </span>
            <span className="text-[#F5F3EC]/80 leading-relaxed">{label}</span>
          </div>
        ))}
        <p className="px-6 sm:px-12 py-14 max-w-3xl mx-auto sm:mx-0 sm:max-w-none text-[#F5F3EC]/85 leading-relaxed">
          <span className="[font-family:var(--v3-display)] italic text-2xl block max-w-3xl">
            Ein eigener Vertriebler kostet 3.500 € im Monat, plus Provision —
            für kalte Termine. Unsere Termine kommen warm aus dem Postfach.
          </span>
        </p>
      </section>
    </div>
  );
}
