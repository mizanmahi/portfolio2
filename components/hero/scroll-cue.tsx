"use client";

import { useBootSequence } from "@/components/hero/boot-sequence-provider";

export function ScrollCue() {
  const { isComplete } = useBootSequence();

  return (
    <a
      aria-hidden={!isComplete}
      className="scroll-cue"
      data-visible={isComplete}
      href="#projects"
      tabIndex={isComplete ? undefined : -1}
    >
      <span>scroll↓</span>
      <span aria-hidden="true" className="scroll-cue-caret" />
    </a>
  );
}
