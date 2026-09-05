const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  timeout: 120000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  reporter: [['list'], ['html', { open: 'never' }]],
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    ...(process.env.CROSS_BROWSER ? [
      { name: 'firefox-compat', testMatch: /compatibility\.spec\.cjs/, use: { browserName: 'firefox' } },
      { name: 'webkit-compat', testMatch: /compatibility\.spec\.cjs/, use: { browserName: 'webkit' } }
    ] : [])
  ],
  use: {
    baseURL: 'http://127.0.0.1:4100',
    channel: process.env.BROWSER_CHANNEL || undefined,
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  webServer: {
    command: 'JEKYLL_ENV=production bundle exec jekyll serve --host 127.0.0.1 --port 4100 --no-watch',
    url: 'http://127.0.0.1:4100' + (process.env.SITE_BASEURL || '/ics-lab-portal') + '/',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
});
