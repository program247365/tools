import { docs, meta } from '@/.source';

export const source = {
  getPage: (slugs?: string[]) => {
    const slug = slugs?.join('/') || 'index';
    return docs.find((doc) => {
      const docPath = doc.info?.path?.replace(/\.mdx$/, '') || '';
      return docPath === slug || docPath === `${slug}/index`;
    });
  },
  getPages: () => docs,
  generateParams: () => {
    return docs.map((doc) => ({
      slug: doc.info?.path?.replace(/\.mdx$/, '').split('/').filter(Boolean) || [],
    }));
  },
  pageTree: docs
    .filter((doc) => doc.info)
    .map((doc) => ({
      name: doc.title || doc.info?.path || 'Untitled',
      url: `/docs/${doc.info.path.replace(/\.mdx$/, '')}`,
    })),
};
