"use client";

import { ChevronDownIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function ScrollCue({ isVisible }: { isVisible: boolean }) {
  return (
    <a
      aria-hidden={!isVisible}
      className="scroll-cue"
      data-visible={isVisible}
      href="#projects"
      tabIndex={isVisible ? undefined : -1}
    >
      <span>Scroll to explore</span>
      <HugeiconsIcon aria-hidden="true" className="scroll-cue-icon" icon={ChevronDownIcon} size="1em" />
    </a>
  );
}
