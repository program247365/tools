import { source } from '@/lib/source';
import type { CustomFrontmatter } from '@/lib/types';

/**
 * Parse comma-separated tags string into an array of trimmed, lowercase tags
 */
export function parseTags(tags: string | undefined): string[] {
  if (!tags) return [];
  return tags
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);
}

/**
 * Get all unique tags across all pages with their counts
 * Returns a Map of tag -> count
 */
export function getAllTags(): Map<string, number> {
  const tagCounts = new Map<string, number>();
  const pages = source.getPages();

  for (const page of pages) {
    // Access custom frontmatter from _exports
    const pageData = page.data as any;
    const frontmatter = pageData._exports?.frontmatter as CustomFrontmatter | undefined;
    const tags = parseTags(frontmatter?.tags);
    for (const tag of tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }

  return tagCounts;
}

/**
 * Get all pages that have a specific tag
 */
export function getToolsByTag(tag: string) {
  const normalizedTag = tag.toLowerCase().trim();
  const pages = source.getPages();

  return pages.filter((page) => {
    const pageData = page.data as any;
    const frontmatter = pageData._exports?.frontmatter as CustomFrontmatter | undefined;
    const tags = parseTags(frontmatter?.tags);
    return tags.includes(normalizedTag);
  });
}

/**
 * Get all unique tags as a sorted array
 */
export function getAllTagsList(): string[] {
  const tagCounts = getAllTags();
  return Array.from(tagCounts.keys()).sort();
}
