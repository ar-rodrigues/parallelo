import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HeroStats } from "./HeroStats";
import styles from "./Hero.module.css";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className={styles.hero}>
      <div className={styles.accentLine} aria-hidden="true" />
      <div className={styles.gridTexture} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <span className={styles.tag}>{t("tag")}</span>
            <h1 className={styles.title}>
              {t("titleBefore")}
              <em>{t("titleHighlight")}</em>
              {t("titleAfter")}
            </h1>
            <p className={styles.subtitle}>{t("subtitle")}</p>
            <div className={styles.actions}>
              <a href="#contacto" className="btn-primary">
                {t("ctaPrimary")}
              </a>
              <a href="#servicios" className="btn-secondary">
                {t("ctaSecondary")}
              </a>
            </div>
            <p className={styles.micro}>
              {t("micro.coverage")}
              <span aria-hidden="true">·</span>
              {t("micro.hq")}
              <span aria-hidden="true">·</span>
              {t("micro.sectors")}
            </p>
          </div>
          <div className={styles.visual}>
            <Image
              src="/Assets_Landing_Parallelo.webp"
              alt={t("imageAlt")}
              width={2083}
              height={2083}
              className={styles.heroImage}
              sizes="(max-width: 640px) 200px, (max-width: 900px) 260px, 440px"
              priority
              unoptimized
            />
          </div>
        </div>
        <HeroStats />
      </div>
    </section>
  );
}
