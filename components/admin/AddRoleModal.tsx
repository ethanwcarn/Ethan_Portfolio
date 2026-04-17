"use client";

import { useState } from "react";
import type { ExperienceRole } from "@/lib/content";

interface AddRoleModalProps {
  mode?: "add" | "edit";
  initialData?: ExperienceRole;
  onAdd?: (role: ExperienceRole) => void;
  onSave?: (role: ExperienceRole) => void;
  onClose: () => void;
}

export function AddRoleModal({
  mode = "add",
  initialData,
  onAdd,
  onSave,
  onClose,
}: AddRoleModalProps) {
  const [form, setForm] = useState<ExperienceRole>(
    initialData ?? { title: "", org: "", years: "", description: "" }
  );
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit() {
    if (!form.title.trim() || !form.org.trim()) return;
    setSubmitting(true);
    if (mode === "edit") {
      onSave?.(form);
    } else {
      onAdd?.(form);
    }
  }

  const isEdit = mode === "edit";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-xl bg-[#0e1c2b] p-8 text-white shadow-2xl">
        <h2 className="mb-6 font-heading text-xl font-bold tracking-tight">
          {isEdit ? "Edit Position" : "Add Position"}
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="role-title" className="text-xs font-bold uppercase tracking-widest text-[#4cd6ff]">
              Job Title *
            </label>
            <input
              id="role-title"
              className="rounded-md bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#4cd6ff]"
              placeholder="Software Engineer"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="role-org" className="text-xs font-bold uppercase tracking-widest text-[#4cd6ff]">
              Organization *
            </label>
            <input
              id="role-org"
              className="rounded-md bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#4cd6ff]"
              placeholder="Company Name"
              value={form.org}
              onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="role-years" className="text-xs font-bold uppercase tracking-widest text-[#4cd6ff]">
              Years
            </label>
            <input
              id="role-years"
              className="rounded-md bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#4cd6ff]"
              placeholder="2024 — Present"
              value={form.years}
              onChange={(e) => setForm((f) => ({ ...f, years: e.target.value }))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="role-desc" className="text-xs font-bold uppercase tracking-widest text-[#4cd6ff]">
              Description
            </label>
            <textarea
              id="role-desc"
              className="rounded-md bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#4cd6ff]"
              placeholder="Describe your responsibilities and achievements…"
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-5 py-2 text-sm font-bold text-white/70 transition-colors hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!form.title.trim() || !form.org.trim() || submitting}
            className="rounded-md bg-[#4cd6ff] px-6 py-2 text-sm font-bold text-[#0e1c2b] transition-all hover:scale-[1.03] disabled:opacity-40"
          >
            {submitting ? "Saving…" : isEdit ? "Save Changes" : "Add Position"}
          </button>
        </div>
      </div>
    </div>
  );
}
