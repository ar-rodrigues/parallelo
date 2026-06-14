"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./Reveal.module.css";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade-up" | "fade-in";
  staggerChildren?: boolean;
  as?: ElementType;
  style?: CSSProperties;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
  staggerChildren = false,
  as: Component = "div",
  style,
}: RevealProps) {
  const { ref, isInView } = useInView();
  const variantClass = variant === "fade-in" ? styles.fadeIn : styles.fadeUp;

  const revealClass = [
    staggerChildren ? styles.staggerHost : styles.reveal,
    !staggerChildren ? variantClass : "",
    isInView ? styles.visible : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      ref={ref}
      className={revealClass}
      style={{
        ...style,
        ...(staggerChildren
          ? ({ "--reveal-base-delay": `${delay}ms` } as CSSProperties)
          : { transitionDelay: `${delay}ms` }),
      }}
    >
      {children}
    </Component>
  );
}
