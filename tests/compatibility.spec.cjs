const { test, expect } = require('@playwright/test');

const base = process.env.SITE_BASEURL ?? '/ics-lab-portal';

test('core navigation, search and responsive layout work across browser engines', async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}/`, { waitUntil: 'networkidle' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('main h1')).toHaveCount(1);
    if (width < 1280) {
      await page.locator('[data-menu-toggle]').click();
      await expect(page.locator('[data-mobile-menu]')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('[data-mobile-menu]')).toBeHidden();
    } else {
      await expect(page.locator('[data-desktop-nav]')).toBeVisible();
    }
  }

  await page.goto(`${base}/members/`, { waitUntil: 'networkidle' });
  await page.locator('[data-search-open]').click();
  await page.locator('[data-search-input]').fill('常姗');
  const result = page.locator('[data-search-results] a').first();
  await expect(result).toHaveAttribute('href', /\/members\/#member-/);
  await result.click();
  await expect(page.locator('[data-member]:target')).toBeVisible();
});
