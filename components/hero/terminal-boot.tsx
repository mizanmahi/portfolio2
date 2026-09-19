"use client";

import { useBootSequence } from "@/components/hero/boot-sequence-provider";
import { useRef, type PointerEvent } from "react";

const maximumTilt = 4;

export function TerminalBoot() {
  const { announcement, isComplete, lines, skip } = useBootSequence();
  const terminalRef = useRef<HTMLElement>(null);
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

  return (
    <div className="terminal-journey" data-complete={isComplete}>
      <section
        aria-label="Profile terminal"
        className={`terminal${isComplete ? "" : " terminal--booting"}`}
        onClick={isComplete ? undefined : skip}
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

          <div className="terminal-output" aria-hidden="true">
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
                  {line.output &&
                    (line.progress === undefined ? (
                      <p className="terminal-result">{line.output}</p>
                    ) : (
                      <p className="terminal-result terminal-progress">
                        {line.output} [
                        {Array.from({ length: 10 }, (_, segment) => {
                          const isFilled =
                            segment < Math.round((line.progress ?? 0) * 10);

                          return (
                            <span
                              className={`terminal-progress-cell${isFilled ? " terminal-progress-cell--filled" : ""}`}
                              key={segment}
                            >
                              {isFilled ? "█" : "░"}
                            </span>
                          );
                        })}
                        ]
                      </p>
                    ))}
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

          {!isComplete && (
            <button
              className="terminal-skip"
              onClick={(event) => {
                event.stopPropagation();
                skip();
              }}
              type="button"
            >
              Skip boot
            </button>
          )}
        </div>
      </section>
      {/* <p className="terminal-next" aria-hidden={!isComplete}>
        <span className="terminal-next-marker" aria-hidden="true" />
        Next: the bento dashboard for experience, projects, and skills.
      </p> */}
    </div>
  );
}
