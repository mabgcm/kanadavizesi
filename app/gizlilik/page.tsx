import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | KanadaVizesi.ca',
  description:
    'Ön değerlendirme formu, e-posta iletişimi ve site kullanım verilerine ilişkin gizlilik politikası.',
};
export default function Privacy() {
  return (
    <main className="legal-page">
      <article className="container legal-content">
        <nav className="article-breadcrumb">
          <Link href="/">Ana Sayfa</Link> &gt; Gizlilik
        </nav>
        <h1>Gizlilik Politikası</h1>
        <span className="red-rule" />
        <p>Son güncelleme: 12 Eylül 2026</p>
        <h2>Kapsam ve iletişim</h2>
        <p>
          Bu politika, KanadaVizesi.ca üzerindeki ön değerlendirme formu ve site
          kullanımı sırasında işlenen bilgileri açıklar. Gizlilikle ilgili
          taleplerinizi site yönetimine{' '}
          <a href="mailto:bilgi@kanadavizesi.ca">bilgi@kanadavizesi.ca</a>{' '}
          üzerinden iletebilirsiniz.
        </p>
        <h2>Ön değerlendirme formunda alınan bilgiler</h2>
        <p>
          Ad soyad, e-posta adresi, Kanada’daki hedefiniz, yaş aralığınız,
          eğitim durumunuz, dil seviyeniz, iş deneyiminiz ve mali hazırlık
          durumunuz alınır. Telefon ve ek açıklama alanları isteğe bağlıdır.
          Onayınız ve gönderim zamanı da talebe eklenir. Form 18 yaş ve üzeri
          kullanıcılar içindir; pasaport, kimlik numarası, banka veya sağlık
          bilgisi göndermeyin.
        </p>
        <h2>Bilgileriniz nasıl kullanılır?</h2>
        <p>
          Form bilgileri talebinizi incelemek ve talebinizle ilgili sizinle
          iletişim kurmak amacıyla kullanılır. Gönderimden önce bu işleme için
          onayınız alınır. Formu doldurmak pazarlama e-postalarına abonelik
          oluşturmaz. Form üzerinden otomatik vize uygunluk kararı veya puanlama
          yapılmaz.
        </p>
        <h2>E-posta ile aktarım ve hizmet sağlayıcılar</h2>
        <p>
          Gönderdiğiniz bilgiler Vercel üzerinde çalışan sunucuda doğrulanır ve
          Google’ın Gmail hizmeti üzerinden ekibin alıcı e-posta adresine
          iletilir. Site uygulamasında ayrı bir başvuru veritabanı tutulmaz;
          gönderilen ileti, gönderen ve alıcı e-posta hesaplarında saklanabilir.
          Barındırma, e-posta ve ölçüm hizmetleri nedeniyle bilgiler
          bulunduğunuz ülke dışında işlenebilir.
        </p>
        <p>
          Hizmet sağlayıcıların uygulamaları için{' '}
          <a href="https://vercel.com/legal/privacy-policy">
            Vercel Gizlilik Politikası
          </a>{' '}
          ve{' '}
          <a href="https://policies.google.com/privacy">
            Google Gizlilik Politikası
          </a>{' '}
          incelenebilir.
        </p>
        <h2>Site ölçümü ve çerezler</h2>
        <p>
          Site, Vercel Analytics ve Google Analytics 4 kullanır. Ziyaret edilen
          sayfalar, yönlendiren site, cihaz ve tarayıcı türü, yaklaşık konum
          gibi kullanım verileri ölçüm kapsamında işlenebilir. Google Analytics
          çerez veya benzer teknolojiler kullanabilir. Form yanıtları uygulama
          tarafından analitik olaylarına eklenmez.
        </p>
        <p>
          Çerezleri tarayıcı ayarlarınızdan silebilir veya engelleyebilir;
          Google Analytics ölçümüne ilişkin{' '}
          <a href="https://tools.google.com/dlpage/gaoptout">
            Google’ın devre dışı bırakma aracını
          </a>{' '}
          inceleyebilirsiniz.
        </p>
        <h2>Güvenlik ve saklama</h2>
        <p>
          E-posta hizmetine bağlantı şifreli olarak kurulur. Uygulama form
          içeriğini hata günlüklerine yazmaz. Kötüye kullanımı azaltmak için IP
          adresi ve e-posta adresinden üretilen özet değerler, sunucu belleğinde
          15 dakikalık gönderim sınırı amacıyla geçici olarak tutulur.
          Barındırma sağlayıcısı ayrıca teknik erişim günlükleri işleyebilir.
        </p>
        <p>
          E-posta kayıtlarının saklanması ve silinmesi site yönetimi tarafından
          talebin takibi ve gerekli yükümlülükler dikkate alınarak yürütülür;
          uygulama e-posta kutularındaki iletileri otomatik silmez. İnternet
          üzerinden iletim veya saklama için mutlak güvenlik garantisi
          verilemez.
        </p>
        <h2>Erişim, düzeltme, silme ve onayın geri çekilmesi</h2>
        <p>
          Bilgileriniz hakkında bilgi almak, yanlış bilgileri düzeltmek, silme
          istemek veya gelecekteki iletişim için onayınızı geri çekmek üzere{' '}
          <a href="mailto:bilgi@kanadavizesi.ca">bilgi@kanadavizesi.ca</a>{' '}
          adresine yazabilirsiniz. Talebi güvenle karşılamak için kimliğinizi
          doğrulamak gerekebilir. Onayın geri çekilmesi önceki işlemleri geri
          almaz; uygulanabilir saklama yükümlülükleri ayrıca değerlendirilir.
        </p>
        <h2>Güncellemeler</h2>
        <p>
          Veri işleme uygulamaları değiştiğinde bu metin güncellenir. Güncel
          sürümün tarihi sayfanın başında yer alır. Bilgilerin yeni bir amaçla
          kullanımı için gerektiğinde ayrıca onay istenir.
        </p>
      </article>
    </main>
  );
}
