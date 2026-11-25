import Link from 'next/link';
import { GuideMobileToc } from './guide-mobile-toc';
import { GuideFaq } from './guide-faq';
import { JsonLd } from './json-ld';
import { highSchool, SITE_URL } from '@/lib/content';
import { publisher, SOCIAL_IMAGE } from '@/lib/seo';

const base =
  'https://www.canada.ca/en/immigration-refugees-citizenship/services/';

const sources = [
  [
    'Reşit olmayan öğrenciler: Kanada’da eğitim (IRCC)',
    `${base}study-canada/study-permit/prepare/minor-children.html`,
  ],
  [
    'Eğitim izni: gerekli belgeler',
    `${base}study-canada/study-permit/get-documents.html`,
  ],
  [
    'PAL/TAL belgesi ve muafiyetler',
    `${base}study-canada/study-permit/get-documents/provincial-attestation-letter.html`,
  ],
  [
    'Mali destek kanıtı',
    `${base}study-canada/study-permit/get-documents/financial-support.html`,
  ],
  [
    'Eğitim izni başvuru rehberi (Guide 5269)',
    `${base}application/application-forms-guides/guide-5269-applying-study-permit-outside-canada.html`,
  ],
  [
    'Mezuniyet sonrası çalışma izni (PGWP) koşulları',
    `${base}study-canada/work/after-graduation/eligibility.html`,
  ],
  [
    'IRCC güncel işlem süreleri',
    'https://ircc.canada.ca/english/information/times/perm/skilled-que.asp',
  ],
  [
    'IRCC ücret listesi',
    'https://www.ircc.canada.ca/english/information/fees/fees.asp',
  ],
] as const;

const contents = [
  ['kisa-cevap', 'Kısa cevap: liseyi Kanada’da okumak'],
  ['kimler', 'Kimler başvurabilir?'],
  ['egitim-izni', 'Eğitim izni: şartlar ve süre'],
  ['pal', 'PAL muafiyeti'],
  ['vasi', 'Vasi (custodian) şartı'],
  ['okullar-ucretler', 'Okul türleri ve 2026 ücretleri'],
  ['konaklama', 'Konaklama: homestay ve yatılı okul'],
  ['maddi', 'Maddi yeterlilik'],
  ['dil-esl', 'Dil şartı ve ESL desteği'],
  ['ebeveyn', 'Ebeveynler Kanada’da kalabilir mi?'],
  ['mezuniyet', 'Mezuniyet ve sonrası'],
  ['takvim', 'Başvuru takvimi ve adımlar'],
  ['hatalar', 'Sık yapılan hatalar'],
  ['sss', 'Sık sorulan sorular'],
  ['kaynaklar', 'Resmî kaynaklar'],
] as const;

const faqs = [
  {
    question: 'Kanada’da lise okumak için eğitim izni şart mı?',
    answer:
      'Eğitim 6 aydan uzunsa evet: öğrenci, Kanada’ya girmeden önce eğitim izni (study permit) almalıdır ve okuldan kabul mektubu zorunludur. 6 ay veya daha kısa programlarda izin gerekmez, ancak yine de başvuru yapılabilir. Lise düzeyi (9-12. sınıflar) için izin, öğrenim süresinin tamamına kadar, en fazla 4 yıl verilebilir. Başvuru ücreti 150 CAD’dir.',
  },
  {
    question: 'Lise öğrencisi için PAL belgesi gerekir mi?',
    answer:
      'Hayır. İlkokul ve lise (anaokulundan 12. sınıfa kadar) öğrencileri PAL/TAL şartından muaftır; IRCC’nin kendi çevrimiçi aracı da bunu doğrular. Başvuruya PAL yerine, öğrencinin lise düzeyinde okuyacağını gösteren kabul mektubu gibi muafiyet kanıtı eklenir. Quebec’te okuyacak öğrenciler için PAL yerine CAQ gerekir. Dikkat: liseden sonra kolej veya üniversiteye geçerken PAL şartı geri gelir.',
  },
  {
    question: '17 yaşından küçük öğrencinin vasisi kim olabilir?',
    answer:
      'Vasi; Kanada’da yaşayan, Kanada vatandaşı veya daimi sakini (PR), 19 yaş ve üzeri sorumlu bir yetişkin olmalıdır. Akraba, aile dostu ya da okulun/homestay programının sağladığı bir kişi olabilir. Vasilik beyanı (IMM 5646) iki sayfalıdır: ilk sayfayı vasi Kanada’da, ikinci sayfayı ebeveynler Türkiye’de notere onaylatır. 17 yaş ve üzerinde vasi isteğe bağlıdır, ancak vize memuru duruma göre isteyebilir.',
  },
  {
    question: 'Kanada’da lise bir yılda kaça mal olur?',
    answer:
      'Okul türüne göre değişir. Ontario’da devlet liselerinde yıllık harç yaklaşık 13.700-17.500 CAD’dir; homestay, sigorta ve başvuru ücretleriyle Toronto’da bir yılın toplamı kabaca 30.000-33.000 CAD’yi bulur. Özel gündüzlü okullar yaklaşık 20.000-55.000 CAD, yatılı okullar toplamda yaklaşık 53.500-105.000 CAD aralığındadır. Ücretler her yıl değişir; kesin rakamı okulun güncel ücret sayfasından teyit edin.',
  },
  {
    question: 'Annem veya babam benimle Kanada’da kalabilir mi?',
    answer:
      'Kanada’da lise öğrencisinin velisi için özel bir “refakatçi vizesi” yoktur. Ebeveyn, kendi adına ayrıca ziyaretçi vizesi başvurusu yapar ve bu vize çalışma hakkı vermez. Ebeveynin Kanada’da olması, çocuğun eğitim izni ihtiyacını ortadan kaldırmaz. Çocuk tüm öğrenim süresi boyunca en az bir ebeveyniyle birlikteyse vasilik beyanı gerekmez.',
  },
  {
    question: 'Kanada lise diploması çalışma izni (PGWP) verir mi?',
    answer:
      'Hayır. Mezuniyet sonrası çalışma izni (PGWP) yalnızca üniversite/kolej düzeyindeki (post-secondary), en az 8 aylık uygun programları bitirenler içindir; lise diploması PGWP vermez ve lise öğrencisi kampüs dışında çalışamaz. Lise eğitiminin değeri başka yerdedir: Kanada diplomasıyla (OSSD/Dogwood) üniversiteye Kanada lise mezunu olarak başvurmak ve Kanada’da geçen yıllarla İngilizceyi ve ders altyapısını güçlendirmek.',
  },
] as const;

export function HighSchoolGuide() {
  const url = `${SITE_URL}${highSchool.path}`;
  return (
    <main className="guide-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: highSchool.seoTitle,
              description: highSchool.description,
              mainEntityOfPage: url,
              inLanguage: 'tr-TR',
              author: publisher,
              publisher,
              image: SOCIAL_IMAGE.url,
              dateModified: highSchool.reviewedAt,
              datePublished: highSchool.publishedAt,
              isAccessibleForFree: true,
              publishingPrinciples: `${SITE_URL}/kaynak-politikasi`,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                ['Ana Sayfa', '/'],
                ['Rehberler', '/rehberler'],
                ['Kanada’da Lise Eğitimi', highSchool.path],
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
          <span aria-current="page">Kanada’da Lise Eğitimi</span>
        </nav>
        <div className="guide-layout">
          <article>
            <p className="article-category">Kanada’da Eğitim</p>
            <h1>{highSchool.seoTitle}</h1>
            <span className="red-rule" />
            <p className="article-intro">
              Türkiye’den bir lise öğrencisinin Kanada’da lise okuması,
              sanıldığından daha düzenli bir süreçtir: okul kabulü, eğitim
              izni, 17 yaş altı için vasi düzenlemesi ve doğru bütçe
              planı. Üstelik lise öğrencileri, kolej ve üniversite
              başvurularındaki PAL belgesinden muaftır. Bu rehber;
              başvuru şartlarını, 2026 ücretlerini, konaklama
              seçeneklerini ve mezuniyet sonrası yolları adım adım
              anlatır.
            </p>
            <p>
              Bu sayfa genel bilgilendirme amaçlıdır; hukuki tavsiye
              değildir. Kişisel durumunuz için yetkili bir göçmenlik
              danışmanı veya avukattan değerlendirme alın. Eğitim izninin
              genel çerçevesi için{' '}
              <Link href="/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni">
                Kanada öğrenci vizesi ve eğitim izni
              </Link>{' '}
              rehberine de bakın.
            </p>
            <div className="article-meta">
              <span>
                İlk yayın:{' '}
                {new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(
                  new Date(`${highSchool.publishedAt}T12:00:00Z`),
                )}
              </span>
              <span>
                Son güncelleme:{' '}
                {new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(
                  new Date(`${highSchool.reviewedAt}T12:00:00Z`),
                )}
              </span>
              <span>Yaklaşık okuma: 11 dakika</span>
              <span>Yazar: KanadaVizesi.ca İçerik Ekibi</span>
            </div>

            <section className="guide-callout" id="kisa-cevap">
              <h2>Kısa cevap</h2>
              <p>
                <strong>
                  Evet, Türkiye’den bir lise öğrencisi Kanada’da devlet
                  veya özel lisede okuyabilir.
                </strong>{' '}
                6 aydan uzun eğitim için Kanada’ya girmeden önce eğitim
                izni alınır; okuldan kabul mektubu zorunludur. Lise
                öğrencileri PAL belgesinden muaftır. 17 yaş altı ve
                ebeveyniyle gelmeyen öğrencinin Kanada’da bir vasisi
                (custodian) olmalıdır. Devlet lisesinde yıllık harç
                Ontario’da yaklaşık 13.700-17.500 CAD’dir; bütçenin
                geri kalanını konaklama ve yaşam giderleri oluşturur.
              </p>
            </section>

            <section id="kimler">
              <h2>Kimler başvurabilir?</h2>
              <p>
                Türkiye’de ilkokul, ortaokul veya lise öğrencisi olan ve
                Kanada’da anaokulundan 12. sınıfa kadar bir okula devam
                etmek isteyen her öğrenci başvurabilir. Reşit olma yaşı
                eyalete göre değişir: Ontario’da 18, British Columbia’da
                19 yaş altı öğrenciler “reşit olmayan” (minor) sayılır ve
                Türkiye’den gelen lise öğrencilerinin neredeyse tamamı
                bu kapsama girer.
              </p>
              <p>
                Devlet okullarında kabul, tek bir okula değil, okul
                kurulunun (school board) uluslararası öğrenci programı
                üzerinden yapılır; kurul, transkript ve kontenjana göre
                okulu yerleştirir. Kurullar genelde son 2 yılda C+ (%65)
                ve üzeri not ortalaması ile öğretmen veya müdür tavsiye
                mektubu ister. Özel okullara başvuru doğrudan okula
                yapılır; seçkin okullarda notların yanında sınav ve
                mülakat da olabilir.
              </p>
            </section>

            <section id="egitim-izni">
              <h2>Eğitim izni: şartlar ve süre</h2>
              <p>
                Eğitim 6 aydan uzunsa, öğrenci Kanada’ya girmeden önce
                eğitim izni (study permit) başvurusu yapmalıdır. 6 ay
                veya daha kısa programlarda izin gerekmez, ancak
                istenirse yine de başvuru yapılabilir. Başvurunun
                temel belgesi, okuldan alınan kabul mektubudur
                (letter of acceptance); orijinali veya elektronik
                kopyası kabul edilir.
              </p>
              <ul>
                <li>
                  <strong>Süre:</strong> Lise düzeyi (9-12. sınıflar)
                  için izin, amaçlanan öğrenim süresinin tamamına
                  kadar, en fazla 4 yıl verilebilir.
                </li>
                <li>
                  <strong>Ücret:</strong> Eğitim izni başvuru ücreti
                  150 CAD’dir.
                </li>
                <li>
                  <strong>Uzatma:</strong> Eğitim devam edecekse,
                  mevcut iznin bitiminden en az 90 gün önce uzatma
                  başvurusu yapılmalıdır.
                </li>
                <li>
                  <strong>Mali kanıt:</strong> İlk yılın harcı ile
                  yaşam giderlerini karşılayacak kaynak gösterilir
                  (ayrıntısı “Maddi yeterlilik” bölümünde).
                </li>
              </ul>
              <p>
                Eğitim izni onaylandığında, seyahat için gereken
                ziyaretçi vizesi (TRV) veya eTA da izinle birlikte
                düzenlenir. Türkiye’den başvuran öğrenci, ebeveyni
                Kanada’da olsa bile kural olarak iznini Kanada’ya
                girmeden önce alır.
              </p>
            </section>

            <section id="pal">
              <h2>PAL muafiyeti</h2>
              <p>
                Kolej ve üniversite başvurularında istenen PAL/TAL
                (eyalet onay mektubu), lise öğrencileri için gerekmez.
                İlkokul ve lise (anaokulundan 12. sınıfa kadar)
                öğrencileri bu şarttan muaftır; IRCC’nin çevrimiçi
                aracı da lise düzeyini seçen başvurana “PAL/TAL
                gerekmez” sonucunu verir.
              </p>
              <p>
                Muafiyet, başvuruda gösterilmelidir: PAL yerine,
                öğrencinin lise düzeyinde okuyacağını kanıtlayan
                kabul mektubu ve gerekirse kısa bir açıklama eklenir.
                Quebec’te okuyacak öğrenciler için PAL yerine CAQ
                (Quebec Kabul Sertifikası) gerekir. Bir de sınırını
                bilin: muafiyet düzeye bağlıdır — öğrenci liseden
                sonra kolej veya üniversiteye geçerken PAL şartı
                yeniden karşısına çıkar.
              </p>
            </section>

            <section id="vasi">
              <h2>Vasi (custodian) şartı</h2>
              <p>
                17 yaşından küçük ve ebeveyniyle gelmeyen her öğrenci
                için Kanada’da bir vasi (custodian) zorunludur. Vasi;
                öğrenciye bakacak ve onu destekleyecek, Kanada’da
                yaşayan, Kanada vatandaşı veya daimi sakini (PR),
                19 yaş ve üzeri sorumlu bir yetişkindir. Akraba, aile
                dostu veya okulun/homestay programının sağladığı bir
                kişi olabilir; vasinin öğrencinin evine ve okuluna
                makul mesafede oturması beklenir.
              </p>
              <h3>Noter onaylı vasilik beyanı (IMM 5646)</h3>
              <p>
                Vasilik, Custodianship Declaration (IMM 5646)
                formuyla belgelenir. Form iki sayfalıdır ve iki ayrı
                noter onayı ister: ilk sayfayı vasi imzalayıp{' '}
                <strong>Kanada’da</strong> notere onaylatır, ikinci
                sayfayı ebeveynler imzalayıp <strong>Türkiye’de</strong>{' '}
                notere onaylatır. Form, eğitim izni başvurusuyla
                birlikte gönderilir; noter ve gönderim süreleri için
                2-4 hafta öngörmek akıllıcadır.
              </p>
              <p>
                17 yaş ve üzerindeki öğrencilerde vasi isteğe bağlıdır;
                ancak vize memuru duruma göre isteyebilir ve bazı okul
                kurulları 18 yaş altı tüm öğrencilerinden vasi belgesi
                ister. Öğrenci tüm öğrenim süresi boyunca en az bir
                ebeveyniyle birlikte kalacaksa vasilik beyanı gerekmez.
              </p>
            </section>

            <section id="okullar-ucretler">
              <h2>Okul türleri ve 2026 ücretleri</h2>
              <p>
                Üç temel seçenek vardır: devlet lisesi, özel gündüzlü
                okul ve özel yatılı okul. Devlet okullarında başvuru
                kurulun uluslararası programınadır ve harçlar görece
                düşüktür; özel okullarda başvuru doğrudan okuladır,
                sınıf mevcutları daha küçüktür ve ücretler geniş bir
                aralıkta değişir.
              </p>
              {/* Keyboard focus enables horizontal table scrolling. */}
              {/* oxlint-disable jsx-a11y/no-noninteractive-tabindex */}
              <section
                className="guide-table-wrap"
                aria-label="Devlet lisesi ücretleri"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Okul kurulu</th>
                      <th scope="col">Yıllık lise harcı (CAD)</th>
                      <th scope="col">Başvuru ücreti (CAD)</th>
                      <th scope="col">Sağlık sigortası</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Toronto DSB (Ontario)</td>
                      <td>17.000</td>
                      <td>400</td>
                      <td>500/yıl, harca dahil değil</td>
                    </tr>
                    <tr>
                      <td>Toronto Catholic DSB (Ontario)</td>
                      <td>17.500</td>
                      <td>400</td>
                      <td>Harca dahil</td>
                    </tr>
                    <tr>
                      <td>Durham DSB (Ontario)</td>
                      <td>16.700</td>
                      <td>200</td>
                      <td>Kurula sorun</td>
                    </tr>
                    <tr>
                      <td>Dufferin-Peel Catholic DSB (Ontario)</td>
                      <td>14.800</td>
                      <td>500</td>
                      <td>500/yıl</td>
                    </tr>
                    <tr>
                      <td>Langley SD35 (British Columbia)</td>
                      <td>16.500</td>
                      <td>200</td>
                      <td>Harca dahil</td>
                    </tr>
                    <tr>
                      <td>Coquitlam SD43 (British Columbia)</td>
                      <td>18.500</td>
                      <td>300</td>
                      <td>Harca dahil</td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <p>
                Tablo, kurulların 2025-26 / 2026-27 dönemi için
                yayımladığı rakamlardır. Ontario’da devlet lisesi
                harcı genel olarak 13.700-17.500 CAD aralığındadır.
                Ücretler her yıl değişir; başvuru öncesi kurulun
                güncel ücret sayfasından teyit edin.
              </p>
              <h3>Özel okullar</h3>
              <ul>
                <li>
                  <strong>Gündüzlü özel okullar:</strong> Yıllık harç
                  yaklaşık 20.000-55.000 CAD aralığındadır; öğrenci
                  akşamları homestay’de veya ebeveyniyle kalır.
                </li>
                <li>
                  <strong>Orta segment yatılı okullar:</strong> Örneğin
                  Columbia International College’da (Hamilton) harç,
                  yurt, yemek ve ulaşımı kapsayan toplam yaklaşık
                  53.500 CAD/yıldır; sağlık sigortası ayrıca eklenir.
                </li>
                <li>
                  <strong>Seçkin yatılı okullar:</strong> 2026-27’de
                  toplam ücret yaklaşık 86.640-105.000 CAD/yıl
                  aralığındadır; buna bir kez ödenen kayıt ücreti de
                  eklenebilir.
                </li>
              </ul>
              <p>
                Örnek bir toplam kuralım: Toronto’da devlet lisesi +
                homestay seçen bir öğrenci için harç (17.000) + sigorta
                (500) + başvuru (400) + eğitim izni (150) + homestay
                (yıllık yaklaşık 12.000-15.000) ile bir yıl kabaca
                30.000-33.000 CAD tutar; uçak bileti ve kişisel
                harcamalar hariçtir.
              </p>
            </section>

            <section id="konaklama">
              <h2>Konaklama: homestay ve yatılı okul</h2>
              <p>
                Gündüzlü okula giden öğrencinin konaklaması genelde
                homestay’dir: öğrenci, denetlenmiş bir Kanadalı ailenin
                yanında özel odada kalır; yemek ve günlük destek
                genelde ücrete dahildir. Devlet kurulları homestay’i
                kendi programı veya resmî partnerleri üzerinden
                düzenler; bazı kurullar aile listesi verir, seçimi
                aileye bırakır.
              </p>
              <ul>
                <li>
                  <strong>Toronto / Vancouver:</strong> ayda yaklaşık
                  1.200-1.500 CAD.
                </li>
                <li>
                  <strong>Daha küçük şehirler:</strong> ayda yaklaşık
                  900-1.100 CAD.
                </li>
                <li>
                  <strong>Örnek (Langley, BC):</strong> ayda 1.200 CAD +
                  bir kez 350 CAD yerleştirme ücreti.
                </li>
              </ul>
              <p>
                Yatılı okulda konaklama kampüs yurdundadır; yemek,
                gözetim ve hafta sonu programı ücrete dahildir, homestay
                gerekmez. Hangi modelin uygun olduğu; öğrencinin yaşına,
                bağımsızlığına ve ailenin bütçesine göre değişir.
                Homestay’de oda, yemek düzeni ve ev kurallarının
                başlamadan önce yazılı olarak netleşmesi, uyumu
                kolaylaştırır.
              </p>
            </section>

            <section id="maddi">
              <h2>Maddi yeterlilik</h2>
              <p>
                Eğitim izni başvurusunda, ailenin ilk yılın harcı ile
                yaşam giderlerini karşılayabildiği belgelenir. IRCC’nin
                yaşam gideri ölçütü, Quebec dışında tek kişi için
                1 Eylül 2026 sonrası başvurularda{' '}
                <strong>yıllık 23.448 CAD</strong>’dir. Bu tutar yaşam
                giderleri içindir; okul harcı ve ulaşım bunun üzerine
                eklenir.
              </p>
              <p>
                Mali kanıt; banka hesap dökümleri (genelde son ayları
                kapsayan), gelir kaynağını gösteren belgeler ve varsa
                burs veya sponsorluk yazılarıyla sunulur. Rakamların
                kaynağının açık olması, toplam tutar kadar önemlidir:
                memur, paranın gerçekten eğitim için kullanılabilir
                olduğunu görmek ister. Güncel eşikler değişebileceği
                için başvuru öncesi IRCC’nin mali destek sayfasını
                kontrol edin.
              </p>
            </section>

            <section id="dil-esl">
              <h2>Dil şartı ve ESL desteği</h2>
              <p>
                Devlet liselerine girişte IELTS veya TOEFL şartı
                yoktur. Kabul kararı; transkript ve tavsiye mektubuna
                göre verilir, kabulden sonra çevrimiçi İngilizce ve
                matematik seviye tespiti yapılır ve öğrenci uygun
                sınıfa yerleştirilir. Özel okullarda tablo değişir:
                seçkin yatılı okullar SSAT ve/veya IELTS, TOEFL
                Junior, Duolingo ya da iTEP gibi sınavlar isteyebilir;
                orta segment okullar kendi seviye tespitini uygular.
              </p>
              <p>
                Ontario’da ESL (English as a Second Language) kredili
                derslerdir ve 5 düzeyden oluşur (ESLAO’dan ESLEO’ya).
                Öğrenci, seviyesi ilerledikçe normal İngilizce
                derslerine geçer; en fazla 3 ESL kredisi, diploma için
                gereken İngilizce kredilerinden sayılabilir. Tüm
                öğrenciler eyalet okuryazarlık şartını (genelde OSSLT)
                da yerine getirir.
              </p>
              <p>
                Bir planlama notu: İngilizce lisede 4 yıldan az okuyan
                öğrenciden, üniversiteye başvururken genelde IELTS veya
                TOEFL istenir. Liseyi Kanada’da daha uzun süre okumak,
                üniversite aşamasında dil belgesi yükünü hafifletebilir;
                bu, üniversitenin kendi kuralına bağlıdır.
              </p>
            </section>

            <section id="ebeveyn">
              <h2>Ebeveynler Kanada’da kalabilir mi?</h2>
              <p>
                Kanada’da lise öğrencisinin ebeveyni için özel bir
                “refakatçi vizesi” kategorisi yoktur. Çocuğuyla
                Kanada’da yaşamak isteyen ebeveyn, kendi adına ayrıca
                ziyaretçi vizesi (visitor visa) başvurusu yapar;
                başvuru, çocuğun eğitim izninden ayrı değerlendirilir.
              </p>
              <ul>
                <li>
                  Ziyaretçi vizesi <strong>çalışma hakkı vermez</strong>;
                  çalışmak isteyen ebeveynin ayrıca çalışma izni
                  alması gerekir.
                </li>
                <li>
                  Ebeveynin Kanada’da olması, çocuğun eğitim izni
                  ihtiyacını ortadan kaldırmaz.
                </li>
                <li>
                  Çocuk tüm öğrenim süresi boyunca en az bir
                  ebeveyniyle birlikteyse vasilik beyanı gerekmez;
                  tek ebeveynle seyahatte, gelmeyen ebeveynin noterli
                  muvafakatnamesi istenebilir.
                </li>
              </ul>
            </section>

            <section id="mezuniyet">
              <h2>Mezuniyet ve sonrası</h2>
              <h3>Kanada lise diploması</h3>
              <ul>
                <li>
                  <strong>Ontario (OSSD):</strong> 30 kredi + eyalet
                  okuryazarlık şartı (OSSLT) + 40 saat toplum hizmeti.
                </li>
                <li>
                  <strong>British Columbia (Dogwood):</strong> 10-12.
                  sınıflarda toplam 80 kredi.
                </li>
              </ul>
              <p>
                Türkiye’den gelen öğrencinin önceki dersleri kredi
                denklik değerlendirmesinden geçer; öğrenci genelde 9.
                sınıftan başlamak zorunda kalmaz. Ancak 11. veya 12.
                sınıfta gelen öğrencinin diplomayı tamamlaması, dil
                seviyesine göre ek bir dönem gerektirebilir; geç gelen
                öğrenci için en az 2 yıl planlamak gerçekçidir.
              </p>
              <h3>Üniversiteye geçiş</h3>
              <p>
                Ontario üniversitelerine başvuru OUAC üzerinden,
                kolej başvuruları OCAS üzerinden yapılır; BC’de
                EducationPlannerBC kullanılır. Kanada diplomasıyla
                başvurmak, Türkiye diplomasının denklik ve çeviri
                sürecini ortadan kaldırır; rehberlik servisleri
                başvuruda destek verir. Bunlar avantajdır, garanti
                değildir: kabul; not ortalamasına ve program
                kontenjanına bağlıdır. Üniversiteye geçişte eğitim
                izni yenilenir ve o aşamada PAL şartı devreye girer.
              </p>
              <h3>Çalışma izni beklentisini doğru kurun</h3>
              <p>
                Lise diploması, mezuniyet sonrası çalışma izni (PGWP)
                vermez; PGWP yalnızca post-secondary düzeyde, en az 8
                aylık uygun bir programı bitirenler içindir. Lise
                öğrencisi kampüs dışında da çalışamaz. Lise eğitiminin
                karşılığı; diploma, güçlü İngilizce ve üniversiteye
                Kanada mezunu olarak başvurmaktır — çalışma planı,
                üniversite/kolej sonrasına kurulmalıdır.
              </p>
            </section>

            <section id="takvim">
              <h2>Başvuru takvimi ve adımlar</h2>
              <p>
                Eylül girişi için hazırlığa bir önceki sonbaharda
                başlamak en rahat plandır. Özel okullarda son başvurular
                genelde 1 Kasım-1 Aralık arasındadır; devlet kurullarında
                Eylül girişi için son başvuru ilkbahara (örneğin TDSB’de
                1 Mayıs), Şubat girişi için 1 Kasım’a kadar uzanır —
                kuruldan kurula değiştiği için hedef kurulun takvimini
                baştan kontrol edin.
              </p>
              <ol>
                <li>
                  <strong>Eyalet ve okul türüne karar verin:</strong>{' '}
                  devlet kurulu mu, özel gündüzlü mü, yatılı mı? Bütçe
                  ve diploma (OSSD/Dogwood) hedefini birlikte koyun.
                </li>
                <li>
                  <strong>Okula başvurun:</strong> transkript (onaylı ve
                  İngilizce çevirili), tavsiye mektubu, pasaport kopyası
                  ve aşı kaydı ile.
                </li>
                <li>
                  <strong>Kabul mektubunu alın:</strong> şartlı kabulün
                  ardından harç ödemesi ve vasilik belgeleriyle resmî
                  kabul mektubu düzenlenir.
                </li>
                <li>
                  <strong>Vasiyi düzenleyin:</strong> IMM 5646’nın iki
                  noter onayı (Kanada + Türkiye) için 2-4 hafta ayırın.
                </li>
                <li>
                  <strong>Eğitim iznine başvurun:</strong> kabul mektubu,
                  mali kanıt, vasilik beyanı ve niyet mektubuyla IRCC’ye
                  çevrimiçi başvuru yapın. Kasım 2026 itibarıyla
                  derleyici siteler Türkiye için yaklaşık 6-7 hafta
                  işlem süresi gösteriyor; süreler haftalık değişir ve
                  garanti değildir — güncel süreyi IRCC’nin resmî
                  aracından kontrol edin ve son dakikaya bırakmayın.
                </li>
                <li>
                  <strong>Varış ve kayıt:</strong> okul başlamadan 1-2
                  hafta önce varın; pasaport, eğitim izni ve aşı
                  kaydıyla okula kaydınızı tamamlayıp seviye tespitine
                  girin. Ontario’da aşı kaydı (İngilizce çevirili)
                  okula kayıt için zorunludur.
                </li>
              </ol>
              <h3>Belge kontrol listesi</h3>
              <ul className="guide-checklist">
                <li>Öğrencinin geçerli pasaportu hazır.</li>
                <li>Son 2 yılın transkripti onaylı ve İngilizceye çevrildi.</li>
                <li>Öğretmen veya müdür tavsiye mektubu alındı.</li>
                <li>Aşı kaydı İngilizceye çevrildi.</li>
                <li>Okuldan resmî kabul mektubu geldi.</li>
                <li>17 yaş altı için IMM 5646 vasilik beyanı iki ülkede noter onayından geçti.</li>
                <li>Mali kanıt hazır: ilk yıl harcı + 23.448 CAD yaşam gideri + ulaşım.</li>
                <li>PAL yerine muafiyet kanıtı (lise kabul mektubu) başvuruya eklendi.</li>
                <li>Eğitim izni başvurusu, okul başlangıcından aylar önce gönderildi.</li>
              </ul>
              <div className="guide-assessment">
                <h2>Çocuğunuz için uygun yolu birlikte netleştirin</h2>
                <p>
                  Hedefiniz ve mevcut durumunuz hakkında temel bilgileri
                  paylaşın. Formunuz incelendikten sonra ilgili rehberler
                  ve ihtiyaç halinde yararlanabileceğiniz profesyonel
                  destek seçenekleri hakkında bilgi alabilirsiniz.
                </p>
                <Link href="/on-degerlendirme">
                  Ön değerlendirme formunu doldurun
                </Link>
              </div>
            </section>

            <section id="hatalar">
              <h2>Sık yapılan hatalar</h2>
              <h3>Lise diplomasının çalışma izni verdiğini sanmak</h3>
              <p>
                PGWP, lise mezunlarına verilmez ve lise öğrencisi
                kampüs dışında çalışamaz. Bütçeyi “öğrenci çalışarak
                karşılar” varsayımıyla kurmak, en pahalı planlama
                hatasıdır.
              </p>
              <h3>PAL’i yanlış anlamak</h3>
              <p>
                Lise için PAL gerekmez; ancak bu muafiyet üniversiteye
                geçişte sona erer. İki aşamayı birbirine karıştırmak,
                gereksiz belge peşinde koşmaya veya ikinci aşamada
                hazırlıksız yakalanmaya yol açar.
              </p>
              <h3>Vasilik belgesini son ana bırakmak</h3>
              <p>
                IMM 5646, iki ayrı ülkede noter onayı ister. Kabul
                mektubu gelir gelmez başlatılmazsa eğitim izni
                başvurusu gecikir.
              </p>
              <h3>Geç başvuru</h3>
              <p>
                Okul kabulü, vasilik ve eğitim izni zinciri aylar
                sürebilir. Eylül girişi hedefleniyorsa sonbaharda
                başlamak gerekir; kontenjanı dolan okul ve kurulda
                bekleme listesi uzar.
              </p>
              <h3>Ücreti yalnızca harç sanmak</h3>
              <p>
                Yatılı okulda kayıt ücreti, üniforma, sigorta ve uçak
                bileti; gündüzlüde homestay ve yerleştirme ücretleri
                ayrıca hesaplanmalıdır. Toplamı görmeden karar vermek,
                bütçeyi zorlar.
              </p>
              <h3>“Kabul ve vize garantisi” vaadine inanmak</h3>
              <p>
                Kimse okul kabulü veya vize garantisi veremez. Eğitim
                acenteleri okul başvurusunda yardımcı olabilir, ancak
                ücretli göçmenlik danışmanlığını yalnızca lisanslı
                kişiler (RCIC, avukat, Quebec noteri) verebilir;
                danışmanın lisansını College of Immigration and
                Citizenship Consultants’ın açık sicilinden doğrulayın.
              </p>
              <h3>Okulu ve kabul mektubunu doğrulamamak</h3>
              <p>
                Kabul mektubunun okuldan doğrudan geldiğini ve özel
                okulun eyalet bakanlığının denetiminde olduğunu teyit
                edin. Harcı okulun resmî ödeme kanalıyla ödeyin ve
                iade politikasını yazılı alın.
              </p>
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
                    'Kanada Öğrenci Vizesi ve Eğitim İzni',
                    'Eğitim izninin genel çerçevesi: kabul, PAL/TAL, mali yeterlilik ve çalışma koşulları.',
                    '/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni',
                  ],
                  [
                    'İngilizce Bilmeden Kanada’ya Gelmek',
                    'Dil şartının yola göre nasıl değiştiği ve dil okuluyla başlayan gerçekçi plan.',
                    '/rehberler/ingilizce-bilmeden-kanadaya-gitmek',
                  ],
                  [
                    'Kanada’ya Gitmenin Yasal Yolları',
                    'Ziyaret, eğitim, çalışma ve kalıcı oturum yollarının karşılaştırması.',
                    '/rehberler/kanadaya-gitmenin-yasal-yollari',
                  ],
                  [
                    'Kanada Ziyaretçi Vizesi',
                    'Ebeveynin ziyaretçi vizesi için şartlar, belgeler ve değerlendirme ölçütleri.',
                    '/kanada-vizesi/kanada-ziyaretci-vizesi',
                  ],
                  [
                    'Kanada’da İlk 90 Gün',
                    'Kanada’ya vardıktan sonra SIN, sağlık kartı, banka ve okul işlemlerinin sırası.',
                    '/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun',
                  ],
                  [
                    'Kanada Kalıcı Oturum ve Express Entry',
                    'Üniversite sonrası kalıcı oturum yollarının genel karşılaştırması.',
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
