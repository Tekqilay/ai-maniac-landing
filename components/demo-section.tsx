"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { FileText, Check, ListChecks, Mic, Brain, FileCheck } from "lucide-react";
import { OrbitVisual, type OrbitMode } from "./orbit-visual";

const LINES = [
  "Client discussed Q2 pipeline targets...",
  "Follow-up call required by Friday...",
  "Budget approved — send proposal ASAP...",
  "Onboarding scheduled for next Tuesday...",
];

type DemoPhase = "idle" | "recording" | "processing" | "done";

function SoundWaves({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-1 h-7">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-blue-500 rounded-full"
          animate={
            active
              ? { height: [4, 8 + i * 3, 4], opacity: [0.5, 1, 0.5] }
              : { height: 3, opacity: 0.15 }
          }
          transition={{ duration: 0.45 + i * 0.07, delay: i * 0.06, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function PhaseIndicator({ phase }: { phase: DemoPhase }) {
  const steps = [
    { id: "idle",       icon: <Mic className="w-3.5 h-3.5" />,       label: "Record" },
    { id: "recording",  icon: <Mic className="w-3.5 h-3.5" />,       label: "Recording" },
    { id: "processing", icon: <Brain className="w-3.5 h-3.5" />,     label: "Processing" },
    { id: "done",       icon: <FileCheck className="w-3.5 h-3.5" />, label: "Done" },
  ];
  const activeIndex = steps.findIndex(s => s.id === phase);

  return (
    <div className="flex items-center gap-2">
      {steps.slice(1).map((step, i) => {
        const stepIndex = i + 1;
        const isActive  = stepIndex === activeIndex;
        const isDone    = stepIndex < activeIndex;
        return (
          <div key={step.id} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-500 ${
              isActive
                ? "bg-blue-600 text-white"
                : isDone
                ? "bg-emerald-900/50 text-emerald-400 border border-emerald-800/50"
                : "bg-slate-800 text-slate-500"
            }`}>
              {step.icon}
              {step.label}
            </div>
            {i < 2 && (
              <motion.div
                className="w-6 h-px"
                animate={{ backgroundColor: isDone || isActive ? "#3b82f6" : "#334155" }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function TranscriptionPanel({ visibleLines, active }: { visibleLines: number; active: boolean }) {
  return (
    <motion.div
      className="bg-slate-900 border border-slate-700/60 rounded-2xl p-5 w-full shadow-xl"
      animate={{ opacity: active ? 1 : 0.25, y: active ? 0 : 6 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <motion.div
          className="w-2 h-2 rounded-full bg-blue-500"
          animate={{ opacity: active ? [1, 0.2, 1] : 0.2 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-slate-400 text-xs font-semibold tracking-widest uppercase">
          Auto-Transcription
        </span>
        {active && visibleLines > 0 && (
          <span className="ml-auto text-blue-400 text-xs">Analysing...</span>
        )}
      </div>
      <div className="space-y-2 min-h-[88px]">
        <AnimatePresence>
          {LINES.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span className="text-blue-500 text-xs mt-0.5 flex-shrink-0">›</span>
              <p className="text-slate-300 text-sm leading-relaxed">{line}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        {visibleLines === 0 && (
          <p className="text-slate-600 text-sm italic">Waiting for recording to finish...</p>
        )}
      </div>
    </motion.div>
  );
}

function DocumentCard({ title, icon, items, delay }: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  delay: number;
}) {
  return (
    <motion.div
      className="bg-slate-900 border border-blue-900/50 rounded-2xl p-5 shadow-xl"
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-950/60 p-1.5 rounded-lg">{icon}</div>
        <span className="text-blue-300 text-sm font-semibold">{title}</span>
        <motion.div
          className="ml-auto w-5 h-5 rounded-full bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.4, type: "spring", stiffness: 300 }}
        >
          <Check className="w-3 h-3 text-emerald-400" />
        </motion.div>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div key={i} className="flex items-center gap-2"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.2 + i * 0.12 }}
          >
            <div className="w-1 h-1 rounded-full bg-blue-500/60 flex-shrink-0" />
            <span className="text-slate-400 text-sm">{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function DemoSection() {
  const [demoPhase, setDemoPhase] = useState<DemoPhase>("idle");
  const [orbitMode, setOrbitMode] = useState<OrbitMode>("idle");
  const [visibleLines, setVisibleLines] = useState(0);
  const [showDocs, setShowDocs] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    function runCycle() {
      // Reset
      setDemoPhase("idle");
      setOrbitMode("idle");
      setVisibleLines(0);
      setShowDocs(false);
      setCycleKey(k => k + 1);

      const timers: ReturnType<typeof setTimeout>[] = [];
      function at(ms: number, fn: () => void) {
        timers.push(setTimeout(fn, ms));
      }

      // Recording phase — red orbit
      at(1000,  () => { setDemoPhase("recording"); setOrbitMode("recording"); });
      // Stop recording — switch to processing (blue orbit)
      at(5200,  () => { setDemoPhase("processing"); setOrbitMode("processing"); });
      // Transcription lines appear
      at(6000,  () => setVisibleLines(1));
      at(7400,  () => setVisibleLines(2));
      at(8700,  () => setVisibleLines(3));
      at(9900,  () => setVisibleLines(4));
      // Documents arrive
      at(10600, () => { setShowDocs(true); setDemoPhase("done"); setOrbitMode("idle"); });

      return timers;
    }

    const timers = runCycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      runCycle();
    }, 15000);

    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, [isInView]);

  const isRecording  = demoPhase === "recording";
  const isProcessing = demoPhase === "processing" || demoPhase === "done";
  const orbitSize    = 360;

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-slate-900/50 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">
            How It Actually Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Record. Walk away. Documents arrive.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            When your call ends, the system automatically transcribes the audio and
            generates your custom documents — no input required.
          </p>
        </div>

        {/* Phase indicator */}
        <div className="flex justify-center mb-12">
          <PhaseIndicator phase={demoPhase} />
        </div>

        {/* Main animation */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* LEFT: Face + mic */}
          <div className="flex-shrink-0 flex flex-col items-center gap-5">
            <OrbitVisual mode={orbitMode} size={orbitSize} />

            {/* Status bar */}
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-full px-5 py-2.5 min-w-[180px] justify-center">
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={isRecording
                  ? { backgroundColor: "#ef4444", scale: [1, 1.3, 1] }
                  : { backgroundColor: "#374151", scale: 1 }}
                transition={{ duration: 0.8, repeat: isRecording ? Infinity : 0 }}
              />
              <Mic className="w-4 h-4 text-slate-400" />
              <SoundWaves active={isRecording} />
              <span className="text-slate-400 text-xs font-medium w-20">
                {isRecording ? "Recording..." : isProcessing ? "Processing..." : "Ready"}
              </span>
            </div>
          </div>

          {/* RIGHT: Transcription + docs */}
          <div className="flex-1 w-full space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-600/60"
                animate={{ opacity: isProcessing ? 1 : 0.15 }}
                transition={{ duration: 0.6 }}
              />
              <span className="text-slate-600 text-xs shrink-0">AI processing</span>
              <motion.div
                className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-600/60"
                animate={{ opacity: isProcessing ? 1 : 0.15 }}
                transition={{ duration: 0.6 }}
              />
            </div>

            <TranscriptionPanel visibleLines={visibleLines} active={isProcessing} />

            <AnimatePresence mode="wait">
              {showDocs && (
                <motion.div
                  key={cycleKey}
                  className="grid sm:grid-cols-2 gap-4"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <DocumentCard
                    title="Meeting Summary"
                    icon={<FileText className="w-4 h-4 text-blue-400" />}
                    items={["Key decisions recorded", "Context preserved", "Ready to share"]}
                    delay={0}
                  />
                  <DocumentCard
                    title="To-Do List"
                    icon={<ListChecks className="w-4 h-4 text-blue-400" />}
                    items={["Send proposal today", "Schedule follow-up", "Update CRM"]}
                    delay={0.4}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
