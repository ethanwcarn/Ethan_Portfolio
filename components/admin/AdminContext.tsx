"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Suspense,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { defaultContent, type SiteContent } from "@/lib/content";

interface AdminContextValue {
  isAdmin: boolean;
  content: SiteContent;
  setContent: (c: SiteContent) => void;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  content: defaultContent,
  setContent: () => undefined,
});

export function useAdmin() {
  return useContext(AdminContext);
}

// Inner component that reads search params (must be inside Suspense)
function AdminProviderInner({
  children,
  initialContent,
}: {
  children: ReactNode;
  initialContent: SiteContent;
}) {
  const searchParams = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<SiteContent>(initialContent);

  useEffect(() => {
    if (searchParams.get("admin") === "true") {
      fetch("/api/admin/verify")
        .then((res) => {
          if (res.ok) setIsAdmin(true);
        })
        .catch(() => undefined);
    }
  }, [searchParams]);

  return (
    <AdminContext.Provider value={{ isAdmin, content, setContent }}>
      {children}
    </AdminContext.Provider>
  );
}

export function AdminProvider({
  children,
  initialContent,
}: {
  children: ReactNode;
  initialContent: SiteContent;
}) {
  return (
    <Suspense fallback={null}>
      <AdminProviderInner initialContent={initialContent}>
        {children}
      </AdminProviderInner>
    </Suspense>
  );
}
