import Link from 'next/link';
import { GuideMobileToc } from './guide-mobile-toc';
import { GuideFaq } from './guide-faq';
import { JsonLd } from './json-ld';
import { expressEntry, SITE_URL } from '@/lib/content';
import { publisher, SOCIAL_IMAGE } from '@/lib/seo';

const base =
  'https://www.canada.ca/en/immigration-refugees-citizenship/services/';
const sources = [
  ['Kalıcı oturum statüsü', `${base}permanent-residents/status.html`],
  [
    'Express Entry programları',
    `${base}immigrate-canada/express-entry/who-can-apply.html`,
  ],
  ['CRS puanı', `${base}immigrate-canada/express-entry/check-score.html`],
  [
    'İş teklifi ve puan değişikliği',
    `${base}immigrate-canada/express-entry/documents/job-offer.html`,
  ],
  [
    'Kategori bazlı seçim',
    `${base}immigrate-canada/express-entry/rounds-invitations/category-based-selection.html`,
  ],
  ['Gerekli belgeler', `${base}immigrate-canada/express-entry/documents.html`],
  [
    'Mali yeterlilik',
    `${base}immigrate-canada/express-entry/documents/proof-funds.html`,
  ],
  [
    'Davet sonrası başvuru',
    `${base}immigrate-canada/express-entry/apply-permanent-residence.html`,
  ],
  [
    'Express Entry üzerinden eyalet adaylığı',
    `${base}immigrate-canada/provincial-nominees/express-entry.html`,
  ],
  ['Diğer göçmenlik yolları', `${base}immigrate-canada.html`],
  [
    'Davet turları',
    `${base}immigrate-canada/express-entry/rounds-invitations.html`,
  ],
  [
    'FSW ayrıntılı koşullar',
    `${base}immigrate-canada/express-entry/who-can-apply/federal-skilled-workers.html`,
  ],
  [
    'CEC ayrıntılı koşullar',
    `${base}immigrate-canada/express-entry/who-can-apply/canadian-experience-class.html`,
  ],
  [
    'FST ayrıntılı koşullar',
    `${base}immigrate-canada/express-entry/who-can-apply/federal-skilled-trades.html`,
  ],
  [
    'ECA değerlendirmesi',
    `${base}immigrate-canada/express-entry/documents/education-assessment.html`,
  ],
  [
    'Kabul edilen dil sınavları',
    `${base}immigrate-canada/express-entry/documents/language-test.html`,
  ],
] as const;
const contents = [
  ['kalici-oturum', 'Kalıcı oturum nedir?'],
  ['programlar', 'Üç Express Entry programı'],
  ['ornek-profiller', 'Türkiye’den örnek profiller'],
  ['crs', 'Uygunluk ve CRS puanı'],
  ['kategoriler', 'Kategori bazlı davetler'],
  ['belgeler', 'Dil, eğitim ve belgeler'],
  ['maddi-yeterlilik', 'Mali yeterlilik'],
  ['basvuru', 'Başvuru adımları'],
  ['alternatifler', 'Eyalet adaylığı ve diğer yollar'],
  ['hatalar', 'Sık yapılan hatalar'],
  ['kontrol-listesi', 'Başlangıç kontrol listesi'],
  ['sss', 'Sık sorulan sorular'],
  ['kaynaklar', 'Resmî kaynaklar'],
] as const;
const faqs = [
  {
    question: 'Express Entry profili açmak kalıcı oturum başvurusu mudur?',
    answer:
      'Hayır. Profil havuza katılmanızı sağlar. Kalıcı oturum başvurusu için davet almanız ve ardından istenen başvuruyu göndermeniz gerekir.',
  },
  {
    question: 'Türkiye’den, Kanada deneyimi olmadan başvurabilir miyim?',
    answer:
      'Federal Skilled Worker Program gibi uygun bir programın bütün koşullarını karşılıyorsanız mümkün olabilir. Kanada deneyimi bütün Express Entry programlarında zorunlu değildir.',
  },
  {
    question: 'İş teklifi şart mı?',
    answer:
      'Bütün programlarda şart değildir. Ancak Federal Skilled Trades ve bazı eyalet programlarında iş teklifi veya alternatif yeterlilik koşulları önemlidir. İş teklifinin kategoriye uygunluğu ayrıca incelenir.',
  },
  {
    question: 'İş teklifi CRS puanını artırır mı?',
    answer:
      '25 Mart 2025’ten itibaren iş teklifine verilen 50 veya 200 ek CRS puanı kaldırılmıştır. Teklif, bazı programların uygunluk koşullarında yine önem taşıyabilir.',
  },
  {
    question: 'Kaç CRS puanıyla kesin davet gelir?',
    answer:
      'Kesin bir puan yoktur. Davet türü, aday havuzu ve turun koşulları değişir. Önceki taban puanlar gelecek davetlerin garantisi değildir.',
  },
  {
    question: 'Davet aldıktan sonra ne kadar sürem var?',
    answer:
      'IRCC’nin mevcut talimatına göre davet 60 gün geçerlidir. Hesabınızdaki son tarihi ve kişisel belge listesini esas alın.',
  },
  {
    question: 'Express Entry profili Kanada’da çalışma hakkı verir mi?',
    answer:
      'Hayır. Profil veya başvuru daveti tek başına çalışma izni ya da Kanada’da kalma hakkı oluşturmaz.',
  },
  {
    question: 'PR kartının süresi bitince statüm biter mi?',
    answer:
      'Kartın süresinin dolması tek başına kalıcı oturum statüsünü sona erdirmez. Statüyü koruma ve seyahat belgesi koşulları ayrıca değerlendirilir.',
  },
];
function Source({ index }: { index: number }) {
  return (
    <p>
      <a href={sources[index][1]} target="_blank" rel="noopener noreferrer">
        IRCC: {sources[index][0]}
        <span className="sr-only"> (yeni sekmede açılır)</span>
      </a>
    </p>
  );
}
export function ExpressEntryGuide() {
  const url = `${SITE_URL}${expressEntry.path}`;
  return (
    <main className="guide-page express-entry-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: expressEntry.title,
              description: expressEntry.description,
              mainEntityOfPage: url,
              inLanguage: 'tr-TR',
              author: publisher,
              publisher,
              image: SOCIAL_IMAGE.url,
              dateModified: expressEntry.reviewedAt,
              datePublished: expressEntry.publishedAt,
              publishingPrinciples: `${SITE_URL}/kaynak-politikasi`,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                ['Ana Sayfa', '/'],
                ['Rehberler', '/rehberler'],
                ['Kalıcı Oturum ve Express Entry', expressEntry.path],
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
          <Link href="/rehberler">Rehberler</Link> {' > '}
          <span aria-current="page">Kalıcı Oturum ve Express Entry</span>
        </nav>
        <div className="guide-layout">
          <article>
            <p className="article-category">Kanada Göçmenlik</p>
            <h1>{expressEntry.title}</h1>
            <span className="red-rule" />
            <p className="article-intro">
              Kanada’da kalıcı bir yaşam planlarken önce hangi göçmenlik
              programına uygun olduğunuzu, sonra profilinizin davet alma
              açısından ne durumda olduğunu değerlendirin. Express Entry bu
              süreçte kullanılan başlıca sistemlerden biridir; bütün göçmenlik
              yollarını kapsamaz.
            </p>
            <p>
              Bu rehber, Türkiye’den hazırlanan adaylar için program
              uygunluğunu, CRS puanını, belgeleri ve alternatif yolları aynı
              çerçevede ele alır.
            </p>
            <div className="article-meta">
              <span>
                İlk yayın:{' '}
                <time dateTime={expressEntry.publishedAt}>22 Eylül 2026</time>
              </span>
              <span>
                Son kaynak kontrolü:{' '}
                <time dateTime={expressEntry.reviewedAt}>22 Eylül 2026</time>
              </span>
              <span>
                Hazırlayan:{' '}
                <Link href="/hakkimizda">KanadaVizesi.ca İçerik Ekibi</Link>
              </span>
            </div>
            <section className="guide-callout">
              <h2>Kısa cevap</h2>
              <p>
                <strong>
                  Express Entry bir vize veya tek başına göçmenlik programı
                  değildir.
                </strong>{' '}
                Üç federal ekonomik göçmenlik programının başvurularını yöneten
                sistemdir. Önce uygunluk, ardından havuzda sıralama, davet ve
                belge incelemesi gelir. Profil açmak veya yüksek puana sahip
                olmak kalıcı oturum garantisi değildir.
              </p>
              <Source index={1} />
            </section>
            <div className="guide-warning">
              <p>
                KanadaVizesi.ca bağımsız bir bilgi platformudur; Kanada Hükümeti
                veya IRCC ile bağlantılı değildir. Bu rehber genel
                bilgilendirmedir; kişisel uygunluk ve güncel başvuru koşulları
                ayrıca değerlendirilmelidir.
              </p>
            </div>
            <section id="kalici-oturum">
              <h2>Kalıcı oturum ne sağlar?</h2>
              <p>
                Kalıcı oturum (permanent residence / PR), Kanada vatandaşı
                olmadan kalıcı oturum statüsüne sahip olmaktır. Genel olarak
                Kanada’da yaşama, çalışma ve eğitim görme hakkı sağlar.
                Vatandaşlıkla aynı değildir; federal seçimlerde oy kullanma gibi
                haklar farklıdır.
              </p>
              <p>
                Statüyü korumak için genel kural, son beş yıllık dönemde en az{' '}
                <strong>730 gün</strong> Kanada’da bulunmaktır. Bazı yurt dışı
                süreleri belirli koşullarla sayılabilir. PR kartının süresinin
                dolması tek başına statüyü bitirmez; seyahat için gerekli
                belgeleri ayrıca kontrol edin.
              </p>
              <Source index={0} />
            </section>
            <section id="programlar">
              <h2>Express Entry hangi programları kapsar?</h2>
              <div
                className="guide-table-wrap"
                role="region"
                aria-label="Express Entry programları karşılaştırması"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Koşul</th>
                      <th scope="col">FSW</th>
                      <th scope="col">CEC</th>
                      <th scope="col">FST</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Deneyim</th>
                      <td>
                        Son 10 yılda, ana meslekte en az 1 yıl kesintisiz
                        ücretli nitelikli deneyim; eşdeğer yarı zamanlı çalışma
                        sayılabilir.
                      </td>
                      <td>
                        Son 3 yılda Kanada’da çalışma yetkisiyle edinilmiş en az
                        1 yıl uygun deneyim veya yarı zamanlı eşdeğeri.
                      </td>
                      <td>
                        Son 5 yılda uygun nitelikli meslekte en az 2 yıl deneyim
                        veya yarı zamanlı eşdeğeri.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Dil alt sınırı</th>
                      <td>Dört becerinin her birinde CLB/NCLC 7.</td>
                      <td>
                        TEER 0–1 için her beceride 7; TEER 2–3 için her beceride
                        5.
                      </td>
                      <td>Konuşma ve dinlemede 5; okuma ve yazmada 4.</td>
                    </tr>
                    <tr>
                      <th scope="row">Eğitim</th>
                      <td>En az ortaöğretim; yabancı eğitim için uygun ECA.</td>
                      <td>
                        Program için asgari eğitim şartı yok; eğitim CRS puanına
                        katkı sağlayabilir.
                      </td>
                      <td>
                        Program için asgari eğitim şartı yok; eğitim CRS puanına
                        katkı sağlayabilir.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">İş teklifi</th>
                      <td>Zorunlu değil.</td>
                      <td>Zorunlu değil.</td>
                      <td>
                        En az 1 yıllık geçerli tam zamanlı teklif veya yetkili
                        Kanada kurumundan mesleki yeterlilik belgesi.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Ek kontrol</th>
                      <td>
                        Asgari koşullara ek olarak 100 üzerinden en az 67 seçim
                        puanı.
                      </td>
                      <td>
                        Öğrenciyken edinilen deneyim ve serbest çalışma genel
                        olarak sayılmaz; istisnalar ayrıca kontrol edilir.
                      </td>
                      <td>
                        Her teknik meslek kapsamda değildir; uygun NOC grubu ve
                        mesleği icra edebilme koşulları doğrulanır.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Kanada deneyiminiz yoksa CEC’yi temel almak yerine FSW gibi
                durumunuza uygun programları inceleyin. Tablo özet
                niteliğindedir; meslek, deneyim süresi ve diğer koşulların
                tamamı kontrol edilmelidir.
              </p>
              <Source index={1} />
            </section>
            <section id="ornek-profiller">
              <h2>Türkiye’den üç örnek profil: önce neyi kontrol etmeli?</h2>
              <p>
                Aşağıdaki senaryolar açıklama amaçlıdır; gerçek müşteri veya
                onay hikâyesi değildir. Eksik bilgiler nedeniyle kesin uygunluk
                ya da CRS puanı verilmez.
              </p>
              <h3>Türkiye’de çalışan, Kanada deneyimi olmayan aday</h3>
              <p>
                29 yaşında, Türkiye’den lisans mezunu ve üç yıllık ücretli
                yazılım deneyimi olan bir aday önce FSW koşullarını
                inceleyebilir. Görevlerinin uygun NOC ile eşleşmesi, kesintisiz
                deneyimi, dil sonuçları, ECA ve 67 puan değerlendirmesi kontrol
                edilir. Bunlar sağlanırsa CRS hesabına geçilir; sadece mesleğin
                adıyla davet beklenmez.
              </p>
              <h3>Kanada’da eğitim sonrası çalışan aday</h3>
              <p>
                Kanada’da mezuniyet sonrası geçerli çalışma yetkisiyle 14 aydır
                TEER 2 bir işte çalışan aday CEC’yi inceleyebilir. Çalışmanın
                uygun tarihlerde, ücretli ve sayılabilir olması doğrulanır;
                dilde her beceri için en az CLB/NCLC 5 aranır. Okul sırasında
                yapılan iş, aynı değerlendirmeye otomatik eklenmez. Çalışma
                izninin bitişi de PR sürecinden ayrı takip edilir.
              </p>
              <h3>Türkiye’de deneyimli bir meslek ustası</h3>
              <p>
                Son beş yılda üç yıllık tesisat deneyimi olan aday FST’yi
                araştırabilir. Ancak deneyim tek başına yeterli değildir: uygun
                meslek grubu, dil ve geçerli Kanada iş teklifi veya yetkili
                kurumun yeterlilik belgesi kontrol edilir. Türkiye’deki ustalık
                belgesinin Kanada yeterlilik belgesi yerine geçtiği varsayılmaz.
              </p>
              <Source index={11} />
              <Source index={12} />
              <Source index={13} />
            </section>
            <section id="crs">
              <h2>Program uygunluğu ile CRS puanı aynı şey değildir</h2>
              <p>
                Programa uygunluk, havuza girebilmeniz için gereken ilk
                aşamadır. <strong>Comprehensive Ranking System (CRS)</strong>{' '}
                ise uygun adayları sıralar. Yaş, dil, eğitim, iş deneyimi ve
                uygulanıyorsa eş bilgileri puanı etkiler.
              </p>
              <p>
                Bir programın asgari koşullarını karşılamak, o turda davet
                alacak puana ulaşmak anlamına gelmez. Puanınızı tahminlerle
                değil, kanıtlayabileceğiniz bilgilerle hesaplayın. Eşlerden
                hangisinin ana başvuru sahibi olacağını iki profilin gerçek
                verileriyle karşılaştırın.
              </p>
              <h3>67 puan ile CRS puanını karıştırmayın</h3>
              <p>
                FSW’nin 100 üzerinden 67 puanlık seçim değerlendirmesi, program
                uygunluğuna ilişkindir. CRS ayrı bir sıralama sistemidir. FSW
                eşiğini geçmeniz havuzda yüksek sıralama veya davet garantisi
                oluşturmaz.
              </p>
              <h3>Profilinizi geliştirmek için somut sıra</h3>
              <ol>
                <li>
                  Resmî hesaplayıcıya yalnızca belgelendirebildiğiniz dil,
                  eğitim ve deneyimi girerek mevcut durumunuzu kaydedin.
                </li>
                <li>
                  Dil sınavında geliştirebileceğiniz becerileri ayrı ayrı
                  belirleyin; toplam sınav ortalamasına bakmakla yetinmeyin.
                </li>
                <li>
                  Eşli başvuruda ana başvuru sahibi seçeneklerini ve eşin
                  belgelenebilir eğitim/dil katkısını karşılaştırın.
                </li>
                <li>
                  Uygun eyalet programlarını ve kategori koşullarını araştırın;
                  yalnızca geçmiş taban puana göre pahalı eğitim kararı
                  vermeyin.
                </li>
              </ol>
              <Source index={2} />
              <div className="guide-warning">
                <p>
                  <strong>Güncel iş teklifi kuralı:</strong> 25 Mart 2025’ten
                  itibaren iş teklifine verilen 50 veya 200 ek CRS puanı
                  kaldırıldı. İş teklifi bazı programlarda uygunluk veya seçim
                  ölçütü olarak önemini koruyabilir; eski hesaplayıcılara
                  güvenmeyin.
                </p>
              </div>
              <Source index={3} />
              <p>
                <Link href={sources[2][1]}>
                  Resmî CRS hesaplama aracına geçin →
                </Link>
              </p>
            </section>
            <section id="kategoriler">
              <h2>Kategori bazlı davetler nasıl çalışır?</h2>
              <p>
                IRCC genel, program odaklı veya kategori bazlı davet turları
                düzenleyebilir. Kategori bazlı seçim; Fransızca yeterliliği,
                belirli meslekler veya belirli Kanada deneyimleri gibi ölçütlere
                odaklanabilir.
              </p>
              <p>
                Bir kategoriye girmeniz temel Express Entry uygunluğunun yerini
                tutmaz. Hem üç programdan birine hem de ilgili turun özel
                koşullarına uymalısınız. Kategoriler, meslek kodları ve deneyim
                şartları değişebilir; yalnızca iş unvanınıza bakarak uygunluk
                varsaymayın.
              </p>
              <Source index={4} />
              <p>
                Tek bir “gerekli CRS puanı” yoktur. Önceki turun taban puanı,
                sonraki turun garantisi değildir. Güncel sonuçları turun türü ve
                koşullarıyla birlikte okuyun.
              </p>
              <Source index={10} />
            </section>
            <section id="belgeler">
              <h2>Dil, eğitim ve iş deneyimi belgeleri</h2>
              <p>
                Profilde bildirdiğiniz bilgileri başvuru aşamasında belgelerle
                desteklemelisiniz. Hazırlığı davet sonrasına bırakmayın:
              </p>
              <ul>
                <li>
                  <strong>Dil:</strong> IRCC’nin kabul ettiği sınavı ve
                  programınıza uygun sonuçları kontrol edin; geçerlilik
                  tarihlerini takip edin.
                </li>
                <li>
                  <strong>Eğitim:</strong> Yurt dışı eğitiminiz için gerekiyorsa
                  Educational Credential Assessment (ECA) alın. Göçmenlik amaçlı
                  ECA, mesleki çalışma lisansı değildir.
                </li>
                <li>
                  <strong>İş deneyimi:</strong> Tarih, görev, çalışma süresi ve
                  işveren bilgilerini doğrulanabilir belgelerle hazırlayın.
                </li>
                <li>
                  <strong>Kimlik ve aile:</strong> Pasaport, medeni durum ve
                  aile belgelerindeki bilgilerin tutarlı olduğundan emin olun.
                </li>
                <li>
                  <strong>Diğer belgeler:</strong> Adli sicil, sağlık muayenesi,
                  mali yeterlilik ve kişisel kontrol listenizdeki ek talepleri
                  izleyin.
                </li>
              </ul>
              <h3>Hangi dil sınavı ve ne kadar geçerlilik?</h3>
              <p>
                İngilizce için CELPIP-General, IELTS General Training ve PTE
                Core; Fransızca için TEF Canada veya TCF Canada kabul edilen
                seçeneklerdir. IELTS Academic ve PTE Academic sonuçlarını bu
                sınavlarla karıştırmayın. Sonuçlar profil oluştururken ve PR
                başvurusunu gönderirken iki yıldan eski olmamalıdır. Puanı
                CLB/NCLC karşılığına beceri bazında çevirin.
              </p>
              <Source index={15} />
              <h3>ECA hazırlığında dikkat edilecekler</h3>
              <p>
                Türkiye’de alınan diplomanın adını doğrudan Kanada derecesi
                olarak yazmayın; rapordaki denkliği esas alın. Göçmenlik amaçlı
                raporu IRCC’nin belirlediği kurum veya ilgili mesleki kuruluştan
                alın. ECA, hem profil hem başvuru tarihinde beş yıldan eski
                olmamalıdır. Birden fazla diploma üzerinden puan isteniyorsa
                gerekli her diploma için değerlendirme koşullarını kontrol edin.
              </p>
              <Source index={14} />
              <Source index={5} />
              <p>
                <Link href={sources[14][1]}>
                  Resmî ECA kurum ve belge talimatları →
                </Link>
              </p>
            </section>
            <section id="maddi-yeterlilik">
              <h2>Yerleşim parası göstermek gerekir mi?</h2>
              <p>
                FSW ve FST için genel olarak yerleşim fonu kanıtı gerekir. CEC
                başvurularında bu şart aranmaz. Kanada’da çalışma yetkisiyle
                birlikte geçerli iş teklifi olan bazı FSW/FST adayları da
                istisna kapsamında olabilir.
              </p>
              <p>
                Gerekli tutar aile büyüklüğüne göre değişir ve dönemsel
                güncellenir. Eş ve bakmakla yükümlü çocukların nasıl
                sayılacağını resmî talimattan kontrol edin; sizinle gelmeyen
                aile üyeleri de hesaba dahil olabilir.
              </p>
              <ul>
                <li>
                  Fonun erişilebilir ve size ait olduğunu belgeleyin; borç
                  alınmış parayı yerleşim fonu gibi göstermeyin.
                </li>
                <li>
                  Banka yazılarında hesap, bakiye ve geçmiş ortalama gibi
                  istenen bilgileri hazırlayın.
                </li>
                <li>
                  Bu tutarı başvuru ücretleri ve gerçek yerleşim bütçesiyle
                  karıştırmayın.
                </li>
              </ul>
              <p>
                Güncel tutarı doğrudan IRCC tablosundan kontrol edin. Öğrenci
                iznindeki mali yeterlilik rakamları Express Entry için
                kullanılamaz.
              </p>
              <Source index={6} />
            </section>
            <section id="basvuru">
              <h2>Başvuru süreci: profilden kalıcı oturuma</h2>
              <ol>
                <li>
                  Uygun federal programı belirleyin; dil ve eğitim belgelerinizi
                  hazırlayın.
                </li>
                <li>
                  Doğru bilgilerle profil oluşturun ve CRS puanınızı kontrol
                  edin.
                </li>
                <li>
                  Havuzdayken iş, aile ve dil sonucu gibi değişiklikleri güncel
                  tutun.
                </li>
                <li>
                  Davet alırsanız hangi program ve tur üzerinden çağrıldığınızı
                  inceleyin.
                </li>
                <li>
                  Hesabınızdaki kişisel belge listesine göre başvurunuzu
                  tamamlayın.
                </li>
                <li>
                  IRCC’nin ek belge ve inceleme taleplerini izleyin; onay
                  halinde statü doğrulama veya varış talimatlarını uygulayın.
                </li>
              </ol>
              <p>
                <strong>
                  Davet (ITA) mevcut talimata göre 60 gün geçerlidir.
                </strong>{' '}
                Hesabınızdaki son tarihi esas alın. Davet, kalıcı oturum onayı
                değildir. Durumunuz değiştiyse uygunluğu ve puanı yeniden
                değerlendirin.
              </p>
              <Source index={7} />
            </section>
            <section className="guide-assessment">
              <h2>Hangi yoldan başlamanız gerektiğini netleştirin</h2>
              <p>
                Yaş, eğitim, dil sonucu, iş deneyimi ve aile durumunuzu
                paylaşarak ilgili rehberleri ve varsa destek seçeneklerini
                öğrenin.
              </p>
              <Link href="/on-degerlendirme?konu=kanada-gocmenlik&source=express-entry-mid">
                Kalıcı oturum profilimi değerlendir
              </Link>
              <small>
                Ön değerlendirme davet veya kalıcı oturum garantisi oluşturmaz.
              </small>
            </section>
            <section id="alternatifler">
              <h2>Eyalet adaylığı ve Express Entry dışındaki yollar</h2>
              <p>
                <strong>Provincial Nominee Program (PNP)</strong> kapsamında
                eyaletler kendi ihtiyaç ve koşullarına göre aday seçer. Express
                Entry bağlantılı bir adaylığı kabul etmek ek CRS puanı
                sağlayabilir; eyaletin koşullarını ve orada yaşama niyetinizi
                ayrıca değerlendirmeniz gerekir. Adaylık, federal incelemenin
                yerine geçmez.
              </p>
              <Source index={8} />
              <p>
                Express Entry tek seçenek değildir. Express Entry dışı eyalet
                süreçleri, uygun aile sponsorluğu ve bölgesel programlar farklı
                durumlarda değerlendirilebilir. Quebec’in ekonomik göçmenlik
                seçimi ayrı süreçlere sahiptir. Programların başvuruya açık olup
                olmadığını ve güncel şartlarını resmî kaynaktan kontrol edin.
              </p>
              <Source index={9} />
              <p>
                <Link href={sources[8][1]}>Eyalet aday programları →</Link>
              </p>
            </section>
            <section id="hatalar">
              <h2>Planınızı zayıflatan yaygın hatalar</h2>
              <ul>
                <li>
                  Programa uygunluk ile davet alabilecek puanı aynı görmek.
                </li>
                <li>
                  İş unvanını kullanıp gerçek görevlerle meslek kodunu
                  karşılaştırmamak.
                </li>
                <li>
                  Süresi geçen dil veya eğitim değerlendirme belgelerini gözden
                  kaçırmak.
                </li>
                <li>Eski iş teklifi puanlarıyla CRS hesabı yapmak.</li>
                <li>
                  Kategoriye girmeyi veya eyalet adaylığını kesin onay saymak.
                </li>
                <li>
                  Belgelerle desteklenemeyen deneyim ya da aile bilgisi
                  bildirmek.
                </li>
                <li>
                  Profil oluşturmanın çalışma veya Kanada’da kalma hakkı
                  verdiğini düşünmek.
                </li>
              </ul>
            </section>
            <section id="kontrol-listesi">
              <h2>Başlangıç kontrol listesi</h2>
              <ul>
                {[
                  'Uygun olduğum programın bütün koşullarını kontrol ettim.',
                  'Dil sınavı ve gerekiyorsa ECA için hazırlığımı yaptım.',
                  'İş deneyimimi görev ve belgelerle eşleştirdim.',
                  'CRS puanını güncel kurallarla hesapladım.',
                  'Eş ve çocuk bilgilerini doğru değerlendirdim.',
                  'Fon gerekliliğini ve gerçek yerleşim bütçemi ayırdım.',
                  'Davet sonrası belge hazırlığı ve süre için plan yaptım.',
                ].map((text) => (
                  <li key={text}>{text}</li>
                ))}
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
            <section className="guide-assessment">
              <h2>Kalıcı oturum planınız için sonraki adım</h2>
              <p>
                Önce uygunluk, sonra puan ve belgeler: planınızı doğrulanabilir
                bilgilerle oluşturun.
              </p>
              <Link href="/on-degerlendirme?konu=kanada-gocmenlik&source=express-entry-bottom">
                Ön değerlendirmeyi başlat
              </Link>
              <small>
                Form hukuki veya göçmenlik danışmanlığı ilişkisi kurmaz; iş,
                davet veya sonuç garantisi vermez.
              </small>
            </section>
            <section>
              <h2>İlgili rehberler</h2>
              <div className="guide-related">
                {[
                  [
                    '/rehberler/turkiyeden-kanadaya-nasil-gidilir',
                    'Türkiye’den Kanada’ya nasıl gidilir?',
                    'Göçmenlik ve geçici kalış yollarını karşılaştırın.',
                  ],
                  [
                    '#crs',
                    'CRS puanı nasıl yükseltilir?',
                    'Profilinizde geliştirebileceğiniz alanları inceleyin.',
                  ],
                  [
                    '/kanadada-calisma/kanada-calisma-izni',
                    'Kanada çalışma izni',
                    'Geçici çalışma yetkisi ile kalıcı oturumu ayırın.',
                  ],
                  [
                    '/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun',
                    'Kanada’da ilk 90 gün',
                    'Yerleşim sürecinizi adım adım hazırlayın.',
                  ],
                ].map(([href, title, text]) => (
                  <article key={href}>
                    <h3>
                      <Link href={href}>{title}</Link>
                    </h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>
            <section>
              <h2>Hazırlayan ve editoryal yöntem</h2>
              <p>
                Bu rehber{' '}
                <Link href="/hakkimizda">KanadaVizesi.ca İçerik Ekibi</Link>{' '}
                adına hazırlanmıştır. Koşullar aşağıdaki IRCC kaynaklarıyla
                karşılaştırılmıştır; örnek profiller editoryal açıklamalardır.
                Bu sayfa için adı belirtilmiş bir lisanslı danışman veya avukat
                incelemesi bulunmamaktadır.
              </p>
              <p>
                Güncelleme yaklaşımını{' '}
                <Link href="/kaynak-politikasi">kaynak politikasından</Link>{' '}
                okuyabilir, kaynakla desteklenen düzeltmeleri{' '}
                <a href="mailto:bilgi@kanadavizesi.ca">bilgi@kanadavizesi.ca</a>{' '}
                adresine iletebilirsiniz.
              </p>
            </section>
            <section id="kaynaklar" className="guide-sources">
              <h2>Resmî kaynaklar</h2>
              <p>
                22 Eylül 2026 tarihinde kontrol edilmiştir. Başvuru öncesinde
                güncel talimatları yeniden okuyun.
              </p>
              <ul>
                {sources.map(([title, href]) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      IRCC — {title}
                      <span className="sr-only"> (yeni sekmede açılır)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>
          <aside className="guide-toc">
            <h2>Bu rehberde</h2>
            <ol>
              {contents.map(([id, title]) => (
                <li key={id}>
                  <a href={`#${id}`}>{title}</a>
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
