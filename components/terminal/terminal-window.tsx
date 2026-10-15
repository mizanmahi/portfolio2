"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Pane } from "@/components/terminal/pane";
import { Prompt } from "@/components/terminal/prompt";
import { StatusBar } from "@/components/terminal/status-bar";
import { useTerminal } from "@/components/terminal/use-terminal";
import { terminalConfig } from "@/src/terminal.config";
import styles from "@/components/terminal/terminal-window.module.css";

function useCountUp(target: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    if (reduced.matches) {
      frame = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frame);
    }
    frame = requestAnimationFrame(() => {
      const startedAt = performance.now();
      setValue(0);
      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / 1200, 1);
        setValue(Math.round(target * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

export function TerminalWindow() {
  const terminal = useTerminal();
  const count = useCountUp(terminalConfig.stats.mentorship);
  const focus = (pane: number) => terminal.focusPane(pane);
  const zoom = (pane: number) => { terminal.focusPane(pane); terminal.toggleZoom(pane); };
  const style = { "--accent": terminal.theme.hsl } as CSSProperties;

  return <section aria-label="Interactive portfolio terminal" className={styles.window} style={style}>
    <div className={styles.grid} data-zoomed={terminal.zoomedPane !== null}>
      <Pane active={terminal.activePane === 0} id={0} label="whoami" onFocus={() => focus(0)} onZoom={() => zoom(0)} zoomed={terminal.zoomedPane === 0}>
        <pre aria-hidden="true" className={styles.ascii}>{terminalConfig.asciiName}</pre>
        <p className={styles.command}><span>$</span> cat role.txt</p>
        <p>{terminalConfig.role}</p><p>{terminalConfig.location}</p>
        <Prompt inputRef={terminal.promptRef} onComplete={terminal.complete} onHistory={terminal.moveHistory} onRun={terminal.runCommand} onValueChange={terminal.setValue} outputs={terminal.outputs} value={terminal.value} />
      </Pane>

      <Pane active={terminal.activePane === 1} id={1} label="about" onFocus={() => focus(1)} onZoom={() => zoom(1)} zoomed={terminal.zoomedPane === 1}>
        <p className={styles.command}><span>$</span> cat about.md</p><p className={styles.bio}>{terminalConfig.bio}</p>
        <div className={styles.actions}><a className={styles.primaryAction} href={terminalConfig.links.experience}>Explore my experience <span aria-hidden="true">→</span></a><a className={styles.secondaryAction} href={terminalConfig.links.github} rel="noreferrer" target="_blank">GitHub</a></div>
      </Pane>

      <Pane active={terminal.activePane === 2} id={2} label="mentorship" onFocus={() => focus(2)} onZoom={() => zoom(2)} zoomed={terminal.zoomedPane === 2}>
        <p className={styles.command}><span>$</span> tail -n 1 mentorship.log</p><p className={styles.stat}>{count.toLocaleString()}<sup>+</sup></p><p>{terminalConfig.stats.caption}</p>
      </Pane>

      <Pane active={terminal.activePane === 3} id={3} label="work" onFocus={() => focus(3)} onZoom={() => zoom(3)} zoomed={terminal.zoomedPane === 3}>
        <p className={styles.command}><span>$</span> ls /selected-work</p>
        <ul className={styles.projects}>{terminalConfig.projects.map((project) => <li key={project.slug}><button onClick={(event) => { event.stopPropagation(); focus(0); terminal.runCommand(`cat ${project.slug}`); terminal.focusPrompt(); }} type="button">{project.slug}/</button></li>)}</ul>
      </Pane>
    </div>
    <StatusBar activePane={terminal.activePane} focusPane={focus} setTheme={terminal.setTheme} theme={terminal.theme} />
  </section>;
}
