const { test, expect } = require('@playwright/test');

test('Sample login functionality', async ({ page }) => {
  // Navigate to the sample login page
  await page.goto('https://the-internet.herokuapp.com/login', { timeout: 30000 });

  // Fill in username and password
  await page.fill('input#username', 'tomsmith'); // sample username
  await page.fill('input#password', 'SuperSecretPassword!'); // sample password

  // Click the login button
  await page.click('button[type="submit"]');

  // Assert that the success message is visible
  const successMessage = page.locator('div.flash.success');
  await expect(successMessage).toBeVisible({ timeout: 10000 });
  await expect(successMessage).toContainText('You logged into a secure area!');
}); 