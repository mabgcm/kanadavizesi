import data from './arrival-article.json';
import { arrivalTitle } from './content';
export { arrivalPath, arrivalTitle, arrivalDescription } from './content';
// Editorial dates, never replaced with the build/request date.
export const arrivalDates = { published: '2026-09-20', modified: '2026-09-20' };
export const arrivalIntro = [
  'Kanada’ya varmak uzun bir sürecin sonu değil, yeni hayatınızın başlangıcıdır. İlk haftalarda göçmenlik belgeleri, SIN, sağlık sigortası, banka hesabı, telefon, konut ve iş gibi birçok konu aynı anda önünüze gelebilir.',
  'Bu rehber, işlemleri önem ve zaman sırasına koyar. İlk 48 saatte yapılacaklardan 90. günün sonunda kurmuş olmanız gereken düzene kadar ilerleyebilir, yalnızca statünüze uygun görevleri seçebilirsiniz.',
];
export const arrivalReadingMinutes = Math.ceil(
  [
    arrivalTitle,
    ...arrivalIntro,
    ...data.sections.flatMap((s) => [
      s.title,
      ...s.blocks.flatMap((b) => [
        b.text || '',
        ...('items' in b ? b.items || [] : []),
        ...('rows' in b ? b.rows || [] : []).flat(),
      ]),
    ]),
    ...data.faqs.flatMap((f) => [f.question, f.answer]),
    ...data.checklist.flatMap((g) => [g.title, ...g.items]),
  ]
    .join(' ')
    .split(/\s+/).length / 200,
);
export const arrivalToc = [
  ['hazirlik', 'Gelmeden önce hazırlık'],
  ['ilk-48-saat', 'İlk 48 saat'],
  ['ilk-2-hafta', 'İlk 2 hafta'],
  ['ilk-30-gun', '15–30. günler'],
  ['gun-31-60', '31–60. günler'],
  ['gun-61-90', '61–90. günler'],
  ['statuye-gore', 'Statüye göre görevler'],
  ['hatalar', 'Yapılmaması gereken hatalar'],
  ['kontrol-listesi', '90 günlük kontrol listesi'],
  ['sss', 'Sık sorulan sorular'],
] as const;
export const arrivalPeriods = [
  {
    id: 'ilk-48-saat',
    title: 'İlk 48 saat',
    priority: 'Güvenlik ve belgeler',
    summary: 'Giriş belgelerini kontrol edin, geçici adres ve iletişimi kurun',
    count: 5,
  },
  {
    id: 'ilk-2-hafta',
    title: 'İlk 2 hafta',
    priority: 'Temel kayıtlar',
    summary:
      'SIN, sağlık başvurusu ve banka hesabını durumunuza göre tamamlayın',
    count: 6,
  },
  {
    id: 'ilk-30-gun',
    title: 'İlk 30 gün',
    priority: 'Düzen kurma',
    summary: 'Kalıcı konut, okul, ulaşım ve iş hazırlığını ilerletin',
    count: 5,
  },
  {
    id: 'gun-31-60',
    title: '31–90 gün',
    priority: 'İstikrar',
    summary: 'Kariyer, vergi kayıtları, kredi geçmişi ve sosyal ağı geliştirin',
    count: 10,
  },
];
