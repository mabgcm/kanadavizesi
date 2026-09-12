'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { Article } from '@/lib/content';

type Cluster={category:string;pillar:string;articles:Article[]};
export function GuideHub({clusters}:{clusters:Cluster[]}){
  const [query,setQuery]=useState(''); const [category,setCategory]=useState('Tümü');
  const results=useMemo(()=>clusters.flatMap(c=>c.articles).filter(a=>(category==='Tümü'||a.category===category)&&`${a.title} ${a.description}`.toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR'))),[clusters,query,category]);
  return <>
    <div className="guide-controls"><label><Search/><span className="sr-only">Rehberlerde ara</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rehberlerde ara"/></label><div className="category-filters"><button className={category==='Tümü'?'active':''} onClick={()=>setCategory('Tümü')}>Tümü</button>{clusters.map(c=><button className={category===c.category?'active':''} key={c.category} onClick={()=>setCategory(c.category)}>{c.category} <span>{c.articles.length}</span></button>)}</div></div>
    {!query&&category==='Tümü'&&<section className="featured-guides"><h2>Öne çıkan ana rehberler</h2><div>{clusters.map(c=>{const a=c.articles[0];return <article key={a.path}><p>{c.category}</p><h3><Link href={a.path}>{a.title}</Link></h3><span>{a.description}</span></article>})}</div></section>}
    <section className="all-guides"><h2>{query||category!=='Tümü'?`${results.length} içerik bulundu`:'Bütün yazılar'}</h2>{category==='Tümü'&&!query?clusters.map(c=><div className="guide-group" key={c.category}><h3>{c.category} <span>{c.articles.length} yazı</span></h3><div>{c.articles.map(a=><Link key={a.path} href={a.path} data-content-status={a.contentStatus}>{a.isPillar&&<small>Ana rehber</small>}<strong>{a.title}</strong><span>{a.description}</span></Link>)}</div></div>):<div className="guide-results">{results.map(a=><Link key={a.path} href={a.path} data-content-status={a.contentStatus}><small>{a.category}</small><strong>{a.title}</strong><span>{a.description}</span></Link>)}</div>}</section>
  </>;
}
