import Link from 'next/link';
import { GuideMobileToc } from './guide-mobile-toc';
import { GuideFaq } from './guide-faq';
import { JsonLd } from './json-ld';
import { visaRefusal, SITE_URL } from '@/lib/content';
import { publisher, SOCIAL_IMAGE } from '@/lib/seo';

const base =
  'https://www.canada.ca/en/immigration-refugees-citizenship/services/';

const sources = [
  [
    'Kanada ziyaretçi vizesi',
    `${base}visit-canada/visitor-visa.html`,
  ],
  [
    'Vize reddedilirse ne yapılabilir (IRCC)',
    `${base}visit-canada/visitor-visa-after-apply-next-steps.html`,
  ],
  [
    'Kanada’ya giriş için vize veya eTA gerekliliğini kontrol etme',
    `${base}visit-canada/entry-requirements-country.html`,
  ],
  [
    'ATIP ile bilgi edinme başvurusu (GCMS notları)',
    'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/transparency/access-information-privacy.html',
  ],
  [
    'Kanada göçmenlik ve vatandaşlık temsilcileri',
    `${base}immigration-citizenship-representative.html`,
  ],
  [
    'Federal Mahkeme’de yargısal inceleme başvurusu',
    'https://www.fct-cf.gc.ca/en/pages/law-and-practice/rules',
  ],
  [
    'IRCC ücret listesi',
    'https://www.ircc.canada.ca/english/information/fees/fees.asp',
  ],
  [
    'IRCC işlem süreleri',
    `${base}application/check-processing-times.html`,
  ],
] as const;

const contents = [
  ['kisa-cevap', 'Kısa cevap: ret ne demek?'],
  ['ret-mektubu', 'Ret mektubu nasıl okunur?'],
  ['nedenler', 'En sık 7 ret nedeni'],
  ['baglar', '1. Geri dönüş bağları zayıf (179b)'],
  ['mali', '2. Mali yetersizlik ve fon kaynağı'],
  ['amac', '3. Seyahat amacı net değil'],
  ['aile', '4. Aile bağları dengesizliği'],
  ['gecmis', '5. Zayıf seyahat geçmişi'],
  ['yanlis-beyan', '6. Yanlış beyan ve tutarsızlık'],
  ['eksik-belge', '7. Eksik veya zayıf dosya'],
  ['gcms', 'Memur notları (GCMS) nasıl alınır?'],
  ['sonra', 'Ret sonrası 3 yol: hangisi size uygun?'],
  ['ornek', 'Gerçek bir örnek: öğrenci belgesi yetmedi'],
  ['adimlar', 'Yeniden başvuruya 7 adımda hazırlanın'],
  ['hatalar', 'Sık yapılan hatalar'],
  ['kontrol-listesi', 'Yeniden başvuru kontrol listesi'],
  ['sss', 'Sık sorulan sorular'],
  ['kaynaklar', 'Resmî kaynaklar'],
] as const;

const faqs = [
  {
    question: 'Kanada ziyaretçi vizesi reddine itiraz edilebilir mi?',
    answer:
      'Hayır. Ziyaretçi vizesi gibi geçici oturum başvurularında resmi bir itiraz süreci yoktur. Seçenekleriniz: reddin gerekçesini gideren yeni kanıtlarla yeniden başvurmak, vize ofisinden yeniden değerlendirme istemek veya karar hukuka aykırı ya da mantıksızsa Federal Mahkeme’de yargısal inceleme başvurusu yapmaktır.',
  },
  {
    question: 'Redden sonra ne kadar beklemeliyim?',
    answer:
      'Zorunlu bir bekleme süresi yoktur; red mektubunda aksi yazmıyorsa hemen yeniden başvurabilirsiniz. Ancak aynı dosya ve aynı bilgilerle başvurmak büyük olasılıkla aynı sonucu verir. Önce ret gerekçesini anlamak ve onu gideren yeni kanıt hazırlamak gerekir.',
  },
  {
    question: 'Memur notlarını (GCMS) nasıl alırım?',
    answer:
      'GCMS notları, IRCC’nin dosyanızdaki iç kayıtlarıdır ve ATIP (bilgi edinme) başvurusu ile alınır. Access to Information Act kapsamında ücret 5 CAD’dir; yasal cevap süresi 30 gündür. 29 Temmuz 2025’ten beri çoğu geçici oturum reddiyle birlikte memur karar notu zaten red mektubuyla gönderilmektedir; önce red mektubunun eklerini kontrol edin.',
  },
  {
    question: 'Mahkeme (judicial review) için sürem ne kadar?',
    answer:
      'Karar Kanada dışında verildiyse, red tebliğinden itibaren 60 gün içinde Federal Mahkeme’ye izin (leave) başvurusu yapılmalıdır. Karar Kanada içinde verildiyse süre 15 gündür. GCMS notlarını beklemek bu süreyi durdurmaz. Federal Mahkeme’de yalnızca avukat temsil edebilir.',
  },
  {
    question: 'Bankada çok param vardı, neden reddedildim?',
    answer:
      'Para tek başına yeterli değildir. Memur; paranın kaynağını, hesap hareketlerinin düzenini, seyahat planınızla tutarlılığını ve Türkiye’ye dönüş bağlarınızı birlikte değerlendirir. Başvurudan hemen önce hesaba yatırılan ve kaynağı açıklanmayan yüksek tutarlar dosyada soru işareti yaratır.',
  },
  {
    question: 'Öğrenci belgesi ekledim, yine de red aldım. Neden?',
    answer:
      'Öğrenci belgesi tek başına dönüş bağı sayılmaz. Memur; eğitiminizin ne zaman biteceğini, derslere dönüşünüzün zorunlu olup olmadığını, iş ve aile bağlarınızı ve seyahat geçmişinizi birlikte inceler. Belge, ancak dönüşü zorunlu kılan somut gerekçelerle birlikte anlamlıdır.',
  },
  {
    question: 'Aynı hatayı tekrarlamamak için ne yapmalıyım?',
    answer:
      'Önce ret mektubunu ve memur notlarını okuyun; her ret gerekçesini tek tek not edin. Ardından her gerekçeye karşılık gelen yeni bir kanıt hazırlayın ve niyet mektubunuzda her gerekçeye açıkça cevap verin. Gerekçelere değinmeyen bir yeniden başvuru genellikle aynı sonucu verir.',
  },
  {
    question: 'Danışman tutarken nelere dikkat etmeliyim?',
    answer:
      'Ücret karşılığı göçmenlik danışmanlığı yalnızca lisanslı kişiler verebilir: CICC üyesi RCIC danışmanlar, baroya kayıtlı avukatlar ve Quebec noterleri. Danışmanın lisans numarasını isteyip resmî kayıttan doğrulayın. Vize garantisi, hızlandırma veya kesin sonuç vaat eden teklifler dolandırıcılık işaretidir; kararı yalnızca IRCC verir.',
  },
];

const reasons = [
  {
    title: 'Geri dönüş bağları zayıf',
    text: 'Memur, kalış süreniz sonunda Kanada’dan ayrılacağınıza ikna olmadı (IRPR 179b). En sık rastlanan ret nedenidir.',
    href: '#baglar',
    label: 'Bağlar bölümüne git →',
  },
  {
    title: 'Mali yetersizlik ve fon kaynağı',
    text: 'Bakiye yeterli görünse bile paranın kaynağı veya hesap hareketleri memuru ikna etmedi.',
    href: '#mali',
    label: 'Mali bölümüne git →',
  },
  {
    title: 'Seyahat amacı net değil',
    text: 'Ziyaret planı belirsiz, kalış süresi veya masraflarla tutarsız bulundu.',
    href: '#amac',
    label: 'Amaç bölümüne git →',
  },
  {
    title: 'Aile bağları dengesizliği',
    text: 'Kanada’da yakın aile varken Türkiye’de sizi geri çekecek bağlar zayıf göründü.',
    href: '#aile',
    label: 'Aile bölümüne git →',
  },
  {
    title: 'Zayıf seyahat geçmişi',
    text: 'Daha önce vize alıp kurallara uygun seyahat ettiğinize dair kayıt yok veya önceki ihlaller var.',
    href: '#gecmis',
    label: 'Geçmiş bölümüne git →',
  },
  {
    title: 'Yanlış beyan ve tutarsızlık',
    text: 'Belgeler veya beyanlar arasında çelişki bulundu; en ağır sonuçları olan ret nedenidir.',
    href: '#yanlis-beyan',
    label: 'Yanlış beyan bölümüne git →',
  },
  {
    title: 'Eksik veya zayıf dosya',
    text: 'Gerekli belgeler eksik, çeviriler yetersiz veya dosya memurun sorularını cevaplamıyor.',
    href: '#eksik-belge',
    label: 'Dosya bölümüne git →',
  },
] as const;

export function VisaRefusalGuide() {
  const url = `${SITE_URL}${visaRefusal.path}`;
  return (
    <main className="guide-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: visaRefusal.seoTitle,
              description: visaRefusal.description,
              mainEntityOfPage: url,
              inLanguage: 'tr-TR',
              author: publisher,
              publisher,
              image: SOCIAL_IMAGE.url,
              dateModified: visaRefusal.reviewedAt,
              datePublished: visaRefusal.publishedAt,
              isAccessibleForFree: true,
              publishingPrinciples: `${SITE_URL}/kaynak-politikasi`,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                ['Ana Sayfa', '/'],
                ['Rehberler', '/rehberler'],
                ['Kanada Vize Reddi', visaRefusal.path],
              ].map(([name, path], i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name,
                item: `${SITE_URL}${path}`,
              })),
            },
            {
              '@type': 'FAQPage',
              mainEntity: faqs.map(({ question, answer }) => ({
                '@type': 'Question',
                name: question,
                acceptedAnswer: { '@type': 'Answer', text: answer },
              })),
            },
          ],
        }}
      />
      <div className="container guide-shell">
        <nav className="article-breadcrumb" aria-label="İçerik yolu">
          <Link href="/">Ana Sayfa</Link> {' > '}
          <Link href="/rehberler">Rehberler</Link>
          {' > '}
          <span aria-current="page">Kanada Vize Reddi</span>
        </nav>
        <div className="guide-layout">
          <article>
            <p className="article-category">Vize Reddi</p>
            <h1>{visaRefusal.seoTitle}</h1>
            <span className="red-rule" />
            <p className="article-intro">
              Kanada ziyaretçi vizesi reddi, yolun sonu değildir — ama yanlış
              adımla tekrarlanırsa dosyanızı daha da zorlaştırır. Bu rehber,
              en sık rastlanan ret nedenlerini, memurun dosyada neye
              baktığını, ret mektubunun nasıl okunacağını ve her nedeni
              gidermek için hangi kanıtın gerektiğini aynı yerde toplar.
            </p>
            <p>
              Bu sayfa genel bilgilendirme amaçlıdır; hukuki tavsiye değildir.
              Kişisel durumunuz için yetkili bir göçmenlik danışmanı veya
              avukattan değerlendirme alın. Başvurmadan önce ziyaretçi
              vizesinin temel şartlarını{' '}
              <Link href="/kanada-vizesi/kanada-ziyaretci-vizesi">
                Kanada ziyaretçi vizesi rehberi
              </Link>{' '}
              sayfasından inceleyin.
            </p>
            <div className="article-meta">
              <span>
                İlk yayın:{' '}
                {new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(
                  new Date(`${visaRefusal.publishedAt}T12:00:00Z`),
                )}
              </span>
              <span>
                Son güncelleme:{' '}
                {new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(
                  new Date(`${visaRefusal.reviewedAt}T12:00:00Z`),
                )}
              </span>
              <span>Yaklaşık okuma: 12 dakika</span>
              <span>Yazar: KanadaVizesi.ca İçerik Ekibi</span>
            </div>

            <section className="guide-callout" id="kisa-cevap">
              <h2>Kısa cevap</h2>
              <p>
                Kanada ziyaretçi vizesi reddine{' '}
                <strong>resmi bir itiraz süreci yoktur</strong>. Üç yolunuz
                var: reddin gerekçesini gideren{' '}
                <strong>yeni kanıtlarla yeniden başvurmak</strong>, vize
                ofisinden <strong>yeniden değerlendirme istemek</strong> veya
                karar hukuka aykırı ya da mantıksızsa Federal Mahkeme’de{' '}
                <strong>yargısal inceleme</strong> başvurusu yapmak.
              </p>
              <p>
                Çoğu kişi için doğru yol yeniden başvurudur — ama ancak ret
                gerekçesini gideren yeni kanıtla. Aynı dosya ve aynı
                bilgilerle başvurmak büyük olasılıkla aynı sonucu verir.
                Mahkeme yolu ise ancak memur bariz bir hata yaptıysa veya
                kanıtı görmezden geldiyse anlamlıdır; süresi katıdır ve
                yalnızca avukat başvurabilir.
              </p>
            </section>

            <section id="ret-mektubu">
              <h2>Ret mektubu nasıl okunur?</h2>
              <p>
                Ret mektubu, memurun gerekçesini kısa ve standart cümlelerle
                verir. Mektupta genellikle bir veya birkaç kutucuk
                işaretlidir. Mektubu okurken şu soruları sorun: Hangi
                gerekçe işaretli? Mektup hangi tarihte tebliğ edildi? Karar
                notu mektubun ekinde var mı?
              </p>
              <p>
                29 Temmuz 2025’ten beri çoğu geçici oturum reddiyle birlikte
                memurun karar notu da gönderilmektedir. Bu not, mektuptaki
                genel cümlenin arkasındaki gerçek gerekçeyi birkaç satırla
                açıklar. Not mektubun ekinde yoksa, memurun ayrıntılı
                gerekçesini GCMS notlarından öğrenebilirsiniz; nasıl
                alınacağını{' '}
                <a href="#gcms">memur notları bölümünde</a> anlattık.
              </p>
              <p>
                Ret tarihi özellikle önemlidir: mahkeme yolunu
                düşünecekseniz süre bu tarihten hesaplanır ve notları
                beklemek süreyi durdurmaz.
              </p>
            </section>

            <section id="nedenler">
              <h2>En sık 7 ret nedeni</h2>
              <p>
                Aşağıdaki nedenler, ziyaretçi vizesi retlerinde en sık
                görülenlerdir. Bir dosyada genellikle birden fazla gerekçe
                bir arada bulunur; ret mektubunuzda hangilerinin işaretli
                olduğunu önce belirleyin, sonra ilgili bölümü okuyun.
              </p>
              <div className="path-cards">
                {reasons.map(({ title, text, href, label }) => (
                  <article key={title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <a href={href}>{label}</a>
                  </article>
                ))}
              </div>
              <div className="guide-table-wrap">
                <table>
                  <caption>
                    Ret nedenleri ve her birini gidermek için gereken kanıt
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Ret nedeni</th>
                      <th scope="col">Memur ne görür?</th>
                      <th scope="col">Nasıl giderilir?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Geri dönüş bağları zayıf</th>
                      <td>
                        Türkiye’de sizi geri çekecek iş, aile, okul veya
                        mülk bağı yetersiz
                      </td>
                      <td>
                        İş yazısı ve onaylı izin, dönüş tarihli okul kaydı,
                        aile ve tapu belgeleri
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Mali yetersizlik</th>
                      <td>
                        Bakiye, hesap hareketleri veya fon kaynağı seyahat
                        planını desteklemiyor
                      </td>
                      <td>
                        6-12 aylık döküm, toplu girişlerin kaynağı, sponsor
                        belgeleri
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Seyahat amacı net değil</th>
                      <td>
                        Plan belirsiz; kalış süresi ve masraflar tutarsız
                      </td>
                      <td>
                        Günlük seyahat planı, davet mektubu, dönüş bileti
                        niyeti
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Aile bağları dengesizliği</th>
                      <td>
                        Kanada’da yakın aile varken Türkiye’de kalan bağlar
                        zayıf
                      </td>
                      <td>
                        Türkiye’de kalan eş, çocuk veya bakılan aile
                        üyelerinin belgeleri
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Zayıf seyahat geçmişi</th>
                      <td>
                        Daha önce vize alıp kurallara uygun dönüldüğüne dair
                        kayıt yok
                      </td>
                      <td>
                        Önceki vize ve giriş-çıkış kayıtları; yoksa önce
                        başka ülkelere uyumlu seyahat
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Yanlış beyan</th>
                      <td>Belgeler veya beyanlar arasında çelişki</td>
                      <td>
                        Dürüst ve tutarlı dosya; hata varsa açıklama ve
                        düzeltme
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Eksik veya zayıf dosya</th>
                      <td>
                        Gerekli belge eksik veya memurun sorularını
                        cevaplamıyor
                      </td>
                      <td>
                        Eksik belgeyi tamamlamak ve niyet mektubunda her
                        gerekçeye cevap vermek
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="baglar">
              <h2>1. Geri dönüş bağları zayıf (IRPR 179b)</h2>
              <p>
                Bu, ziyaretçi vizesi retlerinin en yaygın nedenidir. Memur,
                kalış süreniz sonunda Kanada’dan ayrılacağınıza ikna
                olmadığında, ilgili yönetmelik maddesi (IRPR 179b) uyarınca
                ret verir. İspat yükü sizdedir: “geri döneceğim” demek
                yetmez; dönüşü zorunlu kılan koşulları belgeyle göstermeniz
                gerekir.
              </p>
              <p>
                Memur şu sorulara cevap arar: Türkiye’de düzenli bir işiniz
                var mı ve izinli mi gidiyorsunuz? Eğitiminiz devam ediyor
                ve dönüş tarihiniz belli mi? Eşiniz, çocuğunuz veya
                bakmakla yükümlü olduğunuz aile üyeleriniz Türkiye’de mi
                kalıyor? Eviniz, iş yeriniz veya maddi yükümlülükleriniz
                sizi geri çağırıyor mu?
              </p>
              <h3>Bu ret nasıl giderilir?</h3>
              <ul>
                <li>
                  <strong>İşveren yazısı:</strong> göreviniz, maaşınız,
                  işe başlangıç tarihiniz ve onaylanmış izin süreniz yazılı
                  olmalı; işverenin iletişim bilgileri eklenmeli.
                </li>
                <li>
                  <strong>Öğrenci belgesi:</strong> kayıt durumunuz, dönem
                  takvimi ve derslere dönüş tarihiniz açık olmalı. Belge
                  tek başına yeterli değildir; dönüşün neden zorunlu
                  olduğunu göstermelidir.
                </li>
                <li>
                  <strong>Aile bağları:</strong> Türkiye’de kalan eş,
                  çocuk veya bakılan aile üyelerinin kimlik ve ikamet
                  belgeleri.
                </li>
                <li>
                  <strong>Mülk ve yükümlülükler:</strong> tapu, kira
                  sözleşmesi, vergi kayıtları veya işletme belgeleri.
                </li>
                <li>
                  <strong>Seyahat geçmişi:</strong> daha önce vize alıp
                  süresinde geri döndüğünüz ülkelerin kayıtları.
                </li>
              </ul>
              <p>
                Genç, bekâr, işsiz ve mülksüz bir profil memur için riskli
                görünür. Bu durumda dosya, tek bir belgeyle değil,
                bağların bütünüyle güçlendirilmelidir; bazen de durumu
                güçlenene kadar beklemek doğru karardır.
              </p>
            </section>

            <section id="mali">
              <h2>2. Mali yetersizlik ve fon kaynağı</h2>
              <p>
                Memur yalnızca bakiyeye bakmaz; paranın kaynağını, hesap
                hareketlerinin düzenini ve tutarın seyahat planıyla uyumunu
                birlikte değerlendirir. Yüksek bakiye tek başına onay
                sağlamaz.
              </p>
              <h3>Bu ret nasıl giderilir?</h3>
              <ul>
                <li>
                  <strong>6-12 aylık banka dökümü:</strong> tek bir bakiye
                  belgesi yerine düzenli gelir ve gider akışını gösteren
                  döküm sunun.
                </li>
                <li>
                  <strong>Toplu girişleri açıklayın:</strong> başvurudan
                  hemen önce hesaba yatırılan yüksek tutarın kaynağını
                  belgeleyin — maaş, satış, aile desteği. Kaynağı
                  açıklanmayan para dosyada soru işareti yaratır.
                </li>
                <li>
                  <strong>Gelir belgeleri:</strong> maaş bordroları, vergi
                  kayıtları veya işletme gelir belgeleri.
                </li>
                <li>
                  <strong>Sponsor varsa:</strong> sponsorun gelir ve
                  kimlik belgeleri ile sponsorluk niyetini açıklayan yazısı.
                </li>
                <li>
                  <strong>Bütçe uyumu:</strong> kalış süreniz, konaklama
                  ve günlük masraflarınız gösterdiğiniz tutarla orantılı
                  olmalıdır.
                </li>
              </ul>
              <p>
                Ziyaretçi vizesi için sabit bir minimum bakiye
                açıklanmamıştır; tutar seyahatin süresine ve masraflarına
                göre değerlendirilir.
              </p>
            </section>

            <section id="amac">
              <h2>3. Seyahat amacı net değil</h2>
              <p>
                Memur, ziyaretin neden şimdi yapıldığını, ne kadar
                süreceğini ve ne kadara mal olacağını dosyadan
                anlayamıyorsa ret gerekçesi doğar. Belirsiz plan, uzun
                kalış süresi ve düşük bütçe bir arada görülürse dosya
                tutarsız bulunur.
              </p>
              <h3>Bu ret nasıl giderilir?</h3>
              <ul>
                <li>
                  <strong>Günlük seyahat planı:</strong> hangi tarihte
                  nerede olacağınızı, kiminle görüşeceğinizi ve ne
                  yapacağınızı kısaca yazın.
                </li>
                <li>
                  <strong>Davet mektubu:</strong> Kanada’daki davet eden
                  kişinin kimliği, statüsü, adresi ve ziyaretin amacı.
                </li>
                <li>
                  <strong>Süre uyumu:</strong> kalış süresi, iş izniniz
                  ve bütçenizle tutarlı olmalı; “6 ay kalacağım” demek
                  tek başına plan sayılmaz.
                </li>
                <li>
                  <strong>Dönüş niyeti:</strong> dönüş bileti niyetinizi
                  ve dönüş tarihinizi niyet mektubunda açıkça belirtin.
                </li>
              </ul>
            </section>

            <section id="aile">
              <h2>4. Aile bağları dengesizliği</h2>
              <p>
                Kanada’da eş, anne-baba veya kardeş gibi yakın aile
                üyeleri yaşarken Türkiye’de sizi geri çekecek bağlar zayıf
                görünüyorsa, memur kalıcı kalma niyetinden şüphelenebilir.
                Bu ret, tek başına “Kanada’da akrabanız var” demek
                değildir; iki taraftaki bağların dengesi değerlendirilir.
              </p>
              <h3>Bu ret nasıl giderilir?</h3>
              <ul>
                <li>
                  Türkiye’de kalan eş, çocuk veya bakılan aile üyelerinin
                  belgelerini ekleyin.
                </li>
                <li>
                  Kanada’daki aile üyesinin statüsünü ve sizin ziyaret
                  amacınızı davet mektubuyla netleştirin.
                </li>
                <li>
                  Ziyaretin geçici olduğunu gösteren dönüş planını niyet
                  mektubunda açıklayın.
                </li>
              </ul>
            </section>

            <section id="gecmis">
              <h2>5. Zayıf seyahat geçmişi</h2>
              <p>
                Daha önce hiç vize almamış veya vize alıp seyahat etmemiş
                olmak tek başına ret nedeni değildir; ancak bağları zayıf
                bir dosyada memurun risk değerlendirmesini artırır. Önceki
                vize ihlalleri, süresinde dönmeme veya yanlış bilgi ise
                dosyayı doğrudan zorlaştırır.
              </p>
              <h3>Bu ret nasıl giderilir?</h3>
              <ul>
                <li>
                  Önceki vizelerinizin ve giriş-çıkış kayıtlarınızın
                  kopyalarını ekleyin.
                </li>
                <li>
                  Seyahat geçmişiniz yoksa, önce vize isteyen başka bir
                  ülkeye seyahat edip süresinde dönmek dosyanızı
                  güçlendirir.
                </li>
                <li>
                  Önceki retlerinizi saklamayın; başvuru formunda doğru
                  beyan edin ve niyet mektubunda kısaca açıklayın.
                </li>
              </ul>
            </section>

            <section id="yanlis-beyan">
              <h2>6. Yanlış beyan ve tutarsızlık</h2>
              <p>
                Belgeler, formlar veya beyanlar arasında çelişki bulunması
                en ağır sonuçları olan ret nedenidir. Yanlış veya yanıltıcı
                bilgi, yalnızca o başvurunun reddine değil, göçmenlik
                yasası uyarınca 5 yıla kadar Kanada’ya giriş yasağına yol
                açabilir.
              </p>
              <h3>Bu ret nasıl giderilir?</h3>
              <ul>
                <li>
                  Formdaki her bilginin belgelerle birebir uyumlu olduğunu
                  kontrol edin: tarihler, iş unvanları, adresler, aile
                  bilgileri.
                </li>
                <li>
                  Daha önce bir hata yaptıysanız saklamayın; niyet
                  mektubunda hatayı açıklayın ve doğrusunu belgeleyin.
                </li>
                <li>
                  Sahte belge veya başkası adına düzenlenmiş belge asla
                  kullanmayın.
                </li>
                <li>
                  Bu gerekçeyle ret aldıysanız, yeniden başvurmadan önce
                  mutlaka yetkili bir avukattan değerlendirme alın.
                </li>
              </ul>
            </section>

            <section id="eksik-belge">
              <h2>7. Eksik veya zayıf dosya</h2>
              <p>
                Bazen ret, tek bir büyük eksikten değil, dosyanın
                bütününün memurun sorularını cevaplamamasından kaynaklanır:
                eksik belge, çevrilmemiş belge, amacı açıklamayan niyet
                mektubu veya birbirini desteklemeyen parçalar.
              </p>
              <h3>Bu ret nasıl giderilir?</h3>
              <ul>
                <li>
                  Başvuru kontrol listesini baştan oluşturun ve her belgeyi
                  işaretleyin.
                </li>
                <li>
                  Türkçe belgelerin onaylı çevirilerini ekleyin.
                </li>
                <li>
                  Niyet mektubunuzu ret gerekçelerine göre yeniden yazın:
                  her gerekçeye bir paragraf ayırın ve karşılığındaki
                  kanıta atıf yapın.
                </li>
              </ul>
            </section>

            <section id="gcms">
              <h2>Memur notları (GCMS) nasıl alınır?</h2>
              <p>
                GCMS notları, IRCC’nin dosyanızdaki iç kayıtlarıdır:
                memurun değerlendirmesi, hangi belgeye ne not düştüğü ve
                ret gerekçesinin ayrıntısı. Yeniden başvurmadan önce
                notları okumak, neyi düzeltmeniz gerektiğini tahmin
                etmekten daha güvenilirdir.
              </p>
              <ol>
                <li>
                  <strong>Önce red mektubunun eklerini kontrol edin:</strong>{' '}
                  29 Temmuz 2025’ten beri çoğu ret mektubuyla birlikte
                  memur karar notu gönderilmektedir.
                </li>
                <li>
                  <strong>Not yoksa ATIP başvurusu yapın:</strong> Kanada
                  Hükümeti’nin ATIP çevrimiçi başvuru aracından IRCC’yi
                  seçin; dosya numaranızı ve kimlik bilgilerinizi girin.
                </li>
                <li>
                  <strong>Ücret ve süre:</strong> Access to Information
                  Act kapsamında ücret 5 CAD’dir; yasal cevap süresi 30
                  gündür, uzayabilir. Başkası sizin adınıza istiyorsa
                  imzalı muvafakat formu (IMM 5744) gerekir.
                </li>
                <li>
                  <strong>Notlar gelince:</strong> gerekçeleri tek tek
                  not edin; yeniden başvurunuzu bu gerekçelere göre
                  kurun.
                </li>
              </ol>
              <p>
                Önemli uyarı: GCMS notlarını beklemek, mahkeme başvuru
                süresini durdurmaz. Red tarihinizi not edin ve süreyi
                ayrıca takip edin.
              </p>
            </section>

            <section id="sonra">
              <h2>Ret sonrası 3 yol: hangisi size uygun?</h2>
              <div className="guide-table-wrap">
                <table>
                  <caption>Ret sonrası seçeneklerin karşılaştırması</caption>
                  <thead>
                    <tr>
                      <th scope="col">Yol</th>
                      <th scope="col">Ne işe yarar?</th>
                      <th scope="col">Kime uygun?</th>
                      <th scope="col">Dikkat edilmesi gereken</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Yeniden başvuru</th>
                      <td>
                        Yeni kanıtlarla dosyayı güçlendirip tekrar
                        başvurmak
                      </td>
                      <td>
                        Ret gerekçesi somut ve giderilebilir olanlar
                      </td>
                      <td>
                        Aynı dosya aynı sonucu verir; her gerekçeye yeni
                        kanıt gerekir
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Yeniden değerlendirme</th>
                      <td>
                        Vize ofisinden kararın yeniden incelenmesini istemek
                      </td>
                      <td>
                        Açık bir hata veya gözden kaçan belge olduğunu
                        düşünenler
                      </td>
                      <td>
                        Memurun takdirindedir, hakkı yoktur, süreyi
                        durdurmaz
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Yargısal inceleme</th>
                      <td>
                        Federal Mahkeme’nin kararın hukuka uygunluğunu
                        denetlemesi
                      </td>
                      <td>
                        Memur bariz hata yaptıysa veya kanıtı görmezden
                        geldiyse
                      </td>
                      <td>
                        Kanada dışı kararlarda 60 gün; yalnızca avukat
                        başvurabilir; mahkeme vize vermez
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Yargısal inceleme bir itiraz değildir: mahkeme başvurunuzu
                yeniden değerlendirmez, kararın makul ve hukuka uygun olup
                olmadığına bakar. Başarılı olursa dosya genellikle başka bir
                memura geri gönderilir. Bu yol pahalıdır ve uzun sürer;
                çoğu kişi için yeniden başvuru daha hızlı ve daha
                ekonomiktir.
              </p>
            </section>

            <section id="ornek">
              <h2>Gerçek bir örnek: öğrenci belgesi yetmedi</h2>
              <p>
                Bir okurumuz turist vizesine başvurdu; parası ve sicili
                temizdi, her şeyin yolunda olduğunu düşünüyordu. Ret
                gerekçesi yalnızca geri dönüş bağlarıydı: memur, ziyaret
                sonunda Türkiye’ye döneceğine ikna olmamıştı. Okurumuz
                öğrenci belgesini ekleyip yeniden başvurdu; yine de
                reddedildi.
              </p>
              <p>
                Bu örnek şunu gösterir: tek bir belge, bağ sorununu
                çözmez. Öğrenci belgesi, ancak dönüş tarihli kayıt,
                derslere dönüş zorunluluğu ve diğer bağlarla birlikte
                sunulduğunda anlam kazanır. Okurumuz şimdi memur
                notlarını bekliyor; notlar geldikten sonra eksik bağları
                tamamlayıp yeniden başvurmayı planlıyor.
              </p>
            </section>

            <section id="adimlar">
              <h2>Yeniden başvuruya 7 adımda hazırlanın</h2>
              <ol>
                <li>
                  <strong>Ret mektubunu okuyun:</strong> Hangi gerekçeler
                  işaretli, ret tarihi ne? Mahkeme süresini hesaplayın.
                </li>
                <li>
                  <strong>Memur notlarını alın:</strong> Mektup ekinde
                  yoksa GCMS notlarını isteyin ve gerekçeleri tek tek
                  çıkarın.
                </li>
                <li>
                  <strong>Her gerekçeye bir kanıt eşleştirin:</strong>{' '}
                  Gerekçe listesinin karşısına hangi yeni belgeyi
                  ekleyeceğinizi yazın.
                </li>
                <li>
                  <strong>Dosyayı baştan kurun:</strong> Eski dosyayı
                  kopyalamayın; tutarlılık için formları ve belgeleri
                  yeniden gözden geçirin.
                </li>
                <li>
                  <strong>Niyet mektubunu gerekçelere göre yazın:</strong>{' '}
                  Her ret gerekçesine bir paragraf ayırın ve karşılığındaki
                  kanıta atıf yapın.
                </li>
                <li>
                  <strong>Bağlarınızı güçlendirin:</strong> İş, okul,
                  aile ve mülk belgelerini güncel ve tutarlı hazırlayın.
                </li>
                <li>
                  <strong>Gerekirse profesyonel destek alın:</strong>{' '}
                  Yanlış beyan gerekçesi varsa veya mahkeme yolunu
                  düşünüyorsanız yetkili bir avukattan değerlendirme
                  isteyin.
                </li>
              </ol>
              <div className="guide-assessment">
                <h2>Hedefinize uygun bilgi başlıklarını belirleyin</h2>
                <p>
                  Kanada’ya geliş amacınız ve mevcut durumunuz hakkında
                  temel bilgileri paylaşın. Formunuz incelendikten sonra
                  ilgili rehberler ve ihtiyaç halinde
                  yararlanabileceğiniz profesyonel destek seçenekleri
                  hakkında bilgi alabilirsiniz.
                </p>
                <Link href="/on-degerlendirme">
                  Ön değerlendirme formunu doldurun
                </Link>
              </div>
            </section>

            <section id="hatalar">
              <h2>Sık yapılan hatalar</h2>
              <h3>Aynı dosyayla hemen yeniden başvurmak</h3>
              <p>
                Değişen hiçbir şey yoksa sonuç da değişmez. Her ret,
                dosyaya işlenir; üçüncü başvuru ikinciden daha dikkatli
                hazırlanmalıdır.
              </p>
              <h3>Ret mektubunu okumadan başvurmak</h3>
              <p>
                Gerekçeyi bilmeden hazırlanan dosya, memurun asıl sorusunu
                cevaplamaz.
              </p>
              <h3>Son dakika para yatırmak</h3>
              <p>
                Başvurudan hemen önce hesaba yatırılan ve kaynağı
                açıklanmayan yüksek tutar, dosyayı güçlendirmez; şüphe
                yaratır.
              </p>
              <h3>Sahte belge veya yanıltıcı bilgi kullanmak</h3>
              <p>
                Yanlış beyan, 5 yıla kadar giriş yasağına yol açabilir.
                “Garantili vize” vaat edenlere güvenmeyin.
              </p>
              <h3>Mahkeme süresini kaçırmak</h3>
              <p>
                GCMS notlarını beklerken 60 günlük süre işler. Mahkeme
                yolunu düşünüyorsanız süreyi ayrıca takip edin.
              </p>
              <h3>Lisanssız danışmana para vermek</h3>
              <p>
                Ücret karşılığı danışmanlık yalnızca lisanslı kişiler
                verebilir. Lisansı resmî kayıttan doğrulamadan ödeme
                yapmayın.
              </p>
            </section>

            <section id="kontrol-listesi">
              <h2>Yeniden başvuru kontrol listesi</h2>
              <ul className="guide-checklist">
                <li>Ret mektubunu ve varsa memur notlarını okudum.</li>
                <li>Her ret gerekçesinin karşısına yeni bir kanıt yazdım.</li>
                <li>İşveren yazısı ve onaylı izin belgem güncel.</li>
                <li>Öğrenciysem dönüş tarihli kayıt belgem hazır.</li>
                <li>6-12 aylık banka dökümüm ve gelir belgelerim tutarlı.</li>
                <li>Toplu para girişlerinin kaynağını açıkladım.</li>
                <li>Seyahat planım ve davet mektubum hazır.</li>
                <li>Türkiye’de kalan aile ve mülk bağlarımı belgeledim.</li>
                <li>Önceki vize retlerimi ve seyahat geçmişimi saklamadım.</li>
                <li>
                  Niyet mektubumda her ret gerekçesine ayrı cevap verdim.
                </li>
                <li>Danışman kullanacaksam lisansını resmî kayıttan doğruladım.</li>
              </ul>
            </section>

            <section id="sss">
              <h2>Sık sorulan sorular</h2>
              <GuideFaq
                items={faqs.map((f) => ({
                  question: f.question,
                  answer: <p>{f.answer}</p>,
                }))}
              />
            </section>

            <section>
              <h2>İlgili rehberler</h2>
              <div className="guide-related">
                {[
                  [
                    'Kanada Ziyaretçi Vizesi',
                    'Ziyaret amacı, belgeler ve değerlendirme ölçütleri.',
                    '/kanada-vizesi/kanada-ziyaretci-vizesi',
                  ],
                  [
                    'Kanada’ya Gitmenin Yasal Yolları',
                    'Ziyaret, eğitim, çalışma ve kalıcı oturum yollarının karşılaştırması.',
                    '/rehberler/kanadaya-gitmenin-yasal-yollari',
                  ],
                  [
                    'Türkiye’den Kanada’ya Nasıl Gidilir?',
                    'Ziyaret, eğitim, çalışma veya kalıcı oturum yollarının genel karşılaştırması.',
                    '/rehberler/turkiyeden-kanadaya-nasil-gidilir',
                  ],
                  [
                    'Kanada’da Eğitim Rehberi',
                    'Okul seçiminden eğitim iznine uzanan temel süreç.',
                    '/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni',
                  ],
                  [
                    'Kanada Çalışma İzni',
                    'Çalışma izni türleri, iş teklifi ve başvuru adımları.',
                    '/kanadada-calisma/kanada-calisma-izni',
                  ],
                  [
                    'Kalıcı Oturum ve Express Entry',
                    'Ekonomik göçmenlik yollarının genel karşılaştırması.',
                    '/kanada-gocmenlik/kalici-oturum-ve-express-entry',
                  ],
                ].map(([title, text, href]) => (
                  <article key={title}>
                    <h3>
                      <Link href={href}>{title}</Link>
                    </h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="guide-sources" id="kaynaklar">
              <h2>Resmî kaynaklar</h2>
              <p>
                Değişebilen ücret, süre ve kurallar için işlem yapmadan
                önce aşağıdaki resmî kaynakları kontrol edin. Bu rehber
                genel bilgilendirme amaçlıdır; hukuki tavsiye değildir.
              </p>
              <ul>
                {sources.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>
          <aside className="guide-toc">
            <h2>Bu rehberde</h2>
            <ol>
              {contents.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
      <GuideMobileToc items={contents} />
    </main>
  );
}
