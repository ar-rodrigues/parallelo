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
  const { ref, display } = useCountUp({ target: value, suffix });

  return (
    <div className={styles.stat}>
      <span ref={ref} className={styles.statValue}>
        {display}
      </span>
      <span className={styles.statLabel}>{t(`${statKey}.label`)}</span>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className={styles.hero}>
      <div className={styles.accentLine} aria-hidden="true" />
      <div className={styles.gridTexture} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.tag}>{t("tag")}</span>
          <h1 className={styles.title}>
            {t("titleBefore")}
            <em>{t("titleHighlight")}</em>
            {t("titleAfter")}
          </h1>
          <p className={styles.subtitle}>{t("subtitle")}</p>
          <div className={styles.actions}>
            <a href="#contacto" className="btn-primary">
              {t("ctaPrimary")}
            </a>
            <a href="#servicios" className="btn-secondary">
              {t("ctaSecondary")}
            </a>
          </div>
          <p className={styles.micro}>
            {t("micro.coverage")}
            <span aria-hidden="true">·</span>
            {t("micro.hq")}
            <span aria-hidden="true">·</span>
            {t("micro.sectors")}
          </p>
          <div className={styles.stats}>
            {STAT_KEYS.map((key) => (
              <HeroStat key={key} statKey={key} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
