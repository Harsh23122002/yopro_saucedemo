import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';

test('Valid Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/v1');
    await loginPage.login('standard_user', 'secret_sauce');

    // Assertion: Check if redirected to the inventory page
    await expect(page).toHaveURL(/.*inventory/);
});
