import Link from 'next/link';
import type { Article } from '@/lib/content';
import { articleMap, contentClusters, SITE_URL } from '@/lib/content';

const perspectives = [
  'Başlangıç noktası, internetteki tek bir örneği kopyalamak değil; kişinin amacı, geçmişi, mali durumu ve zaman planını birlikte değerlendirmektir.',
  'Sağlıklı bir hazırlık, yalnızca belge toplamaya değil; belgelerin birbiriyle tutarlı ve anlaşılır bir bütün oluşturmasına dayanır.',
  'Kanada programları ve uygulama ayrıntıları zaman içinde değişebildiği için karar vermeden önce güncel resmî kaynakların kontrol edilmesi önemlidir.',
  'Her profilin güçlü yönleri ve sınırlamaları farklıdır; bu nedenle genel bilgiler kişiye özel uygunluk sonucu veya onay garantisi anlamına gelmez.',
];
function label(path:string){return articleMap.get(path)?.title||path}

export function ArticleTemplate({article}:{article:Article}){
  const cluster=contentClusters.find(c=>c.category===article.category)!;
  const [relatedA,relatedB]=article.relatedArticles;
  const [crossA,crossB]=article.crossClusterLinks;
  const p=perspectives[article.slug.length%perspectives.length];
  const schema={
    '@context':'https://schema.org','@graph':[
      {'@type':'Article',headline:article.title,description:article.description,dateModified:'2026-09-11',datePublished:'2026-09-11',mainEntityOfPage:`${SITE_URL}${article.path}`,author:{'@type':'Organization',name:'KanadaVizesi.ca'},publisher:{'@type':'Organization',name:'KanadaVizesi.ca'}},
      {'@type':'BreadcrumbList',itemListElement:article.breadcrumbs.map((b,i)=>({'@type':'ListItem',position:i+1,name:b.label,item:`${SITE_URL}${b.href}`}))}
    ]
  };
  return <main className="article-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <div className="container article-shell">
      <nav className="article-breadcrumb" aria-label="İçerik yolu">{article.breadcrumbs.map((b,i)=><span key={b.href}>{i>0&&' > '}<Link href={b.href}>{b.label}</Link></span>)}</nav>
      <div className="article-layout"><article data-content-status={article.contentStatus}>
        <p className="article-category">{article.category}</p><h1>{article.title}</h1><span className="red-rule"/><p className="article-intro">{article.intro}</p>
        <div className="article-meta"><span>Son güncelleme: 11 Eylül 2026</span><span>Yazar: KanadaVizesi.ca İçerik Ekibi</span><span>RCIC incelemesi: Profesyonel inceleme alanı</span></div>
        <h2>{article.title} hakkında temel çerçeve</h2>
        <p>{p} <Link href={article.pillar}>{label(article.pillar)}</Link> sayfası, bu konunun bağlı olduğu daha geniş çerçeveyi ve alternatif yolları birlikte açıklar.</p>
        <p>{article.title} değerlendirilirken başvurunun veya kararın amacı açıkça belirlenmeli; eğitim, iş deneyimi, aile durumu, dil yeterliliği ve mali plan gibi unsurlar birbirinden kopuk düşünülmemelidir. Tek bir olumlu unsur, dosyanın tamamındaki eksikleri otomatik olarak gidermez. Benzer biçimde tek bir zayıf nokta da her durumda olumsuz sonuç anlamına gelmez. Önemli olan koşulların doğru açıklanması, belgelenebilen bilgilerin kullanılması ve değişebilen kurallar için resmî IRCC kaynaklarının kontrol edilmesidir.</p>
        <h2>Planlama sırasında nelere dikkat edilmeli?</h2>
        <p>Hazırlığa başlamadan önce hedefinizi, bütçenizi ve gerçekçi zaman planınızı yazılı hale getirin. Belgelerdeki tarihler, görevler, gelir bilgileri ve seyahat ya da eğitim amacı birbiriyle uyumlu olmalıdır. Ayrıntılı bilgi için <Link href={relatedA}>{label(relatedA)}</Link> ve <Link href={relatedB}>{label(relatedB)}</Link> rehberleri konuyu tamamlayan pratik başlıklar sunar.</p>
        <p>Planınız geçici bir ziyaretin ötesine geçiyorsa <Link href={crossA}>{label(crossA)}</Link> içeriğini de inceleyin. Kanada’daki eğitim, çalışma, kalıcı oturum ve yaşam seçenekleri farklı şartlara sahiptir; bir yolun başka bir kişiye uygun olması sizin için de aynı sonucu doğurmaz. Daha geniş bir karşılaştırma için <Link href={crossB}>{label(crossB)}</Link> rehberi yararlı bir sonraki adım olabilir.</p>
        {article.isPillar&&<section className="pillar-links"><h2>Bu rehberdeki bütün konular</h2><ul>{cluster.articles.filter(a=>!a.isPillar).map(a=><li key={a.path}><Link href={a.path}>{a.title}</Link></li>)}</ul></section>}
        <section className="article-cta"><h2>Profilinize göre değerlendirme alın</h2><p>Genel bilgilerin sizin koşullarınıza nasıl uygulanacağını anlamak için hedefinizi ve temel profil bilgilerinizi paylaşın.</p><Link href={article.serviceCta.href}>{article.serviceCta.label}</Link></section>
      </article><aside><div className="aside-box"><h2>İlgili yazılar</h2>{[...article.relatedArticles,...article.crossClusterLinks].map(path=><Link key={path} href={path}>{label(path)}</Link>)}</div><div className="aside-box"><h2>İçerik merkezi</h2><p>Tüm rehberleri kategori halinde görüntüleyin.</p><Link href="/rehberler">Bütün rehberler</Link></div></aside></div>
    </div>
  </main>;
}
