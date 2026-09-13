# KanadaVizesi.ca

Next.js sitesi ve Gmail üzerinden ön değerlendirme talebi gönderimi.

## Vercel kurulumu

Project → Settings → Environment Variables bölümüne ekleyin:

| Değişken | Değer |
| --- | --- |
| `GMAIL_USER` | Gönderen Gmail veya Google Workspace hesabının tam e-posta adresi |
| `GMAIL_APP_PASSWORD` | Bu hesaptan oluşturulan 16 karakterlik Google uygulama şifresi; normal hesap şifresi değil |
| `ASSESSMENT_TO_EMAIL` | İsteğe bağlı tek alıcı adresi; boş bırakılırsa `GMAIL_USER` kullanılır |

Değişkenleri Production ortamına ekleyip yeniden deploy edin. Preview ortamında test edecekseniz o ortamı da seçin. Hiçbir şifreye `NEXT_PUBLIC_` öneki eklemeyin.

Google hesabında iki adımlı doğrulamayı açıp https://myaccount.google.com/apppasswords adresinden uygulama şifresi oluşturun. Bazı kurumsal hesaplarda bu seçenek yönetici tarafından kısıtlanabilir. Google hesabı parolası değiştiğinde yeni uygulama şifresi gerekebilir.

Kaynaklar: [Google uygulama şifreleri](https://support.google.com/accounts/answer/185833), [Nodemailer Gmail](https://nodemailer.com/guides/using-gmail).

Ek veritabanı, OpenAI anahtarı veya ayrı e-posta API servisi gerekmez. Gmail SMTP 465 üzerinden TLS ile kullanılır. Gönderen sunucu ayarından, alıcı da yalnızca sunucu ayarından belirlenir; formdaki e-posta Reply-To olur. Kullanıcıya otomatik e-posta gönderilmez. E-postada tüm form yanıtları, onay metni sürümü ve gönderim zamanı bulunur.

## Yerel geliştirme ve doğrulama

```sh
npm ci
cp .env.example .env.local
npm run dev
npm run lint
npm run build
npm run test:assessment
```

Gerçek gönderimi doğrulamak için ortam değişkenlerini ekledikten sonra `/on-degerlendirme` sayfasından kendi bilgilerinizle bir talep gönderin. Başarılı bildirim ve alıcı kutusundaki iletiyi kontrol edin; Yanıtla adresinin formdaki adres olduğundan emin olun. SMTP kabulü, gelen kutusuna teslim garantisi değildir.

API, zorunlu alanları ve seçenekleri sunucuda doğrular; onaysız, farklı kaynaktan gelen ve 16 KB üzeri istekleri reddeder. Gizli bot alanı ve sunucu örneği başına IP/e-posta özeti üzerinden 15 dakikada 3 deneme sınırı bulunur. Bu bellek sınırı Vercel örnekleri arasında paylaşılmaz ve yeniden başlatmalarda sıfırlanır; yüksek trafikte Vercel Firewall üzerinde ayrıca hız sınırı uygulanabilir. Form içeriği loglanmaz veya uygulama veritabanına kaydedilmez. E-posta kutularındaki kayıtların erişimi, saklanması ve silinmesi işletmeci tarafından yönetilir.

Gmail bilgileri olmadan build çalışır; form gönderimi yapılandırma tamamlanana kadar 503 döner. SMTP hata durumunda 502 döner ve arayüz formu korur. `bilgi@kanadavizesi.ca` sitedeki iletişim adresidir; bu posta kutusunun alım ve takibi işletmeci tarafından sağlanmalıdır.

## Spam koruması

Vercel BotID, istemcide `instrumentation-client.ts` ve sunucuda `checkBotId` ile aynı `basic` seviyesinde çalışır. Next yapılandırması `withBotId` ile sarılmıştır. Ek ortam değişkeni gerekmez; canlı bot doğrulaması Vercel üzerinde çalışır. Yerel geliştirmede BotID varsayılan olarak insan yanıtı döndürür. Doğrulama hatasında gönderim engellenir; kullanıcı form yanıtlarını kaybetmeden yeniden deneyebilir. [BotID yapılandırması](https://vercel.com/docs/botid/advanced-configuration).

Ek kontroller: istek gövdesi okunmadan IP başına 15 dakikada 20 istek, geçerli gönderimlerde IP/e-posta başına 3 deneme, 16 KB gövde sınırı, aynı kaynaktan gelme kontrolü, gizli bot alanı ve 15 dakikalık aynı-form tekrar kontrolü. 429 yanıtları Retry-After başlığı içerir. Vercel üzerinde platformun yazdığı `x-vercel-forwarded-for` kullanılır. Bellek tabanlı sınırlar ve tekrar kontrolü örnekler arasında paylaşılmaz; dağıtık saldırılara karşı tek başına kesin bir sınır değildir. BotID platform doğrulaması bu yerel kontrollere ek bir katmandır.
