"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { navigateToContact } from "@/lib/navigateToContact";
import styles from "./Services.module.css";

const TABS = [
  { id: "stps" as const, panelId: "svc-stps" },
  { id: "vda" as const, panelId: "svc-vda" },
  { id: "rec" as const, panelId: "svc-rec" },
];

const CHECK_COUNT = 6;

function ServicePanel({
  id,
  active,
}: {
  id: (typeof TABS)[number]["id"];
  active: boolean;
}) {
  const t = useTranslations("Services");
  const badgeCount =
    id === "stps" ? 2 : id === "vda" ? 4 : 4;

  return (
    <div
      id={`svc-${id}`}
      role="tabpanel"
      className={`${styles.panel} ${active ? styles.panelActive : ""}`}
      hidden={!active}
    >
      <div className={styles.badgeRow}>
        {Array.from({ length: badgeCount }, (_, i) => (
          <span key={i} className={styles.badge}>
            {t(`${id}.badges.${i}`)}
          </span>
        ))}
      </div>
      <h3 className={styles.panelTitle}>{t(`${id}.title`)}</h3>
      <p className={styles.panelSub}>{t(`${id}.subtitle`)}</p>
      <p className={styles.panelBody}>{t(`${id}.body`)}</p>
      <ul className={styles.checks}>
        {Array.from({ length: CHECK_COUNT }, (_, i) => (
          <li key={i}>
            <span className={styles.checkIcon} aria-hidden="true" />
            {t(`${id}.checks.${i}`)}
          </li>
        ))}
      </ul>
      <a
        href="#contacto"
        className={`btn-primary ${styles.panelCta}`}
        onClick={(e) => {
          e.preventDefault();
          navigateToContact(id);
        }}
      >
        {t(`${id}.cta`)}
      </a>
    </div>
  );
}

export function Services() {
  const t = useTranslations("Services");
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("stps");

  return (
    <Section id="servicios" variant="light">
      <SectionHeading
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
        variant="default"
        className={styles.heading}
      />
      <div className={styles.tabs} role="tablist">
        {TABS.map(({ id }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active === id}
            aria-controls={`svc-${id}`}
            className={`${styles.tab} ${active === id ? styles.tabActive : ""}`}
            onClick={() => setActive(id)}
          >
            {t(`tabs.${id}`)}
          </button>
        ))}
      </div>

      {TABS.map(({ id }) => (
        <ServicePanel key={id} id={id} active={active === id} />
      ))}
    </Section>
  );
}
