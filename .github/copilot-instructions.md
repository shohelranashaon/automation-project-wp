<!-- Copilot instructions for automation-project-wp -->
# Quick orientation for AI coding agents

This repository is a Playwright-based POM test suite for a WordPress site (see `README.md`). The tests live under `tests/` and use Playwright's runner with configuration in `playwright.config.cjs`.

Summary
- **Primary purpose**: End-to-end tests for WordPress admin flows (FlexTable plugin, plugin activation, login). See `tests/flexTable/*` for examples.
- **Test runner**: Playwright (`@playwright/test`). Config at `playwright.config.cjs` (testDir: `./tests`, `workers: 1`, `retries` enabled on CI).

How to run (typical)
- Install deps: `npm install`.
- Run tests: `npx playwright test` (can add `--headed` or `--debug` for interactive debugging).
- View HTML report: `npx playwright show-report` or open `playwright-report/index.html` after a run.

Environment and configuration
- Dotenv is loaded in `playwright.config.cjs`. Use a `.env` file or environment variables for:
  - `BASE_URL` — base for `page.goto` (fallback `http://localhost`), used by Playwright config.
  - `WP_URL` — full login URL (optional); otherwise tests use `/wp-login.php` relative to `BASE_URL`.
  - `WP_USER` and `WP_PASS` — credentials used by `fixtures/authenticatedPage.js` and login tests.

Project structure & conventions (what to look for)
- `pages/` contains Page Object classes that wrap Playwright locators; class names use `PascalCase` and often end with `Page` (e.g., `FlexTablePage`, `DashboardPage`).
- `locators/locators.js` centralizes locator classes (Login, Dashboard, Plugin, FlexTable). Page objects import these and expose high-level actions.
- `fixtures/authenticatedPage.js` provides a custom Playwright fixture: tests import it like `import { test, expect } from '../../fixtures/authenticatedPage'` to get an already-authenticated `page` as `authenticatedPage`.
- Tests in `tests/flexTable/` use `test.describe.serial` to enforce sequential execution when needed.

Patterns and notable examples
- Locator pattern: each `*`Page class composes a locator class from `locators/locators.js` (e.g., `this.flexTable = new FlexTable(page);`). Example: `pages/FlexTablePage.js` uses `this.flexTable.flexTableMenu.click()` to navigate.
- Plugin activation flow: `pages/pluginPage.js` implements three loops: find, activate if present, or install+activate if missing. Tests call `pluginPage.ensurePluginIsActive('FlexTable')`.
- Auth fixture: `fixtures/authenticatedPage.js` uses `LoginPage` to fill `WP_USER`/`WP_PASS` and waits for `/wp-admin/` before yielding the authenticated `page`.

Important config gotchas the agent should check
- `playwright.config.cjs` sets `workers: 1` and `retries` dependent on `process.env.CI` — follow this when changing concurrency.
- `type` in `package.json` is set to `commonjs` while test files use `import`/`export` (ES module syntax). If you modify project-level Node settings or add scripts, verify local runtime supports ESM imports for Playwright tests.

Where to change things safely
- Add new page objects under `pages/` and corresponding locators in `locators/locators.js`.
- Add fixtures to `fixtures/` and export a test extension like `authenticatedPage` if new authenticated flows are needed.
- Prefer updating `playwright.config.cjs` for runner-level defaults (timeouts, report type, headless, retries).

Quick examples to reference in edits
- Log in from a test: see `tests/flexTable/login.test.js` — uses `LoginPage` and env vars.
- Reuse authenticated page: see `tests/flexTable/pluginActivation.test.js` and `fixtures/authenticatedPage.js`.
- Verify FlexTable dashboard: see `pages/FlexTablePage.js` and its use of `createTableElementForVerification` in `locators/locators.js`.

If you need more context or want this split into more targeted agent roles (e.g., refactor-only, test-runner-only), tell me which focus you want and I will update this file.

— End of instructions
