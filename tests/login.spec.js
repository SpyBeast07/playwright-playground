import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true
});

test('test', async ({ page }) => {
  await page.goto('https://localhost/login');
  await page.getByRole('heading', { name: 'LMS Portal' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@example.com');
  await page.getByRole('textbox', { name: 'Email Address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: '👥 Users Management' }).click();
  await page.getByRole('link', { name: '🏢 Schools Management' }).click();
  await page.getByRole('link', { name: '📝 Signup Requests' }).click();
  await page.getByRole('button', { name: 'Showing Pending Only' }).click();
  await page.getByRole('link', { name: '🔐 Password Requests' }).click();
  await page.getByRole('link', { name: '📋 Activity Logs' }).click();
  await page.getByRole('link', { name: '🩺 System Health' }).click();
  await page.getByRole('link', { name: '👥 Users Management' }).click();
});