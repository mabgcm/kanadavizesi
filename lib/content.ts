export const studyPermit = {
  path: '/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni',
  title: 'Kanada Öğrenci Vizesi ve Eğitim İzni: Başvuru Rehberi',
  seoTitle: 'Kanada Öğrenci Vizesi ve Eğitim İzni: Şartlar ve Başvuru',
  description:
    'Kanada öğrenci vizesi ve eğitim izni farkını, okul kabulünü, PAL/TAL, mali yeterlilik, çalışma ve mezuniyet sonrası koşulları öğrenin.',
  reviewedAt: '2026-09-21',
} as const;

export const arrivalPath = '/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun';
export const arrivalTitle =
  'Kanada’da İlk 90 Gün: Yeni Gelenler İçin Adım Adım Rehber';
export const arrivalDescription =
  'Kanada’ya geldikten sonra SIN, sağlık kartı, banka, ev, okul, ehliyet ve iş işlemlerini hangi sırayla yapacağınızı öğrenin.';

export type Article = {
  path: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  intro: string;
  pillar: string;
  parent: string | null;
  relatedArticles: string[];
  crossClusterLinks: string[];
  serviceCta: { label: string; href: string };
  breadcrumbs: { label: string; href: string }[];
  isPillar: boolean;
  contentStatus: 'starter' | 'complete';
};

type Cluster = {
  category: string;
  prefix: string;
  pillar: [string, string];
  cta: string;
  slugs: string[];
};
const clusters: Cluster[] = [
  {
    category: 'Kanada’ya Gitme Rehberi',
    prefix: 'rehberler',
    pillar: [
      'turkiyeden-kanadaya-nasil-gidilir',
      'Türkiye’den Kanada’ya Nasıl Gidilir? Kapsamlı Başlangıç Rehberi',
    ],
    cta: 'Kanada Planımı Değerlendirin',
    slugs: [
      'kanadaya-gitmenin-yasal-yollari',
      'kanadaya-gitmenin-en-kolay-yolu',
      'kanadaya-gitmek-icin-is-teklifi-gerekir-mi',
      'is-teklifi-olmadan-kanadaya-gitmek',
      'ingilizce-bilmeden-kanadaya-gitmek',
      'universite-mezunu-olmadan-kanadaya-gitmek',
      '40-yasindan-sonra-kanadaya-goc',
      '50-yasindan-sonra-kanadaya-gitmek',
      'bekarlar-icin-kanadaya-gitme-yollari',
      'ailece-kanadaya-gitmek',
      'kanadaya-gitmek-icin-ne-kadar-para-gerekir',
      'kanada-benim-icin-uygun-mu',
    ],
  },
  {
    category: 'Ziyaretçi Vizesi',
    prefix: 'kanada-vizesi',
    pillar: [
      'kanada-ziyaretci-vizesi',
      'Kanada Ziyaretçi Vizesi: Şartlar, Belgeler ve Başvuru Süreci',
    ],
    cta: 'Ziyaretçi Vizesi Ön Değerlendirmesi',
    slugs: [
      'turk-vatandaslari-kanadaya-vizesiz-gidebilir-mi',
      'kanada-eta-nedir',
      'gerekli-belgeler',
      'bankada-ne-kadar-para-olmali',
      'turkiyeye-baglar-nasil-gosterilir',
      'niyet-mektubu',
      'davet-mektubu',
      'calismayanlar-vize-alabilir-mi',
      'emekliler-icin-kanada-vizesi',
      'sirket-sahipleri-icin-kanada-vizesi',
      'seyahat-gecmisinin-onemi',
      'biyometri-islemleri',
      'kac-yillik-verilir',
      'kanadada-ne-kadar-kalinabilir',
      'turist-vizesiyle-calisilabilir-mi',
      'turist-vizesinden-calisma-iznine-gecis',
    ],
  },
  {
    category: 'Vize Reddi',
    prefix: 'kanada-vizesi',
    pillar: [
      'vize-reddi',
      'Kanada Vize Reddi: Nedenleri ve Ret Sonrası Yapılması Gerekenler',
    ],
    cta: 'Ret Dosyamı İnceletmek İstiyorum',
    slugs: [
      'ret-nedenleri',
      'ret-mektubu-nasil-okunur',
      'ret-sonrasi-yeniden-basvuru',
      'gcms-notlari',
      'mali-yetersizlik-reddi',
      'seyahat-amaci-reddi',
      'aile-baglari-nedeniyle-ret',
      'yanlis-beyan',
      'itiraz-mi-yeniden-basvuru-mu',
    ],
  },
  {
    category: 'Kanada’da Eğitim',
    prefix: 'kanadada-egitim',
    pillar: [
      'kanadada-egitim-rehberi',
      'Kanada’da Eğitim: Okul Seçiminden Eğitim İznine Kapsamlı Rehber',
    ],
    cta: 'Eğitim Planımı Değerlendirin',
    slugs: [
      'kanadada-egitim-almak-mantikli-mi',
      'ogrenci-vizesi-ve-egitim-izni',
      'dli-nedir',
      'okul-ve-program-secimi',
      'pgwp-nedir',
      'her-okul-calisma-izni-saglar-mi',
      'egitim-izni-icin-ne-kadar-para-gerekir',
      'egitim-niyet-mektubu',
      '35-yasindan-sonra-egitim',
      'ogrenciyken-calisma',
      'ogrenci-esinin-calisma-hakki',
      'cocuklu-aileler-icin-egitim',
      'okul-kabulu-vize-garantisi-mi',
      'mezuniyet-sonrasi-kanadada-kalmak',
    ],
  },
  {
    category: 'Kanada’da Çalışma',
    prefix: 'kanadada-calisma',
    pillar: [
      'turkiyeden-kanadada-is-bulmak',
      'Türkiye’den Kanada’da İş Bulmak ve Çalışma İzni Almak',
    ],
    cta: 'Kanada Kariyer Desteği Al',
    slugs: [
      'kanada-calisma-izni',
      'is-teklifi-calisma-izni-saglar-mi',
      'lmia-nedir',
      'acik-ve-isverene-bagli-calisma-izni',
      'turkiyeden-is-basvurusu-yapmak',
      'kanada-formati-cv',
      'linkedin-ile-is-bulmak',
      'canadian-experience-nedir',
      'turkiyedeki-deneyimi-kanadada-kullanmak',
      'kanadada-en-cok-aranan-meslekler',
      'duzenlemeye-tabi-meslekler',
      'sahte-is-teklifleri',
      'kanadada-ilk-is',
      'is-gorusmesi-ve-star-yontemi',
    ],
  },
  {
    category: 'Kalıcı Oturum ve Express Entry',
    prefix: 'kanada-gocmenlik',
    pillar: [
      'kalici-oturum-ve-express-entry',
      'Kanada Kalıcı Oturum Rehberi: Express Entry ve Alternatif Yollar',
    ],
    cta: 'Kalıcı Oturum Profil Analizi',
    slugs: [
      'express-entry-nedir',
      'crs-puani-nasil-hesaplanir',
      'crs-puani-nasil-yukseltilir',
      'express-entry-icin-is-teklifi',
      'ielts-mi-celpip-mi',
      'fransizcanin-avantajlari',
      'eca-egitim-denkligi',
      'turkiyedeki-is-deneyimi',
      '40-yasindan-sonra-express-entry',
      'eslerden-hangisi-ana-basvuru-sahibi',
      'eyalet-aday-programlari',
      'kucuk-sehir-ve-bolgesel-programlar',
      'kalici-oturum-icin-maddi-yeterlilik',
      'kalici-oturum-haklari',
    ],
  },
  {
    category: 'Kanada’da Yaşam',
    prefix: 'kanadada-yasam',
    pillar: [
      'kanadada-yasam-ve-ilk-90-gun',
      'Kanada’da Yaşam: Maliyetler, İş ve İlk 90 Gün',
    ],
    cta: 'Kanada Başlangıç Planımı Oluştur',
    slugs: [
      'kanadada-yasamak',
      'kanadada-yasam-maliyeti',
      'tek-kisi-icin-aylik-butce',
      'aileler-icin-aylik-butce',
      'kanada-sehirleri-karsilastirmasi',
      'toronto-disinda-yasanacak-sehirler',
      'ev-kiralamak',
      'kredi-gecmisi-olmadan-ev-kiralamak',
      'banka-hesabi-ve-kredi-gecmisi',
      'sin-numarasi',
      'saglik-sistemi',
      'cocuklarin-egitimi',
      'kres-ve-cocuk-bakimi',
      'brut-ve-net-maas',
      'ilk-7-gun',
      'ilk-30-gun',
      'kultur-soku-ve-yalnizlik',
    ],
  },
  {
    category: 'Kanada’ya Yerleşme Kararı',
    prefix: 'kanadada-yasam',
    pillar: [
      'kanadaya-yerlesmek-mantikli-mi',
      'Kanada’ya Yerleşmek Mantıklı mı? Avantajlar ve Zorluklar',
    ],
    cta: 'Kanada Başlangıç Planımı Oluştur',
    slugs: [
      'kanadada-yasamanin-avantajlari',
      'kanadada-yasamanin-zorluklari',
      'kanada-ve-turkiye-karsilastirmasi',
      'cocuklu-aileler-icin-kanada',
      'kanadada-is-yasam-dengesi',
      'kanadada-calisan-haklari',
      'kanadada-kis',
      'kimler-kanadaya-kolay-uyum-saglar',
      'kimler-icin-kanada-uygun-olmayabilir',
    ],
  },
  {
    category: 'Güven ve Dolandırıcılıktan Korunma',
    prefix: 'rehberler',
    pillar: [
      'kanada-gocmenlik-dolandiriciliklari',
      'Kanada Göçmenliğinde Yanlış Bilgiler ve Dolandırıcılıklar',
    ],
    cta: 'Başvuru Seçeneklerimi Değerlendirin',
    slugs: [
      'rcic-nedir',
      'rcic-lisansi-nasil-kontrol-edilir',
      'vize-acentasi-ve-gocmenlik-danismani-farki',
      'garantili-kanada-vizesi-vaatleri',
      'sahte-lmia-ve-is-teklifi',
      'kendim-mi-danismanla-mi-basvurmaliyim',
      'gocmenlik-danismani-secerken',
      'basvuruda-yanlis-bilginin-sorumlulugu',
    ],
  },
  {
    category: 'Sığınma ve Koruma Bilgilendirmesi',
    prefix: 'kanada-gocmenlik',
    pillar: [
      'siginma-ve-ekonomik-gocmenlik-farki',
      'Kanada’ya Sığınma ile Ekonomik Göçmenlik Arasındaki Fark',
    ],
    cta: 'Göçmenlik Seçeneklerimi Değerlendirin',
    slugs: [
      'ekonomik-zorluklar-siginma-gerekcesi-mi',
      'turist-vizesiyle-siginma-basvurusu',
      'siginma-hakkinda-yanlis-bilgiler',
      'sahte-siginma-hikayesinin-sonuclari',
    ],
  },
];

const words: Record<string, string> = {
  kanada: 'Kanada',
  kanadaya: 'Kanada’ya',
  kanadada: 'Kanada’da',
  turkiyeden: 'Türkiye’den',
  turkiyeye: 'Türkiye’ye',
  turkiyedeki: 'Türkiye’deki',
  nasil: 'Nasıl',
  icin: 'İçin',
  nedir: 'Nedir?',
  mi: 'mı?',
  mu: 'mu?',
  mı: 'mı?',
  is: 'İş',
  calisma: 'Çalışma',
  calismak: 'Çalışmak',
  egitim: 'Eğitim',
  ogrenci: 'Öğrenci',
  ogrenciyken: 'Öğrenciyken',
  vize: 'Vize',
  vizesi: 'Vizesi',
  goc: 'Göç',
  gocmenlik: 'Göçmenlik',
  siginma: 'Sığınma',
  yanlis: 'Yanlış',
  basvuru: 'Başvuru',
  basvurusu: 'Başvurusu',
  sonrasi: 'Sonrası',
  baglari: 'Bağları',
  maddi: 'Maddi',
  yeterlilik: 'Yeterlilik',
  yasam: 'Yaşam',
  yasamak: 'Yaşamak',
  yerlesmek: 'Yerleşmek',
  aileler: 'Aileler',
  cocuklu: 'Çocuklu',
  saglik: 'Sağlık',
  sehirleri: 'Şehirleri',
  karsilastirmasi: 'Karşılaştırması',
  kisin: 'Kışın',
  kultur: 'Kültür',
  yalnizlik: 'Yalnızlık',
  haklari: 'Hakları',
  avantajlari: 'Avantajları',
  zorluklari: 'Zorlukları',
  kolay: 'Kolay',
  uygun: 'Uygun',
  olmayabilir: 'Olmayabilir',
};
const fixes: Record<string, string> = {
  turk: 'Türk',
  vatandaslari: 'vatandaşları',
  vizesiz: 'vizesiz',
  gidebilir: 'gidebilir',
  gitmenin: 'gitmenin',
  yasal: 'yasal',
  yollari: 'yolları',
  teklifi: 'teklifi',
  gerekir: 'gerekir',
  olmadan: 'olmadan',
  ingilizce: 'İngilizce',
  bilmeden: 'bilmeden',
  universite: 'üniversite',
  mezunu: 'mezunu',
  sonra: 'sonra',
  bekarlar: 'bekârlar',
  ailece: 'ailece',
  gitmek: 'gitmek',
  ne: 'ne',
  kadar: 'kadar',
  para: 'para',
  gerekli: 'gerekli',
  belgeler: 'belgeler',
  bankada: 'bankada',
  olmali: 'olmalı',
  gosterilir: 'gösterilir',
  niyet: 'niyet',
  mektubu: 'mektubu',
  davet: 'davet',
  calismayanlar: 'çalışmayanlar',
  alabilir: 'alabilir',
  emekliler: 'emekliler',
  sirket: 'şirket',
  sahipleri: 'sahipleri',
  seyahat: 'seyahat',
  gecmisinin: 'geçmişinin',
  onemi: 'önemi',
  biyometri: 'biyometri',
  islemleri: 'işlemleri',
  kac: 'kaç',
  yillik: 'yıllık',
  verilir: 'verilir',
  kalinabilir: 'kalınabilir',
  turist: 'turist',
  vizesiyle: 'vizesiyle',
  calisilabilir: 'çalışılabilir',
  gecis: 'geçiş',
  reddi: 'reddi',
  nedenleri: 'nedenleri',
  ret: 'ret',
  okunur: 'okunur',
  yeniden: 'yeniden',
  gcms: 'GCMS',
  notlari: 'notları',
  mali: 'mali',
  yetersizlik: 'yetersizlik',
  amaci: 'amacı',
  aile: 'aile',
  nedeniyle: 'nedeniyle',
  beyan: 'beyan',
  itiraz: 'itiraz',
  almak: 'almak',
  mantikli: 'mantıklı',
  izni: 'izni',
  dli: 'DLI',
  okul: 'okul',
  program: 'program',
  secimi: 'seçimi',
  pgwp: 'PGWP',
  her: 'her',
  yasindan: 'yaşından',
  esinin: 'eşinin',
  hakki: 'hakkı',
  kabulu: 'kabulü',
  garantisi: 'garantisi',
  mezuniyet: 'mezuniyet',
  kalmak: 'kalmak',
  bulmak: 'bulmak',
  lmia: 'LMIA',
  acik: 'açık',
  isverene: 'işverene',
  bagli: 'bağlı',
  yapmak: 'yapmak',
  formati: 'formatı',
  ile: 'ile',
  deneyimi: 'deneyimi',
  kullanmak: 'kullanmak',
  meslekler: 'meslekler',
  duzenlemeye: 'düzenlemeye',
  tabi: 'tabi',
  sahte: 'sahte',
  teklifleri: 'teklifleri',
  ilk: 'ilk',
  gorusmesi: 'görüşmesi',
  yontemi: 'yöntemi',
  kalici: 'kalıcı',
  oturum: 'oturum',
  express: 'Express',
  entry: 'Entry',
  crs: 'CRS',
  puani: 'puanı',
  hesaplanir: 'hesaplanır',
  yukseltilir: 'yükseltilir',
  ielts: 'IELTS',
  celpip: 'CELPIP',
  fransizcanin: 'Fransızcanın',
  eca: 'ECA',
  denkligi: 'denkliği',
  eslerden: 'eşlerden',
  hangisi: 'hangisi',
  ana: 'ana',
  sahibi: 'sahibi',
  eyalet: 'eyalet',
  aday: 'aday',
  programlari: 'programları',
  kucuk: 'küçük',
  sehir: 'şehir',
  bolgesel: 'bölgesel',
  maliyetler: 'maliyetler',
  gun: 'gün',
  maliyeti: 'maliyeti',
  tek: 'tek',
  kisi: 'kişi',
  aylik: 'aylık',
  butce: 'bütçe',
  toronto: 'Toronto',
  disinda: 'dışında',
  yasanacak: 'yaşanacak',
  ev: 'ev',
  kiralamak: 'kiralamak',
  kredi: 'kredi',
  gecmisi: 'geçmişi',
  hesabi: 'hesabı',
  sin: 'SIN',
  numarasi: 'numarası',
  sistemi: 'sistemi',
  cocuklarin: 'çocukların',
  kres: 'kreş',
  cocuk: 'çocuk',
  bakimi: 'bakımı',
  brut: 'brüt',
  net: 'net',
  soku: 'şoku',
  ve: 've',
  yerlesmenin: 'yerleşmenin',
  avantajlar: 'avantajlar',
  calisan: 'çalışan',
  kis: 'kış',
  kimler: 'kimler',
  uyum: 'uyum',
  saglar: 'sağlar',
  acentasi: 'acentası',
  danismani: 'danışmanı',
  farki: 'farkı',
  garantili: 'garantili',
  vaatleri: 'vaatleri',
  kendim: 'kendim',
  danismanla: 'danışmanla',
  basvurmaliyim: 'başvurmalıyım',
  secerken: 'seçerken',
  bilginin: 'bilginin',
  sorumlulugu: 'sorumluluğu',
  ekonomik: 'ekonomik',
  zorluklar: 'zorluklar',
  gerekcesi: 'gerekçesi',
  hakkinda: 'hakkında',
  hikayesinin: 'hikâyesinin',
  sonuclari: 'sonuçları',
};
function titleize(slug: string) {
  return slug
    .split('-')
    .map((w, i) => {
      const v = words[w] || fixes[w] || w;
      return i === 0 ? v.charAt(0).toLocaleUpperCase('tr-TR') + v.slice(1) : v;
    })
    .join(' ');
}
const pillarPaths = clusters.map((c) => `/${c.prefix}/${c.pillar[0]}`);

export const articles: Article[] = clusters.flatMap((cluster, ci) => {
  const slugs = [cluster.pillar[0], ...cluster.slugs];
  const pillar = `/${cluster.prefix}/${cluster.pillar[0]}`;
  return slugs.map((slug, i) => {
    const path = `/${cluster.prefix}/${slug}`;
    const title =
      path === studyPermit.path
        ? studyPermit.title
        : path === arrivalPath
          ? arrivalTitle
          : i === 0
            ? cluster.pillar[1]
            : titleize(slug);
    return {
      path,
      slug,
      title,
      category: cluster.category,
      categorySlug: cluster.prefix,
      description:
        path === studyPermit.path
          ? studyPermit.description
          : path === arrivalPath
            ? arrivalDescription
            : `${title} hakkında güncel yaklaşımı, değerlendirme ölçütlerini, dikkat edilmesi gereken noktaları ve sonraki adımları öğrenin.`,
      intro: `${title} konusu, Kanada planı yapan kişilerin koşullarına ve hedeflerine göre farklı biçimde değerlendirilmelidir. Bu rehber; temel kavramları, yaygın yanlış anlamaları, hazırlanırken dikkat edilmesi gereken noktaları ve izlenebilecek sonraki adımları açık, dengeli ve genel bilgilendirme çerçevesinde ele alır.`,
      pillar,
      parent: i === 0 ? null : pillar,
      relatedArticles: [
        slugs[(i + 1) % slugs.length],
        slugs[(i + 2) % slugs.length],
      ].map((s) => `/${cluster.prefix}/${s}`),
      crossClusterLinks: [
        pillarPaths[(ci + 1) % pillarPaths.length],
        pillarPaths[(ci + 3) % pillarPaths.length],
      ],
      serviceCta: { label: cluster.cta, href: '/#degerlendirme' },
      breadcrumbs: [
        { label: 'Ana Sayfa', href: '/' },
        { label: cluster.category, href: '/rehberler' },
        { label: title, href: path },
      ],
      isPillar: i === 0,
      contentStatus:
        path === studyPermit.path ||
        path === arrivalPath ||
        path === '/kanada-vizesi/kanada-ziyaretci-vizesi' ||
        path === '/rehberler/turkiyeden-kanadaya-nasil-gidilir'
          ? 'complete'
          : 'starter',
    };
  });
});

export const articleMap = new Map(articles.map((a) => [a.path, a]));
export const contentClusters = clusters.map((c) => ({
  category: c.category,
  pillar: `/${c.prefix}/${c.pillar[0]}`,
  articles: articles.filter((a) => a.category === c.category),
}));
export const SITE_URL = 'https://www.kanadavizesi.ca';
export const TURKIYE_KANADA_GUIDE_DATES = {
  published: '2026-09-13',
  modified: '2026-09-13',
} as const;
