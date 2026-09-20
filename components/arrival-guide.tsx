import Link from 'next/link';
import data from '@/lib/arrival-article.json';
import { articleMap, SITE_URL } from '@/lib/content';
import { publisher, SOCIAL_IMAGE } from '@/lib/seo';
import {
  arrivalDates,
  arrivalDescription,
  arrivalIntro,
  arrivalPath,
  arrivalPeriods,
  arrivalReadingMinutes,
  arrivalTitle,
  arrivalToc,
} from '@/lib/arrival';
import { JsonLd } from './json-ld';
import { GuideMobileToc } from './guide-mobile-toc';
import { GuideFaq } from './guide-faq';
import {
  ArrivalComparisonTable,
  ArrivalChecklist,
  ArrivalStatusProvider,
  ArrivalTask,
  NinetyDayTimeline,
} from './arrival-interactive';

type Block = {
  type: string;
  text?: string;
  href?: string;
  items?: string[];
  rows?: string[][];
};
function Inline({ text = '' }: { text?: string }) {
  return (
    <>
      {text
        .split(/(\*\*.*?\*\*)/g)
        .map((s, i) =>
          s.startsWith('**') ? <strong key={i}>{s.slice(2, -2)}</strong> : s,
        )}
    </>
  );
}
const aliases: Record<string, string> = {
  '/kanadada-yasam/yasam-maliyeti': '/kanadada-yasam/kanadada-yasam-maliyeti',
  '/kanadada-yasam/ev-kiralama': '/kanadada-yasam/ev-kiralamak',
  '/kanadada-yasam/banka-hesabi-acmak':
    '/kanadada-yasam/banka-hesabi-ve-kredi-gecmisi',
  '/kanadada-yasam/cocuklari-okula-kaydetmek':
    '/kanadada-yasam/cocuklarin-egitimi',
  '/kanadada-calisma/kanada-cv': '/kanadada-calisma/kanada-formati-cv',
  '/kanadada-calisma/linkedin-networking':
    '/kanadada-calisma/linkedin-ile-is-bulmak',
  '/kanadada-calisma/calisma-izni': '/kanadada-calisma/kanada-calisma-izni',
  '/kanadada-calisma/mesleki-denklik':
    '/kanadada-calisma/duzenlemeye-tabi-meslekler',
  '/kanadada-yasam/kredi-skoru':
    '/kanadada-yasam/banka-hesabi-ve-kredi-gecmisi',
};
function OfficialLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      className="visitor-official"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text} <span className="visitor-source-label">Resmî kaynak</span>
      <span className="sr-only"> (yeni sekmede açılır)</span>
    </a>
  );
}
function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === 'heading') return <h3 key={i}>{b.text}</h3>;
        if (b.type === 'list')
          return (
            <ul key={i}>
              {b.items?.map((item) => (
                <li key={item}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        if (b.type === 'warning')
          return (
            <div key={i} className="guide-warning">
              <p>
                <Inline text={b.text} />
              </p>
            </div>
          );
        if (b.type === 'official')
          return (
            <p key={i}>
              <OfficialLink href={b.href!} text={b.text!} />
            </p>
          );
        if (b.type === 'internal') {
          const href = aliases[b.href!] || b.href!;
          return articleMap.has(href) ? (
            <p key={i}>
              <Link href={href}>{b.text} →</Link>
            </p>
          ) : null;
        }
        if (b.type === 'table')
          return <ArrivalComparisonTable key={i} rows={b.rows!} />;
        if (b.text?.startsWith('**Daimi oturum sahipleri:**'))
          return (
            <ArrivalTask key={i} statuses={['pr']} label="Daimi oturum">
              <p>
                <Inline text={b.text} />
              </p>
            </ArrivalTask>
          );
        return (
          <p key={i}>
            <Inline text={b.text} />
          </p>
        );
      })}
    </>
  );
}
function taskScope(title: string) {
  if (title.includes('SIN başvurusu') || title.includes('Çalışma yetkinizi'))
    return {
      statuses: ['pr', 'worker', 'student'],
      label: 'Daimi oturum · Çalışma iznine bağlı · Öğrenci koşullarına bağlı',
    };
  if (title.includes('sağlık sigortasına'))
    return {
      statuses: ['pr', 'worker', 'student'],
      label: 'Eyalete göre değişir',
    };
  if (title.includes('newcomer'))
    return {
      statuses: ['pr', 'worker', 'student'],
      label: 'Statüye ve programa göre değişir',
    };
  if (
    title.includes('ehliyet') ||
    title.includes('konut') ||
    title.includes('okula')
  )
    return { label: 'Eyalete göre değişir' };
  return { label: 'Herkes için' };
}
function Section({ section }: { section: (typeof data.sections)[number] }) {
  const groups: Block[][] = [[]];
  for (const block of section.blocks) {
    if (block.type === 'heading') groups.push([]);
    groups.at(-1)!.push(block);
  }
  return (
    <section id={section.id}>
      <h2>{section.title}</h2>
      {groups.map((blocks, i) =>
        i === 0 ? (
          <Blocks key={i} blocks={blocks} />
        ) : (
          <ArrivalTask key={i} {...taskScope(blocks[0].text || '')}>
            <Blocks blocks={blocks} />
          </ArrivalTask>
        ),
      )}
    </section>
  );
}
function AssessmentCTA({ bottom = false }: { bottom?: boolean }) {
  return (
    <section className="guide-assessment">
      <h2>
        {bottom
          ? 'İlk 90 gününüzü rastgele değil, sırayla planlayın'
          : 'Kanada’daki ilk aylarınız için kişisel başlangıç planı mı arıyorsunuz?'}
      </h2>
      <p>
        {bottom
          ? 'Yaşadığınız şehir, göçmenlik statünüz, mesleğiniz ve aile durumunuz hangi adımlara öncelik vereceğinizi değiştirir. Temel bilgilerinizi paylaşarak size uygun rehberleri ve varsa profesyonel destek seçeneklerini öğrenin.'
          : 'Statünüz, şehriniz, mesleğiniz ve aile durumunuz hakkında temel bilgileri paylaşın. İlgili rehberleri ve ihtiyaç halinde yararlanabileceğiniz profesyonel destek seçeneklerini öğrenin.'}
      </p>
      <Link
        href={`/on-degerlendirme?konu=kanadada-yasam&source=first-90-days-${bottom ? 'bottom' : 'mid'}`}
      >
        {bottom
          ? 'Ön değerlendirmeyi başlat'
          : 'Yerleşim ön değerlendirmesini başlat'}
      </Link>
      {bottom && (
        <p>
          <Link href="/kanadada-yasam">
            Kanada’da yaşam rehberlerini görüntüleyin
          </Link>
        </p>
      )}
      <small>
        {bottom
          ? 'Ön değerlendirme hukuki, göçmenlik, sağlık, vergi veya mali danışmanlık değildir; iş, hizmet uygunluğu veya sonuç garantisi oluşturmaz.'
          : 'Formun gönderilmesi hukuki, vergi veya mali danışmanlık ilişkisi oluşturmaz; iş veya sonuç garantisi vermez.'}
      </small>
    </section>
  );
}
export function ArrivalGuide() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: arrivalTitle,
        description: arrivalDescription,
        mainEntityOfPage: `${SITE_URL}${arrivalPath}`,
        inLanguage: 'tr-TR',
        datePublished: arrivalDates.published,
        dateModified: arrivalDates.modified,
        author: publisher,
        publisher,
        image: SOCIAL_IMAGE.url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          ['Ana Sayfa', '/'],
          ['Kanada’da Yaşam', '/kanadada-yasam'],
          ['İlk 90 Gün', arrivalPath],
        ].map(([name, path], i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name,
          item: `${SITE_URL}${path}`,
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
    <main className="guide-page arrival-page">
      <JsonLd data={schema} />
      <div className="container guide-shell">
        <nav className="article-breadcrumb" aria-label="İçerik yolu">
          <Link href="/">Ana Sayfa</Link> {' > '}
          <Link href="/kanadada-yasam">Kanada’da Yaşam</Link> {' > '}
          <span aria-current="page">İlk 90 Gün</span>
        </nav>
        <div className="guide-layout">
          <article>
            <p className="article-category">Kanada’da Yaşam</p>
            <h1>{arrivalTitle}</h1>
            <span className="red-rule" />
            {arrivalIntro.map((p, i) => (
              <p key={p} className={i === 0 ? 'article-intro' : undefined}>
                {p}
              </p>
            ))}
            <div className="article-meta">
              <span>
                Son kontrol:{' '}
                <time dateTime={arrivalDates.modified}>
                  {new Intl.DateTimeFormat('tr-TR', {
                    dateStyle: 'long',
                  }).format(new Date(`${arrivalDates.modified}T12:00:00Z`))}
                </time>
              </span>
              <span>Okuma süresi: {arrivalReadingMinutes} dakika</span>
              <span>Yazar: KanadaVizesi.ca</span>
            </div>
            <div className="guide-warning">
              <p>
                <strong>Bağımsız bilgi platformu:</strong> KanadaVizesi.ca,
                Kanada Hükümeti, IRCC, Service Canada veya başka bir devlet
                kurumuyla bağlantılı değildir. İşlemlerin koşulları göçmenlik
                statüsüne, eyalete ve kişisel duruma göre değişebilir.
              </p>
            </div>
            <ArrivalStatusProvider>
              <div className="guide-profile">
                {arrivalPeriods.map((p) => (
                  <div key={p.id}>
                    <h3>{p.title}</h3>
                    <p>
                      <strong>{p.priority}</strong>
                    </p>
                    <p>{p.summary}</p>
                  </div>
                ))}
              </div>
              <section className="guide-callout">
                <h2>En önemli başlangıç</h2>
                <p>
                  Girişte verilen göçmenlik belgelerindeki ad, doğum tarihi,
                  statü ve geçerlilik tarihlerini hemen kontrol edin. Ardından
                  güvenli bir adres ve telefon bağlantısı kurun; çalışma
                  yetkiniz varsa SIN, uygunluğunuz varsa eyalet sağlık kartı ve
                  banka hesabı başvurularını ilk günlerde tamamlayın. Her
                  işlemin herkese uygulanmadığını unutmayın.
                </p>
              </section>
              <NinetyDayTimeline />
              {data.sections.map((s) => (
                <Section key={s.id} section={s} />
              ))}
            </ArrivalStatusProvider>
            <section id="kontrol-listesi">
              <h2>Kanada’da ilk 90 gün kontrol listesi</h2>
              <ArrivalChecklist groups={data.checklist} />
            </section>
            <AssessmentCTA />
            <section id="sss">
              <h2>Sık sorulan sorular</h2>
              <GuideFaq
                initiallyExpanded
                items={data.faqs.map((f) => ({
                  question: f.question,
                  answer: <p>{f.answer}</p>,
                }))}
              />
            </section>
            <section id="kaynaklar" className="guide-sources">
              <h2>Resmî kaynaklar</h2>
              <ul>
                {data.sources.map((s) => (
                  <li key={s.href}>
                    <OfficialLink href={s.href} text={s.title} />
                  </li>
                ))}
              </ul>
            </section>
            <AssessmentCTA bottom />
            <section>
              <h2>İlgili rehberler</h2>
              <div className="guide-related">
                {[
                  [
                    '/rehberler/turkiyeden-kanadaya-nasil-gidilir',
                    'Türkiye’den Kanada’ya Nasıl Gidilir?',
                    'Ziyaret, eğitim, çalışma ve kalıcı oturum yollarını karşılaştırın.',
                  ],
                  [
                    '/kanadada-yasam/kanadada-yasam-maliyeti',
                    'Kanada’da Yaşam Maliyeti',
                    'Konut, ulaşım, market ve temel giderleri şehir ve aile büyüklüğüne göre planlayın.',
                  ],
                  [
                    '/kanadada-calisma/turkiyeden-kanadada-is-bulmak',
                    'Türkiye’den Kanada’da İş Bulmak',
                    'Çalışma hakkı, Kanada CV’si, networking ve mesleki denklik adımlarını öğrenin.',
                  ],
                ].map(([href, title, description]) => (
                  <article key={href}>
                    <h3>
                      <Link href={href}>{title}</Link>
                    </h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </section>
          </article>
          <aside className="guide-toc">
            <nav aria-label="Bu rehberde">
              <h2>Bu rehberde</h2>
              <ol>
                {arrivalToc.map(([id, title]) => (
                  <li key={id}>
                    <a href={`#${id}`}>{title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>
      </div>
      <GuideMobileToc items={arrivalToc} />
    </main>
  );
}
