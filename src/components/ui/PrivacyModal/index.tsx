"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { AntdProviders } from "@/components/providers/AntdProviders";
import {
  PrivacyModalContextProvider,
  PrivacyLinkButton as PrivacyLinkButtonBase,
  usePrivacyModal,
} from "./PrivacyModalContext";
import styles from "./PrivacyModal.module.css";

const PrivacyModalDialog = dynamic(
  () =>
    import("./PrivacyModalDialog").then((mod) => ({
      default: mod.PrivacyModalDialog,
    })),
  { loading: () => null },
);

export interface PrivacyModalProviderProps {
  children: ReactNode;
}

export function PrivacyModalProvider({ children }: PrivacyModalProviderProps) {
  const [open, setOpen] = useState(false);

  return (
    <PrivacyModalContextProvider onOpenChange={setOpen}>
      {children}
      {open ? (
        <AntdProviders>
          <PrivacyModalDialog open={open} onClose={() => setOpen(false)} />
        </AntdProviders>
      ) : null}
    </PrivacyModalContextProvider>
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
  return (
    <PrivacyLinkButtonBase className={className || styles.linkButton}>
      {children}
    </PrivacyLinkButtonBase>
  );
}

export { usePrivacyModal };
