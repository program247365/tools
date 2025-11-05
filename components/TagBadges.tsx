import Link from 'next/link';
import { parseTags } from '@/lib/tags';

interface TagBadgesProps {
  tags: string | undefined;
  className?: string;
}

export function TagBadges({ tags, className = '' }: TagBadgesProps) {
  const tagList = parseTags(tags);

  if (tagList.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tagList.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${tag}`}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-fd-secondary/50 text-fd-secondary-foreground hover:bg-fd-primary hover:text-fd-primary-foreground dark:bg-fd-secondary/30 dark:text-fd-foreground dark:hover:bg-fd-primary dark:hover:text-fd-primary-foreground transition-colors capitalize border border-fd-border"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
