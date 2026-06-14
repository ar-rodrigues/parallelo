import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./FinalCta.module.css";

export async function FinalCta() {
  const t = await getTranslations("FinalCta");

  return (
    <section className={styles.section}>
      <div className={styles.texture} aria-hidden="true" />
      <Reveal className={styles.inner}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>
        <a href="#contacto" className="btn-primary">
          {t("cta")}
        </a>
      </Reveal>
    </section>
  );
}
