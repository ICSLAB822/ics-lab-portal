const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const countContent = kind => {
  const directory = 'content/_' + kind;
  return fs.existsSync(directory)
    ? fs.readdirSync(directory).filter(name => name.endsWith('.md')).length
    : 0;
};
const publicationCount = countContent('publications');
const memberCount = countContent('people');
const legacyCount = 8 + ['news', 'projects', 'publications'].reduce((n, kind) => n + countContent(kind), 0);
const base = process.env.SITE_BASEURL ?? '/ics-lab-portal';
const routes = ['', 'news', 'projects', 'publications', 'members', 'gallery', 'join-us', 'contact'];
test('all content, no runtime React or CDN, downloads and old routes', async ({ page, request }) => {
  const mapping = await (await request.get(base + '/legacy-routes.json')).json();
  expect(Object.keys(mapping)).toHaveLength(legacyCount);
  for (const [legacy, target] of Object.entries(mapping)) {
    expect((await request.get(target)).ok(), target).toBeTruthy();
    await page.goto(base + '/#/' + encodeURI(legacy), { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(new URL(target, 'http://127.0.0.1:4100').href);
    await expect(page.locator('h1')).not.toHaveCount(0);
  }
  await page.goto(base + '/#/does-not-exist', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(new RegExp('/404.html$'));
  await expect(page.locator('h1')).toHaveText('404: Not Found');
  await page.goto(base + '/publications/');
  await expect(page.locator('.publication-item')).toHaveCount(publicationCount);
  const hrefs = await page.locator('.publication-item a[download]').evaluateAll(links => links.map(link => link.href));
  expect(hrefs.length).toBeGreaterThan(80);
  for (const url of hrefs) {
    const response = await request.get(url);
    expect(response.ok(), url).toBeTruthy();
    expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
  }
  expect(await page.locator('script[src*="tailwind"],script[src*="react"],script[src*="vite"]').count()).toBe(0);
  expect(fs.readFileSync('assets/css/tailwind.css', 'utf8').length).toBeGreaterThan(10000);
});

for (const width of [1440, 390]) for (const theme of ['light', 'dark']) for (const lang of ['en', 'zh']) {
  test('pages ' + width + ' ' + theme + ' ' + lang, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(({ theme, lang }) => { localStorage.setItem('theme', theme); localStorage.setItem('language', lang); }, { theme, lang });
    for (const route of routes) {
      await page.goto(base + '/' + route + (route ? '/' : ''), { waitUntil: 'networkidle' });
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      expect(await page.locator('html').evaluate(el => el.classList.contains('dark'))).toBe(theme === 'dark');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      await expect(page.locator('main h1')).toHaveCount(1);
    }
    expect(errors).toEqual([]);
  });
}

test('filters, list/detail citations and clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(base + '/publications/');
  await page.locator('[data-filter-toggle]').click();
  await page.locator('button[data-track="Conference"]').click();
  const count = await page.locator('.publication-item:visible').count();
  expect(count).toBeGreaterThan(0); expect(count).toBeLessThan(publicationCount);
  const topic = await page.locator('#topic-filter option').nth(1).getAttribute('value');
  await page.locator('#topic-filter').selectOption(topic);
  expect(await page.locator('.publication-item:visible').evaluateAll(items => items.every(item => item.dataset.topic === document.querySelector('#topic-filter').value))).toBeTruthy();
  await page.locator('[data-filter-reset]').click();
  await expect(page.locator('.publication-item:visible')).toHaveCount(publicationCount);
  await page.locator('[data-language-toggle]:visible').click();
  await expect(page.locator('#topic-filter option[value="All"]')).toHaveText('全部');
  await expect(page.locator('[data-filter-label]')).toHaveText('全部');
  await page.locator('[data-filter-toggle]').click();
  await page.locator('button[data-track="Conference"]').click();
  await expect(page.locator('[data-filter-label]')).toHaveText('会议');
  await page.locator('[data-filter-reset]').click();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-filter-toggle]')).toBeFocused();
  await page.locator('[data-citation-open]').first().click();
  await expect(page.locator('[data-citation-text]')).toContainText('@');
  await page.locator('[data-copy-citation]').last().click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('title={');
  await page.keyboard.press('Escape');
  await page.goto(base + '/publications/infocom2026-baro2talk/');
  await page.locator('[data-citation-open]').click();
  await expect(page.locator('[data-citation-text]')).toContainText('title={Baro2Talk');
  await page.keyboard.press('Escape');
  await page.locator('[data-lightbox-src]').click();
  await expect(page.locator('[data-lightbox]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-lightbox-src]')).toBeFocused();
});

test('search, bilingual biography, FAQ, gallery and navigation', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(base + '/members/');
  await expect(page.locator('[data-member]')).toHaveCount(memberCount);
  await expect(page.locator('[data-bio-open]')).toHaveCount(2);
  await page.locator('[data-bio-open]').first().click();
  await page.locator('dialog[open] [data-copy-bio]').last().click();
  expect((await page.evaluate(() => navigator.clipboard.readText())).length).toBeGreaterThan(50);
  await page.keyboard.press('Escape');
  await page.locator('[data-language-toggle]:visible').click();
  await page.locator('[data-bio-open]').first().click();
  await expect(page.locator('dialog[open] [data-bio-text] [data-lang="zh"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.locator('[data-search-open]').click();
  await page.locator('[data-search-input]').fill('常姗');
  await expect(page.locator('[data-search-results]')).toContainText('常姗');
  await page.locator('[data-search-input]').fill('Baro2Talk');
  await expect(page.locator('[data-search-results] a')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await page.locator('[data-search-open]').click();
  await expect(page.locator('[data-search-input]')).toHaveValue('');
  await page.keyboard.press('Escape');
  await page.goto(base + '/join-us/');
  await page.locator('[data-faq-toggle]').first().click();
  await expect(page.locator('#faq-1')).toBeVisible();
  await page.locator('[data-faq-toggle]').nth(1).click();
  await expect(page.locator('#faq-1')).toBeHidden();
  await expect(page.locator('#faq-2')).toBeVisible();
  await page.goto(base + '/gallery/');
  await page.locator('[data-album-open]').first().click();
  await expect(page.locator('[data-album-grid]')).toBeHidden();
  await page.locator('[data-album-view]:visible [data-lightbox-src]').first().click();
  const first = await page.locator('[data-lightbox-content] img').getAttribute('src');
  await page.keyboard.press('ArrowRight');
  expect(await page.locator('[data-lightbox-content] img').getAttribute('src')).not.toBe(first);
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('[data-lightbox-content] img')).toHaveAttribute('src', first);
  await page.keyboard.press('Escape');
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await page.locator('[data-album-view]:visible [data-album-back]').click();
  await expect(page.locator('[data-album-grid]')).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-menu-toggle]').click();
  await expect(page.locator('[data-mobile-menu]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-mobile-menu]')).toBeHidden();
});

test('unavailable search index is recoverable, system theme responds', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto(base + '/');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.route('**/search-index.json', route => route.fulfill({ status: 503, body: 'Unavailable' }));
  await page.locator('[data-search-open]').click();
  await page.locator('[data-search-input]').fill('test');
  await expect(page.locator('[data-search-results]')).toContainText('Search unavailable');
  await page.keyboard.press('Escape');
  await page.unroute('**/search-index.json');
  await page.locator('[data-search-open]').click();
  await page.locator('[data-search-input]').fill('Baro2Talk');
  await expect(page.locator('[data-search-results] a')).toHaveCount(1);
});

for (const timezoneId of ['America/Los_Angeles', 'Pacific/Kiritimati']) {
  test(`date-only news metadata is stable in ${timezoneId}`, async ({ browser }) => {
    const context = await browser.newContext({ timezoneId });
    const page = await context.newPage();
    await page.goto(base + '/news/2026-02-10-tmc-paper/');
    await expect(page.locator('[data-local-date]')).toHaveText('February 10, 2026');
    await page.locator('[data-language-toggle]:visible').click();
    await expect(page.locator('[data-local-date]')).toHaveText('2026年2月10日');
    await context.close();
  });
}

test('homepage loads one responsive hero initially and exposes real footer links', async ({ page }) => {
  await page.goto(base + '/');
  await expect(page.locator('[data-hero-slide] img:not([data-hero-src])')).toHaveCount(1);
  await expect(page.locator('[data-hero-slide] img[data-hero-src]')).toHaveCount(4);
  expect(await page.locator('[data-hero-slide] img:not([data-hero-src])').getAttribute('srcset')).toContain('960w');
  expect(await page.locator('footer a').evaluateAll(links => links.every(link => link.getAttribute('href') !== '#'))).toBe(true);
  await expect(page.locator('footer a[href="mailto:schang@dhu.edu.cn"]')).toHaveCount(1);
});
