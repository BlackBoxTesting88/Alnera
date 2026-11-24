import type { MetadataRoute } from 'next';
import { articles } from './journal/articles';
import { absoluteUrl } from './seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '', 'proizvodi/glow/', 'proizvodi/calm/', 'proizvod/balance/', 'journal/',
    ...articles.map(article => `journal/${article.slug}/`),
  ].map(path => ({ url: absoluteUrl(path) }));
}
