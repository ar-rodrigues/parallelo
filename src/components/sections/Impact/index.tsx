import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import styles from "./Impact.module.css";

const CARD_KEYS = ["inspections", "points", "min", "max"] as const;

export async function Impact() {
  const t = await getTranslations("Impact");

  return (
    <Section id="impacto" variant="dark">
      <div className={styles.header}>
        <span className={`section-label ${styles.label}`}>{t("label")}</span>
        <h2 className={styles.title}>
          {t("titleBefore")}
          <br />
          <em>{t("titleHighlight")}</em>
        </h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </div>
      <div className={styles.grid}>
        {CARD_KEYS.map((key) => (
          <div key={key} className={styles.card}>
            <span className={styles.amount}>{t(`cards.${key}.amount`)}</span>
            <span className={styles.cardLabel}>{t(`cards.${key}.label`)}</span>
            {key === "inspections" && (
              <span className={styles.source}>{t("cards.inspections.source")}</span>
            )}
          </div>
        ))}
        <div className={`${styles.card} ${styles.cardWide}`}>
          <span className={styles.multiplierTitle}>{t("multiplier.title")}</span>
          <p className={styles.multiplierDesc}>{t("multiplier.desc")}</p>
        </div>
      </div>
      <blockquote className={styles.quoteBar}>
        &ldquo;{t("quote")}&rdquo;
      </blockquote>
    </Section>
  );
}
