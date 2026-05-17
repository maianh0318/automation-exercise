import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/index.js';

test('Test Case 6: Contact Us Form', async ({ page }) => {
  const homePage = new HomePage(page);
  // 1. Launch browser, 2. Navigate to url
  await homePage.open();

  // 3. Verify home page is visible
  await homePage.verifyIsVisible();

  // 4. Click on 'Test Cases' button
  await page.locator("ul[class='nav navbar-nav']").getByRole('link', {name: 'Test Cases'}).click();

  // 5. Verify user is navigated to test cases page successfully
  const testCaseHeadings = page.locator('#form').getByRole('heading', { name: /Test Case / });
//   await expect(testCaseHeadings.count()).toBeGreaterThan(0);
  for (const heading of await testCaseHeadings.all()) {
    await expect(heading).toBeVisible();
  }
})