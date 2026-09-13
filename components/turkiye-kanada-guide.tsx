import Link from 'next/link';
import { Check, CircleAlert } from 'lucide-react';
import { GuideFaq, type GuideFaqItem } from './guide-faq';
import { GuideMobileToc } from './guide-mobile-toc';
import { TURKIYE_KANADA_GUIDE_DATES } from '@/lib/content';

const paths = [
  [
    'Ziyaret',
    'Turistik gezi, aile veya arkadaş ziyareti ve kısa süreli faaliyetler için.',
    'Ziyaret amacını, masrafları ve geçici kalış niyetini açıklayabilenler araştırmalı.',
    '/kanada-vizesi/kanada-ziyaretci-vizesi',
    'Kanada ziyaretçi vizesi rehberi',
  ],
  [
    'Eğitim',
    'Uygun okul ve program seçimiyle uzun süreli eğitim planı için.',
    'Eğitim planı, finansal yeterlilik ve kariyer bağlantısını gösterebilenler araştırmalı.',
    '/kanadada-egitim/kanadada-egitim-rehberi',
    'Kanada’da eğitim rehberi',
  ],
  [
    'Çalışma',
    'İşverene bağlı veya koşullara bağlı açık çalışma izni seçenekleri için.',
    'Geçerli çalışma hakkını ve işveren süreçlerini araştırmaya hazır olanlar incelemeli.',
    '/kanadada-calisma/kanada-calisma-izni',
    'Kanada çalışma izni',
  ],
  [
    'Kalıcı oturum',
    'Ekonomik programlar, eyalet adaylıkları veya uygun aile yolları için.',
    'Yaş, dil, eğitim ve deneyimini birlikte değerlendirmek isteyenler araştırmalı.',
    '/kanada-gocmenlik/kalici-oturum-ve-express-entry',
    'Kalıcı oturum ve Express Entry rehberi',
  ],
] as const;

const contents = [
  ['amac', 'Önce Kanada’ya neden gelmek istediğinizi belirleyin'],
  ['yollar', 'Kanada’ya gelmenin başlıca yolları'],
  ['karsilastirma', 'Kanada’ya geliş yollarını karşılaştırın'],
  ['profil', 'Profilinizde hangi unsurlar önem taşıyabilir?'],
  ['hazirlik', 'Kanada’ya gitmeden önce hazırlanması gerekenler'],
  ['yeni-yasam', 'Kanada’ya geldikten sonra sizi nasıl bir süreç bekler?'],
  ['karar', 'Kanada herkes için doğru tercih midir?'],
  ['hatalar', 'Sık yapılan hatalar'],
  ['baslangic', 'Nereden başlamalısınız?'],
  ['sss', 'Sık sorulan sorular'],
] as const;

const faqs: GuideFaqItem[] = [
  {
    question: 'Türkiye’den Kanada’ya gitmenin en kolay yolu hangisidir?',
    answer: (
      <p>
        Herkes için geçerli tek bir “en kolay yol” yoktur. Uygun seçenek;
        kişinin amacı, yaşı, eğitimi, dili, deneyimi, aile durumu ve bütçesine
        göre değişir. Bir başkasının izlediği yol sizin profiliniz için uygun
        olmayabilir.
      </p>
    ),
  },
  {
    question: 'Kanada’ya gitmek için iş teklifi gerekir mi?',
    answer: (
      <p>
        Her program için iş teklifi zorunlu değildir. Bazı çalışma izni
        süreçlerinde iş teklifi temel unsurken bazı ekonomik göçmenlik, eğitim
        veya aile programlarında farklı koşullar geçerlidir.
      </p>
    ),
  },
  {
    question: 'Kanada’ya turist olarak gidip çalışabilir miyim?',
    answer: (
      <p>
        Ziyaretçi statüsü tek başına çalışma hakkı vermez. Kanada’da çalışmaya
        başlamadan önce bunu sağlayan geçerli bir statü veya çalışma izni
        gerekir.
      </p>
    ),
  },
  {
    question: 'Kanada’ya öğrenci olarak gitmek kalıcı oturum sağlar mı?',
    answer: (
      <p>
        Hayır. Eğitim izni ve uygun bir programdan mezuniyet, gelecekte bazı
        kişilere farklı seçenekler oluşturabilir; ancak okul kabulü, eğitim veya
        mezuniyet kalıcı oturum garantisi değildir.
      </p>
    ),
  },
  {
    question: '40 yaşından sonra Kanada’ya yerleşilebilir mi?',
    answer: (
      <p>
        Bazı puan temelli sistemlerde yaş önemli olsa da tek ölçüt değildir.
        Eğitim, dil, iş deneyimi, eş profili ve eyalet programları birlikte
        incelenmelidir.
      </p>
    ),
  },
  {
    question: 'Kanada’ya gitmek için ne kadar para gerekir?',
    answer: (
      <p>
        Tutar seçilen yola ve aile büyüklüğüne göre değişir. Başvuru
        ücretlerinin yanında eğitim, tercüme, sınav, sağlık muayenesi, seyahat
        ve ilk dönem yaşam giderleri de hesaba katılmalıdır.
      </p>
    ),
  },
  {
    question: 'Kanada’da tanıdığım olmadan gidebilir miyim?',
    answer: (
      <p>
        Bazı programlarda Kanada bağlantısı yararlı ya da gerekli olabilir;
        ancak Kanada’da tanıdık bulunması bütün başvuru türleri için genel bir
        zorunluluk değildir.
      </p>
    ),
  },
  {
    question:
      'Daha önce Kanada vizesi reddedildiyse yeniden başvurulabilir mi?',
    answer: (
      <p>
        Bazı durumlarda yeniden başvuru mümkündür. Yeni başvurudan önce ret
        gerekçesinin ve önceki dosyanın incelenmesi gerekir. Ayrıntılar için{' '}
        <Link href="/kanada-vizesi/vize-reddi">Kanada vize reddi</Link>{' '}
        rehberine bakın.
      </p>
    ),
  },
];

const official = [
  [
    'Kanada’ya giriş için vize veya eTA gerekliliğini kontrol etme',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/entry-requirements-country.html',
  ],
  [
    'Kanada ziyaretçi vizesi',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/visitor-visa.html',
  ],
  [
    'Kanada’da eğitim ve eğitim izni',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html',
  ],
  [
    'Kanada çalışma izinleri',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html',
  ],
  [
    'Express Entry',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html',
  ],
  [
    'Eyalet aday programları',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html',
  ],
  [
    'Kanada göçmenlik ve vatandaşlık temsilcileri',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigration-citizenship-representative.html',
  ],
] as const;

export function TurkiyeKanadaGuide() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Türkiye’den Kanada’ya Nasıl Gidilir? 2026 Başlangıç Rehberi',
        description:
          'Türkiye’den Kanada’ya ziyaret, eğitim, çalışma veya kalıcı oturum yoluyla nasıl gidilebileceğini karşılaştırın; koşulları, bütçeyi ve sonraki adımları öğrenin.',
        datePublished: TURKIYE_KANADA_GUIDE_DATES.published,
        dateModified: TURKIYE_KANADA_GUIDE_DATES.modified,
        mainEntityOfPage:
          'https://kanadavizesi.ca/rehberler/turkiyeden-kanadaya-nasil-gidilir',
        author: { '@type': 'Organization', name: 'KanadaVizesi.ca' },
        publisher: { '@type': 'Organization', name: 'KanadaVizesi.ca' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Ana Sayfa',
            item: 'https://kanadavizesi.ca/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Rehberler',
            item: 'https://kanadavizesi.ca/rehberler',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Türkiye’den Kanada’ya Nasıl Gidilir?',
            item: 'https://kanadavizesi.ca/rehberler/turkiyeden-kanadaya-nasil-gidilir',
          },
        ],
      },
    ],
  };
  return (
    <main className="guide-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <div className="container guide-shell">
        <nav className="article-breadcrumb" aria-label="İçerik yolu">
          <Link href="/">Ana Sayfa</Link> {' > '}
          <Link href="/rehberler">Rehberler</Link>
          {' > '}
          <span>Türkiye’den Kanada’ya Nasıl Gidilir?</span>
        </nav>
        <div className="guide-layout">
          <article>
            <p className="article-category">Kanada’ya Gitme Rehberleri</p>
            <h1>Türkiye’den Kanada’ya Nasıl Gidilir? 2026 Başlangıç Rehberi</h1>
            <span className="red-rule" />
            <p className="article-intro">
              Kanada’ya ziyaret, eğitim, çalışma veya kalıcı yerleşim amacıyla
              gelmenin farklı yolları vardır. Doğru başlangıç noktası;
              amacınıza, yaşınıza, eğitiminize, iş deneyiminize, dil seviyenize,
              aile durumunuza ve bütçenize göre değişir.
            </p>
            <p>
              Bu rehber, Türkiye’den Kanada’ya gelmek isteyenlerin başlıca
              seçenekleri karşılaştırmasına ve hangi konuları daha ayrıntılı
              araştırması gerektiğini belirlemesine yardımcı olur. İlk olarak{' '}
              <Link href="/rehberler/kanadaya-gitmenin-yasal-yollari">
                Kanada’ya gitmenin yasal yollarını
              </Link>{' '}
              genel hatlarıyla inceleyelim.
            </p>
            <div className="article-meta">
              <span>
                İlk yayın:{' '}
                {new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(
                  new Date(`${TURKIYE_KANADA_GUIDE_DATES.published}T12:00:00Z`),
                )}
              </span>
              <span>
                Son güncelleme:{' '}
                {new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(
                  new Date(`${TURKIYE_KANADA_GUIDE_DATES.modified}T12:00:00Z`),
                )}
              </span>
              <span>Yaklaşık okuma: 15 dakika</span>
              <span>Yazar: KanadaVizesi.ca İçerik Ekibi</span>
            </div>
            <section className="guide-callout">
              <h2>Kısa cevap</h2>
              <p>
                Türkiye’den Kanada’ya gelmenin dört temel amacı vardır:{' '}
                <strong>
                  ziyaret etmek, eğitim almak, çalışmak veya kalıcı oturum elde
                  etmek
                </strong>
                . Bunların her biri farklı bir başvuru türü, farklı koşullar ve
                farklı haklar doğurur. Ziyaretçi statüsü çalışma hakkı vermez;
                okul kabulü eğitim iznini garanti etmez; iş teklifi her zaman
                çalışma izni anlamına gelmez; geçici olarak Kanada’ya gelmek de
                otomatik biçimde kalıcı oturum sağlamaz.
              </p>
              <p>
                En doğru yaklaşım, önce hedefinizi belirlemek ve yalnızca o
                hedefe uygun güncel şartları incelemektir.
              </p>
            </section>
            <section id="amac">
              <h2>Önce Kanada’ya neden gelmek istediğinizi belirleyin</h2>
              <p>
                Kanada başvurularında ilk soru “Hangi belgeyi almalıyım?” değil,
                “Kanada’ya hangi amaçla gelmek istiyorum?” olmalıdır. Çünkü
                ziyaret, eğitim, çalışma ve kalıcı yerleşim birbirinin yerine
                kullanılabilecek yollar değildir.
              </p>
              <div className="path-cards">
                {paths.map(([title, description, who, href, label]) => (
                  <article key={title}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <p>
                      <strong>Kimler araştırmalı?</strong> {who}
                    </p>
                    <Link href={href}>{label} →</Link>
                  </article>
                ))}
              </div>
            </section>
            <section id="yollar">
              <h2>Kanada’ya gelmenin başlıca yolları</h2>
              <h3>1. Ziyaretçi vizesiyle Kanada’ya gelmek</h3>
              <p>
                Türkiye Cumhuriyeti vatandaşları, genel olarak ziyaret amacıyla
                Kanada’ya seyahat etmeden önce ziyaretçi vizesi almak
                zorundadır. Vize Kanada’ya kesin giriş garantisi vermez; son
                giriş değerlendirmesi sınır görevlisi tarafından yapılır.
                Hazırlık yaparken{' '}
                <Link href="/kanada-vizesi/gerekli-belgeler">
                  Kanada vizesi için gerekli belgeleri
                </Link>{' '}
                inceleyin.
              </p>
              <div className="guide-warning">
                <CircleAlert aria-hidden="true" />
                <p>
                  <strong>Önemli:</strong> Ziyaretçi vizesi tek başına Kanada’da
                  çalışma hakkı vermez. “Turist olarak git, sonra kolayca çalış”
                  yönlendirmelerini güncel kuralları doğrulamadan uygulamayın.{' '}
                  <Link href="/kanada-vizesi/turist-vizesiyle-calisilabilir-mi">
                    Turist vizesiyle Kanada’da çalışmak
                  </Link>{' '}
                  rehberini okuyun.
                </p>
              </div>
              <h3>2. Eğitim izniyle Kanada’ya gelmek</h3>
              <p>
                Uygun bir eğitim kurumundan kabul, yeterli mali kaynak ve ikna
                edici eğitim planı gerekir. Eğitim yolu yalnızca Kanada’ya giriş
                yöntemi olarak değerlendirilmemelidir; seçilen programın
                akademik veya mesleki değeri, toplam maliyeti ve gerçek
                fırsatları birlikte düşünülmelidir.
              </p>
              <p>
                <Link href="/kanadada-egitim/okul-ve-program-secimi">
                  Kanada’da okul ve program seçimi
                </Link>{' '}
                yaparken okulun uygunluğunu, programın geçmişinizle ilişkisini,
                bütçenizi ve mezuniyet sonrası çalışma izni durumunu araştırın.{' '}
                <Link href="/kanadada-egitim/pgwp-nedir">PGWP nedir?</Link>{' '}
                rehberi bu ayrımları açıklar.
              </p>
              <h3>3. Çalışma izniyle Kanada’ya gelmek</h3>
              <p>
                Çalışma izinleri işverene bağlı veya belirli koşullarda açık
                çalışma izni olabilir. İş arama hazırlığı için{' '}
                <Link href="/kanadada-calisma/turkiyeden-kanadada-is-bulmak">
                  Türkiye’den Kanada’da iş bulmak
                </Link>{' '}
                rehberini inceleyin. Bazı işveren süreçlerinde Labour Market
                Impact Assessment gerekebilir; ayrıntılar için{' '}
                <Link href="/kanadada-calisma/lmia-nedir">LMIA nedir?</Link>{' '}
                rehberine bakın. İş ilanının ve şirketin gerçekliğini kontrol
                edin;{' '}
                <Link href="/kanadada-calisma/sahte-is-teklifleri">
                  sahte Kanada iş teklifleri
                </Link>{' '}
                konusunda dikkatli olun.
              </p>
              <h3>4. Express Entry ve diğer kalıcı oturum programları</h3>
              <p>
                Express Entry, aday profillerini yöneten bir sistemdir; profil
                oluşturmak davet veya kalıcı oturum garantisi değildir. Yaş,
                eğitim, dil sonucu, nitelikli iş deneyimi ve eş bilgileri etkili
                olabilir.{' '}
                <Link href="/kanada-gocmenlik/express-entry-nedir">
                  Express Entry nedir?
                </Link>{' '}
                ve{' '}
                <Link href="/kanada-gocmenlik/eyalet-aday-programlari">
                  eyalet aday programları
                </Link>{' '}
                rehberlerini birlikte inceleyin.
              </p>
              <h3>5. Aile üzerinden Kanada’ya gelmek</h3>
              <p>
                Uygun kişilerin eş, partner veya bağımlı çocukları için sponsor
                olabildiği programlar bulunur. Çocukların eğitimi, eşin çalışma
                hakkı, bütçe ve geliş zamanlamasını birlikte ele alan{' '}
                <Link href="/rehberler/ailece-kanadaya-gitmek">
                  ailece Kanada’ya gitmek
                </Link>{' '}
                rehberini okuyun.
              </p>
            </section>
            <section id="karsilastirma">
              <h2>Kanada’ya geliş yollarını karşılaştırın</h2>
              <p>
                Aşağıdaki karşılaştırma kişisel uygunluk değerlendirmesi
                değildir. Kanada’ya giriş belgesi, eğitim hakkı, çalışma hakkı
                ve kalıcı oturum birbirinden farklı kavramlardır.
              </p>
              <div className="guide-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Yol</th>
                      <th>Temel amaç</th>
                      <th>Tipik başlangıç şartı</th>
                      <th>Çalışma hakkı</th>
                      <th>Kalıcı oturum garantisi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ziyaretçi vizesi</td>
                      <td>Geçici ziyaret</td>
                      <td>
                        Geçerli amaç, mali yeterlilik, geçici kalış niyeti
                      </td>
                      <td>Hayır</td>
                      <td>Hayır</td>
                    </tr>
                    <tr>
                      <td>Eğitim izni</td>
                      <td>Uygun kurumda eğitim</td>
                      <td>Okul kabulü, mali kaynak ve eğitim planı</td>
                      <td>Geçerli kurallar ve izin koşulları kapsamında</td>
                      <td>Hayır</td>
                    </tr>
                    <tr>
                      <td>İşverene bağlı çalışma izni</td>
                      <td>Belirli işte çalışmak</td>
                      <td>Uygun işveren süreci ve aday başvurusu</td>
                      <td>İzin koşullarıyla sınırlı</td>
                      <td>Hayır</td>
                    </tr>
                    <tr>
                      <td>Açık çalışma izni</td>
                      <td>Uygun kişilere çalışma hakkı</td>
                      <td>Belirli program veya statü koşulları</td>
                      <td>İzin koşulları kapsamında</td>
                      <td>Hayır</td>
                    </tr>
                    <tr>
                      <td>Express Entry / ekonomik program</td>
                      <td>Kalıcı oturum</td>
                      <td>Program şartları ve gerektiğinde davet</td>
                      <td>Kalıcı oturum sonrasında genel olarak</td>
                      <td>Başvuru onaylanana kadar hayır</td>
                    </tr>
                    <tr>
                      <td>Aile sponsorluğu</td>
                      <td>Uygun aile birleşimi</td>
                      <td>Sponsor ve başvuru sahibinin şartları</td>
                      <td>Statü ve izin türüne göre</td>
                      <td>Başvuru onaylanana kadar hayır</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section id="profil">
              <h2>Profilinizde hangi unsurlar önem taşıyabilir?</h2>
              <p>
                Her programın kendi kuralları vardır. Kanada’ya geliş
                seçeneklerini araştırırken yaş, dil, eğitim, deneyim, aile ve
                bütçeyi birlikte değerlendirmek yararlı olur.
              </p>
              <div className="guide-profile">
                <div>
                  <h3>Yaş</h3>
                  <p>
                    Puan temelli sistemlerde etkili olabilir. Bu, belirli yaşın
                    üzerindeki herkesin seçeneksiz olduğu anlamına gelmez.{' '}
                    <Link href="/rehberler/40-yasindan-sonra-kanadaya-goc">
                      40 yaşından sonra Kanada’ya göç
                    </Link>{' '}
                    rehberini inceleyin.
                  </p>
                </div>
                <div>
                  <h3>Dil seviyesi</h3>
                  <p>
                    Günlük konuşma seviyesi ile resmî sınav sonucu aynı şey
                    değildir.{' '}
                    <Link href="/rehberler/ingilizce-bilmeden-kanadaya-gitmek">
                      İngilizce bilmeden Kanada’ya gitmek
                    </Link>{' '}
                    rehberi başlangıç seçeneklerini ele alır.
                  </p>
                </div>
                <div>
                  <h3>Eğitim ve iş deneyimi</h3>
                  <p>
                    Diploma, eğitim alanı, deneyimin süresi ve işin niteliği
                    farklı programlarda etkili olabilir.
                  </p>
                </div>
                <div>
                  <h3>Aile durumu</h3>
                  <p>
                    Eşin eğitimi, dili ve deneyimi; çocukların eğitimi ve aile
                    bütçesi seçilecek yol üzerinde önemlidir.
                  </p>
                </div>
                <div>
                  <h3>Bütçe</h3>
                  <p>
                    Gider başlıklarını{' '}
                    <Link href="/rehberler/kanadaya-gitmek-icin-ne-kadar-para-gerekir">
                      Kanada’ya gitmek için ne kadar para gerekir?
                    </Link>{' '}
                    ve{' '}
                    <Link href="/kanadada-yasam/kanadada-yasam-maliyeti">
                      Kanada’da yaşam maliyeti
                    </Link>{' '}
                    rehberlerinde inceleyin.
                  </p>
                </div>
              </div>
            </section>
            <section id="hazirlik">
              <h2>Kanada’ya gitmeden önce hazırlanması gerekenler</h2>
              <p>
                Başvurudan önce yapılan hazırlık yalnızca belge toplamaktan
                ibaret değildir. Aşağıdaki liste, hangi bilgileri ve belgeleri
                önce düzenlemeniz gerektiğini görmek için başlangıç noktasıdır.
              </p>
              <ul className="guide-checklist">
                {[
                  'Kanada’ya geliş amacınızı tek cümleyle açıklayın.',
                  'Eğitim ve çalışma geçmişinizin kronolojisini çıkarın.',
                  'Pasaport ve önceki seyahat kayıtlarınızı kontrol edin.',
                  'İngilizce ve varsa Fransızca seviyenizi gerçekçi biçimde değerlendirin.',
                  'Diploma, transkript ve iş deneyimi belgelerinizi belirleyin.',
                  'Ailece gidilecekse her aile üyesinin durumunu ayrı inceleyin.',
                  'Başvuru ve ilk yerleşim giderleri için gerçekçi bütçe oluşturun.',
                  'Önceki vize retlerini veya göçmenlik geçmişini saklamayın.',
                  'Yalnızca güncel ve resmî kaynaklarla doğruladığınız bilgilere güvenin.',
                ].map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section id="yeni-yasam">
              <h2>Kanada’ya geldikten sonra sizi nasıl bir süreç bekler?</h2>
              <p>
                Kanada’ya giriş izni almak yeni yaşam planının sonu değil
                başlangıcıdır. İş arama, konut, banka hesabı, kimlik ve vergi
                işlemleri, sağlık kapsamı, ulaşım ve çocukların eğitimi geliş
                öncesinde araştırılmalıdır.
              </p>
              <ul>
                <li>Kanada formatında CV ve iş başvuruları</li>
                <li>Mesleki lisans ve denklik</li>
                <li>Geçici ve uzun dönem konut</li>
                <li>Banka hesabı, kredi geçmişi ve temel işlemler</li>
                <li>Sağlık kapsamı, okul ve çocuk bakımı</li>
                <li>İlk üç aylık nakit akışı ve sosyal çevre</li>
              </ul>
              <p>
                <Link href="/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun">
                  Kanada’da yaşam ve ilk 90 gün
                </Link>{' '}
                rehberi, gelişten önce hazırlanabilecek pratik bir başlangıç
                planı sunar.
              </p>
            </section>
            <section id="karar">
              <h2>Kanada herkes için doğru tercih midir?</h2>
              <p>
                Kanada; öngörülebilir kurumlar, çok kültürlü toplum, eğitim ve
                kariyer fırsatları nedeniyle birçok kişinin ilgisini çeker.
                Bunun yanında yüksek konut maliyetleri, sert iklim, ilk işte
                yaşanabilecek kariyer kaybı, aileden uzaklık ve yeni çevre kurma
                güçlüğü de hesaba katılmalıdır.
              </p>
              <p>
                Bir ülkenin avantajlı olması herkes için doğru olduğu anlamına
                gelmez. Kendi mesleğinizi, bütçenizi, aile ihtiyaçlarınızı ve
                beklentilerinizi değerlendirin. Dengeli bir karar için{' '}
                <Link href="/kanadada-yasam/kanadaya-yerlesmek-mantikli-mi">
                  Kanada’ya yerleşmek mantıklı mı?
                </Link>{' '}
                rehberini okuyun.
              </p>
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
              <h3>Sahte belge veya yanıltıcı bilgi kullanmak</h3>
              <p>
                Başvurudaki bilgilerin doğruluğundan başvuru sahibi sorumludur.
                <Link href="/rehberler/kanada-gocmenlik-dolandiriciliklari">
                  Kanada göçmenlik dolandırıcılıkları
                </Link>{' '}
                rehberinde sahte belge, yanıltıcı bilgi ve yetkisiz kişilerle
                ilgili riskleri inceleyin.
              </p>
            </section>
            <section id="baslangic">
              <h2>Nereden başlamalısınız?</h2>
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
                  <strong>Ana yolu seçin:</strong> Koşullarınıza yakın
                  seçenekleri karşılaştırın.
                </li>
                <li>
                  <strong>Güncel şartları doğrulayın:</strong> Resmî Kanada
                  Hükümeti kaynaklarını kontrol edin.
                </li>
                <li>
                  <strong>Belgelerinizi planlayın:</strong> Belge toplamaya son
                  gün başlamayın.
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
            <section id="sss">
              <h2>Sık sorulan sorular</h2>
              <GuideFaq items={faqs} />
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
                    'Kanada’da Eğitim Rehberi',
                    'Okul seçiminden eğitim iznine uzanan temel süreç.',
                    '/kanadada-egitim/kanadada-egitim-rehberi',
                  ],
                  [
                    'Türkiye’den Kanada’da İş Bulmak',
                    'İş arama, çalışma hakkı ve Kanada iş piyasasına hazırlık.',
                    '/kanadada-calisma/turkiyeden-kanadada-is-bulmak',
                  ],
                  [
                    'Kalıcı Oturum ve Express Entry',
                    'Ekonomik göçmenlik yollarının genel karşılaştırması.',
                    '/kanada-gocmenlik/kalici-oturum-ve-express-entry',
                  ],
                  [
                    'Kanada’da Yaşam Maliyeti',
                    'Başlıca giderler ve gerçekçi bütçe planlaması.',
                    '/kanadada-yasam/kanadada-yasam-maliyeti',
                  ],
                  [
                    'Kanada Vize Reddi',
                    'Ret gerekçeleri ve yeniden başvuru öncesi dikkat edilecekler.',
                    '/kanada-vizesi/vize-reddi',
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
            <section className="guide-sources">
              <h2>Resmî kaynaklar</h2>
              <p>
                Değişebilen ücret, süre, kota ve puanlar için işlem yapmadan
                önce aşağıdaki resmî kaynakları kontrol edin.
              </p>
              <ul>
                {official.map(([label, href]) => (
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
