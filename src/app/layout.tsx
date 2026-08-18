import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const grok = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Temitope Ajayi | AI Engineer & Business Analyst",
  description:
    "Portfolio for an AI Engineer and Business Analyst specializing in automation, analytics, workflow design, and strategic operations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${grok.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f5f3] text-[#111111] dark:bg-[#0a0b0d] dark:text-[#f5f5f5]">
        {children}
      </body>
    </html>
  );
}
