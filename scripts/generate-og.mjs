import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
// Static share image: no external font/image request at runtime.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#faf9f6"/><rect width="20" height="630" fill="#c62828"/>
<circle cx="1100" cy="60" r="220" fill="#f1e6e3"/>
<text x="80" y="105" fill="#b51f28" font-family="Arial,sans-serif" font-size="32" font-weight="700">KanadaVizesi.ca</text>
<text x="80" y="255" fill="#202626" font-family="Arial,sans-serif" font-size="72" font-weight="700">Kanada vizesi.</text>
<text x="80" y="340" fill="#202626" font-family="Arial,sans-serif" font-size="72" font-weight="700">Kanada’da yeni bir hayat.</text>
<rect x="80" y="387" width="100" height="6" fill="#c62828"/>
<text x="80" y="462" fill="#505757" font-family="Arial,sans-serif" font-size="31">Türkiye’den Kanada’ya Türkçe rehberler</text>
<text x="80" y="535" fill="#505757" font-family="Arial,sans-serif" font-size="24">Ziyaret • Eğitim • Çalışma • Göçmenlik • Yaşam</text>
</svg>`;
await sharp(Buffer.from(svg))
  .png()
  .toFile(new URL('../public/og.png', import.meta.url).pathname);
