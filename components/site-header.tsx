import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, Search } from 'lucide-react';

export function Brand() {
  return <Link className="logo" href="/" aria-label="KanadaVizesi.ca ana sayfa"><Image src="/canada-flag.svg" alt="Kanada bayrağı" width={76} height={38} priority/><strong>KanadaVizesi<em>.ca</em></strong></Link>;
}

export function SiteHeader() {
  return <>
    <header className="top-header"><div className="container header-inner"><Brand/><div className="header-tools"><form className="search" action="/rehberler" role="search"><label className="sr-only" htmlFor="site-search">Sitede ara</label><input id="site-search" name="q" type="search" placeholder="Sitede ara"/><button type="submit" aria-label="Ara"><Search/></button></form></div></div></header>
    <div className="nav-line"><div className="container nav-inner"><details className="mobile-navigation"><summary><Menu/> MENÜ <ChevronDown/></summary><div><Link href="/rehberler">Tüm Rehberler</Link><Link href="/kanada-vizesi/kanada-ziyaretci-vizesi">Kanada Vizesi</Link><Link href="/kanadada-egitim/kanadada-egitim-rehberi">Kanada’da Eğitim</Link><Link href="/kanadada-calisma/turkiyeden-kanadada-is-bulmak">Kanada’da Çalışma</Link><Link href="/kanada-gocmenlik/kalici-oturum-ve-express-entry">Göçmenlik</Link><Link href="/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun">Kanada’da Yaşam</Link></div></details><nav aria-label="Ana menü"><Link href="/rehberler">Rehberler</Link><Link href="/kanada-vizesi/kanada-ziyaretci-vizesi">Kanada Vizesi</Link><Link href="/kanadada-egitim/kanadada-egitim-rehberi">Eğitim</Link><Link href="/kanadada-calisma/turkiyeden-kanadada-is-bulmak">Çalışma</Link><Link href="/kanada-gocmenlik/kalici-oturum-ve-express-entry">Göçmenlik</Link><Link href="/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun">Kanada’da Yaşam</Link></nav><Link className="sign-in" href="/#degerlendirme">Ön Değerlendirme</Link></div></div>
  </>;
}
