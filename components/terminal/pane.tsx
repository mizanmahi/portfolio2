"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import styles from "@/components/terminal/terminal-window.module.css";

export function Pane({ active, children, id, label, onFocus, onZoom, zoomed }: { active: boolean; children: ReactNode; id: number; label: string; onFocus: () => void; onZoom: () => void; zoomed: boolean }) {
  const paneRef = useRef<HTMLElement>(null);
  const updateSpotlight = (event: PointerEvent<HTMLElement>) => {
    const pane = paneRef.current;
    if (!pane) return;
    const bounds = pane.getBoundingClientRect();
    pane.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    pane.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  };
  return <section ref={paneRef} aria-label={`${label} terminal pane`} className={styles.pane} data-active={active} data-zoomed={zoomed} onClick={onFocus} onDoubleClick={onZoom} onPointerMove={updateSpotlight}>
    <header className={styles.paneHeader}><span>{id}:{label}</span><span>pane {id + 1}</span></header>
    <div className={styles.paneBody}>{children}</div>
  </section>;
}
