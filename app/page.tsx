import { ArrowRight, HelpCircle } from 'lucide-react';

const immigration = [
  ['Ziyaretçi Vizesi', 'Turistik ziyaret, aile ziyareti ve kısa süreli iş seyahatleri'],
  ['Eğitim İzni', 'Okul ve program seçimi, finansal plan ve eğitim izni başvurusu'],
  ['Çalışma İzni', 'İşverene bağlı ve açık çalışma izni seçenekleri'],
  ['Kalıcı Oturum', 'Express Entry, eyalet aday programları ve ekonomik göçmenlik'],
  ['Aile Sponsorluğu', 'Eş, partner, çocuk ve uygun aile üyeleri için sponsorluk'],
  ['Ret Sonrası Değerlendirme', 'Ret gerekçesinin incelenmesi ve yeni başvuru stratejisi'],
];
const settlement = [
  ['İş ve Kariyer Desteği', 'Kanada formatında CV, LinkedIn ve mülakat hazırlığı'],
  ['Yerleşim ve İlk 90 Gün', 'Geliş öncesi planlama, ilk hafta ve yeni düzene geçiş'],
  ['Öğrenci ve Yeni Mezun Desteği', 'Okul yaşamından Kanada iş piyasasına geçiş'],
  ['İşverenler İçin Hizmetler', 'Yabancı çalışan istihdam süreçleri hakkında destek'],
];
const steps = [['1','Ön değerlendirme','Formunuzu ve temel bilgilerinizi inceleriz.'],['2','Strateji görüşmesi','Hedefinizi, seçenekleri, riskleri ve alternatifleri konuşuruz.'],['3','Dosya hazırlığı','Belgeler, başvuru ve takip sürecini planlı biçimde yürütürüz.'],['4','Kanada’ya geçiş','Talep ederseniz kariyer ve yerleşim desteğinizi başlatırız.']];
const faqs = [
  ['Kanada vizesi alacağımı garanti ediyor musunuz?', 'Hayır. Nihai karar Kanada makamlarına aittir. Dosyanızı yürürlükteki kurallar ve sunduğunuz doğru bilgiler çerçevesinde dikkatli, tutarlı ve eksiksiz biçimde hazırlarız.'],
  ['İlk görüşmede ne konuşuluyor?', 'Hedefiniz, geçmişiniz, mevcut koşullarınız, olası programlar, temel uygunluk şartları, riskler ve size uygun hizmet kapsamı ele alınır.'],
  ['Türkiye’den çevrim içi hizmet alabilir miyim?', 'Evet. Görüşmeler ve belge süreçleri güvenli çevrim içi kanallar üzerinden yürütülebilir.'],
  ['Kanada’ya geldikten sonra da destek veriyor musunuz?', 'Evet. Göçmenlik hizmetinden ayrı olarak iş arama hazırlığı, Kanada formatında CV, LinkedIn, mülakat ve ilk 90 gün desteği sunuyoruz.'],
];
export default function Home(){return <main id="top">
  <div className="container intro"><a className="breadcrumb" href="#top">KanadaVizesi.ca</a><h1>Kanada’ya gelin, burada sağlam bir hayat kurun</h1><span className="red-rule"/><p>Kanada vizesi ve göçmenlik seçeneklerinizi lisanslı danışmanlıkla değerlendiriyor; başvurudan Kanada’daki ilk işinize ve yeni yaşam düzeninize kadar size yol haritası sunuyoruz.</p></div>
  <section className="info-band"><div className="container band-grid"><h2>Hızlı bağlantılar</h2><ul><li><a href="#degerlendirme">Uygunluk değerlendirmesi</a></li><li><a href="#gel">Kanada’ya gelme seçenekleri</a></li></ul><ul><li><a href="#surec">Nasıl çalışıyoruz?</a></li><li><a href="#hayat">Kanada’da yaşam desteği</a></li></ul></div></section>
  <section className="requested"><div className="container band-grid"><h2>En çok arananlar</h2><ul><li><a href="#gel">Ziyaretçi vizesi</a></li><li><a href="#gel">Eğitim izni</a></li></ul><ul><li><a href="#gel">Çalışma izni</a></li><li><a href="#gel">Kalıcı oturum</a></li></ul></div></section>
  <section className="section white" id="degerlendirme"><div className="container application"><div><h2>Kanada planınıza nereden başlayacağınızı belirleyin</h2><p>Yaşınız, eğitiminiz, iş deneyiminiz, dil seviyeniz, bütçeniz, aile durumunuz ve zaman planınız hangi seçeneklerin gerçekçi olduğunu etkiler.</p><a className="link-arrow" href="mailto:bilgi@kanadavizesi.ca">Ön değerlendirme başlat <ArrowRight/></a></div><div className="application-icon" aria-hidden="true">✓<br/>✓<br/>✓</div></div></section>
  <section className="section grey" id="gel"><div className="container"><h2>Kanada’ya gelme seçenekleri</h2><p className="lead">Ziyaret, eğitim, çalışma, aile birleşimi ve ekonomik göçmenlik programlarının her biri farklı şartlara ve belgelere sahiptir.</p><div className="link-grid">{immigration.map(([title,text])=><article key={title}><h3><a href="#degerlendirme">{title}</a></h3><p>{text}</p></article>)}</div><div className="question-box"><HelpCircle/><strong>Nereden başlayacağınızdan emin değil misiniz?</strong><a href="#degerlendirme">Birkaç soruyu yanıtlayın ve uygun seçenekleri değerlendirin</a></div></div></section>
  <section className="section white" id="hayat"><div className="container"><h2>Kanada’da hayat kurmak</h2><p className="lead">Bir vize veya izin, Kanada’daki hayatın yalnızca başlangıcıdır. İş, günlük yaşam ve yeni düzene geçişinizi de planlayın.</p><div className="link-grid">{settlement.map(([title,text])=><article key={title}><h3><a href="#degerlendirme">{title}</a></h3><p>{text}</p></article>)}</div></div></section>
  <section className="section grey" id="surec"><div className="container"><h2>Nasıl çalışıyoruz?</h2><div className="steps">{steps.map(([n,title,text])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  <section className="section white" id="hakkimizda"><div className="container two-col"><div><h2>Dosyanız sonuçlandığında ilişkimizi bitirmiyoruz</h2><span className="red-rule"/><p>Göçmenlik danışmanlığı ile yerleşim ve kariyer desteğini birbirini tamamlayan iki hizmet alanı olarak sunuyoruz.</p></div><div className="plain-list"><h3>Hizmet yaklaşımımız</h3><ul><li>Lisanslı ve hesap verebilir hizmet</li><li>Gerçekçi değerlendirme</li><li>Başından sonuna düzenli süreç</li><li>Kanada’da yaşam desteği</li></ul></div></div></section>
  <section className="section grey" id="kaynaklar"><div className="container faq-layout"><h2>Sık sorulan sorular</h2><div>{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>
  <section className="contact-band" id="iletisim"><div className="container"><h2>Kanada planınızı birlikte netleştirelim</h2><p>Profilinizi gönderin. Ekibimiz uygun hizmet seçeneğiyle sizinle iletişime geçsin.</p><a href="mailto:bilgi@kanadavizesi.ca">Ön değerlendirme başlat</a></div></section>
</main>}
