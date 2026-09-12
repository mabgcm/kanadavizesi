import type { MetadataRoute } from 'next';
import { articles, SITE_URL } from '@/lib/content';
export default function sitemap():MetadataRoute.Sitemap{return [{url:SITE_URL,lastModified:new Date('2026-09-11'),priority:1},{url:`${SITE_URL}/rehberler`,lastModified:new Date('2026-09-11'),priority:.9},...articles.map(a=>({url:`${SITE_URL}${a.path}`,lastModified:new Date('2026-09-11'),changeFrequency:'monthly' as const,priority:a.isPillar?.9:.7}))]}
