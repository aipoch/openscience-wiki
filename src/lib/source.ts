import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

export function getPageMarkdownUrl(page: { slugs: string[] }) {
  const path = page.slugs.join('/');
  return `/llms.mdx/docs${path.length > 0 ? `/${path}` : ''}`;
}

export function getGitHubUrl(page: { path: string }) {
  const branch = process.env.NEXT_PUBLIC_GITHUB_BRANCH ?? 'main';
  return `https://github.com/aipoch/openscience-wiki/blob/${branch}/content/docs/${page.path}`;
}
