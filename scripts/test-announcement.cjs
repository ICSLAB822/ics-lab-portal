const { chromium } = require('playwright');
const { execFileSync, spawn } = require('node:child_process');
const assert = require('node:assert/strict');

(async () => {
  let browser;
  let server;
  let serverError = '';
  try {
    const fixtures = JSON.parse(execFileSync('bundle', ['exec', 'ruby', 'scripts/render_announcement_fixture.rb'], { encoding: 'utf8' }));
    const port = Number(process.env.ANNOUNCEMENT_PORT || 4200);
    const base = `http://127.0.0.1:${port}/ics-lab-portal/`;
    server = spawn('bundle', ['exec', 'jekyll', 'serve', '--host', '127.0.0.1', '--port', String(port), '--no-watch'], {
      stdio: ['ignore', 'ignore', 'pipe'],
      env: { ...process.env, JEKYLL_ENV: 'production' }
    });
    server.stderr.on('data', chunk => { serverError = (serverError + chunk).slice(-4000); });
    for (let attempt = 0; attempt < 120; attempt += 1) {
      if (server.exitCode !== null) throw new Error(`Jekyll preview exited early.\n${serverError}`);
      try {
        const response = await fetch(base);
        if (response.ok) break;
      } catch (_) {}
      if (attempt === 119) throw new Error(`Jekyll preview did not become ready.\n${serverError}`);
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || undefined, headless: true });
    for (const theme of Object.keys(fixtures)) {
      for (const width of [1440, 390]) {
        const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.clock.setFixedTime(new Date('2026-06-01T12:00:00Z'));
        await page.route(base, route => route.fulfill({ contentType: 'text/html', body: fixtures[theme] }));
        await page.goto(base, { waitUntil: 'networkidle' });
        await page.locator('[data-announcement][open]').waitFor();
        assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
        assert.equal(await page.locator('[data-announcement] a').getAttribute('href'), '/ics-lab-portal/news/2026-02-10-tmc-paper/');
        assert(await page.locator('[data-announcement] img').evaluate(img => img.complete && img.naturalWidth > 0));
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        await page.screenshot({ path: `/tmp/ics-announcement-${theme}-${width}.png` });
        await page.locator('[data-announcement-close]').click();
        await page.locator('[data-announcement-recall]').waitFor();
        assert.equal(await page.evaluate(() => document.body.style.overflow), '');
        assert(await page.locator('[data-announcement-recall]').evaluate(el => el === document.activeElement));
        await page.locator('[data-announcement-recall]').click();
        await page.locator('[data-announcement][open]').waitFor();
        await page.keyboard.press('Escape');
        await page.locator('[data-announcement-recall]').waitFor();
        for (const date of ['2025-12-31T12:00:00Z', '2027-01-01T12:00:00Z']) {
          await page.clock.setFixedTime(new Date(date));
          await page.reload({ waitUntil: 'networkidle' });
          assert.equal(await page.locator('[data-announcement][open]').count(), 0);
          assert.equal(await page.locator('[data-announcement-recall]:visible').count(), 0);
        }
        assert.deepEqual(errors, []);
        await page.close();
      }
    }
    const page = await browser.newPage({ reducedMotion: 'no-preference' });
    await page.clock.setFixedTime(new Date('2026-01-01T00:00:00Z'));
    await page.route(base, route => route.fulfill({ contentType: 'text/html', body: fixtures.celebration }));
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.locator('[data-announcement][open]').waitFor();
    // Original chevron bounces continuously; keyboard activation avoids waiting
    // for an intentionally moving target to become geometrically stable.
    await page.locator('[data-announcement-close]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('[data-announcement].is-closing[open]').count(), 1);
    await page.locator('[data-announcement-recall]').waitFor();
    await page.clock.setFixedTime(new Date('2026-12-31T23:59:59Z'));
    await page.reload({ waitUntil: 'networkidle' });
    await page.locator('[data-announcement][open]').waitFor();
    await page.unroute(base);
    await page.reload({ waitUntil: 'networkidle' });
    assert.equal(await page.locator('[data-announcement]').count(), 0, 'Real disabled announcement stays unpublished');
    console.log('PASS: announcement 3 themes × 2 viewports; image, CTA, date boundaries/expiry, dismiss/recall, focus, scroll lock, Escape, animation, disabled production config.');
  } finally {
    await browser?.close();
    server?.kill('SIGTERM');
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
