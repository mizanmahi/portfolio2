"use client";

import { BootSequenceProvider } from "@/components/hero/boot-sequence-provider";
import { HeroActions } from "@/components/hero/hero-actions";
import { ScrollCue } from "@/components/hero/scroll-cue";
import { TerminalBoot } from "@/components/hero/terminal-boot";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { AuraBackground } from "@/components/ui/ambient-glow";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import styles from "@/components/hero/hero-entrance.module.css";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useState } from "react";

const entranceVariants: Record<"container" | "nav" | "main" | "grid" | "intro" | "terminal", Variants> = {
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
  grid: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  },
  intro: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },
  terminal: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

let hasPlayedHeroEntrance = false;

export function HeroEntrance() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [isTerminalReady, setIsTerminalReady] = useState(() => hasPlayedHeroEntrance);
  const shouldSkipEntrance = prefersReducedMotion || hasPlayedHeroEntrance;

  const handleTerminalEntranceComplete = () => {
    hasPlayedHeroEntrance = true;
    setIsTerminalReady(true);
  };

  return (
    <motion.div
      animate="visible"
      initial={shouldSkipEntrance ? false : "hidden"}
      variants={entranceVariants.container}
    >
      <FloatingNav variants={entranceVariants.nav} />
      <motion.main className={styles.page} variants={entranceVariants.main}>
        <BootSequenceProvider shouldStart={shouldSkipEntrance || isTerminalReady}>
          <section aria-labelledby="hero-title" className={styles.shell}>
            <AuraBackground />
            <motion.div className={styles.grid} variants={entranceVariants.grid}>
              <motion.div className={styles.intro} variants={entranceVariants.intro}>
                <p className={styles.kicker}>Developer profile</p>

                <LineShadowText
                  aria-label="Mizanur Rahman"
                  as="h1"
                  className={styles.title}
                  id="hero-title"
                  shadowClassName={styles.titleSystemShadow}
                  shadowColor="hsl(var(--name-shadow))"
                  shadowTextClassName={styles.titleSystemShadowText}
                >
                  Mizanur Rahman
                </LineShadowText>

                <HeroActions />
              </motion.div>

              <motion.div
                className={styles.terminalWrap}
                onAnimationComplete={handleTerminalEntranceComplete}
                variants={entranceVariants.terminal}
              >
                <TerminalBoot />
              </motion.div>
            </motion.div>
            <ScrollCue />
          </section>
          <div id="projects" className={styles.futureSectionAnchor} aria-hidden="true" />
        </BootSequenceProvider>
      </motion.main>
    </motion.div>
  );
}
