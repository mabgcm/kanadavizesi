import { emailPattern } from '@/lib/assessment';

export const meetingQuestions = {
  callTime: {
    label: 'Size en uygun arama saati',
    options: {
      morning: 'Sabah (09.00–12.00)',
      noon: 'Öğlen (12.00–15.00)',
      afternoon: 'İkindi (15.00–18.00)',
      evening: 'Akşam (18.00–21.00)',
    },
  },
  source: {
    label: 'Bizi nereden duydunuz?',
    options: {
      instagram: 'Instagram',
      facebook: 'Facebook',
      google: 'Google araması',
      referral: 'Tavsiye üzerine',
      other: 'Diğer',
    },
  },
  plan: {
    label: 'Kanada’ya neden gitmek istiyorsunuz?',
    options: {
      visit: 'Turistik ziyaret',
      family: 'Aile ziyareti',
      study: 'Eğitim',
      work: 'Çalışma',
      settle: 'Kanada’da yaşamak istiyorum',
      unsure: 'Emin değilim',
    },
  },
  traveled: {
    label: 'Daha önce hiç yurt dışına çıktınız mı?',
    options: { yes: 'Evet', no: 'Hayır' },
  },
  refused: {
    label: 'Hiç vize reddi aldınız mı?',
    options: { yes: 'Evet', no: 'Hayır' },
  },
  appliedBefore: {
    label: 'Daha önce Kanada vizesine başvurdunuz mu?',
    options: { yes: 'Evet', no: 'Hayır' },
  },
  canadaResult: {
    label: 'Başvurunuzun sonucu ne oldu?',
    options: {
      approved: 'Onaylandı',
      refused: 'Reddedildi',
      waiting: 'Hâlâ bekliyor',
    },
  },
  passport: {
    label: 'Pasaportunuz var mı?',
    options: { yes: 'Var', no: 'Yok' },
  },
  criminal: {
    label: 'Sabıka kaydınız var mı?',
    options: { yes: 'Evet', no: 'Hayır' },
  },
  overstay: {
    label:
      'Daha önce herhangi bir ülkede vizenizi aşıp kaldınız mı veya sınır dışı edildiniz mi?',
    options: { yes: 'Evet', no: 'Hayır' },
  },
  budget: {
    label: 'Kanada planınız için ayırabileceğiniz bütçe hazır mı?',
    options: {
      ready: 'Hazır',
      partial: 'Kısmen hazır',
      none: 'Henüz yok',
    },
  },
  savings: {
    label: 'Banka hesabınızda birikiminiz var mı?',
    options: { yes: 'Var', no: 'Yok' },
  },
  income: {
    label: 'Aylık gelir aralığınız nedir?',
    options: {
      low: '50.000 TL altı',
      mid: '50.000–100.000 TL',
      high: '100.000–200.000 TL',
      top: '200.000 TL üzeri',
    },
  },
  employed: {
    label: 'Şu an çalışıyor musunuz?',
    options: { yes: 'Çalışıyorum', no: 'Çalışmıyorum' },
  },
  employerLetter: {
    label: 'İşvereninizden izin yazısı alabilir misiniz?',
    options: { yes: 'Evet', no: 'Hayır', unknown: 'Bilmiyorum' },
  },
  married: {
    label: 'Medeni durumunuz nedir?',
    options: { married: 'Evli', single: 'Bekâr' },
  },
  familyStays: {
    label: 'Eşiniz ve çocuklarınız Türkiye’de mi kalacak?',
    options: {
      staying: 'Evet, Türkiye’de kalacaklar',
      coming: 'Hayır, benimle gelecekler',
    },
  },
  property: {
    label: 'Üzerinize kayıtlı ev veya araç var mı?',
    options: { yes: 'Var', no: 'Yok' },
  },
  english: {
    label: 'İngilizce seviyeniz nedir?',
    options: {
      none: 'Hiç bilmiyorum',
      basic: 'Biraz biliyorum',
      intermediate: 'Orta',
      good: 'İyi',
    },
  },
  timeline: {
    label: 'Ne zaman gitmek istiyorsunuz?',
    options: {
      month: '1 ay içinde',
      quarter: '3 ay içinde',
      halfYear: '6 ay içinde',
      unknown: 'Tarih belli değil',
    },
  },
} as const;

type OptionKey = keyof typeof meetingQuestions;
type Answers = { [K in OptionKey]: string };

export type MeetingForm = Answers & {
  name: string;
  email: string;
  phone: string;
  countries: string;
  refusalDetails: string;
  profession: string;
  message: string;
  consent: true;
};

const pick = (
  data: Record<string, unknown>,
  key: OptionKey,
): string | null => {
  const value = typeof data[key] === 'string' ? data[key].trim() : '';
  if (!Object.hasOwn(meetingQuestions[key].options, value)) return null;
  return value;
};

export function validateMeetingForm(value: unknown): MeetingForm | null {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    return null;
  const data = value as Record<string, unknown>;
  const string = (key: string) =>
    typeof data[key] === 'string' ? data[key].trim() : '';
  const name = string('name');
  const email = string('email');
  const phone = string('phone');
  const countries = string('countries');
  const refusalDetails = string('refusalDetails');
  const profession = string('profession');
  const message = string('message');
  if (
    name.length < 2 ||
    name.length > 100 ||
    /[\r\n]/.test(name) ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    phone.length < 7 ||
    phone.length > 30 ||
    !/^[+\d\s().-]{7,30}$/.test(phone) ||
    profession.length < 2 ||
    profession.length > 100 ||
    countries.length > 300 ||
    refusalDetails.length > 300 ||
    message.length > 2000 ||
    data.consent !== true
  )
    return null;
  const answers = {} as Answers;
  for (const key of Object.keys(meetingQuestions) as OptionKey[]) {
    const picked = pick(data, key);
    if (picked === null) {
      // Koşullu sorular: yalnızca üst sorunun cevabı gerektirdiğinde zorunlu.
      if (key === 'refused' && answers.traveled !== 'yes') continue;
      if (key === 'canadaResult' && answers.appliedBefore !== 'yes') continue;
      if (key === 'employerLetter' && answers.employed !== 'yes') continue;
      if (key === 'familyStays' && answers.married !== 'married') continue;
      return null;
    }
    answers[key] = picked;
  }
  if (answers.traveled === 'yes' && countries.length < 2) return null;
  if (answers.refused === 'yes' && refusalDetails.length < 2) return null;
  return {
    ...answers,
    name,
    email,
    phone,
    countries,
    refusalDetails,
    profession,
    message,
    consent: true,
  };
}

export function meetingFormEmail(data: MeetingForm) {
  const q = meetingQuestions as Record<
    string,
    { label: string; options: Record<string, string> }
  >;
  const line = (key: OptionKey) =>
    `${q[key].label}: ${q[key].options[data[key]]}`;
  const lines = [
    'Yeni görüşme formu talebi',
    `Ad soyad: ${data.name}`,
    `E-posta: ${data.email}`,
    `WhatsApp numarası: ${data.phone}`,
    line('callTime'),
    line('source'),
    line('plan'),
    line('traveled'),
  ];
  if (data.traveled === 'yes') {
    lines.push(`Gittiği ülkeler: ${data.countries}`);
    lines.push(line('refused'));
    if (data.refused === 'yes')
      lines.push(`Red aldığı ülkeler: ${data.refusalDetails}`);
  }
  lines.push(line('appliedBefore'));
  if (data.appliedBefore === 'yes') lines.push(line('canadaResult'));
  lines.push(line('passport'), line('criminal'), line('overstay'));
  lines.push(line('budget'), line('savings'), line('income'));
  lines.push(`Meslek: ${data.profession}`);
  lines.push(line('employed'));
  if (data.employed === 'yes') lines.push(line('employerLetter'));
  lines.push(line('married'));
  if (data.married === 'married') lines.push(line('familyStays'));
  lines.push(line('property'), line('english'), line('timeline'));
  lines.push(`Ek bilgi: ${data.message || 'Belirtilmedi'}`);
  lines.push(
    'Onay: Gizlilik politikası ve kullanım koşulları (12 Eylül 2026); talebin e-posta ile iletilmesi ve talep hakkında iletişim kurulması kabul edildi.',
    `Gönderim zamanı: ${new Date().toISOString()}`,
  );
  return lines.join('\n\n');
}
