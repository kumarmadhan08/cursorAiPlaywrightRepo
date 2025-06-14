const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { DashboardPage } = require('./pages/DashboardPage');

// Test dashboard functionality using the DashboardPage POM

test('Dashboard page: visible after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  await loginPage.goto();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  // Assert dashboard is visible
  await dashboardPage.assertSuccessMessage();
  expect(await dashboardPage.isLogoutVisible()).toBeTruthy();
}); 