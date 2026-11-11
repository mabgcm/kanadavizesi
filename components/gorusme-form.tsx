'use client';

import { type SubmitEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { meetingQuestions } from '@/lib/gorusme-formu';
import styles from './assessment-form.module.css';

function Select({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: Record<string, string>;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label>
      {label}
      <select
        name={name}
        required
        defaultValue=""
        value={value}
        onChange={
          onChange ? (e) => onChange(e.target.value) : undefined
        }
      >
        <option value="" disabled>
          Seçin
        </option>
        {Object.entries(options).map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

export function GorusmeForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const [traveled, setTraveled] = useState('');
  const [refused, setRefused] = useState('');
  const [appliedBefore, setAppliedBefore] = useState('');
  const [employed, setEmployed] = useState('');
  const [married, setMarried] = useState('');
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
      const response = await fetch('/api/gorusme-formu', {
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
  const q = meetingQuestions;
  return (
    <div className={styles.layout}>
      <div aria-live="polite">
        {status === 'sent' ? (
          <section className={styles.result}>
            <h2>Talebiniz gönderildi</h2>
            <p>
              Görüşme talebiniz ekibimize e-posta ile iletildi. Belirttiğiniz
              iletişim bilgileri ve uygun saat üzerinden size ulaşabiliriz.
            </p>
            <Link href="/rehberler">Kanada rehberlerini inceleyin</Link>
          </section>
        ) : (
          <form
            className={styles.form}
            onSubmit={submit}
            aria-busy={status === 'sending'}
          >
            <div className={styles.sectionHeading}>
              <span>01</span>
              <div>
                <h2>İletişim bilgileriniz</h2>
                <p>Size ulaşabileceğimiz bilgileri paylaşın.</p>
              </div>
            </div>
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
            <label className={styles.wide}>
              WhatsApp numarası
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={30}
                pattern={String.raw`[+0-9\s\(\).\-]{7,30}`}
                placeholder="+90 5xx xxx xx xx"
              />
            </label>
            <Select
              name="callTime"
              label={q.callTime.label}
              options={q.callTime.options}
            />
            <Select
              name="source"
              label={q.source.label}
              options={q.source.options}
            />
            <div className={styles.sectionHeading}>
              <span>02</span>
              <div>
                <h2>Kanada planınız</h2>
                <p>Amacınıza en yakın seçeneği işaretleyin.</p>
              </div>
            </div>
            <Select
              name="plan"
              label={q.plan.label}
              options={q.plan.options}
            />
            <div className={styles.sectionHeading}>
              <span>03</span>
              <div>
                <h2>Seyahat geçmişiniz</h2>
                <p>
                  Cevabınıza göre ilgili sorular açılır; size uymayan sorular
                  sorulmaz.
                </p>
              </div>
            </div>
            <Select
              name="traveled"
              label={q.traveled.label}
              options={q.traveled.options}
              value={traveled}
              onChange={(v) => {
                setTraveled(v);
                if (v !== 'yes') setRefused('');
              }}
            />
            {traveled === 'yes' ? (
              <>
                <label>
                  Hangi ülkelere gittiniz?
                  <input
                    name="countries"
                    required
                    maxLength={300}
                    placeholder="Örn. Almanya, Fransa, ABD"
                  />
                </label>
                <Select
                  name="refused"
                  label={q.refused.label}
                  options={q.refused.options}
                  value={refused}
                  onChange={setRefused}
                />
              </>
            ) : null}
            {traveled === 'yes' && refused === 'yes' ? (
              <label className={styles.wide}>
                Hangi ülkelerden, ne zaman red aldınız?
                <input
                  name="refusalDetails"
                  required
                  maxLength={300}
                  placeholder="Örn. ABD, 2023; Schengen, 2024"
                />
              </label>
            ) : null}
            <Select
              name="appliedBefore"
              label={q.appliedBefore.label}
              options={q.appliedBefore.options}
              value={appliedBefore}
              onChange={setAppliedBefore}
            />
            {appliedBefore === 'yes' ? (
              <Select
                name="canadaResult"
                label={q.canadaResult.label}
                options={q.canadaResult.options}
              />
            ) : null}
            <div className={styles.sectionHeading}>
              <span>04</span>
              <div>
                <h2>Vize engelleri</h2>
                <p>
                  Bu sorular, başvurunuzun önünde engel olup olmadığını
                  anlamak içindir.
                </p>
              </div>
            </div>
            <Select
              name="passport"
              label={q.passport.label}
              options={q.passport.options}
            />
            <Select
              name="criminal"
              label={q.criminal.label}
              options={q.criminal.options}
            />
            <Select
              name="overstay"
              label={q.overstay.label}
              options={q.overstay.options}
            />
            <div className={styles.sectionHeading}>
              <span>05</span>
              <div>
                <h2>Bütçe ve gelir</h2>
                <p>Mali durumunuza en yakın seçenekleri işaretleyin.</p>
              </div>
            </div>
            <Select
              name="budget"
              label={q.budget.label}
              options={q.budget.options}
            />
            <Select
              name="savings"
              label={q.savings.label}
              options={q.savings.options}
            />
            <Select
              name="income"
              label={q.income.label}
              options={q.income.options}
            />
            <div className={styles.sectionHeading}>
              <span>06</span>
              <div>
                <h2>Meslek ve bağlar</h2>
                <p>
                  Mesleğiniz ve Türkiye’deki bağlarınız, dosyanızın
                  değerlendirilmesinde önemlidir.
                </p>
              </div>
            </div>
            <label>
              Mesleğiniz nedir?
              <input
                name="profession"
                required
                minLength={2}
                maxLength={100}
                placeholder="Örn. aşçı, elektrik teknisyeni, öğretmen"
              />
            </label>
            <Select
              name="employed"
              label={q.employed.label}
              options={q.employed.options}
              value={employed}
              onChange={setEmployed}
            />
            {employed === 'yes' ? (
              <Select
                name="employerLetter"
                label={q.employerLetter.label}
                options={q.employerLetter.options}
              />
            ) : null}
            <Select
              name="married"
              label={q.married.label}
              options={q.married.options}
              value={married}
              onChange={setMarried}
            />
            {married === 'married' ? (
              <Select
                name="familyStays"
                label={q.familyStays.label}
                options={q.familyStays.options}
              />
            ) : null}
            <Select
              name="property"
              label={q.property.label}
              options={q.property.options}
            />
            <div className={styles.sectionHeading}>
              <span>07</span>
              <div>
                <h2>Dil ve zaman</h2>
                <p>Son olarak dil seviyenizi ve hedefinizi belirtin.</p>
              </div>
            </div>
            <Select
              name="english"
              label={q.english.label}
              options={q.english.options}
            />
            <Select
              name="timeline"
              label={q.timeline.label}
              options={q.timeline.options}
            />
            <label className={styles.wide}>
              Eklemek istedikleriniz (isteğe bağlı)
              <textarea
                name="message"
                rows={4}
                maxLength={2000}
                placeholder="Planınızı veya sorunuzu kısaca paylaşın."
              />
            </label>
            <p className={styles.note}>
              Bu form 18 yaş ve üzeri kullanıcılar içindir. Pasaport,
              kimlik numarası, banka bilgisi veya sağlık bilgisi paylaşmayın.
            </p>
            <div className={styles.trap} hidden aria-hidden="true">
              <label>
                Web sitesi
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className={styles.consent}>
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
                ’nı kabul ediyorum. Bilgilerimin görüşme talebim için e-posta
                ile ekibe iletilmesine ve bu talep hakkında benimle iletişim
                kurulmasına onay veriyorum.
              </span>
            </label>
            {error ? (
              <p className={styles.error} role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Gönderiliyor…' : 'Görüşme talebini gönder'}
            </button>
            <p className={styles.note}>
              Gönderimler otomatik spam ve bot kontrolünden geçirilir.
            </p>
            <p className={styles.note}>
              Bilgileriniz yalnızca talebinizi değerlendirmek ve yanıtlamak
              için gönderilir. Pazarlama aboneliği oluşturulmaz.
            </p>
          </form>
        )}
      </div>
      <aside className={styles.help}>
        <h2>Nasıl ilerliyor?</h2>
        <p>
          Kanada planınızı ve iletişim bilgilerinizi paylaşın. Yanıtlarınız
          görüşme talebiniz için ekibimize iletilsin.
        </p>
        <ul>
          <li>Amacınızı ve durumunuzu belirtin.</li>
          <li>Ekibimiz talebinizi inceleyebilsin.</li>
          <li>Belirttiğiniz saatte size ulaşılabilsin.</li>
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
