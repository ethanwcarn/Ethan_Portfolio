import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "@/components/admin/AdminContext";
import { CookieBanner } from "@/components/CookieBanner";
import { defaultContent } from "@/lib/content";
import { SpeedInsights } from "@vercel/speed-insights/next";

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://ethancarn.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Ethan Carn | Information Systems Portfolio",
  description:
    "Personal portfolio for Ethan Carn, an Information Systems student at BYU focused on data analytics and full-stack development.",
  keywords: [
    "Ethan Carn",
    "Information Systems",
    "BYU",
    "Brigham Young University",
    "Data Analytics",
    "Full-Stack Development",
    "Tableau",
    "SQL",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Ethan Carn" }],
  openGraph: {
    title: "Ethan Carn | Information Systems Portfolio",
    description:
      "Information Systems student at BYU specializing in data analytics and full-stack development.",
    type: "website",
    url: BASE_URL,
    images: [
      {
        url: "/ethan-professional-headshot.jpg",
        width: 609,
        height: 913,
        alt: "Ethan Carn — professional headshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Carn | Information Systems Portfolio",
    description:
      "Information Systems student at BYU specializing in data analytics and full-stack development.",
    images: ["/ethan-professional-headshot.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AdminProvider initialContent={defaultContent}>
          {children}
        </AdminProvider>
        <CookieBanner />
        <SpeedInsights />
      </body>
    </html>
  );
}
