"use client";

import { useEffect, useRef } from "react";

export type OrbitMode = "idle" | "recording" | "processing";

// Ring configuration — 5 concentric rings of orbiting dots
const RINGS = [
  { count: 6,  r: 26,  speed:  0.55, dotSize: 2.2 },
  { count: 10, r: 56,  speed: -0.38, dotSize: 1.8 },
  { count: 16, r: 92,  speed:  0.28, dotSize: 1.5 },
  { count: 14, r: 130, speed: -0.45, dotSize: 1.4 },
  { count: 10, r: 165, speed:  0.35, dotSize: 1.2 },
];

interface OrbitVisualProps {
  mode?: OrbitMode;
  size?: number;
}

export function OrbitVisual({ mode = "idle", size = 360 }: OrbitVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef(0);
  const modeRef   = useRef(mode);

  useEffect(() => { modeRef.current = mode; }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = size / 2, cy = size / 2;

    // Build points once
    const pts: {
      baseAngle: number;
      angle:     number;
      r:         number;
      speed:     number;
      phase:     number;
      dotSize:   number;
    }[] = [];

    RINGS.forEach((ring) => {
      for (let i = 0; i < ring.count; i++) {
        const ba = (i / ring.count) * Math.PI * 2 + Math.random() * 0.2;
        pts.push({
          baseAngle: ba,
          angle:     ba,
          r:         ring.r,
          speed:     ring.speed,
          phase:     Math.random() * Math.PI * 2,
          dotSize:   ring.dotSize,
        });
      }
    });

    let lastT = 0;

    function draw(t: number) {
      if (!ctx) return;
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;

      const m = modeRef.current;

      // Mode-dependent params
      const scale      = m === "recording" ? 1.0 : m === "processing" ? 0.62 : 0.78;
      const speedMult  = m === "recording" ? 2.2 : m === "processing" ? 0.55 : 1.0;
      const wobbleAmp  = m === "recording" ? 10  : m === "processing" ? 2    : 5;
      const isRec      = m === "recording";
      const isProc     = m === "processing";

      ctx.clearRect(0, 0, size, size);

      // Radial background glow
      const glowR = isRec ? 110 : isProc ? 60 : 80;
      const glowColor = isRec
        ? "rgba(239,68,68,0.08)"
        : "rgba(37,99,235,0.09)";
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR * scale);
      grad.addColorStop(0, glowColor);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Update angles
      pts.forEach(p => {
        p.angle += p.speed * speedMult * dt;
      });

      // Compute positions
      const positions: [number, number][] = pts.map(p => {
        const wobble = Math.sin(t * 0.002 + p.phase) * wobbleAmp;
        const r      = (p.r + wobble) * scale;
        return [cx + Math.cos(p.angle) * r, cy + Math.sin(p.angle) * r];
      });

      // Connection lines between nearby dots
      const maxDist = isRec ? 75 : isProc ? 50 : 60;
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i][0] - positions[j][0];
          const dy = positions[i][1] - positions[j][1];
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d >= maxDist) continue;
          const a = (1 - d / maxDist) * (isRec ? 0.4 : 0.22);
          ctx.strokeStyle = isRec
            ? `rgba(248,113,113,${a})`
            : `rgba(96,165,250,${a})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(positions[i][0], positions[i][1]);
          ctx.lineTo(positions[j][0], positions[j][1]);
          ctx.stroke();
        }
      }

      // Dots
      positions.forEach((pos, i) => {
        const p     = pts[i];
        const pulse = 0.55 + Math.sin(t * 0.003 + p.phase) * 0.45;
        const r     = p.dotSize * (isRec ? 1.4 : 1.0) * Math.max(0.6, scale);
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], r, 0, Math.PI * 2);
        ctx.fillStyle = isRec
          ? `rgba(252,165,165,${pulse})`
          : `rgba(147,197,253,${pulse})`;
        ctx.fill();
      });

      // Center core
      if (isRec) {
        // Pulsating red recording indicator
        const pulseR = 7 + Math.sin(t * 0.006) * 3;
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseR * 3);
        coreGrad.addColorStop(0, "rgba(239,68,68,0.9)");
        coreGrad.addColorStop(1, "transparent");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, pulseR * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(239,68,68,1)";
        ctx.fill();
      } else {
        // Blue core
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18 * scale);
        coreGrad.addColorStop(0, "rgba(96,165,250,0.8)");
        coreGrad.addColorStop(1, "transparent");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 18 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, cy, 4 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(147,197,253,0.95)";
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [size]);

  const shadowColor = mode === "recording"
    ? "rgba(239,68,68,0.25)"
    : "rgba(59,130,246,0.22)";

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ filter: `drop-shadow(0 0 32px ${shadowColor})` }}
    />
  );
}
