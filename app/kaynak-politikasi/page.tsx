import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Kaynak Politikası | KanadaVizesi.ca',
  description:
    'Rehberlerde kaynak kullanımı, güncellik ve düzeltme yaklaşımımız.',
};
export default function Page() {
  return (
    <main className="legal-page">
      <article className="container legal-content">
        <nav className="article-breadcrumb">
          <Link href="/">Ana Sayfa</Link> &gt; Kaynak Politikası
        </nav>
        <h1>Kaynak Politikası</h1>
        <span className="red-rule" />
        <p>Son güncelleme: 12 Eylül 2026</p>
        <h2>Öncelikli kaynaklar</h2>
        <p>
          Vize, izin ve göçmenlik koşullarını araştırırken IRCC ve ilgili
          eyaletlerin resmî kaynakları; sağlık, eğitim ve günlük yaşam
          konularında ilgili kamu kurumları temel başvuru noktalarıdır. Türkçe
          rehberler bu kaynakların yerine geçmez.
        </p>
        <h2>Bilgi ve yorumun ayrılması</h2>
        <p>
          Genel açıklamalar ve hazırlık önerileri, ilgili resmî kaynaklar ve
          sayfadaki bağlamla birlikte okunmalıdır. Avantajlar, sınırlamalar ve
          belirsizlikler birlikte ele alınmalıdır.
        </p>
        <h2>Güncellik</h2>
        <p>
          Program koşulları, ücretler ve işlem süreleri değişebilir. Sayfadaki
          tarih tek başına bütün kaynakların aynı gün yeniden doğrulandığı
          anlamına gelmez. İşlem yapmadan önce ilgili kurumun güncel
          duyurularını ve başvuru talimatlarını kontrol edin.
        </p>
        <h2>Harici bağlantılar</h2>
        <p>
          Kaynak bağlantıları bilgiyi doğrulamanıza yardımcı olmak için sunulur.
          Üçüncü taraf sitelerin içeriği ve güncellemeleri ilgili sağlayıcıların
          sorumluluğundadır.
        </p>
        <h2>Düzeltme bildirimleri</h2>
        <p>
          Eksik, hatalı veya güncelliğini yitirmiş bir bilgi fark ederseniz
          sayfa adresi ve mümkünse ilgili resmî kaynakla birlikte{' '}
          <a href="mailto:bilgi@kanadavizesi.ca">bilgi@kanadavizesi.ca</a>{' '}
          adresine yazabilirsiniz.
        </p>
        <p>
          <Link href="/guncel-bilgiler">
            Güncel bilgileri kontrol edebileceğiniz kaynaklar →
          </Link>
        </p>
      </article>
    </main>
  );
}
