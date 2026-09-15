import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="legal-page">
      <div className="container legal-content">
        <h1>Sayfa bulunamadı</h1>
        <p>
          Aradığınız adres mevcut değil. Kanada vizesi ve Türkiye’den Kanada’ya
          gitme rehberlerinden devam edebilirsiniz.
        </p>
        <p>
          <Link href="/rehberler">Rehberleri inceleyin</Link> ·{' '}
          <Link href="/">Ana sayfaya dönün</Link>
        </p>
      </div>
    </main>
  );
}
