"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useTerminalBoot } from "@/hooks/use-terminal-boot";

type BootSequenceContextValue = ReturnType<typeof useTerminalBoot>;

const BootSequenceContext = createContext<BootSequenceContextValue | null>(null);

export function BootSequenceProvider({ children }: { children: ReactNode }) {
  const bootSequence = useTerminalBoot();

  return (
    <BootSequenceContext.Provider value={bootSequence}>
      {children}
    </BootSequenceContext.Provider>
  );
}

export function useBootSequence() {
  const context = useContext(BootSequenceContext);

  if (!context) {
    throw new Error("useBootSequence must be used within BootSequenceProvider.");
  }

  return context;
}
