import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import nodemailer from 'nodemailer';
import { validateAssessment, assessmentEmail } from '../lib/assessment.ts';

const valid = {
  name: 'Test Kullanıcı',
  email: 'test@example.com',
  phone: '',
  message: '',
  goal: 'study',
  age: '30-39',
  education: 'bachelor',
  language: 'good',
  experience: 'mid',
  funds: 'ready',
  consent: true,
};
test('validates consent, contact fields, all selections and length limits', () => {
  assert.ok(validateAssessment(valid));
  for (const patch of [
    { consent: false },
    { email: 'test@example.com\r\nBcc:evil@example.com' },
    { name: 'A' },
    { age: '99' },
    { goal: '__proto__' },
    { message: 'x'.repeat(2001) },
    { phone: 'invalid' },
  ])
    assert.equal(validateAssessment({ ...valid, ...patch }), null);
  for (const key of Object.keys(valid).filter(
    (k) => !['phone', 'message'].includes(k),
  ))
    assert.equal(validateAssessment({ ...valid, [key]: undefined }), null);
});
test('email contains readable answers and consent without numeric scoring', () => {
  const text = assessmentEmail(valid);
  assert.match(text, /Eğitim/);
  assert.match(text, /Lisans/);
  assert.match(text, /12 Eylül 2026/);
  assert.match(text, /test@example.com/);
});
test('API validates requests and handles SMTP acceptance, failures and rate limits', async () => {
  const source = (
    await readFile(
      new URL('../app/api/on-degerlendirme/route.ts', import.meta.url),
      'utf8',
    )
  )
    .replace(
      "'@/lib/assessment'",
      JSON.stringify(new URL('../lib/assessment.ts', import.meta.url).href),
    )
    .replace("'nodemailer'", JSON.stringify(import.meta.resolve('nodemailer')));
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const { POST } = await import(
    `data:text/javascript;base64,${Buffer.from(js).toString('base64')}`
  );
  const send = (data, headers = {}) =>
    POST(
      new Request('http://localhost/api/on-degerlendirme', {
        method: 'POST',
        headers: {
          origin: 'http://localhost',
          'content-type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      }),
    );
  assert.equal(
    (await send(valid, { origin: 'https://evil.example' })).status,
    403,
  );
  assert.equal(
    (await send(valid, { 'content-type': 'text/plain' })).status,
    415,
  );
  assert.equal((await send({ ...valid, consent: false })).status, 400);
  assert.equal((await send({ ...valid, website: 'bot' })).status, 400);
  assert.equal(
    (await send({ ...valid, message: 'x'.repeat(17000) })).status,
    413,
  );
  const saved = { ...process.env };
  const original = nodemailer.createTransport;
  try {
    delete process.env.GMAIL_USER;
    delete process.env.GMAIL_APP_PASSWORD;
    assert.equal((await send(valid)).status, 503);
    process.env.GMAIL_USER = 'sender@example.com';
    process.env.GMAIL_APP_PASSWORD = 'fake-test-password';
    process.env.ASSESSMENT_TO_EMAIL = 'inbox@example.com';
    let mail;
    nodemailer.createTransport = () => ({
      sendMail: async (value) => {
        mail = value;
        return { accepted: ['inbox@example.com'] };
      },
      close() {},
    });
    assert.equal((await send(valid)).status, 200);
    assert.equal(mail.to, 'inbox@example.com');
    assert.equal(mail.from.address, 'sender@example.com');
    assert.equal(mail.replyTo.address, valid.email);
    nodemailer.createTransport = () => ({
      sendMail: async () => {
        throw new Error('SMTP secret');
      },
      close() {},
    });
    const failure = await send(valid);
    assert.equal(failure.status, 502);
    assert.doesNotMatch(await failure.text(), /SMTP secret/);
    nodemailer.createTransport = () => ({
      sendMail: async () => ({ accepted: [] }),
      close() {},
    });
    assert.equal((await send(valid)).status, 502);
    assert.equal((await send(valid)).status, 429);
  } finally {
    nodemailer.createTransport = original;
    for (const key of [
      'GMAIL_USER',
      'GMAIL_APP_PASSWORD',
      'ASSESSMENT_TO_EMAIL',
    ]) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
});
