import type { ReactNode } from "react";
import styles from "./Section.module.css";

export interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "alt" | "dark" | "green" | "light";
  fullWidth?: boolean;
}

export function Section({
  children,
  className = "",
  id,
  variant = "default",
  fullWidth = false,
}: SectionProps) {
  const sectionClass = [
    styles.section,
    variant !== "default" ? styles[variant] : "",
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={sectionClass}>
      <div className={fullWidth ? undefined : styles.container}>{children}</div>
    </section>
  );
}
