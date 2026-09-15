# Türkiye ve AI aramaları: uygulama ve yayın kontrolü

## Uygulananlar

- Her HTML sayfasında kendisini işaret eden HTTPS canonical, Türkçe başlık/açıklama, `tr_TR` Open Graph ve büyük Twitter kartı. Sorgu parametreleri canonical adresine taşınmaz.
- Ana sayfanın başlığı ve H1’i Türkiye’den Kanada’ya gitme ve Kanada vizesi arama niyetini açıklar.
- Organization ve WebSite kimlikleri; iki tamamlanmış rehberde ortak yayıncı kimliğine bağlı Article, BreadcrumbList, dil ve görsel. Mevcut ziyaretçi vizesi FAQ verileri korunur.
- İçerik merkezlerinde görünen tamamlanmış rehberleri tanımlayan CollectionPage / ItemList.
- 1200×630 yerel PNG paylaşım görseli; çalışırken harici görsel/font servisi gerektirmez.
- Googlebot, Bingbot ve OAI-SearchBot erişimi; API yollarını tarama dışında tutma. Başlangıç içerikleri robots.txt ile engellenmez: botların `noindex` etiketini okuyabilmesi gerekir.
- 127 rehber kaydının 2’si tamamlanmış, 125’i aynı şablondan oluşan başlangıç içeriğidir. Başlangıç sayfaları `noindex, follow` olur, site haritasından çıkar ve yayımlanmış Article olarak işaretlenmez. Tamamlanmış Türkiye rehberinin yanlış `starter` kaydı düzeltildi.
- Sorgulu iç arama sayfaları (`/rehberler?q=...`) noindex olur ve `/rehberler` adresine canonical verir.
- 13 indekslenebilir URL içeren XML site haritası. Tarihler her istekte yeniden üretilmez.
- `www.kanadavizesi.ca` → `kanadavizesi.ca` kalıcı 308 yönlendirmesi; API yanıtlarında X-Robots-Tag.
- Gerçek 404 yanıtı ve yol gösteren Türkçe hata sayfası.
- Hakkımızda/iletişim sayfası, kaynak politikası bağlantıları; doğrulanmamış RCIC incelemesi yer tutucusu kaldırıldı.
- Google ve Bing doğrulama kodları için isteğe bağlı ortam değişkenleri.

## Yayın öncesi ve sonrasında hesap erişimi gerektiren işler

Kod değişiklikleri tek başına arama motorlarına yayın veya kayıt işlemi yapmaz.

1. Değişiklikleri üretime dağıtın. Önizleme ortamının platform düzeyindeki indeksleme korumasını açık tutun; üretimde yanlışlıkla `X-Robots-Tag: noindex`, şifre veya bot challenge bulunmadığını kontrol edin.
2. Google Search Console’da alan adı mülkünü DNS ile doğrulayın. URL-prefix doğrulaması kullanılacaksa `GOOGLE_SITE_VERIFICATION` değerine verilen ham kodu girip yeniden derleyin. Bing Webmaster Tools için `BING_SITE_VERIFICATION` desteklenir.
3. Her iki platforma `https://kanadavizesi.ca/sitemap.xml` gönderin. Google URL Denetimi ile ana sayfa, ziyaretçi vizesi ve Türkiye’den Kanada’ya gitme rehberi için canlı URL testi yapın.
4. DNS, TLS ve hosting ayarlarında apex ve www alan adlarını bağlayın; HTTP → HTTPS yönlendirmesini doğrulayın. Uygulama kuralı, www hostu sunucuya ulaşırsa çalışır; DNS/TLS yerine geçmez.
5. WAF/CDN erişim kayıtlarında doğrulanmış Googlebot/Bingbot/OAI-SearchBot isteklerine 200 verildiğini kontrol edin. Bir user-agent adına güvenerek güvenlik korumasını kapatmayın; sağlayıcıların yayımladığı IP doğrulamasını kullanın.
6. Search Console performansını Türkiye ülkesi ve mobil cihaz filtresiyle izleyin. İndeks kapsamı, sorgu gösterimi/tıklaması, açılış sayfası ve dönüşümleri başlangıç ölçümüyle karşılaştırın. GA4’te ChatGPT yönlendirmelerini ayrı inceleyin. Sayfa deneyimini saha verisiyle ölçün; bu çalışma bir Core Web Vitals saha puanı iddiası içermez.
7. Başlangıç sayfalarından gelen mevcut organik trafik varsa bu trafik noindex nedeniyle azalabilir. Bu bilinçli kalite düzenlemesini Search Console’da takip edin; şablonları hemen yeniden indekse açmayın.

## İçerik yayınlama kuralı

`lib/content.ts` içindeki `contentStatus: 'complete'` yalnızca başlık değiştirilerek verilmemeli. Sayfanın kendi sorusunu yanıtlayan gerçek gövde içeriği, tarih kapsamı, erişilebilir resmî kaynakları ve gerekiyorsa doğrulanmış uzman incelemesi olmalı. Sonra:

1. Özgün içerik bileşenini ve catch-all route yönlendirmesini ekleyin.
2. Başlık/açıklama ile görünür gövdeyi eşleştirin; metindeki ücret veya süreleri ilgili resmî kaynakla doğrulayın.
3. Gerçek yayımlanma/değişiklik tarihini hem metadata/schema hem sitemap için aynı kaynaktan kullanın. Derleme tarihi bir içerik incelemesi değildir.
4. `complete` durumuna geçirin; sitemap ve öne çıkan rehber listesi bunu otomatik kullanır.
5. `test:seo` denetimini çalıştırın. Yeni bir Article bileşeni eklenmişse dil, yayıncı ve breadcrumb doğrulaması da gerekir.

125 başlangıç yazısı bu çalışmada özgün araştırılmış makalelere dönüştürülmedi. Önce mevcut iki kapsamlı rehberin kaynak güncelliğini koruyun; sonra farklı kullanıcı ihtiyaçlarını karşılayan eğitim, çalışma ve kalıcı oturum ana rehberlerini tamamlayın. Aynı arama niyeti için çok sayıda benzer sayfa üretmeyin. Gerçek yazar/uzman kimliği ve yetki bilgileri site sahibinden doğrulanmadan uydurulmamalı.

## Türkiye hedeflemesinin sınırı

`.ca`, Kanada’ya ait ülke uzantısıdır; Google bunu coğrafi sinyal olarak kullanabilir. Türkçe içerik ve Türkiye’ye özgü anlatım yardımcı olur, fakat `geo` etiketi veya `hreflang` bu sinyali ortadan kaldırmaz. Site yalnızca Türkçe olduğundan sahte dil/bölge kopyaları ve hreflang listeleri üretilmedi. Türkiye odaklı başka bir alan adına geçiş, organik trafik ve marka verileriyle ayrıca planlanmalı; aynı siteyi iki alan adında indekslemekten kaçınılmalı.

## AI araması için yaklaşım

Google’ın AI arama rehberi, erişilebilir ve faydalı özgün içeriği, açık teknik yapıyı ve geleneksel SEO temellerini vurgular. `llms.txt` Google sıralama şartı değildir; bu yüzden sıralama vaadiyle eklenmedi. OpenAI arama tarayıcısı OAI-SearchBot’tur; GPTBot eğitim tarayıcısıyla ayrı değerlendirilir. Bu çalışmada mevcut genel eğitim tarama tercihi değiştirilmedi. FAQ/Article işaretlemesi tek başına zengin sonuç veya AI alıntısı garantisi vermez.

## Tekrarlanabilir doğrulama

Node.js 22.13+ kullanın (bu ortamda doğrudan `node` 24, `npm` ise 18’i seçebiliyor).

```sh
node node_modules/next/dist/bin/next build
# Ortama özgü Turbopack port hatasında doğrulama alternatifi:
node node_modules/next/dist/bin/next build --webpack
node node_modules/next/dist/bin/next start -p 3100
# Ayrı terminalde:
node --experimental-strip-types scripts/check-seo.mjs
# Farklı sunucu için:
SEO_BASE_URL=https://kanadavizesi.ca node --experimental-strip-types scripts/check-seo.mjs
```

Denetim: 13 sitemap URL’sinin 200 yanıtı, tek H1, benzersiz title/description, canonical, robotlar, sosyal etiketler, JSON-LD; 125 taslağın noindex durumu; iç bağlantılar; sorgu canonical; gerçek 404; www yönlendirmesi; API noindex ve PNG boyutu. Üretimdeki yönlendirme/CDN yapısı yerelden farklıysa ilgili assertion ayrıca değerlendirilmelidir.

Doğrulama sonucu: Webpack üretim derlemesi ve TypeScript başarılı; değiştirilen dosyalarda Oxlint başarılı; HTTP SEO denetimi başarılı. Masaüstü ve 390×844 mobil görünüm ile Türkçe rehber araması tarayıcıda doğrulandı. Projenin tamamında mevcut `components/ui/*`, `hooks/use-mobile.ts` ve PostCSS dosyalarında kapsam dışı lint uyarı/hataları var. Turbopack bu makinede CSS alt işlemi için port açarken EPERM veriyor; derleyici tercihi proje genelinde değiştirilmedi.

## Resmî kaynaklar

- Google AI arama rehberi: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google uluslararası siteler: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- OpenAI tarayıcıları: https://developers.openai.com/api/docs/bots
