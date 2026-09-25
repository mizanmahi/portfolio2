"use client";

import { PhotoFrame } from "@/components/about/photo-frame";
import styles from "@/components/about/about-section.module.css";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef } from "react";

type AboutSectionProps = {
  photoAlt: string;
  photoSrc: string;
};

const entranceVariants: Record<"photo" | "content" | "item" | "stats", Variants> = {
  photo: {
    hidden: { clipPath: "circle(0% at 50% 50%)", scale: 0.88 },
    visible: {
      clipPath: "circle(150% at 50% 50%)",
      scale: 1,
      transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
    },
  },
  content: {
    hidden: {},
    visible: { transition: { delayChildren: 0.18, staggerChildren: 0.12 } },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
    },
  },
  stats: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  },
};

const stats = [
  { label: "Experience", value: "4+ years" },
  { label: "Mentorship", value: "2,500+ developers" },
  { label: "Location", value: "Dhaka, Bangladesh" },
];

export function AboutSection({ photoAlt, photoSrc }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  const isRevealed = prefersReducedMotion || isInView;

  return (
    <section aria-labelledby="about-title" className={styles.section} id="about" ref={sectionRef}>
      <div className={styles.grid}>
        <motion.div
          animate={isRevealed ? "visible" : "hidden"}
          className={styles.photoColumn}
          initial={prefersReducedMotion ? false : "hidden"}
          variants={entranceVariants.photo}
        >
          <PhotoFrame alt={photoAlt} isRevealed={isRevealed} src={photoSrc} />
        </motion.div>

        <motion.div
          animate={isRevealed ? "visible" : "hidden"}
          className={styles.content}
          initial={prefersReducedMotion ? false : "hidden"}
          variants={entranceVariants.content}
        >
          <motion.p className={styles.eyebrow} variants={entranceVariants.item}>System profile</motion.p>
          <motion.h2 className={styles.title} id="about-title" variants={entranceVariants.item}>About</motion.h2>
          <motion.p className={styles.summary} variants={entranceVariants.item}>
            I&apos;m a <span className={styles.highlight}>Full-Stack</span> developer
            based in Dhaka with <span className={styles.highlight}>4+ years</span> of
            experience building useful web products. As an <span className={styles.highlight}>L2 Developer</span> at <span className={styles.highlight}>Programming Hero</span>,
            I&apos;ve also mentored <span className={styles.highlight}>2,500+ developers</span>
            as they grow into global careers.
          </motion.p>

          <motion.dl className={styles.stats} variants={entranceVariants.stats}>
            {stats.map((stat) => (
              <motion.div className={styles.stat} key={stat.label} variants={entranceVariants.item}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
