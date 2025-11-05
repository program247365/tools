import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'content',
  docs: {
    schema: frontmatterSchema.extend({
      tags: z.string().optional(),
      date: z.string().or(z.date()).optional(),
    }),
  },
});

export default defineConfig();
