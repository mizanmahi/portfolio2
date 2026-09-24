"use client";

import { useCallback, useEffect, useState } from "react";

export type TerminalLine = {
  command: string;
  output: string;
};

const bootLines: TerminalLine[] = [
  {
    command: "whoami",
    output: "Mizanur Rahman",
  },
  {
    command: "cat role.txt",
    output: "Full-Stack Web Developer L2 @ Programming Hero, Dhaka, Bangladesh",
  },
  {
    command: "cat mentorship.log",
    output: "2,500+ developers mentored and placed worldwide",
  },
  {
    command: "ls ./projects",
    output: "edulavo/  phitron/  programming-hero/  next-level/  mentora/  solruf/  scroll down to explore →",
  },
];

const emptyLines = (): TerminalLine[] =>
  bootLines.map(() => ({
    command: "",
    output: "",
  }));
const finalLines = (): TerminalLine[] => bootLines.map((line) => ({ ...line }));
const pause = (duration: number) => new Promise<void>((resolve) => window.setTimeout(resolve, duration));

const characterDelay = (character: string) => {
  const baseDelay = 28 + Math.random() * 52;
  if (/[./|]/.test(character)) return baseDelay + 88;
  if (character === " ") return baseDelay * 0.7;
  return baseDelay;
};

export function useTerminalBoot(shouldStart: boolean) {
  const [lines, setLines] = useState<TerminalLine[]>(emptyLines);
  const [announcement, setAnnouncement] = useState("Preparing profile terminal.");
  const [isComplete, setIsComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const finish = useCallback(() => {
    setLines(finalLines());
    setAnnouncement("Profile terminal ready.");
    setIsComplete(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (isComplete) return;
    if (!shouldStart) return;
    if (prefersReducedMotion) {
      const completeImmediately = window.setTimeout(finish, 0);
      return () => window.clearTimeout(completeImmediately);
    }

    let cancelled = false;
    const updateLine = (lineIndex: number, update: Partial<TerminalLine>) => {
      setLines((currentLines) => currentLines.map((line, index) => index === lineIndex ? { ...line, ...update } : line));
    };
    const typeText = async (lineIndex: number, field: keyof TerminalLine, text: string) => {
      for (let index = 1; index <= text.length; index += 1) {
        await pause(characterDelay(text[index - 1]));
        if (cancelled) return false;
        updateLine(lineIndex, { [field]: text.slice(0, index) });
      }
      return true;
    };
    const runBootSequence = async () => {
      await pause(420);
      for (let lineIndex = 0; lineIndex < bootLines.length; lineIndex += 1) {
        const line = bootLines[lineIndex];
        const commandTyped = await typeText(lineIndex, "command", line.command);
        if (!commandTyped || cancelled) return;
        await pause(180 + Math.random() * 220);
        const outputTyped = await typeText(lineIndex, "output", line.output);
        if (!outputTyped || cancelled) return;
        setAnnouncement(line.output);
        await pause(340 + Math.random() * 360);
      }
      if (!cancelled) finish();
    };
    void runBootSequence();
    return () => { cancelled = true; };
  }, [finish, isComplete, prefersReducedMotion, shouldStart]);

  return { announcement, isComplete, lines };
}
