"use client";

import { TerminalWindow } from "@/components/terminal/terminal-window";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { AuraBackground } from "@/components/ui/ambient-glow";
import styles from "@/components/hero/hero-entrance.module.css";
import { motion, useReducedMotion, type Variants } from "motion/react";

const entranceVariants: Record<"container" | "nav" | "main" | "terminal", Variants> = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  },
  nav: {
    hidden: { opacity: 0, x: "-50%", y: -60 },
    visible: {
      opacity: 1,
      x: "-50%",
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  },
  main: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  },
  terminal: {
    hidden: { opacity: 0, y: "var(--space-6)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

let hasPlayedHeroEntrance = false;

export function HeroEntrance() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const shouldSkipEntrance = prefersReducedMotion || hasPlayedHeroEntrance;

  const handleTerminalEntranceComplete = () => {
    hasPlayedHeroEntrance = true;
  };

  return (
    <motion.div
      animate="visible"
      initial={shouldSkipEntrance ? false : "hidden"}
      variants={entranceVariants.container}
    >
      <FloatingNav variants={entranceVariants.nav} />
      <motion.main className={styles.page} variants={entranceVariants.main}>
        <section id="top" aria-labelledby="hero-title" className={styles.shell}>
          <AuraBackground />
          <motion.div
            className={styles.terminalWrap}
            onAnimationComplete={handleTerminalEntranceComplete}
            variants={entranceVariants.terminal}
          >
            <TerminalWindow />
          </motion.div>
        </section>
      </motion.main>
    </motion.div>
  );
}
