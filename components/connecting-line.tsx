"use client";

import { motion } from "framer-motion";

const DOTS = [
  { left: "0%",   delay: 0.25 },
  { left: "50%",  delay: 0.95 },
  { left: "100%", delay: 1.65 },
];

export function ConnectingLine() {
  return (
    <div
      className="hidden sm:block absolute pointer-events-none z-0"
      style={{ top: "52px", left: "16.5%", right: "16.5%" }}
    >
      {/* The line */}
      <motion.div
        className="h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(59,130,246,0.45), rgba(99,102,241,0.45), transparent)",
          originX: 0,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
      />

      {/* Dots at card icon centers */}
      {DOTS.map(({ left, delay }) => (
        <motion.div
          key={left}
          className="absolute w-2 h-2 rounded-full bg-blue-500/70"
          style={{ left, top: 0, transform: "translate(-50%, -50%)" }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "backOut", delay }}
        />
      ))}
    </div>
  );
}
