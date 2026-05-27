"use client";

import type { MouseEvent } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

export function useGoHome() {
  const pathname = usePathname();
  const router = useRouter();

  return (event?: MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();

    if (pathname !== "/") {
      router.push("/");
      return;
    }

    const path = window.location.pathname;
    if (window.location.hash) {
      window.history.replaceState(null, "", path);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
