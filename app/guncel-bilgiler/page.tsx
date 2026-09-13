import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Güncel Bilgiler ve Resmî Kaynaklar | KanadaVizesi.ca',
  description:
    'Kanada araştırmanız sırasında güncel başvuru koşullarını doğrulayabileceğiniz resmî kaynaklar.',
};
export default function Page() {
  return (
    <main className="legal-page">
      <article className="container legal-content">
        <nav className="article-breadcrumb">
          <Link href="/">Ana Sayfa</Link> &gt; Güncel Bilgiler
        </nav>
        <h1>Güncel bilgiler</h1>
        <span className="red-rule" />
        <p>
          Bu sayfa bir haber akışı değildir. Başvuru öncesinde değişebilen
          koşulları doğrulamak için aşağıdaki resmî kaynakları
          kullanabilirsiniz.
        </p>
        <h2>Göçmenlik, vize ve izinler</h2>
        <p>
          <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html">
            IRCC: vize, eğitim, çalışma ve göçmenlik bilgileri
          </a>
        </p>
        <p>
          <a href="https://www.canada.ca/en/immigration-refugees-citizenship/news.html">
            IRCC haberleri ve duyuruları
          </a>
        </p>
        <h2>Çalışma ve günlük yaşam</h2>
        <p>
          <a href="https://www.jobbank.gc.ca/">
            Job Bank: meslekler ve iş olanakları
          </a>
        </p>
        <p>
          <a href="https://www.canada.ca/en/services/benefits.html">
            Kanada Hükümeti: destekler ve hizmetler
          </a>
        </p>
        <p>
          Bir programla ilgili işlem yapmadan önce resmî sayfadaki kapsamı,
          tarihleri ve başvuru talimatlarını birlikte okuyun.
        </p>
        <p>
          <Link href="/kaynak-politikasi">Kaynak politikamızı okuyun →</Link>
        </p>
      </article>
    </main>
  );
}
