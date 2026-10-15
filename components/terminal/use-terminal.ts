"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createCommandRegistry, terminalCommandNames, terminalConfig, type TerminalTheme } from "@/src/terminal.config";

export type TerminalOutput = { id: number; input: string; result: ReactNode };

const isEditable = (target: EventTarget | null) =>
  target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || (target instanceof HTMLElement && target.isContentEditable);

export function useTerminal() {
  const promptRef = useRef<HTMLInputElement>(null);
  const [activePane, setActivePane] = useState(0);
  const [zoomedPane, setZoomedPane] = useState<number | null>(null);
  const [theme, setTheme] = useState<TerminalTheme>(terminalConfig.themes[0]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [outputs, setOutputs] = useState<TerminalOutput[]>([]);
  const [value, setValue] = useState("");

  const focusPrompt = useCallback(() => promptRef.current?.focus(), []);
  const focusPane = useCallback((pane: number) => {
    setActivePane(pane);
    // Click events precede double-click; preserve this pane's zoom for the toggle.
    setZoomedPane((current) => current === pane ? current : null);
  }, []);
  const toggleZoom = useCallback((pane = activePane) => setZoomedPane((current) => current === pane ? null : pane), [activePane]);
  const clearOutput = useCallback(() => setOutputs([]), []);

  const runCommand = useCallback((rawValue: string) => {
    const normalized = rawValue.trim();
    if (!normalized) return;
    const [first, ...args] = normalized.split(/\s+/);
    const command = createCommandRegistry({ clearOutput, focusPane, focusPrompt, setTheme, toggleZoom })[first.toLowerCase()];
    const result = command ? command(args) : "command not found, try help";
    setHistory((current) => [...current, normalized]);
    setHistoryIndex(null);
    setValue("");
    if (result !== null) setOutputs((current) => [...current, { id: Date.now(), input: normalized, result }]);
  }, [clearOutput, focusPane, focusPrompt, toggleZoom]);

  const complete = useCallback(() => {
    const [first, ...args] = value.trim().split(/\s+/);
    if (!first) return;
    const options = first === "cat" ? ["links.txt", ...terminalConfig.projects.map((project) => project.slug)] : first === "theme" ? terminalConfig.themes.map((theme) => theme.name) : terminalCommandNames;
    const current = args.length ? args[args.length - 1] : first;
    const match = options.find((option) => option.startsWith(current));
    if (!match) return;
    setValue(first === "cat" || first === "theme" ? `${first} ${match}` : match);
  }, [value]);

  const moveHistory = useCallback((direction: -1 | 1) => {
    if (!history.length) return;
    const next = direction === -1 ? Math.max(0, (historyIndex ?? history.length) - 1) : Math.min(history.length, (historyIndex ?? history.length) + 1);
    setHistoryIndex(next === history.length ? null : next);
    setValue(next === history.length ? "" : history[next]);
  }, [history, historyIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditable(event.target)) return;
      if (event.key >= "1" && event.key <= "4") { event.preventDefault(); focusPane(Number(event.key) - 1); return; }
      if (event.key === "z") { event.preventDefault(); toggleZoom(); return; }
      if (event.key === "Escape") { setZoomedPane(null); return; }
      if (event.key === "`" || event.key === "/") { event.preventDefault(); focusPrompt(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focusPane, focusPrompt, toggleZoom]);

  return { activePane, complete, focusPane, focusPrompt, history, moveHistory, outputs, promptRef, runCommand, setTheme, setValue, theme, toggleZoom, value, zoomedPane };
}
