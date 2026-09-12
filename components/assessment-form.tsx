'use client';

import { type FormEvent, useState } from 'react';
import Link from 'next/link';

type Result={title:string;description:string;href:string;link:string};

export function AssessmentForm(){
  const [result,setResult]=useState<Result|null>(null);
  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const goal=String(data.get('goal'));
    const readiness=['age','language','education','experience','funds'].reduce((total,key)=>total+Number(data.get(key)),0);
    const paths:Record<string,Result>={
      visit:{title:'Ziyaretçi vizesi başlangıç yolu',description:'Kısa süreli ziyaret hedefiniz için seyahat amacı, mali durum ve Türkiye’ye bağlar temel hazırlık alanlarıdır.',href:'/kanada-vizesi/kanada-ziyaretci-vizesi',link:'Ziyaretçi vizesi rehberini aç'},
      study:{title:'Eğitim yolu',description:'Program ve okul seçimi, eğitim bütçesi ve mezuniyet sonrası planınız birlikte değerlendirilmelidir.',href:'/kanadada-egitim/kanadada-egitim-rehberi',link:'Eğitim rehberini aç'},
      work:{title:'Çalışma yolu',description:'Mesleğiniz, deneyiminiz, dil seviyeniz ve geçerli bir iş teklifi olasılığı çalışma planınızın temelini oluşturur.',href:'/kanadada-calisma/turkiyeden-kanadada-is-bulmak',link:'Çalışma rehberini aç'},
      permanent:{title:'Kalıcı oturum yolu',description:readiness>=10?'Yanıtlarınız ekonomik göçmenlik seçeneklerini ayrıntılı karşılaştırmaya hazır bir profile işaret ediyor.':'Kalıcı oturum hedefiniz için dil, eğitim denklik işlemleri, deneyim veya mali hazırlık alanlarından bazılarını güçlendirmeniz gerekebilir.',href:'/kanada-gocmenlik/kalici-oturum-ve-express-entry',link:'Kalıcı oturum rehberini aç'},
      unsure:{title:'Seçenek karşılaştırmasıyla başlayın',description:'Hedefiniz henüz net değilse ziyaret, eğitim, çalışma ve kalıcı oturum yollarını koşullarınıza göre yan yana inceleyin.',href:'/rehberler/turkiyeden-kanadaya-nasil-gidilir',link:'Başlangıç rehberini aç'},
    };
    setResult(paths[goal]??paths.unsure);
  }
  return <div className="assessment-layout"><form className="assessment-form" onSubmit={submit}>
    <label>Kanada’daki temel hedefiniz<select name="goal" required defaultValue=""><option value="" disabled>Seçin</option><option value="visit">Ziyaret</option><option value="study">Eğitim</option><option value="work">Çalışma</option><option value="permanent">Kalıcı oturum</option><option value="unsure">Henüz emin değilim</option></select></label>
    <label>Yaş aralığınız<select name="age" required defaultValue=""><option value="" disabled>Seçin</option><option value="4">18–29</option><option value="3">30–39</option><option value="2">40–49</option><option value="1">50 ve üzeri</option></select></label>
    <label>Tamamladığınız eğitim<select name="education" required defaultValue=""><option value="" disabled>Seçin</option><option value="1">Lise</option><option value="2">Ön lisans</option><option value="3">Lisans</option><option value="4">Yüksek lisans veya doktora</option></select></label>
    <label>İngilizce veya Fransızca seviyeniz<select name="language" required defaultValue=""><option value="" disabled>Seçin</option><option value="1">Başlangıç</option><option value="2">Orta</option><option value="3">İyi</option><option value="4">İleri / sınav sonucum var</option></select></label>
    <label>Nitelikli iş deneyiminiz<select name="experience" required defaultValue=""><option value="" disabled>Seçin</option><option value="1">Henüz yok</option><option value="2">1–2 yıl</option><option value="3">3–5 yıl</option><option value="4">6 yıl veya üzeri</option></select></label>
    <label>Planınız için mali hazırlığınız<select name="funds" required defaultValue=""><option value="" disabled>Seçin</option><option value="1">Henüz bütçe oluşturmadım</option><option value="2">Kısmen hazır</option><option value="3">Temel giderler için hazır</option><option value="4">Eğitim/yerleşim bütçem hazır</option></select></label>
    <button type="submit">Konumumu belirle</button><p className="form-note">Yanıtlar yalnızca tarayıcınızda değerlendirilir; kaydedilmez veya gönderilmez.</p>
  </form>{result?<aside className="assessment-result" aria-live="polite"><small>Başlangıç sonucunuz</small><h2>{result.title}</h2><p>{result.description}</p><Link href={result.href}>{result.link}</Link><span>Bu sonuç resmi uygunluk kararı veya kişisel hukuk tavsiyesi değildir.</span></aside>:<aside className="assessment-help"><h2>Sonuçta ne göreceksiniz?</h2><p>Yanıtlarınıza göre ilk araştırmanız gereken yolu ve hazırlık alanlarını göstereceğiz.</p><ul><li>Önerilen başlangıç yolu</li><li>Öncelikli hazırlık konusu</li><li>İlgili ayrıntılı rehber</li></ul></aside>}</div>;
}
