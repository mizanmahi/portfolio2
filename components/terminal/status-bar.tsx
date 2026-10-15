"use client";

import { useEffect, useState } from "react";
import { terminalConfig, type TerminalTheme } from "@/src/terminal.config";
import styles from "@/components/terminal/terminal-window.module.css";

export function StatusBar({ activePane, focusPane, theme, setTheme }: { activePane: number; focusPane: (pane: number) => void; theme: TerminalTheme; setTheme: (theme: TerminalTheme) => void }) {
  const [clock, setClock] = useState("");
  useEffect(() => { const update = () => setClock(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date())); update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer); }, []);
  return <footer className={styles.statusbar}>
    <div className={styles.tabs} role="tablist">{["me", "about", "mentorship", "projects"].map((label, index) => <button key={label} aria-selected={activePane === index} className={styles.tab} data-active={activePane === index} onClick={() => focusPane(index)} role="tab" type="button">{index}:{label}{activePane === index ? "*" : ""}</button>)}</div>
    <div className={styles.statusMeta}>
      <span className={styles.clock}>{clock}</span>
      <div className={styles.themePicker} role="group" aria-label="Terminal accent theme">
        {terminalConfig.themes.map((item) => <button
          key={item.name}
          aria-label={`Use ${item.name} accent`}
          aria-pressed={theme.name === item.name}
          className={styles.themeOption}
          onClick={() => setTheme(item)}
          title={`${item.name === "amber" ? "Amber" : "Mono"} terminal accent`}
          type="button"
        >
          <svg className={styles.themeIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {item.name === "amber" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" stroke="none" /></>}
          </svg>
          <span>{item.name}</span>
        </button>)}
      </div>
    </div>
  </footer>;
}
