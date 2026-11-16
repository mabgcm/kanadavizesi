import Script from 'next/script';

// Meta Pixel (kanadavizesi.ca) — dataset ID 29066509096341745.
// ID herkese açık bir tanımlayıcıdır (sayfa kaynağında görünür); env değişkeni gerekmez.
const META_PIXEL_ID = '29066509096341745';

const PIXEL_SNIPPET = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;

export function MetaPixel() {
  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: PIXEL_SNIPPET }}
      />
      <noscript>
        {/* eslint-disable-next-line next/no-img-element -- 1x1 Meta tracking pixel must stay a plain <img> */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
