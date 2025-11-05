import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'content',
  docs: {
    schema: (ctx) => {
      return {
        ...ctx.schema,
        frontmatter: z.object({
          title: z.string(),
          description: z.string().optional(),
          tags: z.string().optional(),
          date: z.string().or(z.date()).optional(),
        }),
      };
    },
  },
});

export default defineConfig();
