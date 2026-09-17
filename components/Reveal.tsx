"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, useful to stagger a list of items. */
  delay?: number;
  /** Distance (px) the element travels while fading in. */
  y?: number;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
  /** If true, animates only the first time it enters the viewport.
   *  If false (default), it fades back out when scrolled past and
   *  fades back in every time it re-enters — ideal for mobile scroll. */
  once?: boolean;
};

/**
 * Wraps content in a scroll-triggered fade/slide animation powered by
 * framer-motion. By default it replays every time the element enters or
 * leaves the viewport, which reads nicely while swiping through the page
 * on mobile. Respects the user's "reduce motion" OS setting.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.25,
  once = false,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
