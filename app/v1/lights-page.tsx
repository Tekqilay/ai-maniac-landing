import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { BRAND } from "@/lib/brand";
import {
  SmoothScroll,
  HeroTower,
  HeroEmailCard,
  TextFill,
  CalendarWeek,
  Count,
  ProcessTimeline,
} from "./motion";

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
// Shared by /v1 and /v1b; the routes differ only in where the hero
// video scrub starts (and the matching poster frame).
export function LightsPage({
  scrubStart,
  poster,
}: {
  scrubStart: number;
  poster: string;
}) {
  return (
    <div
      className={`${display.variable} ${body.variable} relative min-h-screen overflow-x-clip bg-[#FBFBF9] text-[#1A1A18] [font-family:var(--v1-body)] selection:bg-[#F7E948]`}
    >
      <SmoothScroll />

      {/* Nav — overlays the cinematic hero */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-12 py-5">
        <span className="[font-family:var(--v1-display)] font-black tracking-tight text-lg text-white">
          {BRAND}
        </span>
        <a
          href="#"
          className="border border-white/60 text-white text-sm font-semibold px-5 py-2.5 transition-colors duration-300 ease-out hover:bg-white hover:text-[#1A1A18]"
        >
          Erstgespräch vereinbaren
        </a>
      </header>

      {/* 1 — Hero: "Die Lichter gehen an" */}
      <HeroTower scrubStart={scrubStart} poster={poster} />

      {/* 2 — The email that made that appointment */}
      <section className="px-6 sm:px-12 pt-20 pb-16 sm:pt-28 sm:pb-20 max-w-7xl mx-auto grid gap-12 lg:grid-cols-[2fr_3fr] items-center">
        <div>
          <h2 className="[font-family:var(--v1-display)] font-black text-3xl sm:text-4xl tracking-tight mb-5">
            Die Mail, die das Licht anmacht
          </h2>
          <p className="text-[#3A3A36] leading-relaxed max-w-md">
            Keine Massenware, kein Newsletter-Ton: zwei Sätze zur Agentur, ein
            konkreter Nutzen und ein Terminvorschlag, der nur bestätigt werden
            muss.
          </p>
        </div>
        <div className="max-w-xl w-full justify-self-end">
          <HeroEmailCard />
        </div>
      </section>

      {/* 3 — Core statement, word-by-word fill */}
      <section className="px-6 sm:px-12 py-20 sm:py-28 max-w-5xl mx-auto">
        <TextFill
          className="[font-family:var(--v1-display)] font-bold text-[clamp(1.6rem,3.6vw,2.6rem)] leading-snug tracking-tight"
          text="Jedes erleuchtete Fenster ist ein Geschäftsführer, der gerade einem Termin zugestimmt hat. Wir schreiben ihn an, schlagen die Uhrzeit vor und legen den Termin in Ihren Kalender. Sie machen das Licht an."
        />
      </section>

      {/* 4 — The week after: real HTML calendar, blocks drop in on scroll */}
      <section className="border-t border-[#1A1A18]/10">
        <CalendarWeek />
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
            <p className="[font-family:var(--v1-display)] font-black text-2xl sm:text-3xl mb-3">
              ~5.200 € im Monat.
            </p>
            <p className="text-sm text-[#6B6B64] leading-relaxed mb-6">
              Ø 4.176 € Bruttogehalt im B2B-Vertrieb, plus Lohnnebenkosten und
              Arbeitsplatz — Provision kommt noch obendrauf.
            </p>
            <ul className="space-y-3 text-[#3A3A36] leading-relaxed">
              <li>Läuft ab Tag 1 — auch in Monaten, in denen kein einziger Termin steht.</li>
              <li>Recruiting, Einarbeitung, Führung: Ihre Zeit, bevor die erste Pipeline steht.</li>
              <li>Fehlbesetzung nach sechs Monaten? Alles von vorn.</li>
            </ul>
          </div>
          <div className="md:pl-12">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6B64] mb-4">
              Termine aus dem Postfach
            </p>
            <p className="[font-family:var(--v1-display)] font-black text-2xl sm:text-3xl mb-3">
              <span className="bg-[#F7E948] box-decoration-clone px-1">
                Ihr Aufwand: zwei Termine.
              </span>
            </p>
            <p className="text-sm text-[#6B6B64] leading-relaxed mb-6">
              Onboarding und Erstgespräch. Danach läuft es.
            </p>
            <ul className="space-y-3 text-[#3A3A36] leading-relaxed">
              <li>Mails gehen raus, jede Antwort wird sofort beantwortet — rund um die Uhr.</li>
              <li>Bestätigte Termine landen direkt in Ihrem Kalender.</li>
              <li>Ihr Team führt nur noch die Gespräche.</li>
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
              a: "Können Sie — rechnen Sie nur ehrlich: Ein eigener B2B-Vertriebler kostet real über 5.000 € im Monat, bevor Provision und Ihre Einarbeitungszeit dazukommen. Die Fixkosten laufen auch in Monaten ohne einen einzigen Termin. Bei uns haben Sie nach dem Onboarding keinen Aufwand mehr — und die Termine stehen im Kalender.",
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
