import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
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
  metadataBase: new URL("https://www.paralleloconsultoria.com"),
  title: "Parallelo",
  description:
    "Consultoría en cumplimiento preventivo STPS, auditorías VDA y reclutamiento estratégico.",
  openGraph: {
    title: "Parallelo",
    description:
      "Consultoría en cumplimiento preventivo STPS, auditorías VDA y reclutamiento estratégico.",
    type: "website",
    locale: "es_MX",
    siteName: "Parallelo Consultoría",
    images: [
      {
        url: "https://www.paralleloconsultoria.com/Assets_Landing_Parallelo.png",
        width: 2083,
        height: 2083,
        alt: "Parallelo Consultoría",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Parallelo",
    description:
      "Consultoría en cumplimiento preventivo STPS, auditorías VDA y reclutamiento estratégico.",
    images: ["https://www.paralleloconsultoria.com/Assets_Landing_Parallelo.png"],
  },
  icons: {
    icon: "/Flavicon-02.webp",
    apple: "/Flavicon-02.webp",
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
      <body className="scrollbar-hidden min-h-full flex flex-col overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
