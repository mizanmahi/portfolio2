"use client";

import { useBootSequence } from "@/components/hero/boot-sequence-provider";
import { Glitch, supportsHtmlInCanvas } from "@/components/canvasui/Glitch";
import { TerminalWebGlGlitch } from "@/components/hero/terminal-webgl-glitch";
import styles from "@/components/hero/terminal-boot.module.css";
import { useEffect, useRef, useState, type PointerEvent } from "react";

const maximumTilt = 4;
const programmingHeroRole = "Full-Stack Web Developer L2 @ Programming Hero, Dhaka, Bangladesh";
const projectDirectory = "edulavo/  phitron/  programming-hero/  next-level/  mentora/  solruf/  scroll down to explore →";

function TerminalResult({
  command,
  isComplete,
  output,
}: {
  command: string;
  isComplete: boolean;
  output: string;
}) {
  if (command === "cat role.txt" && output === programmingHeroRole) {
    return (
      <p className={styles.result}>
        Full-Stack Web Developer L2 @{" "}
        <span className={styles.resultHighlight}>Programming Hero</span>, Dhaka, Bangladesh
      </p>
    );
  }

  if (command === "ls ./projects" && output === projectDirectory && isComplete) {
    return (
      <p className={`${styles.result} ${styles.projects}`}>
        <a className={styles.projectLink} href="https://www.edulavo.com/" rel="noreferrer" target="_blank">edulavo/</a>{"  "}
        <a className={styles.projectLink} href="https://phitron.io/" rel="noreferrer" target="_blank">phitron/</a>{"  "}
        <a className={styles.projectLink} href="https://web.programming-hero.com/home" rel="noreferrer" target="_blank">programming-hero/</a>{"  "}
        <a className={styles.projectLink} href="https://next.programming-hero.com/" rel="noreferrer" target="_blank">next-level/</a>{"  "}
        mentora/{"  "}solruf/{"  "}scroll down to explore →
      </p>
    );
  }

  return <p className={styles.result}>{output}</p>;
}

export function TerminalBoot() {
  const { announcement, isComplete, lines } = useBootSequence();
  const terminalRef = useRef<HTMLElement>(null);
  const [supportsNativeGlitch, setSupportsNativeGlitch] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSupportsNativeGlitch(supportsHtmlInCanvas());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const showIdlePrompt =
    isComplete ||
    lines.some(
      (line, index) =>
        Boolean(line.output) &&
        (index === lines.length - 1 || !lines[index + 1].command),
    );
  const activeCommandIndex = lines.findIndex(
    (line) => Boolean(line.command) && !line.output,
  );

  const resetParallax = () => {
    const terminal = terminalRef.current;

    terminal?.style.setProperty("--terminal-tilt-x", "0deg");
    terminal?.style.setProperty("--terminal-tilt-y", "0deg");
  };

  const updateParallax = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const terminal = terminalRef.current;
    if (!terminal) return;

    const bounds = terminal.getBoundingClientRect();
    const horizontalPosition = (event.clientX - bounds.left) / bounds.width - 0.5;
    const verticalPosition = (event.clientY - bounds.top) / bounds.height - 0.5;

    terminal.style.setProperty(
      "--terminal-tilt-x",
      `${verticalPosition * maximumTilt * -1}deg`,
    );
    terminal.style.setProperty(
      "--terminal-tilt-y",
      `${horizontalPosition * maximumTilt}deg`,
    );
  };

  const terminal = (
    <section
      aria-label="Profile terminal"
      className={styles.terminal}
      onPointerLeave={resetParallax}
      onPointerMove={updateParallax}
      ref={terminalRef}
    >
      <header className={styles.bar}>
        <span className={styles.indicator} aria-hidden="true" />
        <span className={styles.file}>profile.sh</span>
        <span className={styles.state}>
          {isComplete ? "Session active" : "Booting"}
        </span>
      </header>

      <div className={styles.body}>
        <p className="sr-only" role="status" aria-atomic="true">
          {announcement}
        </p>

        <div className={styles.output} aria-hidden={!isComplete}>
          {lines.map((line, index) =>
            line.command || line.output ? (
              <div className={styles.entry} key={index}>
                {line.command && (
                  <p className={styles.command}>
                    <span
                      className={`${styles.prompt}${index === activeCommandIndex ? "" : ` ${styles.inactivePrompt}`}`}
                    >
                      $
                    </span>{" "}
                    {line.command}
                  </p>
                )}
                {line.output && (
                  <TerminalResult
                    command={line.command}
                    isComplete={isComplete}
                    output={line.output}
                  />
                )}
              </div>
            ) : null,
          )}
          {showIdlePrompt && (
            <p className={styles.idle}>
              <span className={styles.prompt}>$</span>
              <span className={styles.caret} aria-hidden="true" />
            </p>
          )}
        </div>
      </div>
    </section>
  );

  return (
    <div className={styles.journey} data-complete={isComplete}>
      {supportsNativeGlitch ? (
        <Glitch
          blocks={0.5}
          className={styles.glitch}
          duration={0.4}
          intensity={1}
          interval={5}
          noise={0.35}
          rgbShift={4}
          shift={30}
          slices={24}
        >
          {terminal}
        </Glitch>
      ) : (
        <TerminalWebGlGlitch
          blocks={0.5}
          className={styles.glitch}
          duration={0.4}
          intensity={1}
          interval={5}
          noise={0.35}
          rgbShift={4}
          shift={30}
          slices={24}
        >
          {terminal}
        </TerminalWebGlGlitch>
      )}
    </div>
  );
}
