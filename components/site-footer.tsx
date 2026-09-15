import Link from 'next/link';
import { Brand } from './site-header';
const groups = [
  [
    'Kanada’ya Gel',
    [
      ['Ziyaretçi Vizesi', '/kanada-vizesi/kanada-ziyaretci-vizesi'],
      ['Eğitim İzni', '/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni'],
      ['Çalışma İzni', '/kanadada-calisma/kanada-calisma-izni'],
      ['Kalıcı Oturum', '/kanada-gocmenlik/kalici-oturum-ve-express-entry'],
      ['Ailece Kanada’ya Gitmek', '/rehberler/ailece-kanadaya-gitmek'],
      ['Ret Sonrası Bilgi', '/kanada-vizesi/vize-reddi'],
    ],
  ],
  [
    'Kanada’da Yaşam',
    [
      ['İş ve Kariyer', '/kanadada-calisma/turkiyeden-kanadada-is-bulmak'],
      ['İlk 90 Gün', '/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun'],
      ['Yaşam Maliyeti', '/kanadada-yasam/kanadada-yasam-maliyeti'],
      ['Şehir Rehberleri', '/kanadada-yasam/kanada-sehirleri-karsilastirmasi'],
      ['Sağlık ve Eğitim', '/saglik-ve-egitim'],
    ],
  ],
  [
    'Kaynaklar',
    [
      ['Bütün Rehberler', '/rehberler'],
      [
        'Kanada’ya Gitme Rehberi',
        '/rehberler/turkiyeden-kanadaya-nasil-gidilir',
      ],
      ['Güncel Bilgiler', '/guncel-bilgiler'],
      ['Ön Değerlendirme', '/on-degerlendirme'],
      [
        'Resmî Kanada Kaynakları',
        'https://www.canada.ca/en/immigration-refugees-citizenship.html',
      ],
    ],
  ],
] as const;
export function SiteFooter() {
  return (
    <footer>
      <div className="footer-top">
        <div className="container">
          <h2>KanadaVizesi.ca</h2>
          <div className="footer-grid">
            {groups.map(([title, links]) => (
              <div key={title}>
                <h3>{title}</h3>
                {links.map(([label, href]) => (
                  <Link key={href} href={href}>
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <Link href="/hakkimizda">Hakkımızda ve İletişim</Link>
          <Link href="/gizlilik">Gizlilik</Link>
          <Link href="/kullanim-kosullari">Kullanım Koşulları</Link>
          <Link href="/yasal-uyari">Yasal Uyarı</Link>
          <Link href="/kaynak-politikasi">Kaynak Politikası</Link>
          <Brand />
        </div>
      </div>
    </footer>
  );
}
