import type { Metadata } from 'next';
import Link from 'next/link';
import { GuideHub } from '@/components/guide-hub';
import { JsonLd } from '@/components/json-ld';
import { articles, contentClusters } from '@/lib/content';
import { collectionSchema, pageMetadata } from '@/lib/seo';

type Props = { searchParams: Promise<{ q?: string | string[] }> };
const title = 'Kanada Vizesi ve Göçmenlik Rehberleri';
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return pageMetadata({
    path: '/rehberler',
    title,
    description:
      'Türkiye’den Kanada’ya gitme ve ziyaretçi vizesi rehberlerini okuyun. Eğitim, çalışma, göçmenlik ve yaşam konularındaki başlangıç notlarını inceleyin.',
    index: q === undefined,
  });
}
export default async function Rehberler({ searchParams }: Props) {
  const { q } = await searchParams;
  const initialQuery = Array.isArray(q) ? (q[0] ?? '') : (q ?? '');
  return (
    <main className="hub-page">
      <div className="container">
        {q === undefined && (
          <JsonLd
            data={collectionSchema(
              '/rehberler',
              title,
              articles.filter((a) => a.contentStatus === 'complete'),
            )}
          />
        )}
        <nav className="article-breadcrumb" aria-label="İçerik yolu">
          <Link href="/">Ana Sayfa</Link> &gt;{' '}
          <span aria-current="page">Rehberler</span>
        </nav>
        <header className="hub-intro">
          <h1>Kanada vizesi ve göçmenlik rehberleri</h1>
          <span className="red-rule" />
          <p>
            Türkiye’den Kanada’ya gitme yollarını ve ziyaretçi vizesi
            başvurusunu ayrıntılı rehberlerle araştırın. Diğer konulardaki
            başlangıç notları ayrıca işaretlenmiştir.
          </p>
        </header>
        <GuideHub clusters={contentClusters} initialQuery={initialQuery} />
      </div>
    </main>
  );
}
