import { getTranslations } from "next-intl/server";
import styles from "./MidPageCta.module.css";

export async function MidPageCta() {
  const t = await getTranslations("MidPageCta");

  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>
        <a href="#contacto" className={`btn-primary ${styles.cta}`}>
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
