"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";

import { Highlighter } from "@/components/ui/highlighter";
import styles from "./about-scroll-section.module.css";

export function AboutScrollSection({ photoSrc, photoAlt }: { photoSrc: string; photoAlt: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const portraitScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const portraitClip = useTransform(scrollYProgress, [0, 0.4], ["inset(0% 0% 12% 0%)", "inset(0% 0% 0% 0%)"]);
  const contourY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const contourDraw = useTransform(scrollYProgress, [0.05, 0.65], [0.12, 1]);
  const rotateX = useSpring(0, { stiffness: 160, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 24 });
  const lift = useSpring(0, { stiffness: 160, damping: 24 });
  const lightX = useSpring(50, { stiffness: 160, damping: 24 });
  const lightY = useSpring(50, { stiffness: 160, damping: 24 });
  const lightOpacity = useSpring(0, { stiffness: 160, damping: 24 });
  const sheen = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, hsl(var(--accent) / 0.18), transparent 65%)`;

  function movePortrait(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    rotateX.set((0.5 - y) * 8);
    rotateY.set((x - 0.5) * 8);
    lift.set(-8);
    lightX.set(x * 100);
    lightY.set(y * 100);
    lightOpacity.set(1);
  }

  function resetPortrait() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
    lightOpacity.set(0);
  }

  return (
    <section id="about" aria-labelledby="about-story-title" className={styles.section} ref={sectionRef}>
      <span id="about-story" className={styles.anchor} aria-hidden="true" />
      <div className={styles.atmosphere} aria-hidden="true">
        <motion.svg className={styles.contours} viewBox="0 0 1440 1000" fill="none" preserveAspectRatio="xMidYMid slice" style={{ y: reduced ? 0 : contourY }}>
          {[0, 1, 2, 3, 4, 5].map((line) => (
            <path key={line} transform={`translate(${line * 32} ${line * 24})`} d="M-320 700C-80 700 40 240 340 240S660 740 1000 740 1300 400 1540 400" />
          ))}
          <motion.path className={styles.activeContour} d="M-256 748C-16 748 104 288 404 288S724 788 1064 788 1364 448 1604 448" style={{ pathLength: reduced ? 1 : contourDraw }} />
        </motion.svg>
        <div className={styles.paperGrid} />
      </div>

      <div className={styles.content}>
        <div className={styles.composition}>
          <figure className={styles.portrait} onPointerMove={movePortrait} onPointerLeave={resetPortrait} onPointerCancel={resetPortrait}>
            <motion.div className={styles.portraitSurface} style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, y: reduced ? 0 : lift, transformPerspective: 1000 }}>
              <motion.div className={styles.photoWindow} style={{ clipPath: reduced ? "none" : portraitClip }}>
                <motion.div className={styles.photo} style={{ scale: reduced ? 1 : portraitScale }}>
                  <Image src={photoSrc} alt={photoAlt} fill sizes="(min-width: 1280px) 490px, (min-width: 768px) 42vw, 85vw" className={styles.image} />
                </motion.div>
                <span className={styles.photoShade} aria-hidden="true" />
                <span className={styles.photoSignature} aria-hidden="true">Mizanur Rahman</span>
                <motion.span className={styles.photoSheen} aria-hidden="true" style={{ background: sheen, opacity: reduced ? 0 : lightOpacity }} />
              </motion.div>
            </motion.div>
          </figure>

          <div className={styles.profile}>
            <h2 id="about-story-title" className={styles.title}>I like seeing<br />the whole picture.</h2>
            <div className={styles.copy}>
              <p>
                I&apos;m Mizanur, a Web Developer L2 at{" "}
                <Highlighter action="underline" color="hsl(var(--accent-strong))" iterations={1} isView>Programming Hero</Highlighter>.
                {" "}I build web applications end to end, connecting thoughtful interfaces with the APIs, databases, and systems behind them.
              </p>
              <p>
                My work spans backend engineering, system design, and code reviews. I care about clear architecture and maintainable code, so a product feels straightforward to use and stays practical to develop.
              </p>
              <p>
                I also build AI agents and{" "}
                <Highlighter action="underline" color="hsl(var(--accent-strong))" iterations={1} isView>useful automation</Highlighter>
                {" "}that take repetitive work off people&apos;s hands. Along the way, I&apos;ve shared what I learn with 2,500+ students.
              </p>
            </div>
            <a className={styles.exploreLink} href="#expertise">My engineering focus <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
