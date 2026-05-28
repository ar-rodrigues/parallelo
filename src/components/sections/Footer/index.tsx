"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PrivacyLinkButton } from "@/components/ui/PrivacyModal";
import { useGoHome } from "@/hooks/useGoHome";
import styles from "./Footer.module.css";

export function Footer() {
  const t = useTranslations("Footer");
  const goHome = useGoHome();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link
              href="/"
              className={styles.logoLink}
              aria-label="Ir al inicio"
              onClick={goHome}
            >
              <Image
                src="/FOOTER_LOGO.webp"
                alt={t("logoAlt")}
                width={443}
                height={135}
                className={styles.logo}
                style={{ width: "auto", height: 32 }}
              />
            </Link>
            <p className={styles.description}>{t("description")}</p>
            <p className={styles.tagline}>&ldquo;{t("tagline")}&rdquo;</p>
          </div>
          <div className={styles.linksCol}>
            <div className={styles.colTitle}>{t("columns.services")}</div>
            <ul className={styles.links}>
              <li>
                <a href="#servicios">{t("links.stps")}</a>
              </li>
              <li>
                <a href="#servicios">{t("links.vda")}</a>
              </li>
              <li>
                <a href="#servicios">{t("links.rec")}</a>
              </li>
            </ul>
            <div className={`${styles.colTitle} ${styles.colTitleSpaced}`}>
              {t("columns.company")}
            </div>
            <ul className={styles.links}>
              <li>
                <Link href="/" onClick={goHome}>
                  {t("links.home")}
                </Link>
              </li>
              <li>
                <a href="#cobertura">{t("links.coverage")}</a>
              </li>
              <li>
                <a href="#contacto">{t("links.contact")}</a>
              </li>
            </ul>
          </div>
          <div className={styles.contactCol}>
            <div className={styles.colTitle}>{t("columns.contact")}</div>
            <p className={styles.contactItem}>
              {t("phones.dinorah.label")}: {t("phones.dinorah.number")}
            </p>
            <p className={styles.contactItem}>
              {t("phones.ezequiel.label")}: {t("phones.ezequiel.number")}
            </p>
            <p className={styles.contactItem}>
              <a href={`mailto:${t("email")}`}>{t("email")}</a>
            </p>
            <div className={`${styles.colTitle} ${styles.colTitleSpaced}`}>
              {t("columns.coverage")}
            </div>
            <p className={styles.contactItem}>{t("coverage.hq")}</p>
            <p className={styles.contactItem}>{t("coverage.national")}</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.legal}>
            {t("legal", { year })}{" "}
            <PrivacyLinkButton className={styles.legalLink}>
              {t("links.privacy")}
            </PrivacyLinkButton>
          </p>
          <div className={styles.social}>
            <a
              href={t("social.facebookUrl")}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ti ti-brand-facebook" aria-hidden="true" />
              {t("social.facebook")}
            </a>
            <a
              href={t("social.linkedinUrl")}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ti ti-brand-linkedin" aria-hidden="true" />
              {t("social.linkedin")}
            </a>
            <a
              href={t("social.instagramUrl")}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ti ti-brand-instagram" aria-hidden="true" />
              {t("social.instagram")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
