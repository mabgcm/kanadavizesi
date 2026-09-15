import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { INDEX_ROBOTS, websiteSchema } from '@/lib/seo';
import { SITE_URL } from '@/lib/content';
import { JsonLd } from '@/components/json-ld';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'latin-ext'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  icons: {
    icon: { url: '/favicon.jpeg', type: 'image/jpeg' },
    shortcut: '/favicon.jpeg',
    apple: '/favicon.jpeg',
  },
  metadataBase: new URL(SITE_URL),
  robots: INDEX_ROBOTS,
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  title: 'KanadaVizesi.ca | Kanada’ya Gel, Kanada’da Hayat Kur',
  description:
    'Ziyaretçi vizesi, eğitim, çalışma, göçmenlik ve Kanada’daki günlük yaşam hakkında anlaşılır Türkçe rehberler.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={websiteSchema} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-2GFS7EDGN2" />
    </html>
  );
}
