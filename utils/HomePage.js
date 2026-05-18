const { expect } = require('@playwright/test');
const { NAV_TABS, BASE_URL } = require('./constants');

class HomePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.rightNavBar = page.locator('ul.nav.navbar-nav');
  }

  // 1. Launch browser and 2. Navigate to url 'http://automationexercise.com'
  async open() {
    await this.page.goto(BASE_URL);
  }
 
  // 3. Verify that home page is visible successfully
  async verifyIsVisible() {
    await expect(
      this.page.getByRole('img', { name: 'Website for automation practice' }),
    ).toBeVisible();
    await expect(this.rightNavBar.getByRole('listitem')).toHaveCount(8);

    for (const tabName of NAV_TABS) {
      await expect(this.rightNavBar.getByRole('link', { name: tabName })).toBeVisible();
    }
  }
}

module.exports = { HomePage };
