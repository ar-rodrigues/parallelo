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

const HERO_IMAGE = {
  path: "/hero_image.jpeg",
  width: 967,
  height: 929,
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const tHero = await getTranslations({ locale, namespace: "Hero" });

  const ogImage = {
    url: HERO_IMAGE.path,
    width: HERO_IMAGE.width,
    height: HERO_IMAGE.height,
    alt: tHero("imageAlt"),
  };

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: HERO_IMAGE.path,
      apple: HERO_IMAGE.path,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: "es_MX",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [HERO_IMAGE.path],
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
