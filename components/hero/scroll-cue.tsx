"use client";

import { useBootSequence } from "@/components/hero/boot-sequence-provider";

export function ScrollCue() {
  const { isComplete } = useBootSequence();

  return (
    <a
      className="scroll-cue"
      data-visible={isComplete}
      href="#projects"
    >
      <span>scroll↓</span>
      <span aria-hidden="true" className="scroll-cue-caret" />
    </a>
  );
}
