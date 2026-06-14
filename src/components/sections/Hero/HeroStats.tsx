"use client";

import { useTranslations } from "next-intl";
import { useCountUp } from "@/hooks/useCountUp";
import styles from "./Hero.module.css";

const STAT_KEYS = ["experience", "services", "coverage"] as const;

function HeroStat({
  statKey,
}: {
  statKey: (typeof STAT_KEYS)[number];
}) {
  const t = useTranslations("Hero.stats");
  const value = Number(t(`${statKey}.value`));
  const suffix = t(`${statKey}.suffix`);
  const { ref, display } = useCountUp({ target: value, suffix, duration: 2500 });

  return (
    <div className={styles.stat}>
      <span ref={ref} className={styles.statValue}>
        {display}
      </span>
      <span className={styles.statLabel}>{t(`${statKey}.label`)}</span>
    </div>
  );
}

export function HeroStats() {
  return (
    <div className={styles.stats}>
      {STAT_KEYS.map((key) => (
        <HeroStat key={key} statKey={key} />
      ))}
    </div>
  );
}
