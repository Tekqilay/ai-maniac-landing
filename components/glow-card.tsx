"use client";

import { motion } from "framer-motion";

export function GlowCard({
  children,
  className,
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  if (!glow) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          "0 0 25px 2px rgba(37,99,235,0.30)",
          "0 0 55px 10px rgba(37,99,235,0.58)",
          "0 0 25px 2px rgba(37,99,235,0.30)",
        ],
      }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
