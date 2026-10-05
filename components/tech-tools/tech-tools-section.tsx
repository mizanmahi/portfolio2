"use client";

import {
  CloudServerIcon,
  CodeSquareIcon,
  Database02Icon,
  ServerStack02Icon,
  Structure02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef } from "react";

import styles from "@/components/tech-tools/tech-tools-section.module.css";

const toolGroups = [
  {
    icon: CodeSquareIcon,
    index: "01",
    title: "Frontend and languages",
    tools: ["JavaScript", "TypeScript", "React", "Next.js"],
    className: styles.frontend,
  },
  {
    icon: ServerStack02Icon,
    index: "02",
    title: "Backend and APIs",
    tools: ["Node.js", "Express.js", "Python", "tRPC", "Golang", "Echo", "gRPC"],
    className: styles.backend,
  },
  {
    icon: Database02Icon,
    index: "03",
    title: "Data and persistence",
    tools: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
    className: styles.data,
  },
  {
    icon: CloudServerIcon,
    index: "04",
    title: "Cloud and delivery",
    tools: ["AWS", "Docker", "CI/CD"],
    className: styles.cloud,
  },
  {
    icon: Structure02Icon,
    index: "05",
    title: "Systems and architecture",
    tools: ["System design", "Security", "Performance", "Code review"],
    className: styles.systems,
  },
] as const;

const revealVariants: Record<"container" | "item", Variants> = {
  container: {
    hidden: {},
    visible: { transition: { delayChildren: 0.08, staggerChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

function StackMap() {
  return (
    <svg aria-hidden="true" className={styles.stackMap} fill="none" viewBox="0 0 1440 760">
      <path d="M0 482H214C318 482 356 354 472 354H610C724 354 752 530 882 530H1440" />
      <path d="M154 0V130C154 204 214 264 288 264H398C470 264 528 322 528 394V760" />
      <path d="M1292 0V120C1292 188 1236 244 1168 244H1058C988 244 932 300 932 370V614" />
      <circle cx="472" cy="354" r="10" />
      <circle cx="882" cy="530" r="10" />
      <circle cx="288" cy="264" r="8" />
      <circle cx="1168" cy="244" r="8" />
      <circle cx="720" cy="430" r="90" className={styles.mapRing} />
      <circle cx="720" cy="430" r="6" className={styles.mapCore} />
    </svg>
  );
}

export function TechToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, { amount: 0.18, once: true });
  const isRevealed = prefersReducedMotion || isInView;

  return (
    <section aria-labelledby="tech-tools-title" className={styles.section} id="tech-tools" ref={sectionRef}>
      <StackMap />
      <motion.div
        animate={isRevealed ? "visible" : "hidden"}
        className={styles.content}
        initial={prefersReducedMotion ? false : "hidden"}
        variants={revealVariants.container}
      >
        <motion.header className={styles.intro} variants={revealVariants.item}>
          <p className={styles.eyebrow}>The workbench</p>
          <h2 className={styles.title} id="tech-tools-title">Tech and tools I use</h2>
          <p className={styles.description}>A connected toolkit for designing, building, and operating dependable software.</p>
        </motion.header>

        <motion.ul className={styles.grid} variants={revealVariants.container}>
          {toolGroups.map(({ className, icon, index, title, tools }) => (
            <motion.li className={`${styles.card} ${className}`} key={index} variants={revealVariants.item}>
              <div className={styles.cardHeader}>
                <span className={styles.iconBox}><HugeiconsIcon aria-hidden="true" icon={icon} size="1.5em" /></span>
                <span className={styles.index}>/{index}</span>
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <div className={styles.toolChips}>
                {tools.map((tool) => <span className={styles.toolChip} key={tool}>{tool}</span>)}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
