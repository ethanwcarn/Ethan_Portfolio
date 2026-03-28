import Image from "next/image";
import { GlowingShadow } from "@/components/ui/glowing-shadow";
import HoverGradientNavBar from "@/components/ui/hover-gradient-nav-bar";
import { BackgroundPaths } from "@/components/ui/background-paths";
import {
  ArrowRight,
  BarChart3,
  Code2,
  Database,
  ExternalLink,
  Mail,
  Menu,
  Megaphone,
  Sparkles,
  Terminal,
  UserPlus,
} from "lucide-react";

const projectCards = [
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
    title: "Grduate Student Data Dashboard",
    text: "Interactive public dashboard for graduate student analytics and reporting.",
    image:
      "https://images.unsplash.com/photo-1551281044-8bca32f4f2f4?auto=format&fit=crop&w=1200&q=80",
    href: "https://public.tableau.com/app/profile/ethan.carn2295/viz/EthanJohnBlakeTaylorINTEX2/Dashboard2",
  },
];

export default function Home() {
  return (
    <>
      <BackgroundPaths title="Meet Ethan Carn- The perfect member for your team" />

      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <div className="font-heading text-xl font-bold tracking-tighter text-[#0e1c2b]">
            ETHAN CARN
          </div>
          <div className="hidden md:flex">
            <HoverGradientNavBar mode="inline" preset="portfolio" />
          </div>
          <div className="md:hidden">
            <Menu className="text-[#0e1c2b]" size={22} />
          </div>
        </div>
      </nav>

      <main>
        <section
          id="about"
          className="relative mx-auto flex min-h-[819px] max-w-7xl items-center overflow-hidden px-8"
        >
          <div className="grid w-full items-center gap-12 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-4">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#001f28]">
                  Data Analytics Specialist
                </span>
                <h1 className="font-heading text-6xl font-bold leading-tight tracking-tighter text-[#0e1c2b] md:text-8xl">
                  Ethan W. <span className="text-[#8b99ac]">Carn</span>
                </h1>
                <p className="max-w-xl text-xl leading-relaxed text-[#47607e]">
                  Information Systems student at{" "}
                  <span className="font-bold text-[#0e1c2b]">
                    Brigham Young University
                  </span>
                  . Architecting data-driven solutions with precision and technical
                  rigor.
                </p>
              </div>

              <div className="flex flex-wrap gap-12 pt-4">
                {[
                  ["3.98", "Cumulative GPA"],
                  ["IS", "Marriott School"],
                  ["Full", "Tuition Scholarship"],
                ].map(([value, label]) => (
                  <div key={label} className="space-y-1">
                    <span className="block font-heading text-4xl font-bold text-[#0e1c2b]">
                      {value}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#47607e]">
                      {label}
                    </span>
                    <div className="mt-2 h-0.5 w-12 bg-[#001f28]" />
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-8">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-md bg-[#0e1c2b] px-8 py-4 font-heading font-bold text-white transition-all duration-300 hover:scale-[1.02]"
                >
                  View Work <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="relative hidden lg:col-span-5 lg:block">
              <div className="aspect-square rounded-full border border-[color:rgb(198_197_212/.2)] bg-[#f3f4f5] p-8">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/ethan-professional-headshot.jpg"
                    alt="Ethan Carn"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 0px, 40vw"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-[220px]">
                <GlowingShadow>
                  <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                    <Database className="text-[#001f28]" size={36} />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight text-[#47607e]">
                        Current Status
                      </p>
                      <p className="font-heading text-sm font-bold text-[#0e1c2b]">
                        Active Developer
                      </p>
                    </div>
                  </div>
                </GlowingShadow>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f4f5] py-24">
          <div className="mx-auto max-w-7xl px-8">
            <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-xl">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#001f28]">
                  Technical Stack
                </span>
                <h2 className="mt-2 font-heading text-4xl font-bold text-[#0e1c2b] md:text-5xl">
                  Tools of the Trade
                </h2>
              </div>
              <p className="max-w-sm text-[#47607e]">
                Specializing in the intersection of robust development and high-level
                business intelligence.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <GlowingShadow>
                  <div className="rounded-xl bg-white p-10">
                    <Code2 className="mb-6 text-[#0e1c2b]" size={36} />
                    <h3 className="mb-6 font-heading text-2xl font-bold text-[#0e1c2b]">
                      Development
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "Python",
                        "AWS",
                        "C#",
                        "Machine Learning",
                        "HTML/CSS",
                        "Bootstrap",
                        "VBA",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-[#c2dcff] px-4 py-2 text-xs font-bold text-[#001d36]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlowingShadow>
              </div>
              <div>
                <GlowingShadow>
                  <div className="rounded-xl bg-[#0e1c2b] p-10 text-white">
                    <BarChart3 className="mb-6 text-[#4cd6ff]" size={36} />
                    <h3 className="mb-6 font-heading text-2xl font-bold">Data & BI</h3>
                    <ul className="space-y-4">
                      {["Tableau", "SQL (PostgreSQL, MySQL)", "Advanced Excel"].map(
                        (item) => (
                          <li key={item} className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#4cd6ff]" />
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </GlowingShadow>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="bg-[var(--surface)] py-24">
          <div className="mx-auto grid max-w-7xl gap-16 px-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="top-32 lg:sticky">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--tertiary)]">
                  Career Path
                </span>
                <h2 className="mt-2 font-heading text-4xl font-bold text-[var(--primary)] md:text-5xl">
                  Professional Impact
                </h2>
                <p className="mt-6 leading-relaxed text-[var(--secondary)]">
                  Driving efficiency through analytical leadership and strategic
                  information system implementation.
                </p>
              </div>
            </div>
            <div className="space-y-12 lg:col-span-8">
              {[
                [
                  "Session Coordinator",
                  "FSY Programs",
                  "2023 — Present",
                  "Managed logistical operations for over 2,000 youth and staff. Created automated staff feedback surveys that drove a 100% increase in satisfaction metrics.",
                ],
                [
                  "Executive Vice President",
                  "BYU Student Alumni",
                  "2024 — Present",
                  "Led coordination for 20+ large-scale networking events. Implemented data-driven engagement strategies resulting in a 35% boost in event satisfaction.",
                ],
                [
                  "Database Designer",
                  "Brighter Destiny International",
                  "2023",
                  "Designed and deployed a relational database for an international non-profit, streamlining donor tracking and operational reporting capabilities.",
                ],
              ].map(([role, org, years, desc]) => (
                <div key={role} className="relative pl-8 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-px before:bg-[var(--outline-variant)]">
                  <GlowingShadow>
                    <div className="rounded-xl bg-white p-6">
                      <div className="mb-4 flex flex-col items-start justify-between md:flex-row">
                        <div>
                          <h4 className="font-heading text-xl font-bold text-[var(--primary)]">
                            {role}
                          </h4>
                          <p className="text-sm font-bold text-[var(--secondary)]">{org}</p>
                        </div>
                        <span className="rounded bg-[var(--surface-container)] px-3 py-1 text-sm text-[var(--on-surface-variant)]">
                          {years}
                        </span>
                      </div>
                      <p className="text-[var(--on-surface-variant)]">{desc}</p>
                    </div>
                  </GlowingShadow>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="bg-[#f3f4f5] py-24">
          <div className="mx-auto max-w-7xl px-8">
            <div className="mb-16">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#001f28]">
                Selected Projects
              </span>
              <h2 className="mt-2 font-heading text-4xl font-bold text-[#0e1c2b] md:text-5xl">
                Engineering Solutions
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projectCards.map((project) => (
                <article key={project.title} className="group">
                  <GlowingShadow>
                    <div className="overflow-hidden rounded-xl bg-white">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-8">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#001f28]">
                          {project.tag}
                        </span>
                        <h3 className="mb-4 font-heading text-2xl font-bold text-[#0e1c2b]">
                          {project.title}
                        </h3>
                        <p className="mb-6 text-sm text-[#454652]">{project.text}</p>
                        <div className="flex gap-4">
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title}`}
                          >
                            <ExternalLink className="text-[#47607e] transition-colors hover:text-[#0e1c2b]" />
                          </a>
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View source for ${project.title}`}
                          >
                            <Code2 className="text-[#47607e] transition-colors hover:text-[#0e1c2b]" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </GlowingShadow>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface)] py-24">
          <div className="mx-auto grid max-w-7xl gap-16 px-8 md:grid-cols-2">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--tertiary)]">
                Academic Foundation
              </span>
              <h2 className="mb-12 mt-2 font-heading text-4xl font-bold text-[var(--primary)]">
                Education
              </h2>
              <GlowingShadow>
                <div className="rounded-xl border-l-4 border-[var(--primary)] bg-[var(--surface-container-low)] p-8">
                  <h4 className="font-heading text-xl font-bold text-[var(--primary)]">
                    Brigham Young University
                  </h4>
                  <p className="mb-4 text-sm font-bold text-[var(--secondary)]">
                    Marriott School of Business
                  </p>
                  <p className="text-[var(--on-surface-variant)]">B.S. Information Systems</p>
                  <p className="mt-4 font-bold text-[var(--primary)]">
                    3.98 GPA | Full-tuition Academic Scholarship
                  </p>
                </div>
              </GlowingShadow>
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--tertiary)]">
                Recognition
              </span>
              <h2 className="mb-12 mt-2 font-heading text-4xl font-bold text-[var(--primary)]">
                Awards & Honors
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <Sparkles className="text-[var(--tertiary)]" />
                  <div>
                    <p className="font-heading font-bold text-[var(--primary)]">Eagle Scout</p>
                    <p className="text-sm text-[var(--secondary)]">Boy Scouts of America</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Megaphone className="text-[var(--tertiary)]" />
                  <div>
                    <p className="font-heading font-bold text-[var(--primary)]">
                      BYU Connect Brand Ambassador
                    </p>
                    <p className="text-sm text-[var(--secondary)]">
                      Promoting professional networking within the student body
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#0e1c2b] py-24 text-white">
          <div className="mx-auto max-w-7xl px-8 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#4cd6ff]">
              Get In Touch
            </span>
            <h2 className="mb-8 mt-4 font-heading text-5xl font-bold md:text-7xl">
              Let&apos;s analyze the future.
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-[#bac8dc]">
              Open to opportunities in data analytics, information systems, and
              technical development.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                className="flex items-center gap-3 rounded-md bg-[#001f28] px-8 py-4 font-heading font-bold transition-transform hover:scale-[1.05]"
                href="mailto:carn0@byu.edu"
                aria-label="Email Ethan"
              >
                <Mail size={18} />
                Email Ethan
              </a>
              <div className="flex gap-4">
                <a
                  className="flex h-14 w-14 items-center justify-center rounded-md border border-[color:rgb(198_197_212/.3)] transition-colors hover:bg-[#f3f4f5] hover:text-[#0e1c2b]"
                  href="https://www.linkedin.com/in/ethan-carn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <UserPlus size={18} />
                </a>
                <a
                  className="flex h-14 w-14 items-center justify-center rounded-md border border-[color:rgb(198_197_212/.3)] transition-colors hover:bg-[#f3f4f5] hover:text-[#0e1c2b]"
                  href="https://github.com/ethanwcarn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Terminal size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#d9dadb] bg-[#f8f9fa] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 md:flex-row">
          <div className="font-heading text-lg font-bold text-blue-900">ETHAN W. CARN</div>
          <div className="text-sm tracking-wide text-slate-500">
            © 2024 ETHAN W. CARN. Precision in Data.
          </div>
          <div className="flex gap-6">
            <a
              className="text-sm text-slate-500 underline underline-offset-4 transition-colors hover:text-blue-700"
              href="https://www.linkedin.com/in/ethan-carn"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-sm text-slate-500 underline underline-offset-4 transition-colors hover:text-blue-700"
              href="https://github.com/ethanwcarn"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="text-sm text-slate-500 underline underline-offset-4 transition-colors hover:text-blue-700"
              href="mailto:carn0@byu.edu"
            >
              Email
            </a>
            <a className="text-sm text-slate-500 underline underline-offset-4 transition-colors hover:text-blue-700" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
