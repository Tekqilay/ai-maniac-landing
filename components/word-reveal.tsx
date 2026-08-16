"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function W({ children, gradient }: { children: React.ReactNode; gradient?: boolean }) {
  return (
    <span
      data-w=""
      className={
        gradient
          ? "inline-block will-change-transform bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          : "inline-block will-change-transform"
      }
    >
      {children}
    </span>
  );
}

export function HeroHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll("[data-w]");
      if (!words?.length) return;
      gsap.fromTo(
        words,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.055,
          delay: 0.25,
          ease: "power3.out",
          clearProps: "will-change",
        }
      );
    },
    { scope: ref }
  );

  return (
    <h1
      ref={ref}
      className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-white mb-6"
    >
      <W>Jeder</W>{" "}
      <W>Anruf</W>{" "}
      <W>wird</W>{" "}
      <W>zur</W>{" "}
      <W gradient>Auftrags-</W>{" "}
      <W gradient>Notiz</W>{" "}
      <W gradient>—</W>{" "}
      <W gradient>automatisch.</W>
    </h1>
  );
}
