import { getTranslations } from "next-intl/server";
import styles from "./TrustBar.module.css";

const ITEMS = [
  { key: "stps", icon: "ti-shield-check" },
  { key: "vda", icon: "ti-certificate" },
  { key: "recruitment", icon: "ti-users" },
  { key: "national", icon: "ti-map-pin" },
] as const;

export async function TrustBar() {
  const t = await getTranslations("TrustBar");

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {ITEMS.flatMap(({ key, icon }, index) => {
          const pill = (
            <span key={key} className={styles.item}>
              <i className={`ti ${icon}`} aria-hidden="true" />
              {t(`items.${key}`)}
            </span>
          );
          if (index === 0) return [pill];
          return [
            <span key={`sep-${key}`} className={styles.sep} aria-hidden="true">
              ·
            </span>,
            pill,
          ];
        })}
      </div>
    </div>
  );
}
