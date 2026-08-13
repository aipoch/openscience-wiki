import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aipoch.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    ...source.getPages().map((page) => ({
      url: new URL(page.url, siteUrl).toString(),
      changeFrequency: 'weekly' as const,
      priority: page.slugs.length === 0 ? 0.9 : 0.7,
    })),
  ];
}
