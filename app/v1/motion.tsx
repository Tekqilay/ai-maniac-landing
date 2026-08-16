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

/* Hero signature: the cold email assembles itself — lines step in,
   the appointment proposal gets marker-highlighted, reply buttons pop. */
export function HeroEmailCard() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ delay: 0.4 });
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
