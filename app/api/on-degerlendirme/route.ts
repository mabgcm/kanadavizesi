import nodemailer from 'nodemailer';
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
const reply = (error: string, status: number) =>
  Response.json(
    { error },
    { status, headers: { 'Cache-Control': 'no-store' } },
  );
export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return reply('Geçersiz istek kaynağı.', 403);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return reply('Geçersiz içerik türü.', 415);
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
  const now = Date.now();
  for (const [key, entry] of attempts)
    if (entry.expires <= now) attempts.delete(key);
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
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
    return reply(
      'Gönderim tamamlanamadı. Bilgileriniz formda duruyor; biraz sonra tekrar deneyin veya bilgi@kanadavizesi.ca adresine yazın.',
      502,
    );
  } finally {
    transport.close();
  }
}
