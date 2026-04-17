"use client";

import React from "react";

type BackgroundStyle = "plain" | "dots" | "grid";

interface BackgroundSelectorProps {
  value: BackgroundStyle;
  onChange: (value: BackgroundStyle) => void;
}

const options: { value: BackgroundStyle; label: string }[] = [
  { value: "plain", label: "Plain" },
  { value: "dots", label: "Dots" },
  { value: "grid", label: "Grid" },
];

export function BackgroundSelector({ value, onChange }: BackgroundSelectorProps) {
  return (
    <div className="fixed bottom-24 right-4 z-50 rounded-2xl border border-dashed border-cyan-400/60 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:bg-[#0e1c2b]/95 md:bottom-6">
      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-[#4cd6ff]">
        Background
      </div>
      <div className="flex flex-col gap-1">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={
                active
                  ? "rounded-md bg-[#0e1c2b] px-3 py-1.5 text-xs font-semibold text-white dark:bg-[#4cd6ff] dark:text-[#0e1c2b]"
                  : "rounded-md px-3 py-1.5 text-xs font-medium text-[#47607e] transition-colors hover:bg-slate-100 dark:text-[#a0b4c8] dark:hover:bg-[#1a2a3a]"
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
