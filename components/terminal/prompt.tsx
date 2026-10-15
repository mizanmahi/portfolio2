"use client";

import { type KeyboardEvent, type RefObject } from "react";
import { type TerminalOutput } from "@/components/terminal/use-terminal";
import styles from "@/components/terminal/terminal-window.module.css";

export function Prompt({ inputRef, onComplete, onHistory, onRun, onValueChange, outputs, value }: { inputRef: RefObject<HTMLInputElement | null>; onComplete: () => void; onHistory: (direction: -1 | 1) => void; onRun: (value: string) => void; onValueChange: (value: string) => void; outputs: TerminalOutput[]; value: string }) {
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") { event.preventDefault(); onRun(value); }
    if (event.key === "ArrowUp") { event.preventDefault(); onHistory(-1); }
    if (event.key === "ArrowDown") { event.preventDefault(); onHistory(1); }
    if (event.key === "Tab") { event.preventDefault(); onComplete(); }
  };
  return <div className={styles.promptShell}>
    <div aria-live="polite" className={styles.promptOutput}>{outputs.map((output) => <div className={styles.outputLine} key={output.id}><span><b>$</b> {output.input}</span><span>{output.result}</span></div>)}</div>
    <label className={styles.promptLine}><span aria-hidden="true">$</span><input ref={inputRef} aria-label="Terminal command prompt" autoComplete="off" onChange={(event) => onValueChange(event.target.value)} onKeyDown={onKeyDown} spellCheck="false" value={value} /></label>
  </div>;
}
