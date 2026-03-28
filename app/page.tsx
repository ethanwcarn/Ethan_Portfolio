import { getContent } from "@/lib/content";
import PageContent from "@/components/PageContent";

export default async function Home() {
  const content = await getContent();
  return <PageContent initialContent={content} />;
}
