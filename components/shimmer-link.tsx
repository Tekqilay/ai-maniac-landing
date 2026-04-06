"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";

type ShimmerLinkProps = ComponentPropsWithoutRef<typeof Link>;

export function ShimmerLink({ children, className, ...props }: ShimmerLinkProps) {
  return (
    <Link className={`relative overflow-hidden ${className ?? ""}`} {...props}>
      {children}
      <motion.span
        aria-hidden
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        animate={{ x: ["-120%", "220%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
    </Link>
  );
}
