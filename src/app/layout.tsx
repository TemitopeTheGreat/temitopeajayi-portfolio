import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { CONTACT, SITE_URL } from "./data";

const sans = Schibsted_Grotesk({
  variable: "--font-body-face",
  subsets: ["latin"],
  display: "swap",
});

const title = "Temitope Ajayi | AI Engineer & Business Analyst";
const description =
  "Portfolio for an AI Engineer and Business Analyst specializing in automation, analytics, workflow design, and strategic operations.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: ["AI Engineer", "Business Analyst", "Automation", "Next.js", "Workflow design", "Nigeria"],
  authors: [{ name: CONTACT.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: CONTACT.name,
    type: "website",
    images: [{ url: "/profile-portrait.png", width: 1200, height: 630, alt: CONTACT.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/profile-portrait.png"] },
  icons: { icon: "/favicon.ico", apple: "/profile-portrait.png" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1011" },
  ],
};

// Adds "js" (so reveal-on-scroll never hides content when scripts fail) and restores the saved theme before first paint.
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{d.classList.toggle("dark",localStorage.getItem("theme")==="dark")}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: CONTACT.name,
  jobTitle: "AI Engineer & Business Analyst",
  url: SITE_URL,
  email: `mailto:${CONTACT.email}`,
  telephone: CONTACT.phone,
  sameAs: [CONTACT.linkedin],
  knowsAbout: ["AI automation", "Business analysis", "Process mapping", "Next.js", "Workflow design"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
