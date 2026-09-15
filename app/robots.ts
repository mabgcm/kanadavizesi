import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  return {
    // Keep drafts crawlable so crawlers can read their noindex tags.
    // Search agents inherit the same public access and private API exclusion.
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      {
        userAgent: ['OAI-SearchBot', 'Googlebot', 'Bingbot'],
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
