export const questions = {
  goal: {
    label: 'Kanada’daki temel hedefiniz',
    options: {
      visit: 'Ziyaret',
      study: 'Eğitim',
      work: 'Çalışma',
      permanent: 'Kalıcı oturum',
      unsure: 'Henüz emin değilim',
    },
  },
  age: {
    label: 'Yaş aralığınız',
    options: {
      '18-29': '18–29',
      '30-39': '30–39',
      '40-49': '40–49',
      '50+': '50 ve üzeri',
    },
  },
  education: {
    label: 'Tamamladığınız eğitim',
    options: {
      other: 'Lise altı / diğer',
      school: 'Lise',
      associate: 'Ön lisans',
      bachelor: 'Lisans',
      graduate: 'Yüksek lisans veya doktora',
    },
  },
  language: {
    label: 'İngilizce veya Fransızca seviyeniz',
    options: {
      beginner: 'Başlangıç',
      intermediate: 'Orta',
      good: 'İyi',
      advanced: 'İleri / sınav sonucum var',
    },
  },
  experience: {
    label: 'İş deneyiminiz',
    options: {
      none: 'Henüz yok',
      junior: '1–2 yıl',
      mid: '3–5 yıl',
      senior: '6 yıl veya üzeri',
    },
  },
  funds: {
    label: 'Planınız için mali hazırlığınız',
    options: {
      none: 'Henüz bütçe oluşturmadım',
      partial: 'Kısmen hazır',
      basic: 'Temel giderler için hazır',
      ready: 'Eğitim / yerleşim bütçem hazır',
    },
  },
} as const;
export type Answers = Record<keyof typeof questions, string>;
export type Assessment = Answers & {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: true;
};
export const emailPattern =
  /^[^\s@<>(),;:\\"[\]]+@[^\s@<>(),;:\\"[\]]+\.[^\s@<>(),;:\\"[\]]+$/;
export function validateAssessment(value: unknown): Assessment | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const string = (key: string) =>
    typeof data[key] === 'string' ? data[key].trim() : '';
  const name = string('name'),
    email = string('email'),
    phone = string('phone'),
    message = string('message');
  if (
    name.length < 2 ||
    name.length > 100 ||
    /[\r\n]/.test(name) ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    phone.length > 30 ||
    (phone && !/^[+\d\s().-]{7,30}$/.test(phone)) ||
    message.length > 2000 ||
    data.consent !== true
  )
    return null;
  const answers = {} as Answers;
  for (const key of Object.keys(questions) as (keyof Answers)[]) {
    const answer = string(key);
    if (!Object.hasOwn(questions[key].options, answer)) return null;
    answers[key] = answer;
  }
  return { ...answers, name, email, phone, message, consent: true };
}
export function assessmentEmail(data: Assessment) {
  return [
    'Yeni ön değerlendirme talebi',
    `Ad soyad: ${data.name}`,
    `E-posta: ${data.email}`,
    `Telefon: ${data.phone || 'Belirtilmedi'}`,
    ...Object.entries(questions).map(
      ([key, question]) =>
        `${question.label}: ${(question.options as Record<string, string>)[data[key as keyof Answers]]}`,
    ),
    `Ek bilgi: ${data.message || 'Belirtilmedi'}`,
    'Onay: Gizlilik politikası ve kullanım koşulları (12 Eylül 2026); talebin e-posta ile iletilmesi ve talep hakkında iletişim kurulması kabul edildi.',
    `Gönderim zamanı: ${new Date().toISOString()}`,
  ].join('\n\n');
}
