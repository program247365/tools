'use client';

import { useEffect } from 'react';

/**
 * Client component that intercepts clicks on tag hash links in search results
 * and navigates to proper /tags/{tag} pages
 */
export function SearchTagFixer() {
  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find the anchor element (might be the target or a parent)
      let anchor: HTMLAnchorElement | null = null;
      if (target.tagName === 'A') {
        anchor = target as HTMLAnchorElement;
      } else {
        anchor = target.closest('a');
      }

      if (!anchor) return;

      const href = anchor.getAttribute('href') || anchor.href;

      // Check if this is a hash link (tag links are like #productivity, #video, etc.)
      // Only intercept simple hash links (no slashes, lowercase)
      if (href && href.includes('#')) {
        const hashPart = href.substring(href.indexOf('#'));
        const tag = hashPart.substring(1);

        // Only intercept if it looks like a tag (lowercase letters, hyphens, no slashes)
        if (tag && tag.length > 0 && /^[a-z0-9-]+$/.test(tag) && !tag.includes('/')) {
          // Stop all event propagation
          e.preventDefault();
          e.stopPropagation();
          if ('stopImmediatePropagation' in e) {
            e.stopImmediatePropagation();
          }

          // Navigate using window.location for reliability
          window.location.href = `/tags/${tag}`;

          return false;
        }
      }
    };

    // Attach to capture phase to intercept before other handlers
    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  return null;
}
