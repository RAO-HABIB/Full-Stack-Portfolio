import type { Metadata } from "next";
import { Antonio, Inter } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habib Ur Rehman Rao | Full Stack Developer",
  description: "Portfolio of Habib Ur Rehman Rao, a full stack developer building responsive, high-performance web applications with Next.js, React, Node.js, and TypeScript.",
  applicationName: "Habib Ur Rehman Rao Portfolio",
  authors: [{ name: "Habib Ur Rehman Rao" }],
  keywords: ["Habib Ur Rehman Rao", "Full Stack Developer", "Next.js Developer", "React Developer", "TypeScript", "Node.js"],
  openGraph: {
    title: "Habib Ur Rehman Rao | Full Stack Developer",
    description: "Explore selected projects, technical skills, and experience from full stack developer Habib Ur Rehman Rao.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${antonio.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
