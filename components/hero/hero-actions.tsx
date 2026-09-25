import { ArrowRight01Icon, Github01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import styles from "@/components/hero/hero-entrance.module.css";

export function HeroActions() {
  return (
    <div
      aria-label="Portfolio actions"
      className={styles.actions}
      role="group"
    >
      <a
        className={`${styles.action} ${styles.primaryAction}`}
        href="#projects"
      >
        View projects
        <HugeiconsIcon
          aria-hidden="true"
          className={styles.actionArrow}
          icon={ArrowRight01Icon}
          size="1em"
        />
      </a>
      <a
        className={`${styles.action} ${styles.secondaryAction}`}
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
