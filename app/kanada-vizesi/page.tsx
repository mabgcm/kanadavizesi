import Link from 'next/link';
import { articles } from '@/lib/content';
import { pageMetadata, collectionSchema } from '@/lib/seo';
import { JsonLd } from '@/components/json-ld';
export const metadata = pageMetadata({
  path: '/kanada-vizesi',
  title: 'Kanada Vizesi: Başvuru ve Ziyaretçi Vizesi Rehberleri',
  description:
    'Türkiye’den Kanada vizesi araştırmanıza başlayın. Ziyaretçi vizesi başvuru adımları, gerekli belgeler, ücretler ve resmî kaynaklar için rehbere ulaşın.',
});
export default function VisaHub() {
  return (
    <main className="guide-page">
      <JsonLd
        data={collectionSchema(
          '/kanada-vizesi',
          'Kanada Vizesi',
          articles.filter(
            (a) =>
              a.category === 'Ziyaretçi Vizesi' &&
              a.contentStatus === 'complete',
          ),
        )}
      />
      <div className="container guide-shell">
        <nav className="article-breadcrumb" aria-label="İçerik yolu">
          <Link href="/">Ana Sayfa</Link> {' > '}
          <span aria-current="page">Kanada Vizesi</span>
        </nav>
        <h1>Kanada Vizesi</h1>
        <span className="red-rule" />
        <p className="article-intro">
          Ziyaretçi vizesi, eTA, belge hazırlığı ve başvuru süreci hakkında
          rehberler. Gereken seyahat belgesi vatandaşlığınıza, pasaportunuza ve
          seyahat statünüze göre değişebilir.
        </p>
        <div className="guide-related">
          {articles
            .filter((a) => a.category === 'Ziyaretçi Vizesi')
            .map((a) => (
              <article key={a.path}>
                <h2>
                  <Link href={a.path}>{a.title}</Link>
                </h2>
                <p>{a.description}</p>
                {a.contentStatus === 'starter' && (
                  <small>Başlangıç notları</small>
                )}
              </article>
            ))}
        </div>
      </div>
    </main>
  );
}
