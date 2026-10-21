"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";

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
  const spotlightAnimationFrameRef = useRef<number | null>(null);
  const spotlightCurrentPositionRef = useRef<{ x: number; y: number } | null>(null);
  const spotlightTargetPositionRef = useRef<{ x: number; y: number } | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const animateSpotlight = () => {
    const frame = frameRef.current;
    const currentPosition = spotlightCurrentPositionRef.current;
    const targetPosition = spotlightTargetPositionRef.current;

    if (!frame || !currentPosition || !targetPosition) {
      spotlightAnimationFrameRef.current = null;
      return;
    }

    const followStrength = 0.16;
    currentPosition.x += (targetPosition.x - currentPosition.x) * followStrength;
    currentPosition.y += (targetPosition.y - currentPosition.y) * followStrength;

    frame.style.setProperty("--spotlight-x", `${currentPosition.x}px`);
    frame.style.setProperty("--spotlight-y", `${currentPosition.y}px`);

    if (
      Math.abs(targetPosition.x - currentPosition.x) > 0.5 ||
      Math.abs(targetPosition.y - currentPosition.y) > 0.5
    ) {
      spotlightAnimationFrameRef.current = window.requestAnimationFrame(animateSpotlight);
      return;
    }

    spotlightAnimationFrameRef.current = null;
  };

  useEffect(() => () => {
    if (spotlightAnimationFrameRef.current) {
      window.cancelAnimationFrame(spotlightAnimationFrameRef.current);
    }
  }, []);

  const updateSpotlight = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const frame = frameRef.current;
    if (!frame) return;

    const bounds = frame.getBoundingClientRect();
    const nextPosition = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };

    if (!spotlightCurrentPositionRef.current) {
      spotlightCurrentPositionRef.current = {
        x: bounds.width / 2,
        y: bounds.height / 2,
      };
    }

    spotlightTargetPositionRef.current = nextPosition;
    setSpotlightState(frame, 1);

    if (!spotlightAnimationFrameRef.current) {
      spotlightAnimationFrameRef.current = window.requestAnimationFrame(animateSpotlight);
    }
  };

  const clearSpotlight = () => {
    const frame = frameRef.current;
    if (frame) setSpotlightState(frame, 0);
    spotlightTargetPositionRef.current = null;
    spotlightCurrentPositionRef.current = null;

    if (spotlightAnimationFrameRef.current) {
      window.cancelAnimationFrame(spotlightAnimationFrameRef.current);
      spotlightAnimationFrameRef.current = null;
    }
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
          "--spotlight-x": "50%",
          "--spotlight-y": "50%",
        } as CSSProperties
      }
    >
      <figcaption className={styles.header}>
        <span aria-hidden="true" className={styles.indicator} />
        <span className={styles.filename}>profile.jpg</span>
        <span className={styles.status}>Mizanur Rahman</span>
      </figcaption>

      <div className={styles.imageArea}>
        <Image alt={alt} className={styles.baseImage} fill sizes="(min-width: 64rem) 40vw, 100vw" src={src} />
        <span aria-hidden="true" className={styles.duotone} />
        <span aria-hidden="true" className={styles.vignette} />
        <Image alt="" aria-hidden="true" className={styles.colorImage} fill sizes="(min-width: 64rem) 40vw, 100vw" src={src} />
        <span aria-hidden="true" className={styles.scanlines} />
        <span aria-hidden="true" className={styles.spotlightRing} />
        <span aria-hidden="true" className={styles.beam} />
      </div>
    </figure>
  );
}
