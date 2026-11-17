// Click-fuzz: per ogni <button> della pagina (stesso indice in originale e ricostruzione),
// ricarica la pagina, clicca e confronta lo stato risultante (DOM, URL, overflow del body).
// Uso: node clickfuzz.cjs <dir-A> <dir-B> <larghezza> [pagina-filtro]
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const [, , dirA, dirB, width, only] = process.argv;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain' };
const serve = (dir, port) =>
  new Promise((res) => {
    const s = http
      .createServer((q, r) => {
        let p = decodeURIComponent(q.url.split('?')[0]);
        if (p.endsWith('/')) p += 'index.html';
        const f = path.join(dir, p);
        if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) {
          r.writeHead(404);
          return r.end();
        }
        r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
        fs.createReadStream(f).pipe(r);
      })
      .listen(port, () => res(s));
  });

const PAGES = ['/', '/squadre.html', '/serie-c-maschile.html', '/prima-divisione-femminile.html', '/giovanili-maschili.html', '/giovanili-femminili.html', '/minivolley.html', '/dal-1976.html', '/partite-risultati.html', '/il-club.html', '/sponsor.html', '/contatti.html'];

async function run(browser, base, url, index, extra) {
  const ctx = await browser.newContext({ viewport: { width: +width, height: 844 }, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.clock.install({ time: new Date('2026-11-17T10:00:00Z') });
  // evita uscite verso mailto:/tel: e finestre esterne
  await page.route('**/*', (r) => r.continue());
  await page.goto(base + url, { waitUntil: 'networkidle' });
  const count = await page.locator('button').count();
  if (index === 'count') {
    await ctx.close();
    return { count };
  }
  const btn = page.locator('button').nth(index);
  const label = (await btn.evaluate((b) => (b.className + '|' + (b.getAttribute('aria-label') || b.textContent || '')).trim().slice(0, 60)).catch(() => '?')) || '?';
  let clicked = true;
  try {
    await btn.scrollIntoViewIfNeeded({ timeout: 1500 });
    await btn.click({ timeout: 1500, force: false });
  } catch {
    clicked = false;
  }
  await page.clock.runFor(1200).catch(() => {});
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(150);
  // se è un "openContact", riempi anche il modulo per verificare lo stato controllato
  let formState = null;
  if (extra) {
    const dlg = page.locator('.dialog form');
    if (await dlg.count()) {
      await dlg.locator('input').first().fill('Mario Rossi').catch(() => {});
      await dlg.locator('textarea').fill('Messaggio di prova').catch(() => {});
      await dlg.locator('select').selectOption({ index: 2 }).catch(() => {});
      formState = await page.evaluate(() => document.querySelector('.dialog')?.innerHTML);
    }
  }
  const state = await page.evaluate(() => ({
    url: location.pathname + location.search + location.hash,
    root: document.getElementById('root')?.innerHTML,
    overflow: document.body.style.overflow,
    motion: document.documentElement.dataset.motion,
    active: document.activeElement?.className + '|' + document.activeElement?.tagName,
  }));
  await ctx.close();
  return { count, label, clicked, state, formState, errors };
}

(async () => {
  const sa = await serve(dirA, 8831 + (width === '390' ? 10 : 0));
  const sb = await serve(dirB, 8832 + (width === '390' ? 10 : 0));
  const browser = await chromium.launch();
  let total = 0;
  let bad = 0;
  for (const url of PAGES.filter((p) => !only || p.includes(only))) {
    const { count } = await run(browser, 'http://localhost:' + (8831 + (width === '390' ? 10 : 0)), url, 'count');
    const diffs = [];
    for (let i = 0; i < count; i++) {
      const a = await run(browser, 'http://localhost:' + (8831 + (width === '390' ? 10 : 0)), url, i, true);
      const b = await run(browser, 'http://localhost:' + (8832 + (width === '390' ? 10 : 0)), url, i, true);
      total++;
      const why = [];
      if (a.clicked !== b.clicked) why.push('clicked ' + a.clicked + '/' + b.clicked);
      for (const k of ['url', 'root', 'overflow', 'motion', 'active']) if (a.state[k] !== b.state[k]) why.push(k);
      if (a.formState !== b.formState) why.push('form');
      if (JSON.stringify(a.errors) !== JSON.stringify(b.errors)) why.push('errori ' + JSON.stringify(a.errors) + ' vs ' + JSON.stringify(b.errors));
      if (why.length) {
        bad++;
        diffs.push(`#${i} "${a.label}": ${why.join(', ')}`);
      }
    }
    console.log(diffs.length ? 'DIFF' : 'OK  ', url, `@${width}`, `${count} pulsanti`, diffs.length ? '\n   ' + diffs.join('\n   ') : '');
  }
  await browser.close();
  sa.close();
  sb.close();
  console.log(`\n${total} click confrontati, ${bad} con differenze`);
  process.exit(bad ? 1 : 0);
})();
