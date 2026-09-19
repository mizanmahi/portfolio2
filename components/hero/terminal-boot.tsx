const bootLines = [
  { command: "$ whoami", output: "Mizanur Rahman" },
  {
    command: "$ cat role.txt",
    output: "Full-Stack Web Developer | Dhaka, Bangladesh",
  },
  { command: "$ ./load_profile.sh", output: "[██████████] profile loaded" },
];

export function TerminalBoot() {
  return (
    <section className="terminal" aria-label="Profile terminal">
      <header className="terminal-bar">
        <span className="terminal-indicator" aria-hidden="true" />
        <span className="terminal-file">profile.sh</span>
        <span className="terminal-state">Session active</span>
      </header>

      <div className="terminal-body" aria-live="polite" aria-atomic="true">
        <div className="terminal-output">
          {bootLines.map((line) => (
            <div className="terminal-entry" key={line.command}>
              <p className="terminal-command">{line.command}</p>
              <p className="terminal-result">{line.output}</p>
            </div>
          ))}
          <p className="terminal-idle">
            <span className="terminal-prompt">$</span>
            <span className="terminal-caret" aria-hidden="true" />
          </p>
        </div>

        <button className="terminal-skip" type="button" disabled>
          Skip boot
        </button>
      </div>
    </section>
  );
}
