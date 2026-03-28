"use client";

import { useRef, useState } from "react";
import { useAdmin } from "./AdminContext";

interface ResumeUploadProps {
  onSave: (url: string) => void;
}

export function ResumeUpload({ onSave }: ResumeUploadProps) {
  const { isAdmin } = useAdmin();
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAdmin) return null;

  async function handleFile(file: File) {
    setError("");
    if (file.type !== "application/pdf") {
      setError("PDF files only");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Upload failed");
      } else {
        const { url } = await res.json();
        onSave(url as string);
      }
    } catch {
      setError("Upload failed — please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="rounded px-3 py-1 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
        style={{
          border: "1.5px dashed #4cd6ff",
          color: "#4cd6ff",
          background: "rgba(76,214,255,0.06)",
        }}
        title="Upload resume PDF"
      >
        {loading ? (
          <span className="inline-flex items-center gap-1">
            <svg
              className="animate-spin h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Uploading…
          </span>
        ) : (
          "Upload PDF"
        )}
      </button>
      {error && (
        <span className="text-xs" style={{ color: "#ff6b6b" }}>
          {error}
        </span>
      )}
    </span>
  );
}
