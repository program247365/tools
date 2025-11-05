import { source } from '@/lib/source';
import type { Metadata } from 'next';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { TagBadges } from '@/components/TagBadges';
import type { CustomFrontmatter } from '@/lib/types';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const pageData = page.data as any;
  const MDX = pageData.body;

  // Access custom frontmatter from _exports
  const frontmatter = pageData._exports?.frontmatter as CustomFrontmatter | undefined;

  return (
    <DocsPage toc={pageData.toc} full={false}>
      <DocsBody>
        <TagBadges tags={frontmatter?.tags} className="mb-6" />
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
