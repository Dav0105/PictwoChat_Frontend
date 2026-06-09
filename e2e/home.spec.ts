import { test, expect,  } from '@playwright/test';

test('home has login/register buttons', async ({ page }) => {
  await page.goto('/');

  // Expect to have Login and Register buttons
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});

test('login page loads correctly', async ({ page }) => {
  await page.goto('/');

  // Expect to have Login page appear when pressing Login button
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL("/login");

  // Check Login page elements
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
});