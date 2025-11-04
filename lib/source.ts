import { docs, meta } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx/runtime/next';

export const source = loader({
  baseUrl: '/',
  source: createMDXSource(docs, meta),
});
