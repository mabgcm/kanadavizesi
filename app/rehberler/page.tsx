import type { Metadata } from 'next';
import Link from 'next/link';
import { GuideHub } from '@/components/guide-hub';
import { contentClusters, SITE_URL } from '@/lib/content';

export const metadata:Metadata={title:'Kanada Vizesi ve Göçmenlik Rehberleri | KanadaVizesi.ca',description:'Kanada vizesi, eğitim, çalışma, kalıcı oturum ve Kanada’da yaşam hakkında bütün Türkçe rehberleri kategori halinde inceleyin.',alternates:{canonical:`${SITE_URL}/rehberler`},openGraph:{title:'Kanada Vizesi ve Göçmenlik Rehberleri',description:'Kanada planınız için kapsamlı Türkçe içerik merkezi.',url:`${SITE_URL}/rehberler`}};
export default async function Rehberler({searchParams}:{searchParams:Promise<{q?:string|string[]}>}){const {q}=await searchParams;const initialQuery=Array.isArray(q)?q[0]??'':q??'';return <main className="hub-page"><div className="container"><nav className="article-breadcrumb"><Link href="/">Ana Sayfa</Link> &gt; Rehberler</nav><header className="hub-intro"><h1>Kanada vizesi ve göçmenlik rehberleri</h1><span className="red-rule"/><p>Kanada’ya gitme yollarından ziyaretçi vizesine, eğitim ve çalışma seçeneklerinden kalıcı oturum ve yeni yaşam düzenine kadar bütün rehberleri tek yerde inceleyin.</p></header><GuideHub clusters={contentClusters} initialQuery={initialQuery}/></div></main>}
