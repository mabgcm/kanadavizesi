import nodemailer from 'nodemailer';
import { checkBotId } from 'botid/server';
import { createHash } from 'node:crypto';
import {
  assessmentEmail,
  emailPattern,
  validateAssessment,
} from '@/lib/assessment';

export const runtime = 'nodejs';
export const maxDuration = 30;
// Best-effort per-instance protection; no raw IP addresses or form answers are stored.
const attempts = new Map<string, { count: number; expires: number }>();
const requests = new Map<string, { count: number; expires: number }>();
const submissions = new Map<string, number>();
const digest = (value: string) =>
  createHash('sha256').update(value).digest('hex');
const reply = (error: string, status: number) =>
  Response.json(
    { error },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
        ...(status === 429 ? { 'Retry-After': '900' } : {}),
      },
    },
  );
export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return reply('Geçersiz istek kaynağı.', 403);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return reply('Geçersiz içerik türü.', 415);
  if (request.headers.get('sec-fetch-site') === 'cross-site')
    return reply('Geçersiz istek kaynağı.', 403);
  const now = Date.now();
  for (const map of [requests, attempts]) {
    for (const [key, entry] of map) if (entry.expires <= now) map.delete(key);
  }
  for (const [key, expires] of submissions)
    if (expires <= now) submissions.delete(key);
  // Vercel overwrites this header at the edge; don't trust client-supplied IP headers.
  const ip =
    (process.env.VERCEL === '1'
      ? request.headers.get('x-vercel-forwarded-for')
      : request.headers.get('x-forwarded-for')
    )
      ?.split(',')[0]
      ?.trim() || 'unknown';
  const requestKey = digest(ip);
  const incoming = requests.get(requestKey);
  if ((incoming?.count || 0) >= 20 || requests.size >= 10000)
    return reply(
      'Çok fazla deneme yaptınız. Lütfen 15 dakika sonra tekrar deneyin.',
      429,
    );
  requests.set(requestKey, {
    count: (incoming?.count || 0) + 1,
    expires: incoming?.expires || now + 900000,
  });
  const reader = request.body?.getReader();
  if (!reader) return reply('Form verileri eksik.', 400);
  let body = '';
  let bytes = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16384) {
        await reader.cancel();
        return reply('Form çok uzun.', 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } catch {
    return reply('Form okunamadı.', 400);
  }
  let raw;
  try {
    raw = JSON.parse(body);
  } catch {
    return reply('Form verileri geçersiz.', 400);
  }
  if (raw?.website) return reply('Form gönderilemedi.', 400);
  const data = validateAssessment(raw);
  if (!data)
    return reply('Zorunlu alanları ve onay kutusunu kontrol edin.', 400);
  try {
    const verification = await checkBotId({
      advancedOptions: { checkLevel: 'basic' },
    });
    if (verification.isBot || verification.isHuman !== true)
      return reply(
        'Güvenlik doğrulaması başarısız oldu. Sayfayı yenileyip tekrar deneyin.',
        403,
      );
  } catch {
    return reply(
      'Güvenlik doğrulaması şu anda tamamlanamıyor. Lütfen daha sonra tekrar deneyin.',
      503,
    );
  }
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '');
  const to = process.env.ASSESSMENT_TO_EMAIL?.trim() || user;
  if (
    !user ||
    !emailPattern.test(user) ||
    !pass ||
    !to ||
    !emailPattern.test(to)
  )
    return reply(
      'Form gönderimi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin veya bilgi@kanadavizesi.ca adresine yazın.',
      503,
    );
  const submissionKey = digest(JSON.stringify(data));
  if (submissions.has(submissionKey))
    return reply(
      'Bu form kısa süre önce gönderildi veya hâlâ gönderiliyor. Lütfen tekrar göndermeyin.',
      409,
    );
  const keys = [ip, data.email.toLowerCase()].map((value) =>
    createHash('sha256').update(value).digest('hex'),
  );
  if (
    keys.some((key) => (attempts.get(key)?.count || 0) >= 3) ||
    attempts.size > 10000
  )
    return reply(
      'Çok fazla deneme yaptınız. Lütfen 15 dakika sonra tekrar deneyin.',
      429,
    );
  for (const key of keys) {
    const entry = attempts.get(key);
    attempts.set(key, {
      count: (entry?.count || 0) + 1,
      expires: entry?.expires || now + 900000,
    });
  }
  if (submissions.size >= 10000)
    return reply(
      'Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyin.',
      429,
    );
  submissions.set(submissionKey, now + 900000);
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail({
      from: { name: 'KanadaVizesi.ca', address: user },
      to,
      replyTo: { name: data.name, address: data.email },
      subject: 'Yeni ön değerlendirme talebi — KanadaVizesi.ca',
      text: assessmentEmail(data),
    });
    if (!result.accepted.length) throw new Error('Message rejected');
    return Response.json(
      { ok: true },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    submissions.delete(submissionKey);
    return reply(
      'Gönderim tamamlanamadı. Bilgileriniz formda duruyor; biraz sonra tekrar deneyin veya bilgi@kanadavizesi.ca adresine yazın.',
      502,
    );
  } finally {
    transport.close();
  }
}
