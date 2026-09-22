import { ArrowRight01Icon, Github01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function HeroActions() {
  return (
    <div
      aria-label="Portfolio actions"
      className="hero-actions"
      role="group"
    >
      <a
        className="hero-action hero-action--primary"
        href="#projects"
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
        target="_blank"
      >
        <HugeiconsIcon aria-hidden="true" icon={Github01Icon} size="1em" />
        GitHub
      </a>
    </div>
  );
}
