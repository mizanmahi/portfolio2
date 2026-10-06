"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import styles from "./about-scroll-section.module.css";

const chapters = [
  {
    label: "The builder",
    title: "Curiosity becomes code.",
    text: "I'm Mizanur Rahman, a Web Developer L2 at Programming Hero building modern, scalable web applications. Driven by curiosity, I turn ideas into reliable, well-designed systems built to last.",
    note: "Web Developer L2 / Programming Hero",
  },
  {
    label: "The mentor",
    title: "Knowledge moves forward.",
    text: "My path from teaching to production engineering has helped me mentor 2,500+ students while designing software that holds up in the real world. Mentorship keeps my approach grounded in clear communication, knowledge sharing, and helping other developers grow.",
    note: "2,500+ students mentored",
  },
  {
    label: "The systems thinker",
    title: "Look beyond the interface.",
    text: "I work on system design, backend engineering, code reviews, and AI agents or intelligent systems that automate useful workflows. From the first idea to the systems behind it, I work across the stack.",
    note: "Design / Build / Review / Improve",
  },
] as const;

const technologies = ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "Prisma", "Golang", "Python", "Docker", "AWS"];

function RevealWord({ word, progress, start, end, reduced }: { word: string; progress: MotionValue<number>; start: number; end: number; reduced: boolean }) {
  const emphasis = useTransform(progress, [start, end], [0, 100]);
  const color = useTransform(emphasis, (value) => `color-mix(in srgb, hsl(var(--foreground)) ${value}%, hsl(var(--muted)))`);
  return <motion.span style={{ color: reduced ? "hsl(var(--foreground))" : color }}>{word} </motion.span>;
}

function Chapter({ chapter, index, reduced }: { chapter: typeof chapters[number]; index: number; reduced: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 70%"] });
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const words = chapter.text.split(" ");

  return (
    <motion.article className={styles.chapter} ref={ref} style={{ y: reduced ? 0 : y }} aria-labelledby={`about-story-chapter-${index}`}>
      <p className={styles.chapterLabel}><span>0{index + 1}</span>{chapter.label}</p>
      <h3 id={`about-story-chapter-${index}`} className={styles.chapterTitle}>{chapter.title}</h3>
      <p className={styles.chapterCopy}>
        <span className="sr-only">{chapter.text}</span>
        <span aria-hidden="true">{words.map((word, i) => <RevealWord key={`${i}-${word}`} word={word} progress={scrollYProgress} start={i / words.length} end={(i + 1) / words.length} reduced={reduced} />)}</span>
      </p>
      <p className={styles.chapterNote}>{chapter.note}</p>
      {index === chapters.length - 1 && <ul className={styles.technologies} aria-label="Technologies I work with">{technologies.map((tool) => <li key={tool}>{tool}</li>)}</ul>}
    </motion.article>
  );
}

export function AboutScrollSection({ photoSrc, photoAlt }: { photoSrc: string; photoAlt: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [-35, 105]);
  const orbitScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 1.1, 1.5]);
  const beamX = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const photoRotate = useTransform(scrollYProgress, [0, 0.4, 1], [-5, 0, 3]);
  const photoScale = useTransform(scrollYProgress, [0, 0.55, 1], [1.12, 1, 1.04]);
  const photoColor = useTransform(scrollYProgress, [0.1, 0.5], ["grayscale(100%)", "grayscale(0%)"]);
  const scanY = useTransform(scrollYProgress, [0.12, 0.65], ["0%", "100%"]);

  return (
    <section id="about-story" aria-labelledby="about-story-title" className={styles.section} ref={sectionRef}>
      <div className={styles.background} aria-hidden="true">
        <div className={styles.backgroundScene}>
          <motion.div className={styles.beam} style={{ x: reduced ? 0 : beamX }} />
          <motion.svg className={styles.orbits} viewBox="0 0 1000 1000" fill="none" style={{ rotate: reduced ? 0 : orbitRotate, scale: reduced ? 1 : orbitScale }}>
            <circle cx="500" cy="500" r="440" />
            <circle cx="500" cy="500" r="360" strokeDasharray="2 14" />
            <circle cx="500" cy="500" r="280" />
            <ellipse cx="500" cy="500" rx="440" ry="150" transform="rotate(-35 500 500)" />
            <ellipse cx="500" cy="500" rx="440" ry="150" transform="rotate(35 500 500)" />
            <path d="M500 24V120M500 880V976M24 500H120M880 500H976" />
            <circle className={styles.orbitNode} cx="500" cy="60" r="8" />
            <circle className={styles.orbitNode} cx="780" cy="500" r="6" />
          </motion.svg>
          <div className={styles.grain} />
        </div>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>About / A closer look</p>
          <h2 id="about-story-title" className={styles.title}>Behind the code,<br /><span>a curious mind.</span></h2>
          <p className={styles.headerNote}>A builder. A mentor.<br />Always a student.</p>
        </header>

        <div className={styles.story}>
          <div className={styles.portraitColumn}>
            <div className={styles.pinnedPortrait}>
              <motion.figure className={styles.portrait} style={{ rotate: reduced ? 0 : photoRotate }}>
                <div className={styles.photoWindow}>
                  <motion.div className={styles.photo} style={{ scale: reduced ? 1 : photoScale, filter: reduced ? "none" : photoColor }}>
                    <Image src={photoSrc} alt={photoAlt} fill sizes="(min-width: 768px) 40vw, 85vw" className={styles.image} />
                  </motion.div>
                  {!reduced && <motion.span aria-hidden="true" className={styles.scan} style={{ top: scanY }} />}
                  <span className={styles.photoCorner} aria-hidden="true" />
                </div>
                <figcaption className={styles.caption}><span>Mizanur Rahman</span><span>Dhaka, Bangladesh</span></figcaption>
              </motion.figure>
              <div className={styles.readingTrack} aria-hidden="true"><motion.span style={{ scaleX: reduced ? 1 : scrollYProgress }} /></div>
              <p className={styles.portraitNote}>Building software. Sharing what I learn.</p>
            </div>
          </div>
          <div className={styles.chapters}>{chapters.map((chapter, index) => <Chapter key={chapter.label} chapter={chapter} index={index} reduced={reduced} />)}</div>
        </div>
        <p className={styles.closing}>Stay curious.<span>Keep building.</span><span aria-hidden="true">↗</span></p>
      </div>
    </section>
  );
}
