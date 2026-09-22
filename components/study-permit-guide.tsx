import Link from 'next/link';
import { CircleAlert } from 'lucide-react';
import { GuideFaq } from './guide-faq';
import { GuideMobileToc } from './guide-mobile-toc';
import { JsonLd } from './json-ld';
import { SITE_URL } from '@/lib/content';
import { publisher, SOCIAL_IMAGE } from '@/lib/seo';
import { studyPermit, studyPermitFaqs } from '@/lib/study-permit';

const contents = [
  ['vize-ve-izin', 'Vize ve eğitim izni farkı'],
  ['okul-ve-program', 'Okul ve program seçimi'],
  ['pal-tal-caq', 'PAL/TAL ve CAQ'],
  ['belgeler', 'Başvuru belgeleri'],
  ['butce', 'Bütçe ve mali yeterlilik'],
  ['basvuru-adimlari', 'Başvuru adımları'],
  ['ogrenciyken-calisma', 'Öğrenciyken çalışma'],
  ['pgwp', 'Mezuniyet sonrası PGWP'],
  ['aile', 'Eş ve çocuklar'],
  ['varis', 'Kanada’ya varış'],
  ['izin-kosullari', 'Eğitim sürerken izin koşulları'],
  ['kontrol-listesi', 'Başvuru kontrol listesi'],
  ['sss', 'Sık sorulan sorular'],
  ['kaynaklar', 'Resmî kaynaklar'],
] as const;

export function StudyPermitGuide() {
  const url = `${SITE_URL}${studyPermit.path}`;
  return (
    <main className="guide-page study-permit-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              inLanguage: 'tr-TR',
              headline: studyPermit.title,
              description: studyPermit.description,
              mainEntityOfPage: url,
              author: publisher,
              publisher,
              image: SOCIAL_IMAGE.url,
              isAccessibleForFree: true,
              publishingPrinciples: `${SITE_URL}/kaynak-politikasi`,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Ana Sayfa',
                  item: `${SITE_URL}/`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Kanada’da Eğitim',
                  item: `${SITE_URL}/kanadada-egitim/kanadada-egitim-rehberi`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: studyPermit.title,
                  item: url,
                },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: studyPermitFaqs.map(({ question, answer }) => ({
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
          <Link href="/kanadada-egitim/kanadada-egitim-rehberi">
            Kanada’da Eğitim
          </Link>
          {' > '}
          <span>Öğrenci Vizesi ve Eğitim İzni</span>
        </nav>
        <div className="guide-layout">
          <article>
            <p className="article-category">Kanada’da Eğitim</p>
            <h1>{studyPermit.title}</h1>
            <span className="red-rule" />
            <p className="article-intro">
              Kanada’da eğitim planlarken okuldan kabul almak, ülkeye seyahat
              edebilmek ve eğitim izni almak farklı aşamalardır. Bu rehber,
              Türkiye’den başvuru hazırlayanların okul seçimini, belgelerini ve
              bütçesini doğru sırayla değerlendirmesine yardımcı olur.
            </p>
            <p>
              Programınızın adından önce hangi izinlere ihtiyaç duyduğunuzu ve
              mezuniyet sonrası hedefinizle uyumunu kontrol edin. Okul kabulü,
              eğitim izni veya gelecekte çalışma hakkı garantisi değildir.
            </p>
            <div className="article-meta">
              <span>Yayın tarihi: 21 Eylül 2026</span>
              <span>Yazar: KanadaVizesi.ca İçerik Ekibi</span>
            </div>
            <section className="guide-callout">
              <h2>Kısa cevap</h2>
              <p>
                <strong>
                  Eğitim izni (study permit), Kanada’da belirli koşullarla
                  öğrenim görmenizi sağlayan belgedir; seyahat vizesi değildir.
                </strong>{' '}
                Kanada’ya ulaşmak için durumunuza göre ziyaretçi vizesi veya eTA
                da gerekebilir. Gerekli seyahat belgesi, eğitim izni başvurunuz
                onaylandığında süreç kapsamında düzenlenebilir. Hangi belgenin
                gerektiğini pasaportunuza ve durumunuza göre kontrol edin.{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: Eğitim izni
                </a>
              </p>
              <div className="guide-warning">
                <CircleAlert aria-hidden="true" />
                <p>
                  KanadaVizesi.ca bağımsız bir bilgi platformudur; Kanada
                  Hükümeti veya IRCC ile bağlantılı değildir. Bu rehber genel
                  bilgilendirme içindir. Başvuru koşulları ve kişisel uygunluk
                  ayrıca değerlendirilmelidir.
                </p>
              </div>
            </section>
            <section id="vize-ve-izin">
              <h2>Öğrenci vizesi ile eğitim izni arasındaki fark</h2>
              {/* Keyboard focus enables horizontal table scrolling. */}
              {/* oxlint-disable jsx-a11y/no-noninteractive-tabindex */}
              <section
                className="guide-table-wrap"
                aria-label="Belge"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Belge</th>
                      <th scope="col">Ne işe yarar?</th>
                      <th scope="col">Neyin yerine geçmez?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ziyaretçi vizesi / eTA</td>
                      <td>
                        Durumunuza göre Kanada’ya seyahat için gereken belge
                        veya elektronik yetkilendirmedir.
                      </td>
                      <td>
                        Eğitim izni değildir; tek başına giriş garantisi
                        sağlamaz.
                      </td>
                    </tr>
                    <tr>
                      <td>Eğitim izni</td>
                      <td>
                        Belgedeki ve mevzuattaki koşullara bağlı olarak
                        Kanada’da öğrenim görmenizi sağlar.
                      </td>
                      <td>Seyahat belgesi değildir.</td>
                    </tr>
                    <tr>
                      <td>Okul kabul mektubu (LOA)</td>
                      <td>Okulun sizi programa kabul ettiğini gösterir.</td>
                      <td>IRCC’nin izin kararı değildir.</td>
                    </tr>
                    <tr>
                      <td>Giriş onay mektubu</td>
                      <td>
                        Yurt dışından onaylanan başvurularda sınırda sunulacak
                        belgelerden biridir.
                      </td>
                      <td>Eğitim izninin kendisi değildir.</td>
                    </tr>
                  </tbody>
                </table>
              </section>
              {/* oxlint-enable jsx-a11y/no-noninteractive-tabindex */}
              <p>
                Günlük dilde “öğrenci vizesi” denildiğinde bu işlemler birlikte
                kastedilebilir. Başvuruda ise belgelerin adlarını ve işlevlerini
                ayırmak gerekir.{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: Eğitim izni
                </a>{' '}
                ·{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare-arrival.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kanada’ya varış
                </a>
              </p>
            </section>
            <section id="okul-ve-program">
              <h2>Okul ve program seçimini nasıl kontrol etmelisiniz?</h2>
              <p>
                Başvuracağınız okulun{' '}
                <strong>Designated Learning Institution (DLI)</strong> durumunu
                resmî listeden kontrol edin. Yükseköğretimde okulun adı, kampüsü
                ve programı üzerinde durun; yalnızca tanıtım broşürüne
                dayanmayın.
              </p>
              <ul>
                <li>
                  Kabul mektubundaki okul ve program bilgilerini resmî okul
                  kayıtlarıyla karşılaştırın.
                </li>
                <li>
                  Programın başlangıç tarihini, süresini, eğitim dilini ve kabul
                  koşullarını öğrenin.
                </li>
                <li>
                  Mezuniyet sonrası çalışma hedefiniz varsa okulun ve programın
                  PGWP uygunluğunu ayrıca kontrol edin.
                </li>
                <li>
                  Depozito ödemeden önce erteleme ve iade koşullarını okuldan
                  yazılı alın.
                </li>
              </ul>
              <p>
                <strong>
                  DLI listesinde bulunmak, okulun bütün programlarının PGWP’ye
                  uygun olduğu anlamına gelmez.
                </strong>{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: DLI listesi
                </a>
              </p>
              <p>
                İlgili rehber:{' '}
                <Link href="/kanadada-egitim/okul-ve-program-secimi">
                  Okul ve program seçimi
                </Link>
                .
              </p>
            </section>
            <section id="pal-tal-caq">
              <h2>PAL/TAL ve Quebec için CAQ</h2>
              <p>
                Birçok eğitim izni başvurusunda eyalet veya bölge onay yazısı
                olan <strong>PAL/TAL</strong> gerekir. Gerekliyse belgeyi
                başvuruyla birlikte sunmalı, edinme sürecini okulunuzla
                görüşmelisiniz.
              </p>
              <p>
                <strong>
                  1 Ocak 2026’dan itibaren kamuya ait bir DLI’da derece veren
                  yüksek lisans veya doktora programına başvuranlar PAL/TAL
                  istisnası kapsamındadır.
                </strong>{' '}
                Bu istisnayı bütün lisansüstü sertifika programlarına veya bütün
                özel okullara genellemeyin. İstisnayı destekleyen belge gerekir.
              </p>
              <p>
                Quebec’te eğitim için <strong>CAQ</strong> koşulları ayrıca
                değerlendirilir. PAL/TAL istisnası, CAQ’nun da otomatik olarak
                gereksiz olduğu anlamına gelmez. Güncel muafiyetleri ve gerekli
                CAQ belgesini kontrol edin.{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/provincial-attestation-letter.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: PAL/TAL ve istisnalar
                </a>
              </p>
            </section>
            <section id="belgeler">
              <h2>Başvuru dosyasında hangi belgeler bulunur?</h2>
              <p>
                Kişisel başvuru kontrol listeniz ve ülkeye özel talimatlar
                belirleyicidir. Aşağıdaki liste hazırlık içindir; herkes için
                aynı, eksiksiz evrak listesi değildir.
              </p>
              <ul>
                <li>Geçerli pasaport ve istenen kimlik belgeleri.</li>
                <li>
                  Okul kabul mektubu; uygulanıyorsa PAL/TAL veya istisna kanıtı
                  ve CAQ.
                </li>
                <li>
                  Eğitim ve yaşam giderlerini karşılayabileceğinizi gösteren
                  belgeler.
                </li>
                <li>
                  Eğitim amacınızı ve öğrenci olarak sorumluluklarınızı
                  açıklayan mektup.
                </li>
                <li>
                  İsteniyorsa sağlık muayenesi ve diğer destekleyici belgeler.
                </li>
                <li>
                  Çocuk başvurularında duruma göre velayet ve gözetim belgeleri.
                </li>
              </ul>
              <p>
                Dosyaları başvuru sisteminde doğru alana yükleyin. Kabul
                mektubuna ayrılan alana ilgisiz kişisel belgeler eklemeyin.
                Çeviri ve belge biçimi gerekliliklerini başvuru talimatlarından
                kontrol edin.{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: Gerekli belgeler
                </a>
              </p>
            </section>
            <section id="butce">
              <h2>Eğitim izni için ne kadar para gerekir?</h2>
              <p>
                Kanada’da çalışmaya güvenmeden okul ücretinizi, yaşam
                giderlerinizi ve ulaşım masraflarınızı karşılayabildiğinizi
                göstermeniz gerekir. Bir yıldan uzun programlarda sonraki
                yılları nasıl finanse edeceğinizi de açıklayın.
              </p>
              <p>
                <strong>
                  1 Eylül 2026 ve sonrası başvurularda, Quebec dışında yıllık
                  yaşam gideri için:
                </strong>
              </p>
              {/* Keyboard focus enables horizontal table scrolling. */}
              {/* oxlint-disable jsx-a11y/no-noninteractive-tabindex */}
              <section
                className="guide-table-wrap"
                aria-label="Öğrenci dahil kişi sayısı"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Öğrenci dahil kişi sayısı</th>
                      <th scope="col">Yıllık yaşam gideri eşiği</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1 kişi</td>
                      <td>23.448 CAD</td>
                    </tr>
                    <tr>
                      <td>2 kişi</td>
                      <td>29.192 CAD</td>
                    </tr>
                    <tr>
                      <td>3 kişi</td>
                      <td>35.888 CAD</td>
                    </tr>
                    <tr>
                      <td>4 kişi</td>
                      <td>43.572 CAD</td>
                    </tr>
                  </tbody>
                </table>
              </section>
              {/* oxlint-enable jsx-a11y/no-noninteractive-tabindex */}
              <p>
                <strong>
                  Bu tutarlara okul ücreti ve ulaşım dahil değildir.
                </strong>{' '}
                Quebec için ayrı kurallar vardır. Bunlar gerçek şehir bütçenizin
                yeterli olacağını garanti eden rakamlar değildir.
              </p>
              <p>
                Banka hareketleri, burs, eğitim kredisi veya sponsor desteği
                gibi belgelerle paranın kaynağını ve erişilebilirliğini
                açıklayın. Yalnızca toplam bakiyeyi gösteren bir ekran
                görüntüsüne güvenmeyin. Başvuru tarihinize uygun tabloyu resmî
                sayfadan yeniden kontrol edin.{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: Mali yeterlilik
                </a>
              </p>
              <p>
                İlgili rehber:{' '}
                <Link href="/kanadada-egitim/egitim-izni-icin-ne-kadar-para-gerekir">
                  Eğitim izni için ne kadar para gerekir?
                </Link>
                .
              </p>
            </section>
            <section id="basvuru-adimlari">
              <h2>Türkiye’den başvuruyu hangi sırayla hazırlamalısınız?</h2>
              <ol>
                <li>Okul, program ve kabul koşullarını doğrulayın.</li>
                <li>
                  Kabul mektubunuzu ve gerekiyorsa PAL/TAL ile CAQ belgelerinizi
                  hazırlayın.
                </li>
                <li>
                  Finansman ve eğitim amacı açıklamalarınızı belgelerle tutarlı
                  hale getirin.
                </li>
                <li>
                  IRCC’nin size uygun çevrim içi başvuru yolundan dosyanızı
                  gönderin.
                </li>
                <li>
                  İstenirse biyometri, sağlık muayenesi ve ek belge adımlarını
                  belirtilen sürede tamamlayın.
                </li>
                <li>Kararı ve seyahat öncesi talimatları takip edin.</li>
              </ol>
              <p>
                Genel kural, eğitim iznine Kanada’ya gelmeden önce başvurmaktır.
                Kanada içinden başvuru herkese açık bir seçenek değildir. İşlem
                süresini kesin bir sonuç tarihi gibi değerlendirmeyin; ücretleri
                ve süreleri başvuru anında resmî kanaldan kontrol edin.{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: Başvuru süreci
                </a>
              </p>
              <div className="guide-assessment">
                <h3>Eğitim planınızı netleştirin</h3>
                <p>
                  Okulunuz, programınız, bütçeniz ve hedef başlangıç tarihiniz
                  hakkında temel bilgileri paylaşarak ilgili rehberleri ve varsa
                  destek seçeneklerini öğrenin.
                </p>
                <p>
                  <Link href="/on-degerlendirme?konu=kanadada-egitim&amp;amp;source=study-permit-mid">
                    Eğitim ön değerlendirmesini başlat
                  </Link>
                </p>
                <p>Ön değerlendirme, kabul veya izin garantisi oluşturmaz.</p>
              </div>
            </section>
            <section id="ogrenciyken-calisma">
              <h2>Öğrenciyken çalışabilir misiniz?</h2>
              <p>
                Eğitim izni sahibi olmak tek başına herkes için çalışma hakkı
                oluşturmaz. Uygun öğrenciler, koşulları sağladıkları sürece
                normal akademik dönemde{' '}
                <strong>kampüs dışında haftada en fazla 24 saat</strong>{' '}
                çalışabilir. Birden fazla işte çalışılıyorsa toplam süre dikkate
                alınır.
              </p>
              <p>
                Okulun planlı tatillerinde farklı kurallar uygulanabilir; tatil
                olması tek başına yeterli değildir. Eğitiminiz başlamadan
                çalışmaya başlayamazsınız. Yalnızca İngilizce veya Fransızca dil
                eğitimi alan öğrenciler, bu öğrenci çalışma istisnasından
                yararlanamaz.
              </p>
              <p>
                İzin belgenizdeki ifadeleri, programınızı ve güncel koşulları
                kontrol edin. Çalışma gelirini başvuru bütçesindeki mali
                yeterlilik kanıtının yerine koymayın.{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: Kampüs dışında çalışma
                </a>
              </p>
              <p>
                İlgili rehber:{' '}
                <Link href="/kanadada-egitim/ogrenciyken-calisma">
                  Öğrenciyken çalışma
                </Link>
                .
              </p>
            </section>
            <section id="pgwp">
              <h2>Mezuniyet sonrası çalışma: PGWP otomatik değildir</h2>
              <p>
                <strong>Post-Graduation Work Permit (PGWP)</strong>, ayrı
                koşulları olan mezuniyet sonrası çalışma iznidir. Eğitim izni
                onayı PGWP garantisi değildir.
              </p>
              <p>
                Programın uygunluğu yanında öğrenim koşulları, başvuru zamanı ve
                program türüne göre dil veya eğitim alanı koşulları da
                değerlendirilir. Lisans, yüksek lisans ve doktora mezunları için
                eğitim alanı şartı aranmaz; diğer programlarda başvuru tarihine
                bağlı alan şartı bulunabilir. Dil şartı ayrıca kontrol
                edilmelidir.
              </p>
              <p>
                “Bu okuldan mezun olan herkes üç yıl çalışır” gibi genel
                vaatlerle karar vermeyin. Kendi programınızın güncel koşullarını
                kayıt öncesinde inceleyin. PGWP, kalıcı oturum garantisi de
                değildir.{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/eligibility.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: PGWP uygunluğu
                </a>
              </p>
              <p>
                İlgili rehber:{' '}
                <Link href="/kanadada-egitim/pgwp-nedir">PGWP nedir?</Link>.
              </p>
            </section>
            <section id="aile">
              <h2>Eş ve çocuklarla eğitim planı</h2>
              <p>
                Öğrenci olarak kabul edilmeniz, eşinize otomatik açık çalışma
                izni sağlamaz. Mevcut kurallarda en az 16 aylık yüksek lisans
                programları, doktora ve belirli mesleki veya uygun programlar
                kapsamında eş için uygunluk söz konusu olabilir. Geçerli izin ve
                diğer koşullar da aranır.
              </p>
              <p>
                Aile bütçesini eşin kesin çalışacağı varsayımıyla kurmayın.
                Çocukların okul, bakım, konaklama ve başvuru ihtiyaçlarını
                ayrıca planlayın.{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/help-your-spouse-common-law-partner-work-canada.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: Öğrenci eşinin çalışma izni
                </a>
              </p>
              <p>
                İlgili rehber:{' '}
                <Link href="/kanadada-egitim/ogrenci-esinin-calisma-hakki">
                  Öğrenci eşinin çalışma hakkı
                </Link>
                .
              </p>
            </section>
            <section id="varis">
              <h2>Onaydan sonra ve Kanada’ya varışta</h2>
              <p>
                Yurt dışından onay alan başvuruda verilen giriş mektubu eğitim
                izninin kendisi değildir. Varışta belgeleriniz incelenir;
                gerekli koşulları sağlıyorsanız izin düzenlenir. Seyahat
                belgesinin veya onay mektubunun bulunması ülkeye girişi garanti
                etmez.
              </p>
              <p>
                Pasaport, giriş mektubu, kabul ve finansman belgelerinizi
                erişilebilir tutun. Düzenlenen eğitim iznindeki adınızı, okul
                bilgilerini, geçerlilik tarihini ve koşulları kontrol edin.{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare-arrival.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: Varış hazırlığı
                </a>
              </p>
              <p>
                <Link href="/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun">
                  Kanada’da ilk 90 gün rehberi
                </Link>{' '}
                ile yerleşim adımlarınızı planlayın.
              </p>
            </section>
            <section id="izin-kosullari">
              <h2>Eğitiminiz sürerken dikkat etmeniz gerekenler</h2>
              <p>
                Kayıtlı olmak ve eğitiminizi aktif biçimde sürdürmek izin
                koşullarının parçasıdır. Eğitime ara verme, okul değiştirme veya
                programı bırakma kararları izin ve çalışma durumunuzu
                etkileyebilir.
              </p>
              <p>
                Özellikle yükseköğretimde başka bir okula geçişi yalnızca okul
                kaydı değişikliği olarak görmeyin. Geçiş öncesinde IRCC’nin izin
                ve okul değişikliği talimatlarını okuyun. Pasaportunuzun ve
                izninizin bitiş tarihini takip edin; uzatma gerekiyorsa son güne
                bırakmayın.{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/while-you-study.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRCC: Eğitim sürerken koşullar
                </a>
              </p>
            </section>
            <section id="kontrol-listesi">
              <h2>Başvuru öncesi kontrol listesi</h2>
              <ul>
                <li>
                  Okul ve program bilgilerini resmî kaynaktan kontrol ettim.
                </li>
                <li>
                  Okul kabulü ile eğitim izni kararının farklı olduğunu
                  biliyorum.
                </li>
                <li>
                  PAL/TAL, istisna ve gerekiyorsa CAQ koşullarını kontrol ettim.
                </li>
                <li>Okul, yaşam ve ulaşım giderlerini birlikte hesapladım.</li>
                <li>Finansman kaynağını belgelerle açıklayabiliyorum.</li>
                <li>Başvuru anlatımım ve belgelerim birbiriyle tutarlı.</li>
                <li>Çalışma ve PGWP hakkını otomatik kabul etmiyorum.</li>
                <li>
                  Aile bireylerinin ihtiyaçlarını ve izinlerini ayrıca
                  değerlendirdim.
                </li>
                <li>
                  Başvuru tarihimde güncel resmî talimatları tekrar kontrol
                  edeceğim.
                </li>
              </ul>
            </section>
            <section id="sss">
              <h2>Sık sorulan sorular</h2>
              <GuideFaq
                items={studyPermitFaqs.map(({ question, answer }) => ({
                  question,
                  answer: <p>{answer}</p>,
                }))}
                initiallyExpanded
              />
            </section>
            <section className="guide-assessment">
              <h2>Eğitim planınız için sonraki adım</h2>
              <p>
                Önce okulunuzu ve programınızı doğrulayın, ardından
                belgelerinizi ve finansman planınızı hazırlayın. Belirsiz kalan
                konuları başvurmadan önce netleştirin.
              </p>
              <p>
                <Link href="/on-degerlendirme?konu=kanadada-egitim&amp;amp;source=study-permit-bottom">
                  Eğitim ön değerlendirmesini başlat
                </Link>
              </p>
              <p>
                Bu form hukuki veya göçmenlik danışmanlığı ilişkisi kurmaz; okul
                kabulü, izin, çalışma veya kalıcı oturum garantisi vermez.
              </p>
            </section>
            <section>
              <h2>İlgili rehberler</h2>
              <div className="guide-related">
                <article>
                  <h3>
                    <Link href="/rehberler/turkiyeden-kanadaya-nasil-gidilir">
                      Türkiye’den Kanada’ya nasıl gidilir?
                    </Link>
                  </h3>
                </article>
                <article>
                  <h3>
                    <Link href="/kanadada-egitim/kanadada-egitim-rehberi">
                      Kanada’da eğitim rehberi
                    </Link>
                  </h3>
                </article>
                <article>
                  <h3>
                    <Link href="/kanadada-egitim/egitim-niyet-mektubu">
                      Eğitim niyet mektubu
                    </Link>
                  </h3>
                </article>
                <article>
                  <h3>
                    <Link href="/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun">
                      Kanada’da ilk 90 gün
                    </Link>
                  </h3>
                </article>
              </div>
            </section>
            <section id="kaynaklar" className="guide-sources">
              <h2>Resmî kaynaklar</h2>
              <p>
                Kaynaklar 21 Eylül 2026 tarihinde kontrol edilmiştir. Başvuru
                öncesinde güncel metinleri yeniden okuyun.
              </p>
              <ol>
                <li>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRCC — Eğitim izni
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRCC — DLI listesi
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/provincial-attestation-letter.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRCC — PAL/TAL ve istisnalar
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRCC — Gerekli belgeler
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRCC — Mali yeterlilik
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRCC — Başvuru süreci
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRCC — Kampüs dışında çalışma
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/eligibility.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRCC — PGWP uygunluğu
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare-arrival.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRCC — Kanada’ya varış
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/help-your-spouse-common-law-partner-work-canada.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRCC — Öğrenci eşinin çalışma izni
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/while-you-study.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRCC — Eğitim sürerken koşullar
                  </a>
                </li>
              </ol>
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
