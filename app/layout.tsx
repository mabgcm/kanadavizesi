import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kanadavizesi.ca'),
  title: 'KanadaVizesi.ca | Kanada’ya Gel, Kanada’da Hayat Kur',
  description: 'Kanada vizesi ve göçmenlik seçenekleri için Türkçe danışmanlık; başvurudan yerleşim ve kariyer desteğine uzanan yol haritası.',
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
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-2GFS7EDGN2" />
    </html>
  );
}
