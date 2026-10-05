"use client";

import {
  CloudServerIcon,
  CodeSquareIcon,
  MentoringIcon,
  SearchCodeIcon,
  Structure02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import styles from "@/components/expertise/expertise-section.module.css";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef } from "react";

const expertise = [
  {
    icon: CodeSquareIcon,
    index: "01",
    title: "Full-stack development",
    description: "From the interface to the infrastructure, I build cohesive web products that stay maintainable as they grow.",
    className: styles.fullStack,
  },
  {
    icon: Structure02Icon,
    index: "02",
    title: "System design",
    description: "I turn ambiguous product needs into clear, scalable systems with deliberate technical boundaries.",
    className: styles.systemDesign,
  },
  {
    icon: SearchCodeIcon,
    index: "03",
    title: "Code review",
    description: "Thoughtful feedback that improves quality, shares context, and helps teams ship with confidence.",
    className: styles.codeReview,
  },
  {
    icon: CloudServerIcon,
    index: "04",
    title: "DevOps and cloud solutions",
    description: "Reliable delivery pipelines, containers, and cloud foundations built for practical operations.",
    className: styles.devOps,
  },
  {
    icon: MentoringIcon,
    index: "05",
    title: "Mentorship",
    description: "Clear guidance that helps developers build confidence, sharpen judgment, and keep moving forward.",
    className: styles.mentorship,
  },
];

const revealVariants: Record<"container" | "item", Variants> = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.54, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

function ExpertiseDiagram() {
  return (
    <svg aria-hidden="true" className={styles.diagram} fill="none" viewBox="0 0 1200 760">
      <path d="M20 572C178 572 222 456 360 456C498 456 525 628 670 628C811 628 860 238 1056 238H1180" />
      <path d="M0 168H246C344 168 355 300 472 300C596 300 598 122 724 122C862 122 899 440 1080 440H1200" />
      <path d="M146 760V642C146 586 198 548 254 548H432C481 548 520 508 520 460V348" />
      <path d="M874 0V92C874 144 916 186 968 186H1072C1132 186 1180 234 1180 294V520" />
      <circle cx="360" cy="456" r="10" />
      <circle cx="670" cy="628" r="10" />
      <circle cx="724" cy="122" r="10" />
      <circle cx="520" cy="348" r="10" />
      <circle cx="968" cy="186" r="10" />
      <circle cx="1080" cy="440" r="10" />
      <circle cx="670" cy="628" r="4" className={styles.diagramCore} />
      <circle cx="724" cy="122" r="4" className={styles.diagramCore} />
    </svg>
  );
}

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, { amount: 0.18, once: true });
  const isRevealed = prefersReducedMotion || isInView;

  return (
    <section aria-labelledby="expertise-title" className={styles.section} id="expertise" ref={sectionRef}>
      <ExpertiseDiagram />
      <div className={styles.content}>
        <motion.div
          animate={isRevealed ? "visible" : "hidden"}
          className={styles.intro}
          initial={prefersReducedMotion ? false : "hidden"}
          variants={revealVariants.container}
        >
          <motion.p className={styles.eyebrow} variants={revealVariants.item}>Engineering focus</motion.p>
          <motion.h2 className={styles.title} id="expertise-title" variants={revealVariants.item}>Expertise shaped by building and teaching</motion.h2>
          <motion.p className={styles.description} variants={revealVariants.item}>
            A practical engineering toolkit for taking useful ideas from first sketch to reliable release.
          </motion.p>
        </motion.div>

        <motion.ul
          animate={isRevealed ? "visible" : "hidden"}
          className={styles.grid}
          initial={prefersReducedMotion ? false : "hidden"}
          variants={revealVariants.container}
        >
          {expertise.map(({ className, description, icon, index, title }) => (
            <motion.li className={`${styles.card} ${className}`} key={title} variants={revealVariants.item}>
              <span aria-hidden="true" className={styles.cardGlow} />
              <div className={styles.cardHeader}>
                <span className={styles.iconBox}><HugeiconsIcon aria-hidden="true" icon={icon} size="1.5em" /></span>
                <span className={styles.index}>/{index}</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardDescription}>{description}</p>
              </div>
              <span aria-hidden="true" className={styles.cardSignal}>●</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
