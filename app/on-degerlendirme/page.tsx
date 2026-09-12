import type { Metadata } from 'next';
import Link from 'next/link';
import { AssessmentForm } from '@/components/assessment-form';

export const metadata: Metadata = {
  title: 'Kanada Ön Değerlendirme | KanadaVizesi.ca',
  description:
    'Hedef, eğitim, deneyim, dil ve bütçe bilgilerinize göre Kanada planınız için başlangıç yolunu belirleyin.',
};
export default function AssessmentPage() {
  return (
    <main className="legal-page">
      <div className="container">
        <nav className="article-breadcrumb">
          <Link href="/">Ana Sayfa</Link> &gt; Ön Değerlendirme
        </nav>
        <header className="hub-intro">
          <h1>Kanada ön değerlendirmesi</h1>
          <span className="red-rule" />
          <p>
            Kanada hedefinizi, hazırlık durumunuzu ve iletişim bilgilerinizi
            paylaşın; ön değerlendirme talebinizi ekibimize gönderin.
          </p>
        </header>
        <AssessmentForm />
      </div>
    </main>
  );
}
