"use client";

import { motion } from "framer-motion";

const PARTICLES = [
  { x: "7%",  y: "14%", s: 2,   d: 18, delay: 0   },
  { x: "83%", y: "9%",  s: 1.5, d: 22, delay: 3   },
  { x: "17%", y: "71%", s: 2.5, d: 16, delay: 7   },
  { x: "73%", y: "79%", s: 1,   d: 25, delay: 2   },
  { x: "47%", y: "7%",  s: 2,   d: 20, delay: 5   },
  { x: "91%", y: "41%", s: 1.5, d: 19, delay: 1   },
  { x: "3%",  y: "47%", s: 1,   d: 24, delay: 8   },
  { x: "63%", y: "87%", s: 2,   d: 17, delay: 4   },
  { x: "32%", y: "27%", s: 1.5, d: 21, delay: 6   },
  { x: "87%", y: "63%", s: 1,   d: 23, delay: 9   },
  { x: "13%", y: "87%", s: 2,   d: 15, delay: 3.5 },
  { x: "43%", y: "57%", s: 1.5, d: 20, delay: 7.5 },
  { x: "77%", y: "31%", s: 1,   d: 18, delay: 2.5 },
  { x: "27%", y: "53%", s: 2.5, d: 22, delay: 5.5 },
  { x: "57%", y: "17%", s: 1.5, d: 16, delay: 1.5 },
  { x: "38%", y: "83%", s: 1,   d: 19, delay: 8.5 },
  { x: "69%", y: "13%", s: 2,   d: 21, delay: 4.5 },
  { x: "4%",  y: "23%", s: 1.5, d: 17, delay: 6.5 },
  { x: "55%", y: "5%",  s: 1,   d: 20, delay: 0.5 },
  { x: "22%", y: "38%", s: 2,   d: 23, delay: 9.5 },
];

const ORBS = [
  {
    cx: 15, cy: 25, size: 520,
    gradient: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 45%, transparent 70%)",
    duration: 22, tx: 75, ty: 50,
  },
  {
    cx: 72, cy: 60, size: 580,
    gradient: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(99,102,241,0.04) 45%, transparent 70%)",
    duration: 28, tx: -60, ty: -40,
  },
  {
    cx: 45, cy: -5, size: 440,
    gradient: "radial-gradient(circle, rgba(14,165,233,0.13) 0%, rgba(14,165,233,0.04) 45%, transparent 70%)",
    duration: 20, tx: 40, ty: 65,
  },
];

export function HeroAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${orb.cx}%`,
            top: `${orb.cy}%`,
            width: orb.size,
            height: orb.size,
            background: orb.gradient,
            filter: "blur(70px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ x: [0, orb.tx, 0], y: [0, orb.ty, 0] }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500"
          style={{ left: p.x, top: p.y, width: p.s * 2, height: p.s * 2 }}
          animate={{ y: [0, -30, 0], opacity: [0.08, 0.25, 0.08] }}
          transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Center glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
