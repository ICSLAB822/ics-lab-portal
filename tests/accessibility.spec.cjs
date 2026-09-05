const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const base = process.env.SITE_BASEURL ?? '/ics-lab-portal';
const routes = ['', 'news/', 'projects/', 'publications/', 'members/', 'gallery/', 'join-us/', 'contact/'];

for (const route of routes) {
  test(`WCAG A/AA automated scan: /${route}`, async ({ page }) => {
    await page.goto(`${base}/${route}`, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test('WCAG scan covers Chinese dark mode and the expanded navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    localStorage.setItem('language', 'zh');
    localStorage.setItem('theme', 'dark');
  });
  await page.goto(`${base}/members/`, { waitUntil: 'networkidle' });
  await page.locator('[data-menu-toggle]').click();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});
