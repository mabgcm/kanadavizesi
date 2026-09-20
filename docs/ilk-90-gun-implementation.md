# İlk 90 Gün rehberi

- Makale: `/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun`
- Dizin: `/kanadada-yasam`
- Referans: `components/turkiye-kanada-guide.tsx`; aynı `guide-*` container, grid, breadcrumb, başlık, callout, CTA ve kart stilleri kullanılır. Mevcut `GuideFaq` ve `JsonLd` tekrar kullanılır. Masaüstü “Bu rehberde” ve mobil yan çekmece, Türkiye’den Kanada’ya rehberiyle aynı stilleri ve ortak `GuideMobileToc` bileşenini kullanır.
- Tam makale, 10 SSS, statü karşılaştırması ve 26 kontrol maddesi `lib/arrival-article.json` içindedir. Editoryal uygulama notları okuyucu metnine dönüştürülmüştür.
- Statü ve checklist verileri yalnız `arrival-status-v1` / `arrival-checklist-v1` localStorage anahtarlarında tutulur. Ağ isteği veya analytics olayı üretilmez. Depolama kullanılamazsa oturum içi bellek kullanılır; geçersiz kayıtlar yok sayılır.
- Filtre bütün metni görünür tutar; ilgili görevler ve karşılaştırma sütunu işaretlenir. İlerleme hukuki uygunluk ölçümü değildir.
- Son kaynak kontrolü: 20 Eylül 2026. Yayın için hazırlanan sürüm tarihi de 20 Eylül 2026'dır. Tarihler derleme veya sayfa isteğinde otomatik ilerlemez.

Kısa `/kanadada-yasam/ilk-90-gun` adresi tek ana makaleye 308 yönlendirilir; liste ve sitemap içinde ikinci kayıt yoktur.

## Bağlantı kararları

Projenin `SITE_URL` değeri ve `next.config.ts` içindeki apex → www yönlendirme notu korunmuştur. Canonical, OG, schema ve sitemap aynı `https://www.kanadavizesi.ca/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun` adresini kullanır.

Briefte farklı adlandırılmış ancak aktif karşılığı olan yaşam maliyeti, kira, banka, okul, CV, LinkedIn, çalışma izni, mesleki denklik ve kredi bağlantıları mevcut rotalara eşlenmiştir. Hazırlık listesi, PR adres rehberi, ehliyet ve newcomer vergi rehberi için rota bulunmadığından iç bağlantı üretilmez; ilgili makale metni ve resmî kaynakları korunur. Mevcut başlangıç içeriği sayfalarının yayın durumları değiştirilmemiştir.

## Kaynak kontrolü

Makalede listelenen 11 resmî kaynağın yanı sıra FCAC kredi raporları sayfası açılarak kontrol edildi. Özellikle PR adresi için 180 gün, eyalet sağlık kapsamı ve bekleme dönemi, SIN başvuru kanalları, banka kimlik koşulları, newcomer hizmet uygunluğu, eyalet ehliyetleri, okul belgeleri, mesleki lisans, vergi mukimliği/benefit ayrımı ve dolandırıcılık uyarıları karşılaştırıldı. Kaynak URL'leri makalede görünür ve yazdırılabilir.

## Doğrulama

Node 24.20.0 ile:

- TypeScript kontrolü başarılı.
- Değiştirilen uygulama dosyaları için oxlint başarılı. Depo geneli lint mevcut `components/ui/*` ve `hooks/use-mobile.ts` hataları nedeniyle temiz değil.
- `next build --webpack` başarılı; 144 statik sayfa üretildi. Varsayılan Turbopack derlemesi bu ortamın süreç/port kısıtlamasına (`Operation not permitted`) takılıyor.
- `scripts/check-seo.mjs`: 15 indexlenebilir URL, 124 noindex başlangıç sayfası; canonical, metadata, JSON-LD, sitemap ve iç bağlantılar başarılı.
- 375, 768, 1024 ve 1440 px: yatay sayfa taşması yok; axe WCAG 2 A/AA ve 2.1 AA denetiminde ihlal yok.
- Filtre/checklist yenileme sonrası kalıcılık, onaylı/iptal edilen sıfırlama, klavye, mobil yan çekmece, yazdırma ve JavaScript kapalı içerik kontrolleri başarılı.

Tarayıcı kabul testleri `tests/arrival.browser.mjs` içindedir. Çalışan yerel sunucuya karşı `SEO_BASE_URL` (varsayılan `http://localhost:3100`), mevcut Playwright modülüne `PLAYWRIGHT_MODULE`, axe betiğine `AXE_SCRIPT` ve gerekiyorsa Chrome çalıştırılabilir dosyasına `CHROME_PATH` verilerek çalıştırılır. Bunlar üretim bağımlılığı değildir. Otomatik axe/klavye kontrolleri gerçek bir ekran okuyucuyla manuel deneme yapıldığı anlamına gelmez.

## Birleştirme doğrulaması

Üretim derlemesi, TypeScript, değişen bileşenlerin lint kontrolü ve SEO denetimi başarılı. Kısa adresin 308 yanıtı, ana adrese ulaşması, mobil “Bu rehberde” çekmecesinin klavyeyle açılması ve bağlantı seçilince kapanması doğrulandı. 375, 768, 1024 ve 1440 px erişilebilirlik ve taşma kontrolleri geçti. Deploy yapılmadı.
