import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';

const immigration = [
  [
    'Ziyaretçi vizesi',
    'Turistik seyahat, aile ziyareti ve kısa süreli ziyaretler için başvuru koşullarını, gerekli belgeleri ve değerlendirmede dikkate alınan unsurları öğrenin.',
    'Ziyaretçi vizesini inceleyin',
    '/kanada-vizesi/kanada-ziyaretci-vizesi',
  ],
  [
    'Eğitim izni',
    'Kanada’da eğitim almak isteyenler için okul ve program seçimi, finansal yeterlilik, eğitim izni ve mezuniyet sonrası seçenekler hakkında bilgi edinin.',
    'Eğitim iznini inceleyin',
    '/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni',
  ],
  [
    'Çalışma izni',
    'İşverene bağlı ve açık çalışma izinleri, iş teklifleri, işveren koşulları ve Kanada’da yasal çalışma hakkı hakkında temel bilgileri inceleyin.',
    'Çalışma iznini inceleyin',
    '/kanadada-calisma/kanada-calisma-izni',
  ],
  [
    'Kalıcı oturum',
    'Express Entry, eyalet aday programları ve diğer ekonomik göçmenlik yollarının nasıl çalıştığını öğrenin.',
    'Kalıcı oturum yollarını inceleyin',
    '/kanada-gocmenlik/kalici-oturum-ve-express-entry',
  ],
  [
    'Ailece Kanada’ya gitmek',
    'Eşlerin, partnerlerin ve çocukların başvurudaki durumunu; eğitim, çalışma ve aile sponsorluğu seçenekleriyle birlikte değerlendirin.',
    'Aileler için Kanada rehberini okuyun',
    '/rehberler/ailece-kanadaya-gitmek',
  ],
  [
    'Ret sonrası bilgi',
    'Ret mektubu, yaygın ret nedenleri, dosya notları ve yeniden başvuru öncesinde değerlendirilmesi gereken konular hakkında bilgi alın.',
    'Ret sonrası seçenekleri inceleyin',
    '/kanada-vizesi/vize-reddi',
  ],
] as const;
const settlement = [
  [
    'İş ve kariyer',
    'Kanada formatında CV, LinkedIn kullanımı, iş başvuruları, mesleki denklik ve Kanada iş kültürü hakkında bilgi edinin.',
    'İş ve kariyer rehberleri',
    '/kanadada-calisma/turkiyeden-kanadada-is-bulmak',
  ],
  [
    'Yerleşim ve ilk 90 gün',
    'Kanada’ya gelişten sonraki ilk günlerde yapılması gereken işlemleri ve yeni bir düzen kurarken dikkat edilmesi gerekenleri inceleyin.',
    'İlk 90 gün rehberi',
    '/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun',
  ],
  [
    'Yaşam maliyeti',
    'Konut, ulaşım, market, iletişim ve diğer temel giderleri şehir ve aile büyüklüğüne göre araştırın.',
    'Kanada’da yaşam maliyeti',
    '/kanadada-yasam/kanadada-yasam-maliyeti',
  ],
  [
    'Şehir seçimi',
    'Kanada şehirlerini yaşam maliyeti, iş olanakları, iklim, ulaşım ve aile yaşamı bakımından karşılaştırın.',
    'Kanada şehirleri rehberi',
    '/kanadada-yasam/kanada-sehirleri-karsilastirmasi',
  ],
] as const;
const steps = [
  [
    '1',
    'Amacınızı belirleyin',
    'Kanada’ya ziyaret, eğitim, çalışma veya kalıcı yerleşim amaçlarından hangisiyle gelmek istediğinizi netleştirin.',
  ],
  [
    '2',
    'Seçenekleri karşılaştırın',
    'Her seçeneğin temel koşullarını, maliyetlerini, sınırlamalarını ve uzun vadeli etkilerini inceleyin.',
  ],
  [
    '3',
    'Güncel koşulları doğrulayın',
    'Program kriterlerinin değişebileceğini göz önünde bulundurun ve başvuru öncesinde bilgileri resmî Kanada Hükümeti kaynaklarından kontrol edin.',
  ],
  [
    '4',
    'Gerekirse profesyonel destek alın',
    'Durumunuza özel değerlendirme veya başvuru desteği gerekiyorsa ön değerlendirme formu üzerinden bizimle iletişime geçin.',
  ],
];
const guides = [
  [
    'Türkiye’den Kanada’ya nasıl gidilir?',
    'Ziyaret, eğitim, çalışma ve kalıcı oturum yollarını tek bir başlangıç rehberinde karşılaştırın.',
    '/rehberler/turkiyeden-kanadaya-nasil-gidilir',
  ],
  [
    'Kanada ziyaretçi vizesi',
    'Başvuru koşulları, belgeler, finansal yeterlilik, seyahat amacı ve yaygın ret nedenleri hakkında bilgi alın.',
    '/kanada-vizesi/kanada-ziyaretci-vizesi',
  ],
  [
    'Kanada’da eğitim',
    'Okul seçimi, eğitim izni, çalışma hakları ve mezuniyet sonrası planlama hakkında güncel rehberleri inceleyin.',
    '/kanadada-egitim/kanadada-egitim-rehberi',
  ],
  [
    'Kanada’da çalışmak',
    'Çalışma izni türleri, iş teklifleri, Kanada formatında CV ve iş arama yöntemleri hakkında bilgi edinin.',
    '/kanadada-calisma/turkiyeden-kanadada-is-bulmak',
  ],
  [
    'Express Entry ve kalıcı oturum',
    'Puanlama, eğitim denkliği, dil sınavları ve eyalet programlarının temel yapısını öğrenin.',
    '/kanada-gocmenlik/kalici-oturum-ve-express-entry',
  ],
  [
    'Kanada’da yaşam',
    'Yaşam maliyeti, şehir seçimi, konut, sağlık, eğitim ve ilk 90 gün hakkında hazırlık yapın.',
    '/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun',
  ],
];
const faqs = [
  [
    'Ön değerlendirme sonucu resmî uygunluk kararı mıdır?',
    'Hayır. Ön değerlendirme yalnızca verdiğiniz bilgiler üzerinden ilgili bilgi başlıklarının ve ihtiyaç halinde profesyonel destek seçeneklerinin belirlenmesine yardımcı olur. Bir programa uygunluk veya başvuru sonucu anlamına gelmez.',
  ],
  [
    'Hangi bilgiler değerlendirmeyi etkiler?',
    'Kanada’ya geliş amacınız, yaşınız, eğitiminiz, iş deneyiminiz, dil seviyeniz, aile durumunuz, mali koşullarınız ve önceki Kanada başvurularınız başlangıç değerlendirmesinde dikkate alınabilir.',
  ],
  [
    'Türkiye’den Kanada seçeneklerini araştırabilir miyim?',
    'Evet. Sitedeki rehberler Türkiye’den araştırma yapan kullanıcılar için Türkçe olarak hazırlanmıştır. Ancak program koşulları değişebileceğinden başvuru öncesinde güncel resmî kaynaklar mutlaka kontrol edilmelidir.',
  ],
  [
    'Ön değerlendirme formunu doldurunca ücret ödemem gerekir mi?',
    'Formu göndermek tek başına ücretli bir hizmet başlatmaz. Profesyonel destek seçeneği sunulması halinde hizmetin kapsamı ve ücreti ayrıca açıklanır. Siz kabul etmeden herhangi bir ücretli hizmet başlamaz.',
  ],
  [
    'Kanada’ya geldikten sonraki yaşam hakkında bilgi bulabilir miyim?',
    'Evet. İş arama, Kanada formatında CV, konut, yaşam maliyeti, şehir seçimi, sağlık, eğitim ve ilk 90 gün hakkında ayrı rehberler bulunmaktadır.',
  ],
  [
    'Sitedeki bilgiler kişisel göçmenlik tavsiyesi sayılır mı?',
    'Hayır. Sitedeki içerikler genel bilgilendirme amacı taşır. Kişisel durumunuza özel değerlendirme için yetkili bir profesyonelle görüşmeniz gerekir.',
  ],
];

export default function Home() {
  return (
    <main className="home-page">
      <div className="container intro">
        <h1>Kanada’ya gelme ve Kanada’da yaşam rehberi</h1>
        <span className="red-rule" />
        <p>
          Ziyaretçi vizesi, eğitim, çalışma, göçmenlik ve Kanada’daki günlük
          yaşam hakkında anlaşılır Türkçe bilgilere ulaşın. Seçenekleri
          karşılaştırın, güncel koşulları inceleyin ve araştırmanıza doğru
          yerden başlayın.
        </p>
        <Link
          className="link-arrow"
          href="/rehberler/turkiyeden-kanadaya-nasil-gidilir"
        >
          Kanada’ya nasıl gidilir? Başlangıç rehberini okuyun{' '}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <section className="info-band">
        <div className="container band-grid">
          <h2>Hızlı bağlantılar</h2>
          <ul>
            <li>
              <Link href="/rehberler/turkiyeden-kanadaya-nasil-gidilir">
                Kanada’ya nasıl gidilir?
              </Link>
            </li>
            <li>
              <Link href="#kanadaya-gelme-secenekleri">
                Vize türlerini karşılaştırın
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/rehberler">Bütün rehberleri görüntüleyin</Link>
            </li>
            <li>
              <Link href="#kanadada-hayat">Kanada’da yaşamı keşfedin</Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="requested">
        <div className="container band-grid">
          <h2>En çok arananlar</h2>
          <ul>
            <li>
              <Link href="/kanada-vizesi/kanada-ziyaretci-vizesi">
                Kanada ziyaretçi vizesi
              </Link>
            </li>
            <li>
              <Link href="/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni">
                Kanada eğitim izni
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/kanadada-calisma/kanada-calisma-izni">
                Kanada çalışma izni
              </Link>
            </li>
            <li>
              <Link href="/kanada-gocmenlik/kalici-oturum-ve-express-entry">
                Express Entry ve kalıcı oturum
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="section white">
        <div className="container">
          <h2>Araştırmanıza nereden başlayacağınızı belirleyin</h2>
          <p className="lead">
            Kanada’ya geliş amacınız, yaşınız, eğitiminiz, iş deneyiminiz, dil
            seviyeniz ve aile durumunuz hangi bilgi başlıklarını incelemeniz
            gerektiğini etkileyebilir.
          </p>
          <p className="lead">
            Kısa ön değerlendirme formunu doldurarak durumunuz ve hedefiniz
            hakkında temel bilgileri bize iletebilirsiniz. Formunuz
            incelendikten sonra ilgili bilgi kaynakları ve ihtiyaç halinde
            yararlanabileceğiniz profesyonel destek seçenekleri sizinle
            paylaşılabilir.
          </p>
          <Link className="link-arrow" href="/on-degerlendirme">
            Ön değerlendirme formunu doldurun <ArrowRight aria-hidden="true" />
          </Link>
          <p className="home-disclaimer">
            Formu doldurmanız bir danışmanlık ilişkisi oluşturmaz ve herhangi
            bir vize, izin veya göçmenlik programına uygun olduğunuz anlamına
            gelmez.
          </p>
        </div>
      </section>
      <section className="section grey" id="kanadaya-gelme-secenekleri">
        <div className="container">
          <h2>Kanada’ya gelme seçeneklerini inceleyin</h2>
          <p className="lead">
            Kanada’ya ziyaret, eğitim, çalışma veya kalıcı yerleşim amacıyla
            gelmek isteyenler için farklı başvuru türleri ve programlar bulunur.
            Her seçeneğin koşulları ve amacı farklıdır.
          </p>
          <div className="link-grid">
            {immigration.map(([title, text, label, href]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link href={href}>{label}</Link>
              </article>
            ))}
          </div>
          <div className="question-box">
            <HelpCircle aria-hidden="true" />
            <div>
              <strong>Nereden başlayacağınızdan emin değil misiniz?</strong>
              <p>
                Kanada’ya gelmenin başlıca yollarını karşılaştıran başlangıç
                rehberini okuyun.
              </p>
              <Link href="/rehberler/turkiyeden-kanadaya-nasil-gidilir">
                Türkiye’den Kanada’ya nasıl gidilir? →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section white" id="kanadada-hayat">
        <div className="container">
          <h2>Kanada’da hayat kurmak</h2>
          <p className="lead">
            Kanada’ya geliş, yeni yaşamın yalnızca başlangıcıdır. İş, konut,
            bütçe, sağlık, eğitim ve günlük işlemler hakkında önceden bilgi
            edinerek daha hazırlıklı hareket edebilirsiniz.
          </p>
          <div className="link-grid">
            {settlement.map(([title, text, label, href]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link href={href}>{label}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section grey">
        <div className="container">
          <h2>Kanada araştırmanızı dört adımda ilerletin</h2>
          <div className="steps">
            {steps.map(([n, title, text]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section white">
        <div className="container two-col">
          <div>
            <h2>Tek bir başvurudan daha fazlasını düşünün</h2>
            <span className="red-rule" />
            <p>
              Kanada’ya gelme seçeneğini değerlendirirken yalnızca vize veya
              izin başvurusuna odaklanmak yeterli değildir. Eğitim, kariyer,
              bütçe, aile ve yerleşim planlarının da birlikte düşünülmesi
              gerekir.
            </p>
            <p>
              KanadaVizesi.ca; başvuru seçeneklerinden Kanada’daki iş ve günlük
              yaşama kadar bütün yolculuğu kapsayan Türkçe rehberler sunar.
            </p>
          </div>
          <div className="plain-list">
            <h3>İçerik yaklaşımımız</h3>
            <ul>
              {[
                'Açık ve anlaşılır Türkçe',
                'Seçenekleri tarafsız biçimde karşılaştıran rehberler',
                'Adım adım hazırlık içerikleri',
                'Kanada’daki gerçek yaşama ilişkin bilgiler',
                'Resmî kaynaklara yönlendirmeler',
                'Avantajları ve zorlukları birlikte ele alan yaklaşım',
              ].map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section grey">
        <div className="container">
          <h2>Araştırmaya bu rehberlerle başlayın</h2>
          <div className="link-grid">
            {guides.map(([title, text, href]) => (
              <article key={title}>
                <h3>
                  <Link href={href}>{title}</Link>
                </h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <Link className="link-arrow home-all-guides" href="/rehberler">
            Bütün rehberleri görüntüleyin <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="section white">
        <div className="container faq-layout">
          <h2>Sık sorulan sorular</h2>
          <div>
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="contact-band">
        <div className="container">
          <h2>Sorunuza uygun başlangıç noktasını bulun</h2>
          <p>
            Hedefiniz ve mevcut durumunuz hakkında temel bilgileri paylaşın.
            Formunuz incelendikten sonra ilgili rehberler ve ihtiyaç halinde
            profesyonel destek seçenekleri hakkında bilgi alın.
          </p>
          <Link href="/on-degerlendirme">
            Ön değerlendirme formunu doldurun
          </Link>
          <p className="home-disclaimer">
            Formun gönderilmesi hizmet sözleşmesi, uygunluk kararı veya sonuç
            garantisi oluşturmaz.
          </p>
        </div>
      </section>
    </main>
  );
}
