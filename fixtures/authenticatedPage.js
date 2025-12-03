export { expect } from '@playwright/test';
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

/**
 * Custom fixture that provides an authenticated page
 * Login happens once per test file when tests run sequentially
 */
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Perform login once
    const loginPage = new LoginPage(page);
    const loginUrl = process.env.WP_URL || '/wp-login.php';
    await page.goto(loginUrl);
    await loginPage.login.emailInput.fill(process.env.WP_USER);
    await loginPage.login.passwordInput.fill(process.env.WP_PASS);
    await loginPage.login.loginButton.click();
    
    // Wait for login to complete
    await page.waitForURL(/wp-admin/);
    
    // Use the authenticated page in tests
    await use(page);
  },
});



