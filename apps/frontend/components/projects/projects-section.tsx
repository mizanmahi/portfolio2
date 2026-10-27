"use client";

import Image from "next/image";
import { ArrowRight01Icon, ArrowUpRight01Icon, Github01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, type PointerEvent } from "react";

import styles from "@/components/projects/projects-section.module.css";

const projects = [
  {
    id: "edulavo",
    index: "01",
    name: "Edulavo",
    label: "AI-powered learning platform",
    description: "Personalized learning paths that adapt to each learner’s ambition, skills, and pace.",
    image: "/images/project1.jpeg",
    imageAlt: "Edulavo website showing an AI-powered skill coach and adaptive learning paths",
    href: "https://www.edulavo.com/",
    host: "edulavo.com",
    linkLabel: "Visit live site",
    previewLabel: "Open site",
    technologies: ["Next.js", "TypeScript", "OpenAI", "Python", "gRPC", "tRPC", "CrewAI"],
    className: styles.featured,
  },
  {
    id: "mentora",
    index: "02",
    name: "Mentora",
    label: "AI-native learning ecosystem",
    description: "Video lectures become conversations, with cited AI answers, checkpoint quizzes, and a digital twin that tracks each learner’s skills.",
    image: "/images/project2.png",
    imageAlt: "Mentora banner with an AI learning assistant and the tagline AI-Powered Interactive Education Ecosystem",
    href: "https://github.com/mir-hussain/ph-ai-eco",
    host: "github.com/mir-hussain/ph-ai-eco",
    linkLabel: "View repository",
    previewLabel: "Open repository",
    technologies: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "pgvector", "Redis", "BullMQ", "OpenRouter", "Deepgram"],
    className: styles.mentora,
  },
  {
    id: "next-level",
    index: "03",
    name: "Next Level",
    label: "AI-first engineering program",
    description: "A career-focused learning experience for developers becoming production-ready engineers.",
    image: "/images/project3.jpeg",
    imageAlt: "Next Level website promoting an AI-first software engineering program",
    href: "https://next.programming-hero.com/",
    host: "next.programming-hero.com",
    linkLabel: "Visit live site",
    previewLabel: "Open site",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Mongoose", "Redis", "Docker"],
    className: styles.nextLevel,
  },
  {
    id: "programming-hero",
    index: "04",
    name: "Programming Hero",
    label: "Career-focused ed-tech platform",
    description: "Practical learning programs helping developers build real-world software skills.",
    image: "/images/project4.jpeg",
    imageAlt: "Programming Hero website for an AI-driven full-stack web engineering program",
    href: "https://web.programming-hero.com/home",
    host: "web.programming-hero.com",
    linkLabel: "Visit live site",
    previewLabel: "Open site",
    technologies: ["React", "Next.js", "Node.js", "Redis", "AWS", "Firebase", "Pino", "Stripe"],
    className: styles.programmingHero,
  },
] as const;

const revealVariants: Record<"archive" | "entry" | "media" | "copy", Variants> = {
  archive: {
    hidden: {},
    visible: { transition: { delayChildren: 0.1, staggerChildren: 0.18 } },
  },
  entry: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  },
  media: {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: {
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
    },
  },
  copy: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, { amount: 0.14, once: true });
  const isRevealed = prefersReducedMotion || isInView;

  function updateBorderSpotlight(event: PointerEvent<HTMLAnchorElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <section aria-labelledby="projects-title" className={styles.section} id="projects" ref={sectionRef}>
      <motion.div
        animate={isRevealed ? "visible" : "hidden"}
        className={styles.content}
        initial={prefersReducedMotion ? false : "hidden"}
        variants={revealVariants.archive}
      >
        <motion.header className={styles.intro} variants={revealVariants.entry}>
          <motion.h2 className={styles.title} id="projects-title" variants={revealVariants.copy}>Learning products, made tangible.</motion.h2>
          <motion.p className={styles.introCopy} variants={revealVariants.copy}>
            Platforms I&apos;ve helped shape for people who want to learn by building.
          </motion.p>
        </motion.header>

        <motion.ol className={styles.archive} variants={revealVariants.archive}>
          {projects.map((project) => (
            <motion.li className={`${styles.project} ${project.className}`} key={project.id} variants={revealVariants.entry}>
              <motion.a
                aria-label={`${project.previewLabel}: ${project.name}`}
                className={styles.visual}
                href={project.href}
                onPointerMove={updateBorderSpotlight}
                rel="noreferrer"
                target="_blank"
                variants={revealVariants.media}
              >
                <span className={styles.imageFrame}>
                  <Image
                    alt={project.imageAlt}
                    className={styles.image}
                    fill
                    sizes="(min-width: 64rem) 58vw, 100vw"
                    src={project.image}
                  />
                  <span aria-hidden="true" className={styles.imageVeil} />
                </span>
                <span aria-hidden="true" className={styles.visualMark}>{project.previewLabel} <HugeiconsIcon icon={ArrowUpRight01Icon} size="1em" /></span>
                <span aria-hidden="true" className={styles.visualFooter}>
                  <span>{project.host}</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size="1em" />
                </span>
              </motion.a>

              <motion.div className={styles.record} variants={revealVariants.copy}>
                <div className={styles.recordMeta}>
                  <span>/{project.index}</span>
                  <span>{project.label}</span>
                </div>
                <h3 className={styles.projectTitle}>{project.name}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <ul aria-label={`Technologies used for ${project.name}`} className={styles.technologies}>
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <a className={styles.liveLink} href={project.href} rel="noreferrer" target="_blank">
                  {project.linkLabel} <HugeiconsIcon aria-hidden="true" icon={ArrowUpRight01Icon} size="1em" />
                </a>
              </motion.div>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div className={styles.allProjects} variants={revealVariants.copy}>
          <a href="https://github.com/mizanmahi" rel="noreferrer" target="_blank">
            <HugeiconsIcon aria-hidden="true" icon={Github01Icon} size="1.25em" />
            View all projects
            <HugeiconsIcon aria-hidden="true" className={styles.allProjectsArrow} icon={ArrowRight01Icon} size="1.1em" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
