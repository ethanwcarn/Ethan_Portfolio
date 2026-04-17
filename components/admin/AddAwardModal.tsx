"use client";

import { useState } from "react";
import type { Award } from "@/lib/content";

interface AddAwardModalProps {
  onAdd: (award: Award) => void;
  onClose: () => void;
}

export function AddAwardModal({ onAdd, onClose }: AddAwardModalProps) {
  const [form, setForm] = useState<Award>({ title: "", org: "" });

  function handleSubmit() {
    if (!form.title.trim()) return;
    onAdd(form);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-xl bg-[#0e1c2b] p-8 text-white shadow-2xl">
        <h2 className="mb-6 font-heading text-xl font-bold tracking-tight">Add Award</h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="award-title" className="text-xs font-bold uppercase tracking-widest text-[#4cd6ff]">
              Award Title *
            </label>
            <input
              id="award-title"
              autoFocus
              className="rounded-md bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#4cd6ff]"
              placeholder="2nd Place — Utah State Hackathon"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="award-org" className="text-xs font-bold uppercase tracking-widest text-[#4cd6ff]">
              Description / Organization
            </label>
            <textarea
              id="award-org"
              className="rounded-md bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#4cd6ff]"
              placeholder="Built Flock, a college rideshare app…"
              rows={3}
              value={form.org}
              onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
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
            disabled={!form.title.trim()}
            className="rounded-md bg-[#4cd6ff] px-6 py-2 text-sm font-bold text-[#0e1c2b] transition-all hover:scale-[1.03] disabled:opacity-40"
          >
            Add Award
          </button>
        </div>
      </div>
    </div>
  );
}
