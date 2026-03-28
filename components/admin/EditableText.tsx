"use client";

import { useState, useRef, type KeyboardEvent, type ElementType } from "react";
import { useAdmin } from "./AdminContext";

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  as?: ElementType;
  multiline?: boolean;
}

export function EditableText({
  value,
  onSave,
  className,
  as: Tag = "span",
  multiline = false,
}: EditableTextProps) {
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const originalRef = useRef(value);

  // If not admin, render as the specified element with no interactivity
  if (!isAdmin) {
    return <Tag className={className}>{value}</Tag>;
  }

  function startEdit() {
    setDraft(value);
    originalRef.current = value;
    setEditing(true);
  }

  function commit() {
    setEditing(false);
    if (draft !== originalRef.current) {
      onSave(draft);
    }
  }

  function cancel() {
    setDraft(originalRef.current);
    setEditing(false);
  }

  const adminStyle: React.CSSProperties = {
    outline: "none",
    border: "1.5px dashed #4cd6ff",
    borderRadius: "3px",
    cursor: "text",
    background: "rgba(76,214,255,0.06)",
    minWidth: "2em",
    display: "inline-block",
    padding: "1px 3px",
  };

  if (!editing) {
    return (
      <Tag
        className={className}
        onClick={startEdit}
        style={adminStyle}
        title="Click to edit"
      >
        {value}
      </Tag>
    );
  }

  if (multiline) {
    return (
      <textarea
        className={className}
        value={draft}
        autoFocus
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            cancel();
          }
          if (e.key === "Escape") cancel();
        }}
        style={{
          ...adminStyle,
          width: "100%",
          resize: "vertical",
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          lineHeight: "inherit",
          color: "inherit",
        }}
        rows={3}
      />
    );
  }

  return (
    <input
      type="text"
      className={className}
      value={draft}
      autoFocus
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit();
        }
        if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          cancel();
        }
        if (e.key === "Escape") cancel();
      }}
      style={{
        ...adminStyle,
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        color: "inherit",
        width: Math.max(draft.length, 4) + "ch",
      }}
    />
  );
}
