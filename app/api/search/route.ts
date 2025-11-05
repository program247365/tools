import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { parseTags } from '@/lib/tags';
import { NextRequest, NextResponse } from 'next/server';
import type { CustomFrontmatter } from '@/lib/types';

// Create the default search handler
const { GET: defaultGET } = createFromSource(source, {
  language: 'english',
});

// Wrap the default handler to add tags to results
export async function GET(request: NextRequest) {
  const response = await defaultGET(request);

  // If the response is not JSON or failed, return as is
  if (!response.ok) {
    return response;
  }

  try {
    const data = await response.json();

    // Add tags to each result if available
    if (Array.isArray(data)) {
      const enrichedData = data.map((result) => {
        // Get the page data from source
        const page = source.getPage(result.id?.split('/').filter(Boolean));
        const pageData = page?.data as any;
        const frontmatter = pageData?._exports?.frontmatter as CustomFrontmatter | undefined;
        const tags = frontmatter ? parseTags(frontmatter.tags) : [];

        return {
          ...result,
          tags,
        };
      });

      return NextResponse.json(enrichedData);
    }

    return NextResponse.json(data);
  } catch (error) {
    // If JSON parsing fails, return original response
    return response;
  }
}
