"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/?admin=true");
      } else {
        const data = await res.json();
        setError(data.error ?? "Login failed");
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ backgroundColor: "#0e1c2b" }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <span
            className="font-heading text-2xl font-bold tracking-tighter"
            style={{ color: "#4cd6ff" }}
          >
            ETHAN CARN
          </span>
          <p className="mt-1 text-sm" style={{ color: "#8b99ac" }}>
            Site Admin
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-xl p-8 shadow-2xl"
          style={{ backgroundColor: "#152333", border: "1px solid #233141" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#8b99ac" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                className="w-full rounded-md px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  backgroundColor: "#0e1c2b",
                  border: "1px solid #233141",
                  color: "#ffffff",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#4cd6ff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#233141";
                }}
                placeholder="Enter admin password"
              />
            </div>

            {error && (
              <p className="text-sm font-medium" style={{ color: "#ff6b6b" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md py-3 font-heading font-bold text-sm uppercase tracking-widest transition-all duration-200 disabled:opacity-60"
              style={{
                backgroundColor: "#4cd6ff",
                color: "#0e1c2b",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = "#7de4ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#4cd6ff";
              }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
