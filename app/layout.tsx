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
  display: "optional",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "optional",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const BASE_URL = "https://ethan-carn.work";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ethan Carn | Data Analytics & Information Systems",
    template: "%s | Ethan Carn",
  },
  description:
    "Ethan Carn — Information Systems student at BYU Marriott School of Business. Specializing in data analytics, full-stack development, Python, SQL, and Tableau. 3.98 GPA, full-tuition scholar.",
  keywords: [
    "Ethan Carn",
    "Ethan W Carn",
    "ethanwcarn",
    "Information Systems",
    "BYU",
    "Brigham Young University",
    "Marriott School of Business",
    "Data Analytics",
    "Full-Stack Development",
    "Tableau",
    "SQL",
    "Python",
    "AWS",
    "Portfolio",
    "Provo Utah",
  ],
  authors: [{ name: "Ethan Carn", url: BASE_URL }],
  creator: "Ethan Carn",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Ethan Carn | Data Analytics & Information Systems",
    description:
      "BYU Information Systems student specializing in data analytics, full-stack development, and business intelligence. 3.98 GPA | Full-tuition scholar.",
    type: "profile",
    url: BASE_URL,
    siteName: "Ethan Carn Portfolio",
    firstName: "Ethan",
    lastName: "Carn",
    username: "ethanwcarn",
    gender: "male",
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
    title: "Ethan Carn | Data Analytics & Information Systems",
    description:
      "BYU Information Systems student specializing in data analytics, full-stack development, and business intelligence.",
    images: ["/ethan-professional-headshot.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ethan Carn",
  alternateName: "Ethan W. Carn",
  url: BASE_URL,
  image: `${BASE_URL}/ethan-professional-headshot.jpg`,
  jobTitle: "Information Systems Student",
  description:
    "Information Systems student at Brigham Young University's Marriott School of Business, specializing in data analytics and full-stack development.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Brigham Young University",
    url: "https://www.byu.edu",
  },
  knowsAbout: ["Data Analytics", "Python", "SQL", "Tableau", "AWS", "Full-Stack Development", "Machine Learning"],
  sameAs: [
    "https://www.linkedin.com/in/ethan-carn",
    "https://github.com/ethanwcarn",
  ],
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
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Anti-FOUC: set dark class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t==null&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <AdminProvider initialContent={defaultContent}>
          {children}
        </AdminProvider>
        <CookieBanner />
        <SpeedInsights />
      </body>
    </html>
  );
}
