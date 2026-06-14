import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import styles from "./Impact.module.css";

const CARD_KEYS = ["inspections", "points", "min", "max"] as const;

export async function Impact() {
  const t = await getTranslations("Impact");

  return (
    <Section id="impacto" variant="dark">
      <Reveal className={styles.header}>
        <span className={`section-label ${styles.label}`}>{t("label")}</span>
        <h2 className={styles.title}>
          {t("titleBefore")}
          <br />
          <em>{t("titleHighlight")}</em>
        </h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </Reveal>
      <div className={styles.grid}>
        {CARD_KEYS.map((key, index) => (
          <Reveal key={key} className={styles.card} delay={index * 80}>
            <span className={styles.amount}>{t(`cards.${key}.amount`)}</span>
            <span className={styles.cardLabel}>{t(`cards.${key}.label`)}</span>
            {key === "inspections" && (
              <span className={styles.source}>{t("cards.inspections.source")}</span>
            )}
          </Reveal>
        ))}
        <Reveal className={`${styles.card} ${styles.cardWide}`} delay={320}>
          <span className={styles.multiplierTitle}>{t("multiplier.title")}</span>
          <p className={styles.multiplierDesc}>{t("multiplier.desc")}</p>
        </Reveal>
      </div>
      <Reveal delay={400}>
        <blockquote className={styles.quoteBar}>
          &ldquo;{t("quote")}&rdquo;
        </blockquote>
      </Reveal>
    </Section>
  );
}
