import styles from "./SectionHeading.module.css";

export interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  variant?: "default" | "light" | "center";
}

export function SectionHeading({
  label,
  title,
  subtitle,
  className = "",
  variant = "default",
}: SectionHeadingProps) {
  const wrapperClass = [
    styles.wrapper,
    variant === "light" ? styles.light : "",
    variant === "center" ? styles.center : styles.left,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClass}>
      {label && <span className="section-label">{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
