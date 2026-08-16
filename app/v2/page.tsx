import { JetBrains_Mono, Instrument_Sans } from "next/font/google";
import { BRAND } from "@/lib/brand";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--v2-mono",
});
const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--v2-sans",
});

// V2 — "Zustell-Protokoll": ink navy + terminal amber, monospace data
// aesthetic. Flat amber, no glow. intentional: dark background is a
// deliberate protocol/terminal metaphor, not a tech-default.
export default function V2Page() {
  return (
    <div
      className={`${mono.variable} ${sans.variable} min-h-screen bg-[#0A0F1E] text-[#E8ECF5] [font-family:var(--v2-sans)] selection:bg-[#FFB224] selection:text-[#0A0F1E]`}
    >
      {/* Status bar */}
      <header className="flex items-center justify-between px-5 sm:px-10 py-4 border-b border-[#E8ECF5]/15 [font-family:var(--v2-mono)] text-xs tracking-widest uppercase">
        <span>{BRAND}</span>
        <span className="hidden sm:inline text-[#8A93A8]">
          zustell-protokoll / recruiting
        </span>
        <a
          href="#"
          className="border border-[#FFB224] text-[#FFB224] px-4 py-2 transition-colors duration-300 ease-out hover:bg-[#FFB224] hover:text-[#0A0F1E]"
        >
          Erstgespräch
        </a>
      </header>

      {/* Hero */}
      <section className="px-5 sm:px-10 pt-20 pb-16 sm:pt-28 sm:pb-24 max-w-6xl mx-auto">
        <p className="[font-family:var(--v2-mono)] text-[#FFB224] text-sm mb-6">
          &gt; für Recruiting-Agenturen
        </p>
        <h1 className="[font-family:var(--v2-mono)] font-bold text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.08] tracking-tight max-w-4xl mb-8">
          Ihr Kalender füllt sich von selbst.
        </h1>
        <p className="text-lg text-[#B8C0D4] max-w-2xl leading-relaxed mb-12">
          Wir versenden Cold-E-Mails direkt an Geschäftsführer — mit
          Terminvorschlag in jeder einzelnen Mail. Ohne Cold Calls, ohne
          eigenen Vertriebler. Sie übernehmen erst, wenn der Termin steht.
        </p>
        <a
          href="#"
          className="inline-block bg-[#FFB224] text-[#0A0F1E] font-semibold px-8 py-4 transition-colors duration-300 ease-out hover:bg-[#FFC85C]"
        >
          Erstgespräch vereinbaren
        </a>
      </section>

      {/* Proof — protocol log */}
      <section className="border-t border-[#E8ECF5]/15 px-5 sm:px-10 py-16 sm:py-20 max-w-6xl mx-auto">
        <p className="[font-family:var(--v2-mono)] text-xs uppercase tracking-widest text-[#8A93A8] mb-8">
          protokoll · referenzkampagne
        </p>
        <div className="[font-family:var(--v2-mono)] text-sm sm:text-base space-y-4">
          {[
            ["25.000", "E-Mails an Geschäftsführer zugestellt"],
            ["76 %", "durchschnittliche Öffnungsrate"],
            ["4,2 %", "durchschnittliche Antwortrate"],
            ["1/1", "Terminvorschlag in jeder Mail enthalten"],
            ["3–4", "Abschlüsse aus einer Kampagne"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="flex items-baseline gap-4 border-b border-dashed border-[#E8ECF5]/15 pb-4"
            >
              <span className="text-[#FFB224] font-bold text-xl sm:text-2xl min-w-[6ch]">
                {value}
              </span>
              <span className="text-[#B8C0D4]">{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-[#B8C0D4] leading-relaxed">
          Ein eigener Vertriebler: 3.500 € fix pro Monat, plus Provision, und
          die Termine bleiben kalt. Antworten auf eine E-Mail mit
          Terminvorschlag sind das Gegenteil — der Entscheider hat sich schon
          entschieden, mit Ihnen zu sprechen.
        </p>
      </section>
    </div>
  );
}
