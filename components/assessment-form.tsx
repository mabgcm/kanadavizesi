'use client';

import { type SubmitEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { questions } from '@/lib/assessment';

export function AssessmentForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const busy = useRef(false);
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    busy.current = true;
    setStatus('sending');
    setError('');
    try {
      const response = await fetch('/api/on-degerlendirme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, consent: values.consent === 'on' }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok)
        throw new Error(
          result.error || 'Gönderim tamamlanamadı. Lütfen tekrar deneyin.',
        );
      setStatus('sent');
      form.reset();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Bağlantı kurulamadı. Lütfen tekrar deneyin.',
      );
      setStatus('idle');
    } finally {
      busy.current = false;
    }
  }
  return (
    <div className="assessment-layout">
      <div aria-live="polite">
        {status === 'sent' ? (
          <section className="assessment-result">
            <h2>Talebiniz gönderildi</h2>
            <p>
              Ön değerlendirme bilgileriniz ekibimize e-posta ile iletildi.
              Talebiniz hakkında belirttiğiniz iletişim bilgileri üzerinden size
              ulaşabiliriz.
            </p>
            <p>
              Bu gönderim bir vize başvurusu değildir ve uygunluk kararı
              içermez.
            </p>
            <Link href="/rehberler">Kanada rehberlerini inceleyin</Link>
          </section>
        ) : (
          <form
            className="assessment-form"
            onSubmit={submit}
            aria-busy={status === 'sending'}
          >
            <label>
              Ad soyad
              <input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
              />
            </label>
            <label>
              E-posta adresiniz
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
            <label className="form-wide">
              Telefon (isteğe bağlı)
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={30}
                pattern={String.raw`[+0-9\s\(\).\-]{7,30}`}
                placeholder="+90 5xx xxx xx xx"
              />
            </label>
            {Object.entries(questions).map(([key, question]) => (
              <label key={key}>
                {question.label}
                <select name={key} required defaultValue="">
                  <option value="" disabled>
                    Seçin
                  </option>
                  {Object.entries(question.options).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <label className="form-wide">
              Eklemek istedikleriniz (isteğe bağlı)
              <textarea
                name="message"
                rows={4}
                maxLength={2000}
                placeholder="Planınızı veya sorunuzu kısaca paylaşın."
              />
            </label>
            <p className="form-note">
              Bu form 18 yaş ve üzeri kullanıcılar içindir. Pasaport, kimlik
              numarası, banka bilgisi veya sağlık bilgisi paylaşmayın.
            </p>
            <div className="form-trap" aria-hidden="true">
              <label>
                Web sitesi
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className="form-consent">
              <input type="checkbox" name="consent" required />
              <span>
                <Link
                  href="/gizlilik"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gizlilik Politikası
                </Link>
                ’nı okudum,{' '}
                <Link
                  href="/kullanim-kosullari"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kullanım Koşulları
                </Link>
                ’nı kabul ediyorum. Bilgilerimin ön değerlendirme talebim için
                Gmail üzerinden ekibe iletilmesine ve bu talep hakkında benimle
                iletişim kurulmasına onay veriyorum.
              </span>
            </label>
            {error ? (
              <p className="form-error" role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" disabled={status === 'sending'}>
              {status === 'sending'
                ? 'Gönderiliyor…'
                : 'Ön değerlendirme talebini gönder'}
            </button>
            <p className="form-note">
              Bilgileriniz yalnızca talebinizi değerlendirmek ve yanıtlamak için
              gönderilir. Pazarlama aboneliği oluşturulmaz.
            </p>
          </form>
        )}
      </div>
      <aside className="assessment-help">
        <h2>Nasıl ilerliyor?</h2>
        <p>
          Kanada planınızı ve iletişim bilgilerinizi paylaşın. Yanıtlarınız ön
          değerlendirme için ekibimize iletilsin.
        </p>
        <ul>
          <li>Hedefinizi ve hazırlık durumunuzu belirtin.</li>
          <li>Ekibimiz talebinizi inceleyebilsin.</li>
          <li>İletişim bilgileriniz üzerinden geri dönüş alabilin.</li>
        </ul>
        <p>
          Form, resmi uygunluk puanı hesaplamaz. Vize veya kabul garantisi
          vermez.
        </p>
        <Link href="/rehberler">Bu sırada rehberleri inceleyin</Link>
      </aside>
    </div>
  );
}
