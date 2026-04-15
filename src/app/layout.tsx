import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-main",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const browler = localFont({
  src: "../../public/assets/fonts/BROWLER.ttf",
  variable: "--font-brand-local",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Платформа | Лендинг",
  description: "Шаблон лендинга на Next.js, SCSS Modules и GSAP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${browler.variable}`}>
      <body>{children}</body>
    </html>
  );
}
