const { test, expect } = require('@playwright/test');

test.setTimeout(120000); // Set default timeout for this test

test('Amazon.in login functionality', async ({ page }) => {
  // Navigate to Amazon.in
  await page.goto('https://www.amazon.in/', { timeout: 60000 });

  // Hover over 'Account & Lists'
  await page.hover('#nav-link-accountList', { timeout: 15000 });

  // Click on 'Sign in'
  await page.waitForSelector('text=Sign in', { timeout: 15000 });
  await page.click('text=Sign in');

  // Fill in email/phone number
  await page.waitForSelector('input[name="email"]', { timeout: 15000 });
  await page.fill('input[name="email"]', 'YOUR_EMAIL_OR_PHONE');
  await page.click('input#continue');

  // Fill in password
  await page.waitForSelector('input[name="password"]', { timeout: 15000 });
  await page.fill('input[name="password"]', 'YOUR_PASSWORD');
  await page.click('input#signInSubmit');

  // Verify post-login element
  await page.waitForSelector('#nav-link-accountList', { timeout: 15000 });
  await page.hover('#nav-link-accountList');

  // Check for the visibility of 'Your Orders'
  await page.waitForSelector('span:has-text("Your Orders")', { timeout: 15000 });
  const ordersVisible = await page.isVisible('span:has-text("Your Orders")');
  expect(ordersVisible).toBeTruthy();
});
