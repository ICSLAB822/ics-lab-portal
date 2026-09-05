const { test, expect } = require('@playwright/test');
const base = process.env.SITE_BASEURL ?? '/ics-lab-portal';

async function expectHeaderFits(page) {
  const problems = await page.locator('[data-navbar] > nav').first().evaluate(nav => {
    const visible = [...nav.querySelectorAll('a,button')].filter(el => el.getClientRects().length);
    const boxes = visible.map(el => ({ label: el.getAttribute('aria-label') || el.textContent.trim(), rect: el.getBoundingClientRect() }));
    const issues = boxes.filter(({rect}) => rect.left < 0 || rect.right > innerWidth + 1 || rect.top < 0 || rect.bottom > 64).map(({label}) => label + ' outside viewport');
    for (let i = 1; i < boxes.length; i++) for (let j = 0; j < i; j++) {
      const a = boxes[i].rect, b = boxes[j].rect;
      if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) issues.push(boxes[i].label + ' overlaps ' + boxes[j].label);
    }
    return issues;
  });
  expect(problems).toEqual([]);
}

for (const lang of ['en', 'zh']) for (const theme of ['light', 'dark']) {
  test(`navigation fits all breakpoints ${lang} ${theme}`, async ({ page }) => {
    await page.addInitScript(({lang, theme}) => { localStorage.setItem('language', lang); localStorage.setItem('theme', theme); }, {lang, theme});
    for (const route of ['', 'members/']) {
      await page.goto(base + '/' + route);
      await page.evaluate(() => document.fonts.ready);
      for (const width of [320, 390, 767, 768, 820, 1024, 1279, 1280, 1281, 1440]) {
        await page.setViewportSize({width, height: 900});
        await expectHeaderFits(page);
        await expect(page.locator('[data-search-open]')).toBeInViewport();
        await expect(page.locator('[data-theme-toggle]')).toBeInViewport();
        if (width < 1280) {
          await expect(page.locator('[data-menu-toggle]')).toBeVisible();
          await expect(page.locator('[data-desktop-nav]')).toBeHidden();
          await page.locator('[data-menu-toggle]').click();
          await expect(page.locator('[data-mobile-menu]')).toBeVisible();
          await expect(page.locator('[data-mobile-menu] a')).toHaveCount(8);
          await expect(page.locator('[data-mobile-menu] a').last()).toBeInViewport();
          await expect(page.locator('[data-mobile-menu] [data-language-toggle]')).toBeInViewport();
          await page.keyboard.press('Escape');
          await expect(page.locator('[data-menu-toggle]')).toBeFocused();
        } else {
          await expect(page.locator('[data-menu-toggle]')).toBeHidden();
          await expect(page.locator('[data-desktop-nav] a')).toHaveCount(8);
          await expect(page.locator('[data-desktop-nav]')).toBeVisible();
        }
      }
    }
  });
}

test('disclosure keyboard, outside click, language and search', async ({ page }) => {
  await page.setViewportSize({width: 820, height: 900});
  await page.goto(base + '/members/');
  const toggle = page.locator('[data-menu-toggle]');
  const menu = page.locator('[data-mobile-menu]');
  await expect(toggle).toHaveAttribute('aria-controls', 'site-navigation-menu');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toHaveAccessibleName('Close navigation');
  await expect(menu.locator('a[aria-current="page"]')).toContainText('Members');
  await page.keyboard.press('Tab');
  await expect(menu.locator('a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAccessibleName('Open navigation');
  await page.keyboard.press('Space');
  await expect(menu).toBeVisible();
  await page.mouse.click(810, 850);
  await expect(menu).toBeHidden();
  await toggle.click();
  await menu.locator('[data-language-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh');
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAccessibleName('展开导航');
  await toggle.click();
  await page.locator('[data-search-open]').click();
  await expect(menu).toBeHidden();
  await expect(page.locator('[data-search-dialog]')).toBeVisible();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-search-open]')).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await toggle.click();
  await menu.locator('a').last().click();
  await expect(page).toHaveURL(new RegExp('/contact/$'));
  await expect(menu).toBeHidden();
});

test('short landscape menu scrolls and releases focus/scroll state', async ({ page }) => {
  await page.setViewportSize({width: 820, height: 375});
  await page.goto(base + '/news/');
  const toggle = page.locator('[data-menu-toggle]');
  const menu = page.locator('[data-mobile-menu]');
  await toggle.click();
  expect(await menu.evaluate(el => el.getBoundingClientRect().bottom <= innerHeight)).toBe(true);
  expect(await menu.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  await expect(menu).toHaveCSS('overflow-y', 'auto');
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  const language = menu.locator('[data-language-toggle]');
  await language.focus();
  await expect(language).toBeInViewport();
  await page.keyboard.press('Tab');
  await expect(menu).toBeHidden();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await toggle.click();
  await menu.locator('a').nth(2).focus();
  await page.setViewportSize({width: 1440, height: 900});
  await expect(menu).toBeHidden();
  await expect(page.locator('[data-desktop-nav] a').nth(2)).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await page.setViewportSize({width: 820, height: 375});
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeHidden();
});
