import Link from "next/link";
import Image from "next/image";
import {
  Mic,
  FileText,
  Inbox,
  Check,
  ArrowRight,
  Zap,
  Clock,
  TrendingDown,
  Users,
} from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/fade-in";
import { StepCard } from "@/components/step-card";
import { HeroAnimation } from "@/components/hero-animation";
import { DemoSection } from "@/components/demo-section";
import { AnimatedCounter } from "@/components/counter";
import { HeroHeadline } from "@/components/word-reveal";
import { TiltCard } from "@/components/tilt-card";
import { ConnectingLine } from "@/components/connecting-line";
import { GlowCard } from "@/components/glow-card";
import { ShimmerLink } from "@/components/shimmer-link";

const CALENDLY_URL = "https://calendly.com/tekinay1807/discovery-call-15-min";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
        <span className="text-lg font-bold tracking-tight">
          The <span className="text-blue-500">AI</span> Maniac
        </span>
        <Link
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Kostenloses Gespräch buchen <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        <HeroAnimation />
        <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/50 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wide uppercase">
            <Zap className="w-3.5 h-3.5" />
            Firmengedächtnis für den Elektro-Großhandel
          </div>
        </FadeIn>

        <HeroHeadline />

        <FadeIn delay={0.35}>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Jeder eingehende Call in Ihrem Innendienst wird automatisch
            dokumentiert. Bestellnotiz, Angebots-Draft, Reklamations-Protokoll,
            Beratungs-Memo. Ohne Tippen, ohne Vergessen, ohne Nachhaken.
          </p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ShimmerLink
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-base font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-900/40 cursor-pointer"
            >
              Kostenloses 15-Min Gespräch buchen <ArrowRight className="w-5 h-5" />
            </ShimmerLink>
            <span className="text-slate-500 text-sm">Keine Verpflichtung. Kein Pitch.</span>
          </div>
        </FadeIn>
        </div>
      </section>

      {/* ── Demo ── */}
      <DemoSection />

      {/* ── About ── */}
      <section className="py-20 px-6 border-t border-slate-800/60">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-8">
              Wer dahinter steht
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <div className="flex-shrink-0">
                <Image
                  src="/tekin.jpg"
                  alt="Tekinay — The AI Maniac"
                  width={180}
                  height={180}
                  className="rounded-2xl object-cover w-40 h-40 sm:w-44 sm:h-44"
                />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-3">
                  Gebaut von jemandem, der es selbst täglich nutzt.
                </h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Ich bin Tekinay — ich baue KI-Systeme für Firmen, deren
                  Tagesgeschäft am Telefon passiert. Elektro-Großhandel,
                  Sanitär-Großhandel, technischer B2B-Vertrieb. Überall das
                  gleiche Bild: Innendienst-Mitarbeiter führen 20+ Calls am
                  Tag, und nach jedem Call sollen sie sich hinsetzen und alles
                  nochmal von Hand tippen. Das ist verschwendete Zeit, und es
                  geht viel dabei verloren.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Jedes System das ich baue, ist individuell. Keine generischen
                  Vorlagen zum selbst Ausfüllen, kein Tool das Sie erst
                  verstehen müssen. Ich baue es für Sie, passe es an Ihre
                  Artikelstruktur und Ihre Doc-Formate an, teste es mit Ihren
                  echten Calls und übergebe es Ihrem Team betriebsbereit.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-24 px-6 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Das Problem
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-6 max-w-2xl mx-auto leading-tight">
              Ihr Innendienst verbrennt jeden Tag{" "}
              <span className="text-blue-400">
                <AnimatedCounter target={10} suffix=" Stunden" />
              </span>{" "}
              in manueller Call-Doku.
            </h2>
            <p className="text-center text-slate-400 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
              10 Innendienst-Mitarbeiter, jeder 20 Calls am Tag, jeder Call
              kostet 3 Minuten Notiz-Tipperei. Das sind 10 Stunden
              Personalkosten pro Tag — jeden Tag, jede Woche — nur um
              Bestellungen, Reklamationen und Rückfragen zu dokumentieren,
              die das Telefon bereits gesagt hat.
            </p>
          </FadeIn>

          <StaggerChildren className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Clock className="w-5 h-5 text-red-400" />,
                title: "3 Minuten verloren pro Call",
                desc: "Nach jedem Call sitzt der Mitarbeiter und tippt: Artikel, Menge, Preis, Liefertermin, Kontaktperson. Bei 20 Calls sind das 60 Minuten reine Doku-Zeit pro Kopf — jeden Tag.",
              },
              {
                icon: <TrendingDown className="w-5 h-5 text-orange-400" />,
                title: "Bestell-Chaos und vergessene Details",
                desc: "Artikelnummer halb notiert, Liefertermin im Kopf, Sonderwunsch im Zettel auf dem Schreibtisch. Fehler beim Auftrag, Nachfragen beim Kunden, verärgerte Lieferanten — jede Woche.",
              },
              {
                icon: <Users className="w-5 h-5 text-yellow-400" />,
                title: "Kundenwissen klebt an einem Kopf",
                desc: "Wenn Ihr erfahrener Innendienstler krank wird oder kündigt — was bleibt? Welche Sonderkonditionen welcher Kunde hat, welche Projekte laufen, welche Lieferanten-Deals. Alles weg. Einarbeitung dauert Monate.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <TiltCard className="h-full">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors duration-200 cursor-default h-full">
                    <div className="bg-slate-800 rounded-xl p-2.5 w-fit mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeIn>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 max-w-3xl mx-auto">
              <p className="text-slate-300 text-lg leading-relaxed text-center">
                Der echte Schaden ist nicht nur die Zeit. Es ist die{" "}
                <span className="text-white font-semibold">Abhängigkeit</span> —
                jeder Kunde hat „seinen“ Ansprechpartner, jeder Prozess lebt
                im Kopf eines einzelnen Mitarbeiters. Jede Einarbeitung dauert
                6 Monate, jede Kündigung kostet Umsatz.{" "}
                <span className="text-white font-semibold">
                  Und nichts davon müsste so sein.
                </span>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="py-24 px-6 border-t border-slate-800/60">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">
              So läuft es ab
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
              Drei Schritte. Null manueller Aufwand.
            </h2>
            <p className="text-center text-slate-400 mb-16 max-w-xl mx-auto">
              Wir installieren die Recorder-App auf jedem Innendienst-PC und
              bauen die Doc-Vorlagen auf Ihre Artikelstruktur zu. Danach läuft
              alles im Hintergrund, während Ihr Team telefoniert.
            </p>
          </FadeIn>

          <div className="relative">
            <ConnectingLine />
            <StaggerChildren className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Mic className="w-6 h-6 text-blue-400" />,
                step: "01",
                title: "Call am PC mitschneiden",
                desc: "Die Desktop-App läuft auf dem Innendienst-PC und nimmt bei jedem Call Mikrofon und System-Audio auf — egal ob Zoom, Teams, Softphone oder Browser-Telefonie. Ein Klick Start, ein Klick Stop. Die Datei landet automatisch im Google Drive.",
              },
              {
                icon: <FileText className="w-6 h-6 text-blue-400" />,
                step: "02",
                title: "Transkription & KI-Verarbeitung",
                desc: "Die Aufnahme wird mit hoher Genauigkeit transkribiert und durch Ihre individuellen KI-Workflows geschickt. Jede Vorlage kennt Ihre Artikel, Ihre Kunden, Ihre Lieferanten. Kein Upload, kein Copy-Paste.",
              },
              {
                icon: <Inbox className="w-6 h-6 text-blue-400" />,
                step: "03",
                title: "Dokumente erscheinen",
                desc: "Bestellnotiz, Reklamations-Protokoll, Angebots-Draft — landen in Ihrem Postfach oder Drive, sortiert pro Call und pro Mitarbeiter. Innerhalb von Minuten, im exakten Format das Ihr ERP-Prozess braucht.",
              },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <StepCard
                  step={item.step}
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                />
              </StaggerItem>
            ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24 px-6 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Was drin ist
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
              Komplett eingerichtet. Nichts zum selbst herausfinden.
            </h2>
            <p className="text-center text-slate-400 mb-16 max-w-xl mx-auto">
              Wir geben Ihnen kein Tool in die Hand und wünschen Ihnen Glück.
              Wir installieren die Recorder-App auf jedem Innendienst-PC,
              bauen die Doc-Vorlagen auf Ihr Sortiment zu und testen mit
              echten Calls — bevor Ihr Team das System das erste Mal nutzt.
            </p>
          </FadeIn>

          <StaggerChildren className="grid sm:grid-cols-2 gap-8">
            <StaggerItem>
              <TiltCard className="h-full">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 h-full">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                  Einmaliges Setup
                </p>
                <h3 className="text-white text-xl font-bold mb-6">
                  Wir bauen es. Ihr Team nutzt es.
                </h3>
                <ul className="space-y-4">
                  {[
                    "Prozess-Audit Call — wir kartieren Ihre Call-Typen, Ihre Artikelstruktur und welche Doc-Formate Ihr ERP-Prozess braucht",
                    "12 individuelle Doc-Vorlagen für den Elektro-Großhandel (Bestellnotiz, Angebots-Draft, Reklamation, Beratungs-Protokoll, Lieferanten-Abstimmung uvm.)",
                    "Installation der Recorder-App auf jedem Innendienst-PC",
                    "Komplettes Workflow-Setup — Google Drive, Transkription, KI-Verarbeitung, Verteilung in Ihre Postfächer",
                    "Live-Test mit echten Calls vor dem Roll-out",
                    "Team-Schulung — Ihre Innendienst-Mitarbeiter sind ab Tag eins sicher im Umgang",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </TiltCard>
            </StaggerItem>

            <StaggerItem>
              <TiltCard className="h-full">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 h-full">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                  Laufende Betreuung
                </p>
                <h3 className="text-white text-xl font-bold mb-6">
                  Läuft. Jeden Monat. Ohne dass Sie etwas tun müssen.
                </h3>
                <ul className="space-y-4">
                  {[
                    "System-Monitoring — wir sehen Probleme bevor Ihr Innendienst sie bemerkt",
                    "Vorlagen-Anpassungen wenn neue Lieferanten, neue Artikel oder neue Prozesse dazukommen",
                    "Direkter Support-Kanal für Ihre Niederlassung — keine Ticket-Warteschlangen",
                    "Regelmäßige Check-ins, damit das System mit Ihrer Firma mitwächst",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </TiltCard>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="py-24 px-6 border-t border-slate-800/60">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-12">
              Echte Ergebnisse
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src="/paul-arens.jpg"
                    alt="Paul Arens, SA Marketing GmbH"
                    width={80}
                    height={80}
                    className="rounded-full object-cover w-20 h-20"
                  />
                </div>
                <div>
                  <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed mb-6">
                    „Ich nehme einfach das Gespräch auf und die Dokumente sind
                    da. Ich denke nicht mehr darüber nach.“
                  </p>
                  <div className="mb-6">
                    <p className="text-white font-semibold">Paul Arens</p>
                    <p className="text-slate-500 text-sm">SA Marketing GmbH</p>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Paul führt eine Recruiting- und Vertriebsberatung. Vorher
                    hat sein Team nach jedem Sales-Call und jeder Onboarding-Session
                    manuell Zusammenfassungen geschrieben. Jetzt erstellt das
                    System automatisch 3 verschiedene Dokumenttypen pro Call.
                    Setup-Zeit: eine Woche. Läuft seit Monaten ohne einen
                    einzigen manuellen Eingriff.
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed mt-4 italic">
                    Das Grundsystem läuft branchenübergreifend — die
                    Version für den Elektro-Großhandel ist individuell auf
                    Bestell-Calls, Reklamationen, Angebote und
                    Lieferanten-Abstimmung im Innendienst angepasst.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <StaggerChildren className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { value: "3", label: "Dokumenttypen automatisiert" },
              { value: "1 Woche", label: "Setup-Zeit" },
              { value: "0", label: "Manuelle Arbeit pro Gespräch" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 cursor-default">
                  <p className="text-blue-400 text-2xl font-bold">{stat.value}</p>
                  <p className="text-slate-500 text-xs mt-1 leading-tight">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 px-6 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-center text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Preise
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
              Einmaliges Setup. Niedrige Monatspauschale.
            </h2>
            <p className="text-center text-slate-400 mb-4 max-w-xl mx-auto">
              Wir bauen Ihr System einmal auf Ihren Innendienst zu. Sie nutzen
              es jahrelang. Keine Nutzer-Gebühren, keine Call-Limits.
            </p>
            <p className="text-center text-slate-500 mb-8 max-w-2xl mx-auto text-sm">
              Rechenbeispiel: 10 Innendienst-MA × 20 Calls/Tag × 3 Min Notiz
              = 10 Stunden/Tag manuelle Doku. Das sind rund{" "}
              <span className="text-blue-400 font-semibold">7.000€/Monat Personalkosten</span>,
              die Sie aktuell ins Tippen stecken — gegen 497€/Monat für das
              Firmengedächtnis.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {[
                "Individuell für Elektro-Großhandel gebaut",
                "Keine generischen Vorlagen",
                "Einsatzbereit in 2 Wochen",
              ].map((badge) => (
                <span
                  key={badge}
                  className="bg-blue-950/60 border border-blue-800/50 text-blue-300 text-xs font-medium px-4 py-2 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>

          <StaggerChildren className="grid sm:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                desc: "3 Doc-Types — der schmale Einstieg",
                setup: "1.497€",
                monthly: "297€",
                features: [
                  "3 Doc-Vorlagen: Bestellnotiz, Reklamation, ToDo-Liste Team",
                  "Installation auf bis zu 5 Innendienst-PCs",
                  "Grund-Setup & Testing",
                  "Onboarding-Call",
                  "Monatlicher Support",
                ],
                highlight: false,
              },
              {
                name: "Firmengedächtnis",
                desc: "Alle 12 Doc-Types — der No-Brainer",
                setup: "2.997€",
                monthly: "497€",
                features: [
                  "Alle 12 Doc-Vorlagen: Bestellnotiz, Angebots-Draft, Beratungs-Protokoll, Reklamation, Lieferanten-Abstimmung, ToDo-Liste, Kunden-Historie, Preis-Memo, Rückfrage-Ticket, Produkt-Info-Request, Termin-Protokoll, Eskalations-Memo",
                  "Installation auf bis zu 15 Innendienst-PCs",
                  "Prozess-Audit + Full-Setup auf Ihre Artikelstruktur",
                  "Wöchentliche Check-ins Monat 1+2",
                  "Laufende Vorlagen-Anpassungen",
                  "Priority Support",
                  "Nur 500€ mehr Setup als Starter — für 4× so viele Doc-Types",
                ],
                highlight: true,
              },
              {
                name: "Komplett",
                desc: "Unbegrenzte MA + Meister-Wiki",
                setup: "4.997€",
                monthly: "797€",
                features: [
                  "Alle 12 Doc-Vorlagen",
                  "Installation auf unbegrenzt vielen Innendienst-PCs",
                  "Meister-Wiki: intelligente Wissensdatenbank aus allen Calls, durchsuchbar nach Kunde, Artikel, Lieferant",
                  "Multi-Workflow Setup (mehrere Niederlassungen möglich)",
                  "Priority Support mit SLA",
                  "Quartals-Reviews & Optimierungs-Workshops",
                ],
                highlight: false,
              },
            ].map((plan) => (
              <StaggerItem key={plan.name}>
                <GlowCard
                  glow={plan.highlight}
                  className={`relative rounded-2xl p-7 flex flex-col cursor-default transition-colors duration-200 h-full ${
                    plan.highlight
                      ? "bg-blue-600 border border-blue-500 shadow-xl shadow-blue-900/40"
                      : "bg-slate-900 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-400 text-blue-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Bestseller — Empfehlung
                    </div>
                  )}
                  <h3 className="font-bold text-xl mb-1 text-white">{plan.name}</h3>
                  <p className={`text-sm mb-6 ${plan.highlight ? "text-blue-200" : "text-slate-500"}`}>
                    {plan.desc}
                  </p>
                  <div className="mb-2">
                    <span className="text-3xl font-extrabold text-white">{plan.setup}</span>
                    <span className={`text-sm ml-1 ${plan.highlight ? "text-blue-200" : "text-slate-500"}`}>
                      Setup
                    </span>
                  </div>
                  <div className="mb-8">
                    <span className={`text-lg font-semibold ${plan.highlight ? "text-blue-100" : "text-slate-300"}`}>
                      {plan.monthly}
                    </span>
                    <span className={`text-sm ml-1 ${plan.highlight ? "text-blue-200" : "text-slate-500"}`}>
                      / Monat
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-blue-200" : "text-blue-500"}`} />
                        <span className={`text-sm ${plan.highlight ? "text-blue-100" : "text-slate-400"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors duration-200 cursor-pointer block ${
                      plan.highlight
                        ? "bg-white text-blue-700 hover:bg-blue-50"
                        : "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700"
                    }`}
                  >
                    Kostenloses Gespräch buchen
                  </Link>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-28 px-6 border-t border-slate-800/60 text-center">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
              Bereit, Ihren Innendienst zu entlasten?
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Buchen Sie ein kostenloses 15-Min Gespräch. Wir schauen uns
              Ihre Call-Typen und Ihren Innendienst-Alltag an und sagen
              Ihnen genau, was wir für Ihre Niederlassung bauen würden —
              ohne Verpflichtung, ohne Pitch Deck.
            </p>
            <ShimmerLink
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-base font-semibold px-10 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-900/40 cursor-pointer"
            >
              Kostenloses Gespräch buchen <ArrowRight className="w-5 h-5" />
            </ShimmerLink>
            <p className="text-slate-600 text-sm mt-4">Keine Verpflichtung. Kein Pitch.</p>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/60 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-500 text-sm font-semibold">
            The <span className="text-blue-500">AI</span> Maniac
          </span>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} The AI Maniac. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </main>
  );
}
