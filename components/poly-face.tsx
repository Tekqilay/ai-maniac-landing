"use client";

import { useEffect, useRef } from "react";
import Delaunator from "delaunator";

// ─── Side-profile head (left-facing, nose on the left) ───────────────────────
// Canvas: 360 × 460. Based on realistic human head proportions.
const FACE_POS: [number, number][] = [
  // ── Outer boundary (30 points, clockwise from nose tip) ──
  [42,  220], // 0  nose-tip  ← leftmost point, makes profile recognizable
  [60,  244], // 1  below-nose
  [72,  262], // 2  upper-lip
  [68,  280], // 3  lower-lip
  [80,  302], // 4  chin-front
  [105, 328], // 5  jaw-lower-front
  [140, 350], // 6  jaw-lower-mid
  [168, 368], // 7  neck-front
  [162, 400], // 8  neck-bottom-front
  [200, 402], // 9  neck-bottom-back
  [210, 372], // 10 neck-back
  [218, 340], // 11 back-jaw
  [238, 312], // 12 back-lower-head
  [262, 282], // 13 back-mid-head
  [288, 245], // 14 back-widest (occiput)
  [298, 205], // 15 back-upper-head
  [290, 158], // 16 back-skull-upper
  [270, 112], // 17 back-skull
  [240, 72],  // 18 upper-back-skull
  [205, 44],  // 19 crown-back
  [172, 22],  // 20 crown-top
  [145, 22],  // 21 crown-front
  [122, 32],  // 22 forehead-top
  [105, 55],  // 23 forehead
  [92,  80],  // 24 brow-ridge
  [80,  108], // 25 eye-socket
  [72,  135], // 26 nose-bridge
  [60,  162], // 27 nose-upper
  [50,  188], // 28 nose-mid

  // ── Interior — skull / back-of-head ──
  [162, 42],  // 29 skull-top-front
  [185, 52],  // 30 skull-top-mid
  [210, 65],  // 31 skull-interior
  [232, 88],  // 32 skull-upper
  [252, 115], // 33 skull-mid-upper
  [268, 148], // 34 skull-mid
  [275, 185], // 35 skull-mid-lower
  [268, 222], // 36 skull-lower
  [255, 258], // 37 lower-skull
  [235, 288], // 38 jaw-skull
  [212, 310], // 39 jaw-interior
  [190, 332], // 40 lower-jaw
  [180, 355], // 41 neck-interior
  [185, 385], // 42 neck-lower

  // ── Interior — face / cheek ──
  [105, 42],  // 43 forehead-interior
  [128, 52],  // 44 upper-forehead-interior
  [148, 62],  // 45 mid-forehead
  [100, 78],  // 46 temple
  [112, 100], // 47 brow-interior
  [118, 125], // 48 face-upper
  [112, 152], // 49 face-mid-upper
  [105, 178], // 50 nose-area
  [98,  205], // 51 between-nose-mouth
  [92,  230], // 52 cheek-front-low
  [100, 258], // 53 lower-cheek-front
  [115, 282], // 54 jaw-front
  [135, 305], // 55 chin-area

  // ── Interior — face center ──
  [138, 82],  // 56 forehead-center
  [148, 108], // 57 temple-face
  [145, 138], // 58 face-center-upper
  [142, 168], // 59 face-center-mid
  [140, 198], // 60 face-center
  [145, 228], // 61 face-center-low
  [152, 258], // 62 face-jaw
  [162, 288], // 63 jaw-center
  [168, 318], // 64 lower-jaw-center

  // ── Interior — mid band ──
  [168, 90],  // 65 upper-mid
  [172, 118], // 66 mid-upper
  [175, 148], // 67 mid
  [178, 178], // 68 mid-low
  [182, 208], // 69 lower-mid
  [185, 238], // 70 jaw-mid
  [192, 268], // 71 jaw-back
  [198, 298], // 72 lower-jaw-back

  // ── Interior — back-face band ──
  [200, 98],  // 73
  [205, 128], // 74
  [210, 158], // 75
  [215, 188], // 76
  [220, 218], // 77
  [225, 248], // 78
  [228, 278], // 79
];

// ── Idle state: points orbit in a dynamic scattered cluster ──────────────────
function makeIdlePositions(w: number, h: number): [number, number][] {
  const cx = w * 0.5, cy = h * 0.5;
  return FACE_POS.map((_, i) => {
    const ring  = Math.floor(i / 12);
    const slot  = i % 12;
    const angle = (slot / 12) * Math.PI * 2 + ring * 0.9;
    const r     = (16 + ring * 14) * (w / 360);
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r * 1.1];
  });
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeInOut(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

// Lower-lip / mouth points that move when speaking
const MOUTH_IDX = new Set([2, 3, 51, 52, 53]);

export type FacePhase = "idle" | "morphing-in" | "speaking" | "morphing-out";

interface PolyFaceProps {
  width?:  number;
  height?: number;
  phase?:  FacePhase;
}

export function PolyFace({ width = 360, height = 460, phase = "idle" }: PolyFaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef(0);
  const morphRef  = useRef(0);
  const phaseRef  = useRef<FacePhase>(phase);

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = width  / 360;
    const scaleY = height / 460;

    const facePts: [number, number][] = FACE_POS.map(([x, y]) => [x * scaleX, y * scaleY]);
    const idlePts: [number, number][] = makeIdlePositions(width, height);

    // Triangulation — computed once from face positions
    const del       = new Delaunator(facePts.flat());
    const triangles = del.triangles;

    // Per-vertex animation params
    const verts = facePts.map((_, i) => ({
      phase:  (i / facePts.length) * Math.PI * 2,
      speed:  0.4 + (i % 7) * 0.12,
      amp:    1.0 + (i % 4) * 0.5,
    }));

    let lastT = 0;

    function draw(t: number) {
      if (!ctx) return;
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;

      // Advance morph value
      const ph = phaseRef.current;
      const speed = { "morphing-in": 1.1, "speaking": 2.0, "morphing-out": 0.85, "idle": 0.6 }[ph];
      const target = (ph === "idle" || ph === "morphing-out") ? 0 : 1;
      morphRef.current = target > morphRef.current
        ? Math.min(1, morphRef.current + dt * speed)
        : Math.max(0, morphRef.current - dt * speed);

      const m    = easeInOut(morphRef.current);
      const isSpeaking = ph === "speaking";
      // Idle = more energetic movement, face = subtle
      const globalAmp  = 1 + (1 - m) * 3.5;

      ctx.clearRect(0, 0, width, height);

      // Current vertex positions (lerp idle↔face + breathing)
      const pts: [number, number][] = facePts.map((fp, i) => {
        const ip  = idlePts[i];
        const v   = verts[i];
        const bx  = Math.sin(t * 0.001 * v.speed + v.phase) * v.amp * globalAmp;
        const by  = Math.cos(t * 0.0008 * v.speed + v.phase + 1.2) * v.amp * globalAmp;
        let mouthDy = 0;
        if (isSpeaking && MOUTH_IDX.has(i)) {
          mouthDy = (i === 3 ? 7 : 4) * Math.abs(Math.sin(t * 0.006 + i));
        }
        return [lerp(ip[0], fp[0], m) + bx, lerp(ip[1], fp[1], m) + by + mouthDy];
      });

      const numTri = triangles.length / 3;

      for (let i = 0; i < numTri; i++) {
        const a  = triangles[i * 3];
        const b  = triangles[i * 3 + 1];
        const c  = triangles[i * 3 + 2];

        const ax = pts[a][0], ay = pts[a][1];
        const bx = pts[b][0], by = pts[b][1];
        const cx2= pts[c][0], cy2= pts[c][1];

        const centX = (ax + bx + cx2) / 3;
        const centY = (ay + by + cy2) / 3;

        // 3-D lighting: profile face-lit from front-left
        // "front" = small x in face space → lighter
        const normX = (centX / width);          // 0=left(face), 1=right(back)
        const normY = (centY / height);          // 0=top, 1=bottom
        // Distance from "face center highlight" (forehead/cheek area)
        const faceHighX = 0.30, faceHighY = 0.45;
        const dist = Math.sqrt((normX - faceHighX)**2 + (normY - faceHighY)**2);
        const light = Math.max(0, 1 - dist * 1.6); // 0=dark, 1=bright

        // Fill color (dark navy → blue based on depth)
        const r = Math.round(6  + light * 28);
        const g = Math.round(12 + light * 55);
        const b2= Math.round(48 + light * 128);

        // In idle, reduce alpha so cluster is more transparent/ethereal
        const baseAlpha = 0.38 + light * 0.32;
        const alpha = baseAlpha * (0.45 + m * 0.55);

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.lineTo(cx2, cy2);
        ctx.closePath();
        ctx.fillStyle = `rgba(${r},${g},${b2},${Math.min(0.9, alpha)})`;
        ctx.fill();

        // Wire edges — brighter on face side
        const edgeAlpha = (0.18 + light * 0.48) * (0.25 + m * 0.75);
        ctx.strokeStyle = `rgba(96,165,250,${edgeAlpha})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }

      // Glowing vertex dots
      pts.forEach((p, i) => {
        if (i % 3 !== 0) return;
        const glow = 0.3 + m * 0.5;
        ctx.beginPath();
        ctx.arc(p[0], p[1], m > 0.4 ? 1.8 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${glow})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ filter: "drop-shadow(0 0 32px rgba(59,130,246,0.22))" }}
    />
  );
}
