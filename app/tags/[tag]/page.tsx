import { getToolsByTag, getAllTagsList } from '@/lib/tags';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const tags = getAllTagsList();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} Tools`,
    description: `Browse all tools tagged with "${tag}"`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const tools = getToolsByTag(tag);

  if (tools.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/tags"
          className="text-sm text-fd-muted-foreground hover:text-fd-primary transition-colors mb-4 inline-block"
        >
          ← All Tags
        </Link>
        <h1 className="text-4xl font-bold capitalize">{tag}</h1>
        <p className="text-fd-muted-foreground mt-2">
          {tools.length} {tools.length === 1 ? 'tool' : 'tools'} found
        </p>
      </div>

      <div className="space-y-4">
        {tools.map((tool) => (
          <Link
            key={tool.url}
            href={tool.url}
            className="block p-6 border rounded-lg hover:bg-fd-accent transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">
              {tool.data.title || 'Untitled'}
            </h2>
            {tool.data.description && (
              <p className="text-fd-muted-foreground">
                {tool.data.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
