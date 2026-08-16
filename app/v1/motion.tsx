"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// House motion tokens: one ease for reveals, one for pops.
const EASE_OUT = "power3.out";
const EASE_POP = "back.out(1.7)";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* Lenis smooth scroll wired into GSAP's ticker. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

/* Cinematic hero: "Die Lichter gehen an" — office tower at dusk.
   Image starts at ~78% width in a rounded mask and expands to full
   bleed on the first scroll stretch (Krew pattern), then subtle
   parallax + scroll-darken (sstr initHeroScrollDarken). Element is a
   <video> with poster so the premium video drops in later untouched.
   Static full-bleed layout is the CSS default (no-JS / reduced motion). */
export function HeroTower() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
      tl.fromTo(
        ".ht-frame",
        { width: "78%", height: "84%", borderRadius: 28 },
        { width: "100%", height: "100%", borderRadius: 0, ease: "none", duration: 0.45 }
      )
        .fromTo(
          ".ht-media",
          { yPercent: -6, scale: 1.08 },
          { yPercent: 0, scale: 1, ease: "none", duration: 1 },
          0
        )
        .fromTo(
          ".ht-darken",
          { opacity: 0 },
          { opacity: 0.45, ease: "none", duration: 0.55 },
          0.45
        );
    },
    { scope }
  );

  return (
    <section ref={scope} className="relative h-[220vh] bg-[#0D1522]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="ht-frame relative w-full h-full overflow-hidden">
          <video
            className="ht-media absolute inset-0 w-full h-full object-cover object-[42%_center] sm:object-[72%_center]"
            poster="/assets/hero-tower-dusk.webp"
            muted
            loop
            playsInline
            preload="none"
            aria-label="Glas-Büroturm bei Abenddämmerung, einzelne Fenster warm erleuchtet"
          />
          <div className="ht-darken absolute inset-0 bg-[#060A12] opacity-40 pointer-events-none" />
          {/* static readability gradient behind the copy, independent of the scrub darken */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-3/5 bg-gradient-to-r from-[#060A12]/55 to-transparent pointer-events-none" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-7 sm:px-14 max-w-xl">
              <p className="text-sm font-medium text-white/70 mb-6 leading-relaxed max-w-md">
                Sie lesen das hier, weil eine E-Mail von uns Sie neugierig
                gemacht hat. Genau so gewinnen Sie Ihre nächsten Kunden.
              </p>
              <h1 className="[font-family:var(--v1-display)] font-black text-white text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02] tracking-tight mb-8">
                Ihr Kalender füllt sich{" "}
                <span className="relative inline-block">
                  <span className="absolute inset-x-[-0.12em] bottom-[0.05em] top-[0.28em] bg-[#F7E948]" />
                  <span className="relative text-[#1A1A18]">von selbst.</span>
                </span>
              </h1>
              <p className="text-lg text-white/85 max-w-md leading-relaxed mb-10">
                Cold-E-Mail-Terminierung für Recruiting-Agenturen: Wir
                schreiben Geschäftsführer direkt an, mit Terminvorschlag in
                jeder Mail. Wer antwortet, will reden.
              </p>
              <a
                href="#"
                className="inline-block bg-[#F7E948] text-[#1A1A18] font-semibold px-8 py-4 transition-colors duration-300 ease-out hover:bg-[#FFF06E]"
              >
                Erstgespräch vereinbaren
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Word-by-word text fill on scroll (sstr initScrollTextFill).
   Full opacity is the default; the dimmed start state only exists
   while the scrub animation owns the element. */
export function TextFill({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const scope = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".tf-word",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 78%",
            end: "top 32%",
            scrub: true,
          },
        }
      );
    },
    { scope }
  );

  return (
    <p ref={scope} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="tf-word">
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

/* Real HTML week calendar. Appointment blocks drop in one after
   another, scroll-driven (pinned scrub); the Thursday 10:30 slot from
   the hero email lands first, in marker yellow. Blocks are visible by
   default (no-JS / reduced motion). */
const CAL_DAYS = ["Mo", "Di", "Mi", "Do", "Fr"];
const CAL_HOURS = [9, 10, 11, 12, 13, 14, 15, 16];
// day: 0-4, start: hour decimal, len: hours. Order = drop-in order.
const CAL_BLOCKS: {
  day: number;
  start: number;
  len: number;
  label: string;
  time: string;
  yellow?: boolean;
}[] = [
  { day: 3, start: 10.5, len: 1, label: "Erstgespräch", time: "10:30", yellow: true },
  { day: 0, start: 9, len: 1, label: "Erstgespräch", time: "09:00" },
  { day: 1, start: 14, len: 1, label: "Erstgespräch", time: "14:00" },
  { day: 2, start: 11.5, len: 1, label: "Erstgespräch", time: "11:30" },
  { day: 3, start: 15, len: 1, label: "Erstgespräch", time: "15:00" },
  { day: 4, start: 9.5, len: 1, label: "Erstgespräch", time: "09:30" },
  { day: 4, start: 13, len: 1, label: "Erstgespräch", time: "13:00" },
];

export function CalendarWeek() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.5,
        },
      });
      tl.fromTo(
        ".cal-block",
        { y: -44, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.28, duration: 0.5, ease: "power2.out" }
      );
    },
    { scope }
  );

  const top = (h: number) => ((h - 9) / CAL_HOURS.length) * 100;
  const height = (len: number) => (len / CAL_HOURS.length) * 100;

  return (
    <div ref={scope} className="min-h-screen flex flex-col justify-center px-6 sm:px-12 py-16 max-w-7xl mx-auto w-full">
      <h2 className="[font-family:var(--v1-display)] font-black text-3xl sm:text-4xl tracking-tight mb-3">
        So sieht Ihre Woche danach aus
      </h2>
      <p className="text-[#3A3A36] mb-10 max-w-xl leading-relaxed">
        Jeder Block ist ein bestätigter Terminvorschlag aus einer E-Mail —
        beginnend mit dem aus der Mail oben.
      </p>
      <div className="border border-[#1A1A18]/15 bg-white">
        <div className="grid grid-cols-[3rem_repeat(5,1fr)] border-b border-[#1A1A18]/10 text-xs font-semibold uppercase tracking-wide">
          <div className="py-2" />
          {CAL_DAYS.map((d) => (
            <div key={d} className="py-2 px-2 border-l border-[#1A1A18]/10">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[3rem_repeat(5,1fr)]">
          <div className="relative">
            {CAL_HOURS.map((h) => (
              <div
                key={h}
                className="h-12 sm:h-14 text-[10px] sm:text-xs text-[#6B6B64] pr-1.5 text-right pt-0.5"
              >
                {h}:00
              </div>
            ))}
          </div>
          {CAL_DAYS.map((d, di) => (
            <div key={d} className="relative border-l border-[#1A1A18]/10">
              {CAL_HOURS.map((h) => (
                <div key={h} className="h-12 sm:h-14 border-b border-[#1A1A18]/5" />
              ))}
              {CAL_BLOCKS.filter((b) => b.day === di).map((b) => (
                <div
                  key={b.time}
                  className={`cal-block absolute left-1 right-1 px-1.5 py-1 overflow-hidden text-[8px] sm:text-[11px] leading-tight font-semibold border ${
                    b.yellow
                      ? "bg-[#F7E948] border-[#1A1A18] text-[#1A1A18]"
                      : "bg-white border-[#1A1A18]/25 text-[#1A1A18] shadow-[2px_2px_0_rgba(26,26,24,0.15)]"
                  }`}
                  style={{ top: `${top(b.start)}%`, height: `${height(b.len)}%` }}
                >
                  <span className="block text-[#6B6B64] font-medium">{b.time}</span>
                  <span className="hidden sm:block">{b.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-[#6B6B64]">
        Basis: Ø 76 % Öffnungsrate · Ø 4,2 % Antwortrate — Geschäftsführer-Direktadressen.
      </p>
    </div>
  );
}

/* Email artifact: the cold email assembles itself — lines step in,
   the appointment proposal gets marker-highlighted, reply buttons pop.
   Now scroll-triggered (own section below the hero). */
export function HeroEmailCard() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: "top 70%", once: true },
      });
      tl.from(".em-line", {
        autoAlpha: 0,
        y: 10,
        duration: 0.45,
        ease: EASE_OUT,
        stagger: 0.22,
      })
        .fromTo(
          ".em-marker",
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left center", duration: 0.55, ease: "power2.inOut" },
          "-=0.1"
        )
        .from(
          ".em-btn",
          {
            autoAlpha: 0,
            scale: 0.85,
            duration: 0.4,
            ease: EASE_POP,
            stagger: 0.12,
          },
          "+=0.15"
        );
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="border border-[#1A1A18]/15 bg-white shadow-[8px_8px_0_#1A1A18]"
    >
      <div className="flex items-center gap-2 px-5 py-3 border-b border-[#1A1A18]/10 text-xs text-[#6B6B64]">
        <span className="font-semibold text-[#1A1A18]">Posteingang</span>
        <span>· heute, 09:14</span>
      </div>
      <div className="px-5 py-5 text-sm leading-relaxed">
        <p className="em-line mb-1">
          <span className="text-[#6B6B64]">Von:</span>{" "}
          <span className="font-semibold">{BRAND}</span>
        </p>
        <p className="em-line mb-4">
          <span className="text-[#6B6B64]">An:</span> Geschäftsführung
        </p>
        <p className="em-line mb-3">Guten Tag,</p>
        <p className="em-line mb-3 text-[#3A3A36]">
          zwei Sätze zu Ihrer Agentur, ein konkreter Nutzen, kein Blabla.
        </p>
        <p className="em-line mb-4 relative">
          <span className="relative inline-block">
            <span className="em-marker absolute inset-0 bg-[#F7E948] -z-10" />
            <span className="px-0.5">
              Passt Ihnen Donnerstag, 10:30 Uhr für 15 Minuten?
            </span>
          </span>
        </p>
        <p className="em-line text-[#6B6B64]">Mit freundlichen Grüßen</p>
      </div>
      <div className="flex gap-2 px-5 pb-5">
        <span className="em-btn border border-[#1A1A18]/20 text-xs px-3 py-1.5 text-[#3A3A36]">
          Antworten
        </span>
        <span className="em-btn border border-[#1A1A18]/20 text-xs px-3 py-1.5 text-[#3A3A36]">
          Termin bestätigen
        </span>
      </div>
    </div>
  );
}

/* Count-up on scroll-enter, runs once. Renders final value without JS. */
export function Count({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) =>
    prefix +
    n.toLocaleString("de-DE", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix;

  useGSAP(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const el = ref.current;
    const counter = { value: 0 };
    gsap.to(counter, {
      value: to,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = fmt(counter.value);
      },
    });
  });

  return <span ref={ref}>{fmt(to)}</span>;
}

/* Scroll-driven progress line for the 4-month process. Items reveal once. */
export function ProcessTimeline({
  items,
}: {
  items: { month: string; title: string; text: string }[];
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".pt-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }
      );
      gsap.utils.toArray<HTMLElement>(".pt-item").forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          x: -18,
          duration: 0.6,
          ease: EASE_OUT,
          scrollTrigger: { trigger: item, start: "top 80%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="relative pl-8 sm:pl-12">
      {/* rail + progress */}
      <div className="absolute left-[5px] sm:left-[9px] top-2 bottom-2 w-px bg-[#1A1A18]/15" />
      <div className="pt-progress absolute left-1 sm:left-2 top-2 bottom-2 w-[3px] bg-[#F7E948]" />
      <ol className="space-y-14">
        {items.map((it) => (
          <li key={it.month} className="pt-item relative">
            <span className="absolute -left-8 sm:-left-12 top-1.5 block w-[11px] h-[11px] sm:w-[19px] sm:h-[19px] bg-[#1A1A18]" />
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6B64] mb-2">
              {it.month}
            </p>
            <h3 className="[font-family:var(--v1-display)] font-bold text-xl sm:text-2xl mb-3">
              {it.title}
            </h3>
            <p className="text-[#3A3A36] leading-relaxed max-w-xl">{it.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
