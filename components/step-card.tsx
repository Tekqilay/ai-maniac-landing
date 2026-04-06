"use client";

import { motion } from "framer-motion";

interface StepCardProps {
  step: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export function StepCard({ step, icon, title, desc }: StepCardProps) {
  return (
    <motion.div
      className="relative bg-slate-900 border border-slate-800 rounded-2xl p-7 cursor-default h-full"
      whileHover={{ scale: 1.02, borderColor: "rgba(37,99,235,0.5)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-slate-800 text-5xl font-black absolute top-5 right-6 leading-none select-none">
        {step}
      </div>
      <div className="relative bg-blue-950/60 rounded-xl p-3 w-fit mb-5">
        {icon}
        {step === "01" && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"
            animate={{ opacity: [1, 0, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
