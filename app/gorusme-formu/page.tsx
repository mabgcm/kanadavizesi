import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { GorusmeForm } from '@/components/gorusme-form';

export const metadata = pageMetadata({
  path: '/gorusme-formu',
  title: 'Görüşme Talebi | KanadaVizesi.ca',
  description:
    'Kanada planınız için görüşme talebi oluşturun: seyahat geçmişiniz, mesleğiniz, bağlarınız ve bütçe durumunuzla birlikte iletişim bilgilerinizi paylaşın.',
  index: false,
});
export default function GorusmeFormuPage() {
  return (
    <main className="legal-page">
      <div className="container">
        <nav className="article-breadcrumb">
          <Link href="/">Ana Sayfa</Link> &gt; Görüşme Talebi
        </nav>
        <header className="hub-intro">
          <h1>Görüşme talebi</h1>
          <span className="red-rule" />
          <p>
            Kanada planınızı görüşmek için durumunuzu kısaca paylaşın;
            talebinizi inceleyip size ulaşalım.
          </p>
        </header>
        <GorusmeForm />
      </div>
    </main>
  );
}
