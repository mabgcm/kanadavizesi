import { VisitorVisaGuide } from '@/components/visitor-visa-guide';
import {
  visitorVisaPath,
  visitorVisaTitle,
  visitorVisaDescription,
  visitorVisaFacts,
} from '@/lib/visitor-visa';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTemplate } from '@/components/article-template';
import { TurkiyeKanadaGuide } from '@/components/turkiye-kanada-guide';
import { articleMap, articles, SITE_URL } from '@/lib/content';

type Props = { params: Promise<{ slug: string[] }> };
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.path.slice(1).split('/') }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleMap.get(`/${slug.join('/')}`);
  if (!article) return {};
  const canonical = `${SITE_URL}${article.path}`;
  if (article.path === visitorVisaPath)
    return {
      title: `Kanada Ziyaretçi Vizesi ${visitorVisaFacts.seoYear}: Şartlar ve Belgeler`,
      description: visitorVisaDescription,
      alternates: { canonical },
      robots: { index: true, follow: true },
      openGraph: {
        type: 'article',
        url: canonical,
        title: visitorVisaTitle,
        description:
          "Türkiye'den Kanada ziyaretçi vizesi başvurusu yapmadan önce bilmeniz gereken şartları, belgeleri ve başvuru adımlarını inceleyin.",
        locale: 'tr_TR',
        modifiedTime: visitorVisaFacts.reviewedAt,
      },
      twitter: {
        card: 'summary',
        title: visitorVisaTitle,
        description: visitorVisaDescription,
      },
    };
  if (article.path === '/rehberler/turkiyeden-kanadaya-nasil-gidilir')
    return {
      title:
        'Türkiye’den Kanada’ya Nasıl Gidilir? 2026 Rehberi | KanadaVizesi.ca',
      description:
        'Türkiye’den Kanada’ya ziyaret, eğitim, çalışma veya kalıcı oturum yoluyla nasıl gidilebileceğini karşılaştırın; koşulları, bütçeyi ve sonraki adımları öğrenin.',
      alternates: { canonical },
      robots: { index: true, follow: true },
      openGraph: {
        type: 'article',
        url: canonical,
        title: 'Türkiye’den Kanada’ya Nasıl Gidilir? Başlangıç Rehberi',
        description:
          'Kanada’ya gelmenin başlıca yollarını, temel koşullarını ve hangi seçeneği neden araştırmanız gerektiğini anlaşılır Türkçe ile inceleyin.',
        siteName: 'KanadaVizesi.ca',
      },
      twitter: {
        card: 'summary',
        title: 'Türkiye’den Kanada’ya Nasıl Gidilir? Başlangıç Rehberi',
        description:
          'Kanada’ya gelmenin başlıca yollarını, temel koşullarını ve hangi seçeneği neden araştırmanız gerektiğini anlaşılır Türkçe ile inceleyin.',
      },
    };
  return {
    title: `${article.title} | KanadaVizesi.ca`,
    description: article.description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: article.title,
      description: article.description,
      siteName: 'KanadaVizesi.ca',
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: article.description,
    },
  };
}
export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const article = articleMap.get(`/${slug.join('/')}`);
  if (!article) notFound();
  if (article.path === '/rehberler/turkiyeden-kanadaya-nasil-gidilir')
    return <TurkiyeKanadaGuide />;
  if (article.path === visitorVisaPath) return <VisitorVisaGuide />;
  return <ArticleTemplate article={article} />;
}
