import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { NextIntlClientProvider } from "next-intl";
import { antdTheme } from "@/config/theme";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.parallelo.com.mx"),
  title: "Parallelo",
  description:
    "Consultoría en cumplimiento preventivo STPS, auditorías VDA y reclutamiento estratégico.",
  icons: {
    icon: "/hero_image.jpeg",
    apple: "/hero_image.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${barlow.variable} ${barlowCondensed.variable} scrollbar-hidden h-full overflow-y-auto overflow-x-clip antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="scrollbar-hidden min-h-full flex flex-col overflow-x-clip">
        <AntdRegistry>
          <ConfigProvider theme={antdTheme}>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
