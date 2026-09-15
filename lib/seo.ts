import type { Metadata } from 'next';
import { SITE_URL } from './content';

export const SITE_NAME = 'KanadaVizesi.ca';
export const SOCIAL_IMAGE = {
  url: `${SITE_URL}/og.png`,
  width: 1200,
  height: 630,
  alt: 'KanadaVizesi.ca — Türkiye’den Kanada’ya Türkçe başvuru ve yaşam rehberleri',
};
export const INDEX_ROBOTS: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};
export const NOINDEX_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: true,
  googleBot: { index: false, follow: true },
};

export function pageMetadata({
  title,
  description,
  path,
  index = true,
  article = false,
  modified,
  published,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  article?: boolean;
  modified?: string;
  published?: string;
}): Metadata {
  const url = new URL(path, SITE_URL).href;
  return {
    title: title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    robots: index ? INDEX_ROBOTS : NOINDEX_ROBOTS,
    openGraph: {
      type: article ? 'article' : 'website',
      url,
      title,
      description,
      locale: 'tr_TR',
      siteName: SITE_NAME,
      images: [SOCIAL_IMAGE],
      ...(article
        ? {
            ...(modified ? { modifiedTime: modified } : {}),
            ...(published ? { publishedTime: published } : {}),
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}

export const publisher = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
};
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...publisher,
      email: 'bilgi@kanadavizesi.ca',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.jpeg` },
      publishingPrinciples: `${SITE_URL}/kaynak-politikasi`,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'tr-TR',
      publisher: { '@id': publisher['@id'] },
      description:
        'Türkiye’den Kanada’ya gitme yolları, Kanada vizesi ve Kanada’da yaşam hakkında Türkçe rehberler.',
    },
  ],
};

export function collectionSchema(
  path: string,
  title: string,
  items: { path: string; title: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}${path}#webpage`,
        url: `${SITE_URL}${path}`,
        name: title,
        inLanguage: 'tr-TR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.title,
            url: `${SITE_URL}${item.path}`,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Ana Sayfa',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: title,
            item: `${SITE_URL}${path}`,
          },
        ],
      },
    ],
  };
}
