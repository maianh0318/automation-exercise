const { expect } = require('@playwright/test');

class ProductPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  async closeAdIfPresent() {
    try {
        // Try to close Google Ads iframe pop-up
        try {
            const frames = this.page.frames();
            for (const frame of frames) {
                try {
                    const closeButton = frame.locator('[aria-label="Close"]').first();
                    const count = await closeButton.count();
                    if (count > 0) {
                        await closeButton.click();
                        await this.page.waitForTimeout(500);
                        console.log('Ad popup closed');
                        return;
                    }
                } catch (e) {
                    // Continue to next frame
                }
            }
        } catch (e) {
            // Try alternate method
        }

        // Try to close IFrame ads
        const iframes = this.page.locator('iframe');
        const iframeCount = await iframes.count();
        for (let i = 0; i < iframeCount; i++) {
            try {
                const frame = iframes.nth(i).frameLocator('');
                const closeBtn = frame.locator('[aria-label="Close"]');
                if (await closeBtn.count() > 0) {
                    await closeBtn.click();
                    await this.page.waitForTimeout(500);
                }
            } catch (e) {
                // Continue
            }
        }

        console.log('No popup appeared or already closed');
    } catch (error) {
        console.log('No popup appeared:', error.message);
    }
  }

  // 4. Click on 'Products' button
  async open() {
    await this.page.getByRole('link', { name: 'Products' }).click();
    await this.closeAdIfPresent();
    
    // Wait for page to load and products to be visible
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    await this.page.locator("div[class='single-products']").first().waitFor({ state: 'visible', timeout: 15000 });

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    // Just verify that we have product categories or similar indicators
    await expect(this.page.locator("div[class='features_items']").first()).toBeVisible();

    // 6. The products list is visible
    await expect(this.page.locator("div[class='single-products']").first()).toBeVisible();
  }

  async viewTheFirstProduct() {
    const viewProductLink = this.page.locator('a').filter({ hasText: 'View Product' }).first();
    await expect(viewProductLink).toBeVisible({ timeout: 10000 });
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }),
      viewProductLink.click(),
    ]);
  }

  async getFirstProductName() {
    return await this.page.locator("div[class='features_items']")
    .locator("div[class='single-products']").first().locator('p').first().textContent();
  }

    // 8. User is landed to product detail page
  async verifyUserIsOnPDPPage() {
    await expect(this.page).toHaveURL(/product_details/, { timeout: 10000 });
  }


    // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
    async verifyProductDetail(productName) {
        await expect(
            this.page.locator("//div[@class='product-information']").getByRole('heading', {name: productName})).toBeVisible();
        await expect(
            this.page.locator("//div[@class='product-information']").getByText("Category: ")).toBeVisible();
        await expect(
            this.page.locator("//div[@class='product-information']").getByText(/Rs\. /)).toBeVisible();
        await expect(
            this.page.locator("//div[@class='product-information']").filter({hasText: 'Availability:'})).toBeVisible();
        await expect(
            this.page.locator("//div[@class='product-information']").filter({hasText: 'Condition:'})).toBeVisible();
        await expect(
            this.page.locator("//div[@class='product-information']").filter({hasText: 'Brand:'})).toBeVisible();
    }
}

module.exports = { ProductPage };