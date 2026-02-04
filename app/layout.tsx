import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "intro.js/minified/introjs.min.css";
import "./intro-tour-overrides.css";
import HeaderWrapper from '@/components/header-wrapper';
import FooterWrapper from '@/components/footer-wrapper';
import FloatingActions from '@/components/floating-actions';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Your Name",
  description: "Personal portfolio website showcasing my work and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderWrapper />
        {children}
        <FooterWrapper />
        <FloatingActions />
      </body>
    </html>
  );
}
