import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

// Use describe.serial to ensure tests run sequentially
test.describe.serial('WordPress Login Tests', () => {
    test('Verify WordPress Login Functionality', async ({ page }) => {
        const loginPage = new LoginPage(page);
        // Use WP_URL if available, otherwise construct from baseURL
        const loginUrl = process.env.WP_URL || '/wp-login.php';
        await page.goto(loginUrl);
        await loginPage.login.emailInput.fill(process.env.WP_USER);
        await loginPage.login.passwordInput.fill(process.env.WP_PASS);
        await loginPage.login.loginButton.click();
        await expect(page).toHaveURL(/wp-admin/);
    });
});