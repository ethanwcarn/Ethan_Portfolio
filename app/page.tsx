import { getContent } from "@/lib/content";
import PageContent from "@/components/PageContent";

// Force server-render on every request so blob saves are reflected immediately
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  return <PageContent initialContent={content} />;
}
