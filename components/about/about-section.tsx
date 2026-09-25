"use client";

import { PhotoFrame } from "@/components/about/photo-frame";
import { Highlighter } from "@/components/ui/highlighter";
import styles from "@/components/about/about-section.module.css";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef } from "react";

type AboutSectionProps = {
  photoAlt: string;
  photoSrc: string;
};

const entranceVariants: Record<"photo" | "content" | "item", Variants> = {
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
};

const highlightMarkerColor = "hsl(var(--accent) / 0.28)";
const underlineMarkerColor = "hsl(var(--accent-strong))";

export function AboutSection({ photoAlt, photoSrc }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  const isRevealed = prefersReducedMotion || isInView;

  return (
    <section aria-labelledby="about-title" className={styles.section} id="about" ref={sectionRef}>
      <div className={styles.grid}>
        <div className={styles.photoColumn}>
          <span aria-hidden="true" className={styles.photoHook} />
          <div className={styles.photoHanger}>
            <motion.div
              animate={isRevealed ? "visible" : "hidden"}
              className={styles.photoReveal}
              initial={prefersReducedMotion ? false : "hidden"}
              variants={entranceVariants.photo}
            >
              <PhotoFrame alt={photoAlt} isRevealed={isRevealed} src={photoSrc} />
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={isRevealed ? "visible" : "hidden"}
          className={styles.content}
          initial={prefersReducedMotion ? false : "hidden"}
          variants={entranceVariants.content}
        >
          <motion.h2 className={styles.title} id="about-title" variants={entranceVariants.item}>About</motion.h2>
          <motion.div className={styles.summaries} variants={entranceVariants.item}>
            <p className={styles.summary}>
              I&apos;m Mizanur Rahman, a <span className={styles.highlight}><Highlighter action="underline" color={underlineMarkerColor}>Web Developer L2</Highlighter></span> at <span className={styles.highlight}><Highlighter action="underline" color={underlineMarkerColor}>Programming Hero</Highlighter></span> with several years of experience building modern, scalable web applications. My journey has grown from teaching and mentoring developers to designing and developing production-ready software, and I&apos;ve taught and mentored <span className={styles.highlight}><Highlighter color={highlightMarkerColor}>2,500+ students</Highlighter></span>.
            </p>
            <p className={styles.summary}>
              I work across the stack with <span className={styles.highlight}><Highlighter color={highlightMarkerColor}>React, Next.js, Node.js, PostgreSQL, MongoDB, Prisma, Golang, Python, Docker, and AWS</Highlighter></span>. I&apos;ve also built projects around <span className={styles.highlight}><Highlighter action="underline" color={underlineMarkerColor}>AI agents and intelligent systems</Highlighter></span>, using AI to create practical solutions and automate real-world workflows.
            </p>
            <p className={styles.summary}>
              Beyond writing code, I enjoy system design, backend engineering, code reviews, and solving complex technical problems. My experience as a mentor has shaped how I approach engineering, with a strong focus on clear communication, knowledge sharing, and helping others grow.
            </p>
            <p className={styles.summary}>
              I&apos;m driven by curiosity and continuous improvement, always looking for better ways to design systems, solve problems, and turn ideas into reliable software. For me, software engineering is about turning ideas into <span className={styles.highlight}><Highlighter action="underline" color={underlineMarkerColor}>well-designed systems</Highlighter></span> that are useful, scalable, and built to last.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
