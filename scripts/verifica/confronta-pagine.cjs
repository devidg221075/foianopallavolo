// Confronta originale (build ChatGPT v1.5) e ricostruzione: DOM + screenshot, 12 pagine x 2 larghezze.
// Uso: node compare.cjs <dir-originale> <dir-dist> [--shots]
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const [, , dirA, dirB, flag] = process.argv;
const withShots = flag === '--shots';
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain' };

function serve(dir, port) {
  return new Promise((resolve) => {
    const s = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p.endsWith('/')) p += 'index.html';
      const f = path.join(dir, p);
      if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
        res.writeHead(404);
        return res.end('nf');
      }
      res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(res);
    });
    s.listen(port, () => resolve(s));
  });
}

const PAGES = ['/', '/squadre.html', '/serie-c-maschile.html', '/prima-divisione-femminile.html', '/giovanili-maschili.html', '/giovanili-femminili.html', '/minivolley.html', '/dal-1976.html', '/partite-risultati.html', '/il-club.html', '/sponsor.html', '/contatti.html'];
const SIZES = [
  [1280, 800],
  [390, 844],
];

async function snapshot(browser, base, url, [w, h], motion) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: motion ? 'no-preference' : 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push('console: ' + m.text()));
  await page.clock.install({ time: new Date('2026-11-17T10:00:00Z') });
  await page.goto(base + url, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    scrollTo(0, 0);
  });
  await page.clock.runFor(2000);
  await page.waitForTimeout(300);
  const dom = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name=description]')?.content,
    robots: document.querySelector('meta[name=robots]')?.content,
    htmlAttrs: [...document.documentElement.attributes].map((a) => a.name + '=' + a.value).sort().join(' '),
    body: document.getElementById('root').innerHTML,
    bodyStyle: document.body.getAttribute('style'),
    height: document.documentElement.scrollHeight,
  }));
  let shot = null;
  await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
  await page.waitForTimeout(100);
  if (withShots) shot = await page.screenshot({ fullPage: true });
  await ctx.close();
  return { dom, errors, shot };
}

(async () => {
  const sa = await serve(dirA, 8801);
  const sb = await serve(dirB, 8802);
  const browser = await chromium.launch();
  let bad = 0;
  for (const url of PAGES) {
    for (const size of SIZES) {
      const a = await snapshot(browser, 'http://localhost:8801', url, size, false);
      const b = await snapshot(browser, 'http://localhost:8802', url, size, false);
      const issues = [];
      for (const k of ['title', 'desc', 'robots', 'htmlAttrs', 'bodyStyle', 'height']) if (a.dom[k] !== b.dom[k]) issues.push(`${k}: ${JSON.stringify(a.dom[k])} != ${JSON.stringify(b.dom[k])}`);
      if (a.dom.body !== b.dom.body) {
        let i = 0;
        while (i < a.dom.body.length && a.dom.body[i] === b.dom.body[i]) i++;
        issues.push(`body differisce alla posizione ${i}/${a.dom.body.length}: A=...${a.dom.body.slice(Math.max(0, i - 80), i + 120)}\n      B=...${b.dom.body.slice(Math.max(0, i - 80), i + 120)}`);
      }
      if (a.errors.length || b.errors.length) issues.push('errori: A=' + JSON.stringify(a.errors) + ' B=' + JSON.stringify(b.errors));
      if (withShots && a.shot && b.shot && !a.shot.equals(b.shot)) issues.push('screenshot diversi');
      const label = `${url} @${size[0]}`;
      if (issues.length) {
        bad++;
        console.log('DIFF', label, '\n   ' + issues.join('\n   '));
      } else console.log('OK  ', label, `(${a.dom.body.length} caratteri)`);
    }
  }
  await browser.close();
  sa.close();
  sb.close();
  console.log(bad ? `\n${bad} confronti con differenze` : '\nTUTTE LE PAGINE IDENTICHE');
  process.exit(bad ? 1 : 0);
})();
