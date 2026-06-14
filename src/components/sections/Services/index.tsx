"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";
import { navigateToContact } from "@/lib/navigateToContact";
import {
  resolveServiceTab,
  subscribeToServiceTab,
  type ServiceTabId,
} from "@/lib/navigateToService";
import styles from "./Services.module.css";

const TABS = [
  { id: "stps" as const, panelId: "svc-stps" },
  { id: "vda" as const, panelId: "svc-vda" },
  { id: "rec" as const, panelId: "svc-rec" },
];

const CHECK_COUNT = 6;

function ServicePanelContent({
  id,
  enterMode,
}: {
  id: ServiceTabId;
  enterMode: "scroll" | "tab";
}) {
  const t = useTranslations("Services");
  const badgeCount = id === "stps" ? 2 : 4;

  return (
    <div className={styles.panelContent} data-enter={enterMode}>
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

function getInitialServiceTab(): ServiceTabId {
  return resolveServiceTab() ?? "stps";
}

export function Services() {
  const t = useTranslations("Services");
  const [active, setActive] = useState<ServiceTabId>(getInitialServiceTab);
  const [panelAnimKey, setPanelAnimKey] = useState(0);
  const { ref, isInView } = useInView();
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    if (isInView) hasRevealedRef.current = true;
  }, [isInView]);

  useEffect(() => {
    const applyTab = (tab: ServiceTabId) => {
      setActive((current) => {
        if (current !== tab && hasRevealedRef.current) {
          setPanelAnimKey((key) => key + 1);
        }
        return tab;
      });
    };

    const tab = resolveServiceTab();
    if (tab) applyTab(tab);

    if (window.location.hash.startsWith("#servicios")) {
      document.getElementById("servicios")?.scrollIntoView({ block: "start" });
      const base = `${window.location.pathname}${window.location.search}`;
      if (window.location.hash !== "#servicios") {
        window.history.replaceState(null, "", `${base}#servicios`);
      }
    }

    return subscribeToServiceTab(applyTab);
  }, []);

  const handleTabClick = (id: ServiceTabId) => {
    if (id === active) return;
    setActive(id);
    if (hasRevealedRef.current) setPanelAnimKey((key) => key + 1);
  };

  const panelEnterMode = panelAnimKey === 0 ? "scroll" : "tab";

  return (
    <Section id="servicios" variant="light">
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className={`${styles.servicesContent} ${isInView ? styles.servicesRevealed : ""}`}
      >
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
              onClick={() => handleTabClick(id)}
            >
              {t(`tabs.${id}`)}
            </button>
          ))}
        </div>

        {TABS.map(({ id }) => (
          <div
            key={id}
            id={`svc-${id}`}
            role="tabpanel"
            className={styles.panel}
            hidden={active !== id}
          >
            {active === id && (
              <ServicePanelContent
                key={panelAnimKey === 0 ? active : `${active}-${panelAnimKey}`}
                id={active}
                enterMode={panelEnterMode}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
