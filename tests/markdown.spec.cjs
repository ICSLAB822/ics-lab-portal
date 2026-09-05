const { test, expect } = require('@playwright/test');
const { execFileSync } = require('node:child_process');
const base = process.env.SITE_BASEURL ?? '/ics-lab-portal';
let fixtures;

test('real detail pages use native Markdown elements', async ({ page }) => {
  await page.goto(base + '/news/2026-02-10-tmc-paper/');
  const news = page.locator('[data-markdown-body]');
  await expect(news.locator('strong').first()).toContainText('Speak and Be Known');
  await expect(news.locator('ol > li')).toHaveCount(3);
  expect(await news.innerText()).not.toContain('**');
  await page.goto(base + '/publications/infocom2026-baro2talk/');
  await expect(page.locator('[data-markdown-body] > p')).toHaveCount(1);
  await expect(page.locator('[data-markdown-body]')).toContainText('The increasing demand');
});

for (const width of [390, 768, 1440]) for (const theme of ['light', 'dark']) {
  test(`Markdown semantics and layout ${width} ${theme}`, async ({ page }) => {
    fixtures ||= JSON.parse(execFileSync('bundle', ['exec', 'ruby', 'scripts/render_markdown_fixture.rb'], { encoding: 'utf8' }));
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(theme => localStorage.setItem('theme', theme), theme);
    for (const [collection, html] of Object.entries(fixtures)) {
      const url = base + '/__markdown-fixture-' + collection + '/';
      await page.route('**' + url, route => route.fulfill({ contentType: 'text/html', body: html }));
      await page.goto(url);
      const body = page.locator('[data-markdown-body]');
      await expect(body.locator('h2')).toHaveText('Markdown rendering fixture');
      await expect(body.locator('h3')).toHaveCount(3);
      await expect(body.locator('strong').first()).toHaveText('strong phrase');
      await expect(body.locator('em')).toHaveText('emphasized phrase');
      await expect(body.locator('p > code')).toHaveText('inline_code()');
      await expect(body.locator('p').first()).toContainText('same paragraph');
      await expect(body.locator('ul > li > ul > li')).toHaveText('Nested unordered item');
      await expect(body.locator('ol > li')).toHaveCount(2);
      await expect(body.locator('blockquote strong')).toHaveText('strong text');
      await expect(body.locator('a', { hasText: 'Internal news link' })).toHaveAttribute('href', base + '/news/');
      await expect(body.locator('a', { hasText: 'Reference link' })).toHaveAttribute('href', 'https://jekyllrb.com/docs/');
      await expect(body.locator('#lists')).toHaveText('Lists');
      await expect(body.locator('img')).toHaveAttribute('src', base + '/assets/files/logo/logo.png');
      await expect(body.locator('img')).toHaveJSProperty('complete', true);
      expect(await body.locator('img').evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
      await expect(body.locator('pre code').first()).toContainText('<script>window.markdownExecuted = true;</script>');
      await expect(body.locator('pre code').first()).toContainText('{{ keep_liquid_literal }}');
      expect(await page.evaluate(() => window.markdownExecuted)).toBeUndefined();
      await expect(body.locator('table thead th')).toHaveCount(2);
      await expect(body.locator('table tbody tr')).toHaveCount(2);
      await expect(body.locator('table strong')).toHaveText('Supported');
      await expect(body.locator('hr')).toHaveCount(1);
      await expect(body).toContainText('中文正文 and ICS LAB');
      await expect(body).toContainText('*literal asterisks* and <span>');
      expect(await body.locator('p').evaluateAll(nodes => nodes.some(p => p.querySelector('p')))).toBe(false);
      // Scope to Markdown; navigation has its own breakpoint regression suite.
      expect(await body.evaluate(el => {
        const rect = el.getBoundingClientRect();
        return rect.left >= 0 && rect.right <= innerWidth && el.scrollWidth <= el.clientWidth + 1;
      })).toBe(true);
      await expect(body).toHaveCSS('font-size', '18px');
      await expect(body).toHaveCSS('color', theme === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)');
      await expect(body.locator('a').first()).toHaveCSS('text-decoration-line', 'underline');
      await body.locator('a').first().focus();
      await expect(body.locator('a').first()).toHaveCSS('outline-style', 'solid');
    }
  });
}
