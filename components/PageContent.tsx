"use client";

import Image from "next/image";
import { GlowingShadow } from "@/components/ui/glowing-shadow";
import HoverGradientNavBar from "@/components/ui/hover-gradient-nav-bar";
import dynamic from "next/dynamic";
const BackgroundPaths = dynamic(
  () => import("@/components/ui/background-paths").then((m) => m.BackgroundPaths),
  { ssr: false }
);
import {
  ArrowRight,
  BarChart3,
  Code2,
  Database,
  ExternalLink,
  LogOut,
  Mail,
  Menu,
  Megaphone,
  Pencil,
  Sparkles,
  Terminal,
  UserPlus,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useAdmin } from "@/components/admin/AdminContext";
import { EditableText } from "@/components/admin/EditableText";
import { ResumeUpload } from "@/components/admin/ResumeUpload";
import { AddProjectModal } from "@/components/admin/AddProjectModal";
import type { SiteContent, Project } from "@/lib/content";

interface PageContentProps {
  initialContent: SiteContent;
}

export default function PageContent({ initialContent }: PageContentProps) {
  const { isAdmin, content: ctxContent, setContent: setCtxContent } = useAdmin();
  const [localContent, setLocalContent] = useState<SiteContent>(initialContent);

  // When admin activates, seed context with the server-fetched content (not hardcoded defaults)
  useEffect(() => {
    if (isAdmin) {
      setCtxContent(localContent);
    }
  }, [isAdmin]); // eslint-disable-line react-hooks/exhaustive-deps

  // Use context content when admin (so AdminContext stays in sync), otherwise local
  const content = isAdmin ? ctxContent : localContent;

  const update = useCallback(
    async (patch: Partial<SiteContent>) => {
      const next = { ...content, ...patch };
      setLocalContent(next);
      setCtxContent(next);

      if (isAdmin) {
        await fetch("/api/admin/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
      }
    },
    [content, isAdmin, setCtxContent],
  );

  const handleSignOut = useCallback(async () => {
    // Final save before clearing session
    await fetch("/api/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    await fetch("/api/admin/logout", { method: "POST" });
    // Hard redirect — destroys React state so isAdmin resets to false on reload
    window.location.href = "/";
  }, [content]);

  // Helper for deeply nested array updates
  function updateExperienceRole(
    idx: number,
    field: "title" | "org" | "years" | "description",
    value: string,
  ) {
    const roles = content.experienceRoles.map((r, i) =>
      i === idx ? { ...r, [field]: value } : r,
    );
    update({ experienceRoles: roles });
  }

  function updateProject(
    idx: number,
    field: "tag" | "title" | "text",
    value: string,
  ) {
    const projects = content.projects.map((p, i) =>
      i === idx ? { ...p, [field]: value } : p,
    );
    update({ projects });
  }

  function updateStat(idx: number, field: "value" | "label", value: string) {
    const stats = content.aboutStats.map((s, i) =>
      i === idx ? { ...s, [field]: value } : s,
    );
    update({ aboutStats: stats });
  }

  function updateAward(idx: number, field: "title" | "org", value: string) {
    const awards = content.awards.map((a, i) =>
      i === idx ? { ...a, [field]: value } : a,
    );
    update({ awards });
  }

  function updateSkillDev(idx: number, value: string) {
    const skillsDevelopment = content.skillsDevelopment.map((s, i) =>
      i === idx ? value : s,
    );
    update({ skillsDevelopment });
  }

  function updateSkillBi(idx: number, value: string) {
    const skillsDataAndBi = content.skillsDataAndBi.map((s, i) =>
      i === idx ? value : s,
    );
    update({ skillsDataAndBi });
  }

  const [showAddProject, setShowAddProject] = useState(false);

  function addProject(project: Project) {
    update({ projects: [...content.projects, project] });
    setShowAddProject(false);
  }

  function deleteProject(idx: number) {
    update({ projects: content.projects.filter((_, i) => i !== idx) });
  }

  return (
    <>
      <BackgroundPaths title={content.heroTitle} />

      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <div className="font-heading text-xl font-bold tracking-tighter text-[#0e1c2b]">
            <EditableText
              value={content.brandName}
              onSave={(v) => update({ brandName: v })}
              as="span"
            />
          </div>
          {/* Nav links + admin controls */}
          <div className="flex items-center gap-3">
            {/* Desktop nav links */}
            <div className="hidden md:flex">
              <HoverGradientNavBar mode="inline" preset="portfolio" />
            </div>

            {/* Edit Page — desktop, visible to non-admins */}
            {!isAdmin && (
              <a
                href="/admin"
                className="hidden items-center gap-2 rounded-2xl border border-gray-200/80 bg-white/60 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 md:flex"
              >
                <Pencil size={14} />
                Edit Page
              </a>
            )}

            {/* Sign Out — desktop, visible to admins */}
            {isAdmin && (
              <button
                onClick={handleSignOut}
                className="hidden items-center gap-2 rounded-md bg-[#0e1c2b] px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] md:flex"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            )}

            {/* Edit Page — mobile icon */}
            {!isAdmin && (
              <a
                href="/admin"
                aria-label="Edit page"
                className="flex items-center justify-center p-1 text-[#0e1c2b] md:hidden"
              >
                <Pencil size={20} />
              </a>
            )}

            {/* Sign Out — mobile icon */}
            {isAdmin && (
              <button
                onClick={handleSignOut}
                aria-label="Sign out"
                className="flex items-center justify-center p-1 text-[#0e1c2b] md:hidden"
              >
                <LogOut size={20} />
              </button>
            )}

            {/* Mobile hamburger menu */}
            <button
              aria-label="Open navigation menu"
              className="flex items-center justify-center p-1 md:hidden"
            >
              <Menu className="text-[#0e1c2b]" size={22} />
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* ── About ─────────────────────────────────────────────────────────── */}
        <section
          id="about"
          className="relative mx-auto flex min-h-[600px] max-w-7xl items-center overflow-hidden px-6 sm:min-h-[819px] sm:px-8"
        >
          <div className="grid w-full items-center gap-12 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-4">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#001f28]">
                  <EditableText
                    value={content.aboutEyebrow}
                    onSave={(v) => update({ aboutEyebrow: v })}
                    as="span"
                  />
                </span>
                <h1 className="font-heading text-5xl font-bold leading-tight tracking-tighter text-[#0e1c2b] sm:text-6xl md:text-8xl">
                  <EditableText
                    value={content.aboutName}
                    onSave={(v) => update({ aboutName: v })}
                    as="span"
                  />{" "}
                  <span className="text-[#47607e]">
                    <EditableText
                      value={content.aboutNameSuffix}
                      onSave={(v) => update({ aboutNameSuffix: v })}
                      as="span"
                    />
                  </span>
                </h1>
                <p className="max-w-xl text-xl leading-relaxed text-[#47607e]">
                  <EditableText
                    value={content.aboutBio}
                    onSave={(v) => update({ aboutBio: v })}
                    as="span"
                    multiline
                  />
                </p>
              </div>

              <div className="flex flex-wrap gap-8 pt-4 sm:gap-12">
                {content.aboutStats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="block font-heading text-4xl font-bold text-[#0e1c2b]">
                      <EditableText
                        value={stat.value}
                        onSave={(v) => updateStat(idx, "value", v)}
                        as="span"
                      />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#47607e]">
                      <EditableText
                        value={stat.label}
                        onSave={(v) => updateStat(idx, "label", v)}
                        as="span"
                      />
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
                  <EditableText
                    value={content.aboutCta}
                    onSave={(v) => update({ aboutCta: v })}
                    as="span"
                  />{" "}
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="relative hidden lg:col-span-5 lg:block">
              <div className="aspect-square rounded-full border border-[color:rgb(198_197_212/.2)] bg-[#f3f4f5] p-8">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={content.headshotSrc}
                    alt={content.headshotAlt}
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
                        <EditableText
                          value={content.statusBadge.label}
                          onSave={(v) =>
                            update({ statusBadge: { ...content.statusBadge, label: v } })
                          }
                          as="span"
                        />
                      </p>
                      <p className="font-heading text-sm font-bold text-[#0e1c2b]">
                        <EditableText
                          value={content.statusBadge.value}
                          onSave={(v) =>
                            update({ statusBadge: { ...content.statusBadge, value: v } })
                          }
                          as="span"
                        />
                      </p>
                    </div>
                  </div>
                </GlowingShadow>
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills ───────────────────────────────────────────────────────── */}
        <section className="bg-[#f3f4f5] py-24">
          <div className="mx-auto max-w-7xl px-8">
            <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-xl">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#001f28]">
                  <EditableText
                    value={content.skillsEyebrow}
                    onSave={(v) => update({ skillsEyebrow: v })}
                    as="span"
                  />
                </span>
                <h2 className="mt-2 font-heading text-4xl font-bold text-[#0e1c2b] md:text-5xl">
                  <EditableText
                    value={content.skillsHeading}
                    onSave={(v) => update({ skillsHeading: v })}
                    as="span"
                  />
                </h2>
              </div>
              <p className="max-w-sm text-[#47607e]">
                <EditableText
                  value={content.skillsDescription}
                  onSave={(v) => update({ skillsDescription: v })}
                  as="span"
                  multiline
                />
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
                      {content.skillsDevelopment.map((skill, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-[#c2dcff] px-4 py-2 text-xs font-bold text-[#001d36]"
                        >
                          <EditableText
                            value={skill}
                            onSave={(v) => updateSkillDev(idx, v)}
                            as="span"
                          />
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
                    <h3 className="mb-6 font-heading text-2xl font-bold">Data &amp; BI</h3>
                    <ul className="space-y-4">
                      {content.skillsDataAndBi.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#4cd6ff]" />
                          <EditableText
                            value={item}
                            onSave={(v) => updateSkillBi(idx, v)}
                            as="span"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowingShadow>
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience ───────────────────────────────────────────────────── */}
        <section id="experience" className="bg-[var(--surface)] py-24">
          <div className="mx-auto grid max-w-7xl gap-16 px-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="top-32 lg:sticky">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--tertiary)]">
                  <EditableText
                    value={content.experienceEyebrow}
                    onSave={(v) => update({ experienceEyebrow: v })}
                    as="span"
                  />
                </span>
                <h2 className="mt-2 font-heading text-4xl font-bold text-[var(--primary)] md:text-5xl">
                  <EditableText
                    value={content.experienceHeading}
                    onSave={(v) => update({ experienceHeading: v })}
                    as="span"
                  />
                </h2>
                <p className="mt-6 leading-relaxed text-[var(--secondary)]">
                  <EditableText
                    value={content.experienceDescription}
                    onSave={(v) => update({ experienceDescription: v })}
                    as="span"
                    multiline
                  />
                </p>
              </div>
            </div>
            <div className="space-y-12 lg:col-span-8">
              {content.experienceRoles.map((role, idx) => (
                <div
                  key={idx}
                  className="relative pl-8 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-px before:bg-[var(--outline-variant)]"
                >
                  <GlowingShadow>
                    <div className="rounded-xl bg-white p-8">
                      <div className="mb-4 flex flex-col items-start justify-between md:flex-row">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-[var(--primary)]">
                            <EditableText
                              value={role.title}
                              onSave={(v) => updateExperienceRole(idx, "title", v)}
                              as="span"
                            />
                          </h3>
                          <p className="text-sm font-bold text-[var(--secondary)]">
                            <EditableText
                              value={role.org}
                              onSave={(v) => updateExperienceRole(idx, "org", v)}
                              as="span"
                            />
                          </p>
                        </div>
                        <span className="rounded bg-[var(--surface-container)] px-3 py-1 text-sm text-[var(--on-surface-variant)]">
                          <EditableText
                            value={role.years}
                            onSave={(v) => updateExperienceRole(idx, "years", v)}
                            as="span"
                          />
                        </span>
                      </div>
                      <p className="text-[var(--on-surface-variant)]">
                        <EditableText
                          value={role.description}
                          onSave={(v) => updateExperienceRole(idx, "description", v)}
                          as="span"
                          multiline
                        />
                      </p>
                    </div>
                  </GlowingShadow>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ─────────────────────────────────────────────────────── */}
        <section id="projects" className="bg-[#f3f4f5] py-24">
          <div className="mx-auto max-w-7xl px-8">
            <div className="mb-16">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#001f28]">
                <EditableText
                  value={content.projectsEyebrow}
                  onSave={(v) => update({ projectsEyebrow: v })}
                  as="span"
                />
              </span>
              <h2 className="mt-2 font-heading text-4xl font-bold text-[#0e1c2b] md:text-5xl">
                <EditableText
                  value={content.projectsHeading}
                  onSave={(v) => update({ projectsHeading: v })}
                  as="span"
                />
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {content.projects.map((project, idx) => (
                <article key={idx} className="group relative">
                  {isAdmin && (
                    <button
                      onClick={() => deleteProject(idx)}
                      aria-label={`Delete ${project.title}`}
                      className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white opacity-0 shadow transition-opacity group-hover:opacity-100 hover:bg-red-700"
                      title="Delete project"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  )}
                  <GlowingShadow>
                    <div className="overflow-hidden rounded-xl bg-white">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={70}
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-8">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#001f28]">
                          <EditableText
                            value={project.tag}
                            onSave={(v) => updateProject(idx, "tag", v)}
                            as="span"
                          />
                        </span>
                        <h3 className="mb-4 font-heading text-2xl font-bold text-[#0e1c2b]">
                          <EditableText
                            value={project.title}
                            onSave={(v) => updateProject(idx, "title", v)}
                            as="span"
                          />
                        </h3>
                        <p className="mb-6 text-sm text-[#454652]">
                          <EditableText
                            value={project.text}
                            onSave={(v) => updateProject(idx, "text", v)}
                            as="span"
                            multiline
                          />
                        </p>
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
            {isAdmin && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setShowAddProject(true)}
                  className="flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors"
                  style={{
                    border: "1.5px dashed #4cd6ff",
                    color: "#4cd6ff",
                    background: "rgba(76,214,255,0.06)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  Add Project
                </button>
              </div>
            )}
            {showAddProject && (
              <AddProjectModal onAdd={addProject} onClose={() => setShowAddProject(false)} />
            )}
          </div>
        </section>

        {/* ── Education & Awards ───────────────────────────────────────────── */}
        <section className="bg-[var(--surface)] py-24">
          <div className="mx-auto grid max-w-7xl gap-16 px-8 md:grid-cols-2">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--tertiary)]">
                <EditableText
                  value={content.educationEyebrow}
                  onSave={(v) => update({ educationEyebrow: v })}
                  as="span"
                />
              </span>
              <h2 className="mb-12 mt-2 font-heading text-4xl font-bold text-[var(--primary)]">
                <EditableText
                  value={content.educationHeading}
                  onSave={(v) => update({ educationHeading: v })}
                  as="span"
                />
              </h2>
              <GlowingShadow>
                <div className="rounded-xl border-l-4 border-[var(--primary)] bg-[var(--surface-container-low)] p-8">
                  <h3 className="font-heading text-xl font-bold text-[var(--primary)]">
                    <EditableText
                      value={content.educationSchool}
                      onSave={(v) => update({ educationSchool: v })}
                      as="span"
                    />
                  </h3>
                  <p className="mb-4 text-sm font-bold text-[var(--secondary)]">
                    <EditableText
                      value={content.educationSchoolSub}
                      onSave={(v) => update({ educationSchoolSub: v })}
                      as="span"
                    />
                  </p>
                  <p className="text-[var(--on-surface-variant)]">
                    <EditableText
                      value={content.educationDegree}
                      onSave={(v) => update({ educationDegree: v })}
                      as="span"
                    />
                  </p>
                  <p className="mt-4 font-bold text-[var(--primary)]">
                    <EditableText
                      value={content.educationGpa}
                      onSave={(v) => update({ educationGpa: v })}
                      as="span"
                    />
                  </p>
                </div>
              </GlowingShadow>
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--tertiary)]">
                <EditableText
                  value={content.awardsEyebrow}
                  onSave={(v) => update({ awardsEyebrow: v })}
                  as="span"
                />
              </span>
              <h2 className="mb-12 mt-2 font-heading text-4xl font-bold text-[var(--primary)]">
                <EditableText
                  value={content.awardsHeading}
                  onSave={(v) => update({ awardsHeading: v })}
                  as="span"
                />
              </h2>
              <ul className="space-y-6">
                {content.awards.map((award, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    {idx === 0 ? (
                      <Sparkles className="text-[var(--tertiary)]" />
                    ) : (
                      <Megaphone className="text-[var(--tertiary)]" />
                    )}
                    <div>
                      <p className="font-heading font-bold text-[var(--primary)]">
                        <EditableText
                          value={award.title}
                          onSave={(v) => updateAward(idx, "title", v)}
                          as="span"
                        />
                      </p>
                      <p className="text-sm text-[var(--secondary)]">
                        <EditableText
                          value={award.org}
                          onSave={(v) => updateAward(idx, "org", v)}
                          as="span"
                        />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────────── */}
        <section id="contact" className="bg-[#0e1c2b] py-24 text-white">
          <div className="mx-auto max-w-7xl px-8 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#4cd6ff]">
              <EditableText
                value={content.contactEyebrow}
                onSave={(v) => update({ contactEyebrow: v })}
                as="span"
              />
            </span>
            <h2 className="mb-8 mt-4 font-heading text-5xl font-bold md:text-7xl">
              <EditableText
                value={content.contactHeading}
                onSave={(v) => update({ contactHeading: v })}
                as="span"
              />
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-[#bac8dc]">
              <EditableText
                value={content.contactDescription}
                onSave={(v) => update({ contactDescription: v })}
                as="span"
                multiline
              />
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                className="flex items-center gap-3 rounded-md bg-[#001f28] px-8 py-4 font-heading font-bold transition-transform hover:scale-[1.05]"
                href={`mailto:${content.email}`}
                aria-label="Email Ethan"
              >
                <Mail size={18} />
                Email Ethan
              </a>
              {content.resumeUrl && (
                <a
                  className="flex items-center gap-3 rounded-md border border-[color:rgb(198_197_212/.3)] px-8 py-4 font-heading font-bold transition-transform hover:scale-[1.05]"
                  href={content.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Resume"
                >
                  Resume
                </a>
              )}
              {isAdmin && (
                <ResumeUpload
                  onSave={(url) => update({ resumeUrl: url })}
                  currentUrl={content.resumeUrl}
                  onDelete={() => update({ resumeUrl: "" })}
                />
              )}
              <div className="flex gap-4">
                <a
                  className="flex h-14 w-14 items-center justify-center rounded-md border border-[color:rgb(198_197_212/.3)] transition-colors hover:bg-[#f3f4f5] hover:text-[#0e1c2b]"
                  href={content.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <UserPlus size={18} />
                </a>
                <a
                  className="flex h-14 w-14 items-center justify-center rounded-md border border-[color:rgb(198_197_212/.3)] transition-colors hover:bg-[#f3f4f5] hover:text-[#0e1c2b]"
                  href={content.githubUrl}
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

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="w-full border-t border-[#d9dadb] bg-[#f8f9fa] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 md:flex-row">
          <div className="font-heading text-lg font-bold text-blue-900">
            <EditableText
              value={content.footerName}
              onSave={(v) => update({ footerName: v })}
              as="span"
            />
          </div>
          <div className="text-sm tracking-wide text-slate-600">
            <EditableText
              value={content.footerCopyright}
              onSave={(v) => update({ footerCopyright: v })}
              as="span"
            />
          </div>
          <div className="flex gap-6">
            {content.footerLinks.map((link, idx) => (
              <a
                key={idx}
                className="text-sm text-slate-600 underline underline-offset-4 transition-colors hover:text-blue-700"
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
