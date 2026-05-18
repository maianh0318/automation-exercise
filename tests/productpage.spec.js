// @ts-check
import { test } from '@playwright/test';
import { ProductPage, HomePage } from '../utils/index.js';

test.describe('Product page / Add to cart / Checkout', () => {
    test.beforeEach(async ({ page }) => {
      const homePage = new HomePage(page);

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
      await homePage.open();
      await homePage.verifyIsVisible();
    });

test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
    const productPage = new ProductPage(page);
    // 4. Click on 'Products' button
    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    // 6. The products list is visible
    await productPage.open();

    // 7. Click on 'View Product' of first product
    // Store product name before navigation
    const firstProductName = await productPage.getFirstProductName();
    await productPage.viewTheFirstProduct();

    // 8. User is landed to product detail page
    await productPage.verifyUserIsOnPDPPage();

    // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
    await productPage.verifyProductDetail(firstProductName);
})
})