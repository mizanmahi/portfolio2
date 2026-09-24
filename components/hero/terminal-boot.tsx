"use client";

import { useBootSequence } from "@/components/hero/boot-sequence-provider";
import { Glitch, supportsHtmlInCanvas } from "@/components/canvasui/Glitch";
import { TerminalWebGlGlitch } from "@/components/hero/terminal-webgl-glitch";
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
      <p className="terminal-result">
        Full-Stack Web Developer L2 @{" "}
        <span className="terminal-result-highlight">Programming Hero</span>, Dhaka, Bangladesh
      </p>
    );
  }

  if (command === "ls ./projects" && output === projectDirectory && isComplete) {
    return (
      <p className="terminal-result terminal-projects">
        <a className="terminal-project-link" href="https://www.edulavo.com/" rel="noreferrer" target="_blank">edulavo/</a>{"  "}
        <a className="terminal-project-link" href="https://phitron.io/" rel="noreferrer" target="_blank">phitron/</a>{"  "}
        <a className="terminal-project-link" href="https://web.programming-hero.com/home" rel="noreferrer" target="_blank">programming-hero/</a>{"  "}
        <a className="terminal-project-link" href="https://next.programming-hero.com/" rel="noreferrer" target="_blank">next-level/</a>{"  "}
        mentora/{"  "}solruf/{"  "}scroll down to explore →
      </p>
    );
  }

  return <p className="terminal-result">{output}</p>;
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
      className="terminal"
      onPointerLeave={resetParallax}
      onPointerMove={updateParallax}
      ref={terminalRef}
    >
      <header className="terminal-bar">
        <span className="terminal-indicator" aria-hidden="true" />
        <span className="terminal-file">profile.sh</span>
        <span className="terminal-state">
          {isComplete ? "Session active" : "Booting"}
        </span>
      </header>

      <div className="terminal-body">
        <p className="sr-only" role="status" aria-atomic="true">
          {announcement}
        </p>

        <div className="terminal-output" aria-hidden={!isComplete}>
          {lines.map((line, index) =>
            line.command || line.output ? (
              <div className="terminal-entry" key={index}>
                {line.command && (
                  <p className="terminal-command">
                    <span
                      className={`terminal-prompt${index === activeCommandIndex ? "" : " terminal-prompt--inactive"}`}
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
            <p className="terminal-idle">
              <span className="terminal-prompt">$</span>
              <span className="terminal-caret" aria-hidden="true" />
            </p>
          )}
        </div>
      </div>
    </section>
  );

  return (
    <div className="terminal-journey" data-complete={isComplete}>
      {supportsNativeGlitch ? (
        <Glitch
          blocks={0.5}
          className="terminal-glitch"
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
          className="terminal-glitch"
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
      {/* <p className="terminal-next" aria-hidden={!isComplete}>
        <span className="terminal-next-marker" aria-hidden="true" />
        Next: the bento dashboard for experience, projects, and skills.
      </p> */}
    </div>
  );
}
