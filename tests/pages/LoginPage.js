class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input#username');
    this.passwordInput = page.locator('input#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.flashMessage = page.locator('#flash');
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginError() {
    await this.page.waitForSelector('#flash');
    await this.page.locator('#flash').waitFor({ state: 'visible' });
    await this.page.locator('#flash').isVisible();
  }
}

module.exports = { LoginPage }; 