import remarkDirective from 'remark-directive';
import {
  remarkDirectiveAdmonition,
  remarkMdxMermaid,
} from 'fumadocs-core/mdx-plugins';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    remarkImageOptions: {
      publicDir: 'public',
      useImport: false,
    },
    remarkPlugins: [
      remarkDirective,
      remarkDirectiveAdmonition,
      remarkMdxMermaid,
    ],
  },
});
