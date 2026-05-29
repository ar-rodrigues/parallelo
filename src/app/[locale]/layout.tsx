import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import { PrivacyModalProvider } from "@/components/ui/PrivacyModal";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = "https://www.paralleloconsultoria.com";
const FAVICON_PATH = "/Flavicon-02.webp" as const;
const SHARE_IMAGE = {
  url: `${BASE_URL}/Assets_Landing_Parallelo.png`,
  width: 2083,
  height: 2083,
  alt: "Parallelo Consultoría",
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const canonicalUrl = `${BASE_URL}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: FAVICON_PATH,
      apple: FAVICON_PATH,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: "es_MX",
      type: "website",
      siteName: "Parallelo Consultoría",
      url: canonicalUrl,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [SHARE_IMAGE.url],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <PrivacyModalProvider>
        <JsonLd />
        {children}
      </PrivacyModalProvider>
    </NextIntlClientProvider>
  );
}
