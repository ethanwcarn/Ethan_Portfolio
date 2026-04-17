"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "ec_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if the user hasn't already responded
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-white/10 bg-[#0e1c2b] px-6 py-5 shadow-2xl"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-[#bac8dc]">
          This site uses an{" "}
          <strong className="text-white">essential session cookie</strong> for the admin
          panel, and{" "}
          <strong className="text-white">analytics cookies</strong> (Vercel Analytics &
          Speed Insights) to understand how visitors use the site. No personal data is
          sold or shared with third parties. By clicking{" "}
          <em>Accept</em>, you consent to the use of these cookies in accordance with
          applicable privacy law (GDPR / UK GDPR).{" "}
          <em>Decline</em> disables analytics; the site still works fully.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={decline}
            className="rounded-md border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#bac8dc] transition-colors hover:border-white/50 hover:text-white"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-md bg-[#4cd6ff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0e1c2b] transition-all hover:scale-[1.03]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
