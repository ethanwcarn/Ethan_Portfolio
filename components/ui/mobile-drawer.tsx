"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, BriefcaseBusiness, FolderOpen, Mail, FileText } from "lucide-react";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  resumeUrl?: string;
}

const navItems = [
  { icon: User,             label: "About",      href: "#about"      },
  { icon: BriefcaseBusiness,label: "Experience", href: "#experience" },
  { icon: FolderOpen,       label: "Projects",   href: "#projects"   },
  { icon: Mail,             label: "Contact",    href: "#contact"    },
  { icon: FileText,         label: "Resume",     href: "/resume"     },
];

export function MobileDrawer({ open, onClose, isDark, onToggleTheme, resumeUrl }: MobileDrawerProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed right-0 top-0 z-[70] flex h-full w-72 flex-col bg-white shadow-2xl dark:bg-[#0e1c2b]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-[#1e3040]">
              <span className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#0e1c2b] dark:text-white">
                Menu
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#47607e] transition-colors hover:bg-slate-100 hover:text-[#0e1c2b] dark:text-[#8ba8c4] dark:hover:bg-[#1a2a3a] dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                if (item.label === "Resume" && !resumeUrl) return null;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[#47607e] transition-all duration-200 hover:bg-slate-50 hover:text-[#0e1c2b] dark:text-[#8ba8c4] dark:hover:bg-[#152333] dark:hover:text-white"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0e1c2b] transition-colors group-hover:bg-[#0e1c2b] group-hover:text-white dark:bg-[#1a2a3a] dark:text-[#4cd6ff] dark:group-hover:bg-[#4cd6ff] dark:group-hover:text-[#0e1c2b]">
                      <Icon size={17} />
                    </span>
                    <span className="font-heading font-semibold tracking-tight">{item.label}</span>
                    <span className="ml-auto text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 dark:text-[#2a3f52]">
                      →
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Footer — theme toggle */}
            <div className="border-t border-slate-100 px-6 py-5 dark:border-[#1e3040]">
              <button
                onClick={onToggleTheme}
                className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-[#47607e] transition-colors hover:bg-slate-50 hover:text-[#0e1c2b] dark:text-[#8ba8c4] dark:hover:bg-[#152333] dark:hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-[#1a2a3a]">
                  {isDark ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4cd6ff]"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0e1c2b]"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  )}
                </span>
                <span className="font-heading font-semibold tracking-tight">
                  {isDark ? "Light mode" : "Dark mode"}
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
