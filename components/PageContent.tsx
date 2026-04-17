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
  Menu,
  Megaphone,
  Pencil,
  Sparkles,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useAdmin } from "@/components/admin/AdminContext";
import { EditableText } from "@/components/admin/EditableText";
import { ResumeUpload } from "@/components/admin/ResumeUpload";
import { AddProjectModal } from "@/components/admin/AddProjectModal";
import { BackgroundSelector } from "@/components/admin/BackgroundSelector";
import { DotPattern } from "@/components/ui/dot-pattern";
import { GridPattern } from "@/components/ui/grid-pattern";
import { AddRoleModal } from "@/components/admin/AddRoleModal";
import { AddAwardModal } from "@/components/admin/AddAwardModal";
import type { SiteContent, Project, ExperienceRole, Award } from "@/lib/content";

interface PageContentProps {
  initialContent: SiteContent;
}

export default function PageContent({ initialContent }: PageContentProps) {
  const { isAdmin, content: ctxContent, setContent: setCtxContent } = useAdmin();
  const { isDark, toggle: toggleTheme } = useTheme();
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
  const [editProjectIdx, setEditProjectIdx] = useState<number | null>(null);

  function addProject(project: Project) {
    update({ projects: [...content.projects, project] });
    setShowAddProject(false);
  }

  function saveProject(idx: number, project: Project) {
    const projects = content.projects.map((p, i) => (i === idx ? project : p));
    update({ projects });
    setEditProjectIdx(null);
  }

  function deleteProject(idx: number) {
    update({ projects: content.projects.filter((_, i) => i !== idx) });
  }

  const [showAddRole, setShowAddRole] = useState(false);
  const [editRoleIdx, setEditRoleIdx] = useState<number | null>(null);

  function addRole(role: ExperienceRole) {
    update({ experienceRoles: [...content.experienceRoles, role] });
    setShowAddRole(false);
  }

  function saveRole(idx: number, role: ExperienceRole) {
    const experienceRoles = content.experienceRoles.map((r, i) => (i === idx ? role : r));
    update({ experienceRoles });
    setEditRoleIdx(null);
  }

  function deleteRole(idx: number) {
    update({ experienceRoles: content.experienceRoles.filter((_, i) => i !== idx) });
  }

  const [showAddAward, setShowAddAward] = useState(false);

  function addAward(award: Award) {
    update({ awards: [...content.awards, award] });
    setShowAddAward(false);
  }

  function deleteAward(idx: number) {
    update({ awards: content.awards.filter((_, i) => i !== idx) });
  }

  const bgStyle = content.backgroundStyle ?? "plain";
  const renderPattern = () => {
    if (bgStyle === "dots") {
      return (
        <DotPattern
          width={22}
          height={22}
          cr={1}
          className="text-[#0e1c2b]/12 dark:text-[#4cd6ff]/15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
        />
      );
    }
    if (bgStyle === "grid") {
      return (
        <GridPattern
          width={40}
          height={40}
          className="stroke-[#0e1c2b]/10 dark:stroke-[#4cd6ff]/10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
      );
    }
    return null;
  };

  return (
    <>
      {isAdmin && (
        <BackgroundSelector
          value={bgStyle}
          onChange={(v) => update({ backgroundStyle: v })}
        />
      )}
      <BackgroundPaths title={content.heroTitle} />

      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-700/60 dark:bg-[#0c1a27]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <div className="font-heading text-xl font-bold tracking-tighter text-[#0e1c2b] dark:text-white">
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

            {/* Theme toggle — always visible */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="flex items-center justify-center rounded-full p-2 text-[#0e1c2b] transition-colors hover:bg-slate-100 dark:text-[#a0b4c8] dark:hover:bg-[#1a2a3a]"
            >
              {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>

            {/* Edit Page — desktop, visible to non-admins */}
            {!isAdmin && (
              <a
                href="/admin"
                className="hidden items-center gap-2 rounded-2xl border border-gray-200/80 bg-white/60 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-slate-700/80 dark:bg-[#152333]/60 dark:text-slate-300 dark:hover:bg-[#1a2a3a] dark:hover:text-white md:flex"
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
                className="flex items-center justify-center p-1 text-[#0e1c2b] dark:text-slate-300 md:hidden"
              >
                <Pencil size={20} />
              </a>
            )}

            {/* Sign Out — mobile icon */}
            {isAdmin && (
              <button
                onClick={handleSignOut}
                aria-label="Sign out"
                className="flex items-center justify-center p-1 text-[#0e1c2b] dark:text-slate-300 md:hidden"
              >
                <LogOut size={20} />
              </button>
            )}

            {/* Mobile hamburger menu */}
            <button
              aria-label="Open navigation menu"
              className="flex items-center justify-center p-1 md:hidden"
            >
              <Menu className="text-[#0e1c2b] dark:text-slate-300" size={22} />
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
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#001f28] dark:text-[#4cd6ff]">
                  <EditableText
                    value={content.aboutEyebrow}
                    onSave={(v) => update({ aboutEyebrow: v })}
                    as="span"
                  />
                </span>
                <h1 className="font-heading text-5xl font-bold leading-tight tracking-tighter text-[#0e1c2b] dark:text-white sm:text-6xl md:text-8xl">
                  <EditableText
                    value={content.aboutName}
                    onSave={(v) => update({ aboutName: v })}
                    as="span"
                  />{" "}
                  <span className="text-[#47607e] dark:text-[#8ba8c4]">
                    <EditableText
                      value={content.aboutNameSuffix}
                      onSave={(v) => update({ aboutNameSuffix: v })}
                      as="span"
                    />
                  </span>
                </h1>
                <p className="max-w-xl text-xl leading-relaxed text-[#47607e] dark:text-[#8ba8c4]">
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
                    <span className="block font-heading text-4xl font-bold text-[#0e1c2b] dark:text-white">
                      <EditableText
                        value={stat.value}
                        onSave={(v) => updateStat(idx, "value", v)}
                        as="span"
                      />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#47607e] dark:text-[#8ba8c4]">
                      <EditableText
                        value={stat.label}
                        onSave={(v) => updateStat(idx, "label", v)}
                        as="span"
                      />
                    </span>
                    <div className="mt-2 h-0.5 w-12 bg-[#001f28] dark:bg-[#4cd6ff]" />
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
              <div className="aspect-square rounded-full border border-[color:rgb(198_197_212/.2)] bg-[#f3f4f5] p-8 dark:bg-[#152333] dark:border-[#233141]">
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
                  <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-[#233141] dark:bg-[#152333]">
                    <Database className="text-[#001f28] dark:text-[#4cd6ff]" size={36} />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight text-[#47607e] dark:text-[#8ba8c4]">
                        <EditableText
                          value={content.statusBadge.label}
                          onSave={(v) =>
                            update({ statusBadge: { ...content.statusBadge, label: v } })
                          }
                          as="span"
                        />
                      </p>
                      <p className="font-heading text-sm font-bold text-[#0e1c2b] dark:text-white">
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
        <section className="relative overflow-hidden bg-[#f3f4f5] py-24 dark:bg-[#09131c]">
          {renderPattern()}
          <div className="relative z-10 mx-auto max-w-7xl px-8">
            <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-xl">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#001f28] dark:text-[#4cd6ff]">
                  <EditableText
                    value={content.skillsEyebrow}
                    onSave={(v) => update({ skillsEyebrow: v })}
                    as="span"
                  />
                </span>
                <h2 className="mt-2 font-heading text-4xl font-bold text-[#0e1c2b] dark:text-white md:text-5xl">
                  <EditableText
                    value={content.skillsHeading}
                    onSave={(v) => update({ skillsHeading: v })}
                    as="span"
                  />
                </h2>
              </div>
              <p className="max-w-sm text-[#47607e] dark:text-[#8ba8c4]">
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
                  <div className="rounded-xl bg-white p-10 dark:bg-[#152333]">
                    <Code2 className="mb-6 text-[#0e1c2b] dark:text-[#4cd6ff]" size={36} />
                    <h3 className="mb-6 font-heading text-2xl font-bold text-[#0e1c2b] dark:text-white">
                      Development
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {content.skillsDevelopment.map((skill, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-[#c2dcff] px-4 py-2 text-xs font-bold text-[#001d36] dark:bg-[#1a3050] dark:text-[#c2dcff]"
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
                  className="group/role relative pl-8 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-px before:bg-[var(--outline-variant)]"
                >
                  <GlowingShadow>
                    <div className="rounded-xl bg-white p-8 dark:bg-[#152333]">
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
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-[var(--surface-container)] px-3 py-1 text-sm text-[var(--on-surface-variant)]">
                            <EditableText
                              value={role.years}
                              onSave={(v) => updateExperienceRole(idx, "years", v)}
                              as="span"
                            />
                          </span>
                          {isAdmin && (
                            <div className="flex gap-1 opacity-0 transition-opacity group-hover/role:opacity-100">
                              <button
                                onClick={() => setEditRoleIdx(idx)}
                                aria-label={`Edit ${role.title}`}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0e1c2b] text-white shadow transition-colors hover:bg-[#233141]"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              </button>
                              <button
                                onClick={() => deleteRole(idx)}
                                aria-label={`Delete ${role.title}`}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow transition-colors hover:bg-red-700"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                              </button>
                            </div>
                          )}
                        </div>
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
              {isAdmin && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setShowAddRole(true)}
                    className="flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors"
                    style={{
                      border: "1.5px dashed #4cd6ff",
                      color: "#4cd6ff",
                      background: "rgba(76,214,255,0.06)",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add Position
                  </button>
                </div>
              )}
              {showAddRole && (
                <AddRoleModal onAdd={addRole} onClose={() => setShowAddRole(false)} />
              )}
              {editRoleIdx !== null && (
                <AddRoleModal
                  mode="edit"
                  initialData={content.experienceRoles[editRoleIdx]}
                  onSave={(role) => saveRole(editRoleIdx, role)}
                  onClose={() => setEditRoleIdx(null)}
                />
              )}
            </div>
          </div>
        </section>

        {/* ── Projects ─────────────────────────────────────────────────────── */}
        <section id="projects" className="relative overflow-hidden bg-[#f3f4f5] py-24 dark:bg-[#09131c]">
          {renderPattern()}
          <div className="relative z-10 mx-auto max-w-7xl px-8">
            <div className="mb-16">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#001f28] dark:text-[#4cd6ff]">
                <EditableText
                  value={content.projectsEyebrow}
                  onSave={(v) => update({ projectsEyebrow: v })}
                  as="span"
                />
              </span>
              <h2 className="mt-2 font-heading text-4xl font-bold text-[#0e1c2b] dark:text-white md:text-5xl">
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
                    <div className="absolute right-3 top-3 z-10 flex gap-1 opacity-0 shadow transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => setEditProjectIdx(idx)}
                        aria-label={`Edit ${project.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0e1c2b] text-white hover:bg-[#233141]"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button
                        onClick={() => deleteProject(idx)}
                        aria-label={`Delete ${project.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    </div>
                  )}
                  <GlowingShadow>
                    <div className="overflow-hidden rounded-xl bg-white dark:bg-[#152333]">
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
                        <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#001f28] dark:text-[#4cd6ff]">
                          <EditableText
                            value={project.tag}
                            onSave={(v) => updateProject(idx, "tag", v)}
                            as="span"
                          />
                        </span>
                        <h3 className="mb-4 font-heading text-2xl font-bold text-[#0e1c2b] dark:text-white">
                          <EditableText
                            value={project.title}
                            onSave={(v) => updateProject(idx, "title", v)}
                            as="span"
                          />
                        </h3>
                        <p className="mb-6 text-sm text-[#454652] dark:text-[#a0b4c8]">
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
                            <ExternalLink className="text-[#47607e] transition-colors hover:text-[#0e1c2b] dark:text-[#8ba8c4] dark:hover:text-white" />
                          </a>
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View source for ${project.title}`}
                          >
                            <Code2 className="text-[#47607e] transition-colors hover:text-[#0e1c2b] dark:text-[#8ba8c4] dark:hover:text-white" />
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
            {editProjectIdx !== null && (
              <AddProjectModal
                mode="edit"
                initialData={content.projects[editProjectIdx]}
                onSave={(proj) => saveProject(editProjectIdx, proj)}
                onClose={() => setEditProjectIdx(null)}
              />
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
                  <li key={idx} className="group/award flex items-start gap-4">
                    {idx === 0 ? (
                      <Sparkles className="mt-0.5 shrink-0 text-[var(--tertiary)]" />
                    ) : award.title.toLowerCase().includes("hackathon") || award.title.toLowerCase().includes("place") ? (
                      <svg className="mt-0.5 shrink-0 text-[var(--tertiary)]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
                    ) : (
                      <Megaphone className="mt-0.5 shrink-0 text-[var(--tertiary)]" />
                    )}
                    <div className="flex-1">
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
                    {isAdmin && (
                      <button
                        onClick={() => deleteAward(idx)}
                        aria-label={`Delete ${award.title}`}
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-white opacity-0 shadow transition-opacity group-hover/award:opacity-100 hover:bg-red-700"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {isAdmin && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowAddAward(true)}
                    className="flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors"
                    style={{
                      border: "1.5px dashed #4cd6ff",
                      color: "#4cd6ff",
                      background: "rgba(76,214,255,0.06)",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add Award
                  </button>
                </div>
              )}
              {showAddAward && (
                <AddAwardModal onAdd={addAward} onClose={() => setShowAddAward(false)} />
              )}
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
                {/* Gmail icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.147C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
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
                  className="flex h-14 w-14 items-center justify-center rounded-md border border-[color:rgb(198_197_212/.3)] transition-colors hover:bg-[#f3f4f5] hover:text-[#0e1c2b] dark:hover:bg-[#233141] dark:hover:text-white"
                  href={content.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  {/* LinkedIn icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  className="flex h-14 w-14 items-center justify-center rounded-md border border-[color:rgb(198_197_212/.3)] transition-colors hover:bg-[#f3f4f5] hover:text-[#0e1c2b] dark:hover:bg-[#233141] dark:hover:text-white"
                  href={content.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  {/* GitHub icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="w-full border-t border-[#d9dadb] bg-[#f8f9fa] py-12 dark:border-[#1e3040] dark:bg-[#09131c]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 md:flex-row">
          <div className="font-heading text-lg font-bold text-blue-900 dark:text-[#4cd6ff]">
            <EditableText
              value={content.footerName}
              onSave={(v) => update({ footerName: v })}
              as="span"
            />
          </div>
          <div className="text-sm tracking-wide text-slate-600 dark:text-[#8ba8c4]">
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
                className="text-sm text-slate-600 underline underline-offset-4 transition-colors hover:text-blue-700 dark:text-[#8ba8c4] dark:hover:text-[#4cd6ff]"
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
