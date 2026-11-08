import Link from 'next/link';
import { GuideMobileToc } from './guide-mobile-toc';
import { GuideFaq } from './guide-faq';
import { JsonLd } from './json-ld';
import { legalWays, SITE_URL } from '@/lib/content';
import { publisher, SOCIAL_IMAGE } from '@/lib/seo';

const base =
  'https://www.canada.ca/en/immigration-refugees-citizenship/services/';

const sources = [
  [
    'Kanada’ya giriş için vize veya eTA gerekliliğini kontrol etme',
    `${base}visit-canada/entry-requirements-country.html`,
  ],
  ['Kanada ziyaretçi vizesi', `${base}visit-canada/visitor-visa.html`],
  ['Kanada’da eğitim ve eğitim izni', `${base}study-canada/study-permit.html`],
  ['Kanada çalışma izinleri', `${base}work-canada.html`],
  ['Express Entry', `${base}immigrate-canada/express-entry.html`],
  [
    'Express Entry: 2026 puan değişiklikleri',
    `${base}immigrate-canada/express-entry/changes.html`,
  ],
  [
    'Eyalet aday programları',
    `${base}immigrate-canada/provincial-nominees.html`,
  ],
  ['Aile sponsorluğu', `${base}immigrate-canada/family-sponsorship.html`],
  ['Sığınma ve koruma başvurusu', `${base}refugees.html`],
  [
    'IRCC ücret listesi',
    'https://www.ircc.canada.ca/english/information/fees/fees.asp',
  ],
  ['IRCC işlem süreleri', `${base}application/check-processing-times.html`],
  [
    'Kanada göçmenlik ve vatandaşlık temsilcileri',
    `${base}immigration-citizenship-representative.html`,
  ],
] as const;

const contents = [
  ['kisa-cevap', 'Kısa cevap: yasal yollar nelerdir?'],
  ['yollar', 'Kanada’ya gitmenin 7 yasal yolu'],
  ['karsilastirma', 'Yolları karşılaştırın'],
  ['profil', 'Profilinize göre hangi yol?'],
  ['ziyaret', '1. Ziyaretçi vizesiyle gitmek'],
  ['egitim', '2. Eğitim izniyle gitmek'],
  ['calisma', '3. Çalışma izniyle gitmek'],
  ['kalici-oturum', '4. Express Entry ve kalıcı oturum'],
  ['eyalet', '5. Eyalet aday programları'],
  ['aile', '6. Aile üzerinden gitmek'],
  ['siginma', '7. Sığınma ve koruma: göç yolu değildir'],
  ['ucretler', 'Ücretler ve maddi yeterlilik'],
  ['adimlar', 'Başvuruya 7 adımda hazırlanın'],
  ['hatalar', 'Sık yapılan hatalar'],
  ['kontrol-listesi', 'Başlangıç kontrol listesi'],
  ['sss', 'Sık sorulan sorular'],
  ['kaynaklar', 'Resmî kaynaklar'],
] as const;

const faqs = [
  {
    question: 'Kanada’ya gitmenin yasal yolları nelerdir?',
    answer:
      'Türkiye’den Kanada’ya yasal olarak gitmenin başlıca yolları ziyaretçi vizesi, eğitim izni, çalışma izni, Express Entry ile kalıcı oturum, eyalet aday programları ve uygun aile sponsorluğudur. Sığınma ise bir göç yolu değil, koruma başvurusudur ve ayrı koşulları vardır.',
  },
  {
    question: 'Kanada’ya gitmek için iş teklifi gerekir mi?',
    answer:
      'Her yol için iş teklifi gerekmez. Ziyaretçi vizesi, eğitim izni ve Express Entry’nin Federal Skilled Worker Programı iş teklifi olmadan da araştırılabilir. Buna karşılık bazı çalışma izni süreçlerinde iş teklifi ve işveren işlemleri temel unsurdur.',
  },
  {
    question: 'İngilizce bilmeden Kanada’ya gidilebilir mi?',
    answer:
      'Ziyaretçi vizesinde dil sınavı koşulu yoktur; ancak kalıcı oturum programlarının çoğunda İngilizce veya Fransızca dil sonucu gerekir. Eğitim ve çalışma yollarında da programın ve işverenin dil beklentisi ayrıca incelenmelidir.',
  },
  {
    question: 'Üniversite mezunu olmadan Kanada’ya gidilebilir mi?',
    answer:
      'Evet, bazı yollar için üniversite diploması zorunlu değildir. Ziyaretçi vizesi diploma istemez; nitelikli meslek deneyimi olanlar Federal Skilled Trades gibi programları, uygun adaylar eyalet programlarını araştırabilir. Eğitim yolunda ise programın kendi kabul koşulları geçerlidir.',
  },
  {
    question: '40 yaşından sonra Kanada’ya göç edilebilir mi?',
    answer:
      'Yaş, puan temelli sistemlerde etkili bir unsur olsa da tek ölçüt değildir. Dil, eğitim, iş deneyimi, eş profili ve eyalet programları birlikte değerlendirilir; bazı eyalet ve meslek temelli yollar yaşın etkisini azaltabilir.',
  },
  {
    question: 'Turist vizesiyle Kanada’ya gidip çalışabilir miyim?',
    answer:
      'Hayır. Ziyaretçi vizesi tek başına çalışma hakkı vermez. Kanada’da çalışmaya başlamadan önce bunu sağlayan geçerli bir statü veya çalışma izni gerekir.',
  },
  {
    question: 'Kanada’ya gitmek için ne kadar para gerekir?',
    answer:
      'Tutar seçilen yola ve aile büyüklüğüne göre değişir. Ziyaretçi vizesinde sabit bir minimum bakiye açıklanmamıştır; tutar seyahatin süresine ve masraflarına göre değerlendirilir. Express Entry’de ise tek kişilik başvuruda 15.263 CAD yerleşim fonu gösterilmesi gerekir. Başvuru ücretleri, sınav, çeviri ve seyahat giderleri ayrıca hesaplanmalıdır.',
  },
  {
    question: '“Garantili Kanada vizesi” vaat edenlere güvenilir mi?',
    answer:
      'Hayır. Hiçbir kişi veya kurum vize ya da kalıcı oturum garantisi veremez; kararı IRCC verir. Garanti, hızlandırma veya kesin sonuç vaat eden teklifler dolandırıcılık işareti olabilir. Yetkili temsilci kullanacaksanız lisansını resmî kayıttan doğrulayın.',
  },
];

const ways = [
  {
    title: 'Ziyaretçi vizesi',
    text: 'Turistik gezi, aile veya arkadaş ziyareti ve kısa süreli faaliyetler için. Geçici kalış içindir; çalışma hakkı vermez.',
    href: '/kanada-vizesi/kanada-ziyaretci-vizesi',
    label: 'Ziyaretçi vizesi rehberi',
  },
  {
    title: 'Eğitim izni',
    text: 'Uygun bir okuldan kabul ve mali yeterlilikle Kanada’da eğitim almak için. Mezuniyet sonrası bazı kişilere çalışma izni seçenekleri doğabilir.',
    href: '/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni',
    label: 'Öğrenci vizesi ve eğitim izni rehberi',
  },
  {
    title: 'Çalışma izni',
    text: 'İşverene bağlı veya uygun kategorilerde açık çalışma izniyle Kanada’da yasal olarak çalışmak için.',
    href: '/kanadada-calisma/kanada-calisma-izni',
    label: 'Çalışma izni rehberi',
  },
  {
    title: 'Express Entry',
    text: 'Federal ekonomik programlar üzerinden kalıcı oturum için. Profil açmak davet veya onay garantisi değildir.',
    href: '/kanada-gocmenlik/kalici-oturum-ve-express-entry',
    label: 'Express Entry ve kalıcı oturum rehberi',
  },
  {
    title: 'Eyalet aday programları',
    text: 'Eyaletlerin kendi ihtiyaçlarına göre aday seçtiği yollar. Belirli meslek, dil ve yerleşim koşullarına bağlıdır.',
    href: '/kanada-gocmenlik/kalici-oturum-ve-express-entry',
    label: 'Eyalet programları hakkında bilgi',
  },
  {
    title: 'Aile sponsorluğu',
    text: 'Uygun kişilerin eş, partner veya bağımlı çocukları için sponsor olabildiği programlar. Sponsorun koşulları ayrıca incelenir.',
    href: '/rehberler/ailece-kanadaya-gitmek',
    label: 'Ailece Kanada’ya gitmek',
  },
  {
    title: 'Sığınma ve koruma',
    text: 'Zulüm veya ciddi risk nedeniyle koruma arayanlar içindir. Ekonomik göç yolu değildir ve ayrı bir değerlendirme süreci vardır.',
    href: '/rehberler/kanada-gocmenlik-dolandiriciliklari',
    label: 'Yanlış bilgiler ve dolandırıcılıklar',
  },
] as const;

export function LegalWaysGuide() {
  const url = `${SITE_URL}${legalWays.path}`;
  return (
    <main className="guide-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: legalWays.seoTitle,
              description: legalWays.description,
              mainEntityOfPage: url,
              inLanguage: 'tr-TR',
              author: publisher,
              publisher,
              image: SOCIAL_IMAGE.url,
              dateModified: legalWays.reviewedAt,
              datePublished: legalWays.publishedAt,
              isAccessibleForFree: true,
              publishingPrinciples: `${SITE_URL}/kaynak-politikasi`,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                ['Ana Sayfa', '/'],
                ['Rehberler', '/rehberler'],
                ['Kanada’ya Gitmenin Yasal Yolları', legalWays.path],
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
          <span aria-current="page">Kanada’ya Gitmenin Yasal Yolları</span>
        </nav>
        <div className="guide-layout">
          <article>
            <p className="article-category">Kanada’ya Gitme Rehberi</p>
            <h1>{legalWays.seoTitle}</h1>
            <span className="red-rule" />
            <p className="article-intro">
              Türkiye’de yaşayıp Kanada’ya yerleşmek isteyenler için tek bir yol
              yoktur: ziyaret, eğitim, çalışma, kalıcı oturum, eyalet
              programları ve aile yolları farklı amaçlara, profillere ve
              bütçelere hitap eder. Bu rehber, her yolun ne işe yaradığını,
              kimler için uygun olduğunu ve nereden başlanacağını aynı yerde
              karşılaştırır.
            </p>
            <p>
              Önce genel çerçeveyi görmek isterseniz{' '}
              <Link href="/rehberler/turkiyeden-kanadaya-nasil-gidilir">
                Türkiye’den Kanada’ya Nasıl Gidilir? Kapsamlı Başlangıç Rehberi
              </Link>{' '}
              sayfasını okuyun; bu sayfa onun yasal yollar bölümünü ayrıntılı
              olarak açar.
            </p>
            <div className="article-meta">
              <span>
                İlk yayın:{' '}
                {new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(
                  new Date(`${legalWays.publishedAt}T12:00:00Z`),
                )}
              </span>
              <span>
                Son güncelleme:{' '}
                {new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(
                  new Date(`${legalWays.reviewedAt}T12:00:00Z`),
                )}
              </span>
              <span>Yaklaşık okuma: 12 dakika</span>
              <span>Yazar: KanadaVizesi.ca İçerik Ekibi</span>
            </div>

            <section className="guide-callout" id="kisa-cevap">
              <h2>Kısa cevap</h2>
              <p>
                Türkiye’den Kanada’ya yasal olarak gitmenin başlıca yolları{' '}
                <strong>
                  ziyaretçi vizesi, eğitim izni, çalışma izni, Express Entry ile
                  kalıcı oturum, eyalet aday programları ve uygun aile
                  sponsorluğudur
                </strong>
                . Hiçbiri herkese uymaz: ziyaretçi vizesi çalışma hakkı vermez,
                okul kabulü eğitim iznini garanti etmez, iş teklifi her zaman
                çalışma izni anlamına gelmez ve Express Entry profili açmak
                kalıcı oturum garantisi değildir.
              </p>
              <p>
                Doğru yol, “en kolay yol hangisi?” sorusuyla değil, “benim
                amacım, yaşım, eğitimim, dilim, deneyimim ve bütçem hangi yola
                uyuyor?” sorusuyla bulunur. Sığınma ise bu listede bir göç yolu
                olarak yer almaz; koruma arayanlar için ayrı koşulları olan bir
                başvurudur.
              </p>
            </section>

            <section id="yollar">
              <h2>Kanada’ya gitmenin 7 yasal yolu</h2>
              <p>
                Aşağıdaki yolların her biri farklı bir başvuru türü ve farklı
                haklar doğurur. Bir yolun başka bir kişiye uygun olması, sizin
                için de uygun olduğu anlamına gelmez.
              </p>
              <div className="path-cards">
                {ways.map(({ title, text, href, label }) => (
                  <article key={title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <Link href={href}>{label} →</Link>
                  </article>
                ))}
              </div>
            </section>

            <section id="karsilastirma">
              <h2>Yolları karşılaştırın</h2>
              <p>
                Aşağıdaki karşılaştırma kişisel uygunluk değerlendirmesi
                değildir. Kanada’ya giriş belgesi, eğitim hakkı, çalışma hakkı
                ve kalıcı oturum birbirinden farklı kavramlardır.
              </p>
              <div className="guide-table-wrap">
                <table>
                  <caption>
                    Türkiye’den Kanada’ya yasal yolların karşılaştırması
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Yol</th>
                      <th scope="col">Temel amaç</th>
                      <th scope="col">Tipik başlangıç şartı</th>
                      <th scope="col">Çalışma hakkı</th>
                      <th scope="col">Kalıcı oturuma giden yol</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Ziyaretçi vizesi</th>
                      <td>Geçici ziyaret</td>
                      <td>
                        Geçerli amaç, mali yeterlilik, geçici kalış niyeti
                      </td>
                      <td>Hayır</td>
                      <td>Doğrudan sağlamaz</td>
                    </tr>
                    <tr>
                      <th scope="row">Eğitim izni</th>
                      <td>Uygun kurumda eğitim</td>
                      <td>Okul kabulü, mali kaynak, eğitim planı</td>
                      <td>İzin koşulları kapsamında</td>
                      <td>
                        Mezuniyet sonrası çalışma ve program koşullarına bağlı
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Çalışma izni</th>
                      <td>Belirli işte çalışmak</td>
                      <td>Uygun işveren süreci ve aday başvurusu</td>
                      <td>İzin koşullarıyla sınırlı</td>
                      <td>
                        Kanada deneyimi bazı programlarda katkı sağlayabilir
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Express Entry</th>
                      <td>Kalıcı oturum</td>
                      <td>
                        Program şartları, dil, eğitim denkliği ve gerektiğinde
                        davet
                      </td>
                      <td>Kalıcı oturum sonrasında genel olarak</td>
                      <td>Doğrudan hedefi kalıcı oturumdur</td>
                    </tr>
                    <tr>
                      <th scope="row">Eyalet aday programı</th>
                      <td>Eyalete yerleşim ve kalıcı oturum</td>
                      <td>Eyaletin meslek, dil ve yerleşim koşulları</td>
                      <td>Program ve izin koşullarına göre</td>
                      <td>Adaylık, federal incelemeyle birlikte ilerler</td>
                    </tr>
                    <tr>
                      <th scope="row">Aile sponsorluğu</th>
                      <td>Uygun aile birleşimi</td>
                      <td>Sponsor ve başvuru sahibinin şartları</td>
                      <td>Statü ve izin türüne göre</td>
                      <td>Programın kendisi kalıcı oturum yoludur</td>
                    </tr>
                    <tr>
                      <th scope="row">Sığınma ve koruma</th>
                      <td>Koruma</td>
                      <td>Zulüm veya ciddi risk gerekçesi</td>
                      <td>Başvuru sürecindeki koşullara göre</td>
                      <td>Göç yolu değildir; koruma kararı ayrıdır</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="profil">
              <h2>Profilinize göre hangi yol?</h2>
              <p>
                Aşağıdaki örnekler açıklama amaçlıdır; kesin uygunluk veya sonuç
                vermez. Kendi profilinizi bu başlıklarla karşılaştırın, sonra
                ilgili rehberi ayrıntılı okuyun.
              </p>
              <div className="guide-profile">
                <h3>Genç mezun, dil sınavına hazır</h3>
                <p>
                  Lisans mezuniyeti, İngilizce dil sonucu ve bir yıllık
                  nitelikli iş deneyimi olan aday önce Express Entry’nin Federal
                  Skilled Worker Programını inceleyebilir. Eğitim yolunu
                  düşünenler ise okul ve program seçimini bütçeyle birlikte
                  değerlendirmelidir.
                </p>
                <h3>Deneyimli çalışan, Kanada deneyimi yok</h3>
                <p>
                  Türkiye’de birkaç yıllık nitelikli deneyimi olan aday için
                  Express Entry ve eyalet programları öne çıkar. İş teklifi
                  olmadan da araştırma yapılabilir; ancak teklifin hangi
                  programda ne işe yaradığı ayrıca kontrol edilmelidir.
                </p>
                <h3>İngilizce bilmiyor</h3>
                <p>
                  Dil sınavı koşulu olmayan ziyaretçi vizesi araştırma konusu
                  olabilir; kalıcı oturum programlarının çoğu ise dil sonucu
                  ister. Dil öğrenme planı, kalıcı oturum hedefinin parçası
                  olarak ele alınmalıdır.
                </p>
                <h3>Üniversite mezunu değil</h3>
                <p>
                  Diploma bütün yollar için zorunlu değildir. Nitelikli meslek
                  deneyimi olanlar Federal Skilled Trades ve eyalet
                  programlarını; ziyaret amacıyla gidenler ziyaretçi vizesini
                  araştırabilir.
                </p>
                <h3>40 yaşından sonra</h3>
                <p>
                  Yaş, puan temelli sistemlerde etkili olsa da tek ölçüt
                  değildir. Dil, eğitim, iş deneyimi, eş profili ve eyalet
                  programları birlikte incelenmelidir.
                </p>
                <h3>Ailece gitmek istiyor</h3>
                <p>
                  Eşin eğitimi, dili ve deneyimi; çocukların eğitimi ve aile
                  bütçesi seçilecek yolu etkiler. Bazı yollarda eş için ayrı
                  çalışma hakkı koşulları aranır; aile bütçesini eşin kesin
                  çalışacağı varsayımıyla kurmayın.
                </p>
              </div>
            </section>

            <section id="ziyaret">
              <h2>1. Ziyaretçi vizesiyle gitmek</h2>
              <p>
                Ziyaretçi vizesi, Kanada’yı turistik amaçla görmek, ailenizi
                veya arkadaşlarınızı ziyaret etmek ya da kısa süreli bir iş
                etkinliğine katılmak isteyenler içindir. Türkiye Cumhuriyeti
                vatandaşları, genel olarak ziyaret amacıyla seyahat etmeden önce
                ziyaretçi vizesi almak zorundadır.
              </p>
              <p>
                Başvuruda yalnızca belge yüklemek yeterli değildir; seyahat
                amacınızın geçici ve tutarlı olduğunu, masrafları
                karşılayabildiğinizi ve izin verilen sürenin sonunda Kanada’dan
                ayrılacağınızı dosyanın bütünüyle göstermeniz gerekir.
                Çoğunlukla 6 aya kadar kalışa izin verilir; nihai süreyi sınır
                görevlisi belirler. Devlet başvuru ücreti kişi başı 100 CAD’den
                başlar; biyometri ayrıca ücretlendirilir.
              </p>
              <p>
                Ziyaretçi vizesi size Kanada’ya seyahat etme hakkı verir; ülkeye
                giriş garantisi vermez. Ayrıca tek başına çalışma hakkı da
                vermez.{' '}
                <Link href="/kanada-vizesi/kanada-ziyaretci-vizesi">
                  Kanada ziyaretçi vizesi rehberi →
                </Link>
              </p>
            </section>

            <section id="egitim">
              <h2>2. Eğitim izniyle gitmek</h2>
              <p>
                Kanada’da eğitim almak isteyenler için okul ve program seçimi,
                finansal yeterlilik, eğitim izni ve mezuniyet sonrası seçenekler
                birlikte değerlendirilir. Uygun bir eğitim kurumundan kabul
                almak, eğitim izni almak ve Kanada’ya seyahat edebilmek farklı
                aşamalardır; okul kabulü eğitim iznini garanti etmez.
              </p>
              <p>
                Birçok eğitim izni başvurusunda eyalet veya bölge onay yazısı
                olan PAL/TAL gerekir. Eğitim izni için ne kadar para gerektiği
                programa ve aile büyüklüğüne göre değişir; 1 Eylül 2026 ve
                sonrası başvurularda Quebec dışında tek kişinin yıllık yaşam
                gideri eşiği 23.448 CAD’dir. Bu tutara okul ücreti ve ulaşım
                dahil değildir.{' '}
                <Link href="/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni">
                  Kanada öğrenci vizesi ve eğitim izni rehberi →
                </Link>
              </p>
              <div className="guide-warning">
                <p>
                  <strong>Önemli:</strong> Eğitim yolu yalnızca Kanada’ya giriş
                  yöntemi olarak değerlendirilmemelidir; seçilen programın
                  akademik veya mesleki değeri, toplam maliyeti ve gerçek
                  fırsatları birlikte düşünülmelidir.
                </p>
              </div>
            </section>

            <section id="calisma">
              <h2>3. Çalışma izniyle gitmek</h2>
              <p>
                Kanada’da çalışmak için çoğu durumda çalışma izni gerekir. İzin,
                belirli bir işverene bağlı olabilir veya uygun bir kategori
                kapsamında açık olarak düzenlenebilir. Ziyaretçi vizesi, çalışma
                izni değildir.
              </p>
              <p>
                İşverene bağlı başvurularda işverenin tamamlaması gereken
                işlemler olabilir; bazı işlerde Labour Market Impact Assessment
                (LMIA) gerekir. Açık izin ise yalnızca belirli durumlarda
                başvurulabilen bir izin türüdür; “Kanada’ya gidip iş aramak
                istiyorum” demek açık izin hakkı yaratmaz. Çalışma izni
                başvurusu çoğu durumda online yapılır ve devlet ücreti kişi başı
                155 CAD’dir; açık çalışma izni için ayrıca 100 CAD holder ücreti
                alınır.{' '}
                <Link href="/kanadada-calisma/kanada-calisma-izni">
                  Kanada çalışma izni rehberi →
                </Link>
              </p>
              <p>
                İş teklifiniz ve izin yolunuz net değilse önce izin kategorinizi
                doğrulayın; teklifin gerekli işveren ve izin şartlarını
                karşılayıp karşılamadığı ayrıca değerlendirilmelidir. Sahte iş
                tekliflerine karşı dikkatli olun: gerçek işverenin kimliğini ve
                yazılı teklifi doğrulamadan ödeme yapmayın.
              </p>
            </section>

            <section id="kalici-oturum">
              <h2>4. Express Entry ve kalıcı oturum</h2>
              <p>
                Express Entry, üç federal ekonomik göçmenlik programının
                başvurularını yöneten sistemdir; tek başına bir vize veya
                göçmenlik programı değildir. Önce uygunluk, ardından havuzda
                sıralama, davet ve belge incelemesi gelir. Profil açmak veya
                yüksek puana sahip olmak kalıcı oturum garantisi değildir.
              </p>
              <p>
                Türkiye’den başvuranların çoğu Federal Skilled Worker Program
                ile başlar: son 10 yılda ana meslekte en az 1 yıl kesintisiz
                ücretli nitelikli deneyim, dört dil becerisinin her birinde CLB
                7, yabancı eğitim için uygun ECA ve 100 üzerinden en az 67 seçim
                puanı aranır. Bu 67 puan, havuzda sıralamayı belirleyen CRS
                puanından ayrıdır; uygunluk eşiğini geçmek davet garantisi
                oluşturmaz. FSW ve FST adaylarının, Kanada’da çalışma yetkisi ve
                geçerli iş teklifi yoksa yerleşim fonu göstermesi gerekir; tek
                kişilik başvuruda bu tutar 15.263 CAD’dir.
              </p>
              <div className="guide-warning">
                <p>
                  <strong>Kasım 2026 güncellemesi:</strong> 3 Kasım 2026’dan
                  itibaren Express Entry’de iş teklifi için LMIA aranmaz ve LMIA
                  sahibi olmak Express Entry’de ek puan veya öncelik sağlamaz.
                  İş teklifi puanları, yüksek ücretli meslekler listesinde yer
                  alan nitelikli teklifler için geri dönmüştür. Bu değişiklik
                  Express Entry içindir; çalışma izni için LMIA gerekip
                  gerekmediği ayrı bir sorudur. Başvuru anında IRCC’nin güncel
                  değişiklik sayfasını kontrol edin.{' '}
                  <Link href="/kanada-gocmenlik/kalici-oturum-ve-express-entry">
                    Kalıcı oturum ve Express Entry rehberi →
                  </Link>
                </p>
              </div>
            </section>

            <section id="eyalet">
              <h2>5. Eyalet aday programları</h2>
              <p>
                Eyalet aday programları (Provincial Nominee Program, PNP)
                kapsamında eyaletler kendi ihtiyaç ve koşullarına göre aday
                seçer. Express Entry bağlantılı bir adaylığı kabul etmek ek CRS
                puanı sağlayabilir; eyaletin koşullarını ve orada yaşama
                niyetinizi ayrıca değerlendirmeniz gerekir. Adaylık, federal
                incelemenin yerine geçmez.
              </p>
              <p>
                Express Entry tek seçenek değildir. Express Entry dışı eyalet
                süreçleri, uygun aile sponsorluğu ve bölgesel programlar farklı
                durumlarda değerlendirilebilir. Quebec’in ekonomik göçmenlik
                seçimi ayrı süreçlere sahiptir. Programların başvuruya açık olup
                olmadığını ve güncel şartlarını resmî kaynaktan kontrol edin.
              </p>
            </section>

            <section id="aile">
              <h2>6. Aile üzerinden gitmek</h2>
              <p>
                Uygun kişilerin eş, partner veya bağımlı çocukları için sponsor
                olabildiği programlar bulunur. Çocukların eğitimi, eşin çalışma
                hakkı, bütçe ve geliş zamanlaması birlikte ele alınmalıdır. Aile
                sponsorluğunda sponsorun koşulları da ayrıca incelenir;
                sponsorluk, başvuranın kendi şartlarını gösterme sorumluluğunu
                ortadan kaldırmaz.
              </p>
              <p>
                Eşlerin ve çocukların başvurudaki durumu; eğitim, çalışma ve
                aile sponsorluğu seçenekleriyle birlikte değerlendirilmelidir.
                Bazı eğitim ve çalışma izni türlerinde eş için açık çalışma izni
                uygunluğu program koşullarına bağlıdır; otomatik değildir.{' '}
                <Link href="/rehberler/ailece-kanadaya-gitmek">
                  Ailece Kanada’ya gitmek →
                </Link>
              </p>
            </section>

            <section id="siginma">
              <h2>7. Sığınma ve koruma: göç yolu değildir</h2>
              <p>
                Sığınma, zulüm veya ciddi bir risk nedeniyle koruma arayanlar
                içindir; ekonomik göç yolu değildir. Ekonomik zorluklar tek
                başına genellikle sığınma gerekçesi sayılmaz. Turist vizesiyle
                gidip sığınma başvurusu yapmak da bir göç stratejisi olarak
                görülmemelidir; başvuru, koruma koşullarına göre ayrı bir
                süreçte değerlendirilir ve yanlış bilgi vermenin ciddi sonuçları
                olabilir.
              </p>
              <p>
                Bu konudaki yanlış bilgiler ve sahte hikâye riskleri için{' '}
                <Link href="/rehberler/kanada-gocmenlik-dolandiriciliklari">
                  Kanada göçmenliğinde yanlış bilgiler ve dolandırıcılıklar
                </Link>{' '}
                sayfasını okuyun.
              </p>
            </section>

            <section id="ucretler">
              <h2>Ücretler ve maddi yeterlilik</h2>
              <p>
                Aşağıdaki tutarlar IRCC ücret listesinden alınmıştır ve Kanada
                doları cinsindendir. Ücretler değişebilir; ödeme öncesi IRCC’den
                doğrulayın. Üçüncü taraf masraflar — dil sınavı, çeviri, sağlık
                muayenesi, biyometri merkezi hizmetleri — ayrıca çıkabilir.
              </p>
              <div className="guide-table-wrap">
                <table>
                  <caption>
                    IRCC başvuru ücretleri (Kanada doları, Eylül 2026 ücret
                    listesi)
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Başvuru türü</th>
                      <th scope="col">Devlet ücreti</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Ziyaretçi vizesi — kişi başı</th>
                      <td>100 CAD</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        Ziyaretçi vizesi — 5+ kişilik aile üst sınırı
                      </th>
                      <td>500 CAD</td>
                    </tr>
                    <tr>
                      <th scope="row">Biyometri — kişi başı</th>
                      <td>85 CAD</td>
                    </tr>
                    <tr>
                      <th scope="row">Biyometri — aile üst sınırı</th>
                      <td>170 CAD</td>
                    </tr>
                    <tr>
                      <th scope="row">Eğitim izni — kişi başı</th>
                      <td>150 CAD</td>
                    </tr>
                    <tr>
                      <th scope="row">Çalışma izni — kişi başı</th>
                      <td>155 CAD</td>
                    </tr>
                    <tr>
                      <th scope="row">Açık çalışma izni holder ücreti (ek)</th>
                      <td>100 CAD</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        Ekonomik kalıcı oturum — ana başvuru sahibi (işlem +
                        kalıcı oturum hakkı ücreti)
                      </th>
                      <td>1.590 CAD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Yerleşim fonu, başvuru ücretinden ayrıdır. Express Entry’de FSW
                ve FST adaylarının göstermesi gereken asgari yerleşim fonu aile
                büyüklüğüne göre değişir: 1 kişi 15.263 CAD, 2 kişi 19.001 CAD,
                3 kişi 23.360 CAD, 4 kişi 28.362 CAD. Para size ait,
                erişilebilir ve borç alınmamış olmalıdır; gayrimenkul değeri
                yerleşim fonu sayılmaz. CEC adayları yerleşim fonundan muaftır.
              </p>
              <p>
                İşlem süreleri başvuru türüne, ülkeye ve başvuru yoğunluğuna
                göre değişir; bu rehberde sabit bir gün sayısı verilmez. Güncel
                süreyi IRCC’nin işlem süresi aracından başvuru anında kontrol
                edin.
              </p>
            </section>

            <section id="adimlar">
              <h2>Başvuruya 7 adımda hazırlanın</h2>
              <ol>
                <li>
                  <strong>Amacınızı belirleyin:</strong> Ziyaret, eğitim,
                  çalışma veya kalıcı yerleşim.
                </li>
                <li>
                  <strong>Profilinizi çıkarın:</strong> Yaş, eğitim, dil,
                  deneyim, aile ve bütçe.
                </li>
                <li>
                  <strong>Yolu seçin:</strong> Koşullarınıza yakın seçenekleri
                  karşılaştırın; tek bir yola kilitlenmeyin.
                </li>
                <li>
                  <strong>Güncel şartları doğrulayın:</strong> Resmî Kanada
                  Hükümeti kaynaklarını kontrol edin; eski hesaplayıcılara ve
                  sosyal medya iddialarına güvenmeyin.
                </li>
                <li>
                  <strong>Belgelerinizi planlayın:</strong> Pasaport, dil
                  sonucu, ECA, iş deneyimi belgeleri ve mali kanıtları tutarlı
                  bir dosya halinde düzenleyin.
                </li>
                <li>
                  <strong>Bütçeyi gerçekçi kurun:</strong> Başvuru ücretleri,
                  sınav, çeviri, seyahat ve ilk dönem yaşam giderlerini birlikte
                  hesaplayın.
                </li>
                <li>
                  <strong>Gerekirse profesyonel destek alın:</strong> Kişisel
                  durumunuz genel rehberlerle çözülemiyorsa yetkili bir
                  profesyonelden değerlendirme isteyin.
                </li>
              </ol>
              <div className="guide-assessment">
                <h2>Hedefinize uygun bilgi başlıklarını belirleyin</h2>
                <p>
                  Kanada’ya geliş amacınız ve mevcut durumunuz hakkında temel
                  bilgileri paylaşın. Formunuz incelendikten sonra ilgili
                  rehberler ve ihtiyaç halinde yararlanabileceğiniz profesyonel
                  destek seçenekleri hakkında bilgi alabilirsiniz.
                </p>
                <Link href="/on-degerlendirme">
                  Ön değerlendirme formunu doldurun
                </Link>
              </div>
            </section>

            <section id="hatalar">
              <h2>Sık yapılan hatalar</h2>
              <h3>Geçici vizeyi kalıcı yerleşim garantisi sanmak</h3>
              <p>
                Ziyaretçi vizesi veya eğitim izni tek başına kalıcı oturum
                sağlamaz. Gelecekteki seçenekler, o tarihteki programlara ve
                kişinin daha sonra oluşan profiline bağlıdır.
              </p>
              <h3>Yalnızca en ucuz okulu veya en hızlı yolu seçmek</h3>
              <p>
                Ucuz görünen program kariyer hedefinize uymuyorsa daha pahalı
                bir hata olabilir.
              </p>
              <h3>İş teklifini çalışma hakkıyla karıştırmak</h3>
              <p>
                Bir işverenin sizinle çalışmak istemesi önemli olabilir; ancak
                teklifin gerekli işveren ve izin şartlarını karşılayıp
                karşılamadığı ayrıca değerlendirilmelidir.
              </p>
              <h3>Banka bakiyesini tek başına yeterli sanmak</h3>
              <p>
                Ev, araç veya yüksek bakiye tek başına vize onayı sağlamaz.
                Belgeler, ancak seyahat planı ve kişisel koşullarla birlikte
                tutarlı bir dosyanın parçası olduğunda anlamlıdır. Başvurudan
                hemen önce hesaba yatırılan yüksek tutarın kaynağı açıklanmazsa
                dosyada soru işareti yaratabilir.
              </p>
              <h3>Sahte belge veya yanıltıcı bilgi kullanmak</h3>
              <p>
                Başvurudaki bilgilerin doğruluğundan başvuru sahibi sorumludur.
                Sahte belge, yanıltıcı bilgi ve yetkisiz kişilerle ilgili
                riskleri inceleyin; “garantili vize” vaatlerine güvenmeyin.
              </p>
            </section>

            <section id="kontrol-listesi">
              <h2>Başlangıç kontrol listesi</h2>
              <ul className="guide-checklist">
                <li>Kanada’ya geliş amacımı tek cümleyle açıklayabiliyorum.</li>
                <li>Eğitim ve çalışma geçmişimin kronolojisini çıkardım.</li>
                <li>Pasaport ve önceki seyahat kayıtlarımı kontrol ettim.</li>
                <li>
                  İngilizce ve varsa Fransızca seviyemi gerçekçi biçimde
                  değerlendirdim.
                </li>
                <li>
                  Diploma, transkript ve iş deneyimi belgelerimi belirledim.
                </li>
                <li>
                  Ailece gidilecekse her aile üyesinin durumunu ayrı inceledim.
                </li>
                <li>
                  Başvuru ve ilk yerleşim giderleri için gerçekçi bütçe
                  oluşturdum.
                </li>
                <li>
                  Önceki vize retlerini veya göçmenlik geçmişini saklamadım.
                </li>
                <li>
                  Yalnızca güncel ve resmî kaynaklarla doğruladığım bilgilere
                  güveniyorum.
                </li>
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
                    'Türkiye’den Kanada’ya Nasıl Gidilir?',
                    'Ziyaret, eğitim, çalışma ve kalıcı oturum yollarının genel karşılaştırması.',
                    '/rehberler/turkiyeden-kanadaya-nasil-gidilir',
                  ],
                  [
                    'Kanada Ziyaretçi Vizesi',
                    'Ziyaret amacı, belgeler ve değerlendirme ölçütleri.',
                    '/kanada-vizesi/kanada-ziyaretci-vizesi',
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
                  [
                    'Kanada’da İlk 90 Gün',
                    'Gelişten sonraki ilk günlerde yapılması gereken işlemler.',
                    '/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun',
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
                Değişebilen ücret, süre, kota ve puanlar için işlem yapmadan
                önce aşağıdaki resmî kaynakları kontrol edin.
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
