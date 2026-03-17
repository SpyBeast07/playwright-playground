import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

test('login to admin dashboard', async ({ page }) => {
  await page.goto('http://localhost/');

  // Check login page is there with heading LMS Portal
  await expect(page.getByRole('heading', { name: /LMS Portal/i })).toBeVisible();

  // Fill the details: admin@example.com in email and admin123 in password
  // Using generic locators to accommodate different potential input attributes
  await page.locator('input[type="email"], input[name="email"]').first().fill('admin@example.com');
  await page.locator('input[type="password"], input[name="password"]').first().fill('admin123');

  // Try login in
  await page.getByRole('button', { name: /login|sign|submit/i }).first().click();

  // Check in the url if admin/dashboard is there
  await expect(page).toHaveURL(/.*admin\/dashboard/);
});
