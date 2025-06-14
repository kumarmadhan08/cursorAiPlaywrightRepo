class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.flashMessage = page.locator('#flash');
    this.logoutButton = page.locator('a.button');
  }

  async assertSuccessMessage() {
    await this.flashMessage.waitFor({ state: 'visible' });
    await this.page.locator('#flash').isVisible();
    await this.page.locator('#flash').textContent();
  }

  async isLogoutVisible() {
    return await this.logoutButton.isVisible();
  }
}

module.exports = { DashboardPage }; 