const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const routes = ['', 'news', 'projects', 'publications', 'members', 'gallery', 'join-us', 'contact', 'news/2026-02-10-tmc-paper', 'projects/nsfc-privacy', 'publications/infocom2026-baro2talk'];
(async () => {
  const output = process.env.CAPTURE_OUTPUT || '/tmp/ics-parity';
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  const report = [];
  try {
    for (const version of (process.env.CAPTURE_VERSION ? [process.env.CAPTURE_VERSION] : ['react', 'jekyll'])) {
      for (const width of [1440, 390]) for (const theme of ['light', 'dark']) for (const lang of ['en', 'zh']) {
        const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
        await page.addInitScript(({ theme, lang }) => { localStorage.setItem('theme', theme); localStorage.setItem('language', lang); }, { theme, lang });
        for (const route of routes) {
          const base = version === 'react' ? 'http://127.0.0.1:4173/ics-lab-portal/#/' : 'http://127.0.0.1:4000/ics-lab-portal/';
          await page.goto(base + route + (version === 'jekyll' && route ? '/' : ''), { waitUntil: 'networkidle' });
          if (version === 'react' && lang === 'zh' && !(await page.locator('nav').innerText()).includes('首页')) {
            if (width >= 768) await page.getByTitle('Switch Language', { exact: true }).click();
            else {
              await page.locator('nav > div:first-child .md\\:hidden button').last().click();
              await page.getByRole('button', { name: /Switch Language:/ }).click();
            }
          }
          await page.evaluate(() => document.fonts.ready);
          const name = [version, width, theme, lang, route.replaceAll('/', '-') || 'home'].join('-');
          await page.screenshot({ path: path.join(output, name + '.png'), fullPage: true });
          const metrics = await page.evaluate(() => ({
            text: document.querySelector('main')?.innerText || document.querySelector('#root')?.innerText,
            scrollWidth: document.documentElement.scrollWidth, width: innerWidth,
            headings: [...document.querySelectorAll('h1,h2,h3')].filter(el => el.getBoundingClientRect().height > 0).map(el => ({ text: el.textContent.trim(), top: el.getBoundingClientRect().top, width: el.getBoundingClientRect().width }))
          }));
          report.push({ name, ...metrics });
          console.log(name);
        }
        await page.close();
      }
    }
  } finally { await browser.close(); fs.writeFileSync(path.join(output, 'metrics.json'), JSON.stringify(report, null, 2)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
