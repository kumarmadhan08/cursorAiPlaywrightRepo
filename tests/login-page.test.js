const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');

// Test login functionality using the LoginPage POM

test('Login page: valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  // Assert successful login by checking URL
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
  // Optionally, check for the success message
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
}); 