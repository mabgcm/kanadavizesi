import { emailPattern } from '@/lib/assessment';

export const meetingQuestions = {
  callTime: {
    label: 'Size en uygun arama saati (Türkiye saatiyle)',
    options: {
      slot17: '17.00–18.00',
      slot18: '18.00–19.00',
      slot19: '19.00–20.00',
      slot20: '20.00–21.00',
      slot21: '21.00–22.00',
      slot22: '22.00–23.00',
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

export type MeetingVerdict = 'call' | 'review' | 'skip';
export type MeetingEvaluation = {
  score: number;
  verdict: MeetingVerdict;
  verdictLabel: string;
  reasons: string[];
};

const incomePoints: Record<string, number> = {
  low: 1,
  mid: 3,
  high: 4,
  top: 5,
};
const englishPoints: Record<string, number> = {
  none: 0,
  basic: 2,
  intermediate: 4,
  good: 5,
};
const timelinePoints: Record<string, number> = {
  month: 5,
  quarter: 4,
  halfYear: 3,
  unknown: 0,
};

/**
 * Görüşme formu değerlendirmesi (100 puan):
 * - Pasaport 10, seyahat geçmişi 10, Kanada geçmişi 5, engeller 15
 * - Bütçe 15, birikim 5, gelir 5, çalışma 10, işveren yazısı 5
 * - Bağlar 10, dil 5, zaman 5
 * Karar: 70+ ARA, 45–69 ÖNCE İNCELE, 45 altı ARAMA.
 * Pasaport yoksa doğrudan ARAMA; sabıka, ihlal veya bütçe yoksa en fazla ÖNCE İNCELE.
 */
export function evaluateMeetingForm(data: MeetingForm): MeetingEvaluation {
  let score = 0;
  const plus: string[] = [];
  const minus: string[] = [];

  if (data.passport === 'yes') score += 10;
  else minus.push('Pasaportu yok — vize başvurusu yapılamaz');

  if (data.traveled === 'yes') {
    score += 6;
    if (data.refused === 'no') {
      score += 4;
      plus.push('Yurt dışı geçmişi var, red almamış');
    } else {
      minus.push(`Vize reddi var (${data.refusalDetails}) — red mektubu istenmeli`);
    }
  } else {
    minus.push('Hiç yurt dışı geçmişi yok');
  }

  if (data.appliedBefore === 'no') score += 5;
  else if (data.canadaResult === 'approved') {
    score += 5;
    plus.push('Daha önce Kanada vizesi almış');
  } else if (data.canadaResult === 'waiting') score += 3;
  else minus.push('Daha önce Kanada vizesinden red almış');

  if (data.criminal === 'no') score += 8;
  else minus.push('Sabıka kaydı var');
  if (data.overstay === 'no') score += 7;
  else minus.push('Vize ihlali / sınır dışı geçmişi var');

  if (data.budget === 'ready') {
    score += 15;
    plus.push('Bütçe hazır');
  } else if (data.budget === 'partial') {
    score += 8;
    minus.push('Bütçe kısmen hazır');
  } else minus.push('Bütçe henüz yok');
  if (data.savings === 'yes') score += 5;
  else minus.push('Banka birikimi yok');
  score += incomePoints[data.income] ?? 0;

  if (data.employed === 'yes') {
    score += 10;
    if (data.employerLetter === 'yes') {
      score += 5;
      plus.push('İşveren yazısı alabiliyor');
    } else if (data.employerLetter === 'unknown') score += 2;
    else minus.push('İşveren yazısı alamıyor');
  } else {
    minus.push('Şu an çalışmıyor');
  }

  if (data.married === 'married' && data.familyStays === 'staying') {
    score += 6;
    plus.push('Eş/çocuk Türkiye’de kalıyor — güçlü dönüş bağı');
  } else if (data.married === 'married') score += 3;
  else score += 3;
  if (data.property === 'yes') {
    score += 4;
    plus.push('Üzerine kayıtlı ev/araç var');
  }

  score += englishPoints[data.english] ?? 0;
  score += timelinePoints[data.timeline] ?? 0;
  if (data.plan === 'unsure') minus.push('Hedefi belirsiz — ne istediğini bilmiyor');

  let verdict: MeetingVerdict;
  if (data.passport === 'no') verdict = 'skip';
  else if (score >= 70) verdict = 'call';
  else if (score >= 45) verdict = 'review';
  else verdict = 'skip';
  if (
    verdict === 'call' &&
    (data.criminal === 'yes' ||
      data.overstay === 'yes' ||
      data.budget === 'none')
  )
    verdict = 'review';

  const verdictLabel =
    verdict === 'call' ? 'ARA' : verdict === 'review' ? 'ÖNCE İNCELE' : 'ARAMA';
  const reasons =
    verdict === 'call'
      ? [...plus.slice(0, 3), ...minus.slice(0, 2)]
      : [...minus.slice(0, 4), ...plus.slice(0, 2)];
  return { score, verdict, verdictLabel, reasons };
}

export function meetingFormEmail(data: MeetingForm) {
  const evaluation = evaluateMeetingForm(data);
  const q = meetingQuestions as Record<
    string,
    { label: string; options: Record<string, string> }
  >;
  const line = (key: OptionKey) =>
    `${q[key].label}: ${q[key].options[data[key]]}`;
  const lines = [
    'GÖRÜŞME FORMU DEĞERLENDİRMESİ',
    `Karar: ${evaluation.verdictLabel} — ${evaluation.score}/100`,
    ...evaluation.reasons.map((reason) => `• ${reason}`),
    '',
    'CEVAPLAR',
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
