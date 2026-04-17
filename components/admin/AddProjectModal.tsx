"use client";

import { useRef, useState } from "react";
import type { Project } from "@/lib/content";

interface AddProjectModalProps {
  onAdd: (project: Project) => void;
  onClose: () => void;
}

export function AddProjectModal({ onAdd, onClose }: AddProjectModalProps) {
  const [form, setForm] = useState<Project>({
    tag: "",
    title: "",
    text: "",
    href: "",
    image: "",
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleImageFile(file: File) {
    setImageError("");
    if (!file.type.startsWith("image/")) {
      setImageError("Image files only");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setImageError("Image must be under 10 MB");
      return;
    }
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/admin/upload-image", { method: "POST", body: fd });
      if (!res.ok) {
        const d = await res.json();
        setImageError(d.error ?? "Upload failed");
      } else {
        const { url } = await res.json();
        setForm((f) => ({ ...f, image: url as string }));
      }
    } catch {
      setImageError("Upload failed — try again");
    } finally {
      setImageUploading(false);
    }
  }

  function handleSubmit() {
    if (!form.title.trim() || !form.image) return;
    setSubmitting(true);
    onAdd(form);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-xl bg-[#0e1c2b] p-8 text-white shadow-2xl">
        <h2 className="mb-6 font-heading text-xl font-bold tracking-tight">Add Project</h2>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4cd6ff]">Title *</span>
            <input
              className="rounded-md bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/30 focus:ring-2 focus:ring-[#4cd6ff]"
              placeholder="My Project (2025)"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4cd6ff]">Category</span>
            <input
              className="rounded-md bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/30 focus:ring-2 focus:ring-[#4cd6ff]"
              placeholder="Full-Stack Development"
              value={form.tag}
              onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4cd6ff]">Description</span>
            <textarea
              className="rounded-md bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/30 focus:ring-2 focus:ring-[#4cd6ff]"
              placeholder="Brief description of the project…"
              rows={3}
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4cd6ff]">URL</span>
            <input
              className="rounded-md bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/30 focus:ring-2 focus:ring-[#4cd6ff]"
              placeholder="https://example.com"
              value={form.href}
              onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))}
            />
          </label>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4cd6ff]">Project Image *</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageFile(file);
                e.target.value = "";
              }}
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={imageUploading}
                className="rounded px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                style={{
                  border: "1.5px dashed #4cd6ff",
                  color: "#4cd6ff",
                  background: "rgba(76,214,255,0.06)",
                }}
              >
                {imageUploading ? "Uploading…" : form.image ? "Replace Image" : "Upload Image"}
              </button>
              {form.image && (
                <span className="text-xs text-green-400">✓ Image uploaded</span>
              )}
              {imageError && (
                <span className="text-xs text-red-400">{imageError}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-5 py-2 text-sm font-bold text-white/60 transition-colors hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!form.title.trim() || !form.image || submitting}
            className="rounded-md bg-[#4cd6ff] px-6 py-2 text-sm font-bold text-[#0e1c2b] transition-all hover:scale-[1.03] disabled:opacity-40"
          >
            {submitting ? "Adding…" : "Add Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
