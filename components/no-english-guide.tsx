import Link from 'next/link';
import { GuideMobileToc } from './guide-mobile-toc';
import { GuideFaq } from './guide-faq';
import { JsonLd } from './json-ld';
import { noEnglish, SITE_URL } from '@/lib/content';
import { publisher, SOCIAL_IMAGE } from '@/lib/seo';

const base =
  'https://www.canada.ca/en/immigration-refugees-citizenship/services/';

const sources = [
  [
    'Kanada ziyaretçi vizesi',
    `${base}visit-canada/visitor-visa.html`,
  ],
  [
    'Kanada’da eğitim (IRCC)',
    `${base}study-canada.html`,
  ],
  [
    'Eğitim izni başvurusu',
    `${base}study-canada/study-permit.html`,
  ],
  [
    'Mezuniyet sonrası çalışma izni (PGWP) koşulları',
    `${base}study-canada/work/after-graduation/eligibility.html`,
  ],
  [
    'Express Entry',
    `${base}immigrate-canada/express-entry.html`,
  ],
  [
    'Atlantik Göçmenlik Programı',
    `${base}immigrate-canada/atlantic-immigration.html`,
  ],
  [
    'IRCC ücret listesi',
    'https://www.ircc.canada.ca/english/information/fees/fees.asp',
  ],
] as const;

const contents = [
  ['kisa-cevap', 'Kısa cevap: İngilizcesiz gelinir mi?'],
  ['dil-tablosu', 'Hangi yolda dil şartı var?'],
  ['dil-okulu', 'Dil okulu yolu adım adım'],
  ['kanadada-ingilizce', 'İngilizceyi Kanada’da öğrenmek'],
  ['calisma-izni', 'Çalışma izniyle gelmek'],
  ['kalici-oturum', 'Kalıcı oturumda dil barajları'],
  ['gunluk-hayat', 'Kanada’da İngilizcesiz günlük hayat'],
  ['hatalar', 'Sık yapılan hatalar'],
  ['kontrol-listesi', 'Gerçekçi plan: kontrol listesi'],
  ['sss', 'Sık sorulan sorular'],
  ['kaynaklar', 'Resmî kaynaklar'],
] as const;

const faqs = [
  {
    question: 'İngilizce bilmeden Kanada’ya turist olarak gidebilir miyim?',
    answer:
      'Evet. Ziyaretçi vizesi için dil şartı yoktur; memur dil seviyenize değil, geri döneceğinize, maddi durumunuza ve seyahat amacınıza bakar. Turist olarak gelmek, İngilizce öğrenmek için de bir başlangıç olabilir.',
  },
  {
    question: 'Dil okulu için eğitim izni gerekir mi?',
    answer:
      'Program 6 aydan kısaysa eğitim izni gerekmez; ziyaretçi statüsüyle okuyabilirsiniz. Program 6 aydan uzunsa eğitim izni gerekir ve çoğu başvuruda eyaletten alınan PAL (veya TAL) belgesi de istenir. Kabul aldığınız okul, PAL başvurusunu genellikle sizin için eyaletten ister.',
  },
  {
    question: 'Dil okulunu bitirince çalışma izni (PGWP) alabilir miyim?',
    answer:
      'Hayır. Yalnızca dil eğitimi (ESL/FSL) programları mezuniyet sonrası çalışma izni vermez. PGWP, ancak dil eğitiminden sonra başlayacağınız diploma veya derece programını bitirince gündeme gelir. Dil okulunu “çalışma iznine giden yol” diye satanlara inanmayın.',
  },
  {
    question: 'İngilizce öğrenmeden kalıcı oturum alabilir miyim?',
    answer:
      'Ekonomik göçmenlik programlarının neredeyse tamamı onaylı bir dil sınavı ister. En düşük barajlardan biri Atlantik Göçmenlik Programı’ndadır: TEER 0-3 mesleklerde CLB 5, TEER 4 mesleklerde CLB 4. Yani tamamen sıfır İngilizceyle kalıcı oturum almak gerçekçi değildir; ama az İngilizceyle başlayan yollar vardır.',
  },
  {
    question: 'Fransızca biliyorum, İngilizce yerine geçer mi?',
    answer:
      'Bazı programlarda evet. IRCC, İngilizce için CLB, Fransızca için NCLC seviyelerini kabul eder; Atlantik programı ve bazı eyalet akımlarında Fransızca da sayılır. Express Entry’de güçlü Fransızca, ek puan da getirir.',
  },
  {
    question: 'Kanada’da İngilizceyi ne kadar sürede öğrenirim?',
    answer:
      'Kişiden kişiye değişir; ancak dil okuluyla gelip her gün pratik yapan biri için IELTS 6.0-6.5 hedefi genellikle yaklaşık bir yıllık bir plan olarak kurulur. Hedefi, gideceğiniz kolej veya üniversitenin istediği seviyeye göre belirleyin.',
  },
] as const;

export function NoEnglishGuide() {
  const url = `${SITE_URL}${noEnglish.path}`;
  return (
    <main className="guide-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: noEnglish.seoTitle,
              description: noEnglish.description,
              mainEntityOfPage: url,
              inLanguage: 'tr-TR',
              author: publisher,
              publisher,
              image: SOCIAL_IMAGE.url,
              dateModified: noEnglish.reviewedAt,
              datePublished: noEnglish.publishedAt,
              isAccessibleForFree: true,
              publishingPrinciples: `${SITE_URL}/kaynak-politikasi`,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                ['Ana Sayfa', '/'],
                ['Rehberler', '/rehberler'],
                ['İngilizce Bilmeden Kanada’ya Gelmek', noEnglish.path],
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
          <span aria-current="page">
            İngilizce Bilmeden Kanada’ya Gelmek
          </span>
        </nav>
        <div className="guide-layout">
          <article>
            <p className="article-category">Kanada’ya Gitme Rehberi</p>
            <h1>{noEnglish.seoTitle}</h1>
            <span className="red-rule" />
            <p className="article-intro">
              İngilizce bilmemek, Kanada kapısını kapatmaz — hangi kapıdan
              gireceğinizi değiştirir. Ziyaretçi vizesinde dil şartı yoktur,
              dil okuluyla gelip İngilizceyi Kanada’da öğrenebilirsiniz;
              ancak kalıcı oturum yollarının neredeyse tamamı bir gün dil
              sınavı ister. Bu rehber, her yolun dil şartını net olarak
              gösterir ve İngilizcesiz başlayan biri için gerçekçi bir plan
              kurar.
            </p>
            <p>
              Bu sayfa genel bilgilendirme amaçlıdır; hukuki tavsiye değildir.
              Kişisel durumunuz için yetkili bir göçmenlik danışmanı veya
              avukattan değerlendirme alın. Kanada’ya geliş yollarının
              tamamını karşılaştırmak için{' '}
              <Link href="/rehberler/kanadaya-gitmenin-yasal-yollari">
                Kanada’ya gitmenin yasal yolları
              </Link>{' '}
              rehberine bakın.
            </p>
            <div className="article-meta">
              <span>
                İlk yayın:{' '}
                {new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(
                  new Date(`${noEnglish.publishedAt}T12:00:00Z`),
                )}
              </span>
              <span>
                Son güncelleme:{' '}
                {new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(
                  new Date(`${noEnglish.reviewedAt}T12:00:00Z`),
                )}
              </span>
              <span>Yaklaşık okuma: 9 dakika</span>
              <span>Yazar: KanadaVizesi.ca İçerik Ekibi</span>
            </div>

            <section className="guide-callout" id="kisa-cevap">
              <h2>Kısa cevap</h2>
              <p>
                <strong>
                  Evet, İngilizce bilmeden Kanada’ya gelebilirsiniz.
                </strong>{' '}
                Ziyaretçi vizesinde dil şartı yoktur ve dil okuluyla gelip
                İngilizceyi yerinde öğrenmek en yaygın yoldur. Ancak
                kalıcı oturum için dil sınavından kaçış yoktur: en düşük
                baraj bile dört beceride CLB 4-5 seviyesi ister. Doğru
                plan şudur: önce dil okuluyla gelin, İngilizceyi
                Kanada’da öğrenin, sonra kalıcı yollara o seviyeyle bakın.
              </p>
            </section>

            <section id="dil-tablosu">
              <h2>Hangi yolda dil şartı var?</h2>
              <p>
                Dil şartı, yola göre tamamen değişir. Aynı kişi, bir yolda
                hiç dil belgesi sunmadan gelebilirken başka bir yolda
                sınavsız başvuramaz. Önce kendi hedefinizi bulun:
              </p>
              <ul>
                <li>
                  <strong>Ziyaretçi vizesi:</strong> dil şartı yok. Memur
                  dil seviyenize değil, geri döneceğinize, maddi
                  durumunuza ve seyahat amacınıza bakar.
                </li>
                <li>
                  <strong>Dil okulu (6 aydan kısa):</strong> eğitim izni
                  bile gerekmez; ziyaretçi statüsüyle okuyabilirsiniz.
                </li>
                <li>
                  <strong>Dil okulu (6 aydan uzun):</strong> eğitim izni
                  gerekir; çoğu başvuruda PAL (veya TAL) belgesi de
                  istenir.
                </li>
                <li>
                  <strong>Kolej / üniversite:</strong> kabul için
                  İngilizce gerekir; genelde IELTS 6.0-6.5 bandı istenir.
                </li>
                <li>
                  <strong>Çalışma izni (işverene bağlı):</strong> resmî
                  bir dil barajı genelde yoktur; işverenin beklentisi ve
                  işin gereği belirler.
                </li>
                <li>
                  <strong>Express Entry (Federal Skilled Worker):</strong>{' '}
                  dört beceride en az CLB 7 gerekir.
                </li>
                <li>
                  <strong>Atlantik Göçmenlik Programı:</strong> TEER 0-3
                  mesleklerde CLB 5, TEER 4 mesleklerde CLB 4 gerekir.
                </li>
                <li>
                  <strong>Eyalet programları (PNP):</strong> akıma göre
                  değişir; bazı akımlarda CLB 4-5 yeterlidir.
                </li>
              </ul>
              <p>
                CLB (Canadian Language Benchmark), Kanada’nın dil
                seviyesi ölçüsüdür; 12 kademelidir ve dört beceriyi
                (okuma, yazma, dinleme, konuşma) ayrı ayrı ölçer. IELTS
                General Training, CELPIP-General ve PTE Core, İngilizce
                için kabul edilen sınavlardır.
              </p>
            </section>

            <section id="dil-okulu">
              <h2>Dil okulu yolu adım adım</h2>
              <p>
                İngilizcesiz başlayanlar için en gerçekçi yol, dil
                okuludur. Amaç yalnızca İngilizce öğrenmek değil,
                İngilizceyi öğrenirken Kanada’da bulunmak ve sonraki
                adıma hazırlanmaktır.
              </p>
              <h3>1. Okulu doğru seçin</h3>
              <p>
                Okulun, IRCC’nin Designated Learning Institution (DLI)
                listesinde olduğundan emin olun; listede olmayan bir okul
                eğitim iznine dayanak olamaz. Languages Canada üyesi
                okullar, kalite açısından iyi bir başlangıç noktasıdır.
                Fiyatlar okula, şehre ve süreye göre değişir; karar
                vermeden önce toplam maliyeti (okul ücreti + yaşam
                gideri) birlikte hesaplayın.
              </p>
              <h3>2. Süreye göre izin durumunu belirleyin</h3>
              <p>
                Program 6 aydan kısaysa eğitim izni gerekmez; ziyaretçi
                vizesiyle gelip okuyabilirsiniz. Program 6 aydan uzunsa
                eğitim izni almanız gerekir. Eğitim izni ücreti 150 CAD,
                biyometri ücreti 85 CAD’dir. Çoğu başvuruda eyaletten
                alınan PAL (veya TAL) belgesi de istenir; kabul
                aldığınız okul, bu belgeyi genellikle sizin için
                eyaletten ister.
              </p>
              <h3>3. Ön koşul (pathway) programına dikkat edin</h3>
              <p>
                Bazı okullar, dil eğitimini kolej veya üniversite
                kabulünün ön koşulu olarak sunar. Bu durumda eğitim
                izniniz, dil programının süresi + 90 gün olarak
                verilir ve bu izinle kampüs dışında çalışamazsınız.
                Dil programı bitince ana program için Kanada içinden
                yeni bir eğitim izni başvurusu yapmanız gerekir. Kabul
                mektubunuzda dil programının “ön koşul” olarak
                yazdığından emin olun; yalnızca “İngilizce şartı var”
                yazan mektup aynı işi görmez.
              </p>
              <h3>4. Hedefi baştan koyun: IELTS 6.0-6.5</h3>
              <p>
                Dil okuluna “bir süre gideyim, bakarız” diye değil, bir
                hedefle gidin. Kolej ve üniversitelerin çoğu, kabul için
                IELTS 6.0-6.5 bandını ister. Genellikle yaklaşık bir
                yıllık dil eğitimi, bu hedef için planlanır. Okul
                seçerken, IELTS hazırlık dersi verip vermediğini ve
                mezunlarının kabul oranını sorun.
              </p>
              <h3>5. En önemli tuzak: dil okulu PGWP vermez</h3>
              <p>
                Yalnızca dil eğitimi (ESL/FSL) programları, mezuniyet
                sonrası çalışma izni (PGWP) vermez. PGWP, ancak dil
                eğitiminden sonra başlayacağınız diploma veya derece
                programını bitirince gündeme gelir. “Dil okuluna gel,
                bitirince çalış” vaadi, bu kuralı bilmeyenleri
                yanıltır. Planınızı kurarken PGWP’yi dil okuluna değil,
                sonraki programa bağlayın.
              </p>
            </section>

            <section id="kanadada-ingilizce">
              <h2>İngilizceyi Kanada’da öğrenmek</h2>
              <p>
                Dil okulunun asıl gücü, İngilizceyi derslikte değil,
                hayatta öğrenmenizdir. Market, otobüs, banka, iş görüşmesi
                — her gün onlarca kez pratik yaparsınız. Bu yüzden
                Kanada’da bir ayda alınan yol, Türkiye’de kurstan alınan
                yoldan genelde daha hızlıdır.
              </p>
              <p>
                Öğrenmeyi hızlandırmak için: okulun konuşma kulüplerine
                katılın, ev arkadaşınızı İngilizce konuşan biriyle seçin,
                telefonunuzu ve sosyal medyanızı İngilizceye çevirin,
                her gün kısa bir günlük yazın. IELTS hazırlığına, dil
                okulunun son döneminde başlayın; sınav, okulun
                öğrettiğinden farklı bir format ister ve ayrıca
                çalışılması gerekir.
              </p>
              <p>
                Bir uyarı: yalnızca Türkçe konuşulan bir çevrede yaşarsanız
                dil okulu bile yavaş ilerler. Kanada’ya gelmek tek başına
                İngilizce öğretmez; İngilizce konuşulan ortamlara girmek
                öğretir.
              </p>
            </section>

            <section id="calisma-izni">
              <h2>Çalışma izniyle gelmek</h2>
              <p>
                İngilizce bilmeden çalışma izni almak da mümkündür, ama
                yol işverenden geçer. İşverene bağlı (employer-specific)
                çalışma izninde resmî bir dil barajı genelde yoktur;
                işverenin sizden beklediği dil seviyesi ve işin gereği
                belirleyicidir. İş teklifi ve duruma göre LMIA gerekir.
              </p>
              <p>
                Düşük dil barajlı kalıcı yollardan biri, Atlantik
                Göçmenlik Programı’dır: Atlantik eyaletlerindeki
                belirlenmiş bir işverenden iş teklifi alanlar için dil
                barajı TEER 0-3 mesleklerde CLB 5, TEER 4 mesleklerde
                CLB 4’tür. Test sonucunun başvuruda 2 yıldan eski
                olmaması gerekir. Eyalet programlarının bazı akımlarında
                da benzer düşük barajlar vardır; her akımın şartı
                ayrıdır, genellemek yanıltır.
              </p>
              <p>
                Çalışma izniyle ilgili ayrıntılar için{' '}
                <Link href="/kanadada-calisma/kanada-calisma-izni">
                  Kanada çalışma izni
                </Link>{' '}
                rehberine bakın.
              </p>
            </section>

            <section id="kalici-oturum">
              <h2>Kalıcı oturumda dil barajları</h2>
              <p>
                Kalıcı oturum, dilin en çok önemsendiği aşamadır.
                Ekonomik programların neredeyse tamamı, onaylı bir dil
                sınavı ister — sınavsız kalıcı oturum yolu, pratikte
                yoktur. Barajlar ise programa göre değişir:
              </p>
              <ul>
                <li>
                  <strong>Express Entry — Federal Skilled Worker:</strong>{' '}
                  dört beceride en az CLB 7. Ayrıca 100 üzerinden 67
                  seçim puanı gerekir; dil puanı bu hesabın büyük
                  bölümünü oluşturur.
                </li>
                <li>
                  <strong>Atlantik Göçmenlik Programı:</strong> CLB 5
                  (TEER 0-3) veya CLB 4 (TEER 4).
                </li>
                <li>
                  <strong>Eyalet programları:</strong> akıma göre CLB
                  4-5’ten CLB 7’ye kadar değişir.
                </li>
                <li>
                  <strong>Kanada Deneyim Sınıfı (CEC):</strong> Kanada’da
                  kazandığınız iş deneyimiyle başvurulur; dil barajı
                  mesleğin TEER seviyesine göre CLB 5 veya 7’dir.
                </li>
              </ul>
              <p>
                Fransızca biliyorsanız, bazı programlarda İngilizce
                yerine Fransızca (NCLC) sayılır ve Express Entry’de
                güçlü Fransızca ek puan getirir. İngilizcesi zayıf ama
                Fransızcası güçlü olanlar için bu, ayrıca
                değerlendirilmesi gereken bir yoldur.
              </p>
              <p>
                Kalıcı oturum yollarının karşılaştırması için{' '}
                <Link href="/kanada-gocmenlik/kalici-oturum-ve-express-entry">
                  kalıcı oturum ve Express Entry
                </Link>{' '}
                rehberine bakın.
              </p>
            </section>

            <section id="gunluk-hayat">
              <h2>Kanada’da İngilizcesiz günlük hayat</h2>
              <p>
                İlk aylar, sanılandan daha kolay geçer. Toronto gibi
                büyük şehirlerde Türkçe konuşan topluluk, Türk
                marketleri ve Türkçe hizmet veren işletmeler vardır;
                çeviri uygulamaları günlük işleri çözer. Ama bu kolaylık
                bir tuzaktır: yalnızca Türkçe çevrede kalırsanız dil
                öğrenmezsiniz ve iş bulmak, sağlık hizmeti almak, resmî
                işleri yürütmek giderek zorlaşır.
              </p>
              <p>
                Gerçekçi hedef şudur: ilk 3 ayda günlük hayatı
                çevirebilecek seviyeye gelin, ilk yılda iş görüşmesi
                yapabilecek seviyeye ulaşın. İngilizce, Kanada’da
                kalıcı olmanın değil, Kanada’da rahat yaşamanın
                şartıdır.
              </p>
            </section>

            <section id="hatalar">
              <h2>Sık yapılan hatalar</h2>
              <h3>“İngilizce gerekmez, vizen garanti” vaadine inanmak</h3>
              <p>
                Kimse vize garantisi veremez. Dil şartı olmayan yol
                vardır, ama vize kararı; geri dönüş bağlarınıza, maddi
                durumunuza ve dosyanızın tutarlılığına bakar. Garanti
                vaat edenlerden uzak durun.
              </p>
              <h3>Dil okulunu çalışma izni sanmak</h3>
              <p>
                Dil programı tek başına PGWP vermez. Okul ücreti
                ödeyip mezun olunca çalışma izni beklemek, en pahalı
                yanılgılardan biridir.
              </p>
              <h3>Hedefsiz dil okuluna gitmek</h3>
              <p>
                IELTS hedefi olmadan, “bir süre öğrenirim” diye gidilen
                dil okulu uzar ve pahalılaşır. Hedefi baştan koyun:
                hangi seviyeye, ne zamana kadar?
              </p>
              <h3>Yalnızca Türkçe çevrede yaşamak</h3>
              <p>
                Kanada’ya gelip her günü Türkçe geçirmek, dil
                öğrenmeyi durdurur. Okul dışındaki hayatınızı da
                İngilizce kurun.
              </p>
              <h3>Sahte kabul mektubu veya yanlış bilgi kullanmak</h3>
              <p>
                Yanlış beyan, 5 yıla kadar giriş yasağına yol açabilir.
                Kabul mektubunuzun ve belgelerinizin gerçek olduğundan
                emin olun; ret geçmişinizi saklamayın.
              </p>
              <h3>Lisanssız danışmana para vermek</h3>
              <p>
                Ücret karşılığı danışmanlık yalnızca lisanslı kişiler
                verebilir. Lisansı resmî kayıttan doğrulamadan ödeme
                yapmayın.
              </p>
            </section>

            <section id="kontrol-listesi">
              <h2>Gerçekçi plan: kontrol listesi</h2>
              <ul className="guide-checklist">
                <li>Hedefimi seçtim: ziyaret, dil okulu, çalışma veya kalıcı oturum.</li>
                <li>Yolumun dil şartını yukarıdaki tablodan kontrol ettim.</li>
                <li>Dil okulu seçeceksem okulun DLI listesinde olduğunu doğruladım.</li>
                <li>Program 6 aydan uzunsa eğitim izni + PAL/TAL sürecini hesaba kattım.</li>
                <li>IELTS hedefimi (genelde 6.0-6.5) ve zaman çizelgemi yazdım.</li>
                <li>Dil okulunun PGWP vermediğini biliyorum; PGWP planımı sonraki programa bağladım.</li>
                <li>Bütçemi hesapladım: okul ücreti + yaşam gideri + vize ve biyometri ücretleri.</li>
                <li>Kanada’da İngilizce konuşacağım ortamları (kulüp, iş, ev arkadaşı) planladım.</li>
                <li>Danışman kullanacaksam lisansını resmî kayıttan doğruladım.</li>
              </ul>
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
                    'Kanada Ziyaretçi Vizesi',
                    'Ziyaret amacı, belgeler ve değerlendirme ölçütleri.',
                    '/kanada-vizesi/kanada-ziyaretci-vizesi',
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
