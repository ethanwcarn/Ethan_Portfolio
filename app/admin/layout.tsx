import type { ReactNode } from "react";

// Admin pages have no nav/footer chrome — just the bare page.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
