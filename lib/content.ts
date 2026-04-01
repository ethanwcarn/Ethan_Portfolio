// ---------------------------------------------------------------------------
// SiteContent type — covers every piece of user-facing text and data in the
// portfolio. Keep in sync with any structural changes to app/page.tsx.
// ---------------------------------------------------------------------------

export interface Stat {
  value: string;
  label: string;
}

export interface ExperienceRole {
  title: string;
  org: string;
  years: string;
  description: string;
}

export interface Project {
  tag: string;
  title: string;
  text: string;
  image: string;
  href: string;
}

export interface Award {
  title: string;
  org: string;
}

export interface FooterLink {
  label: string;
  href: string;
  external: boolean;
}

export interface SiteContent {
  // ── Hero (BackgroundPaths) ────────────────────────────────────────────────
  heroTitle: string;
  heroCta: { text: string; href: string };

  // ── Nav ──────────────────────────────────────────────────────────────────
  brandName: string;

  // ── About ────────────────────────────────────────────────────────────────
  aboutEyebrow: string;
  aboutName: string;
  aboutNameSuffix: string;
  aboutBio: string;
  aboutStats: Stat[];
  headshotSrc: string;
  headshotAlt: string;
  statusBadge: { label: string; value: string };
  aboutCta: string;

  // ── Skills ───────────────────────────────────────────────────────────────
  skillsEyebrow: string;
  skillsHeading: string;
  skillsDescription: string;
  skillsDevelopment: string[];
  skillsDataAndBi: string[];

  // ── Experience ───────────────────────────────────────────────────────────
  experienceEyebrow: string;
  experienceHeading: string;
  experienceDescription: string;
  experienceRoles: ExperienceRole[];

  // ── Projects ─────────────────────────────────────────────────────────────
  projectsEyebrow: string;
  projectsHeading: string;
  projects: Project[];

  // ── Education ────────────────────────────────────────────────────────────
  educationEyebrow: string;
  educationHeading: string;
  educationSchool: string;
  educationSchoolSub: string;
  educationDegree: string;
  educationGpa: string;

  // ── Awards ───────────────────────────────────────────────────────────────
  awardsEyebrow: string;
  awardsHeading: string;
  awards: Award[];

  // ── Contact ──────────────────────────────────────────────────────────────
  contactEyebrow: string;
  contactHeading: string;
  contactDescription: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;

  // ── Footer ───────────────────────────────────────────────────────────────
  footerName: string;
  footerCopyright: string;
  footerLinks: FooterLink[];

  // ── Resume ───────────────────────────────────────────────────────────────
  resumeUrl: string;
}

// ---------------------------------------------------------------------------
// Default content — extracted verbatim from app/page.tsx and component files.
// This is the live fallback used when CONTENT_BLOB_URL is not set.
// ---------------------------------------------------------------------------

export const defaultContent: SiteContent = {
  // ── Hero ─────────────────────────────────────────────────────────────────
  heroTitle: "Meet Ethan Carn- The perfect member for your team",
  heroCta: { text: "Discover Excellence", href: "#about" },

  // ── Nav ──────────────────────────────────────────────────────────────────
  brandName: "ETHAN CARN",

  // ── About ────────────────────────────────────────────────────────────────
  aboutEyebrow: "Data Analytics Specialist",
  aboutName: "Ethan W.",
  aboutNameSuffix: "Carn",
  aboutBio:
    "Information Systems student at Brigham Young University. Architecting data-driven solutions with precision and technical rigor.",
  aboutStats: [
    { value: "3.98", label: "Cumulative GPA" },
    { value: "IS",   label: "Marriott School" },
    { value: "Full", label: "Tuition Scholarship" },
  ],
  headshotSrc: "/ethan-professional-headshot.jpg",
  headshotAlt: "Ethan Carn",
  statusBadge: { label: "Current Status", value: "Active Developer" },
  aboutCta: "View Work",

  // ── Skills ───────────────────────────────────────────────────────────────
  skillsEyebrow: "Technical Stack",
  skillsHeading: "Tools of the Trade",
  skillsDescription:
    "Specializing in the intersection of robust development and high-level business intelligence.",
  skillsDevelopment: ["Python", "AWS", "C#", "Machine Learning", "HTML/CSS", "Bootstrap", "VBA"],
  skillsDataAndBi: ["Tableau", "SQL (PostgreSQL, MySQL)", "Advanced Excel"],

  // ── Experience ───────────────────────────────────────────────────────────
  experienceEyebrow: "Career Path",
  experienceHeading: "Professional Impact",
  experienceDescription:
    "Driving efficiency through analytical leadership and strategic information system implementation.",
  experienceRoles: [
    {
      title: "Session Coordinator",
      org: "FSY Programs",
      years: "2023 — Present",
      description:
        "Managed logistical operations for over 2,000 youth and staff. Created automated staff feedback surveys that drove a 100% increase in satisfaction metrics.",
    },
    {
      title: "Executive Vice President",
      org: "BYU Student Alumni",
      years: "2024 — Present",
      description:
        "Led coordination for 20+ large-scale networking events. Implemented data-driven engagement strategies resulting in a 35% boost in event satisfaction.",
    },
    {
      title: "Database Designer",
      org: "Brighter Destiny International",
      years: "2023",
      description:
        "Designed and deployed a relational database for an international non-profit, streamlining donor tracking and operational reporting capabilities.",
    },
  ],

  // ── Projects ─────────────────────────────────────────────────────────────
  projectsEyebrow: "Selected Projects",
  projectsHeading: "Engineering Solutions",
  projects: [
    {
      tag: "Full-Stack Development",
      title: "Ella Rises (2025)",
      text: "AWS-hosted website for a STEM-focused non-profit, delivering robust performance and modern UI/UX.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCcUBOJpZA5oiNj2_bU1Awczu1UCnRhmsnpnix4te-3ToXj36H7BxlA8e7YF_JVi9RGTy5XE9Gc2Atda3rjbNIzyTax2mS1s71fJiYT5FWlVNsSLx3Jj-HEcMpvn52AOk12LD8SilSQpdYgzoWPgDUZDt_ipz-2qocY_De3vBE2i0xAdXqjRS1Vf53HW5dx56144EBb55VEtDSp0UqCGuNYkdpIKzlvazYvhpUlYvuFgFQov_xJR_qeIObfNd3hABBOcvwnenq1bX0",
      href: "https://www.ellarises.org/",
    },
    {
      tag: "JavaScript & Supabase",
      title: "Stillwaters Mentla Health Counseling",
      text: "Dynamic web application integrated with Supabase for real-time tracking and relational data management.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDfeLA4GsU-JNdEujjcIHwJYWGSPlHgPAdGlO9wsLfZl1Ay4oF9Z7K7WI9XGK_dwH1DFUORJFuVtOtGVL6UTNCtl8X23zyo249YapfxLcTj_foZu5VL68oUeaCeRcdx8qA0m-HZAFI2f7HWzhU3M8WHAPVNU7z9nS0439ewzCvXphPtJ2TUdbYMqUEjJKpmSbo6tyw18-HRvv4gsxUGTHKOntf_Gm3QKXEULKEs1221lDc_2pNE5t-6VHmXymS-5g4Tvi58Wp5egR0",
      href: "https://stillwaters.alijahwhitney.dev/",
    },
    {
      tag: "UI/UX Development",
      title: "BYU Student Alumni",
      text: "Interface architecture for BYU's Student Alumni homepage, focusing on community engagement.",
      image: "/byu-student-alumni.png",
      href: "https://studentalumni.byu.edu/",
    },
    {
      tag: "Data Analytics",
      title: "Graduate Student Data Dashboard",
      text: "Interactive public dashboard for graduate student analytics and reporting.",
      image:
        "https://images.unsplash.com/photo-1551281044-8bca32f4f2f4?auto=format&fit=crop&w=1200&q=80",
      href: "https://public.tableau.com/app/profile/ethan.carn2295/viz/EthanJohnBlakeTaylorINTEX2/Dashboard2",
    },
  ],

  // ── Education ────────────────────────────────────────────────────────────
  educationEyebrow: "Academic Foundation",
  educationHeading: "Education",
  educationSchool: "Brigham Young University",
  educationSchoolSub: "Marriott School of Business",
  educationDegree: "B.S. Information Systems",
  educationGpa: "3.98 GPA | Full-tuition Academic Scholarship",

  // ── Awards ───────────────────────────────────────────────────────────────
  awardsEyebrow: "Recognition",
  awardsHeading: "Awards & Honors",
  awards: [
    {
      title: "Eagle Scout",
      org: "Boy Scouts of America",
    },
    {
      title: "BYU Connect Brand Ambassador",
      org: "Promoting professional networking within the student body",
    },
  ],

  // ── Contact ──────────────────────────────────────────────────────────────
  contactEyebrow: "Get In Touch",
  contactHeading: "Let's analyze the future.",
  contactDescription:
    "Open to opportunities in data analytics, information systems, and technical development.",
  email: "carn0@byu.edu",
  linkedinUrl: "https://www.linkedin.com/in/ethan-carn",
  githubUrl: "https://github.com/ethanwcarn",

  // ── Footer ───────────────────────────────────────────────────────────────
  footerName: "ETHAN W. CARN",
  footerCopyright: "© 2024 ETHAN W. CARN. Precision in Data.",
  footerLinks: [
    { label: "LinkedIn",       href: "https://www.linkedin.com/in/ethan-carn", external: true  },
    { label: "GitHub",         href: "https://github.com/ethanwcarn",          external: true  },
    { label: "Email",          href: "mailto:carn0@byu.edu",                   external: false },
    { label: "Privacy Policy", href: "#",                                       external: false },
  ],

  // ── Resume ───────────────────────────────────────────────────────────────
  resumeUrl: "",
};

// ---------------------------------------------------------------------------
// getContent — fetches live content from Vercel Blob when CONTENT_BLOB_URL is
// set, otherwise returns the hardcoded defaultContent so the site always works.
// ---------------------------------------------------------------------------

export async function getContent(): Promise<SiteContent> {
  // Try explicit URL first (fastest path)
  const url = process.env.CONTENT_BLOB_URL;
  if (url) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return (await res.json()) as SiteContent;
    } catch {}
  }

  // Fallback: discover content.json in the blob store without needing CONTENT_BLOB_URL configured
  try {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: "content" });
    const found = blobs.find((b) => b.pathname === "content.json");
    if (found) {
      const res = await fetch(found.url, { cache: "no-store" });
      if (res.ok) return (await res.json()) as SiteContent;
    }
  } catch {}

  return defaultContent;
}
