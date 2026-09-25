"use client";

import { useBootSequence } from "@/components/hero/boot-sequence-provider";
import styles from "@/components/hero/hero-entrance.module.css";

export function ScrollCue() {
  const { isComplete } = useBootSequence();

  return (
    <a
      className={styles.scrollCue}
      data-visible={isComplete}
      href="#projects"
    >
      <span>scroll↓</span>
      <span aria-hidden="true" className={styles.scrollCueCaret} />
    </a>
  );
}
