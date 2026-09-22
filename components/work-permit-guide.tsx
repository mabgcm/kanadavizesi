import Link from 'next/link';
import { GuideMobileToc } from './guide-mobile-toc';
import { GuideFaq } from './guide-faq';
import { JsonLd } from './json-ld';
import { SITE_URL, workPermit } from '@/lib/content';
import { publisher, SOCIAL_IMAGE } from '@/lib/seo';

const sources = [
  [
    'İzin gerekliliği ve izin türleri',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/need-permit.html',
  ],
  [
    'Açık çalışma izni',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/open-work-permit.html',
  ],
  [
    'LMIA ve muafiyetler',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/hire-temporary-foreign/find-need-labour-market-impact-assessment.html',
  ],
  [
    'Kanada dışından başvuru rehberi',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5487-applying-work-permit-outside-canada.html',
  ],
  [
    'Ziyaretçiler için geçici politikanın sona ermesi',
    'https://www.canada.ca/en/immigration-refugees-citizenship/news/notices/ends-tpp-allowing-visitors-apply-work-permits-within-country.html',
  ],
  [
    'Kanada’ya varış ve izin belgesi',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit-outside/arrival.html',
  ],
  [
    'İş veya işveren değiştirme',
    'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/extend/change-jobs-employers.html',
  ],
] as const;
const contents = [
  ['izin-turleri', 'Çalışma izni türleri'],
  ['acik-izin', 'Açık izin kimler için?'],
  ['lmia', 'LMIA ve işveren işlemleri'],
  ['belgeler', 'Başvuru belgeleri'],
  ['basvuru', 'Türkiye’den başvuru'],
  ['ziyaretci', 'Ziyaretçi olarak başvuru'],
  ['varis', 'Onay ve Kanada’ya varış'],
  ['isveren-degisikligi', 'İşveren değişikliği ve süre'],
  ['kontrol-listesi', 'Başvuru kontrol listesi'],
  ['sss', 'Sık sorulan sorular'],
  ['kaynaklar', 'Resmî kaynaklar'],
] as const;
const faqs = [
  {
    question: 'İş teklifi çalışma izni yerine geçer mi?',
    answer:
      'Hayır. İş teklifi başvurunun bir parçası olabilir; geçerli çalışma yetkisi oluşmadan işe başlayamazsınız.',
  },
  {
    question: 'LMIA olmadan çalışma izni alınabilir mi?',
    answer:
      'Evet, uygun bir LMIA muafiyeti veya açık çalışma izni kategorisi varsa mümkün olabilir. LMIA muafiyeti, çalışma izni muafiyetiyle aynı şey değildir.',
  },
  {
    question: 'İş teklifi olmadan açık çalışma iznine başvurabilir miyim?',
    answer:
      'Açık izin için iş teklifi aranmaz; ancak uygun bir başvuru kategorisine girmeniz gerekir. İş arıyor olmak tek başına yeterli değildir.',
  },
  {
    question: 'Turist vizesiyle çalışabilir miyim?',
    answer:
      'Ziyaretçi vizesi çalışma yetkisi vermez. Uygulanabilir bir izin veya çalışma izni muafiyeti bulunmalıdır.',
  },
  {
    question: 'İşverenimi değiştirebilir miyim?',
    answer:
      'İşverene bağlı izinde genellikle yeni izin başvurusu gerekir. Yeni işte başlamadan önce gerekli izin veya IRCC’nin uygulanabilir geçici çalışma yetkisini almalısınız.',
  },
  {
    question: 'Çalışma izniyle Kanada’ya giriş garanti mi?',
    answer:
      'Hayır. Seyahat belgeleri ve giriş koşulları ayrıca değerlendirilir. Yurt dışından alınan onay mektubu, izin belgesinin kendisi değildir.',
  },
  {
    question: 'Çalışma izni kalıcı oturum sağlar mı?',
    answer:
      'Tek başına sağlamaz. Kalıcı oturum için ayrı bir programın koşullarını karşılamanız ve ilgili süreci tamamlamanız gerekir.',
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
export function WorkPermitGuide() {
  const url = `${SITE_URL}${workPermit.path}`;
  return (
    <main className="guide-page work-permit-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: workPermit.title,
              description: workPermit.description,
              mainEntityOfPage: url,
              inLanguage: 'tr-TR',
              author: publisher,
              publisher,
              image: SOCIAL_IMAGE.url,
              dateModified: workPermit.reviewedAt,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                ['Ana Sayfa', '/'],
                [
                  'Kanada’da Çalışma',
                  '/kanadada-calisma/turkiyeden-kanadada-is-bulmak',
                ],
                [workPermit.title, workPermit.path],
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
          <Link href="/kanadada-calisma/turkiyeden-kanadada-is-bulmak">
            Kanada’da Çalışma
          </Link>{' '}
          {' > '}
          <span aria-current="page">Kanada Çalışma İzni</span>
        </nav>
        <div className="guide-layout">
          <article>
            <p className="article-category">Kanada’da Çalışma</p>
            <h1>{workPermit.title}</h1>
            <span className="red-rule" />
            <p className="article-intro">
              Kanada’da iş bulmak ve yasal olarak çalışabilmek farklı
              aşamalardır. Doğru başlangıç; iş teklifinizin bulunup
              bulunmadığını, hangi izin kategorisine uygun olduğunuzu ve
              işverenin tamamlaması gereken işlemleri belirlemektir.
            </p>
            <p>
              Bu rehber, Türkiye’den başvuru hazırlayanlar için çalışma izni
              türlerini ve temel adımları açıklar. İş teklifi, LMIA veya başvuru
              gönderimi tek başına çalışma yetkisi oluşturmaz.
            </p>
            <div className="article-meta">
              <span>
                Yayın tarihi:{' '}
                <time dateTime={workPermit.reviewedAt}>22 Eylül 2026</time>
              </span>
              <span>Yazar: KanadaVizesi.ca İçerik Ekibi</span>
            </div>
            <section className="guide-callout">
              <h2>Kısa cevap</h2>
              <p>
                Kanada’da çalışmak için çoğu durumda çalışma izni gerekir. İzin,
                belirli bir işverene bağlı olabilir veya uygun bir kategori
                kapsamında açık olarak düzenlenebilir. Ziyaretçi vizesi, çalışma
                izni değildir; sınırlı izin muafiyetlerinin de kendine özgü
                koşulları vardır.
              </p>
              <Source index={0} />
            </section>

            <section id="izin-turleri">
              <h2>Açık ve işverene bağlı çalışma izni</h2>
              <div
                className="guide-table-wrap"
                role="region"
                aria-label="Çalışma izni türleri karşılaştırması"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Konu</th>
                      <th scope="col">İşverene bağlı izin</th>
                      <th scope="col">Açık izin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">İşveren</th>
                      <td>İzinde belirtilen işverene bağlıdır.</td>
                      <td>Uygun işverenler arasında çalışma imkânı sağlar.</td>
                    </tr>
                    <tr>
                      <th scope="row">İş teklifi</th>
                      <td>İşveren ve iş bilgileri gerekir.</td>
                      <td>
                        Başvuru için iş teklifi gerekmez; kategori uygunluğu
                        gerekir.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">LMIA</th>
                      <td>İşe göre gerekir veya muafiyet uygulanır.</td>
                      <td>İşverenin LMIA alması gerekmez.</td>
                    </tr>
                    <tr>
                      <th scope="row">Sınırlar</th>
                      <td>
                        İşveren, süre ve gerektiğinde çalışma yeri gibi koşullar
                        bulunur.
                      </td>
                      <td>
                        Meslek, sağlık veya bölgeyle ilgili kısıtlar
                        bulunabilir.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Source index={0} />
            </section>
            <section id="acik-izin">
              <h2>Açık çalışma izni herkes için bir seçenek mi?</h2>
              <p>
                Hayır. Açık izin, yalnızca belirli durumlarda başvurulabilen bir
                izin türüdür. Uygun mezunların PGWP başvuruları, bazı aile
                üyeleri veya belirli kalıcı oturum süreçleri buna örnektir. Her
                grubun ayrı koşulları vardır.
              </p>
              <p>
                “Kanada’ya gidip iş aramak istiyorum” demek açık izin hakkı
                yaratmaz. Eşinizin Kanada’da öğrenci veya çalışan olması da tek
                başına yeterli değildir. Önce hangi kategoriye girdiğinizi
                doğrulayın.
              </p>
              <p>
                Açık izin, bütün işlerde sınırsız çalışma anlamına gelmez.
                Belgenizdeki meslek, sağlık veya yer kısıtlamalarını inceleyin.
              </p>
              <Source index={1} />
              <p>
                <Link href="/kanadada-calisma/acik-ve-isverene-bagli-calisma-izni">
                  Açık ve işverene bağlı izinleri ayrıntılı karşılaştırın →
                </Link>
              </p>
            </section>
            <section id="lmia">
              <h2>LMIA ve işverenin tamamlaması gereken işlemler</h2>
              <p>
                <strong>LMIA</strong>, yabancı çalışan istihdamının Kanada iş
                piyasasına etkisini değerlendiren süreçtir. Gerekiyorsa
                başvuruyu işveren yapar; olumlu kararın ardından çalışan ayrıca
                çalışma iznine başvurur.
              </p>
              <ul>
                <li>
                  <strong>LMIA gereken işler:</strong> İşverenden karar belgesi
                  ve ilgili iş bilgilerini alın.
                </li>
                <li>
                  <strong>LMIA muafiyeti olan işler:</strong> Muafiyet gerekçesi
                  doğrulanmalıdır. Birçok işverene bağlı başvuruda işveren,
                  Employer Portal üzerinden teklif sunar ve gerekli uyum
                  işlemlerini tamamlar.
                </li>
                <li>
                  <strong>Açık izin:</strong> İşverenin sizin için LMIA veya
                  Employer Portal teklifi sunması gerekmez.
                </li>
              </ul>
              <p>
                <strong>
                  LMIA muafiyeti, çalışma izni muafiyeti değildir.
                </strong>{' '}
                Quebec’te LMIA ile işe alımda CAQ gibi ek eyalet işlemleri
                gündeme gelebilir; işe uygun kuralları ayrıca kontrol edin.
              </p>
              <Source index={2} />
              <p>
                <Link href="/kanadada-calisma/lmia-nedir">LMIA nedir? →</Link>
              </p>
            </section>
            <section id="belgeler">
              <h2>Başvuru belgelerini nasıl hazırlamalısınız?</h2>
              <p>
                Kişisel kontrol listeniz ve ülkeye özel talimatlar
                belirleyicidir. Hazırlık sırasında şu başlıkları kontrol edin:
              </p>
              <ul>
                <li>Geçerli pasaport ve kimlik belgeleri.</li>
                <li>
                  İşverene bağlı başvuruda yazılı teklif veya sözleşme;
                  gerekiyorsa LMIA ya da teklif numarası.
                </li>
                <li>
                  İşe uygun eğitim, deneyim ve gerekli mesleki yetkinlik
                  kanıtları.
                </li>
                <li>
                  Açık izin başvurusunda ilgili kategoriye uygunluk belgeleri.
                </li>
                <li>
                  İstenirse biyometri, sağlık muayenesi ve adli sicil belgeleri.
                </li>
                <li>
                  Kendiniz ve aileniz için geçim ve dönüş masraflarını
                  karşılayabileceğinizi destekleyen bilgiler.
                </li>
              </ul>
              <p>
                Belgelerinizi başvuru sisteminin istediği biçimde hazırlayın. İş
                unvanı, görevler ve sözleşme bilgilerindeki tutarsızlıkları
                göndermeden önce giderin.
              </p>
              <Source index={3} />
            </section>
            <section id="basvuru">
              <h2>Türkiye’den başvuru: adım adım</h2>
              <ol>
                <li>
                  Çalışma iznine ihtiyaç olup olmadığını ve uygun kategoriyi
                  belirleyin.
                </li>
                <li>
                  İşverene bağlı başvuruda işverenin LMIA veya muafiyet sürecini
                  tamamlamasını bekleyin.
                </li>
                <li>
                  Kişisel belge listenizi ve varsa ülkeye özel talimatları
                  izleyin.
                </li>
                <li>
                  Uygun IRCC başvuru kanalından dosyanızı gönderin; geçerli
                  ücretleri ödeme aşamasında doğrulayın.
                </li>
                <li>
                  Talep edilen biyometri, muayene veya ek belgeleri zamanında
                  tamamlayın.
                </li>
                <li>
                  Karar ve seyahat talimatları doğrultusunda hareket edin.
                </li>
              </ol>
              <p>
                Başvuru süresi için kesin gün veya onay garantisi veren vaatlere
                güvenmeyin. İzin kategorisi ve dosyanızın durumu sonucu etkiler.
              </p>
              <Source index={3} />
            </section>
            <section className="guide-assessment">
              <h2>İş teklifiniz ve izin yolunuz net mi?</h2>
              <p>
                Mesleğinizi, iş teklifinizi ve mevcut durumunuzu paylaşarak
                ilgili rehberleri ve varsa destek seçeneklerini öğrenin.
              </p>
              <Link href="/on-degerlendirme?konu=kanadada-calisma&source=work-permit-mid">
                Çalışma planımı değerlendir
              </Link>
              <small>
                Ön değerlendirme iş, izin veya sonuç garantisi oluşturmaz.
              </small>
            </section>
            <section id="ziyaretci">
              <h2>Turist olarak gidip çalışma iznine geçebilir misiniz?</h2>
              <p>
                Ziyaretçi statüsü çalışma yetkisi vermez. Ziyaretçilerin Kanada
                içinden çalışma iznine başvurmasına olanak sağlayan geçici
                politika <strong>28 Ağustos 2024’te sona erdi.</strong>
              </p>
              <p>
                Kanada içinden başvurabilmek için ayrı bir uygunluk dayanağınız
                bulunmalıdır. “Önce turist olarak gel, sonra kesin çalışırsın”
                yaklaşımıyla plan yapmayın. Başvuru yapmak da kendi başına işe
                başlama izni değildir.
              </p>
              <Source index={4} />
            </section>
            <section id="varis">
              <h2>Onaydan sonra Kanada’ya varış</h2>
              <p>
                Yurt dışından onaylanan başvuruda verilen giriş mektubu, çalışma
                izninin kendisi değildir. Sınır görevlisi giriş koşullarınızı
                değerlendirir ve uygunsa izin belgesini düzenler.
              </p>
              <ul>
                <li>
                  Pasaportunuzu, gerekli vize veya eTA’yı ve giriş mektubunuzu
                  kontrol edin.
                </li>
                <li>
                  İş ve başvuru destek belgelerini yolculukta erişilebilir
                  tutun.
                </li>
                <li>
                  İzin düzenlendiğinde adınızı, işvereninizi, tarihleri ve
                  çalışma koşullarını inceleyin.
                </li>
              </ul>
              <p>
                Onay mektubu ülkeye giriş garantisi vermez. İşe başlamadan önce
                geçerli çalışma yetkinizin kapsamını netleştirin.
              </p>
              <Source index={5} />
              <p>
                <Link href="/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun">
                  Kanada’da ilk 90 gün: yerleşim adımları →
                </Link>
              </p>
            </section>
            <section id="isveren-degisikligi">
              <h2>İşveren değişikliği ve izin süresi</h2>
              <p>
                İşverene bağlı izinle farklı bir işverende çalışmak için
                genellikle yeni çalışma izni başvurusu gerekir. Yeni teklif
                almanız veya başvuruyu göndermeniz, hemen yeni işte
                başlayabileceğiniz anlamına gelmez.
              </p>
              <p>
                Bazı başvuru sahipleri karar beklerken işveren değiştirmek için
                IRCC’den geçici çalışma yetkisi talep edebilir. Bu sürece
                uygunluğu ve gerekli onayı doğrulamadan çalışmaya başlamayın.
              </p>
              <p>
                İzin bitişini ve pasaport geçerliliğini takip edin. Uzatma
                başvurusu sırasında çalışmaya devam etme hakkı koşulludur; eski
                iznin şartları ve Kanada’da bulunma gibi ayrıntılar önemlidir.
                Açık izin sahibiyseniz de belge üzerindeki kısıtlamalar
                geçerlidir.
              </p>
              <Source index={6} />
            </section>
            <section id="kontrol-listesi">
              <h2>Başvuru öncesi son kontrol</h2>
              <ul>
                {[
                  'İzin türümü ve başvuru dayanağımı doğruladım.',
                  'İşverenin kimliğini, yazılı teklifini ve iş koşullarını kontrol ettim.',
                  'Gerekli LMIA veya muafiyet işlemlerini netleştirdim.',
                  'Belgelerim ve başvuru bilgilerim tutarlı.',
                  'Süre ve ücretleri güncel resmî kanaldan kontrol edeceğim.',
                  'Çalışma iznini seyahat belgesi veya kalıcı oturum garantisiyle karıştırmıyorum.',
                  'Gerekli çalışma yetkisi oluşmadan işe başlamayacağım.',
                ].map((item) => (
                  <li key={item}>{item}</li>
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
              <h2>Kanada çalışma planınızı doğru sırayla hazırlayın</h2>
              <p>
                Önce izin yolunu, ardından işveren işlemlerini ve kişisel
                belgelerinizi netleştirin.
              </p>
              <Link href="/on-degerlendirme?konu=kanadada-calisma&source=work-permit-bottom">
                Ön değerlendirmeyi başlat
              </Link>
              <small>
                Form hukuki veya göçmenlik danışmanlığı ilişkisi oluşturmaz; iş
                veya izin garantisi vermez.
              </small>
            </section>
            <section>
              <h2>İlgili rehberler</h2>
              <div className="guide-related">
                {[
                  [
                    '/rehberler/turkiyeden-kanadaya-nasil-gidilir',
                    'Türkiye’den Kanada’ya nasıl gidilir?',
                    'Ziyaret, eğitim, çalışma ve yerleşim yollarını karşılaştırın.',
                  ],
                  [
                    '/kanadada-calisma/turkiyeden-kanadada-is-bulmak',
                    'Türkiye’den Kanada’da iş bulmak',
                    'İş arama planınızı ve hazırlığınızı geliştirin.',
                  ],
                  [
                    '/kanadada-calisma/is-teklifi-calisma-izni-saglar-mi',
                    'İş teklifi çalışma izni sağlar mı?',
                    'Teklif ile çalışma yetkisi arasındaki farkı inceleyin.',
                  ],
                  [
                    '/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni',
                    'Öğrenci vizesi ve eğitim izni',
                    'Eğitim yoluyla gelenlerin izin koşullarını öğrenin.',
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
            <section id="kaynaklar" className="guide-sources">
              <h2>Resmî kaynaklar</h2>
              <p>
                22 Eylül 2026 tarihinde kontrol edilmiştir. Başvuru öncesinde
                güncel koşulları tekrar okuyun.
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
