"use client";

import { useTranslations } from "next-intl";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import styles from "./PrivacyModal.module.css";

const SECTION_KEYS = ["0", "1", "2", "3", "4"] as const;

export interface PrivacyModalDialogProps {
  open: boolean;
  onClose: () => void;
}

export function PrivacyModalDialog({ open, onClose }: PrivacyModalDialogProps) {
  const t = useTranslations("Privacy");

  return (
    <Modal
      title={t("title")}
      open={open}
      onCancel={onClose}
      footer={
        <div className={styles.footer}>
          <Button type="primary" onClick={onClose}>
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
  );
}
