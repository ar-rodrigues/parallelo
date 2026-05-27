import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Coverage.module.css";

const SECTOR_KEYS = ["industrial", "commercial", "services"] as const;
const SECTOR_ICONS = {
  industrial: "ti-building-factory",
  commercial: "ti-shopping-bag",
  services: "ti-briefcase",
} as const;
const POSITION_KEYS = ["0", "1", "2", "3"] as const;

export async function Coverage() {
  const t = await getTranslations("Coverage");

  return (
    <Section id="cobertura" variant="alt">
      <SectionHeading
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
        variant="default"
        className={styles.heading}
      />
      <div className={styles.sectorGrid}>
        {SECTOR_KEYS.map((key) => (
          <div key={key} className={styles.sectorCard}>
            <div className={styles.sectorIcon}>
              <i className={`ti ${SECTOR_ICONS[key]}`} aria-hidden="true" />
            </div>
            <h3 className={styles.sectorName}>{t(`sectors.${key}.title`)}</h3>
            <p className={styles.sectorDesc}>{t(`sectors.${key}.desc`)}</p>
          </div>
        ))}
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.positions}>
          <div className={styles.positionsTitle}>{t("positions.title")}</div>
          <div className={styles.positionChips}>
            {POSITION_KEYS.map((key) => (
              <span key={key} className={styles.chip}>
                {t(`positions.items.${key}`)}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.location}>
          <i className="ti ti-map-pin" aria-hidden="true" />
          <div>
            <div className={styles.locationHq}>{t("location.hq")}</div>
            <div className={styles.locationCoverage}>{t("location.coverage")}</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
