import Link from 'next/link';
import { articles } from '@/lib/content';
export const metadata = {
  title: 'Kanada Vizesi Türleri ve Başvuru Rehberleri',
  alternates: { canonical: 'https://kanadavizesi.ca/kanada-vizesi' },
};
export default function VisaHub() {
  return (
    <main className="guide-page">
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
              </article>
            ))}
        </div>
      </div>
    </main>
  );
}
