"use client";

import { ArrowRight01Icon, Github01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useBootSequence } from "@/components/hero/boot-sequence-provider";

export function HeroActions() {
  const { isComplete } = useBootSequence();

  return (
    <div
      aria-hidden={!isComplete}
      aria-label="Portfolio actions"
      className="hero-actions"
      data-complete={isComplete}
      role="group"
    >
      <a
        className="hero-action hero-action--primary"
        href="#projects"
        tabIndex={isComplete ? undefined : -1}
      >
        View projects
        <HugeiconsIcon
          aria-hidden="true"
          className="hero-action-arrow"
          icon={ArrowRight01Icon}
          size="1em"
        />
      </a>
      <a
        className="hero-action hero-action--secondary"
        href="https://github.com/mizanmahi"
        rel="noreferrer"
        tabIndex={isComplete ? undefined : -1}
        target="_blank"
      >
        <HugeiconsIcon aria-hidden="true" icon={Github01Icon} size="1em" />
        GitHub
      </a>
    </div>
  );
}
