import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import { Icon, type TablerIconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
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
        {ITEMS.map(({ key, icon }, index) => (
          <Fragment key={key}>
            {index > 0 && (
              <span className={styles.sep} aria-hidden="true">
                ·
              </span>
            )}
            <Reveal as="span" className={styles.item} delay={index * 50}>
              <Icon name={icon} className={styles.itemIcon} />
              <span className={styles.itemLabel}>{t(`items.${key}`)}</span>
            </Reveal>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
