import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/hakkimizda',
  title: 'Hakkımızda ve İletişim',
  description:
    'KanadaVizesi.ca’nın Türkçe rehberlerinin kapsamını, kaynak politikasını ve bilgi düzeltmeleri için iletişim adresini öğrenin.',
});

export default function AboutPage() {
  return (
    <main className="legal-page">
      <article className="container legal-content">
        <nav className="article-breadcrumb" aria-label="İçerik yolu">
          <Link href="/">Ana Sayfa</Link> &gt;{' '}
          <span aria-current="page">Hakkımızda</span>
        </nav>
        <h1>KanadaVizesi.ca hakkında</h1>
        <span className="red-rule" />
        <p>
          KanadaVizesi.ca, Türkiye’den Kanada’ya gitmeyi araştıran ve Kanada’da
          yaşam hakkında Türkçe bilgi arayan okuyucular için hazırlanmış bir
          rehber sitesidir.
        </p>
        <h2>Rehberler nasıl kullanılmalı?</h2>
        <p>
          Ziyaret, eğitim, çalışma ve yerleşim seçeneklerini araştırırken
          rehberlerden başlangıç noktası olarak yararlanabilirsiniz. Sitedeki
          genel bilgiler kişiye özel hukuki veya göçmenlik danışmanlığı yerine
          geçmez; Kanada Hükümeti adına karar veya onay verilmez.
        </p>
        <h2>Kaynaklar ve içerik durumu</h2>
        <p>
          Ayrıntılı rehberlerde resmî kaynaklara bağlantılar bulunur. Başlangıç
          aşamasındaki içerikler “Başlangıç notları” olarak gösterilir.
          Sayfalardaki tarihler ve kapsam,{' '}
          <Link href="/kaynak-politikasi">kaynak politikası</Link> ile birlikte
          değerlendirilmelidir.
        </p>
        <p>
          Başvuru öncesinde{' '}
          <Link href="/guncel-bilgiler">
            resmî kaynaklardan güncel koşulları
          </Link>{' '}
          kontrol edin. Bir içeriğin profesyonel olarak incelendiği ancak
          inceleyen kişi ve inceleme kapsamı açıkça belirtildiğinde kabul
          edilmelidir.
        </p>
        <h2>İletişim ve düzeltme talepleri</h2>
        <p>
          Sorularınız ve kaynakla desteklenen düzeltme talepleriniz için{' '}
          <a href="mailto:bilgi@kanadavizesi.ca">bilgi@kanadavizesi.ca</a>{' '}
          adresine yazabilirsiniz. Düzeltme taleplerinde sayfa adresini ve
          ilgili resmî kaynağı belirtin.
        </p>
        <p>
          Kanada planınızı paylaşmak için{' '}
          <Link href="/on-degerlendirme">ön değerlendirme formuna</Link>{' '}
          ulaşabilirsiniz. Kişisel verilerle ilgili açıklamalar{' '}
          <Link href="/gizlilik">gizlilik politikasında</Link> yer alır.
        </p>
        <p>
          <Link href="/rehberler">Türkçe Kanada rehberlerini inceleyin →</Link>
        </p>
      </article>
    </main>
  );
}
