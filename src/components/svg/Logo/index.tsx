export interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const fill = variant === "light" ? "#ffffff" : "#1a1a1a";
  const accent = "#3cab3f";

  return (
    <svg
      className={className}
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Parallelo"
      role="img"
    >
      <rect x="0" y="8" width="6" height="24" fill={accent} />
      <rect x="10" y="8" width="6" height="24" fill={accent} opacity="0.7" />
      <rect x="20" y="8" width="6" height="24" fill={accent} opacity="0.45" />
      <text
        x="36"
        y="28"
        fill={fill}
        fontFamily="Barlow Condensed, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="0.02em"
      >
        PARALLELO
      </text>
    </svg>
  );
}
