import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { BRAND } from "@/lib/brand";
import { SmoothScroll, HeroEmailCard, Count, ProcessTimeline } from "./motion";

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
      <SmoothScroll />

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

      {/* 1 — Hero, asymmetric 60/40 */}
      <section className="px-6 sm:px-12 pt-16 pb-20 sm:pt-24 sm:pb-28 grid gap-14 lg:grid-cols-[3fr_2fr] lg:gap-10 max-w-7xl mx-auto items-start">
        <div>
          <p className="text-sm font-medium text-[#6B6B64] mb-6 max-w-md leading-relaxed">
            Sie lesen das hier, weil eine E-Mail von uns Sie neugierig gemacht
            hat. Genau so gewinnen Sie Ihre nächsten Kunden.
          </p>
          <h1 className="[font-family:var(--v1-display)] font-black text-[clamp(2.6rem,6.2vw,4.6rem)] leading-[1.02] tracking-tight mb-8">
            Ihr Kalender füllt sich{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-[-0.15em] bottom-[0.05em] top-[0.28em] bg-[#F7E948]" />
              <span className="relative">von selbst.</span>
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
        <HeroEmailCard />
      </section>

      {/* 2 — Process: the 4 months as a timeline */}
      <section className="border-t border-[#1A1A18]/10 px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12">
          <div>
            <h2 className="[font-family:var(--v1-display)] font-black text-3xl sm:text-4xl tracking-tight mb-5">
              So funktioniert es
            </h2>
            <p className="text-[#3A3A36] leading-relaxed max-w-md">
              Vier Monate, ein klarer Ablauf. Wir sagen Ihnen auch, was im
              ersten Monat passiert, bevor die erste Mail rausgeht — die
              meisten verschweigen das.
            </p>
          </div>
          <ProcessTimeline
            items={[
              {
                month: "Monat 1",
                title: "Setup und Warmup",
                text: "Wir bauen Ihre Kampagne: Geschäftsführer-Listen für Ihre Zielbranche, Copy, Versand-Infrastruktur. Die Postfächer wärmen rund 3 Wochen auf. Das ist unsichtbare Arbeit, aber der Grund, warum unsere Mails im Posteingang landen statt im Spam.",
              },
              {
                month: "Monat 2",
                title: "Versand startet",
                text: "Die ersten Kampagnen laufen. Jede Mail enthält einen konkreten Terminvorschlag. Antworten laufen bei uns auf, bestätigte Termine landen in Ihrem Kalender.",
              },
              {
                month: "Monat 3",
                title: "Nachschärfen",
                text: "Betreffzeilen, Zielgruppen und Sendezeiten werden gegen die echten Antwortdaten optimiert, nicht gegen Bauchgefühl.",
              },
              {
                month: "Monat 4",
                title: "Voller Lauf",
                text: "Die Kampagne läuft auf Zielniveau. Ihr Kalender füllt sich kontinuierlich, Sie führen nur noch die Gespräche.",
              },
            ]}
          />
        </div>
      </section>

      {/* 3 — Proof: campaign ledger with count-ups */}
      <section className="border-t border-[#1A1A18]/10 px-6 sm:px-12 py-16 sm:py-20 max-w-7xl mx-auto">
        <h2 className="[font-family:var(--v1-display)] font-black text-3xl sm:text-4xl tracking-tight mb-10">
          Kampagnen-Log
        </h2>
        <dl className="divide-y divide-[#1A1A18]/10 border-y border-[#1A1A18]/10">
          {[
            {
              label: "Öffnungsrate",
              note: "Geschäftsführer-Direktadressen, kein info@-Postfach. Wer die Mail bekommt, entscheidet auch.",
              value: (
                <>
                  Ø <Count to={76} suffix=" %" />
                </>
              ),
            },
            {
              label: "Antwortrate",
              note: "Antworten von Entscheidern, nicht von Assistenzen. Jede Antwort ist eine echte Gesprächschance.",
              value: (
                <>
                  Ø <Count to={4.2} decimals={1} suffix=" %" />
                </>
              ),
            },
            {
              label: "Referenzkampagne",
              note: "Peak-Phasen: mehrere Interessenten pro Tag. Abschlüsse beim Kunden, nicht nur Termine.",
              value: (
                <>
                  <Count to={25000} /> Mails → 3–4 Abschlüsse
                </>
              ),
            },
            {
              label: "Terminvorschlag",
              note: "Wer antwortet, bestätigt einen Termin — kein Hin und Her, kein Pingpong über fünf Mails.",
              value: <>in jeder Mail</>,
            },
          ].map(({ label, note, value }) => (
            <div
              key={label}
              className="grid sm:grid-cols-[1fr_auto] gap-x-8 gap-y-1 py-5 items-baseline"
            >
              <div>
                <dt className="font-semibold">{label}</dt>
                <dd className="text-sm text-[#6B6B64] max-w-lg">{note}</dd>
              </div>
              <dd className="[font-family:var(--v1-display)] font-black text-2xl sm:text-3xl sm:whitespace-nowrap">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 4 — The comparison */}
      <section className="border-t border-[#1A1A18]/10 px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto">
        <h2 className="[font-family:var(--v1-display)] font-black text-3xl sm:text-4xl tracking-tight mb-12">
          Der Vergleich
        </h2>
        {/* intentional: symmetric two-column grid — the comparison lives on
            the side-by-side equality, unlike the asymmetric grids elsewhere */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-0">
          <div className="md:pr-12 md:border-r border-[#1A1A18]/15">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6B64] mb-4">
              Eigener Vertriebler
            </p>
            <p className="[font-family:var(--v1-display)] font-black text-2xl sm:text-3xl mb-6">
              3.500 € im Monat, fix.
            </p>
            <ul className="space-y-3 text-[#3A3A36] leading-relaxed">
              <li>Plus Provision, plus Einarbeitung, plus Ausfallrisiko.</li>
              <li>Ruft kalt an — die meisten Gespräche beginnen mit einem Nein.</li>
              <li>Braucht Monate, bis eine eigene Pipeline steht.</li>
            </ul>
          </div>
          <div className="md:pl-12">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6B64] mb-4">
              Termine aus dem Postfach
            </p>
            <p className="[font-family:var(--v1-display)] font-black text-2xl sm:text-3xl mb-6">
              <span className="bg-[#F7E948] box-decoration-clone px-1">
                Warme Termine.
              </span>
            </p>
            <ul className="space-y-3 text-[#3A3A36] leading-relaxed">
              <li>Der Geschäftsführer hat geantwortet, bevor Sie sprechen.</li>
              <li>Terminvorschlag steckt in jeder Mail — bestätigen genügt.</li>
              <li>Sie führen nur noch das Gespräch. Den Rest machen wir.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5 — The 3 questions everyone asks */}
      <section className="border-t border-[#1A1A18]/10 px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto">
        <h2 className="[font-family:var(--v1-display)] font-black text-3xl sm:text-4xl tracking-tight mb-12">
          Die 3 Fragen, die uns jeder stellt
        </h2>
        <div className="divide-y divide-[#1A1A18]/10 border-y border-[#1A1A18]/10">
          {[
            {
              q: "Warum nicht einfach einen Vertriebler einstellen?",
              a: "Können Sie machen: 3.500 € fix im Monat, plus Provision, plus Einarbeitung — und er beginnt jeden Tag mit kalten Anrufen. Unsere Kampagnen kosten einen Bruchteil davon und liefern Antworten von Geschäftsführern, die von sich aus reden wollen.",
            },
            {
              q: "Wie viele Termine kommen wirklich?",
              a: "Unser Ziel in der Leistungsphase: mindestens 30 Termine pro Monat. Eine Garantie auf eine exakte Zahl geben wir nicht — wer Ihnen die verspricht, lügt. Was wir belegen können: Ø 76 % Öffnungsrate, Ø 4,2 % Antwortrate, und eine Referenzkampagne mit 25.000 Mails, aus der 3–4 Abschlüsse entstanden sind.",
            },
            {
              q: "Sind das kaufkräftige Termine?",
              a: "Wir schreiben ausschließlich Geschäftsführer an — die Listen sind vorab nach Branche und Unternehmensgröße gefiltert. Auf eine Mail mit konkretem Terminvorschlag antwortet nur, wer echtes Interesse hat. Sie sprechen mit Entscheidern, nicht mit Info-Postfächern.",
            },
          ].map(({ q, a }, i) => (
            <div key={q} className="grid sm:grid-cols-[auto_1fr] gap-x-10 gap-y-3 py-8">
              <span className="[font-family:var(--v1-display)] font-black text-2xl text-[#6B6B64] w-10">
                {i + 1}
              </span>
              <div>
                <h3 className="[font-family:var(--v1-display)] font-bold text-xl sm:text-2xl mb-3">
                  {q}
                </h3>
                <p className="text-[#3A3A36] leading-relaxed max-w-2xl">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 — Closing CTA */}
      <section className="border-t border-[#1A1A18]/10 px-6 sm:px-12 py-20 sm:py-28 max-w-7xl mx-auto text-center">
        <p className="[font-family:var(--v1-display)] font-black text-[clamp(1.8rem,4vw,3rem)] tracking-tight leading-tight max-w-3xl mx-auto mb-10">
          15 Minuten genügen, um zu sehen, ob das für Ihre Agentur funktioniert.
        </p>
        <a
          href="#"
          className="inline-block bg-[#1A1A18] text-[#FBFBF9] font-semibold px-10 py-5 transition-colors duration-300 ease-out hover:bg-[#3A3A36]"
        >
          Erstgespräch vereinbaren
        </a>
      </section>

      <footer className="border-t border-[#1A1A18]/10 px-6 sm:px-12 py-6 text-sm text-[#6B6B64] flex flex-wrap gap-x-8 gap-y-2 justify-between max-w-7xl mx-auto w-full">
        <span>{BRAND}</span>
        <span>Cold-E-Mail-Terminierung für Recruiting-Agenturen</span>
      </footer>
    </div>
  );
}
