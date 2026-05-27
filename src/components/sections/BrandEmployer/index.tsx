import { getTranslations } from "next-intl/server";
import styles from "./BrandEmployer.module.css";

export async function BrandEmployer() {
  const t = await getTranslations("BrandEmployer");

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={`section-label ${styles.label}`}>{t("label")}</span>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.body}>{t("body")}</p>
        <blockquote className={styles.quote}>
          &ldquo;{t("quote")}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
