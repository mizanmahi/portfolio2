"use client";

import { useTerminalBoot } from "@/hooks/use-terminal-boot";

export function TerminalBoot() {
  const { announcement, isComplete, lines, skip } = useTerminalBoot();
  const showIdlePrompt =
    isComplete ||
    lines.some(
      (line, index) =>
        Boolean(line.output) &&
        (index === lines.length - 1 || !lines[index + 1].command),
    );

  return (
    <div className="terminal-journey" data-complete={isComplete}>
      <section
        aria-label="Profile terminal"
        className={`terminal${isComplete ? "" : " terminal--booting"}`}
        onClick={isComplete ? undefined : skip}
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
                      <span className="terminal-prompt">$</span> {line.command}
                    </p>
                  )}
                  {line.output && <p className="terminal-result">{line.output}</p>}
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

      <p className="terminal-next" aria-hidden={!isComplete}>
        <span className="terminal-next-marker" aria-hidden="true" />
        Next: the bento dashboard for experience, projects, and skills.
      </p>
    </div>
  );
}
