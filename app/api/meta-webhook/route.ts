import nodemailer from 'nodemailer';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { emailPattern } from '@/lib/assessment';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// Meta webhook receiver for Instagram DMs (kanadavizesi.ca assistant bot).
//
// Why this exists: replying to an Instagram DM requires the
// Instagram-scoped ID (IGSID), which Meta only delivers inside webhook
// events as sender.id. The Conversations API returns the Instagram user
// ID instead, and the send endpoint rejects it (error 100/2534014).
// This route captures webhook events and forwards them to the bot
// operator's mailbox; the bot polls that mailbox, matches each event to
// the message it already read via the Conversations API (same text,
// close timestamp), and replies using the IGSID.
//
// Security notes:
// - No BotID, origin, or sec-fetch checks: Meta calls this endpoint
//   server-to-server from its own infrastructure. Authentication is the
//   X-Hub-Signature-256 HMAC over the raw body (META_APP_SECRET).
// - When META_APP_SECRET is unset, events are accepted with a warning
//   (setup interim only). Forged events are harmless on their own: the
//   bot only uses an IGSID when it matches a real message it read via
//   the Conversations API.
// - Message text is never logged. It travels only inside the operator
//   email, the same channel the assessment forms already use.

// Instagram business account id for kanadavizesi.ca. A public
// identifier, not a secret.
const IG_ACCOUNT_ID = '17841458289516899';
const MAX_BODY_BYTES = 65536;
// Per-instance dedupe for Meta retries (same mid delivered twice).
const seenMids = new Map<string, number>();

type WebhookEvent = {
  igsid: string;
  mid: string;
  text: string;
  timestampMs: number;
};

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  return aBuf.length === bBuf.length && timingSafeEqual(aBuf, bBuf);
}

function noStoreJson(body: unknown, status: number): Response {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

async function readRawBody(request: Request): Promise<string | null> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  let body = '';
  let bytes = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    return body;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function extractEvents(payload: unknown, now: number): WebhookEvent[] {
  const events: WebhookEvent[] = [];
  if (!isRecord(payload) || !Array.isArray(payload.entry)) return events;
  for (const entry of payload.entry) {
    if (!isRecord(entry) || !Array.isArray(entry.messaging)) continue;
    for (const item of entry.messaging) {
      if (!isRecord(item)) continue;
      const sender = isRecord(item.sender) ? item.sender : null;
      const recipient = isRecord(item.recipient) ? item.recipient : null;
      const message = isRecord(item.message) ? item.message : null;
      const igsid = sender && typeof sender.id === 'string' ? sender.id : '';
      const recipientId =
        recipient && typeof recipient.id === 'string' ? recipient.id : '';
      const text =
        message && typeof message.text === 'string' ? message.text : '';
      const mid = message && typeof message.mid === 'string' ? message.mid : '';
      const timestampMs =
        typeof item.timestamp === 'number' ? item.timestamp : 0;
      // Only inbound text messages addressed to the kanadavizesi.ca
      // Instagram account. Echoes (our own sends), delivery receipts,
      // and Messenger events (different recipient id) are ignored.
      if (
        !igsid ||
        recipientId !== IG_ACCOUNT_ID ||
        !mid ||
        !text.trim() ||
        message?.is_echo === true
      ) {
        continue;
      }
      if (seenMids.has(mid)) continue;
      events.push({ igsid, mid, text: text.trim(), timestampMs });
    }
  }
  for (const [mid, expires] of seenMids) {
    if (expires <= now) seenMids.delete(mid);
  }
  if (seenMids.size >= 10000) seenMids.clear();
  for (const event of events) {
    seenMids.set(event.mid, now + 900000);
  }
  return events;
}

// Meta verification handshake: GET with hub.mode=subscribe,
// hub.verify_token, hub.challenge. The challenge is echoed back only
// when the token matches META_WEBHOOK_VERIFY_TOKEN.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');
  const expected = process.env.META_WEBHOOK_VERIFY_TOKEN?.trim();
  if (
    mode === 'subscribe' &&
    challenge &&
    expected &&
    token &&
    safeEqual(token, expected)
  ) {
    return new Response(challenge, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store',
      },
    });
  }
  return new Response('Verification failed', {
    status: 403,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request) {
  const rawBody = await readRawBody(request);
  if (rawBody === null)
    return noStoreJson({ error: 'Gövde okunamadı.' }, 400);
  const appSecret = process.env.META_APP_SECRET?.trim();
  if (appSecret) {
    const signature = request.headers.get('x-hub-signature-256') ?? '';
    const expected =
      'sha256=' +
      createHmac('sha256', appSecret).update(rawBody).digest('hex');
    if (!signature.startsWith('sha256=') || !safeEqual(signature, expected)) {
      return noStoreJson({ error: 'Geçersiz imza.' }, 403);
    }
  } else {
    console.warn(
      'meta-webhook: META_APP_SECRET unset, accepting without signature check',
    );
  }
  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return noStoreJson({ error: 'Geçersiz JSON.' }, 400);
  }
  const events = extractEvents(payload, Date.now());
  if (!events.length) return noStoreJson({ ok: true }, 200);
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '');
  const to = process.env.ASSESSMENT_TO_EMAIL?.trim() || user;
  if (
    !user ||
    !emailPattern.test(user) ||
    !pass ||
    !to ||
    !emailPattern.test(to)
  ) {
    return noStoreJson({ error: 'E-posta gönderimi kullanılamıyor.' }, 503);
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
      subject: `IG webhook event (${events.length})`,
      text: JSON.stringify(events),
    });
    if (!result.accepted.length) throw new Error('Message rejected');
    return noStoreJson({ ok: true }, 200);
  } catch {
    // 502 so Meta retries; the bot dedupes by mid.
    return noStoreJson({ error: 'Olay iletilemedi.' }, 502);
  } finally {
    transport.close();
  }
}
