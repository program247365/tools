import { source } from '@/lib/source';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const Body = page.body;

  return (
    <article className="prose prose-gray max-w-none">
      <h1>{page.title || 'Untitled'}</h1>
      {page.description && (
        <p className="text-xl text-muted-foreground">{page.description}</p>
      )}
      <Body />
    </article>
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
    title: page.title || 'Untitled',
    description: page.description,
  };
}
