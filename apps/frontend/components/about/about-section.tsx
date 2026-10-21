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

const underlineColor = "hsl(var(--accent-strong))";

const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Golang",
  "Python",
  "Docker",
  "AWS",
];

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

function ProfileCalibrationField() {
  return (
    <svg aria-hidden="true" className={styles.calibrationField} fill="none" viewBox="0 0 1440 900">
      <g className={styles.calibrationLines}>
        <path d="M0 132H248C336 132 364 236 462 236H640" />
        <path d="M1440 742H1216C1122 742 1098 636 996 636H804" />
        <path d="M1042 0V168C1042 226 994 274 936 274H772" />
        <path d="M346 900V744C346 684 394 636 454 636H588" />
        <path d="M76 498H196C254 498 300 544 300 602V816" />
        <path d="M1364 402H1238C1178 402 1130 354 1130 294V82" />
        <rect x="860" y="112" width="370" height="612" rx="18" />
        <rect x="884" y="136" width="322" height="564" rx="12" className={styles.calibrationInner} />
        <circle cx="936" cy="274" r="12" />
        <circle cx="996" cy="636" r="12" />
        <circle cx="300" cy="602" r="10" />
        <circle cx="1130" cy="294" r="10" />
        <path d="M792 418H1276M792 450H1276M792 482H1276" className={styles.calibrationTicks} />
        <path d="M160 212H262M211 161V263M1300 662H1402M1351 611V713" className={styles.calibrationCross} />
      </g>
    </svg>
  );
}

export function AboutSection({ photoAlt, photoSrc }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  const isRevealed = prefersReducedMotion || isInView;

  return (
    <section aria-labelledby="about-title" className={styles.section} id="about" ref={sectionRef}>
      <ProfileCalibrationField />
      <div className={styles.grid}>
        <div className={styles.photoColumn}>
          <span aria-hidden="true" className={styles.photoHook} />
          <motion.div
            animate={prefersReducedMotion ? { rotate: 0 } : { rotate: 0.6 }}
            className={styles.photoHanger}
            initial={prefersReducedMotion ? false : { rotate: -0.6 }}
            transition={prefersReducedMotion ? { duration: 0 } : {
              type: "spring",
              stiffness: 12,
              damping: 5,
              mass: 1.4,
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: 0.6,
            }}
          >
            <div className={styles.photoHangerAssembly}>
              <span aria-hidden="true" className={styles.hangerTag}>v1.0</span>
              <motion.div
                animate={isRevealed ? "visible" : "hidden"}
                className={styles.photoReveal}
                initial={prefersReducedMotion ? false : "hidden"}
                variants={entranceVariants.photo}
              >
                <PhotoFrame alt={photoAlt} isRevealed={isRevealed} src={photoSrc} />
              </motion.div>
            </div>
          </motion.div>
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
              I&apos;m Mizanur Rahman, a <Highlighter action="underline" color={underlineColor}>Web Developer L2</Highlighter> at <Highlighter action="underline" color={underlineColor}>Programming Hero</Highlighter> building modern, scalable web applications. My path from teaching to production engineering has helped me mentor <Highlighter action="underline" color={underlineColor}>2,500+ students</Highlighter> while designing software that holds up in the real world.
            </p>
            <div className={styles.techStack}>
              <p className={styles.summary}>Works across the stack with:</p>
              <ul className={styles.techList}>
                {technologies.map((technology) => (
                  <li key={technology}>
                    <span className={styles.techChip}>{technology}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className={styles.summary}>
              I work on system design, backend engineering, code reviews, and AI agents or intelligent systems that automate useful workflows. Mentorship keeps my approach grounded in clear communication, knowledge sharing, and helping other developers grow.
            </p>
            <p className={styles.summary}>
              Driven by curiosity, I turn ideas into reliable, well-designed systems built to last.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
