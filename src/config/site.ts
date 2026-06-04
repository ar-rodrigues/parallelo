import type { Metadata } from "next";

export const SITE_URL = "https://www.paralleloconsultoria.com" as const;

/** Favicon estable para Google Search, navegadores y Apple. */
export const siteIcons: NonNullable<Metadata["icons"]> = {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    { url: "/favicon.webp", type: "image/webp", sizes: "48x48" },
  ],
  apple: [
    {
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  ],
  shortcut: "/favicon.ico",
};

export const siteManifest = "/site.webmanifest" as const;
