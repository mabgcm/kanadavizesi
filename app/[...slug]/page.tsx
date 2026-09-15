import { VisitorVisaGuide } from '@/components/visitor-visa-guide';
import {
  visitorVisaPath,
  visitorVisaDescription,
  visitorVisaFacts,
} from '@/lib/visitor-visa';
import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTemplate } from '@/components/article-template';
import { TurkiyeKanadaGuide } from '@/components/turkiye-kanada-guide';
import {
  articleMap,
  articles,
  TURKIYE_KANADA_GUIDE_DATES,
} from '@/lib/content';

type Props = { params: Promise<{ slug: string[] }> };
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.path.slice(1).split('/') }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleMap.get(`/${slug.join('/')}`);
  if (!article) return {};
  if (article.path === visitorVisaPath)
    return pageMetadata({
      path: article.path,
      title: `Kanada Ziyaretçi Vizesi ${visitorVisaFacts.seoYear}: Şartlar ve Belgeler`,
      description: visitorVisaDescription,
      article: true,
      modified: visitorVisaFacts.reviewedAt,
    });
  if (article.path === '/rehberler/turkiyeden-kanadaya-nasil-gidilir')
    return pageMetadata({
      path: article.path,
      title: 'Türkiye’den Kanada’ya Nasıl Gidilir? 2026 Rehberi',
      description:
        'Türkiye’den Kanada’ya ziyaret, eğitim, çalışma veya kalıcı oturum yollarını karşılaştırın; koşulları, bütçeyi ve sonraki adımları öğrenin.',
      article: true,
      modified: TURKIYE_KANADA_GUIDE_DATES.modified,
      published: TURKIYE_KANADA_GUIDE_DATES.published,
    });
  return pageMetadata({
    path: article.path,
    title: article.title,
    description: article.description,
    index: article.contentStatus === 'complete',
    article: article.contentStatus === 'complete',
  });
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
