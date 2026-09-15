import { publisher, SOCIAL_IMAGE } from '@/lib/seo';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import data from '@/lib/visitor-visa-article.json';
import { articleMap, SITE_URL } from '@/lib/content';
import {
  visitorVisaFacts as facts,
  visitorVisaPath,
  visitorVisaTitle,
  visitorVisaDescription,
} from '@/lib/visitor-visa';
import {
  VisitorChecklist,
  VisitorFaq,
  VisitorToc,
} from './visitor-visa-interactive';

const aliases: Record<string, string> = {
  '/kanada-vizesi/banka-hesabi-ne-kadar-olmali':
    '/kanada-vizesi/bankada-ne-kadar-para-olmali',
  '/kanada-vizesi/biyometri': '/kanada-vizesi/biyometri-islemleri',
  '/kanadada-calisma/calisma-izni': '/kanadada-calisma/kanada-calisma-izni',
  '/kanadada-egitim/egitim-izni':
    '/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni',
};
const translationUrl =
  'https://www.ircc.canada.ca/english/helpcentre/answer.asp?qnum=18';
function OfficialLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="visitor-official"
      href={href.includes('translate-documents.html') ? translationUrl : href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children} <ExternalLink size={15} aria-hidden="true" />
      <span className="visitor-source-label">Resmî kaynak</span>
      <span className="sr-only"> (yeni sekmede açılır)</span>
    </a>
  );
}
function InternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const target = aliases[href] || href;
  return articleMap.has(target) || target === '/kanada-vizesi' ? (
    <Link href={target}>{children}</Link>
  ) : null;
}
function Inline({ text }: { text: string }) {
  return (
    <>
      {text
        .replace(/`/g, '')
        .split(/(\*\*.*?\*\*)/g)
        .map((part, i) =>
          part.startsWith('**') ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
          ) : (
            part
          ),
        )}
    </>
  );
}
function FeeTable() {
  const rows = [
    ['Ziyaretçi vizesi — kişi başı', facts.visitorVisaFeeCad],
    [
      'Aynı anda başvuran uygun 5+ kişilik aile — üst sınır',
      facts.visitorVisaFamilyCapCad,
    ],
    ['Biyometri — kişi başı', facts.biometricsFeeCad],
    ['Uygun aile biyometri üst sınırı', facts.biometricsFamilyCapCad],
  ];
  return (
    <>
      <div className="visitor-table">
        <table>
          <caption>IRCC başvuru ücretleri (Kanada doları)</caption>
          <thead>
            <tr>
              <th scope="col">Ücret türü</th>
              <th scope="col">Tutar</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>CAN${value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="visitor-micro">
        Son kontrol: {date}. Başvuru merkezi hizmetleri, pasaport iletimi,
        fotoğraf, çeviri ve kurye gibi üçüncü taraf masrafları dahil değildir.
        Ücretler değişebilir; ödeme öncesi IRCC’den doğrulayın.
      </p>
    </>
  );
}
const date = new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(
  new Date(`${facts.reviewedAt}T12:00:00Z`),
);
type Block = {
  type: string;
  text?: string;
  href?: string;
  items?: string[];
  rows?: string[][];
};
function ContentBlock({ block }: { block: Block }) {
  const text = block.text || '';
  switch (block.type) {
    case 'h3':
      return <h3>{text}</h3>;
    case 'link':
      return block.href?.startsWith('https:') ? (
        <p>
          <OfficialLink href={block.href}>{text}</OfficialLink>
        </p>
      ) : (
        <p>
          <InternalLink href={block.href || ''}>{text}</InternalLink>
        </p>
      );
    case 'fees':
      return <FeeTable />;
    case 'ul':
      return (
        <ul className="visitor-bullet-list">
          {block.items?.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol
          className={
            block.items?.[0]?.includes('Seyahat amacını')
              ? 'visitor-stepper'
              : 'visitor-numbered-list'
          }
        >
          {block.items?.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </ol>
      );
    case 'callout':
      return (
        <div
          className={`guide-callout visitor-callout ${text.includes('Kırmızı uyarı') ? 'visitor-danger' : ''}`}
        >
          <p>
            <Inline text={text.replace('Kırmızı uyarı', 'Önemli uyarı')} />
          </p>
        </div>
      );
    case 'table':
      return (
        <div className="visitor-table">
          <table>
            <caption>Başvuruda değerlendirilen kanıtlar</caption>
            <thead>
              <tr>
                {block.rows?.[0].map((cell) => (
                  <th scope="col" key={cell}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows?.slice(1).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} data-label={block.rows?.[0][j]}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return (
        <p>
          <Inline text={text} />
        </p>
      );
  }
}
function AssessmentCTA({ bottom = false }: { bottom?: boolean }) {
  return (
    <section className="guide-assessment">
      <h2>
        {bottom
          ? 'Başvuru yolunuzu netleştirin'
          : 'Hangi belgelerin durumunuz için önemli olduğundan emin değil misiniz?'}
      </h2>
      <p>
        {bottom
          ? 'Genel rehberleri incelediniz ancak belgelerin kişisel durumunuza nasıl uygulanacağını bilmiyorsanız kısa ön değerlendirme formuyla hedefinizi ve mevcut koşullarınızı paylaşabilirsiniz.'
          : 'Seyahat amacınız, iş durumunuz, finansmanınız ve önceki başvurularınız hakkında temel bilgileri paylaşın. Formunuz incelendikten sonra ilgili rehberler ve ihtiyaç halinde profesyonel destek seçenekleri hakkında bilgi alabilirsiniz.'}
      </p>
      <Link
        href={`/on-degerlendirme?konu=ziyaretci-vizesi${bottom ? '&source=article-bottom' : ''}`}
      >
        {bottom
          ? 'Ön değerlendirmeyi başlat'
          : 'Ön değerlendirme formunu doldurun'}
      </Link>
      <p className="visitor-micro">
        {bottom
          ? 'Ön değerlendirme bir vize sonucu, uygunluk veya profesyonel temsil garantisi değildir. Ücretli bir hizmet sunulması halinde kapsam ve ücret ayrıca açıklanır.'
          : 'Formun gönderilmesi danışmanlık ilişkisi, uygunluk kararı veya sonuç garantisi oluşturmaz.'}
      </p>
      {bottom && (
        <p>
          <Link href="/rehberler/turkiyeden-kanadaya-nasil-gidilir">
            Türkiye’den Kanada’ya gitme yollarını karşılaştırın
          </Link>
        </p>
      )}
    </section>
  );
}
export function VisitorVisaGuide() {
  const canonical = SITE_URL + visitorVisaPath;
  const toc = [
    ...data.sections
      .filter((s) => s.id !== 'kaynaklar')
      .map(({ id, title }) => ({ id, title })),
    { id: 'kontrol', title: 'Başvuru öncesi son kontrol listesi' },
    { id: 'sss', title: 'Sık sorulan sorular' },
  ];
  const readTime = Math.ceil(
    [
      ...data.sections.flatMap((s) => [
        s.title,
        ...s.blocks.flatMap((b) => {
          const block: Block = b;
          return [
            block.text || '',
            ...(block.items || []),
            ...(block.rows || []).flat(),
          ];
        }),
      ]),
      ...data.faqs.flatMap((f) => [f.question, f.answer]),
      ...data.checklist,
    ]
      .join(' ')
      .split(/\s+/).length / 200,
  );
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: visitorVisaTitle,
        description: visitorVisaDescription,
        mainEntityOfPage: canonical,
        inLanguage: 'tr-TR',
        dateModified: facts.reviewedAt,
        ...(facts.publishedAt ? { datePublished: facts.publishedAt } : {}),
        author: publisher,
        publisher,
        image: SOCIAL_IMAGE.url,
        isAccessibleForFree: true,
        publishingPrinciples: `${SITE_URL}/kaynak-politikasi`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          ['Ana Sayfa', '/'],
          ['Kanada Vizesi', '/kanada-vizesi'],
          ['Kanada Ziyaretçi Vizesi', visitorVisaPath],
        ].map(([name, path], i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name,
          item: SITE_URL + path,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };
  return (
    <main className="guide-page visitor-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <div className="container guide-shell">
        <nav className="article-breadcrumb" aria-label="İçerik yolu">
          <Link href="/">Ana Sayfa</Link> {' > '}
          <Link href="/kanada-vizesi">Kanada Vizesi</Link> {' > '}
          <span aria-current="page">Kanada Ziyaretçi Vizesi</span>
        </nav>
        <div className="guide-layout">
          <article>
            <p className="article-category">Ziyaretçi Vizesi</p>
            <h1>{visitorVisaTitle}</h1>
            <span className="red-rule" />
            <p className="article-intro">
              Kanada&apos;yı turistik amaçla görmek, ailenizi veya
              arkadaşlarınızı ziyaret etmek ya da kısa süreli bir iş etkinliğine
              katılmak istiyorsanız ziyaretçi vizesine ihtiyaç duyabilirsiniz.
              Bu rehber; Türkiye&apos;den yapılacak başvurularda temel şartları,
              belgelerin hangi amacı taşıdığını, başvuru adımlarını ve sık
              yapılan hataları açıklar.
            </p>

            <div className="article-meta">
              <span>
                Son kontrol: <time dateTime={facts.reviewedAt}>{date}</time>
              </span>
              <span>Okuma süresi: {readTime} dakika</span>
              <span>Yazar: KanadaVizesi.ca İçerik Ekibi</span>
            </div>
            <div className="path-cards visitor-facts">
              {[
                [
                  'Kimler için?',
                  'Ziyaret amaçlı seyahat',
                  'Turizm, aile/arkadaş ziyareti veya uygun kısa iş ziyaretleri',
                ],
                [
                  'Türk vatandaşları',
                  'Vize gerekir',
                  'Türkiye, IRCC’nin vize gereken ülkeler listesindedir',
                ],
                [
                  'Devlet başvuru ücreti',
                  `CAN$${facts.visitorVisaFeeCad}’den başlar`,
                  'Biyometri ve üçüncü taraf masrafları ayrıca çıkabilir. Ücretler değişebilir; ödeme öncesi IRCC’den doğrulayın.',
                ],
                [
                  'Kanada’da kalış',
                  facts.usualStayLabelTr,
                  'Nihai süreyi sınır görevlisi belirler; vize geçerliliğiyle aynı değildir',
                ],
              ].map(([label, value, description]) => (
                <div key={label}>
                  <p>{label}</p>
                  <strong>{value}</strong>
                  <p>{description}</p>
                </div>
              ))}
            </div>
            <div className="guide-callout">
              <p>
                <strong>Kısa cevap:</strong> Türk vatandaşları Kanada&apos;ya
                ziyaret amacıyla seyahat ederken genel olarak ziyaretçi vizesi
                (Temporary Resident Visa — TRV) almalıdır. Başvuruda yalnızca
                belge yüklemek yeterli değildir; seyahat amacınızın geçici ve
                tutarlı olduğunu, masrafları karşılayabildiğinizi ve izin
                verilen sürenin sonunda Kanada&apos;dan ayrılacağınızı dosyanın
                bütünüyle göstermeniz gerekir.
              </p>
            </div>
            {data.sections
              .filter((s) => s.id !== 'kaynaklar')
              .map((section) => (
                <section id={section.id} key={section.id}>
                  <h2>{section.title}</h2>
                  {section.blocks.map((block, i) => (
                    <ContentBlock key={i} block={block} />
                  ))}
                  {section.id === 'basvuru' && <AssessmentCTA />}
                </section>
              ))}
            <section id="kontrol">
              <h2>Başvuru öncesi son kontrol listesi</h2>
              <VisitorChecklist items={data.checklist} />
            </section>
            <section id="sss">
              <h2>Sık sorulan sorular</h2>
              <VisitorFaq items={data.faqs} />
            </section>
            {data.sections
              .filter((s) => s.id === 'kaynaklar')
              .map((s) => (
                <section key={s.id} className="guide-sources">
                  <h2>{s.title}</h2>
                  {s.blocks.map((b, i) => (
                    <ContentBlock key={i} block={b} />
                  ))}
                </section>
              ))}
            <section>
              <h2>İlgili rehberler</h2>
              <div className="guide-related">
                {[
                  [
                    'Türkiye’den Kanada’ya Nasıl Gidilir?',
                    'Ziyaret, eğitim, çalışma ve kalıcı oturum yollarını karşılaştırın.',
                    '/rehberler/turkiyeden-kanadaya-nasil-gidilir',
                  ],
                  [
                    'Kanada Vizesi İçin Banka Hesabı',
                    'Sabit rakam yerine seyahat bütçesi ve para kaynağı mantığını anlayın.',
                    '/kanada-vizesi/bankada-ne-kadar-para-olmali',
                  ],
                  [
                    'Kanada Vize Reddi',
                    'Ret gerekçelerini ve yeniden başvuru öncesi seçenekleri inceleyin.',
                    '/kanada-vizesi/vize-reddi',
                  ],
                ].map(([title, description, href]) => (
                  <article key={href}>
                    <h3>
                      <InternalLink href={href}>{title}</InternalLink>
                    </h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </section>
            <AssessmentCTA bottom />
          </article>
          <VisitorToc items={toc} />
        </div>
      </div>
    </main>
  );
}
