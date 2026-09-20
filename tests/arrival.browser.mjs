// Supply existing test tooling through PLAYWRIGHT_MODULE and AXE_SCRIPT.
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
import assert from 'node:assert/strict';
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH,
  headless: true,
});
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const url = new URL(
  '/kanadada-yasam/ilk-90-gun',
  process.env.SEO_BASE_URL || 'http://localhost:3100',
).href;
const redirect = await page.request.get(url, { maxRedirects: 0 });
assert.equal(redirect.status(), 308);
assert.equal(redirect.headers().location, '/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun');
await page.goto(url);
assert.equal(new URL(page.url()).pathname, '/kanadada-yasam/kanadada-yasam-ve-ilk-90-gun');
await page.waitForLoadState('networkidle');
assert.equal(await page.locator('h1').count(), 1);
assert.equal(await page.locator('.arrival-checklist input').count(), 26);
for (const width of [375, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 950 });
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    `overflow ${width}`,
  );
  await page.addScriptTag({
    path: process.env.AXE_SCRIPT || 'node_modules/axe-core/axe.min.js',
  });
  const results = await page.evaluate(
    async () =>
      await axe.run(document.querySelector('main'), {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
      }),
  );
  console.log(
    'AXE',
    width,
    JSON.stringify(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    ),
  );
  assert.equal(results.violations.length, 0, `Accessibility at ${width}px`);
}
for (const label of ['Daimi oturum sahibi', 'Çalışma izni sahibi', 'Uluslararası öğrenci', 'Ziyaretçi', 'Henüz Kanada’ya gelmedim']) {
  await page.getByRole('button', { name: label, exact: true }).click();
  const plan = page.locator('.arrival-starting-plan');
  assert((await plan.innerText()).includes(label + ' için başlangıç'));
  assert.equal(await plan.locator('a').count(), 3);
  for (const link of await plan.locator('a').all()) {
    assert.equal(await page.locator(await link.getAttribute('href')).count(), 1);
  }
}
assert.equal(await page.locator('.arrival-task.is-muted').count(), 0);
await page.getByRole('button', { name: 'Tümünü göster', exact: true }).click();
assert.equal(await page.locator('.arrival-starting-plan a').count(), 0);
await page.getByRole('button', { name: 'Ziyaretçi', exact: true }).click();
assert((await page.locator('.arrival-task.is-muted').count()) > 0);
assert.equal(
  await page.locator('.arrival-table thead [data-selected="true"]').innerText(),
  'Ziyaretçi\nSeçili statü',
);
assert(
  await page.getByRole('heading', { name: 'SIN başvurusu yapın' }).isVisible(),
);
await page.locator('.arrival-checklist input').first().check();
await page.reload();
await page.waitForLoadState('networkidle');
assert.equal(
  await page
    .getByRole('button', { name: 'Ziyaretçi', exact: true })
    .getAttribute('aria-pressed'),
  'true',
);
assert(await page.locator('.arrival-checklist input').first().isChecked());
page.once('dialog', (d) => d.dismiss());
await page.getByRole('button', { name: 'Listeyi sıfırla' }).click();
assert(await page.locator('.arrival-checklist input').first().isChecked());
page.once('dialog', (d) => d.accept());
await page.getByRole('button', { name: 'Listeyi sıfırla' }).click();
assert(!(await page.locator('.arrival-checklist input').first().isChecked()));
await page.setViewportSize({ width: 375, height: 900 });
const toc = page.getByRole('button', { name: 'Bu rehberde', exact: false });
await toc.focus();
await page.keyboard.press('Enter');
assert.equal(
  await page
    .locator('.guide-mobile-drawer-toggle')
    .getAttribute('aria-expanded'),
  'true',
);
await page.locator('.guide-mobile-drawer-panel a').first().click();
assert.equal(await toc.getAttribute('aria-expanded'), 'false');
await page.locator('.arrival-checklist input').first().focus();
await page.keyboard.press('Space');
assert(await page.locator('.arrival-checklist input').first().isChecked());
await page.emulateMedia({ media: 'print' });
assert(!(await page.locator('.arrival-actions').isVisible()));
assert.equal(
  await page.locator('.guide-faq section > div:visible').count(),
  10,
);
await page.emulateMedia({ media: 'screen' });
await page.evaluate(() => {
  localStorage.setItem('arrival-status-v1', 'invalid JSON');
  localStorage.setItem('arrival-checklist-v1', '["bad-id",2]');
});
await page.reload();
assert.equal(
  await page
    .getByRole('button', { name: 'Tümünü göster', exact: true })
    .getAttribute('aria-pressed'),
  'true',
);
assert.equal(await page.locator('.arrival-checklist input:checked').count(), 0);
await context.close();
const nojs = await browser.newContext({ javaScriptEnabled: false });
const staticPage = await nojs.newPage();
await staticPage.goto(url);
assert.equal(await staticPage.locator('h1').count(), 1);
assert.equal(
  await staticPage.locator('.guide-faq section > div:visible').count(),
  10,
);
assert(
  await staticPage.getByText('180 gün', { exact: false }).first().isVisible(),
);
await nojs.close();
console.log(
  'Interactions, persistence, reset, keyboard, print, no-JS passed. Page errors:',
  errors,
);
assert.equal(errors.length, 0);
await browser.close();
