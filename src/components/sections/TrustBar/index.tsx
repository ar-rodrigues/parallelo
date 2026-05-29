import { getTranslations } from "next-intl/server";
import { Icon, type TablerIconName } from "@/components/ui/Icon";
import styles from "./TrustBar.module.css";

const ITEMS = [
  { key: "stps", icon: "shield-check" as const },
  { key: "vda", icon: "certificate" as const },
  { key: "recruitment", icon: "users" as const },
  { key: "national", icon: "map-pin" as const },
] as const satisfies ReadonlyArray<{ key: string; icon: TablerIconName }>;

export async function TrustBar() {
  const t = await getTranslations("TrustBar");

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {ITEMS.flatMap(({ key, icon }, index) => {
          const pill = (
            <span key={key} className={styles.item} data-key={key}>
              <Icon name={icon} className={styles.itemIcon} />
              <span className={styles.itemLabel}>{t(`items.${key}`)}</span>
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
