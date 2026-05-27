import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import styles from "./Team.module.css";

const DIFF_KEYS = ["0", "1", "2", "3", "4", "5"] as const;
const MEMBER_KEYS = ["dinorah", "ezequiel"] as const;
const TAG_COUNT = 4;

export async function Team() {
  const t = await getTranslations("Team");

  return (
    <Section id="equipo" variant="dark">
      <span className={`section-label ${styles.label}`}>{t("label")}</span>
      <h2 className={styles.title}>{t("title")}</h2>
      <p className={styles.subtitle}>{t("subtitle")}</p>
      <div className={styles.diffGrid}>
        {DIFF_KEYS.map((key) => (
          <div key={key} className={styles.diffItem}>
            <span className={styles.diffNum}>{t(`diffs.${key}.num`)}</span>
            <div>
              <h3 className={styles.diffTitle}>{t(`diffs.${key}.title`)}</h3>
              <p className={styles.diffBody}>{t(`diffs.${key}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className={styles.teamHeading}>{t("teamHeading")}</h3>
      <div className={styles.teamGrid}>
        {MEMBER_KEYS.map((key) => (
          <div key={key} className={styles.memberCard}>
            <div className={styles.initials} aria-hidden="true">
              {t(`members.${key}.initials`)}
            </div>
            <div>
              <h4 className={styles.memberName}>{t(`members.${key}.name`)}</h4>
              <p className={styles.memberRole}>{t(`members.${key}.role`)}</p>
              <div className={styles.memberTags}>
                {Array.from({ length: TAG_COUNT }, (_, i) => (
                  <span key={i} className={styles.tag}>
                    {t(`members.${key}.tags.${i}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
