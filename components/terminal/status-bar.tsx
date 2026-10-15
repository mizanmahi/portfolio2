"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { terminalConfig, type TerminalTheme } from "@/src/terminal.config";
import styles from "@/components/terminal/terminal-window.module.css";

export function StatusBar({ activePane, focusPane, theme, setTheme }: { activePane: number; focusPane: (pane: number) => void; theme: TerminalTheme; setTheme: (theme: TerminalTheme) => void }) {
  const [clock, setClock] = useState("");
  useEffect(() => { const update = () => setClock(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date())); update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer); }, []);
  return <footer className={styles.statusbar}>
    <div className={styles.tabs} role="tablist">{["whoami", "about", "mentorship", "work"].map((label, index) => <button key={label} aria-selected={activePane === index} className={styles.tab} data-active={activePane === index} onClick={() => focusPane(index)} role="tab" type="button">{index}:{label}{activePane === index ? "*" : ""}</button>)}</div>
    <div className={styles.statusMeta}><span>{clock}</span><span className={styles.themeDots} aria-label="Terminal accent theme">{terminalConfig.themes.map((item) => <button key={item.name} aria-label={`Use ${item.name} accent`} className={styles.themeDot} data-active={theme.name === item.name} onClick={() => setTheme(item)} style={{ "--dot": item.hex } as CSSProperties} type="button" />)}</span></div>
  </footer>;
}
