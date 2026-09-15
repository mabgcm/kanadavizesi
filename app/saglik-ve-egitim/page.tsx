import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
export const metadata = pageMetadata({
  path: '/saglik-ve-egitim',
  title: 'Kanada’da Sağlık ve Eğitim | KanadaVizesi.ca',
  description:
    'Sağlık sistemi, çocukların eğitimi ve bakım seçenekleri hakkında başlangıç rehberleri.',
});
export default function Page() {
  return (
    <main className="legal-page">
      <article className="container legal-content">
        <nav className="article-breadcrumb">
          <Link href="/">Ana Sayfa</Link> &gt; Sağlık ve Eğitim
        </nav>
        <h1>Kanada’da sağlık ve eğitim</h1>
        <span className="red-rule" />
        <p>
          Yerleşim planınızı yaparken sağlık hizmetleri, okul ve çocuk bakımını
          birlikte araştırın. Koşullar eyalete ve kişisel durumunuza göre
          değişebilir.
        </p>
        <h2>Sağlık sistemi</h2>
        <p>
          Sağlık hizmetlerine erişim ve yerleşim hazırlığı için{' '}
          <Link href="/kanadada-yasam/saglik-sistemi">
            Kanada sağlık sistemi rehberini
          </Link>{' '}
          inceleyin.
        </p>
        <h2>Çocukların eğitimi</h2>
        <p>
          Okul ve aile yaşamına ilişkin başlangıç bilgileri için{' '}
          <Link href="/kanadada-yasam/cocuklarin-egitimi">
            çocukların eğitimi rehberini
          </Link>{' '}
          okuyun.
        </p>
        <h2>Kreş ve çocuk bakımı</h2>
        <p>
          <Link href="/kanadada-yasam/kres-ve-cocuk-bakimi">
            Kreş ve çocuk bakımı seçeneklerini
          </Link>{' '}
          yerleşeceğiniz şehrin koşullarıyla birlikte değerlendirin.
        </p>
        <p>
          <Link href="/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun">
            Kanada’da yaşam ve ilk 90 gün rehberi →
          </Link>
        </p>
      </article>
    </main>
  );
}
