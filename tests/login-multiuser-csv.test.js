const { test, expect } = require('@playwright/test');
const fs = require('fs');
const parse = require('csv-parse/sync').parse;

// Read and parse the CSV file
const csvData = fs.readFileSync(require('path').join(__dirname, 'users.csv'), 'utf-8');
const users = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

for (const user of users) {
  test(`Login test for user: ${user.username}`, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login', { timeout: 30000 });
    await page.fill('input#username', user.username);
    await page.fill('input#password', user.password);
    await page.click('button[type="submit"]');

    if (user.username === 'tomsmith' && user.password === 'SuperSecretPassword!') {
      // Valid credentials
      const successMessage = page.locator('div.flash.success');
      await expect(successMessage).toBeVisible({ timeout: 10000 });
      await expect(successMessage).toContainText('You logged into a secure area!');
    } else {
      // Invalid credentials
      const errorMessage = page.locator('div.flash.error');
      await expect(errorMessage).toBeVisible({ timeout: 10000 });
      await expect(errorMessage).toContainText('Your username is invalid!');
    }
  });
} 