import { getContent } from "@/lib/content";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const content = await getContent();

  if (!content.resumeUrl) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#f3f4f5]">
        <p className="font-heading text-2xl font-bold text-[#0e1c2b]">Resume coming soon.</p>
        <Link
          href="/"
          className="rounded-md bg-[#0e1c2b] px-6 py-3 font-heading font-bold text-white transition-transform hover:scale-[1.05]"
        >
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <Link
          href="/"
          className="font-heading text-sm font-bold text-[#0e1c2b] transition-opacity hover:opacity-70"
        >
          ← Back to Portfolio
        </Link>
        <a
          href={content.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-[#0e1c2b] px-4 py-2 font-heading text-sm font-bold text-white transition-transform hover:scale-[1.05]"
        >
          Open in New Tab
        </a>
      </div>
      <iframe
        src={content.resumeUrl}
        className="flex-1 w-full border-0"
        title="Ethan Carn Resume"
      />
    </div>
  );
}
