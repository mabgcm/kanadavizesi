import { workPermit } from '@/lib/content';
import { studyPermit } from '@/lib/study-permit';
import { arrivalPath, arrivalDates } from '@/lib/arrival';
import { visitorVisaPath, visitorVisaFacts } from '@/lib/visitor-visa';
import type { MetadataRoute } from 'next';
import { articles, SITE_URL, TURKIYE_KANADA_GUIDE_DATES } from '@/lib/content';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date('2026-09-14'), priority: 1 },
    {
      url: `${SITE_URL}/rehberler`,
      lastModified: new Date('2026-09-11'),
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/on-degerlendirme`,
      lastModified: new Date('2026-09-11'),
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gizlilik`,
      lastModified: new Date('2026-09-11'),
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/kullanim-kosullari`,
      lastModified: new Date('2026-09-11'),
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/hakkimizda`,
      lastModified: new Date('2026-09-14'),
      priority: 0.3,
    },
    ...[
      'yasal-uyari',
      'kaynak-politikasi',
      'guncel-bilgiler',
      'saglik-ve-egitim',
    ].map((path) => ({
      url: `${SITE_URL}/${path}`,
      lastModified: new Date('2026-09-12'),
      priority: 0.3,
    })),
    {
      url: `${SITE_URL}/kanada-vizesi`,
      lastModified: new Date(visitorVisaFacts.reviewedAt),
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/kanadada-yasam`,
      lastModified: new Date(arrivalDates.modified),
      priority: 0.8,
    },
    ...articles
      .filter((a) => a.contentStatus === 'complete')
      .map((a) => ({
        url: `${SITE_URL}${a.path}`,
        lastModified: new Date(
          a.path === workPermit.path
            ? workPermit.reviewedAt
            : a.path === studyPermit.path
              ? studyPermit.reviewedAt
              : a.path === '/rehberler/turkiyeden-kanadaya-nasil-gidilir'
                ? TURKIYE_KANADA_GUIDE_DATES.modified
                : a.path === visitorVisaPath
                  ? visitorVisaFacts.reviewedAt
                  : a.path === arrivalPath
                    ? arrivalDates.modified
                    : '2026-09-11',
        ),
        changeFrequency: 'monthly' as const,
        priority: a.isPillar ? 0.9 : 0.7,
      })),
  ];
}
