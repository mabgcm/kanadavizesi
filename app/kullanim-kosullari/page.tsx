import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları | KanadaVizesi.ca',
  description:
    'KanadaVizesi.ca içerikleri ve ön değerlendirme formunun kullanım koşulları.',
};
export default function Terms() {
  return (
    <main className="legal-page">
      <article className="container legal-content">
        <nav className="article-breadcrumb">
          <Link href="/">Ana Sayfa</Link> &gt; Kullanım Koşulları
        </nav>
        <h1>Kullanım Koşulları</h1>
        <span className="red-rule" />
        <p>Son güncelleme: 12 Eylül 2026</p>
        <h2>Hizmetin kapsamı</h2>
        <p>
          KanadaVizesi.ca, Kanada’ya ziyaret, eğitim, çalışma ve yerleşim
          konularında Türkçe bilgilendirme ve ön değerlendirme talebi iletme
          olanağı sunar. Site Kanada hükümetinin veya göçmenlik makamlarının
          resmi başvuru kanalı değildir.
        </p>
        <h2>Bilgilendirme içerikleri</h2>
        <p>
          Rehberler genel bilgi amaçlıdır; kişiye özel hukuki veya göçmenlik
          danışmanlığı yerine geçmez. Program koşulları, ücretler ve uygulamalar
          değişebilir. Başvuru yapmadan önce{' '}
          <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html">
            Kanada Göçmenlik, Mülteciler ve Vatandaşlık Bakanlığı (IRCC)
          </a>{' '}
          kaynaklarını kontrol edin.
        </p>
        <h2>Ön değerlendirme talebi</h2>
        <p>
          Form 18 yaş ve üzeri kullanıcılara yöneliktir. Gönderilen bilgiler
          e-posta ile ekibe iletilir. Formun gönderilmesi resmi başvuru,
          danışmanlık sözleşmesi, temsil ilişkisi veya hizmet satın alımı
          oluşturmaz. Kabul, vize, çalışma izni ya da kalıcı oturum garantisi
          verilmez. Form otomatik bir uygunluk kararı üretmez.
        </p>
        <p>
          Başarılı gönderim bildirimi, e-posta hizmetinin iletiyi kabul ettiğini
          gösterir; talebin incelendiği anlamına gelmez. Geri dönüş süresi
          taahhüt edilmez. E-posta hizmetlerindeki kesintiler veya filtreler
          teslimatı etkileyebilir. Gönderim hatasında tekrar deneyebilir veya
          iletişim adresimize yazabilirsiniz.
        </p>
        <h2>Kullanıcının sorumlulukları</h2>
        <p>
          Kendinize ait, doğru ve güncel bilgileri paylaşın. Başkasının kişisel
          bilgilerini izinsiz göndermeyin. Pasaport, kimlik, banka ve sağlık
          bilgilerini forma eklemeyin. Spam, yanıltıcı talepler, zararlı içerik
          veya hizmeti aksatmaya yönelik otomatik gönderimler yasaktır. Kötüye
          kullanımı önlemek amacıyla gönderimler sınırlandırılabilir.
        </p>
        <h2>Gizlilik ve iletişim</h2>
        <p>
          Formu gönderirken bilgilerinizin talebiniz için işlenmesine ve bu
          talep hakkında sizinle iletişim kurulmasına onay verirsiniz. Veri
          işleme ve haklarınıza ilişkin ayrıntılar{' '}
          <Link href="/gizlilik">Gizlilik Politikası</Link>’nda açıklanır. Bu
          onay pazarlama aboneliği değildir.
        </p>
        <h2>İçeriklerin kullanımı ve harici bağlantılar</h2>
        <p>
          Site içeriklerini kişisel bilgilendirme amacıyla kullanabilirsiniz.
          Özgün içeriklerin ticari amaçla çoğaltılması veya yeniden yayımlanması
          için izin alınmalıdır; mevzuattan doğan alıntı ve kullanım hakları
          saklıdır. Harici sitelerin içerik ve hizmetleri ilgili sağlayıcıların
          koşullarına tabidir; bağlantı verilmesi onay veya garanti anlamına
          gelmez.
        </p>
        <h2>Hizmetin sınırları</h2>
        <p>
          İçeriklerin her zaman güncel ve hizmetin kesintisiz olacağı garanti
          edilmez. Kararlarınızı kişisel koşullarınızı ve resmi kaynakları
          dikkate alarak verin. Bu koşullar, uygulanabilir hukuktan doğan ve
          sınırlandırılamayan hak veya sorumlulukları ortadan kaldırmaz.
        </p>
        <h2>Değişiklikler ve iletişim</h2>
        <p>
          Koşullar hizmetteki değişikliklere göre güncellenebilir. Güncel
          sürümün tarihi sayfanın başında belirtilir. Sorularınızı{' '}
          <a href="mailto:bilgi@kanadavizesi.ca">bilgi@kanadavizesi.ca</a>{' '}
          adresine iletebilirsiniz.
        </p>
      </article>
    </main>
  );
}
