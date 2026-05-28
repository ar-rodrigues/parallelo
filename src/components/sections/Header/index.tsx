"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useGoHome } from "@/hooks/useGoHome";
import { useScrollShadow } from "@/hooks/useScrollShadow";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { href: "#servicios", key: "services" as const },
  { href: "#cobertura", key: "coverage" as const },
  { href: "#nosotros", key: "about" as const },
];

export function Header() {
  const t = useTranslations("Header");
  const scrolled = useScrollShadow();
  const goHome = useGoHome();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Ir al inicio"
          onClick={(e) => {
            setMenuOpen(false);
            goHome(e);
          }}
        >
          <Image
            src="/navbar_logo.webp"
            alt={t("logoAlt")}
            width={577}
            height={140}
            className={styles.logo}
            style={{ width: "auto", height: 28 }}
            priority
          />
          <span className={styles.tagline}>{t("tagline")}</span>
        </Link>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={styles.menuIcon} data-open={menuOpen} />
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          {NAV_ITEMS.map(({ href, key }) => (
            <a
              key={key}
              href={href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <a
            href="#contacto"
            className={`btn-primary ${styles.navCta}`}
            onClick={() => setMenuOpen(false)}
          >
            {t("cta")}
          </a>
        </nav>
      </div>
    </header>
  );
}
