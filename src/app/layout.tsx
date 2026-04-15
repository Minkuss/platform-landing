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
  title: "Платформа",
  description: "Платформа для обучения и конкурсных заданий",
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
