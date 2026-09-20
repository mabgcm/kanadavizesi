import Link from 'next/link';
import { articles } from '@/lib/content';
import { pageMetadata, collectionSchema } from '@/lib/seo';
import { JsonLd } from '@/components/json-ld';
const guides = articles.filter((a) => a.category === 'Kanada’da Yaşam');
export const metadata = pageMetadata({
  path: '/kanadada-yasam',
  title: 'Kanada’da Yaşam Rehberleri',
  description:
    'Kanada’ya yerleşirken ilk 90 gün, SIN, sağlık, konut, okul ve günlük yaşam işlemlerini planlayın.',
});
export default function LifeHub() {
  return (
    <main className="guide-page">
      <JsonLd
        data={collectionSchema(
          '/kanadada-yasam',
          'Kanada’da Yaşam',
          guides.filter((a) => a.contentStatus === 'complete'),
        )}
      />
      <div className="container guide-shell">
        <nav className="article-breadcrumb" aria-label="İçerik yolu">
          <Link href="/">Ana Sayfa</Link> {' > '}
          <span aria-current="page">Kanada’da Yaşam</span>
        </nav>
        <h1>Kanada’da Yaşam Rehberleri</h1>
        <span className="red-rule" />
        <p className="article-intro">
          İlk günlerdeki resmî işlemlerden konut, sağlık, okul ve günlük bütçeye
          kadar yeni hayatınızı adım adım planlayın.
        </p>
        <div className="guide-related">
          {[...guides]
            .sort(
              (a, b) =>
                Number(b.contentStatus === 'complete') -
                Number(a.contentStatus === 'complete'),
            )
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
