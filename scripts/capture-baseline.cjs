// Use an installed Playwright package via NODE_PATH; no production dependency.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const base = process.env.CAPTURE_URL || 'http://127.0.0.1:4173/ics-lab-portal/';
  const output = process.env.CAPTURE_OUTPUT || '/tmp/ics-react-baseline';
  const routes = ['', 'news', 'projects', 'publications', 'members', 'gallery', 'join-us', 'contact', 'news/2026-02-10-tmc-paper', 'projects/nsfc-privacy', 'publications/infocom2026-baro2talk'];
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const [device, viewport] of Object.entries({ desktop: { width: 1440, height: 1000 }, mobile: { width: 390, height: 844 } })) {
      for (const theme of ['light', 'dark']) {
        const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
        await page.addInitScript(theme => localStorage.setItem('theme', theme), theme);
        for (const route of routes) {
          await page.goto(`${base}#/${route}`, { waitUntil: 'networkidle' });
          await page.locator('nav').waitFor();
          await page.evaluate(() => document.fonts.ready);
          const file = `${device}-${theme}-${route.replaceAll('/', '-') || 'home'}.png`;
          await page.screenshot({ path: path.join(output, file), fullPage: true });
          console.log(file);
        }
        await page.close();
      }
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
