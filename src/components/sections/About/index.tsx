import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import styles from "./About.module.css";

const METRIC_KEYS = ["years", "services", "coverage", "hq"] as const;

export async function About() {
  const t = await getTranslations("About");

  return (
    <Section id="nosotros" variant="default">
      <div className={styles.layout}>
        <div className={styles.text}>
          <span className="section-label">{t("label")}</span>
          <h2 className={styles.title}>
            {t("titleBefore")}
            <em>{t("titleHighlight")}</em>
            {t("titleAfter")}
          </h2>
          <p className={styles.paragraph}>{t("paragraph1")}</p>
          <p className={styles.paragraph}>{t("paragraph2")}</p>
          <blockquote className={styles.quote}>
            &ldquo;{t("quote")}&rdquo;
          </blockquote>
        </div>
        <div className={styles.visual}>
          {METRIC_KEYS.map((key, index) => (
            <div key={key}>
              {index > 0 && <div className={styles.divider} aria-hidden="true" />}
              <div className={styles.metric}>
                <span className={styles.metricValue}>
                  {t(`metrics.${key}.display`)}
                </span>
                <span className={styles.metricLabel}>
                  {t(`metrics.${key}.label`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
