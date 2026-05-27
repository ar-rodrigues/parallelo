"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import styles from "./PrivacyModal.module.css";

const SECTION_KEYS = ["0", "1", "2", "3", "4"] as const;

interface PrivacyModalContextValue {
  open: () => void;
}

const PrivacyModalContext = createContext<PrivacyModalContextValue | null>(
  null,
);

export function usePrivacyModal() {
  const context = useContext(PrivacyModalContext);
  if (!context) {
    throw new Error("usePrivacyModal debe usarse dentro de PrivacyModalProvider");
  }
  return context;
}

export interface PrivacyModalProviderProps {
  children: ReactNode;
}

export function PrivacyModalProvider({ children }: PrivacyModalProviderProps) {
  const t = useTranslations("Privacy");
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <PrivacyModalContext.Provider value={{ open: handleOpen }}>
      {children}
      <Modal
        title={t("title")}
        open={open}
        onCancel={handleClose}
        footer={
          <div className={styles.footer}>
            <Button type="primary" onClick={handleClose}>
              {t("close")}
            </Button>
          </div>
        }
        width={720}
        destroyOnHidden
      >
        <div className={styles.body}>
          <p className={styles.updated}>{t("lastUpdated")}</p>
          {SECTION_KEYS.map((key) => (
            <section key={key} className={styles.section}>
              <h3>{t(`sections.${key}.title`)}</h3>
              <p>{t(`sections.${key}.body`)}</p>
            </section>
          ))}
        </div>
      </Modal>
    </PrivacyModalContext.Provider>
  );
}

export interface PrivacyLinkButtonProps {
  children: ReactNode;
  className?: string;
}

export function PrivacyLinkButton({
  children,
  className = "",
}: PrivacyLinkButtonProps) {
  const { open } = usePrivacyModal();

  return (
    <button
      type="button"
      className={className || styles.linkButton}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        open();
      }}
    >
      {children}
    </button>
  );
}
