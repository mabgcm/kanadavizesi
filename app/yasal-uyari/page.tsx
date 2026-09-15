import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
export const metadata = pageMetadata({
  path: '/yasal-uyari',
  title: 'Yasal Uyarı | KanadaVizesi.ca',
  description:
    'Site içeriklerinin ve ön değerlendirme formunun kapsamı ve sınırları.',
});
export default function Page() {
  return (
    <main className="legal-page">
      <article className="container legal-content">
        <nav className="article-breadcrumb">
          <Link href="/">Ana Sayfa</Link> &gt; Yasal Uyarı
        </nav>
        <h1>Yasal Uyarı</h1>
        <span className="red-rule" />
        <p>Son güncelleme: 12 Eylül 2026</p>
        <h2>Genel bilgilendirme</h2>
        <p>
          KanadaVizesi.ca içerikleri genel bilgilendirme amacı taşır. Kişisel
          göçmenlik veya hukuk tavsiyesi değildir. Site, Kanada Hükümetinin ya
          da IRCC’nin resmî başvuru kanalı değildir.
        </p>
        <h2>Ön değerlendirme formu</h2>
        <p>
          Formun gönderilmesi danışmanlık ilişkisi, hizmet sözleşmesi, resmî
          başvuru, uygunluk kararı veya sonuç garantisi oluşturmaz. Verdiğiniz
          bilgiler, ilgili bilgi kaynaklarının ve ihtiyaç halinde profesyonel
          destek seçeneklerinin belirlenmesine yardımcı olur.
        </p>
        <h2>Profesyonel destek</h2>
        <p>
          Kişisel durumunuza özel değerlendirme için yetkili bir profesyonelle
          görüşmeniz gerekir. Profesyonel destek seçeneği sunulursa hizmetin
          kapsamı ve ücreti ayrıca açıklanır; siz kabul etmeden ücretli bir
          hizmet başlamaz.
        </p>
        <h2>Güncellik ve resmî kaynaklar</h2>
        <p>
          Program kriterleri ve uygulamalar değişebilir. Başvuru öncesinde
          güncel koşulları{' '}
          <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html">
            IRCC’nin resmî kaynaklarından
          </a>{' '}
          doğrulayın. Bir rehberin yayımlanması, tüm bilgilerinin her an güncel
          olduğu taahhüdü değildir.
        </p>
        <p>
          Ayrıntılar için{' '}
          <Link href="/kullanim-kosullari">Kullanım Koşulları</Link> ve{' '}
          <Link href="/kaynak-politikasi">Kaynak Politikası</Link> sayfalarını
          inceleyebilirsiniz.
        </p>
      </article>
    </main>
  );
}
