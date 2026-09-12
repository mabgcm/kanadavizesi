import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTemplate } from '@/components/article-template';
import { articleMap, articles, SITE_URL } from '@/lib/content';

type Props={params:Promise<{slug:string[]}>};
export function generateStaticParams(){return articles.map(a=>({slug:a.path.slice(1).split('/')}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params; const article=articleMap.get(`/${slug.join('/')}`); if(!article)return {};
  const canonical=`${SITE_URL}${article.path}`;
  return {title:`${article.title} | KanadaVizesi.ca`,description:article.description,alternates:{canonical},openGraph:{type:'article',url:canonical,title:article.title,description:article.description,siteName:'KanadaVizesi.ca'},twitter:{card:'summary',title:article.title,description:article.description}};
}
export default async function ContentPage({params}:Props){const {slug}=await params;const article=articleMap.get(`/${slug.join('/')}`);if(!article)notFound();return <ArticleTemplate article={article}/>}
