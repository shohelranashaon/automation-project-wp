// @ts-check
require('dotenv').config();
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000, // 60 seconds per test
  expect: {
    timeout: 5000
  },

  // Run 2 retries only on CI
  retries: process.env.CI ? 2 : 0,

  // Sequential workers - only 1 worker for sequential execution
  workers: 1,

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost', // your local WP site
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 15000,
    navigationTimeout: 20000,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  // Reporters (HTML + List)
  reporter: 'html'

  // Global Setup / Teardown (Optional)
  // globalSetup: './fixtures/globalSetup.js',
  // globalTeardown: './fixtures/globalTeardown.js',
});

