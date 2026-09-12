import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';

const immigration = [
  ['Ziyaretçi Vizesi', 'Turistik ziyaret, aile ziyareti ve kısa süreli iş seyahatleri', '/kanada-vizesi/kanada-ziyaretci-vizesi'],
  ['Eğitim İzni', 'Okul ve program seçimi, finansal plan ve eğitim izni başvurusu', '/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni'],
  ['Çalışma İzni', 'İşverene bağlı ve açık çalışma izni seçenekleri', '/kanadada-calisma/kanada-calisma-izni'],
  ['Kalıcı Oturum', 'Express Entry, eyalet aday programları ve ekonomik göçmenlik', '/kanada-gocmenlik/kalici-oturum-ve-express-entry'],
  ['Ailece Kanada’ya Gitmek', 'Eşiniz ve çocuklarınızla birlikte plan yaparken dikkat edilmesi gerekenler', '/rehberler/ailece-kanadaya-gitmek'],
  ['Ret Sonrası Değerlendirme', 'Ret gerekçesinin incelenmesi ve yeni başvuru seçenekleri', '/kanada-vizesi/vize-reddi'],
] as const;
const settlement = [
  ['İş ve Kariyer Desteği', 'Kanada formatında CV, LinkedIn ve mülakat hazırlığı', '/kanadada-calisma/turkiyeden-kanadada-is-bulmak'],
  ['Yerleşim ve İlk 90 Gün', 'Geliş öncesi planlama, ilk hafta ve yeni düzene geçiş', '/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun'],
  ['Yaşam Maliyeti', 'Bireysel ve aile bütçesi için temel gider kalemleri', '/kanadada-yasam/kanadada-yasam-maliyeti'],
  ['Şehir Seçimi', 'Kanada şehirlerini yaşam ve iş olanaklarına göre karşılaştırın', '/kanadada-yasam/kanada-sehirleri-karsilastirmasi'],
] as const;
const steps = [['1','Ön değerlendirme','Soruları yanıtlayarak mevcut konumunuzu görün.'],['2','Seçenekleri karşılaştırma','Profilinizle ilişkili yolları ve temel koşulları inceleyin.'],['3','Hazırlık planı','Belge, bütçe, dil ve zamanlama eksiklerinizi belirleyin.'],['4','Sonraki adım','İlgili rehberden ayrıntılı yol haritasına geçin.']];
const faqs = [
  ['Ön değerlendirme sonucu resmi bir uygunluk kararı mıdır?', 'Hayır. Sonuç yalnızca verdiğiniz yanıtlara göre genel bir yönlendirme sunar; resmi uygunluk veya başvuru sonucu anlamına gelmez.'],
  ['Hangi bilgiler değerlendirmeyi etkiler?', 'Hedefiniz, yaşınız, eğitiminiz, dil seviyeniz, iş deneyiminiz ve ayırabildiğiniz bütçe birlikte değerlendirilir.'],
  ['Türkiye’den Kanada seçeneklerini araştırabilir miyim?', 'Evet. Rehberler, Türkiye’den plan yapan ziyaretçi, öğrenci, çalışan ve göçmen adayları için hazırlanmıştır.'],
  ['Kanada’ya geldikten sonraki yaşamı da planlayabilir miyim?', 'Evet. İş arama, yaşam maliyeti, şehir seçimi ve ilk 90 güne ilişkin rehberleri birlikte inceleyebilirsiniz.'],
];

export default function Home(){return <main>
  <div className="container intro"><Link className="breadcrumb" href="/">KanadaVizesi.ca</Link><h1>Kanada’ya gelin, burada sağlam bir hayat kurun</h1><span className="red-rule"/><p>Kanada vizesi, eğitim, çalışma ve göçmenlik seçeneklerini anlaşılır Türkçe rehberlerle karşılaştırın; profilinize göre nereden başlayacağınızı belirleyin.</p></div>
  <section className="info-band"><div className="container band-grid"><h2>Hızlı bağlantılar</h2><ul><li><Link href="/on-degerlendirme">Ön değerlendirme</Link></li><li><Link href="/rehberler/turkiyeden-kanadaya-nasil-gidilir">Kanada’ya gitme seçenekleri</Link></li></ul><ul><li><Link href="/rehberler">Bütün rehberler</Link></li><li><Link href="/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun">Kanada’da yaşam</Link></li></ul></div></section>
  <section className="requested"><div className="container band-grid"><h2>En çok arananlar</h2><ul><li><Link href="/kanada-vizesi/kanada-ziyaretci-vizesi">Ziyaretçi vizesi</Link></li><li><Link href="/kanadada-egitim/ogrenci-vizesi-ve-egitim-izni">Eğitim izni</Link></li></ul><ul><li><Link href="/kanadada-calisma/kanada-calisma-izni">Çalışma izni</Link></li><li><Link href="/kanada-gocmenlik/kalici-oturum-ve-express-entry">Kalıcı oturum</Link></li></ul></div></section>
  <section className="section white"><div className="container application"><div><h2>Kanada planınızdaki konumunuzu belirleyin</h2><p>Hedefiniz, yaşınız, eğitiminiz, deneyiminiz, dil seviyeniz ve bütçeniz üzerinden size uygun başlangıç noktasını görün.</p><Link className="link-arrow" href="/on-degerlendirme">Ön değerlendirmeyi başlat <ArrowRight/></Link></div><div className="application-icon" aria-hidden="true">✓<br/>✓<br/>✓</div></div></section>
  <section className="section grey"><div className="container"><h2>Kanada’ya gelme seçenekleri</h2><p className="lead">Her seçeneğin koşulları farklıdır. Ayrıntıları doğrudan ilgili rehberde inceleyin.</p><div className="link-grid">{immigration.map(([title,text,href])=><article key={title}><h3><Link href={href}>{title}</Link></h3><p>{text}</p></article>)}</div><div className="question-box"><HelpCircle/><strong>Nereden başlayacağınızdan emin değil misiniz?</strong><Link href="/on-degerlendirme">Soruları yanıtlayın ve mevcut konumunuzu görün</Link></div></div></section>
  <section className="section white"><div className="container"><h2>Kanada’da hayat kurmak</h2><p className="lead">İş, günlük yaşam ve yeni düzene geçiş için güncel bir başlangıç planı oluşturun.</p><div className="link-grid">{settlement.map(([title,text,href])=><article key={title}><h3><Link href={href}>{title}</Link></h3><p>{text}</p></article>)}</div></div></section>
  <section className="section grey"><div className="container"><h2>Nasıl ilerleyebilirsiniz?</h2><div className="steps">{steps.map(([n,title,text])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  <section className="section white"><div className="container two-col"><div><h2>Tek bir başvurudan fazlasını planlayın</h2><span className="red-rule"/><p>Kanada’ya geliş seçeneğiniz ile eğitim, kariyer, bütçe ve yerleşim planınızı bir bütün olarak ele alın.</p></div><div className="plain-list"><h3>İçerik yaklaşımımız</h3><ul><li>Açık ve anlaşılır Türkçe</li><li>Gerçekçi seçenek karşılaştırması</li><li>Adım adım hazırlık rehberleri</li><li>Kanada’da yaşam odağı</li></ul></div></div></section>
  <section className="section grey"><div className="container faq-layout"><h2>Sık sorulan sorular</h2><div>{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>
  <section className="contact-band"><div className="container"><h2>İlk adımı profilinize göre atın</h2><p>Kısa değerlendirmeyi tamamlayın ve size en yakın seçenekleri görün.</p><Link href="/on-degerlendirme">Ön değerlendirmeyi başlat</Link></div></section>
</main>}
