"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useRef, type CSSProperties, type PointerEvent } from "react";

import styles from "@/components/about/photo-frame.module.css";

export type PhotoFrameProps = {
  alt: string;
  isRevealed?: boolean;
  src: string;
};

const setSpotlightState = (element: HTMLDivElement, opacity: number) => {
  element.style.setProperty("--spotlight-opacity", String(opacity));
};

export function PhotoFrame({ alt, isRevealed = false, src }: PhotoFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const updateSpotlight = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const frame = frameRef.current;
    if (!frame) return;

    const bounds = frame.getBoundingClientRect();
    const horizontalPosition = ((event.clientX - bounds.left) / bounds.width) * 100;
    const verticalPosition = ((event.clientY - bounds.top) / bounds.height) * 100;

    frame.style.setProperty("--spotlight-x", `${horizontalPosition}%`);
    frame.style.setProperty("--spotlight-y", `${verticalPosition}%`);
    setSpotlightState(frame, 1);
  };

  const clearSpotlight = () => {
    const frame = frameRef.current;
    if (frame) setSpotlightState(frame, 0);
  };

  return (
    <figure
      className={styles.frame}
      data-reduced-motion={prefersReducedMotion}
      data-revealed={isRevealed}
      onPointerLeave={clearSpotlight}
      onPointerMove={updateSpotlight}
      ref={frameRef}
      style={
        {
          "--spotlight-opacity": 0,
          "--spotlight-radius": "22%",
          "--spotlight-x": "50%",
          "--spotlight-y": "50%",
        } as CSSProperties
      }
    >
      <figcaption className={styles.header}>
        <span aria-hidden="true" className={styles.indicator} />
        <span className={styles.filename}>profile.jpg</span>
        <span className={styles.status}>Session active</span>
      </figcaption>

      <div className={styles.imageArea}>
        <Image alt={alt} className={styles.baseImage} fill sizes="(min-width: 64rem) 40vw, 100vw" src={src} />
        <Image alt="" aria-hidden="true" className={styles.colorImage} fill sizes="(min-width: 64rem) 40vw, 100vw" src={src} />
        <span aria-hidden="true" className={styles.scanlines} />
        <span aria-hidden="true" className={styles.vignette} />
        <span aria-hidden="true" className={styles.spotlightRing} />
        <span aria-hidden="true" className={styles.beam} />
      </div>
    </figure>
  );
}
