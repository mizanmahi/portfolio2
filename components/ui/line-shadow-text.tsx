"use client";

import { type CSSProperties, type HTMLAttributes } from "react";
import {
  motion,
  type DOMMotionComponents,
  type MotionProps,
} from "motion/react";

import { cn } from "@/lib/utils";

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementType = Extract<
  keyof DOMMotionComponents,
  keyof typeof motionElements
>

interface LineShadowTextProps
  extends Omit<HTMLAttributes<HTMLElement>, keyof MotionProps>, MotionProps {
  children: string;
  shadowColor?: string;
  shadowClassName?: string;
  shadowTextClassName?: string;
  as?: MotionElementType;
}

export function LineShadowText({
  children,
  shadowColor = "black",
  className,
  shadowClassName,
  shadowTextClassName,
  as: Component = "span",
  ...props
}: LineShadowTextProps) {
  const MotionComponent = motionElements[Component];

  return (
    <MotionComponent
      className={cn("relative inline-grid", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0", shadowClassName)}
        style={{ color: shadowColor } as CSSProperties}
      >
        <span className={shadowTextClassName}>{children}</span>
      </span>
      <span className="relative z-10">{children}</span>
    </MotionComponent>
  );
}
