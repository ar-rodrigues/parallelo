"use client";

import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from "react";

interface PrivacyModalContextValue {
  open: () => void;
}

const PrivacyModalContext = createContext<PrivacyModalContextValue | null>(null);

export function usePrivacyModal() {
  const context = useContext(PrivacyModalContext);
  if (!context) {
    throw new Error("usePrivacyModal debe usarse dentro de PrivacyModalProvider");
  }
  return context;
}

export interface PrivacyModalContextProviderProps {
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyModalContextProvider({
  children,
  onOpenChange,
}: PrivacyModalContextProviderProps) {
  const handleOpen = useCallback(() => onOpenChange(true), [onOpenChange]);

  return (
    <PrivacyModalContext.Provider value={{ open: handleOpen }}>
      {children}
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
      className={className}
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
